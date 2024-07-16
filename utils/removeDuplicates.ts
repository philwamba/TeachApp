export const removeDuplicates = <T extends { id: number }>(arr: T[]): T[] => {
    const uniqueIds = new Set();
    return arr.filter((item) => {
        if (uniqueIds.has(item.id)) {
            return false;
        } else {
            uniqueIds.add(item.id);
            return true;
        }
    });
};
