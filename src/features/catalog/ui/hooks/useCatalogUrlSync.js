import {useEffect, useMemo, useRef, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {useCatalogStore} from "../../model/catalog.store.js";
import {parseCatalogQuery, serializeCatalogQuery} from "../../../../shared/utils/catalogQuery.js";

function normalizeForCompare(query) {
    return {
        search: query.search ?? "",
        skills: Array.isArray(query.skills) ? query.skills.filter(Boolean) : [],
        openToWork: typeof query.openToWork === "boolean" ? query.openToWork : undefined,
        verificationStatus: query.verificationStatus ?? undefined,
        page: query.page ?? 1,
        sortField: query.sortField ?? "updatedAt",
        sortOrder: query.sortOrder ?? "desc",
    };
}

function areQueriesEqual(a, b) {
    const x = normalizeForCompare(a);
    const y = normalizeForCompare(b);

    if (x.search !== y.search) return false;
    if (x.openToWork !== y.openToWork) return false;
    if (x.verificationStatus !== y.verificationStatus) return false;
    if (x.page !== y.page) return false;
    if (x.sortField !== y.sortField) return false;
    if (x.sortOrder !== y.sortOrder) return false;

    if (x.skills.length !== y.skills.length) return false;
    for (let i = 0; i < x.skills.length; i++) {
        if (x.skills[i] !== y.skills[i]) return false;
    }

    return true;
}

export function useCatalogUrlSync() {
    const [searchParams, setSearchParams] = useSearchParams();

    const query = useCatalogStore((s) => s.query);
    const replaceQuery = useCatalogStore((s) => s.replaceQuery);
    const setQuery = useCatalogStore((s) => s.setQuery);
    const fetchProfiles = useCatalogStore((s) => s.fetchProfiles);

    const [searchText, setSearchText] = useState(query.search ?? "");

    const didInitRef = useRef(false);

    useEffect(() => {
        if (didInitRef.current) return;

        const parsedRaw = parseCatalogQuery(searchParams);
        const parsed = {...parsedRaw};
        delete parsed.pageSize;
        replaceQuery(parsed);
        setSearchText(parsed.search ?? "");
        void fetchProfiles();

        didInitRef.current = true;
    }, []);

    useEffect(() => {
        if (!didInitRef.current) return;

        const parsedRaw = parseCatalogQuery(searchParams);
        const parsed = {...parsedRaw};
        delete parsed.pageSize;

        if (!areQueriesEqual(parsed, query)) {
            replaceQuery(parsed);
            setSearchText(parsed.search ?? "");
            void fetchProfiles();
        }
    }, [searchParams]);

    const serialized = useMemo(() => serializeCatalogQuery(query).toString(), [query]);
    useEffect(() => {
        if (!didInitRef.current) return;

        const current = searchParams.toString();
        if (current !== serialized) {
            setSearchParams(serialized ? `?${serialized}` : "", {replace: true});
        }
    }, [serialized]);

    const updateQueryAndFetch = async (partial) => {
        setQuery(partial);
        await fetchProfiles();
    };

    return {query, searchText, setSearchText, updateQueryAndFetch};
}