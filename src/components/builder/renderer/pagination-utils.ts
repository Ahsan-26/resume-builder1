import { Resume, TemplateDefinition } from "@/types/resume";

export interface PageLayoutData {
    header: string[];
    left: string[];
    right: string[];
    full: string[];
}

export const calculatePages = (
    resume: Resume,
    templateDefinition: TemplateDefinition,
    sectionHeights: Record<string, number>,
    isEditable: boolean,
    allKeys: string[]
): PageLayoutData[] => {
    // 1. Get all active sections sorted by order
    const sectionGap = templateDefinition.style.section_gap || 0;

    const getAreaForKey = (key: string): string => {
        const baseKey = key.split(':')[0];
        if (baseKey.startsWith('custom.')) {
            const sectionId = baseKey.split('.')[1];
            const settings = resume.section_settings?.[sectionId];
            const section = resume.custom_sections?.find(s => s.id === sectionId);
            const config = (templateDefinition.sections as any)['custom_sections'];
            return settings?.area ?? section?.area ?? config?.area ?? 'full';
        }
        const settings = resume.section_settings?.[baseKey];
        const config = (templateDefinition.sections as any)[baseKey];
        return settings?.area ?? config?.area ?? 'full';
    };

    const headerKeys = allKeys.filter(k => getAreaForKey(k) === 'header');
    const leftKeys = allKeys.filter(k => getAreaForKey(k) === 'left');
    const rightKeys = allKeys.filter(k => getAreaForKey(k) === 'right');
    const fullKeys = allKeys.filter(k => getAreaForKey(k) === 'full');

    // 2. Calculate Page Limits
    // Convert mm to px approx (96 DPI = 3.78 px/mm)
    // Actually we measured heights in PX in the browser, so we should convert Page MM to PX
    const PX_PER_MM = 3.7795;
    const pageHeightMm = resume.page?.size === 'LETTER' ? 279 : 297;
    // Orientation swap
    const finalPageHeightMm = resume.page?.orientation === 'landscape' ? (resume.page?.size === 'LETTER' ? 216 : 210) : pageHeightMm;

    const margins = resume.page?.margins_mm || { top: 20, right: 20, bottom: 20, left: 20 };
    // Subtract 24px safety buffer to ensure content never hits the edge (approx 1 full line height)
    const contentHeightPx = ((finalPageHeightMm - margins.top - margins.bottom) * PX_PER_MM) - 24;

    // 3. Distribution Logic
    const pages: PageLayoutData[] = [];

    const distribute = (keys: string[], startHeight: number): string[][] => {
        const buckets: string[][] = [[]];
        let currentH = startHeight;
        let bucketIndex = 0;
        let lastBaseKey = '';

        // Group keys by section to implement keep-together logic
        const sectionGroups: { baseKey: string; keys: string[]; totalH: number }[] = [];
        keys.forEach(key => {
            const baseKey = key.split(':')[0];
            const h = sectionHeights[key] || 16;
            // Add item gap (40px) if it's an item (not a header) and not the first item in the section
            const isItem = key.includes(':items:');
            const itemGap = (isItem && sectionGroups.length > 0 && sectionGroups[sectionGroups.length - 1].baseKey === baseKey && sectionGroups[sectionGroups.length - 1].keys.some(k => k.includes(':items:'))) ? 16 : 0;

            if (sectionGroups.length > 0 && sectionGroups[sectionGroups.length - 1].baseKey === baseKey) {
                sectionGroups[sectionGroups.length - 1].keys.push(key);
                sectionGroups[sectionGroups.length - 1].totalH += (h + itemGap);
            } else {
                sectionGroups.push({ baseKey, keys: [key], totalH: h });
            }
        });

        sectionGroups.forEach((group) => {
            const isNewSection = group.baseKey !== lastBaseKey;
            const gap = (isNewSection && lastBaseKey !== '') ? sectionGap : 0;

            // If the whole section fits on the current page, add it
            if (currentH + gap + group.totalH <= contentHeightPx) {
                group.keys.forEach((key, kIdx) => {
                    const h = sectionHeights[key] || 16;
                    const isItem = key.includes(':items:');
                    const itemGap = (isItem && kIdx > 0 && group.keys[kIdx - 1].includes(':items:')) ? 40 : 0;
                    buckets[bucketIndex].push(key);
                    currentH += (h + itemGap + (kIdx === 0 ? gap : 0));
                });
            }
            // If it doesn't fit but it fits ON A NEW PAGE, move the whole thing
            else if (group.totalH <= contentHeightPx && currentH > startHeight) {
                bucketIndex++;
                buckets[bucketIndex] = [];
                currentH = 0;
                group.keys.forEach((key, kIdx) => {
                    const h = sectionHeights[key] || 16;
                    const isItem = key.includes(':items:');
                    const itemGap = (isItem && kIdx > 0 && group.keys[kIdx - 1].includes(':items:')) ? 40 : 0;
                    buckets[bucketIndex].push(key);
                    currentH += (h + itemGap);
                });
            }
            // If it doesn't fit even on a new page, WE MUST SPLIT IT
            else {
                group.keys.forEach((key, kIdx) => {
                    const h = sectionHeights[key] || 16;
                    const isItem = key.includes(':items:');
                    const itemGap = (isItem && kIdx > 0 && group.keys[kIdx - 1].includes(':items:')) ? 40 : 0;
                    const effectiveGap = (kIdx === 0) ? gap : itemGap;

                    if (currentH + effectiveGap + h > contentHeightPx && currentH > (bucketIndex === 0 ? startHeight : 0)) {
                        bucketIndex++;
                        buckets[bucketIndex] = [];
                        currentH = 0;
                        buckets[bucketIndex].push(key);
                        currentH += h;
                    } else {
                        buckets[bucketIndex].push(key);
                        currentH += (effectiveGap + h);
                    }
                });
            }
            lastBaseKey = group.baseKey;
        });
        return buckets;
    };

    // Calculate start heights for columns (header pushes them)
    let headerHeight = 0;
    headerKeys.forEach(key => headerHeight += (sectionHeights[key] || 16));
    if (headerKeys.length > 0) headerHeight += sectionGap;

    // Distribute
    const leftBuckets = distribute(leftKeys, headerHeight);
    const rightBuckets = distribute(rightKeys, headerHeight);

    const maxPages = Math.max(leftBuckets.length, rightBuckets.length);

    for (let i = 0; i < maxPages; i++) {
        pages.push({
            header: i === 0 ? headerKeys : [],
            left: leftBuckets[i] || [],
            right: rightBuckets[i] || [],
            full: []
        });
    }

    // Now handle Full Sections (Bottom)
    let lastPageIdx = pages.length - 1;
    if (lastPageIdx < 0) {
        pages.push({ header: [], left: [], right: [], full: [] });
        lastPageIdx = 0;
    }

    const getPageContentHeight = (pageIdx: number) => {
        if (!pages[pageIdx]) return 0;
        let h = 0;
        if (pageIdx === 0) {
            pages[pageIdx].header.forEach(k => h += (sectionHeights[k] || 16));
            if (pages[pageIdx].header.length > 0) h += sectionGap;
        }

        let leftH = 0;
        let lastLeftBaseKey = '';
        pages[pageIdx].left.forEach((k, idx) => {
            const baseKey = k.split(':')[0];
            const isItem = k.includes(':items:');
            const itemGap = (isItem && idx > 0 && pages[pageIdx].left[idx - 1].startsWith(baseKey)) ? 40 : 0;

            if (lastLeftBaseKey !== '' && baseKey !== lastLeftBaseKey) leftH += sectionGap;
            leftH += (sectionHeights[k] || 16) + itemGap;
            lastLeftBaseKey = baseKey;
        });

        let rightH = 0;
        let lastRightBaseKey = '';
        pages[pageIdx].right.forEach((k, idx) => {
            const baseKey = k.split(':')[0];
            const isItem = k.includes(':items:');
            const itemGap = (isItem && idx > 0 && pages[pageIdx].right[idx - 1].startsWith(baseKey)) ? 40 : 0;

            if (lastRightBaseKey !== '' && baseKey !== lastRightBaseKey) rightH += sectionGap;
            rightH += (sectionHeights[k] || 16) + itemGap;
            lastRightBaseKey = baseKey;
        });

        h += Math.max(leftH, rightH);

        let lastFullBaseKey = '';
        pages[pageIdx].full.forEach((k, idx) => {
            const baseKey = k.split(':')[0];
            const isItem = k.includes(':items:');
            const itemGap = (isItem && idx > 0 && pages[pageIdx].full[idx - 1].split(':')[0] === baseKey) ? 40 : 0;

            if (lastFullBaseKey !== '' && baseKey !== lastFullBaseKey) h += sectionGap;
            // mt-6 buffer for the first full item after columns
            if (idx === 0 && (pages[pageIdx].left.length > 0 || pages[pageIdx].right.length > 0)) h += sectionGap;
            h += (sectionHeights[k] || 16) + itemGap;
            lastFullBaseKey = baseKey;
        });

        return h;
    };

    let currentUsedHeight = getPageContentHeight(lastPageIdx);
    let lastFullBaseKey = '';

    // Final distribution for Full Sections with keep-together logic
    const fullSectionGroups: { baseKey: string; keys: string[]; totalH: number }[] = [];
    fullKeys.forEach(key => {
        const baseKey = key.split(':')[0];
        const h = sectionHeights[key] || 16;
        const isItem = key.includes(':items:');
        const itemGap = (isItem && fullSectionGroups.length > 0 && fullSectionGroups[fullSectionGroups.length - 1].baseKey === baseKey && fullSectionGroups[fullSectionGroups.length - 1].keys.some(k => k.includes(':items:'))) ? 40 : 0;

        if (fullSectionGroups.length > 0 && fullSectionGroups[fullSectionGroups.length - 1].baseKey === baseKey) {
            fullSectionGroups[fullSectionGroups.length - 1].keys.push(key);
            fullSectionGroups[fullSectionGroups.length - 1].totalH += (h + itemGap);
        } else {
            fullSectionGroups.push({ baseKey, keys: [key], totalH: h });
        }
    });

    fullSectionGroups.forEach((group) => {
        const isNewSection = group.baseKey !== lastFullBaseKey;

        let gap = 0;
        const isFirstFullOnPage = pages[lastPageIdx].full.length === 0;
        if (isFirstFullOnPage) {
            if (pages[lastPageIdx].left.length > 0 || pages[lastPageIdx].right.length > 0) gap = sectionGap;
        } else {
            if (isNewSection) gap = sectionGap;
        }

        // Keep-together logic for full sections
        if (currentUsedHeight + gap + group.totalH <= contentHeightPx) {
            group.keys.forEach((key, kIdx) => {
                const h = sectionHeights[key] || 16;
                const isItem = key.includes(':items:');
                const itemGap = (isItem && kIdx > 0) ? 40 : 0;
                const effectiveGap = (kIdx === 0) ? gap : itemGap;

                pages[lastPageIdx].full.push(key);
                currentUsedHeight += (h + effectiveGap);
            });
        }
        else if (group.totalH <= contentHeightPx && currentUsedHeight > 40) {
            pages.push({ header: [], left: [], right: [], full: [] });
            lastPageIdx++;
            group.keys.forEach((key, kIdx) => {
                const h = sectionHeights[key] || 16;
                const isItem = key.includes(':items:');
                const itemGap = (isItem && kIdx > 0) ? 40 : 0;
                pages[lastPageIdx].full.push(key);
                currentUsedHeight = (kIdx === 0) ? h : (currentUsedHeight + h + itemGap);
            });
            // Final adjustment for currentUsedHeight on new page
            currentUsedHeight = getPageContentHeight(lastPageIdx);
        }
        else {
            // Split it
            group.keys.forEach((key, kIdx) => {
                const h = sectionHeights[key] || 16;
                const isItem = key.includes(':items:');
                const itemGap = (isItem && kIdx > 0) ? 40 : 0;

                let effectiveGap = 0;
                if (kIdx === 0) {
                    if (pages[lastPageIdx].full.length === 0) {
                        if (pages[lastPageIdx].left.length > 0 || pages[lastPageIdx].right.length > 0) effectiveGap = sectionGap;
                    } else if (isNewSection) {
                        effectiveGap = sectionGap;
                    }
                } else {
                    effectiveGap = itemGap;
                }

                if (currentUsedHeight + effectiveGap + h > contentHeightPx && currentUsedHeight > 40) {
                    pages.push({ header: [], left: [], right: [], full: [] });
                    lastPageIdx++;
                    pages[lastPageIdx].full.push(key);
                    currentUsedHeight = h;
                } else {
                    pages[lastPageIdx].full.push(key);
                    currentUsedHeight += (effectiveGap + h);
                }
            });
        }
        lastFullBaseKey = group.baseKey;
    });

    return pages;

};
