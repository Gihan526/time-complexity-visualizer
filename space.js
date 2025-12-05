// Space Complexity Visualizer - Black & White Theme with Detailed Graphs

const memoryFunctions = {
    'O(1)': (n) => 1,
    'O(log n)': (n) => Math.log2(n + 1),
    'O(n)': (n) => n,
    'O(n log n)': (n) => n * Math.log2(n + 1),
    'O(n²)': (n) => (n * n) / 4
};

const spaceProfiles = {
    'O(1)': {
        name: 'Constant Space - O(1)',
        example: 'Simple variable, fixed buffer'
    },
    'O(log n)': {
        name: 'Logarithmic Space - O(log n)',
        example: 'Binary search recursion, balanced tree'
    },
    'O(n)': {
        name: 'Linear Space - O(n)',
        example: 'Array copy, DFS stack'
    },
    'O(n log n)': {
        name: 'Linearithmic Space - O(n log n)',
        example: 'Merge sort auxiliary arrays'
    },
    'O(n²)': {
        name: 'Quadratic Space - O(n²)',
        example: 'Adjacency matrix, 2D DP table'
    }
};

const explanationTemplates = {
    'O(1)': {
        headline: 'Constant Space O(1) - The Memory Minimalist',
        intro: 'Imagine you have a task that requires exactly one sticky note, whether you\'re working with 10 items or 10 million items. That sticky note is all the memory you need, no matter what. This is O(1) space - constant memory that never grows.',
        keyPoints: [
            '📌 **What it means**: You use the exact same amount of memory regardless of input size. If your input has 5 items, you might use 2 variables. If it has 5 million items, you still use those same 2 variables.',
            '💡 **Why it happens**: You\'re only keeping track of a few things at once - maybe the current item, a counter, or a temporary value. You never store the whole dataset.',
            '🎯 **Example with numbers**: Processing array [1,2,3,4,5] vs [1,2,...,1000000]. In both cases, you only need space for: current_value, sum_total. That\'s it! Just 2 variables.',
            '✨ **The magic**: Even though you might LOOK at a million items, you don\'t STORE them all. You process one at a time and throw it away.'
        ],
        analogy: '🔖 **Real-life analogy**: You\'re counting people entering a stadium. You don\'t need to remember each person\'s face - you just keep a running tally on your clicker. Whether 100 or 100,000 people enter, you only need that one clicker (constant memory).',
        realWorld: [
            'Swapping two numbers: temp = a; a = b; b = temp → Only 3 variables, always!',
            'Finding sum of array: Just keep a running total, don\'t store each number',
            'Checking if array[5] exists: Jump directly to position 5, no extra storage needed',
            'Reversing array in-place: Swap items from both ends moving inward, no copy needed'
        ],
        codeExample: `# O(1) Space - Sum of Array
def sum_array(arr):
    total = 0  # Only 1 variable!
    for num in arr:
        total += num  # Process & discard
    return total

# Works same for 5 or 5 million items
sum_array([1,2,3,4,5])  # Uses: total
sum_array([1]*1000000)  # Still uses: total

📝 HOW IT WORKS:
• We create ONE variable 'total' to store the sum
• Loop through array, adding each number to total
• Each iteration processes one number then forgets it
• Array size doesn't matter - we only need 'total'

💾 SPACE COMPLEXITY: O(1)
• Memory used: 1 variable (total)
• Input size = 5 → Memory = 1
• Input size = 1,000,000 → Memory = 1
• The memory stays constant!`,

        takeaway: '🏆 **Bottom line**: O(1) is the BEST possible space complexity. Your program uses the same tiny amount of memory whether handling a handful or a billion items. Like using one bookmark for any size book!',
        animation: '🎬 **What you\'re seeing**: The animation shows the same few memory blocks/frames no matter how you change the input slider. Drag it from 1 to 32 - the memory stays flat! That\'s constant space in action.',
        graph: '📊 **The graph**: Notice the completely flat horizontal line? That\'s the hallmark of O(1). Input size changes along the bottom (x-axis), but memory (y-axis) stays rock solid at 1 unit.'
    },
    'O(log n)': {
        headline: 'Logarithmic Space O(log n) - The Smart Halver',
        intro: 'Think about looking up a word in a dictionary. You don\'t check every page - you open to the middle, see if your word comes before or after, then repeat with the remaining half. Each "half" step needs one bookmark to remember where you are. This is O(log n) space.',
        keyPoints: [
            '📌 **What it means**: Memory grows, but incredibly slowly. The pattern: n=1→1 unit, n=2→2 units, n=4→2 units, n=8→3 units, n=16→4 units, n=32→5 units. See how you need 5x memory for 32x more data? That\'s the magic!',
            '💡 **The math behind it**: log₂(n) means "how many times can I divide n by 2 until I get to 1?" For n=8: 8→4→2→1 (3 divisions) = 3 units of memory. For n=1024: you only need 10 units!',
            '🎯 **Concrete example**: Binary search on sorted list [1,2,3,4,5,6,7,8]. You check middle (4), realize you want bigger, check middle of right half (6), realize you want smaller, check 5. That\'s 3 checks = 3 stack frames = log₂(8).',
            '🔢 **Real numbers**: n=5 → log₂(6)=2.58≈3 blocks. n=10 → log₂(11)=3.46≈3 blocks. n=100 → log₂(101)=6.66≈7 blocks. Notice: 100 items only need 7 memory units!',
            '✨ **Why recursion creates this**: Each recursive call remembers one decision point. Binary search: "I checked middle, now search left/right." That decision lives on the call stack until the function returns.'
        ],
        analogy: '📚 **Real-life analogy**: Finding a specific page in a 1000-page book. First check page 500 - too far? Check 250. Still too far? Check 125. Each step you only remember YOUR page number, not all previous pages. After ~10 steps (log₂1000≈10), you found it using only 10 bookmarks!',
        realWorld: [
            'Recursive binary search: function search(arr, left, right) needs memory for each call → log₂(n) calls total',
            'Balanced tree traversal: Going from root to leaf in balanced binary search tree → log₂(n) depth',
            'Binary representation: Storing a number\'s bits requires log₂(n) space (32 bits for 4 billion)',
            'Merge sort recursion depth: Keeps splitting in half → log₂(n) stack depth (though total space is O(n) due to merging)'
        ],
        codeExample: `# O(log n) Space - Binary Search (Recursive)
def binary_search(arr, target, left, right):
    if left > right:
        return -1
    mid = (left + right) // 2
    
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, right)
    else:
        return binary_search(arr, target, left, mid-1)

# For array of size 8, max 3 recursive calls
# For array of size 1024, max 10 recursive calls!

📝 HOW IT WORKS:
• Check middle element of array
• If not found, recursively search left OR right half
• Each recursive call adds 1 stack frame
• Keeps halving the search space: n → n/2 → n/4 → ...

💾 SPACE COMPLEXITY: O(log n)
• Each call creates a stack frame with variables
• n=8: [8] → [4] → [2] → [1] = 3 frames
• n=1024: Only 10 frames needed!
• Stack depth = log₂(n) because we halve each time`,

        takeaway: '🏆 **Bottom line**: O(log n) is AMAZING for large data. It\'s almost as good as O(1). Going from 1,000 to 1,000,000 items? You only need ~10 more memory units. That\'s why binary search beats linear search!',
        animation: '🎬 **What you\'re seeing**: Start with n=2 (2-3 frames). Move slider to n=32 (5-6 frames). You needed 16x more input but only 2-3x more memory! The stack/blocks grow, but SO slowly. Watch closely - each doubling of n only adds 1 frame.',
        graph: '📊 **The graph**: See that gentle rising curve that flattens as it goes right? That\'s logarithmic growth. At n=32, you\'re barely at 5 units. Compare to the linear line - HUGE difference! The curve hugs the bottom.'
    },
    'O(n)': {
        headline: 'Linear Space O(n) - The One-to-One Relationship',
        intro: 'Imagine making a photocopy of a document. If you copy 1 page, you need space for 1 copy. If you copy 100 pages, you need space for 100 copies. The memory grows in perfect lockstep with your input. This is O(n) - linear space.',
        keyPoints: [
            '📌 **What it means**: For every item in your input, you store roughly one item in memory. n items = n memory units. It\'s a direct 1:1 relationship.',
            '💡 **The formula**: If n=5, you use 5 units. If n=100, you use 100 units. If n=1,000,000, you use 1,000,000 units. Simple and predictable!',
            '🎯 **Concrete example**: You have array [3, 7, 2, 9, 1] and want to reverse it. You create a new array [1, 9, 2, 7, 3]. Original has 5 items → copy has 5 items → O(n) space.',
            '🔢 **Real numbers**: n=10 → 10 blocks. n=20 → 20 blocks. n=50 → 50 blocks. Double input = double memory. Triple input = triple memory. The relationship is perfectly linear.',
            '✨ **Why this happens**: You\'re actually storing each element. Making an array copy? Store all n elements. Building a hash table? Store all n keys. Doing DFS? Stack can grow to n nodes deep.'
        ],
        analogy: '🎒 **Real-life analogy**: Packing for a trip. If you have 10 shirts, you need 10 shirt-sized spaces in your suitcase. If you have 50 shirts, you need 50 spaces. You can\'t cheat - each item needs its own spot. That\'s linear space.',
        realWorld: [
            'Creating array copy: original = [1,2,3,4,5]; copy = original.slice() → Stores all 5 elements in new memory',
            'Hash table/dictionary: Storing n unique names with phone numbers → Each person needs one entry → n entries',
            'DFS recursion on linked list: Worst case: list is straight line, stack grows to n calls deep',
            'Storing results: Processing 1000 numbers, storing all 1000 results in array → O(n) space',
            'Merge sort merge step: Merging two halves requires temporary array of size n'
        ],
        codeExample: `# O(n) Space - Array Copy
def reverse_array(arr):
    result = []  # New array
    for i in range(len(arr)-1, -1, -1):
        result.append(arr[i])  # Store each element
    return result  # n elements stored

# n=5 → stores 5 items
# n=1000 → stores 1000 items

# O(n) Space - Hash Table
def count_frequency(arr):
    freq = {}  # Dictionary
    for num in arr:
        freq[num] = freq.get(num, 0) + 1
    return freq  # Up to n unique entries

📝 HOW IT WORKS:
• Example 1: Create new array 'result'
• Copy each element from original to new array
• New array size = original array size = n
• Example 2: Create dictionary to count occurrences
• Worst case: all elements unique → n entries

💾 SPACE COMPLEXITY: O(n)
• reverse_array: Stores n elements in result
• count_frequency: Stores up to n key-value pairs
• Input doubles → Memory doubles (1:1 relationship)`,

        takeaway: '🏆 **Bottom line**: O(n) is totally acceptable for most programs! It means you\'re efficiently storing what you need, nothing more. It\'s honest, predictable memory usage. Just be aware: 1 million items = 1 million units of memory.',
        animation: '🎬 **What you\'re seeing**: Watch the blocks/frames grow in perfect sync with the input slider. n=5 → 5 blocks. n=10 → 10 blocks. n=20 → 20 blocks. It\'s like watching a line of dominoes get longer - each new input adds exactly one block.',
        graph: '📊 **The graph**: That perfect diagonal line from bottom-left to top-right? That\'s linear growth. Every step right on the x-axis (more input) causes the same step up on the y-axis (more memory). It\'s the most honest, straightforward relationship.'
    },
    'O(n log n)': {
        headline: 'Linearithmic Space O(n log n) - The Multiply Effect',
        intro: 'Imagine organizing a tournament. You need space for all n players (that\'s the n part), AND you need paperwork for each of the log n rounds (that\'s the log n part). Multiply them together: n × log n. This shows up when algorithms need linear space at every level of logarithmic depth.',
        keyPoints: [
            '📌 **What it means**: You need O(n) space, but at O(log n) different levels or stages. Total = n × log₂(n). It\'s worse than O(n) but WAY better than O(n²).',
            '💡 **The math**: n=8 → 8 × log₂(8) = 8 × 3 = 24 units. n=16 → 16 × log₂(16) = 16 × 4 = 64 units. n=32 → 32 × 5 = 160 units. Growing faster than n, slower than n².',
            '🎯 **Merge sort example**: Merge sort splits array into halves log₂(n) times. At EACH level, you merge n total elements using temporary arrays. Level 1: merge 2 arrays of n/2. Level 2: merge 4 arrays of n/4. Total per level: n. Levels: log n. Space: n × log n.',
            '🔢 **Real numbers**: n=10 → 10×3.32=33 units. n=100 → 100×6.64=664 units. n=1000 → 1000×9.97=9970 units. Notice: it\'s higher than n but not squared.',
            '✨ **When you see it**: Divide-and-conquer algorithms that need extra space at every recursion level. Each level does O(n) work and keeps O(n) data, and there are log n levels.'
        ],
        analogy: '🏆 **Real-life analogy**: Running a single-elimination tournament with 16 teams. Round 1: 8 games (need 8 playing fields). Round 2: 4 games. Round 3: 2 games. Round 4: 1 game. Total fields across all rounds: 8+4+2+1=15. That\'s n/2 × log₂(n) - similar pattern!',
        realWorld: [
            'Merge sort (with auxiliary arrays): Each merge operation creates temporary array of size n, happens at log n levels',
            'Building balanced tree with node copies: At each level (log n levels), you might create O(n) nodes',
            'Certain recursive tree algorithms: When each recursion level needs to store all n elements temporarily',
            'Advanced divide-and-conquer: Algorithms that partition data and need to store partitions at each level'
        ],
        codeExample: `# O(n log n) Space - Merge Sort (naive version)
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # Creates copy
    right = merge_sort(arr[mid:])  # Creates copy
    
    # Merge creates another copy
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result  # Each level copies n elements, log n levels

📝 HOW IT WORKS:
• Split array in half recursively (log n splits)
• Each split creates new array copies with arr[:mid]
• Merge creates another temporary array 'result'
• All sub-arrays at each level total to n elements
• Tree has log₂(n) levels of recursion

💾 SPACE COMPLEXITY: O(n log n)
• Level 1: 1 array of n elements = n space
• Level 2: 2 arrays of n/2 each = n space
• Level 3: 4 arrays of n/4 each = n space
• log₂(n) levels × n space per level = n log n
• n=8 → 8×3=24 units, n=16 → 16×4=64 units`,

        takeaway: '🏆 **Bottom line**: O(n log n) space is the trade-off for O(n log n) time algorithms like merge sort. You\'re paying memory to get fast sorting. It\'s manageable for reasonable input sizes but can get hefty for massive datasets.',
        animation: '🎬 **What you\'re seeing**: The blocks/frames grow noticeably faster than linear. n=5→about 12 blocks. n=10→about 33 blocks. n=20→about 86 blocks. Each input doubling multiplies memory by more than 2, but less than 4. It\'s that "multiply effect."',
        graph: '📊 **The graph**: See how the curve rises faster than the straight diagonal line (that\'s O(n))? But it\'s not as steep as the parabola (that\'s O(n²)). It gracefully curves upward - growing steadily but not explosively.'
    },
    'O(n²)': {
        headline: 'Quadratic Space O(n²) - The Explosion Danger',
        intro: 'Think about creating a friendship matrix for a group. If you have 10 people, you need a 10×10 grid to show who knows whom - that\'s 100 cells. For 100 people? 100×100 = 10,000 cells! The memory explodes quadratically. This is O(n²) space - and it gets scary fast.',
        keyPoints: [
            '📌 **What it means**: Memory grows with the SQUARE of input size. n=10 → 100 units. n=100 → 10,000 units. n=1000 → 1,000,000 units. Notice the explosion!',
            '💡 **The formula**: n² or (n×n)/4. If n=5: 5×5=25 units. If n=20: 20×20=400 units. If n=50: 50×50=2,500 units. Even small increases in n cause HUGE memory jumps.',
            '🎯 **Concrete example**: Storing distances between n cities. City A to B, A to C, B to C, etc. 5 cities = 5×5 = 25 cells. 100 cities = 100×100 = 10,000 cells! You need a cell for every pair.',
            '🔢 **Real numbers**: n=10 → 100 blocks (still ok). n=20 → 400 blocks (getting heavy). n=50 → 2,500 blocks (uh oh). n=100 → 10,000 blocks (system crash). See how fast it grows?',
            '⚠️ **Warning signs**: Whenever you see nested data structures (matrix, 2D array, storing all pairs), suspect O(n²). 2D dynamic programming tables, adjacency matrices, pair-wise comparison storage.',
            '✨ **Why it\'s dangerous**: Modern computers might have gigabytes of RAM, but n²  grows so fast it doesn\'t matter. n=10,000 → 100,000,000 units = 100 million cells. That\'s why you avoid this when possible!'
        ],
        analogy: '📐 **Real-life analogy**: Seating chart for a wedding. If you have 10 guests, you need to figure out 10×10=100 possible seat pairings to avoid conflicts. For 100 guests? 10,000 pairings to consider! The number of "relationships" grows quadratically with people.',
        realWorld: [
            '🗺️ **Graph adjacency matrix**: Storing connections between n nodes → n×n matrix. 1000 nodes = 1 million cells!',
            '📊 **2D Dynamic Programming**: Classic DP table[i][j] for string matching, etc. Comparing 2 strings of length n → n² table',
            '🔗 **All pairs shortest path**: Storing distance from every node to every other node → n² space',
            '🎯 **Storing all possible pairs**: If you need to store every combination of n items → n² storage',
            '🧮 **Multiplication table**: n×n table literally stores n² values'
        ],
        codeExample: `# O(n²) Space - Adjacency Matrix
def create_graph(n):
    # Create n×n matrix
    graph = [[0 for _ in range(n)] for _ in range(n)]
    return graph  # Stores n² cells

# n=5 → 25 cells
# n=100 → 10,000 cells!

# O(n²) Space - DP Table
def longest_common_subsequence(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

📝 HOW IT WORKS:
• Adjacency matrix: n×n grid to store connections
• Each row represents one node, each column another
• DP table: (m+1)×(n+1) grid for string comparison
• Each cell stores optimal solution for subproblem
• Need to store ALL pairs/combinations

💾 SPACE COMPLEXITY: O(n²)
• Graph: n nodes × n nodes = n² cells
• DP: m×n table (if m=n, then n²)
• n=10 → 100 cells (ok)
• n=100 → 10,000 cells (heavy)
• n=1000 → 1,000,000 cells (danger!)`,
        takeaway: '🏆 **Bottom line**: O(n²) space is DANGEROUS. Only use it for small inputs (n < 1000). For large datasets, this will crash your program. Always look for O(n) or O(n log n) alternatives. Quadratic space is the red flag of memory usage!',
        animation: '🎬 **What you\'re seeing**: Watch the explosion! n=5 → about 6 blocks. n=10 → about 25 blocks. n=15 → about 56 blocks. n=20 → 100 blocks! Each small increase causes a massive jump. The blocks flood the screen rapidly.',
        graph: '📊 **The graph**: See that aggressive upward curve that shoots toward the sky? That\'s the parabola of doom. At n=32, you\'re already at 256 units while linear is only at 32. The gap widens exponentially. The curve warns: "Danger ahead!"'
    }
};

