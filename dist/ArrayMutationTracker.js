export class ArrayMutationTracker {
    #array;
    #history;
    constructor(array, history = []) {
        this.#array = array;
        this.#history = history;
        this.#history.push([...array]);
    }
    length() {
        return this.#array.length;
    }
    get(index) {
        return this.#array[index];
    }
    swap(x, y) {
        const temp = this.#array[x];
        this.set(x, this.#array[y]);
        this.set(y, temp);
    }
    set(index, value) {
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
