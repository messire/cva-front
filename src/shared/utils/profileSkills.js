export function collectUniqueSkills(profile) {
    const all = [
        ...(profile?.skills ?? []),
        ...(profile?.workExperience ?? []).flatMap(w => w?.techStack ?? []),
    ];

    return [...new Set(all)];
}