const modeDescriptions = {
    'stack': 'Call Stack: Function call frames',
    'data': 'Heap/Data: Memory blocks',
    'tree': 'Recursion Tree: Call structure'
};

const state = {
    complexity: 'O(1)',
    mode: 'stack',
    n: 16,
    depth: 5
};

const animationState = {
    phase: 0,
    lastTime: 0,
    isPlaying: true,
    speed: 0.4,
    stepSize: 0.1
};

// DOM Elements
const memoryCanvas = document.getElementById('space-visualizer');
const memoryCtx = memoryCanvas?.getContext('2d');
const graphCanvas = document.getElementById('space-graph');
const graphCtx = graphCanvas?.getContext('2d');

const complexitySelect = document.getElementById('space-complexity');
const modeSelect = document.getElementById('mode-select');
const nSlider = document.getElementById('space-n-slider');
const depthSlider = document.getElementById('depth-slider');
const nDisplay = document.getElementById('space-n-display');
const depthDisplay = document.getElementById('depth-display');
const memoryFootprint = document.getElementById('memory-footprint');
const algorithmNameEl = document.getElementById('space-algorithm-name');
const algorithmExampleEl = document.getElementById('space-algorithm-example');
const breakdownCode = document.getElementById('space-breakdown-content');
const logsDiv = document.getElementById('space-logs');
const explanationContainer = document.getElementById('space-explanation-container');
const explanationContent = document.getElementById('space-explanation-content');
const spaceBtnPlay = document.getElementById('space-btn-play');
const spaceBtnPause = document.getElementById('space-btn-pause');
const spaceBtnStep = document.getElementById('space-btn-step');

