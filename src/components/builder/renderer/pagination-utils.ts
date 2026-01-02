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
    isEditable: boolean
): PageLayoutData[] => {
    // 1. Get all active sections sorted by order
    const sectionGap = templateDefinition.style.section_gap || 0;

    // 1. Get all active sections sorted by order
    const getSectionsForArea = (area: string) => {
        const templateSections = Object.entries(templateDefinition.sections)
            .filter(([key]) => key !== 'custom_sections'); // Skip monolithic

        const mappedTemplateSections = templateSections.map(([key, config]) => {
            const settings = resume.section_settings?.[key];
            return {
                key,
                area: settings?.area ?? config.area,
                order: settings?.order ?? config.order,
                visible: settings?.visible ?? config.visible
            };
        });

        // Map custom sections
        const customSectionConfig = templateDefinition.sections['custom_sections'] || { area: 'full', visible: true, order: 99 };
        const mappedCustomSections = (resume.custom_sections || []).map(section => {
            const settings = resume.section_settings?.[section.id];
            return {
                key: `custom.${section.id}`,
                area: settings?.area ?? ((customSectionConfig.area as string) || 'full'),
                order: settings?.order ?? section.order ?? 99,
                visible: settings?.visible ?? true
            };
        });

        return [...mappedTemplateSections, ...mappedCustomSections]
            .filter(s => s.area === area)
            .filter(s => isEditable || s.visible)
            .sort((a, b) => a.order - b.order)
            .map(s => s.key);
    };

    const headerSections = getSectionsForArea('header');
    const leftSections = getSectionsForArea('left');
    const rightSections = getSectionsForArea('right');
    const fullSections = getSectionsForArea('full');

    // 2. Calculate Page Limits
    // Convert mm to px approx (96 DPI = 3.78 px/mm)
    // Actually we measured heights in PX in the browser, so we should convert Page MM to PX
    const PX_PER_MM = 3.7795;
    const pageHeightMm = resume.page?.size === 'LETTER' ? 279 : 297;
    // Orientation swap
    const finalPageHeightMm = resume.page?.orientation === 'landscape' ? (resume.page?.size === 'LETTER' ? 216 : 210) : pageHeightMm;

    const margins = resume.page?.margins_mm || { top: 20, right: 20, bottom: 20, left: 20 };
    const contentHeightPx = (finalPageHeightMm - margins.top - margins.bottom) * PX_PER_MM;

    // 3. Distribution Logic
    // We create Pages. Each Page has { header, left, right, full }
    const pages: PageLayoutData[] = [];

    // Initial Page
    let currentPage: PageLayoutData = { header: [], left: [], right: [], full: [] };
    let currentLeftHeight = 0;
    let currentRightHeight = 0;

    // Add Header to Page 1
    headerSections.forEach(key => {
        currentPage.header.push(key);
        currentLeftHeight += (sectionHeights[key] || 50); // Header pushes both columns down usually?
        currentRightHeight += (sectionHeights[key] || 50);
    });

    // Helper to add sections to a specific column on the current page
    // If it overflows, we move to next page
    const fillColumn = (sections: string[], column: 'left' | 'right' | 'full') => {
        sections.forEach(key => {
            const h = sectionHeights[key] || 100; // Default estimate if missing

            if (column === 'left') {
                if (currentLeftHeight + h > contentHeightPx) {
                    // Overflow!
                    // Strict paging: Move strict entire section to next page?
                    // User Req: "visually separate pages"
                    // Ideally we'd split the section, but that requires deep recursive logic.
                    // For now, we PUSH the section to the next page.

                    // BUT, left and right are independent in 2-col?
                    // If Left overflows, Left goes to Page 2. Right might still be on Page 1.
                    // This creates a complex "Multi-Page Object" where Page 2 might have Left content but Empty Right content?
                    // Yes. And Page 2 Right content starts after Page 1 Right content finishes.

                    // Actually, simpler logic:
                    // We just track "Global Left Column" vs "Global Right Column" matching to Pages.
                }
                // ... this accumulator logic is tricky because Left and Right must sync on Page Number?
                // Visual Separation implies:
                // Page 1 View: Left Col (Part 1) | Right Col (Part 1)
                // Page 2 View: Left Col (Part 2) | Right Col (Part 2)
            }
        });
    };

    // ALTERNATIVE STRATEGY:
    // Distribute Left sections into [Page1_Left, Page2_Left, ...]
    // Distribute Right sections into [Page1_Right, Page2_Right, ...]
    // Then merge them into Pages.

    const distribute = (sections: string[], startHeight: number): string[][] => {
        const buckets: string[][] = [[]];
        let currentH = startHeight;
        let bucketIndex = 0;

        sections.forEach(key => {
            const h = sectionHeights[key] || 50;
            if (currentH + h > contentHeightPx && currentH > startHeight) {
                // Determine if we should break
                // If single item is massive (> page), we must put it in; it will overflow.
                bucketIndex++;
                buckets[bucketIndex] = [];
                currentH = 0; // New page starts at 0 (or margin?)
                // If Page 2+, standard margin applies? Yes.
            }
            buckets[bucketIndex].push(key);
            currentH += h;
        });
        return buckets;
    };

    // Calculate start heights for columns (header pushes them)
    // Assuming Header is FULL WIDTH at top of Page 1
    let headerHeight = 0;
    headerSections.forEach(key => headerHeight += (sectionHeights[key] || 0));

    // Distribute Left
    const leftBuckets = distribute(leftSections, headerHeight);
    // Distribute Right
    const rightBuckets = distribute(rightSections, headerHeight);
    // Distribute Full (Single Col)
    // Full sections usually come AFTER columns.
    // So we need to know where columns ended.
    const maxPageLeft = leftBuckets.length;
    const maxPageRight = rightBuckets.length;
    const columnsEndPage = Math.max(maxPageLeft, maxPageRight) - 1; // 0-indexed

    // We need final height of the last page to render Full sections there or next
    // This is getting complicated.

    // SIMPLIFIED:
    // Just map strict pages.
    const maxPages = Math.max(leftBuckets.length, rightBuckets.length);

    for (let i = 0; i < maxPages; i++) {
        pages.push({
            header: i === 0 ? headerSections : [],
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

    // Helper to get current height of a specific page index
    const getPageContentHeight = (pageIdx: number) => {
        if (!pages[pageIdx]) return 0;
        let h = 0;
        // Page 0 has header
        if (pageIdx === 0) {
            pages[pageIdx].header.forEach(k => h += (sectionHeights[k] || 0));
        }
        // Columns
        let leftH = 0;
        pages[pageIdx].left.forEach(k => leftH += (sectionHeights[k] || 0));
        let rightH = 0;
        pages[pageIdx].right.forEach(k => rightH += (sectionHeights[k] || 0));

        h += Math.max(leftH, rightH);

        // Existing full sections on this page (if any, though we are adding them now)
        pages[pageIdx].full.forEach(k => h += (sectionHeights[k] || 0));

        // Add gap/margins estimates?
        // Sections have 'mb-6' (24px) or gap style. ResumeRenderer uses style.section_gap.
        // We should add gap for every section.
        return h;
    };

    let currentUsedHeight = getPageContentHeight(lastPageIdx);

    // We assume a small buffer or gap before full sections start (e.g., mt-6 = 24px)
    currentUsedHeight += 24;

    fullSections.forEach(key => {
        const h = sectionHeights[key] || 100;

        // Calculate gap required before this item
        // If it's the very first item in 'full' list on this page, it needs 24px (mt-6).
        // If it's subsequent, it needs sectionGap.
        const isFirstFullOnPage = pages[lastPageIdx].full.length === 0;

        // However, if the page is FRESH (no header, no columns), does it need mt-6?
        // ResumePage always renders Columns div even if empty? 
        // If columns are empty height, mt-6 adds 24px space.
        // Yes, likely.

        const gap = isFirstFullOnPage ? 24 : sectionGap;

        // Check fit
        if (currentUsedHeight + gap + h > contentHeightPx && currentUsedHeight > 40) {
            // New Page needed
            pages.push({ header: [], left: [], right: [], full: [] });
            lastPageIdx++;
            currentUsedHeight = 0; // New page starts fresh

            // For new page, this item becomes the first full item.
            // It will have gap = 24 (mt-6).
            // Check if it fits on new page (unlikely it wont unless massive).
            // Update currentUsedHeight
            pages[lastPageIdx].full.push(key);
            currentUsedHeight += (24 + h);
        } else {
            // Add to current page
            pages[lastPageIdx].full.push(key);
            currentUsedHeight += (gap + h);
        }
    });

    return pages;

};
