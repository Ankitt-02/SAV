// Global variables
let array = []
let barContainer
let arraySize = 10
let comparisons = 0
let swaps = 0
let animationFrames = []
let currentStep = 0
let originalArray = []

// DOM elements
let algorithmSelect
let sizeSlider
let sizeValue
let generateBtn
let startBtn
let resetBtn
let prevBtn
let nextBtn
let comparisonsDisplay
let swapsDisplay
let currentStepDisplay
let totalStepsDisplay
let algorithmInfo
let pseudocodeElement
let currentOperationElement

// Algorithm information and pseudocode
const algorithmsData = {
  bubble: {
    name: "Bubble Sort",
    description:
      "Repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "procedure bubbleSort(A: list of sortable items)",
      "    n = length(A)",
      "    for i = 0 to n-1",
      "        for j = 0 to n-i-1",
      "            if A[j] > A[j+1]",
      "                swap(A[j], A[j+1])",
      "            end if",
      "        end for",
      "    end for",
      "end procedure",
    ],
    stepDescriptions: {
      compare: "Comparing elements at indices {0} and {1}: {2} vs {3}",
      swap: "Swapping elements at indices {0} and {1} because {2} > {3}",
      markSorted: "Element at index {0} with value {1} is now in its correct sorted position",
    },
    pseudocodeMap: {
      compare: 4,
      swap: 5,
      markSorted: 7,
    },
  },
  selection: {
    name: "Selection Sort",
    description: "Finds the minimum element from the unsorted part and puts it at the beginning of the unsorted part.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "procedure selectionSort(A: list of sortable items)",
      "    n = length(A)",
      "    for i = 0 to n-1",
      "        min_idx = i",
      "        for j = i+1 to n-1",
      "            if A[j] < A[min_idx]",
      "                min_idx = j",
      "            end if",
      "        end for",
      "        if min_idx ≠ i",
      "            swap(A[i], A[min_idx])",
      "        end if",
      "    end for",
      "end procedure",
    ],
    stepDescriptions: {
      compare: "Comparing current minimum at index {0} (value: {2}) with element at index {1} (value: {3})",
      swap: "Swapping minimum element found at index {1} (value: {3}) with element at index {0} (value: {2})",
      markSorted: "Element at index {0} with value {1} is now in its correct sorted position",
    },
    pseudocodeMap: {
      compare: 5,
      swap: 10,
      markSorted: 12,
    },
  },
  insertion: {
    name: "Insertion Sort",
    description: "Builds the sorted array one item at a time by comparing each with the already sorted elements.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "procedure insertionSort(A: list of sortable items)",
      "    n = length(A)",
      "    for i = 1 to n-1",
      "        key = A[i]",
      "        j = i-1",
      "        while j >= 0 and A[j] > key",
      "            A[j+1] = A[j]",
      "            j = j-1",
      "        end while",
      "        A[j+1] = key",
      "    end for",
      "end procedure",
    ],
    stepDescriptions: {
      compare: "Comparing key element at index {0} (value: {2}) with element at index {1} (value: {3})",
      overwrite: "Moving element from index {0} (value: {1}) one position ahead to make room for the key element",
      markSorted: "Inserted key element (value: {1}) at index {0}",
    },
    pseudocodeMap: {
      compare: 5,
      overwrite: 6,
      markSorted: 9,
    },
  },
  merge: {
    name: "Merge Sort",
    description: "Divides the array into halves, sorts them recursively, and then merges the sorted halves.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    pseudocode: [
      "procedure mergeSort(A: list of sortable items, left: integer, right: integer)",
      "    if left < right",
      "        middle = floor((left + right) / 2)",
      "        mergeSort(A, left, middle)",
      "        mergeSort(A, middle+1, right)",
      "        merge(A, left, middle, right)",
      "    end if",
      "end procedure",
      "",
      "procedure merge(A: list of sortable items, left: integer, middle: integer, right: integer)",
      "    create temporary arrays L and R",
      "    copy A[left..middle] to L and A[middle+1..right] to R",
      "    i = 0, j = 0, k = left",
      "    while i < length(L) and j < length(R)",
      "        if L[i] <= R[j]",
      "            A[k] = L[i]",
      "            i = i + 1",
      "        else",
      "            A[k] = R[j]",
      "            j = j + 1",
      "        end if",
      "        k = k + 1",
      "    end while",
      "    copy remaining elements of L and R to A",
      "end procedure",
    ],
    stepDescriptions: {
      compare:
        "Comparing elements from left subarray (index {0}, value: {2}) and right subarray (index {1}, value: {3})",
      overwrite: "Placing element with value {1} at index {0} in the merged array",
      markSorted: "Subarray from index {0} to index {1} is now sorted",
    },
    pseudocodeMap: {
      compare: 14,
      overwrite: 16,
      markSorted: 23,
    },
  },
  quick: {
    name: "Quick Sort",
    description: "Picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays.",
    timeComplexity: "O(n log n) average, O(n²) worst case",
    spaceComplexity: "O(log n)",
    pseudocode: [
      "procedure quickSort(A: list of sortable items, low: integer, high: integer)",
      "    if low < high",
      "        pivot_index = partition(A, low, high)",
      "        quickSort(A, low, pivot_index - 1)",
      "        quickSort(A, pivot_index + 1, high)",
      "    end if",
      "end procedure",
      "",
      "procedure partition(A: list of sortable items, low: integer, high: integer)",
      "    pivot = A[high]",
      "    i = low - 1",
      "    for j = low to high - 1",
      "        if A[j] < pivot",
      "            i = i + 1",
      "            swap(A[i], A[j])",
      "        end if",
      "    end for",
      "    swap(A[i+1], A[high])",
      "    return i + 1",
      "end procedure",
    ],
    stepDescriptions: {
      compare: "Comparing element at index {0} (value: {2}) with pivot element (value: {3})",
      swap: "Swapping elements at indices {0} and {1} with values {2} and {3}",
      markPivot: "Selected element at index {0} with value {1} as the pivot",
      markSorted: "Pivot element is now at index {0} with value {1} in its correct sorted position",
    },
    pseudocodeMap: {
      compare: 12,
      swap: 14,
      markPivot: 9,
      markSorted: 17,
    },
  },
  heap: {
    name: "Heap Sort",
    description: "Builds a max heap and repeatedly extracts the maximum element to get a sorted array.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    pseudocode: [
      "procedure heapSort(A: list of sortable items)",
      "    n = length(A)",
      "    // Build max heap",
      "    for i = floor(n/2) - 1 down to 0",
      "        heapify(A, n, i)",
      "    end for",
      "    // Extract elements one by one",
      "    for i = n-1 down to 0",
      "        swap(A[0], A[i])",
      "        heapify(A, i, 0)",
      "    end for",
      "end procedure",
      "",
      "procedure heapify(A: list of sortable items, n: integer, i: integer)",
      "    largest = i",
      "    left = 2*i + 1",
      "    right = 2*i + 2",
      "    if left < n and A[left] > A[largest]",
      "        largest = left",
      "    end if",
      "    if right < n and A[right] > A[largest]",
      "        largest = right",
      "    end if",
      "    if largest ≠ i",
      "        swap(A[i], A[largest])",
      "        heapify(A, n, largest)",
      "    end if",
      "end procedure",
    ],
    stepDescriptions: {
      compare: "Comparing parent node at index {0} (value: {2}) with child node at index {1} (value: {3})",
      swap: "Swapping parent at index {0} (value: {2}) with larger child at index {1} (value: {3})",
      markSorted: "Extracted maximum element to index {0} with value {1}",
    },
    pseudocodeMap: {
      compare: 17,
      swap: 23,
      markSorted: 9,
    },
  },
  shell: {
    name: "Shell Sort",
    description:
      "An extension of insertion sort that allows the exchange of items that are far apart, using a gap sequence.",
    timeComplexity: "O(n log n) to O(n²) depending on gap sequence",
    spaceComplexity: "O(1)",
    pseudocode: [
      "procedure shellSort(A: list of sortable items)",
      "    n = length(A)",
      "    gap = floor(n/2)",
      "    while gap > 0",
      "        for i = gap to n-1",
      "            temp = A[i]",
      "            j = i",
      "            while j >= gap and A[j-gap] > temp",
      "                A[j] = A[j-gap]",
      "                j = j - gap",
      "            end while",
      "            A[j] = temp",
      "        end for",
      "        gap = floor(gap/2)",
      "    end while",
      "end procedure",
    ],
    stepDescriptions: {
      compare: "Comparing elements at gap distance: index {0} (value: {2}) with index {1} (value: {3})",
      overwrite: "Moving element from index {0} (value: {1}) to index {2}",
      markSorted: "Completed gap sequence {0}, elements are more sorted",
    },
    pseudocodeMap: {
      compare: 7,
      overwrite: 8,
      markSorted: 13,
    },
  },
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Get DOM elements
    barContainer = document.getElementById("bars-container")
    algorithmSelect = document.getElementById("algorithm")
    sizeSlider = document.getElementById("size")
    sizeValue = document.getElementById("size-value")
    generateBtn = document.getElementById("generate")
    startBtn = document.getElementById("start")
    resetBtn = document.getElementById("reset")
    prevBtn = document.getElementById("prev")
    nextBtn = document.getElementById("next")
    comparisonsDisplay = document.getElementById("comparisons")
    swapsDisplay = document.getElementById("swaps")
    currentStepDisplay = document.getElementById("current-step")
    totalStepsDisplay = document.getElementById("total-steps")
    algorithmInfo = document.getElementById("algorithm-info")
    pseudocodeElement = document.getElementById("pseudocode")
    currentOperationElement = document.getElementById("current-operation")

    // Initialize slider
    if (sizeSlider) {
      sizeSlider.min = 5
      sizeSlider.max = 20
      sizeSlider.value = 10
      arraySize = 10
      sizeValue.textContent = arraySize
    }

    // Set initial algorithm info and pseudocode
    updateAlgorithmInfo()

    // Event listeners
    algorithmSelect?.addEventListener("change", updateAlgorithmInfo)
    sizeSlider?.addEventListener("input", function () {
      arraySize = this.value
      sizeValue.textContent = arraySize
      generateArray()
    })
    generateBtn?.addEventListener("click", generateArray)
    startBtn?.addEventListener("click", generateSteps)
    resetBtn?.addEventListener("click", resetVisualization)
    prevBtn?.addEventListener("click", previousStep)
    nextBtn?.addEventListener("click", nextStep)

    // Generate initial array
    generateArray()
  } catch (error) {
    console.error("Initialization error:", error)
    alert("Failed to initialize the application. Please check the console for details.")
  }
})