const MIN_INPUT = parseInt(nSlider?.min || '1', 10);
const MAX_INPUT = parseInt(nSlider?.max || '32', 10);
const MIN_DEPTH = parseInt(depthSlider?.min || '1', 10);
const MAX_DEPTH = parseInt(depthSlider?.max || '12', 10);

// Utilities
function clamp(value, min, max) {
    if (Number.isNaN(value)) return min;
    return Math.min(max, Math.max(min, value));
}

function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes.toFixed(0)} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatMetric(num) {
    if (num >= 1000) {
        const formatted = num >= 10000 ? Math.round(num / 1000) : (num / 1000).toFixed(1);
        return `${formatted}k`;
    }
    return Math.round(num).toString();
}

function debounce(fn, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(null, args), wait);
    };
}

// Initialization and Event Listeners
function initSpaceVisualizer() {
    if (!memoryCanvas || !graphCanvas) {
        console.error('Canvas elements not found');
        return;
    }

    resizeCanvases();
    window.addEventListener('resize', debounce(resizeCanvases, 200));

    if (complexitySelect) {
        complexitySelect.addEventListener('change', (e) => {
            console.log("Complexity changed to:", e.target.value);
            state.complexity = e.target.value;
            updateAlgorithmInfo();
            updateAll();
        });
    }

    if (modeSelect) {
        modeSelect.addEventListener('change', (e) => {
            state.mode = e.target.value;
            updateAll();
        });
    }

    if (nSlider && nDisplay) {
        nSlider.addEventListener('input', (e) => {
            const nextValue = clamp(parseInt(e.target.value, 10), MIN_INPUT, MAX_INPUT);
            state.n = nextValue;
            nSlider.value = nextValue;
            nDisplay.textContent = state.n;
            animationState.phase = 0; // restart the visual cycle so changes to n are obvious
            updateAll();
        });
    }

    if (depthSlider && depthDisplay) {
        depthSlider.addEventListener('input', (e) => {
            const nextDepth = clamp(parseInt(e.target.value, 10), MIN_DEPTH, MAX_DEPTH);
            state.depth = nextDepth;
            depthSlider.value = nextDepth;
            depthDisplay.textContent = state.depth;
            updateAll();
        });
    }

    spaceBtnPlay?.addEventListener('click', playSpaceAnimation);
    spaceBtnPause?.addEventListener('click', pauseSpaceAnimation);
    spaceBtnStep?.addEventListener('click', stepSpaceAnimation);

    updateAlgorithmInfo();
    updateAll();
    updateSpaceButtons();

    requestAnimationFrame(animationLoop);
}

