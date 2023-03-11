export function select<T extends string>(options: T[] | T[][], initial: T, element: HTMLSelectElement) {
    element.innerHTML = "";

    options.forEach((opt) => {
        if (Array.isArray(opt)) {
            const group = document.createElement("optgroup");

            opt.forEach((value) => {
                const option = document.createElement("option");

                option.value = value;
                option.textContent = value;

                group.append(option);
            });

            element.append(group);
        } else {
            const option = document.createElement("option");

            option.value = opt;
            option.textContent = opt;

            element.append(option);
        }
    });

    element.value = initial;

    const listeners = new Set<(value: T) => void>();

    const onchange = (e: Event) => {
        if (!(e.target instanceof HTMLSelectElement) || e.target !== element) return;

        listeners.forEach((listener) => listener.call(e.target, (e.target as HTMLSelectElement).value as T));
    };

    element.addEventListener("change", onchange);

    return {
        get: () => element.value as T,
        set: (value: T) => (element.value = value),
        onchange: (listener: (this: HTMLSelectElement, value: T) => void) => void listeners.add(listener),
        offchange: (listener: (this: HTMLSelectElement, value: T) => void) => listeners.delete(listener),
        destroy: () => {
            listeners.clear();

            element.removeEventListener("change", onchange);
        },
    }
}