// Update algorithm information and pseudocode
function updateAlgorithmInfo() {
  try {
    const algorithm = algorithmSelect.value
    const data = algorithmsData[algorithm]

    algorithmInfo.innerHTML = `
      <h3>${data.name}</h3>
      <p>${data.description}</p>
      <div class="complexity">
        <span>Time Complexity: ${data.timeComplexity}</span>
        <span>Space Complexity: ${data.spaceComplexity}</span>
      </div>
    `

    // Update pseudocode
    updatePseudocode()
  } catch (error) {
    console.error("Error updating algorithm info:", error)
  }
}

// Update pseudocode display
function updatePseudocode() {
  try {
    const algorithm = algorithmSelect.value
    const pseudocode = algorithmsData[algorithm].pseudocode

    pseudocodeElement.innerHTML = ""

    pseudocode.forEach((line, index) => {
      const lineElement = document.createElement("div")
      lineElement.className = "pseudocode-line"
      lineElement.textContent = line
      lineElement.dataset.lineNumber = index
      pseudocodeElement.appendChild(lineElement)
    })
  } catch (error) {
    console.error("Error updating pseudocode:", error)
  }
}

// Highlight a specific line in the pseudocode
function highlightPseudocodeLine(lineNumber) {
  try {
    // Remove previous highlighting
    const allLines = document.querySelectorAll(".pseudocode-line")
    allLines.forEach((line) => line.classList.remove("active-line"))

    // Add highlighting to the current line
    if (lineNumber >= 0) {
      const activeLine = document.querySelector(`.pseudocode-line[data-line-number="${lineNumber}"]`)
      if (activeLine) {
        activeLine.classList.add("active-line")
        // Scroll to the active line
        activeLine.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  } catch (error) {
    console.error("Error highlighting pseudocode line:", error)
  }
}

// Generate a random array
function generateArray() {
  try {
    resetVisualization()
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 100) + 1)
    originalArray = [...array]
    renderBars()
  } catch (error) {
    console.error("Error generating array:", error)
  }
}