function updateSpaceButtons() {
    if (!spaceBtnPlay || !spaceBtnPause) return;
    if (animationState.isPlaying) {
        spaceBtnPlay.style.display = 'none';
        spaceBtnPause.style.display = 'inline-block';
    } else {
        spaceBtnPlay.style.display = 'inline-block';
        spaceBtnPause.style.display = 'none';
    }
}

function playSpaceAnimation() {
    animationState.isPlaying = true;
    animationState.lastTime = performance.now();
    updateSpaceButtons();
}

function pauseSpaceAnimation() {
    animationState.isPlaying = false;
    updateSpaceButtons();
}

function stepSpaceAnimation() {
    animationState.isPlaying = false;
    animationState.phase = (animationState.phase + animationState.stepSize) % 1;
    renderMemoryCanvas();
    updateSpaceButtons();
}

function animationLoop(time) {
    const delta = (time - animationState.lastTime) / 1000;
    animationState.lastTime = time;

    if (animationState.isPlaying) {
        animationState.phase = (animationState.phase + delta * animationState.speed) % 1;
    }

    // Always render, not just when playing
    renderMemoryCanvas();

    requestAnimationFrame(animationLoop);
}

function updateAll() {
    renderMemoryCanvas();
    renderGraph();
    updateBreakdown();
    updateLogs();
    updateExplanation();
    updateMemoryStats();
}

