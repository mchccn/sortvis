export function select(options, initial, element) {
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
        }
        else {
            const option = document.createElement("option");
            option.value = opt;
            option.textContent = opt;
            element.append(option);
        }
    });
    element.value = initial;
    const listeners = new Set();
    const onchange = (e) => {
        if (!(e.target instanceof HTMLSelectElement) || e.target !== element)
            return;
        listeners.forEach((listener) => listener.call(e.target, e.target.value));
    };
    element.addEventListener("change", onchange);
    return {
        get: () => element.value,
        set: (value) => (element.value = value),
        onchange: (listener) => void listeners.add(listener),
        offchange: (listener) => listeners.delete(listener),
        destroy: () => {
            listeners.clear();
            element.removeEventListener("change", onchange);
        },
    };
}
