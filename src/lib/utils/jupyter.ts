import type {
    INotebookContent,
    ICodeCell,
    IMarkdownCell,
    MultilineString,
} from "@jupyterlab/nbformat";

export function createNotebook({
    title,
    description,
    language = "python",
}: {
    title: string;
    description: string;
    language?: string;
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
    const titleCell = createMarkdownCell("# " + title);
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