function resizeCanvases() {
    const memContainer = memoryCanvas.parentElement;
    memoryCanvas.width = Math.max(300, memContainer.clientWidth - 40);
    memoryCanvas.height = Math.max(400, memContainer.clientHeight - 40);

    const graphContainer = graphCanvas.parentElement;
    graphCanvas.width = Math.max(300, graphContainer.clientWidth - 30);
    graphCanvas.height = 280;

    renderMemoryCanvas();
    renderGraph();
}

function calculateMemoryUnits(complexity, n) {
    const fn = memoryFunctions[complexity] || memoryFunctions['O(1)'];
    return Math.max(1, fn(n));
}

// ============ DRAWING FUNCTIONS ============

function renderMemoryCanvas() {
    if (!memoryCtx) return;
    const w = memoryCanvas.width;
    const h = memoryCanvas.height;

    // Clear with white background
    memoryCtx.fillStyle = '#ffffff';
    memoryCtx.fillRect(0, 0, w, h);

    const memoryUnits = calculateMemoryUnits(state.complexity, state.n);

    if (state.mode === 'stack') {
        drawStack(memoryUnits, w, h);
    } else if (state.mode === 'data') {
        drawDataBlocks(memoryUnits, w, h);
    } else {
        drawTree(memoryUnits, w, h);
    }
}

function drawStack(units, w, h) {
    // Calculate frames based on complexity and user controls
    let targetFrames;
    if (state.complexity === 'O(1)') {
        targetFrames = Math.max(state.depth, 1);
    } else if (state.complexity === 'O(log n)') {
        targetFrames = Math.max(state.depth, Math.ceil(Math.log2(state.n + 1)));
    } else if (state.complexity === 'O(n)') {
        targetFrames = Math.min(30, Math.max(state.depth, Math.ceil(state.n / 2)));
    } else {
        targetFrames = Math.min(30, Math.max(state.depth, Math.ceil(units)));
    }

    const frameHeight = Math.min(50, (h - 140) / targetFrames);
    const frameWidth = Math.min(220, w * 0.5);
    const startX = (w - frameWidth) / 2;
    const bottomY = h - 60;
    const gap = 4;

    memoryCtx.textAlign = 'center';
    memoryCtx.textBaseline = 'middle';
    memoryCtx.font = 'bold 11px Menlo, monospace';

    const activeIdx = Math.floor(animationState.phase * targetFrames) % targetFrames;

    for (let i = 0; i < targetFrames; i++) {
        const y = bottomY - (i * (frameHeight + gap));
        const isActive = i === activeIdx;

        // Shadow
        memoryCtx.fillStyle = 'rgba(0,0,0,0.08)';
        memoryCtx.fillRect(startX + 3, y + 3, frameWidth, frameHeight);

        // Frame border
        memoryCtx.strokeStyle = '#000000';
        memoryCtx.lineWidth = isActive ? 3 : 1.5;
        memoryCtx.strokeRect(startX, y, frameWidth, frameHeight);

        // Frame fill
        if (isActive) {
            // Animated pulse effect
            const pulse = 0.9 + 0.1 * Math.sin(animationState.phase * Math.PI * 8);
            memoryCtx.fillStyle = '#000000';
            memoryCtx.globalAlpha = pulse;
            memoryCtx.fillRect(startX, y, frameWidth, frameHeight);
            memoryCtx.globalAlpha = 1.0;

            // Active label
            memoryCtx.fillStyle = '#ffffff';
            memoryCtx.font = 'bold 12px Menlo, monospace';
            memoryCtx.fillText(`FRAME ${i + 1} [ACTIVE]`, startX + frameWidth / 2, y + frameHeight / 2);
        } else {
            // Inactive frame
            memoryCtx.fillStyle = '#f5f5f5';
            memoryCtx.fillRect(startX + 1, y + 1, frameWidth - 2, frameHeight - 2);

            memoryCtx.fillStyle = '#666666';
            memoryCtx.font = '11px Menlo, monospace';
            memoryCtx.fillText(`Frame ${i + 1}`, startX + frameWidth / 2, y + frameHeight / 2);
        }
    }

    // Title
    memoryCtx.fillStyle = '#000000';
    memoryCtx.font = 'bold 14px Menlo, monospace';
    memoryCtx.fillText(`CALL STACK (${targetFrames} frames)`, w / 2, 20);
    memoryCtx.font = '11px Menlo, monospace';
    memoryCtx.fillText(`n = ${state.n}`, w / 2, 38);
}

