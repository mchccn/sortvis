import type { ArrayMutationTracker } from "./ArrayMutationTracker.js";

export function bubblesort<T>(array: ArrayMutationTracker<T>, comparator: (a: T, b: T) => number) {
    for (let i = 0; i < array.length(); i++)
        for (let j = 0; j < array.length() - i - 1; j++)
            if (comparator(array.get(j), array.get(j + 1)) > 0) array.swap(j, j + 1);
}

export function quicksort<T>(array: ArrayMutationTracker<T>, comparator: (a: T, b: T) => number) {
    function partition(arr: ArrayMutationTracker<T>, low: number, high: number) {
        const pivot = arr.get(high);

        let i = low - 1;

        for (let j = low; j <= high - 1; j++) {
            if (comparator(arr.get(j), pivot) <= 0) {
                i++;

                arr.swap(i, j);
            }
        }

        arr.swap(i + 1, high);

        return i + 1;
    }

    function sort(arr: ArrayMutationTracker<T>, low: number, high: number) {
        if (low < high) {
            const pi = partition(arr, low, high);

            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }

    return sort(array, 0, array.length() - 1);
}

export function mergesort<T>(arr: ArrayMutationTracker<T>, comparator: (a: T, b: T) => number) {
    function merge(arr: ArrayMutationTracker<T>, l: number, m: number, r: number) {
        const a = m - l + 1;
        const b = r - m;

        const left: T[] = Array(a).fill(undefined);
        const right: T[] = Array(b).fill(undefined);

        for (let i = 0; i < a; i++) left[i] = arr.get(l + i);
        for (let j = 0; j < b; j++) right[j] = arr.get(m + 1 + j);

        let i = 0;
        let j = 0;
        let k = l;

        while (i < a && j < b) {
            if (comparator(left[i], right[j]) <= 0) {
                arr.set(k, left[i]);
                i++;
            } else {
                arr.set(k, right[j]);
                j++;
            }
            k++;
        }

        while (i < a) {
            arr.set(k, left[i]);
            i++;
            k++;
        }

        while (j < b) {
            arr.set(k, right[j]);
            j++;
            k++;
        }
    }

    for (let size = 1; size <= arr.length() - 1; size = 2 * size) {
        for (let left = 0; left < arr.length() - 1; left += 2 * size) {
            const mid = Math.min(left + size - 1, arr.length() - 1);
            const right = Math.min(left + 2 * size - 1, arr.length() - 1);
            merge(arr, left, mid, right);
        }
    }
}
