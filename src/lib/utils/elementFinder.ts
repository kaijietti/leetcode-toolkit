type Config = {
    /** Maximum time to wait in milliseconds */
    maxWaitTime: number;
    onError: (error: Error) => void;
    onAllFound: (els: Element[]) => void;
};

const DEFAULT_CONFIG: Partial<Config> = {
    maxWaitTime: 10000,
};

export class ElementFinder {
    targets: { selector: string; element: Element | null }[] = [];

    constructor(
        /** The CSS selector strings to look for */
        selectors: string[] = [],
        public config: Partial<Config> = DEFAULT_CONFIG
    ) {
        this.targets = selectors.map((selector) => ({
            selector,
            element: null,
        }));
    }

    init() {
        // First try direct check
        try {
            this.#findAllElements();

            if (!this.#allIsFound) {
                this.#setupMutationObserver();
            }
        } catch (err) {
            console.error("Error in ElementFinder:", err);
            if (err instanceof Error) this.config.onError?.(err);
            else throw err;
        }
    }

    /** Try to find all elements by selector, and store them in `targets` if found.
     * If all elements are found, invoke the `onAllFound` callback. */
    #findAllElements() {
        this.targets.forEach(({ selector, element }, index) => {
            if (element) return;
            this.targets[index].element = document.querySelector(selector);
        });

        if (this.#allIsFound) {
            const elements = this.targets.map((t) => t.element!);
            this.config.onAllFound?.(elements);
        }
    }

    /** Check if all target elements have been found */
    get #allIsFound() {
        return this.targets.every(({ element }) => element !== null);
    }

    #setupMutationObserver() {
        const callback: MutationCallback = (_mutations, obs) => {
            this.#findAllElements();
            // Stop observing once all elements are found
            if (this.#allIsFound) obs.disconnect();
        };

        const observer = new MutationObserver(callback);

        observer.observe(document.body, {
            childList: true, // Watch for changes in direct children
            subtree: true, // Watch for changes in the entire subtree
        });

        // Set a timeout to stop the observer after maxWaitTime
        setTimeout(() => {
            observer.disconnect();
            throw new Error(
                `Timeout: Not all elements found within ${this.config.maxWaitTime}ms`
            );
        }, this.config.maxWaitTime);
    }
}