function drawDataBlocks(units, w, h) {
    // Calculate blocks based on input size and complexity
    const totalBlocks = Math.max(1, Math.round(units));
    const cols = Math.min(12, Math.max(3, Math.ceil(Math.sqrt(totalBlocks))));
    const rows = Math.ceil(totalBlocks / cols);
    
    const padding = 60;
    const gap = 8;
    const safeW = w - padding * 2;
    const safeH = h - padding * 2 - 40;

    const blockSize = Math.min(45, Math.min(safeW / cols, safeH / rows) - gap);
    const totalWidth = cols * (blockSize + gap) - gap;
    const totalHeight = rows * (blockSize + gap) - gap;
    const offsetX = (w - totalWidth) / 2;
    const offsetY = (h - totalHeight) / 2 + 20;

    const activeIdx = Math.floor(animationState.phase * totalBlocks) % totalBlocks;

    memoryCtx.textAlign = 'center';
    memoryCtx.textBaseline = 'middle';

    for (let i = 0; i < totalBlocks; i++) {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = offsetX + c * (blockSize + gap);
        const y = offsetY + r * (blockSize + gap);

        const isActive = i === activeIdx;
        const isVisited = i < activeIdx;

        // Block shadow
        memoryCtx.fillStyle = 'rgba(0,0,0,0.05)';
        memoryCtx.fillRect(x + 2, y + 2, blockSize, blockSize);

        // Block fill
        if (isActive) {
            memoryCtx.fillStyle = '#000000';
            memoryCtx.fillRect(x, y, blockSize, blockSize);
            memoryCtx.fillStyle = '#ffffff';
            memoryCtx.font = 'bold 10px Menlo, monospace';
            memoryCtx.fillText(String(i + 1), x + blockSize / 2, y + blockSize / 2);
        } else if (isVisited) {
            memoryCtx.fillStyle = '#cccccc';
            memoryCtx.fillRect(x, y, blockSize, blockSize);
            memoryCtx.strokeStyle = '#000000';
            memoryCtx.lineWidth = 1;
            memoryCtx.strokeRect(x, y, blockSize, blockSize);
            memoryCtx.fillStyle = '#000000';
            memoryCtx.font = '9px Menlo, monospace';
            memoryCtx.fillText(String(i + 1), x + blockSize / 2, y + blockSize / 2);
        } else {
            memoryCtx.fillStyle = '#ffffff';
            memoryCtx.fillRect(x, y, blockSize, blockSize);
            memoryCtx.strokeStyle = '#cccccc';
            memoryCtx.lineWidth = 1;
            memoryCtx.strokeRect(x, y, blockSize, blockSize);
            memoryCtx.fillStyle = '#999999';
            memoryCtx.font = '9px Menlo, monospace';
            memoryCtx.fillText(String(i + 1), x + blockSize / 2, y + blockSize / 2);
        }
    }

    // Title
    memoryCtx.fillStyle = '#000000';
    memoryCtx.font = 'bold 14px Menlo, monospace';
    memoryCtx.textAlign = 'center';
    memoryCtx.fillText(`HEAP MEMORY (${totalBlocks} blocks)`, w / 2, 20);
    memoryCtx.font = '11px Menlo, monospace';
    memoryCtx.fillText(`n = ${state.n} | Allocating ${activeIdx + 1}/${totalBlocks}`, w / 2, 38);
}