// Render the bars based on the array
function renderBars() {
  try {
    barContainer.innerHTML = ""
    const maxValue = Math.max(...array)
    const barWidth = barContainer.clientWidth / array.length - 2

    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement("div")
      bar.className = "bar"
      bar.style.height = `${(array[i] / maxValue) * 90}%`
      bar.style.width = `${barWidth}px`
      barContainer.appendChild(bar)
    }
  } catch (error) {
    console.error("Error rendering bars:", error)
  }
}

// Generate steps for the selected algorithm
function generateSteps() {
  try {
    resetStats()
    animationFrames = []
    currentStep = 0

    // Reset array to original state
    array = [...originalArray]
    renderBars()

    const algorithm = algorithmSelect.value
    const arrayCopy = [...array]

    switch (algorithm) {
      case "bubble":
        bubbleSort(arrayCopy)
        break
      case "selection":
        selectionSort(arrayCopy)
        break
      case "insertion":
        insertionSort(arrayCopy)
        break
      case "merge":
        mergeSort(arrayCopy, 0, arrayCopy.length - 1)
        break
      case "quick":
        quickSort(arrayCopy, 0, arrayCopy.length - 1)
        break
      case "heap":
        heapSort(arrayCopy)
        break
      case "shell":
        shellSort(arrayCopy)
        break
      default:
        throw new Error("Unknown sorting algorithm: " + algorithm)
    }

    // Enable navigation buttons if there are steps
    if (animationFrames.length > 0) {
      nextBtn.disabled = false
      prevBtn.disabled = true
      startBtn.disabled = true

      totalStepsDisplay.textContent = animationFrames.length
      currentStepDisplay.textContent = "0"

      updateCurrentOperation("Click 'Next' to start stepping through the algorithm.")
    }
  } catch (error) {
    console.error("Error generating steps:", error)
    alert("Error generating steps. Please check the console for details.")
  }
}

