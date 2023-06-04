import React, { useState, useEffect }  from "react";
import "./styles.css";

import quickSort from "../sorting/quicksort";

function Home() {
	const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
	const [selectedSortingMethod, setSelectedSortingMethod] = useState('quicksort');
	const [low, setLow] = useState(-1);
  const [high, setHigh] = useState(-1);
  const [i, setI] = useState(-1);
  const [j, setJ] = useState(-1);

	function sleep(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function sortArray(array, sortingMethod, setArray, setSorting) {
		switch (sortingMethod) {
			case 'quickSort':
				return quickSort(array, setArray, setSorting, sleep, setLow, setHigh, setI, setJ);
			default:
				return quickSort(array, setArray, setSorting, sleep, setLow, setHigh, setI, setJ);
		}
	}

	function generateRandomArray(size, min, max) {
		const array = [];
		for (let i = 0; i < size; i++) {
			const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
			array.push(randomNumber);
		}
		return array;
	}

  useEffect(() => {
    resetArray();
  }, []);

	const handleSort = async () => {
    if (!sorting) {
      await sortArray(array, selectedSortingMethod, setArray, setSorting, setLow, setHigh, setI, setJ);
    }
  };

	const handleSortingMethodChange = e => {
    setSelectedSortingMethod(e.target.value);
  };

  const resetArray = () => {
    const newArray = generateRandomArray(100, 5, 500);
    setArray(newArray);
    setSorting(false);
  };

	return (
		<div className="App">
			<header className="App-header">
				<h1>Visual Sorter</h1>
				<button onClick={resetArray}>Generate New Array</button>
				<select value={selectedSortingMethod} onChange={handleSortingMethodChange} disabled={sorting}>
          {/* <option value="bubbleSort">Bubble Sort</option>
          <option value="mergeSort">Merge Sort</option> */}
          <option value="quickSort">Quick Sort</option>
          {/* <option value="selectionSort">Selection Sort</option> */}
        </select>
				<button onClick={handleSort} disabled={sorting}>
					Start
				</button>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className={`array-bar ${idx === low || idx === high ? 'highlight' : ''} ${idx === i || idx === j ? 'highlight-index' : ''}`}
							key={idx}
							style={{ height: `${value}px` }}
						></div>
					))}
				</div>
			</header>
	</div>
	)
}

export default Home