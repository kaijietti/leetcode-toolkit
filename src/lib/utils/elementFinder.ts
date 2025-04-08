import { toast } from "./toast";

type Config = {
    parent: Document | Element;
    timeout: number;
};

export function findElement(selector: string, config: Partial<Config> = {}) {
    const { parent = document, timeout = 500 } = config;

    return new Promise<Element>((resolve, reject) => {
        // If the element is already present, resolve immediately
        const element = parent.querySelector(selector);
        if (element) resolve(element);

        // If not found, set an observer
        const observer = new MutationObserver((_mutations, obs) => {
            const element = parent.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });

        observer.observe(parent, {
            childList: true,
            subtree: true,
        });

        // Timeout mechanism to prevent indefinite waiting
        setTimeout(() => {
            observer.disconnect();
            toast.error(
                "Element not found within timeout. Please refresh the page or disable the script."
            );
            reject(
                new ReferenceError(
                    `Element "${selector}" not found within timeout (${timeout}ms)`
                )
            );
        }, timeout);
    });
}