function drawTree(units, w, h) {
    const baseLevels = Math.max(2, Math.ceil(Math.log2(state.n + 1)));
    const bonus = state.complexity === 'O(n²)' ? 2 : state.complexity === 'O(n log n)' ? 1 : 0;
    const levels = Math.min(7, baseLevels + bonus);

    const paddingX = 60;
    const paddingTop = 80;
    const paddingBottom = 70;
    const safeW = w - paddingX * 2;
    const safeH = h - paddingTop - paddingBottom;
    const levelHeight = safeH / Math.max(1, levels - 1);

    // Calculate which node should be highlighted (cycles through all nodes)
    const totalNodes = Math.pow(2, levels) - 1;
    const activeNodeIndex = Math.floor(animationState.phase * totalNodes) % totalNodes;
    
    let nodeCounter = 0;

    memoryCtx.lineWidth = 1.5;
    memoryCtx.font = '11px Menlo, monospace';
    memoryCtx.textAlign = 'center';
    memoryCtx.textBaseline = 'middle';

    // First pass: Draw all connections (edges)
    function drawEdges(x, y, level, spread) {
        if (level >= levels - 1) return;
        
        const clampedX = Math.max(paddingX + 15, Math.min(w - paddingX - 15, x));
        const clampedY = y;
        
        const childY = clampedY + levelHeight;
        const leftX = Math.max(paddingX + 15, Math.min(w - paddingX - 15, clampedX - spread / 2));
        const rightX = Math.max(paddingX + 15, Math.min(w - paddingX - 15, clampedX + spread / 2));

        memoryCtx.beginPath();
        memoryCtx.strokeStyle = '#d0d0d0';
        memoryCtx.lineWidth = 1.5;
        memoryCtx.moveTo(clampedX, clampedY + 14);
        memoryCtx.lineTo(leftX, childY - 14);
        memoryCtx.stroke();

        memoryCtx.beginPath();
        memoryCtx.moveTo(clampedX, clampedY + 14);
        memoryCtx.lineTo(rightX, childY - 14);
        memoryCtx.stroke();

        drawEdges(leftX, childY, level + 1, spread / 2);
        drawEdges(rightX, childY, level + 1, spread / 2);
    }

    // Second pass: Draw all nodes
    function drawNodes(x, y, level, spread) {
        if (level >= levels) return;
        
        const clampedX = Math.max(paddingX + 15, Math.min(w - paddingX - 15, x));
        const clampedY = y;
        
        const currentNodeIndex = nodeCounter++;
        const isActive = currentNodeIndex === activeNodeIndex;
        const radius = 12;

        // Draw children first
        if (level < levels - 1) {
            const childY = clampedY + levelHeight;
            const leftX = Math.max(paddingX + 15, Math.min(w - paddingX - 15, clampedX - spread / 2));
            const rightX = Math.max(paddingX + 15, Math.min(w - paddingX - 15, clampedX + spread / 2));
            
            drawNodes(leftX, childY, level + 1, spread / 2);
            drawNodes(rightX, childY, level + 1, spread / 2);
        }

        // Draw node circle
        memoryCtx.beginPath();
        memoryCtx.arc(clampedX, clampedY, radius, 0, Math.PI * 2);

        if (isActive) {
            // Active node - filled black
            memoryCtx.fillStyle = '#000000';
            memoryCtx.fill();
            
            // Outer glow ring
            memoryCtx.strokeStyle = '#000000';
            memoryCtx.lineWidth = 2.5;
            memoryCtx.stroke();
            
            // Number label in white
            memoryCtx.fillStyle = '#ffffff';
            memoryCtx.font = 'bold 11px Menlo, monospace';
            memoryCtx.fillText(String(currentNodeIndex + 1), clampedX, clampedY);
        } else {
            // Inactive node - white fill with black border
            memoryCtx.fillStyle = '#ffffff';
            memoryCtx.fill();
            memoryCtx.strokeStyle = '#000000';
            memoryCtx.lineWidth = 2;
            memoryCtx.stroke();
            
            // Number label in light gray
            memoryCtx.fillStyle = '#999999';
            memoryCtx.font = '10px Menlo, monospace';
            memoryCtx.fillText(String(currentNodeIndex + 1), clampedX, clampedY);
        }
    }

    // Draw the tree
    drawEdges(w / 2, paddingTop, 0, safeW * 0.6);
    nodeCounter = 0; // Reset counter for node drawing
    drawNodes(w / 2, paddingTop, 0, safeW * 0.6);

    // Title
    memoryCtx.fillStyle = '#000000';
    memoryCtx.font = 'bold 14px Menlo, monospace';
    memoryCtx.fillText(`RECURSION TREE (${levels} levels, ${totalNodes} nodes)`, w / 2, 20);
    memoryCtx.font = '11px Menlo, monospace';
    memoryCtx.fillText(`n = ${state.n} | Node ${activeNodeIndex + 1}/${totalNodes} active`, w / 2, 40);
}

// ============ GRAPH RENDERING ============

function renderGraph() {
    if (!graphCtx) return;
    const w = graphCanvas.width;
    const h = graphCanvas.height;
    const p = 50; // padding

    // White background
    graphCtx.fillStyle = '#ffffff';
    graphCtx.fillRect(0, 0, w, h);

    if (w < 150 || h < 150) return;

    // Get config
    const config = getSpaceGraphConfig(state.complexity);
    if (!config) return;

    // Calculate data points
    const points = [];
    let maxY = 0;
    for (let n = 1; n <= MAX_INPUT; n++) {
        const val = config.func(n);
        if (Number.isFinite(val)) {
            points.push({ x: n, y: val });
            maxY = Math.max(maxY, val);
        }
    }

    const currentVal = config.func(state.n);
    const yMax = Math.ceil(Math.max(maxY, currentVal) * 1.1);

    // Draw detailed grid
    drawDetailedGrid(w, h, p, MAX_INPUT, yMax);

    // Draw axes
    drawAxes(w, h, p);

    // Plot curve
    plotCurve(points, w, h, p, MAX_INPUT, yMax);

    // Current point marker
    drawCurrentMarker(state.n, currentVal, w, h, p, MAX_INPUT, yMax);

    // Legend
    graphCtx.fillStyle = '#000000';
    graphCtx.font = 'bold 12px Menlo, monospace';
    graphCtx.textAlign = 'left';
    graphCtx.fillText(config.label, p + 10, p + 20);
}

function drawDetailedGrid(w, h, p, xMax, yMax) {
    const graphW = w - 2 * p;
    const graphH = h - 2 * p;

    // Horizontal grid lines (Y-axis)
    const yTicks = 6;
    graphCtx.strokeStyle = '#e0e0e0';
    graphCtx.lineWidth = 1;
    graphCtx.font = '10px Menlo, monospace';
    graphCtx.textAlign = 'right';
    graphCtx.textBaseline = 'middle';

    for (let i = 0; i <= yTicks; i++) {
        const val = (yMax / yTicks) * i;
        const y = (h - p) - (val / yMax) * graphH;

        graphCtx.beginPath();
        graphCtx.moveTo(p, y);
        graphCtx.lineTo(w - p, y);
        graphCtx.stroke();

        graphCtx.fillStyle = '#666666';
        graphCtx.fillText(formatMetric(val), p - 8, y);
    }

    // Vertical grid lines (X-axis)
    const xTicks = Math.min(8, xMax);
    graphCtx.textBaseline = 'top';
    graphCtx.textAlign = 'center';

    for (let i = 0; i <= xTicks; i++) {
        const val = (xMax / xTicks) * i;
        const x = p + (val / xMax) * graphW;

        graphCtx.strokeStyle = '#e0e0e0';
        graphCtx.beginPath();
        graphCtx.moveTo(x, p);
        graphCtx.lineTo(x, h - p);
        graphCtx.stroke();

        graphCtx.fillStyle = '#666666';
        graphCtx.fillText(Math.round(val), x, h - p + 8);
    }
}

