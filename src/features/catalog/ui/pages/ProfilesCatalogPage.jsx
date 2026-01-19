import {Box, Container, HStack, SimpleGrid, Spinner, Text, VStack} from "@chakra-ui/react";
import {useEffect} from "react";

import ProfileCard from "../components/ProfileCard.jsx";
import {Icons} from "../../../../shared/ui/icons.js";
import {useDebouncedValue} from "../../../../shared/hooks/useDebouncedValue.js";
import {useCatalogStore} from "../../model/catalog.store.js";

import {CatalogFilters} from "../components/CatalogFilters.jsx";
import {CatalogPagination} from "../components/CatalogPagination.jsx";
import {useCatalogUrlSync} from "../hooks/useCatalogUrlSync.js";

const ProfilesCatalogPage = () => {
    const items = useCatalogStore((s) => s.items);
    const pagination = useCatalogStore((s) => s.pagination);
    const isLoading = useCatalogStore((s) => s.isLoading);
    const error = useCatalogStore((s) => s.error);

    const {query, searchText, setSearchText, updateQueryAndFetch} = useCatalogUrlSync();

    const debouncedSearch = useDebouncedValue(searchText, 350);

    // Debounced search -> store + fetch
    useEffect(() => {
        const currentSearch = (query.search ?? "");
        const nextSearch = (debouncedSearch ?? "");

        if (currentSearch !== nextSearch) {
            void updateQueryAndFetch({search: nextSearch});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearch]);

    const totalPages = pagination?.totalPages ?? 1;
    const page = query.page ?? 1;

    return (
        <Container maxW="container.xl" py={{base: 6, md: 10}} px={{base: 2, md: 8}}>
            <VStack gap={6} align="stretch">
                <VStack align="flex-start" gap={1}>
                    <Text fontSize={{base: "32px", md: "40px"}} fontWeight="800" color="text.primary">
                        Developer profiles
                    </Text>
                    <Text mt="2" fontSize="14px" color="text.secondary">
                        Explore and connect with talented developers
                    </Text>
                </VStack>

                <CatalogFilters
                    searchText={searchText}
                    onSearchTextChange={setSearchText}
                    skills={query.skills ?? []}
                    onSkillsChange={(skills) => void updateQueryAndFetch({skills})}
                    openToWork={query.openToWork}
                    onToggleOpenToWork={() => void updateQueryAndFetch({openToWork: query.openToWork === true ? undefined : true,})}
                    verificationStatus={query.verificationStatus}
                    onVerificationStatusChange={(verificationStatus) => void updateQueryAndFetch({verificationStatus})}
                    sortField={query.sortField}
                    onSortFieldChange={(sortField) => void updateQueryAndFetch({sortField})}
                    sortOrder={query.sortOrder}
                    onSortOrderChange={(sortOrder) => void updateQueryAndFetch({sortOrder})}
                />

                {error && (
                    <Box border="1px solid" borderColor="red.500" borderRadius="md" p={3}>
                        <Text fontWeight="700" color="red.500">
                            Error
                        </Text>
                        <Text color="text.secondary">{error}</Text>
                    </Box>
                )}

                {isLoading && (
                    <HStack justify="center" py={6}>
                        <Spinner/>
                        <Text color="text.secondary">Loading…</Text>
                    </HStack>
                )}

                <SimpleGrid
                    minChildWidth={{base: "260px", md: "300px", lg: "340px"}}
                    gap={{base: 4, md: 6}}
                    w="full"
                >
                    {items.map((profile) => (
                        <ProfileCard key={profile.id} profile={profile}/>
                    ))}
                </SimpleGrid>

                {!isLoading && items.length === 0 && (
                    <Text
                        fontSize="xl"
                        textAlign="center"
                        fontWeight="bold"
                        color="gray.500"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                    >
                        No CV found
                        <span style={{color: "gray", display: "flex", alignItems: "center"}}>
                            <Icons.UserNotFound/>
                        </span>
                    </Text>
                )}

                <CatalogPagination
                    page={page}
                    totalPages={totalPages}
                    isLoading={isLoading}
                    onPrev={() => void updateQueryAndFetch({page: page - 1})}
                    onNext={() => void updateQueryAndFetch({page: page + 1})}
                />
            </VStack>
        </Container>
    );
};

export default ProfilesCatalogPage;