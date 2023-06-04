function swap(arr, i, j) {
    let temp;
    temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    return arr;
}

async function quickSort(array, setArray, setSorting, sleep, setLow, setHigh, setI, setJ) {
    async function partition(low, high) {
        
        setLow(low);
        setHigh(high); 

        const pivot = array[low];
        let i = low + 1;
        let j = high

        while (i<=j) {
            setI(i);
            setJ(j); 

            while (i <= j && array[i] <= pivot) {
                i++;
            }

            while (i <= j && array[j] > pivot) {
                j--;
            }

            if (i < j) {
                // swaping the ith and jth elements
                let newArr = swap(array, i, j)
                setArray([...newArr]);
                await sleep(500); // Delay for visualization
            }
        }

        let newArr = swap(array, low, j);
        setArray([...newArr])
        await sleep(500)

        setLow(-1);
        setHigh(-1);

        return j;

    }

    async function sort(low, high) {
        if (low < high) {
            const pi = await partition(low, high);
            await sort(low, pi - 1);
            await sort(pi + 1, high);
        }
    }

    setSorting(true);
    await sort(0, array.length - 1);
    setSorting(false);
}

export default quickSort