// Go to the next step
function nextStep() {
  try {
    if (currentStep >= animationFrames.length) return

    const frame = animationFrames[currentStep]
    currentStep++

    currentStepDisplay.textContent = currentStep

    // Update current operation text
    updateCurrentOperationFromFrame(frame)

    // Highlight corresponding pseudocode line
    highlightPseudocodeLine(getPseudocodeLineForFrame(frame))

    // Apply the animation frame
    applyAnimationFrame(frame)

    // Update navigation buttons
    prevBtn.disabled = false
    nextBtn.disabled = currentStep >= animationFrames.length

    // If we've reached the end, mark all as sorted
    if (currentStep >= animationFrames.length) {
      markAllSorted()
    }
  } catch (error) {
    console.error("Error going to next step:", error)
    alert("Error going to next step. Please check the console for details.")
  }
}

// Go to the previous step
function previousStep() {
  try {
    if (currentStep <= 0) return

    currentStep--
    currentStepDisplay.textContent = currentStep

    // Reset to the state before the current step
    resetToStep(currentStep)

    // Update navigation buttons
    nextBtn.disabled = false
    prevBtn.disabled = currentStep <= 0

    // Update description and current operation
    if (currentStep === 0) {
      updateCurrentOperation("Click 'Next' to start stepping through the algorithm.")
      highlightPseudocodeLine(-1) // No line highlighted
    } else {
      const frame = animationFrames[currentStep - 1]
      updateCurrentOperationFromFrame(frame)
      highlightPseudocodeLine(getPseudocodeLineForFrame(frame))
    }
  } catch (error) {
    console.error("Error going to previous step:", error)
    alert("Error going to previous step. Please check the console for details.")
  }
}

