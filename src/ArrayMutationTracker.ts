export class ArrayMutationTracker<T> {
    #array: T[];
    #history: T[][];

    constructor (array: T[], history: T[][] = []) {
        this.#array = array;

        this.#history = history;
        this.#history.push([...array]);
    }

    length() {
        return this.#array.length;
    }

    get(index: number) {
        return this.#array[index];
    }

    swap(x: number, y: number) {
        const temp = this.#array[x];

        this.set(x, this.#array[y]);
        this.set(y, temp);
    }

    set(index: number, value: T) {
        this.#array[index] = value;
        this.#history.push([...this.#array]);
    }

    array() {
        return [...this.#array];
    }

    history() {
        return [...this.#history.map((snapshot) => [...snapshot])];
    }

    latest() {
        return [...this.#history[this.#history.length - 1]];
    }

    reset() {
        this.#array = this.#history[0];
        this.#history = [];
    }
}