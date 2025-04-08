import { toast } from "./toast";

type Config = {
    /** Maximum time to wait in milliseconds */
    timeout: number;
    onError: (error: Error) => void;
};

const DEFAULT_CONFIG: Partial<Config> = {
    timeout: 10000,
    onError: (error) => {
        if (error instanceof ReferenceError) {
            toast.error(
                "Element not found within timeout. Please refresh the page or disable the script."
            );
        }
    },
};

export function findElement(
    selector: string,
    parent = document,
    config: Partial<Config> = {}
) {
    const { timeout, onError } = { ...DEFAULT_CONFIG, ...config };
    // Added timeout
    return new Promise<Element>((resolve, reject) => {
        const observer = new MutationObserver((_mutations, obs) => {
            const targetElement = parent.querySelector(selector);
            if (targetElement) {
                obs.disconnect();
                resolve(targetElement);
            }
        });

        observer.observe(parent, {
            childList: true,
            subtree: true,
        });

        // Timeout mechanism to prevent indefinite waiting
        const timeoutId = setTimeout(() => {
            observer.disconnect();
            const error = new ReferenceError(
                `Element "${selector}" not found within timeout (${timeout}ms)`
            );
            onError?.(error);
            reject(error);
        }, timeout);

        // If the element is already present, resolve immediately
        const initialElement = parent.querySelector(selector);
        if (initialElement) {
            clearTimeout(timeoutId); // Clear the timeout since we found it.
            observer.disconnect();
            resolve(initialElement);
        }
    });
}