// Get the corresponding pseudocode line for a frame
function getPseudocodeLineForFrame(frame) {
  try {
    const algorithm = algorithmSelect.value
    const pseudocodeMap = algorithmsData[algorithm].pseudocodeMap

    return pseudocodeMap[frame.type] || -1
  } catch (error) {
    console.error("Error getting pseudocode line for frame:", error)
    return -1
  }
}

// Update the current operation text
function updateCurrentOperation(text) {
  try {
    currentOperationElement.innerHTML = `<i class="fas fa-info-circle"></i><span>${text}</span>`
  } catch (error) {
    console.error("Error updating current operation:", error)
  }
}

// Update current operation from frame
function updateCurrentOperationFromFrame(frame) {
  try {
    const algorithm = algorithmSelect.value
    let operationText = ""

    if (frame.type === "compare") {
      operationText = `Comparing elements at indices ${frame.indices[0]} and ${frame.indices[1]}`
    } else if (frame.type === "swap") {
      operationText = `Swapping elements at indices ${frame.indices[0]} and ${frame.indices[1]}`
    } else if (frame.type === "overwrite") {
      operationText = `Placing value ${frame.value} at index ${frame.index}`
    } else if (frame.type === "mark-sorted") {
      if (frame.indices.length === 1) {
        operationText = `Element at index ${frame.indices[0]} is now in its correct position`
      } else {
        operationText = `Subarray from index ${frame.indices[0]} to index ${frame.indices[frame.indices.length - 1]} is now sorted`
      }
    } else if (frame.type === "mark-pivot") {
      operationText = `Selected element at index ${frame.index} as pivot`
    }

    updateCurrentOperation(operationText)
  } catch (error) {
    console.error("Error updating current operation from frame:", error)
  }
}

// Reset visualization to a specific step
function resetToStep(step) {
  try {
    // Reset array and stats
    array = [...originalArray]
    resetStats()

    // Apply all frames up to the current step
    for (let i = 0; i < step; i++) {
      const frame = animationFrames[i]

      if (frame.type === "compare") {
        comparisons++
      } else if (frame.type === "swap") {
        swaps++
        ;[array[frame.indices[0]], array[frame.indices[1]]] = [frame.values[0], frame.values[1]]
      } else if (frame.type === "overwrite") {
        array[frame.index] = frame.value
      }
    }

    // Update stats display
    updateStats()

    // Re-render bars
    renderBars()

    // Apply visual effects for the current state
    const bars = barContainer.children

    // Clear all visual effects
    for (let i = 0; i < bars.length; i++) {
      bars[i].className = "bar"
    }

    // Apply visual effects based on the frames up to the current step
    for (let i = 0; i < step; i++) {
      const frame = animationFrames[i]

      if (frame.type === "mark-sorted") {
        for (const idx of frame.indices) {
          if (idx >= 0 && idx < bars.length) {
            bars[idx].classList.add("sorted")
          }
        }
      } else if (frame.type === "mark-pivot") {
        if (i === step - 1) {
          bars[frame.index].classList.add("pivot")
        }
      }
    }

    // Apply comparison highlighting for the current step
    if (step > 0) {
      const prevFrame = animationFrames[step - 1]
      if (prevFrame.type === "compare") {
        bars[prevFrame.indices[0]].classList.add("comparing")
        bars[prevFrame.indices[1]].classList.add("comparing")
      }
    }
  } catch (error) {
    console.error("Error resetting to step:", error)
    alert("Error resetting to step. Please check the console for details.")
  }
}