function drawAxes(w, h, p) {
    // Bold axes
    graphCtx.strokeStyle = '#000000';
    graphCtx.lineWidth = 2;
    graphCtx.beginPath();
    graphCtx.moveTo(p, p);
    graphCtx.lineTo(p, h - p);
    graphCtx.lineTo(w - p, h - p);
    graphCtx.stroke();

    // Axis labels
    graphCtx.fillStyle = '#000000';
    graphCtx.font = 'bold 12px Menlo, monospace';
    graphCtx.textAlign = 'center';
    graphCtx.fillText('Input Size (n)', w / 2, h - 10);

    graphCtx.save();
    graphCtx.translate(15, h / 2);
    graphCtx.rotate(-Math.PI / 2);
    graphCtx.fillText('Memory Units', 0, 0);
    graphCtx.restore();
}

function plotCurve(points, w, h, p, xMax, yMax) {
    const graphW = w - 2 * p;
    const graphH = h - 2 * p;

    if (points.length === 0) return;

    // Draw filled area under curve
    graphCtx.beginPath();
    graphCtx.moveTo(p, h - p);

    points.forEach((pt) => {
        const px = p + (pt.x / xMax) * graphW;
        const py = (h - p) - (pt.y / yMax) * graphH;
        graphCtx.lineTo(px, py);
    });

    graphCtx.lineTo(w - p, h - p);
    graphCtx.closePath();

    graphCtx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    graphCtx.fill();

    // Draw curve line
    graphCtx.beginPath();
    points.forEach((pt, idx) => {
        const px = p + (pt.x / xMax) * graphW;
        const py = (h - p) - (pt.y / yMax) * graphH;
        if (idx === 0) graphCtx.moveTo(px, py);
        else graphCtx.lineTo(px, py);
    });

    graphCtx.strokeStyle = '#000000';
    graphCtx.lineWidth = 2.5;
    graphCtx.stroke();
}

function drawCurrentMarker(n, val, w, h, p, xMax, yMax) {
    const graphW = w - 2 * p;
    const graphH = h - 2 * p;

    const cx = p + (n / xMax) * graphW;
    const cy = (h - p) - (Math.min(val, yMax) / yMax) * graphH;

    // Crosshairs
    graphCtx.setLineDash([5, 3]);
    graphCtx.strokeStyle = '#666666';
    graphCtx.lineWidth = 1;
    graphCtx.beginPath();
    graphCtx.moveTo(cx, h - p);
    graphCtx.lineTo(cx, cy);
    graphCtx.lineTo(p, cy);
    graphCtx.stroke();
    graphCtx.setLineDash([]);

    // Point
    graphCtx.beginPath();
    graphCtx.arc(cx, cy, 5, 0, Math.PI * 2);
    graphCtx.fillStyle = '#000000';
    graphCtx.fill();
    graphCtx.strokeStyle = '#ffffff';
    graphCtx.lineWidth = 2;
    graphCtx.stroke();

    // Annotation
    graphCtx.fillStyle = '#000000';
    graphCtx.font = 'bold 11px Menlo, monospace';
    graphCtx.textAlign = 'left';
    graphCtx.fillText(`n=${n}, mem=${formatMetric(val)}`, cx + 10, cy - 10);
}

function getSpaceGraphConfig(complexity) {
    switch (complexity) {
        case 'O(1)': return { label: 'O(1) Constant', func: () => 1 };
        case 'O(log n)': return { label: 'O(log n) Logarithmic', func: (n) => Math.log2(n + 1) };
        case 'O(n)': return { label: 'O(n) Linear', func: (n) => n };
        case 'O(n log n)': return { label: 'O(n log n) Linearithmic', func: (n) => n * Math.log2(n + 1) };
        case 'O(n²)': return { label: 'O(n²) Quadratic', func: (n) => (n * n) / 4 };
        default: return null;
    }
}

// ============ UI UPDATES ============

function updateBreakdown() {
    if (!breakdownCode) return;
    const units = calculateMemoryUnits(state.complexity, state.n);
    const approxBytes = units * 64;
    breakdownCode.textContent = `complexity: ${state.complexity}
mode: ${state.mode}
n: ${state.n}
depth: ${state.depth}
units: ${units.toFixed(2)}
memory: ${formatBytes(approxBytes)}`;
}

function updateLogs() {
    if (!logsDiv) return;
    logsDiv.innerHTML = '';
    const units = calculateMemoryUnits(state.complexity, state.n);
    const msg = `${state.complexity} with n=${state.n} uses ~${units.toFixed(1)} memory units (${formatBytes(units * 64)})`;
    const div = document.createElement('div');
    div.className = 'log-entry active';
    div.textContent = msg;
    logsDiv.appendChild(div);
}

function updateExplanation() {
    if (!explanationContent || !explanationContainer) return;
    const tpl = explanationTemplates[state.complexity];
    if (!tpl) return;

    let html = `
    <div class="expl-block">
        <h3>${tpl.headline}</h3>
        <p>${tpl.intro}</p>
        <ul>${tpl.keyPoints.map(k => `<li>${k}</li>`).join('')}</ul>
        <div class="analogy"><strong>💡 Analogy:</strong> ${tpl.analogy}</div>
        <div class="real-world"><strong>🌍 Examples:</strong> ${tpl.realWorld.join(', ')}</div>
        ${tpl.codeExample ? `<div class="code-example"><strong>💻 Python Example:</strong><pre><code>${tpl.codeExample}</code></pre></div>` : ''}
        <p><strong>Takeaway:</strong> ${tpl.takeaway}</p>
    </div>`;

    explanationContent.innerHTML = html;
    explanationContainer.classList.add('visible');
}

function updateAlgorithmInfo() {
    if (!algorithmNameEl || !algorithmExampleEl) return;
    const p = spaceProfiles[state.complexity];
    if (p) {
        algorithmNameEl.textContent = p.name;
        algorithmExampleEl.textContent = p.example;
    }
}

function updateMemoryStats() {
    if (!memoryFootprint) return;
    const units = calculateMemoryUnits(state.complexity, state.n);
    memoryFootprint.textContent = formatBytes(units * 64 + state.depth * 32);
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpaceVisualizer);
} else {
    initSpaceVisualizer();
}
