export function bubblesort(array, comparator) {
    for (let i = 0; i < array.length(); i++)
        for (let j = 0; j < array.length() - i - 1; j++)
            if (comparator(array.get(j), array.get(j + 1)) > 0)
                array.swap(j, j + 1);
}
export function quicksort(array, comparator) {
    function partition(arr, low, high) {
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
    function sort(arr, low, high) {
        if (low < high) {
            const pi = partition(arr, low, high);
            sort(arr, low, pi - 1);
            sort(arr, pi + 1, high);
        }
    }
    return sort(array, 0, array.length() - 1);
}
export function mergesort(arr, comparator) {
    function merge(arr, l, m, r) {
        const a = m - l + 1;
        const b = r - m;
        const left = Array(a).fill(undefined);
        const right = Array(b).fill(undefined);
        for (let i = 0; i < a; i++)
            left[i] = arr.get(l + i);
        for (let j = 0; j < b; j++)
            right[j] = arr.get(m + 1 + j);
        let i = 0, j = 0, k = l;
        while (i < a && j < b)
            arr.set(k++, comparator(left[i], right[j]) <= 0 ? left[i++] : right[j++]);
        while (i < a)
            arr.set(k++, left[i++]);
        while (j < b)
            arr.set(k++, right[j++]);
    }
    for (let size = 1; size <= arr.length() - 1; size = 2 * size) {
        for (let left = 0; left < arr.length() - 1; left += 2 * size) {
            const mid = Math.min(left + size - 1, arr.length() - 1);
            const right = Math.min(left + 2 * size - 1, arr.length() - 1);
            merge(arr, left, mid, right);
        }
    }
}
