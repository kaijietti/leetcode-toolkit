import { toast } from "./toast";

type FinderConfig = {
    /** The node to watch for changes, i.e. the `target` of an Mutation Observer */
    subject: Document | Element;
    observerOption: MutationObserverInit;
    /** The max time to wait before stopping find the element. */
    timeout: number;
    /** The thing we're looking for. Used for error message. */
    itemName: string;
};

class TimeoutError extends Error {
    name = this.constructor.name;
    constructor(item: string, timeout: number) {
        super();
        this.message = `"${item}" not found within timeout (${timeout}ms)`;
    }
}

/** Using a mutation observer to find something */
export function find<T>(
    finderFn: () => T | null,
    {
        subject = document,
        observerOption = {
            childList: true,
            subtree: true,
        },
        timeout = 5000,
        itemName = "Item",
    }: Partial<FinderConfig>
) {
    return new Promise<T>((resolve, reject) => {
        // If the element is already present, resolve immediately
        const item = finderFn();
        if (item) return resolve(item);

        // If not found, set an mutation observer
        const observer = new MutationObserver(() => {
            const item = finderFn();
            if (item) {
                observer.disconnect();
                clearTimeout(timeoutId);
                return resolve(item);
            }
        });

        observer.observe(subject, observerOption);

        // Timeout mechanism to prevent indefinite waiting
        const timeoutId = setTimeout(() => {
            observer.disconnect();
            toast.error(
                `${itemName} not found within timeout. Please refresh the page or disable the script.`
            );
            const error = new TimeoutError(itemName, timeout);
            console.error(error);
            return reject(error);
        }, timeout);
    });
}

export async function findElement(
    selector: string,
    { parent = document, timeout = 500 } = {}
) {
    const element = await find(() => parent.querySelector(selector), {
        subject: parent,
        timeout,
        itemName: `Element ${selector}`,
    });
    return element;
}
