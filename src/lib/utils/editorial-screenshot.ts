import { GM_getResourceText } from "$";
const editorialsMarkdown = GM_getResourceText("editorials");

/** Extracts the screenshot link for a given LeetCode problem title from markdown content */
export function extractScreenshotLink(problemTitle: string) {
    // Clean the problem title for reliable matching
    const cleanTitle = problemTitle.trim();

    // Create a regex pattern that looks for the heading with the problem title
    // Format is #### [1. Two Sum](https://github.com/...)
    const headingPattern = new RegExp(
        `####\\s+\\[${cleanTitle.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        )}\\]\\((.*?)\\)`,
        "i"
    );

    // Search for the pattern in the markdown
    const match = editorialsMarkdown.match(headingPattern);

    // Return the captured URL or null if not found
    return match ? match[1] : null;
}
