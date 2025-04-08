<div align="center" width="100%">

# LeetCode Download as Jupyter Notebook

**English** | [Chinese](/README-ZH.md)

<a href="https://greasyfork.org/en/scripts/532158"><img alt="Greasy Fork License" src="https://img.shields.io/greasyfork/v/532158"></a>
![Greasy Fork License](https://img.shields.io/greasyfork/l/532158)

</div>

## Feature

This userscript enhances the LeetCode problem page by adding three buttons:

-   **Copy Title**
-   **Copy Description:** Copies the problem description in Markdown format, making it easy to paste into your notes or documentation.
-   **Download as Jupyter Notebook:** Bundles the title, description in Markdown, and the current content in the code editor into a single `.ipynb` file.

Additionally, it also add these quality-of-life adjustment:

-   **Format On Save:** Automatically format code when pressing <kbd>Ctrl + S</kbd>.
-   **Unlock IntelliSense:** Enjoy autocompletion and hover suggestions without paying for premium.

---

The script supports both global site of [LeetCode.com](https://leetcode.com), and [the China-specific site](https://leetcode.cn).

## Screenshots

<table>
    <tr>
        <td>
            <figure>
                <img src="assets/screenshot-1.png" />
                <figcaption>The added buttons on LeetCode problem page</figcaption>
            </figure>
        </td>
        <td>
            <figure>
                <img src="assets/screenshot-4.png" />
                <figcaption>IntelliSense in the code editor</figcaption>
            </figure>
        </td>
    </tr>
    <tr>
        <td>
            <figure>
                <img src="assets/screenshot-2.png" />
                <figcaption>The notebook in VS Code</figcaption>
            </figure>
        </td>
        <td>
            <figure>
                <img src="assets/screenshot-3.png" />
                <figcaption>
                    You can write and run code directly in the notebook
                </figcaption>
            </figure>
        </td>
    </tr>
</table>

## About Jupyter Notebook

[Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/latest/) is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations, and narrative text.

This userscript helps you transfer LeetCode problems into a Jupyter Notebook document, so you can read the problem, write and run the solution, add additional notes, all at one place on your local machine.

You can open `.ipynb` notebooks with clients such as [VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks). By default it supports Python, but [kernels for many other languages](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) are available too.

## Installation

To use this userscript, you'll need a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) (available for Chrome, Firefox, and other browsers).

1. Install Tampermonkey or a similar userscript manager for your browser.
2. Download and install the userscript.
3. Visit [a LeetCode problem page](https://leetcode.com/problems/two-sum/), and you should see the new buttons added by the userscript.

## Credits

This script is inspired by the following projects:

-   [LeetCode Problem to Markdown](https://greasyfork.org/en/scripts/448601).
-   [leetcode enhanced code editor](https://greasyfork.org/en/scripts/502740-leetcode-enhanced-code-editor)
-   [Leetcode: format on save](https://greasyfork.org/en/scripts/481927-leetcode-format-on-save)

## License

MIT License