// Apply a single animation frame
function applyAnimationFrame(frame) {
  try {
    const bars = barContainer.children

    // Remove all comparison highlights
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.remove("comparing")
    }

    if (frame.type === "compare") {
      comparisons++
      updateStats()

      bars[frame.indices[0]].classList.add("comparing")
      bars[frame.indices[1]].classList.add("comparing")
    } else if (frame.type === "swap") {
      swaps++
      updateStats()
      ;[array[frame.indices[0]], array[frame.indices[1]]] = [array[frame.indices[1]], array[frame.indices[0]]]

      bars[frame.indices[0]].style.height = `${(array[frame.indices[0]] / Math.max(...array)) * 90}%`
      bars[frame.indices[1]].style.height = `${(array[frame.indices[1]] / Math.max(...array)) * 90}%`

      bars[frame.indices[0]].classList.add("comparing")
      bars[frame.indices[1]].classList.add("comparing")
    } else if (frame.type === "overwrite") {
      array[frame.index] = frame.value

      bars[frame.index].style.height = `${(array[frame.index] / Math.max(...array)) * 90}%`
      bars[frame.index].classList.add("comparing")
    } else if (frame.type === "mark-sorted") {
      for (const idx of frame.indices) {
        bars[idx].classList.add("sorted")
      }
    } else if (frame.type === "mark-pivot") {
      bars[frame.index].classList.add("pivot")
    }
  } catch (error) {
    console.error("Error applying animation frame:", error)
    alert("Error applying animation frame. Please check the console for details.")
  }
}

// Mark all elements as sorted
function markAllSorted() {
  try {
    const bars = barContainer.children
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.remove("comparing")
      bars[i].classList.remove("pivot")
      bars[i].classList.add("sorted")
    }

    updateCurrentOperation("Sorting complete! All elements are now in their correct positions.")
    highlightPseudocodeLine(-1) // No line highlighted
  } catch (error) {
    console.error("Error marking all sorted:", error)
  }
}

// Reset the visualization
function resetVisualization() {
  try {
    array = [...originalArray]
    resetStats()
    renderBars()

    animationFrames = []
    currentStep = 0

    // Reset buttons
    startBtn.disabled = false
    prevBtn.disabled = true
    nextBtn.disabled = true

    // Reset step displays
    currentStepDisplay.textContent = "0"
    totalStepsDisplay.textContent = "0"

    // Reset step description and current operation
    updateCurrentOperation('Select an algorithm and click "Generate Steps" to begin.')

    // Reset pseudocode highlighting
    highlightPseudocodeLine(-1)
  } catch (error) {
    console.error("Error resetting visualization:", error)
  }
}

// Reset statistics
function resetStats() {
  comparisons = 0
  swaps = 0
  updateStats()
}

// Update statistics display
function updateStats() {
  comparisonsDisplay.textContent = comparisons
  swapsDisplay.textContent = swaps
}

// Bubble Sort Algorithm
function bubbleSort(arr) {
  const n = arr.length

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Add comparison step
      animationFrames.push({
        type: "compare",
        indices: [j, j + 1],
        originalValues: [arr[j], arr[j + 1]],
      })

      if (arr[j] > arr[j + 1]) {
        // Swap
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

        // Add swap step
        animationFrames.push({
          type: "swap",
          indices: [j, j + 1],
          values: [arr[j], arr[j + 1]],
          originalValues: [arr[j + 1], arr[j]],
        })
      }
    }

    // Mark the last element of this pass as sorted
    animationFrames.push({
      type: "mark-sorted",
      indices: [n - i - 1],
    })
  }
}

