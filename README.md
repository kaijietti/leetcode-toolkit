<div align="center" width="100%">

# LeetCode Toolkit <!-- omit from toc -->

**English** | [简体中文](/README-ZH.md)

<a href="https://greasyfork.org/en/scripts/532158"><img alt="Greasy Fork License" src="https://img.shields.io/greasyfork/v/532158"></a>
![Greasy Fork License](https://img.shields.io/greasyfork/l/532158)

</div>

-   [Feature](#feature)
-   [Screenshots](#screenshots)
-   [About Jupyter Notebook](#about-jupyter-notebook)
-   [Installation](#installation)
-   [Credits](#credits)
-   [License](#license)

## Feature

This userscript enhances the LeetCode problem page with various tweaking and additions. It supports both the US version of [LeetCode.com](https://leetcode.com), and [the China version](https://leetcode.cn).

-   At the top of problem description, these buttons are added:

    -   **Copy Title**
    -   **Copy Description:** Copies the problem description in Markdown format, making it easy to paste into your notes or documentation.
    -   **Download as Jupyter Notebook:** Bundles the title, description in Markdown, and the current content in the code editor into a single `.ipynb` file.
    -   **Find Editorial(\*):** Open a screenshot of the Editorial for the current problem, if it exists in the [Leetcode Screenshotter](https://github.com/akhilkammila/leetcode-screenshotter) repo.

-   Quality-of-life adjustments:
    -   **Format On Save:** Automatically format code when pressing <kbd>Ctrl + S</kbd>.
    -   **Unlock IntelliSense:** Enjoy autocompletion and hover suggestions without paying for premium.
-   Experimental:
    -   **Download Editorial(\*)**: You can find this command under your userscript manager menu (right click context menu or extension icon on browser toolbar). If you have access to an editorial, click on the command and the editorial will be saved as an `.md` file. This feature currently has limitations:
        -   Code in editorial will be saved as a link to a Leetcode playground.
        -   Math expressions will be displayed as plain text.
        -   Videos will be skipped.

> (\*) Editorial-related features are for US site only, as China site do not seem to lock their editorials behind premium.

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

The `Download as Jupyter Notebook` feature helps you transfer LeetCode problems into a Jupyter Notebook document, so you can read the problem, write and run the solution, add additional notes, all at one place on your local machine.

You can open `.ipynb` notebooks with clients such as [VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks). By default it supports Python, but [kernels for many other languages](https://github.com/jupyter/jupyter/wiki/Jupyter-kernels) are available too.

## Installation

To use this userscript, you'll need a userscript manager like [Tampermonkey](https://www.tampermonkey.net/) (available for Chrome, Firefox, and other browsers).

1. Install Tampermonkey or a similar userscript manager for your browser.
2. Go to [the GreasyFork Page](https://greasyfork.org/en/scripts/532158), and click on the "Install this script" button.
3. Visit [a LeetCode problem page](https://leetcode.com/problems/two-sum/), and you should see the new features added by the script.

## Credits

This script is inspired by the following projects:

-   [Leetcode Screenshotter](https://github.com/akhilkammila/leetcode-screenshotter)
-   [LeetCode Problem to Markdown](https://greasyfork.org/en/scripts/448601)
-   [leetcode enhanced code editor](https://greasyfork.org/en/scripts/502740-leetcode-enhanced-code-editor)
-   [Leetcode: format on save](https://greasyfork.org/en/scripts/481927-leetcode-format-on-save)

## License

MIT License
