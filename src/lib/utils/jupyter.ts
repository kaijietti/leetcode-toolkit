import type {
    INotebookContent,
    ICodeCell,
    IMarkdownCell,
    MultilineString,
} from "@jupyterlab/nbformat";
import { toast } from "./toast";

export function createNotebook({
    title,
    description,
    language = "python",
    url,
}: {
    title: string;
    description: string;
    language?: string;
    url: string;
}): INotebookContent {
    const notebook: INotebookContent = {
        metadata: {
            language_info: {
                name: language,
            },
        },
        nbformat: 5,
        nbformat_minor: 10,
        cells: [],
    };
    const regex = /^(https:\/\/leetcode\.com\/problems\/[a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    const titleCell = createMarkdownCell(
        `# [${title}](${match ? match[0] : url})`
    );
    const descriptionCell = createMarkdownCell(
        "## Description \n\n" + description
    );
    const partitionCell = createMarkdownCell(["---\n\n", "## Solution"]);
    const codeCell = createCodeCell("");
    notebook.cells.push(titleCell, descriptionCell, partitionCell, codeCell);
    return notebook;
}

function createMarkdownCell(content: MultilineString): IMarkdownCell {
    return {
        cell_type: "markdown",
        metadata: {},
        source: content,
    };
}

function createCodeCell(content: MultilineString): ICodeCell {
    return {
        cell_type: "code",
        metadata: {},
        source: content,
        execution_count: null,
        outputs: [],
    };
}

export function downloadNotebook(notebook: INotebookContent, filename: string) {
    const blob = new Blob([JSON.stringify(notebook)], {
        type: "application/x-ipynb+json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename + ".ipynb";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as Jupyter Notebook!");
}