// Selection Sort Algorithm
function selectionSort(arr) {
  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    for (let j = i + 1; j < n; j++) {
      // Add comparison step
      animationFrames.push({
        type: "compare",
        indices: [minIdx, j],
        originalValues: [arr[minIdx], arr[j]],
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      // Swap
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]

      // Add swap step
      animationFrames.push({
        type: "swap",
        indices: [i, minIdx],
        values: [arr[i], arr[minIdx]],
        originalValues: [arr[minIdx], arr[i]],
      })
    }

    // Mark the element as sorted
    animationFrames.push({
      type: "mark-sorted",
      indices: [i],
    })
  }

  // Mark the last element as sorted
  animationFrames.push({
    type: "mark-sorted",
    indices: [n - 1],
  })
}

// Insertion Sort Algorithm
function insertionSort(arr) {
  const n = arr.length

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    while (j >= 0) {
      // Add comparison step
      animationFrames.push({
        type: "compare",
        indices: [j, i],
        originalValues: [arr[j], key],
      })

      if (arr[j] > key) {
        arr[j + 1] = arr[j]

        // Add overwrite step
        animationFrames.push({
          type: "overwrite",
          index: j + 1,
          value: arr[j],
        })

        j--
      } else {
        break
      }
    }

    arr[j + 1] = key

    // Add overwrite step for the key
    animationFrames.push({
      type: "overwrite",
      index: j + 1,
      value: key,
    })

    // Mark elements as sorted up to current position
    const sortedIndices = []
    for (let k = 0; k <= i; k++) {
      sortedIndices.push(k)
    }

    animationFrames.push({
      type: "mark-sorted",
      indices: sortedIndices,
    })
  }
}

// Merge Sort Algorithm
function mergeSort(arr, left, right) {
  if (left >= right) return

  const mid = Math.floor((left + right) / 2)

  mergeSort(arr, left, mid)
  mergeSort(arr, mid + 1, right)

  merge(arr, left, mid, right)
}

function merge(arr, left, mid, right) {
  const n1 = mid - left + 1
  const n2 = right - mid

  // Create temp arrays
  const L = new Array(n1)
  const R = new Array(n2)

  // Copy data to temp arrays
  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i]
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j]
  }

  // Merge the temp arrays back
  let i = 0,
    j = 0,
    k = left

  while (i < n1 && j < n2) {
    // Add comparison step
    animationFrames.push({
      type: "compare",
      indices: [left + i, mid + 1 + j],
      originalValues: [L[i], R[j]],
    })

    if (L[i] <= R[j]) {
      arr[k] = L[i]

      // Add overwrite step
      animationFrames.push({
        type: "overwrite",
        index: k,
        value: L[i],
      })

      i++
    } else {
      arr[k] = R[j]

      // Add overwrite step
      animationFrames.push({
        type: "overwrite",
        index: k,
        value: R[j],
      })

      j++
    }
    k++
  }

  // Copy remaining elements of L[]
  while (i < n1) {
    arr[k] = L[i]

    // Add overwrite step
    animationFrames.push({
      type: "overwrite",
      index: k,
      value: L[i],
    })

    i++
    k++
  }

  // Copy remaining elements of R[]
  while (j < n2) {
    arr[k] = R[j]

    // Add overwrite step
    animationFrames.push({
      type: "overwrite",
      index: k,
      value: R[j],
    })

    j++
    k++
  }

  // Mark the merged section as sorted
  const indices = []
  for (let i = left; i <= right; i++) {
    indices.push(i)
  }

  animationFrames.push({
    type: "mark-sorted",
    indices: indices,
  })
}

