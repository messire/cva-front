export function collectUniqueSkills(profile) {
    const model = buildSkillsModel(profile);
    return model.all;
}

export function buildSkillsModel(profile) {
    const normalize = (s) => (s ?? "").trim();
    const toKey = (s) => normalize(s).toLowerCase();

    const curatedRaw = Array.isArray(profile?.skills) ? profile.skills : [];
    const experienceRaw = Array.isArray(profile?.workExperience)
        ? profile.workExperience.flatMap((w) => (Array.isArray(w?.techStack) ? w.techStack : []))
        : [];

    const curatedMap = new Map();
    for (const s of curatedRaw) {
        const v = normalize(s);
        if (!v) continue;
        const k = toKey(v);
        if (!curatedMap.has(k)) {
            curatedMap.set(k, v);
        }
    }

    const experienceMap = new Map();
    for (const s of experienceRaw) {
        const v = normalize(s);
        if (!v) continue;
        const k = toKey(v);
        if (!experienceMap.has(k)) {
            experienceMap.set(k, v);
        }
    }

    const curated = [...curatedMap.values()];
    const experience = [...experienceMap.values()];
    const inferred = [...experienceMap.entries()]
        .filter(([k]) => !curatedMap.has(k))
        .map(([, v]) => v);

    return {
        curated,
        inferred,
        experience,
        all: [...curated, ...inferred],
        counts: {
            curated: curated.length,
            inferred: inferred.length,
            experience: experience.length,
            all: curated.length + inferred.length,
        },
    };
}