// Quick Sort Algorithm
function quickSort(arr, low, high) {
  if (low < high) {
    // Mark pivot
    animationFrames.push({
      type: "mark-pivot",
      index: high,
    })

    const pi = partition(arr, low, high)

    quickSort(arr, low, pi - 1)
    quickSort(arr, pi + 1, high)
  }
}

function partition(arr, low, high) {
  const pivot = arr[high]
  let i = low - 1

  for (let j = low; j < high; j++) {
    // Add comparison step
    animationFrames.push({
      type: "compare",
      indices: [j, high],
      originalValues: [arr[j], pivot],
    })

    if (arr[j] < pivot) {
      i++

      // Swap
      ;[arr[i], arr[j]] = [arr[j], arr[i]]

      // Add swap step
      animationFrames.push({
        type: "swap",
        indices: [i, j],
        values: [arr[i], arr[j]],
        originalValues: [arr[j], arr[i]],
      })
    }
  }
  // Swap arr[i+1] and arr[high]
  ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]

  // Add swap step
  animationFrames.push({
    type: "swap",
    indices: [i + 1, high],
    values: [arr[i + 1], arr[high]],
    originalValues: [arr[high], arr[i + 1]],
  })

  // Mark pivot in its final position
  animationFrames.push({
    type: "mark-sorted",
    indices: [i + 1],
  })

  return i + 1
}

// Heap Sort Algorithm
function heapSort(arr) {
  const n = arr.length

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i)
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap root with last element
    ;[arr[0], arr[i]] = [arr[i], arr[0]]

    // Add swap step
    animationFrames.push({
      type: "swap",
      indices: [0, i],
      values: [arr[0], arr[i]],
      originalValues: [arr[i], arr[0]],
    })

    // Mark as sorted
    animationFrames.push({
      type: "mark-sorted",
      indices: [i],
    })

    // Heapify the reduced heap
    heapify(arr, i, 0)
  }

  // Mark the first element as sorted
  animationFrames.push({
    type: "mark-sorted",
    indices: [0],
  })
}

function heapify(arr, n, i) {
  let largest = i
  const left = 2 * i + 1
  const right = 2 * i + 2

  // If left child is larger than root
  if (left < n) {
    // Add comparison step
    animationFrames.push({
      type: "compare",
      indices: [largest, left],
      originalValues: [arr[largest], arr[left]],
    })

    if (arr[left] > arr[largest]) {
      largest = left
    }
  }

  // If right child is larger than largest so far
  if (right < n) {
    // Add comparison step
    animationFrames.push({
      type: "compare",
      indices: [largest, right],
      originalValues: [arr[largest], arr[right]],
    })

    if (arr[right] > arr[largest]) {
      largest = right
    }
  }

  // If largest is not root
  if (largest !== i) {
    // Swap
    ;[arr[i], arr[largest]] = [arr[largest], arr[i]]

    // Add swap step
    animationFrames.push({
      type: "swap",
      indices: [i, largest],
      values: [arr[i], arr[largest]],
      originalValues: [arr[largest], arr[i]],
    })

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest)
  }
}

// Shell Sort Algorithm
function shellSort(arr) {
  const n = arr.length
  let gap = Math.floor(n / 2)

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i]
      let j = i

      while (j >= gap) {
        // Add comparison step
        animationFrames.push({
          type: "compare",
          indices: [j - gap, j],
          originalValues: [arr[j - gap], temp],
        })

        if (arr[j - gap] > temp) {
          arr[j] = arr[j - gap]

          // Add overwrite step
          animationFrames.push({
            type: "overwrite",
            index: j,
            value: arr[j - gap],
          })

          j -= gap
        } else {
          break
        }
      }

      arr[j] = temp

      // Add overwrite step for the temp element
      animationFrames.push({
        type: "overwrite",
        index: j,
        value: temp,
      })
    }

    // Mark completion of this gap sequence
    animationFrames.push({
      type: "mark-sorted",
      indices: [gap],
    })

    gap = Math.floor(gap / 2)
  }
}
