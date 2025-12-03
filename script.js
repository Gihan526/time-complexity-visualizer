/**
 * Time Complexity Visualizer - Enhanced Version
 * Features: Behind the scenes explanations, real-time graph updates, smooth animations
 */

// --- Constants ---
const MIN_BOX_SIZE = 25;
const MAX_BOX_SIZE = 50;
const BOX_SPACING = 4;
const TRANSITION_DURATION = 300; // ms

// --- Teaching Content (Beginner-Friendly) ---
const teachingContent = {
    'O(1)': `
        <h3>What is O(1) - Constant Time?</h3>
        <p>Imagine you have a bookshelf with numbered shelves. If someone asks you to get the book from shelf #5, you can go directly to shelf #5 without checking any other shelves. That's O(1)!</p>
        
        <div class="key-point">
            <strong>Key Idea:</strong> No matter how many shelves you have (10, 100, or 1 million), getting a book from a specific shelf always takes the same amount of time.
        </div>
        
        <div class="example">
            <strong>Real-World Example:</strong><br>
            Looking up a word in a dictionary by knowing exactly what page it's on.<br>
            • Dictionary has 100 pages? Look at page 47 (1 step)<br>
            • Dictionary has 10,000 pages? Look at page 47 (still 1 step)
        </div>
        
        <h3>Why is it called "Constant"?</h3>
        <p>The time it takes doesn't change (it's constant) no matter how big your data is. Whether you have 10 items or 10 million items, accessing one specific item by its position always takes the same time.</p>
        
        <p><strong>In code:</strong> Using <code>array[index]</code> to get an element is O(1) because the computer knows exactly where to look in memory.</p>
    `,

    'O(log n)': `
        <h3>What is O(log n) - Logarithmic Time?</h3>
        <p>Imagine you're trying to guess a number between 1 and 100. Instead of guessing 1, 2, 3, 4... you use a smart strategy: you ask "Is it bigger than 50?" Each question cuts the possibilities in half!</p>
        
        <div class="key-point">
            <strong>Key Idea:</strong> We eliminate half of the remaining items with each step. This makes searches incredibly fast even with huge amounts of data.
        </div>
        
        <div class="example">
            <strong>Real-World Example:</strong><br>
            Finding a word in a dictionary (already sorted alphabetically):<br>
            • Open to the middle - Are we before or after our word?<br>
            • Open to the middle of the correct half - Repeat<br>
            • Instead of checking all 1,000 pages, you only need about 10 lookups!
        </div>
        
        <h3>Why "Logarithmic"?</h3>
        <p>If you double the size of your data, you only need one extra step. This makes it extremely efficient!</p>
        <ul>
            <li>10 items: ~3-4 steps</li>
            <li>100 items: ~6-7 steps (not 30-40!)</li>
            <li>1,000 items: ~10 steps</li>
            <li>1,000,000 items: ~20 steps (amazing!)</li>
        </ul>
        
        <p><strong>Important:</strong> This only works with sorted data. We use "Binary Search" to achieve this speed.</p>
    `,

    'O(n)': `
        <h3>What is O(n) - Linear Time?</h3>
        <p>Imagine counting all the apples in a basket. You have to look at each apple one by one. If you have 10 apples, it takes 10 looks. If you have 100 apples, it takes 100 looks.</p>
        
        <div class="key-point">
            <strong>Key Idea:</strong> The time grows proportionally with the size of your data. Double the data? Double the time.
        </div>
        
        <div class="example">
            <strong>Real-World Example:</strong><br>
            Reading a book from start to finish:<br>
            • 100 pages: Need to read 100 pages<br>
            • 200 pages: Need to read 200 pages<br>
            The relationship is direct and predictable.
        </div>
        
        <h3>Why "Linear"?</h3>
        <p>If you graph it, you get a straight line! The time increases at a constant rate as your data grows.</p>
        
        <p><strong>Common examples in code:</strong></p>
        <ul>
            <li>Printing every item in a list</li>
            <li>Finding the maximum value in an unsorted array</li>
            <li>Checking if a specific item exists (worst case)</li>
        </ul>
        
        <p>This is pretty efficient! It's the baseline we compare other algorithms against.</p>
    `,

    'O(n²)': `
        <h3>What is O(n²) - Quadratic Time?</h3>
        <p>Imagine you have a class of students and you want every student to shake hands with every other student. If you have 10 students, that's about 100 handshakes. With 100 students? 10,000 handshakes!</p>
        
        <div class="key-point">
            <strong>Key Idea:</strong> For every item, we process every item again. This creates a "nested" operation that grows very quickly.
        </div>
        
        <div class="example">
            <strong>Real-World Example:</strong><br>
            Comparing every student's height with every other student's height:<br>
            • 10 students: 10 × 10 = 100 comparisons<br>
            • 100 students: 100 × 100 = 10,000 comparisons<br>
            • 1,000 students: 1,000 × 1,000 = 1,000,000 comparisons!
        </div>
        
        <h3>Why "Quadratic"?</h3>
        <p>When you graph it, you get a curve that shoots upward. Double the input? The time becomes 4 times longer!</p>
        
        <p><strong>This happens with nested loops:</strong></p>
        <div class="example">
            <code>for each person:</code><br>
            <code>&nbsp;&nbsp;for each other person:</code><br>
            <code>&nbsp;&nbsp;&nbsp;&nbsp;compare them</code>
        </div>
        
        <p><strong>Warning:</strong> This can become very slow with large data! Try to avoid O(n²) algorithms when working with big datasets.</p>
    `,

    'O(2ⁿ)': `
        <h3>What is O(2ⁿ) - Exponential Time?</h3>
        <p>Imagine a tree where each branch splits into two more branches, and those split into two more, and so on. This grows EXTREMELY fast!</p>
        
        <div class="key-point">
            <strong>Key Idea:</strong> Each step doubles the amount of work. This is one of the slowest types of algorithms and should be avoided when possible.
        </div>
        
        <div class="example">
            <strong>Real-World Example:</strong><br>
            A chain letter where each person sends to 2 people, who each send to 2 people:<br>
            • Step 1: 2 people<br>
            • Step 2: 4 people<br>
            • Step 3: 8 people<br>
            • Step 10: 1,024 people<br>
            • Step 20: 1,048,576 people!
        </div>
        
        <h3>Why "Exponential"?</h3>
        <p>The growth is explosive! Adding just one more item doubles the time needed.</p>
        
        <ul>
            <li>n = 5: 32 steps</li>
            <li>n = 10: 1,024 steps</li>
            <li>n = 20: 1,048,576 steps (over a million!)</li>
            <li>n = 30: Over a billion steps!</li>
        </ul>
        
        <p><strong>Common cause:</strong> Recursive functions that call themselves multiple times without optimization (like calculating Fibonacci numbers naively).</p>
        
        <p><strong>Big Warning:</strong> Exponential algorithms are only practical for very small inputs (usually n < 20).</p>
    `
};

// --- Explanation Templates ---
const explanationTemplates = {
    'O(1)': {
        title: 'Behind the scenes:',
        steps: [
            '→ step 1: access index {index}',
            '→ step 2: return value'
        ],
        examples: [
            'If lst = [10] → 2 steps',
            'If lst = [10, 20, 30] → 2 steps',
            'If lst has 1,000,000 items → still 2 steps'
        ],
        conclusion: '✅ O(1) → Constant time'
    },
    'O(log n)': {
        title: 'Behind the scenes:',
        steps: 'dynamic', // Will be filled with actual search steps
        examples: [
            'If lst = [1..10] → ~3-4 steps (log₂10)',
            'If lst = [1..100] → ~6-7 steps (log₂100)',
            'If lst has 1,000,000 items → ~20 steps (log₂1,000,000)'
        ],
        conclusion: '✅ O(log n) → Logarithmic time'
    },
    'O(n)': {
        title: 'Behind the scenes:',
        steps: 'dynamic', // Will list all n steps
        examples: [
            'If lst = [1..10] → 10 steps',
            'If lst = [1..100] → 100 steps',
            'If lst has 1,000,000 items → 1,000,000 steps'
        ],
        conclusion: '✅ O(n) → Linear time'
    },
    'O(n²)': {
        title: 'Behind the scenes:',
        steps: 'dynamic', // Will show nested loop pattern
        examples: [
            'If lst = [1..10] → 10×10 = 100 steps',
            'If lst = [1..100] → 100×100 = 10,000 steps',
            'If lst has 1,000 items → 1,000×1,000 = 1,000,000 steps'
        ],
        conclusion: '✅ O(n²) → Quadratic time'
    },
    'O(2ⁿ)': {
        title: 'Behind the scenes:',
        steps: 'dynamic', // Will show recursive calls
        examples: [
            'If n = 5 → 2⁵ = 32 steps',
            'If n = 10 → 2¹⁰ = 1,024 steps',
            'If n = 20 → 2²⁰ = 1,048,576 steps'
        ],
        conclusion: '✅ O(2ⁿ) → Exponential time'
    }
};

// --- State ---
const state = {
    complexity: 'O(1)',
    n: 10,
    speed: 50,
    language: 'JavaScript', // Selected programming language
    isPlaying: false,
    currentStepIndex: 0,
    steps: [],
    animationFrameId: null,
    lastFrameTime: 0,
    accumulatedTime: 0,
    animationProgress: 1,
    previousStep: null,
    currentlyAnimating: false,
    // Smooth input size change
    displayN: 10, // The currently displayed n (interpolated)
    targetN: 10,  // The target n value
    nTransitionProgress: 1, // 0 to 1, 1 means transition complete
    resumeAfterReset: false
};

// --- Code Snippets (Multi-Language) ---
const codeSnippets = {
    'JavaScript': {
        'O(1)': [
            'function accessElement(arr, index) {',
            '  print("Accessing element at " + index);',
            '  return arr[index];',
            '}'
        ],
        'O(log n)': [
            'function binarySearch(arr, target) {',
            '  let low = 0, high = arr.length - 1;',
            '  while (low <= high) {',
            '    let mid = Math.floor((low + high) / 2);',
            '    if (arr[mid] === target) return mid;',
            '    else if (arr[mid] < target) low = mid + 1;',
            '    else high = mid - 1;',
            '  }',
            '  return -1;',
            '}'
        ],
        'O(n)': [
            'function printAll(arr) {',
            '  for (let i = 0; i < arr.length; i++) {',
            '    print(arr[i]);',
            '  }',
            '}'
        ],
        'O(n²)': [
            'function printPairs(arr) {',
            '  for (let i = 0; i < arr.length; i++) {',
            '    for (let j = 0; j < arr.length; j++) {',
            '      print(arr[i] + ", " + arr[j]);',
            '    }',
            '  }',
            '}'
        ],
        'O(2ⁿ)': [
            'function fib(n) {',
            '  if (n <= 1) return n;',
            '  return fib(n - 1) + fib(n - 2);',
            '}'
        ]
    },
    'Python': {
        'O(1)': [
            'def access_element(arr, index):',
            '    print(f"Accessing element at {index}")',
            '    return arr[index]'
        ],
        'O(log n)': [
            'def binary_search(arr, target):',
            '    low, high = 0, len(arr) - 1',
            '    while low <= high:',
            '        mid = (low + high) // 2',
            '        if arr[mid] == target:',
            '            return mid',
            '        elif arr[mid] < target:',
            '            low = mid + 1',
            '        else:',
            '            high = mid - 1',
            '    return -1'
        ],
        'O(n)': [
            'def print_all(arr):',
            '    for item in arr:',
            '        print(item)'
        ],
        'O(n²)': [
            'def print_pairs(arr):',
            '    for i in arr:',
            '        for j in arr:',
            '            print(f"{i}, {j}")'
        ],
        'O(2ⁿ)': [
            'def fib(n):',
            '    if n <= 1:',
            '        return n',
            '    return fib(n - 1) + fib(n - 2)'
        ]
    },
    'Java': {
        'O(1)': [
            'public int accessElement(int[] arr, int index) {',
            '    System.out.println("Accessing element at " + index);',
            '    return arr[index];',
            '}'
        ],
        'O(log n)': [
            'public int binarySearch(int[] arr, int target) {',
            '    int low = 0, high = arr.length - 1;',
            '    while (low <= high) {',
            '        int mid = low + (high - low) / 2;',
            '        if (arr[mid] == target) return mid;',
            '        else if (arr[mid] < target) low = mid + 1;',
            '        else high = mid - 1;',
            '    }',
            '    return -1;',
            '}'
        ],
        'O(n)': [
            'public void printAll(int[] arr) {',
            '    for (int i = 0; i < arr.length; i++) {',
            '        System.out.println(arr[i]);',
            '    }',
            '}'
        ],
        'O(n²)': [
            'public void printPairs(int[] arr) {',
            '    for (int i = 0; i < arr.length; i++) {',
            '        for (int j = 0; j < arr.length; j++) {',
            '            System.out.println(arr[i] + ", " + arr[j]);',
            '        }',
            '    }',
            '}'
        ],
        'O(2ⁿ)': [
            'public int fib(int n) {',
            '    if (n <= 1) return n;',
            '    return fib(n - 1) + fib(n - 2);',
            '}'
        ]
    },
    'C++': {
        'O(1)': [
            'int accessElement(vector<int>& arr, int index) {',
            '    cout << "Accessing element at " << index << endl;',
            '    return arr[index];',
            '}'
        ],
        'O(log n)': [
            'int binarySearch(vector<int>& arr, int target) {',
            '    int low = 0, high = arr.size() - 1;',
            '    while (low <= high) {',
            '        int mid = low + (high - low) / 2;',
            '        if (arr[mid] == target) return mid;',
            '        else if (arr[mid] < target) low = mid + 1;',
            '        else high = mid - 1;',
            '    }',
            '    return -1;',
            '}'
        ],
        'O(n)': [
            'void printAll(vector<int>& arr) {',
            '    for (int i = 0; i < arr.size(); i++) {',
            '        cout << arr[i] << endl;',
            '    }',
            '}'
        ],
        'O(n²)': [
            'void printPairs(vector<int>& arr) {',
            '    for (int i = 0; i < arr.size(); i++) {',
            '        for (int j = 0; j < arr.size(); j++) {',
            '            cout << arr[i] << ", " << arr[j] << endl;',
            '        }',
            '    }',
            '}'
        ],
        'O(2ⁿ)': [
            'int fib(int n) {',
            '    if (n <= 1) return n;',
            '    return fib(n - 1) + fib(n - 2);',
            '}'
        ]
    },
    'C#': {
        'O(1)': [
            'public int AccessElement(int[] arr, int index) {',
            '    Console.WriteLine($"Accessing element at {index}");',
            '    return arr[index];',
            '}'
        ],
        'O(log n)': [
            'public int BinarySearch(int[] arr, int target) {',
            '    int low = 0, high = arr.Length - 1;',
            '    while (low <= high) {',
            '        int mid = low + (high - low) / 2;',
            '        if (arr[mid] == target) return mid;',
            '        else if (arr[mid] < target) low = mid + 1;',
            '        else high = mid - 1;',
            '    }',
            '    return -1;',
            '}'
        ],
        'O(n)': [
            'public void PrintAll(int[] arr) {',
            '    for (int i = 0; i < arr.Length; i++) {',
            '        Console.WriteLine(arr[i]);',
            '    }',
            '}'
        ],
        'O(n²)': [
            'public void PrintPairs(int[] arr) {',
            '    for (int i = 0; i < arr.Length; i++) {',
            '        for (int j = 0; j < arr.Length; j++) {',
            '            Console.WriteLine($"{arr[i]}, {arr[j]}");',
            '        }',
            '    }',
            '}'
        ],
        'O(2ⁿ)': [
            'public int Fib(int n) {',
            '    if (n <= 1) return n;',
            '    return Fib(n - 1) + Fib(n - 2);',
            '}'
        ]
    },
    'Go': {
        'O(1)': [
            'func accessElement(arr []int, index int) int {',
            '    fmt.Printf("Accessing element at %d\\n", index)',
            '    return arr[index]',
            '}'
        ],
        'O(log n)': [
            'func binarySearch(arr []int, target int) int {',
            '    low, high := 0, len(arr)-1',
            '    for low <= high {',
            '        mid := low + (high-low)/2',
            '        if arr[mid] == target {',
            '            return mid',
            '        } else if arr[mid] < target {',
            '            low = mid + 1',
            '        } else {',
            '            high = mid - 1',
            '        }',
            '    }',
            '    return -1',
            '}'
        ],
        'O(n)': [
            'func printAll(arr []int) {',
            '    for i := 0; i < len(arr); i++ {',
            '        fmt.Println(arr[i])',
            '    }',
            '}'
        ],
        'O(n²)': [
            'func printPairs(arr []int) {',
            '    for i := 0; i < len(arr); i++ {',
            '        for j := 0; j < len(arr); j++ {',
            '            fmt.Printf("%d, %d\\n", arr[i], arr[j])',
            '        }',
            '    }',
            '}'
        ],
        'O(2ⁿ)': [
            'func fib(n int) int {',
            '    if n <= 1 {',
            '        return n',
            '    }',
            '    return fib(n-1) + fib(n-2)',
            '}'
        ]
    },
    'Rust': {
        'O(1)': [
            'fn access_element(arr: &Vec<i32>, index: usize) -> i32 {',
            '    println!("Accessing element at {}", index);',
            '    arr[index]',
            '}'
        ],
        'O(log n)': [
            'fn binary_search(arr: &Vec<i32>, target: i32) -> Option<usize> {',
            '    let mut low = 0;',
            '    let mut high = arr.len() - 1;',
            '    while low <= high {',
            '        let mid = low + (high - low) / 2;',
            '        if arr[mid] == target {',
            '            return Some(mid);',
            '        } else if arr[mid] < target {',
            '            low = mid + 1;',
            '        } else {',
            '            high = mid - 1;',
            '        }',
            '    }',
            '    None',
            '}'
        ],
        'O(n)': [
            'fn print_all(arr: &Vec<i32>) {',
            '    for item in arr {',
            '        println!("{}", item);',
            '    }',
            '}'
        ],
        'O(n²)': [
            'fn print_pairs(arr: &Vec<i32>) {',
            '    for i in arr {',
            '        for j in arr {',
            '            println!("{}, {}", i, j);',
            '        }',
            '    }',
            '}'
        ],
        'O(2ⁿ)': [
            'fn fib(n: u32) -> u32 {',
            '    if n <= 1 {',
            '        return n;',
            '    }',
            '    fib(n - 1) + fib(n - 2)',
            '}'
        ]
    },
    'TypeScript': {
        'O(1)': [
            'function accessElement(arr: number[], index: number): number {',
            '  console.log(`Accessing element at ${index}`);',
            '  return arr[index];',
            '}'
        ],
        'O(log n)': [
            'function binarySearch(arr: number[], target: number): number {',
            '  let low = 0, high = arr.length - 1;',
            '  while (low <= high) {',
            '    const mid = Math.floor((low + high) / 2);',
            '    if (arr[mid] === target) return mid;',
            '    else if (arr[mid] < target) low = mid + 1;',
            '    else high = mid - 1;',
            '  }',
            '  return -1;',
            '}'
        ],
        'O(n)': [
            'function printAll(arr: number[]): void {',
            '  for (let i = 0; i < arr.length; i++) {',
            '    console.log(arr[i]);',
            '  }',
            '}'
        ],
        'O(n²)': [
            'function printPairs(arr: number[]): void {',
            '  for (let i = 0; i < arr.length; i++) {',
            '    for (let j = 0; j < arr.length; j++) {',
            '      console.log(`${arr[i]}, ${arr[j]}`);',
            '    }',
            '  }',
            '}'
        ],
        'O(2ⁿ)': [
            'function fib(n: number): number {',
            '  if (n <= 1) return n;',
            '  return fib(n - 1) + fib(n - 2);',
            '}'
        ]
    }
};

// --- DOM Elements ---
const canvas = document.getElementById('visualizer-canvas');
const ctx = canvas.getContext('2d');
const graphCanvas = document.getElementById('graph-canvas');
const graphCtx = graphCanvas.getContext('2d');
const complexitySelect = document.getElementById('complexity-select');
const languageSelect = document.getElementById('language-select');
const nSlider = document.getElementById('n-slider');
const nDisplay = document.getElementById('n-display');
const speedSlider = document.getElementById('speed-slider');
const btnPlay = document.getElementById('btn-play');
const btnPause = document.getElementById('btn-pause');
const btnStep = document.getElementById('btn-step');
const btnReset = document.getElementById('btn-reset');
const stepCounter = document.getElementById('step-counter');
const totalStepsDisplay = document.getElementById('total-steps');
const logsDiv = document.getElementById('logs');
const codeDisplay = document.getElementById('code-display');
const codeContent = document.getElementById('code-content');
const explanationContainer = document.getElementById('explanation-container');
const explanationContent = document.getElementById('explanation-content');
const teachingContentDiv = document.getElementById('teaching-content');
const scrollIndicator = document.getElementById('scroll-indicator');
const algorithmNameEl = document.getElementById('algorithm-name');
const algorithmExampleEl = document.getElementById('algorithm-example');

const MAX_INPUT_SIZE = parseInt(nSlider?.max || '50', 10);

const algorithmProfiles = {
    'O(1)': {
        name: 'Direct access lookup',
        example: 'array[index]'
    },
    'O(log n)': {
        name: 'Binary search',
        example: 'binarySearch(sortedList, target)'
    },
    'O(n)': {
        name: 'Full list traversal',
        example: 'printAll(items)'
    },
    'O(n²)': {
        name: 'Nested pair iteration',
        example: 'printPairs(arr)'
    },
    'O(2ⁿ)': {
        name: 'Naive Fibonacci recursion',
        example: 'fib(n)'
    }
};

// --- Initialization ---
function init() {
    resizeCanvases();
    window.addEventListener('resize', debounce(resizeCanvases, 150));

    complexitySelect.addEventListener('change', (e) => {
        state.complexity = e.target.value;
        reset();
    });

    languageSelect.addEventListener('change', (e) => {
        state.language = e.target.value;
        updateCodePanel();
    });

    nSlider.addEventListener('input', (e) => {
        const newN = parseInt(e.target.value);
        if (newN !== state.targetN) {
            if (state.isPlaying && !state.resumeAfterReset) {
                state.resumeAfterReset = true;
            }
            pause();
            state.targetN = newN;
            state.nTransitionProgress = 0; // Start transition
        }
        nDisplay.textContent = newN;
    });

    speedSlider.addEventListener('input', (e) => {
        state.speed = parseInt(e.target.value);
    });

    btnPlay.addEventListener('click', play);
    btnPause.addEventListener('click', pause);
    btnStep.addEventListener('click', stepForward);
    btnReset.addEventListener('click', reset);

    reset();
    animate();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function resizeCanvases() {
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const graphContainer = graphCanvas.parentElement;
    const rect = graphContainer.getBoundingClientRect();
    graphCanvas.width = Math.max(200, rect.width - 30);
    graphCanvas.height = Math.max(150, rect.height - 60);

    render();
    renderGraph();
}

// --- Step Generation ---

function generateSteps() {
    const { complexity, n } = state;

    switch (complexity) {
        case 'O(1)': return generateO1Steps(n);
        case 'O(log n)': return generateLogNSteps(n);
        case 'O(n)': return generateONSteps(n);
        case 'O(n²)': return generateNSquaredSteps(n);
        case 'O(2ⁿ)': return generateTwoNSteps(Math.min(n, 12));
    }
    return [];
}

function generateO1Steps(n) {
    const targetIndex = Math.floor(Math.random() * n);
    return [
        {
            type: 'access',
            index: targetIndex,
            n: n,
            lineNo: 2,
            log: `→ step 1: access arr[${targetIndex}] - O(1) constant time`
        }
    ];
}

function generateLogNSteps(n) {
    const steps = [];
    let low = 0, high = n - 1;
    const target = Math.floor(Math.random() * n);
    let stepCount = 1;

    steps.push({
        type: 'start', low, high, target, n,
        lineNo: 2,
        log: `→ step ${stepCount++}: searching for ${target}`
    });

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);

        steps.push({
            type: 'check', low, high, mid, target, n,
            lineNo: 4,
            log: `→ step ${stepCount++}: check mid[${mid}] = ${mid}`
        });

        if (mid === target) {
            steps.push({
                type: 'found', low, high, mid, target, n,
                lineNo: 5,
                log: `→ step ${stepCount++}: found ${target}!`
            });
            break;
        } else if (mid < target) {
            low = mid + 1;
            steps.push({
                type: 'moveRight', low, high, mid, target, n,
                lineNo: 6,
                log: `→ step ${stepCount++}: ${mid} < ${target}, search right`
            });
        } else {
            high = mid - 1;
            steps.push({
                type: 'moveLeft', low, high, mid, target, n,
                lineNo: 7,
                log: `→ step ${stepCount++}: ${mid} > ${target}, search left`
            });
        }
    }
    return steps;
}

function generateONSteps(n) {
    const steps = [];
    for (let i = 0; i < n; i++) {
        steps.push({
            type: 'visit',
            index: i,
            n,
            lineNo: 3,
            log: `→ step ${i + 1}: print(${i})`
        });
    }
    return steps;
}

function generateNSquaredSteps(n) {
    const steps = [];
    let count = 1;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            steps.push({
                type: 'visit',
                i, j, n,
                lineNo: 4,
                log: `→ step ${count++}: print(${i}, ${j})`
            });
        }
    }
    return steps;
}

function generateTwoNSteps(n) {
    const steps = [];
    let count = 1;
    const horizontalStep = 1;

    function fib(k, depth, x, parentIndex) {
        const y = depth;
        const currentIndex = steps.length;
        
        steps.push({
            type: 'call', 
            k, 
            depth, 
            x, 
            y, 
            n,
            parentIndex,
            lineNo: 2,
            log: `→ step ${count++}: fib(${k})`
        });

        if (k <= 1) {
            steps.push({
                type: 'return', 
                k, 
                depth, 
                x, 
                y, 
                n,
                parentIndex,
                lineNo: 2,
                log: `→ step ${count++}: return ${k}`
            });
            return;
        }

        const nextDepth = depth + 1;
        fib(k - 1, nextDepth, x - horizontalStep, currentIndex);
        fib(k - 2, nextDepth, x + horizontalStep, currentIndex);
    }

    fib(n, 0, 0, null);
    return steps;
}

// --- Control Logic ---

function reset() {
    pause();
    state.currentStepIndex = 0;
    state.steps = generateSteps();
    state.animationProgress = 1;
    state.previousStep = null;
    totalStepsDisplay.textContent = state.steps.length;
    stepCounter.textContent = 0;
    logsDiv.innerHTML = '';

    // Hide explanation
    explanationContainer.classList.remove('visible');
    explanationContent.innerHTML = '';

    // Update teaching content
    updateTeachingContent();
    updateAlgorithmInfo();

    // Show scroll indicator
    if (scrollIndicator) {
        scrollIndicator.style.display = 'block';
    }

    updateCodePanel();
    highlightLine(null);
    render();
    renderGraph();
}

function updateAlgorithmInfo() {
    const profile = algorithmProfiles[state.complexity];
    if (!profile || !algorithmNameEl || !algorithmExampleEl) return;
    algorithmNameEl.textContent = profile.name;
    algorithmExampleEl.textContent = profile.example;
}

function updateTeachingContent() {
    if (teachingContentDiv && teachingContent[state.complexity]) {
        teachingContentDiv.innerHTML = teachingContent[state.complexity];
    }
}

function updateCodePanel() {
    const lang = state.language;
    const complexity = state.complexity;

    if (codeSnippets[lang] && codeSnippets[lang][complexity]) {
        const lines = codeSnippets[lang][complexity];
        codeContent.innerHTML = lines.map((line, i) =>
            `<span class="code-line" id="code-line-${i + 1}">${escapeHtml(line)}</span>`
        ).join('');
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function highlightLine(lineNo) {
    document.querySelectorAll('.code-line').forEach(el => {
        el.classList.remove('highlight');
    });

    if (lineNo) {
        const el = document.getElementById(`code-line-${lineNo}`);
        if (el) {
            el.classList.add('highlight');
            if (codeDisplay) {
                const parentRect = codeDisplay.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();
                const offset = elRect.top - parentRect.top;
                const targetScroll = codeDisplay.scrollTop + offset - (codeDisplay.clientHeight / 2) + (elRect.height / 2);
                codeDisplay.scrollTo({ top: Math.max(targetScroll, 0), behavior: 'smooth' });
            }
        }
    }
}

function play() {
    if (state.currentStepIndex >= state.steps.length) {
        reset();
    }
    state.isPlaying = true;
    state.lastFrameTime = performance.now();
    btnPlay.style.display = 'none';
    btnPause.style.display = 'inline-block';
}

function pause() {
    state.isPlaying = false;
    btnPlay.style.display = 'inline-block';
    btnPause.style.display = 'none';
}

function stepForward() {
    pause();
    advanceStep();
}

function advanceStep() {
    if (state.currentStepIndex < state.steps.length) {
        const step = state.steps[state.currentStepIndex];

        state.previousStep = state.currentStepIndex > 0 ?
            state.steps[state.currentStepIndex - 1] : null;
        state.animationProgress = 0;
        state.currentlyAnimating = true;

        addLog(step.log);
        highlightLine(step.lineNo);
        state.currentStepIndex++;
        stepCounter.textContent = state.currentStepIndex;
        logsDiv.scrollTop = logsDiv.scrollHeight;

        renderGraph(); // Update graph in real-time

        // Check if animation is complete
        if (state.currentStepIndex >= state.steps.length) {
            pause();
            showExplanation();
        }
    } else {
        pause();
        showExplanation();
    }
}

function addLog(message) {
    const entry = document.createElement('div');
    entry.className = 'log-entry active';
    entry.textContent = message;
    logsDiv.appendChild(entry);

    setTimeout(() => entry.style.opacity = '1', 10);
}

// --- Explanation ---

function showExplanation() {
    const template = explanationTemplates[state.complexity];
    if (!template) return;

    let html = `<h4>${template.title}</h4>`;

    // Generate step list
    html += '<div class="step-list">';

    if (template.steps === 'dynamic') {
        // Show actual steps based on what was executed
        const maxStepsToShow = 10;
        const actualSteps = state.steps.slice(0, maxStepsToShow);
        actualSteps.forEach(step => {
            html += `${step.log}<br>`;
        });
        if (state.steps.length > maxStepsToShow) {
            html += `<em>... and ${state.steps.length - maxStepsToShow} more steps</em><br>`;
        }
    } else {
        // Use template steps
        template.steps.forEach(step => {
            // Replace placeholders
            let stepText = step;
            if (state.steps[0] && state.steps[0].index !== undefined) {
                stepText = stepText.replace('{index}', state.steps[0].index);
            }
            html += `${stepText}<br>`;
        });
    }

    html += '</div>';

    // Add examples
    html += '<div class="examples">';
    template.examples.forEach(example => {
        html += `${example}<br>`;
    });
    html += '</div>';

    // Add conclusion
    html += `<div class="conclusion">${template.conclusion}</div>`;

    explanationContent.innerHTML = html;
    explanationContainer.classList.add('visible');
}

// --- Animation Loop ---

function animate(time) {
    state.animationFrameId = requestAnimationFrame(animate);

    const deltaTime = time - state.lastFrameTime;

    // Smooth n transition
    if (state.nTransitionProgress < 1) {
        state.nTransitionProgress += deltaTime / 400; // 400ms transition
        state.nTransitionProgress = Math.min(1, state.nTransitionProgress);

        // Interpolate displayN
        const easedProgress = easeInOutCubic(state.nTransitionProgress);
        const diff = state.targetN - state.n;
        state.displayN = state.n + (diff * easedProgress);

        // When transition complete, update actual n and reset
        if (state.nTransitionProgress >= 1) {
            state.n = state.targetN;
            state.displayN = state.targetN;
            reset();
            if (state.resumeAfterReset) {
                state.resumeAfterReset = false;
                play();
            }
        }

        render(); // Render during transition
    }

    // Update animation progress
    if (state.currentlyAnimating && state.animationProgress < 1) {
        state.animationProgress += deltaTime / TRANSITION_DURATION;
        state.animationProgress = Math.min(1, state.animationProgress);

        if (state.animationProgress >= 1) {
            state.currentlyAnimating = false;
        }

        render();
    }

    if (!state.isPlaying) {
        state.lastFrameTime = time;
        return;
    }

    state.lastFrameTime = time;
    state.accumulatedTime += deltaTime;

    // Smoother timing - speed maps to delay
    const delay = Math.max(30, 1000 - (state.speed * 9.7));

    if (state.accumulatedTime >= delay && !state.currentlyAnimating) {
        const stepsPerFrame = state.speed > 95 ? 3 : 1;

        for (let i = 0; i < stepsPerFrame; i++) {
            if (state.currentStepIndex < state.steps.length && !state.currentlyAnimating) {
                advanceStep();
            } else {
                break;
            }
        }

        state.accumulatedTime = 0;
    }
}

// --- Rendering ---

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { complexity } = state;
    const currentStep = state.currentStepIndex > 0 ?
        state.steps[state.currentStepIndex - 1] : null;

    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.font = '14px Menlo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const w = canvas.width;
    const h = canvas.height;

    switch (complexity) {
        case 'O(1)': renderO1(w, h, currentStep); break;
        case 'O(log n)': renderLogN(w, h, currentStep); break;
        case 'O(n)': renderON(w, h, currentStep); break;
        case 'O(n²)': renderNSquared(w, h, currentStep); break;
        case 'O(2ⁿ)': renderTwoN(w, h, currentStep); break;
    }
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function renderO1(w, h, step) {
    // Use first step or current state for n
    const n = step ? step.n : Math.round(state.displayN);
    const availableWidth = w - 40;
    const boxSize = Math.max(MIN_BOX_SIZE, Math.min(MAX_BOX_SIZE, (availableWidth - (n - 1) * BOX_SPACING) / n));
    const totalWidth = (boxSize * n) + (BOX_SPACING * (n - 1));
    const startX = (w - totalWidth) / 2;
    const y = h / 2 - boxSize / 2;

    const progress = step ? easeInOutCubic(state.animationProgress) : 0;

    for (let i = 0; i < n; i++) {
        const x = startX + i * (boxSize + BOX_SPACING);

        const isTarget = step && (i === step.index);

        ctx.strokeStyle = isTarget ? '#000' : '#ddd';
        ctx.lineWidth = isTarget ? 2 : 1;
        ctx.strokeRect(x, y, boxSize, boxSize);

        if (isTarget) {
            ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
            ctx.fillRect(x, y, boxSize, boxSize);
            ctx.fillStyle = isTarget ? (progress > 0.5 ? 'white' : 'black') : 'black';
        } else {
            ctx.fillStyle = 'black';
        }

        if (boxSize > 20) {
            ctx.fillText(i, x + boxSize / 2, y + boxSize / 2);
        }
    }

    ctx.fillStyle = '#666';
    ctx.font = '12px Menlo';
    if (step) {
        ctx.fillText(`Array of ${n} elements - accessing index ${step.index} takes O(1) time`, w / 2, h - 20);
    } else {
        ctx.fillText(`Array of ${n} elements - O(1) constant time access`, w / 2, h - 20);
    }
}

function renderLogN(w, h, step) {
    // Use first step or generate initial state
    const n = step ? step.n : Math.round(state.displayN);
    const initialStep = step || (state.steps.length > 0 ? state.steps[0] : { n, low: 0, high: n - 1, target: 0 });
    const { low = 0, high = n - 1, mid, target } = initialStep;

    const useFocusedView = n > 25;

    if (useFocusedView) {
        renderLogNFocused(w, h, initialStep);
    } else {
        renderLogNFull(w, h, initialStep);
    }
}

function renderLogNFull(w, h, step) {
    const { n, low = 0, high = n - 1, mid, target } = step;
    const availableWidth = w - 60;
    const boxSize = Math.max(MIN_BOX_SIZE, Math.min(MAX_BOX_SIZE, (availableWidth - (n - 1) * BOX_SPACING) / n));
    const totalWidth = (boxSize * n) + (BOX_SPACING * (n - 1));
    const startX = (w - totalWidth) / 2;
    const y = h / 2 - boxSize / 2;

    const progress = state.currentStepIndex > 0 ? easeInOutCubic(state.animationProgress) : 0;

    for (let i = 0; i < n; i++) {
        const x = startX + i * (boxSize + BOX_SPACING);

        const inRange = i >= low && i <= high;
        const isMid = i === mid;
        const isTarget = step.type === 'found' && i === target;

        ctx.globalAlpha = inRange ? 1.0 : 0.3;

        ctx.strokeStyle = (isMid || isTarget) ? '#000' : '#ddd';
        ctx.lineWidth = (isMid || isTarget) ? 2 : 1;
        ctx.strokeRect(x, y, boxSize, boxSize);

        if (isMid || isTarget) {
            ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
            ctx.fillRect(x, y, boxSize, boxSize);
            ctx.fillStyle = progress > 0.5 ? 'white' : 'black';
        } else {
            ctx.fillStyle = 'black';
        }

        if (boxSize > 20) {
            ctx.fillText(i, x + boxSize / 2, y + boxSize / 2);
        }

        ctx.globalAlpha = 1.0;
    }

    ctx.fillStyle = '#666';
    ctx.font = '12px Menlo';
    if (state.currentStepIndex > 0) {
        ctx.fillText(`Searching for ${target} | Range: [${low}...${high}]`, w / 2, h - 20);
    } else {
        ctx.fillText(`Binary Search - O(log n) logarithmic time`, w / 2, h - 20);
    }
}

function renderLogNFocused(w, h, step) {
    const { n, low = 0, high = n - 1, mid, target } = step;
    const context = 3;

    const visibleStart = Math.max(0, low - context);
    const visibleEnd = Math.min(n - 1, high + context);
    const visibleCount = visibleEnd - visibleStart + 1;

    const availableWidth = w - 100;
    const boxSize = Math.max(MIN_BOX_SIZE, Math.min(MAX_BOX_SIZE, (availableWidth - (visibleCount - 1) * BOX_SPACING) / visibleCount));
    const totalWidth = (boxSize * visibleCount) + (BOX_SPACING * (visibleCount - 1));
    const startX = (w - totalWidth) / 2;
    const y = h / 2 - boxSize / 2;

    const progress = state.currentStepIndex > 0 ? easeInOutCubic(state.animationProgress) : 0;

    ctx.fillStyle = '#999';
    ctx.font = '20px Menlo';
    if (visibleStart > 0) {
        ctx.fillText('...', startX - 25, y + boxSize / 2);
    }
    if (visibleEnd < n - 1) {
        ctx.fillText('...', startX + totalWidth + 15, y + boxSize / 2);
    }

    for (let i = visibleStart; i <= visibleEnd; i++) {
        const idx = i - visibleStart;
        const x = startX + idx * (boxSize + BOX_SPACING);

        const inRange = i >= low && i <= high;
        const isMid = i === mid;
        const isTarget = step.type === 'found' && i === target;

        ctx.globalAlpha = inRange ? 1.0 : 0.3;

        ctx.strokeStyle = (isMid || isTarget) ? '#000' : '#ccc';
        ctx.lineWidth = (isMid || isTarget) ? 2 : 1;
        ctx.strokeRect(x, y, boxSize, boxSize);

        if (isMid || isTarget) {
            ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
            ctx.fillRect(x, y, boxSize, boxSize);
            ctx.fillStyle = progress > 0.5 ? 'white' : 'black';
        } else {
            ctx.fillStyle = 'black';
        }

        ctx.fillText(i, x + boxSize / 2, y + boxSize / 2);
        ctx.globalAlpha = 1.0;
    }

    ctx.fillStyle = '#666';
    ctx.font = '12px Menlo';
    if (state.currentStepIndex > 0) {
        ctx.fillText(`Binary Search: target=${target} | [${low}...${high}] | Array size: ${n}`, w / 2, h - 20);
    } else {
        ctx.fillText(`Binary Search - O(log n) | Array size: ${n}`, w / 2, h - 20);
    }
}

function renderON(w, h, step) {
    const n = step ? step.n : Math.round(state.displayN);
    const availableWidth = w - 40;
    const boxSize = Math.max(MIN_BOX_SIZE, Math.min(MAX_BOX_SIZE, (availableWidth - (n - 1) * BOX_SPACING) / n));
    const totalWidth = (boxSize * n) + (BOX_SPACING * (n - 1));
    const startX = (w - totalWidth) / 2;
    const y = h / 2 - boxSize / 2;

    const progress = step ? easeInOutCubic(state.animationProgress) : 0;

    for (let i = 0; i < n; i++) {
        const x = startX + i * (boxSize + BOX_SPACING);

        const isCurrent = step && (i === step.index);
        const isVisited = step && i < step.index;

        ctx.strokeStyle = isCurrent ? '#000' : '#ddd';
        ctx.lineWidth = isCurrent ? 2 : 1;
        ctx.strokeRect(x, y, boxSize, boxSize);

        if (isCurrent) {
            ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
            ctx.fillRect(x, y, boxSize, boxSize);
            ctx.fillStyle = progress > 0.5 ? 'white' : 'black';
        } else if (isVisited) {
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(x, y, boxSize, boxSize);
            ctx.fillStyle = '#666';
        } else {
            ctx.fillStyle = 'black';
        }

        if (boxSize > 20) {
            ctx.fillText(i, x + boxSize / 2, y + boxSize / 2);
        }
    }

    ctx.fillStyle = '#666';
    ctx.font = '12px Menlo';
    ctx.fillText(`Processing ${n} elements sequentially - O(n) linear time`, w / 2, h - 20);
}

function renderNSquared(w, h, step) {
    const n = step ? step.n : Math.round(state.displayN);
    const maxSize = Math.min(w, h) - 60;
    const boxSize = Math.max(8, maxSize / n);
    const totalSize = boxSize * n;
    const startX = (w - totalSize) / 2;
    const startY = (h - totalSize) / 2;

    const progress = step ? easeInOutCubic(state.animationProgress) : 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const x = startX + j * boxSize;
            const y = startY + i * boxSize;

            const isVisited = step && ((i < step.i) || (i === step.i && j <= step.j));
            const isCurrent = step && (i === step.i && j === step.j);

            ctx.strokeStyle = '#f0f0f0';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, boxSize, boxSize);

            if (isCurrent) {
                ctx.fillStyle = `rgba(0, 0, 0, ${progress})`;
                ctx.fillRect(x, y, boxSize, boxSize);
            } else if (isVisited) {
                ctx.fillStyle = '#ccc';
                ctx.fillRect(x, y, boxSize, boxSize);
            }
        }
    }

    ctx.fillStyle = '#666';
    ctx.font = '12px Menlo';
    ctx.fillText(`${n}×${n} grid - O(n²) quadratic time`, w / 2, h - 20);
}

function renderTwoN(w, h, step) {
    const steps = state.steps;
    const currentIndex = state.currentStepIndex;

    // Collect only call steps for layout (skip return steps to avoid stacking)
    const nodeEntries = [];
    for (let i = 0; i < steps.length; i++) {
        if (steps[i].type === 'call') {
            nodeEntries.push({ step: steps[i], originalIndex: i });
        }
    }

    if (nodeEntries.length === 0) {
        ctx.fillStyle = '#666';
        ctx.font = '14px Menlo';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const n = state.n > 12 ? 12 : Math.round(state.displayN);
        ctx.fillText(`Fibonacci tree for n=${n} - O(2ⁿ) exponential time`, w / 2, h / 2);
        return;
    }

    const padding = 40;
    const nodeRadius = 16;

    const maxDepth = Math.max(...nodeEntries.map(entry => entry.step.depth || 0), 0);

    let minX = Infinity;
    let maxX = -Infinity;
    nodeEntries.forEach(entry => {
        const x = entry.step.x;
        if (x === undefined || x === null) return;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
    });
    if (!Number.isFinite(minX) || !Number.isFinite(maxX)) {
        minX = -1;
        maxX = 1;
    }
    const treeWidth = Math.max(maxX - minX, 1);

    const widthSpan = Math.max(w - padding * 2, 120);
    const heightSpan = Math.max(h - padding * 2 - 30, 120);

    const toCanvas = (node) => {
        const normalizedX = treeWidth ? (node.x - minX) / treeWidth : 0.5;
        const depthValue = node.depth || 0;
        const normalizedY = maxDepth > 0 ? depthValue / maxDepth : 0;
        return {
            cx: padding + normalizedX * widthSpan,
            cy: padding + normalizedY * heightSpan
        };
    };

    const scaledRadius = Math.min(18, Math.max(12, widthSpan / 30));

    const progress = step ? easeInOutCubic(state.animationProgress) : 0;

    // Determine which nodes should be visible (matching playhead)
    const visibilityCutoff = Math.max(currentIndex, 1);
    const visibleNodes = nodeEntries.filter(entry => entry.originalIndex < visibilityCutoff);

    const drawEdges = (entries, limitIndex, color, width, dash = []) => {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (dash.length) ctx.setLineDash(dash);

        entries.forEach(entry => {
            if (entry.originalIndex >= limitIndex) return;
            const node = entry.step;
            if (node.x === undefined || node.x === null) return;
            if (node.parentIndex === null || node.parentIndex === undefined) return;

            const parentStep = steps[node.parentIndex];
            if (!parentStep || parentStep.x === undefined || parentStep.x === null) return;
            if (parentStep.type !== 'call') return;

            const childPos = toCanvas(node);
            const parentPos = toCanvas(parentStep);

            const angle = Math.atan2(childPos.cy - parentPos.cy, childPos.cx - parentPos.cx);
            const startX = parentPos.cx + Math.cos(angle) * scaledRadius;
            const startY = parentPos.cy + Math.sin(angle) * scaledRadius;
            const endX = childPos.cx - Math.cos(angle) * scaledRadius;
            const endY = childPos.cy - Math.sin(angle) * scaledRadius;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        });

        ctx.restore();
    };

    drawEdges(nodeEntries, Infinity, '#f0f0f0', 1, [4, 4]);
    drawEdges(nodeEntries, visibilityCutoff, '#d0d0d0', 2);

    // Draw ghost nodes to show full tree structure
    nodeEntries.forEach(entry => {
        const node = entry.step;
        if (node.x === undefined || node.x === null) return;
        const { cx, cy } = toCanvas(node);

        ctx.beginPath();
        ctx.arc(cx, cy, scaledRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 1;
        ctx.stroke();
    });

    // Draw past nodes (excluding the current animated node)
    visibleNodes.forEach(entry => {
        const isCurrent = entry.originalIndex === currentIndex - 1;
        if (isCurrent) return;

        const node = entry.step;
        if (node.x === undefined || node.x === null) return;
        const { cx, cy } = toCanvas(node);

        ctx.beginPath();
        ctx.arc(cx, cy, scaledRadius, 0, 2 * Math.PI);
        ctx.fillStyle = '#f7f7f7';
        ctx.fill();
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#444';
        ctx.font = '12px Menlo';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.k, cx, cy);
    });

    // Highlight the current active call node
    let currentEntry = null;
    for (let i = nodeEntries.length - 1; i >= 0; i--) {
        if (nodeEntries[i].originalIndex <= Math.max(currentIndex - 1, 0)) {
            currentEntry = nodeEntries[i];
            break;
        }
    }
    if (!currentEntry) {
        currentEntry = nodeEntries[0];
    }

    if (currentEntry && currentEntry.step.x !== undefined && currentEntry.step.x !== null) {
        const { cx, cy } = toCanvas(currentEntry.step);
        ctx.beginPath();
        ctx.arc(cx, cy, scaledRadius, 0, 2 * Math.PI);
        ctx.fillStyle = progress < 1 ? `rgba(0, 0, 0, ${progress})` : '#000';
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = progress > 0.5 ? '#fff' : '#000';
        ctx.font = 'bold 12px Menlo';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(currentEntry.step.k, cx, cy);
    }

    const n = step ? step.n : (state.n > 12 ? 12 : Math.round(state.displayN));
    ctx.fillStyle = '#666';
    ctx.font = '12px Menlo';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`Recursive tree for fib(${n}) - O(2ⁿ) exponential`, w / 2, h - 15);
}

// --- Graph Rendering ---

function renderGraph() {
    const w = graphCanvas.width;
    const h = graphCanvas.height;

    graphCtx.fillStyle = 'white';
    graphCtx.fillRect(0, 0, w, h);

    if (w < 120 || h < 120) return;

    const padding = 45;
    const config = getGraphSettings(state.complexity);
    if (!config) return;

    const xMin = 1;
    const xMax = Math.max(xMin + 1, config.maxInput || MAX_INPUT_SIZE);

    const points = [];
    let sampledYMax = 0;
    for (let x = xMin; x <= xMax; x++) {
        const yVal = config.func(x);
        if (!Number.isFinite(yVal)) continue;
        sampledYMax = Math.max(sampledYMax, yVal);
        points.push({ x, y: yVal });
    }

    if (!points.length) return;

    const totalSteps = Math.max(state.steps.length, 1);
    const yAxisMax = getNiceAxisMax(Math.max(sampledYMax, totalSteps));
    const graphW = w - padding * 2;
    const graphH = h - padding * 2;

    drawGridLines({
        padding,
        w,
        h,
        xMin,
        xMax,
        yMax: yAxisMax,
        graphW,
        graphH
    });

    // Axes
    graphCtx.strokeStyle = 'black';
    graphCtx.lineWidth = 2;
    graphCtx.beginPath();
    graphCtx.moveTo(padding, padding);
    graphCtx.lineTo(padding, h - padding);
    graphCtx.lineTo(w - padding, h - padding);
    graphCtx.stroke();

    // Axis labels
    graphCtx.fillStyle = '#111';
    graphCtx.font = '11px Menlo';
    graphCtx.textAlign = 'center';
    graphCtx.fillText('Input Size (n)', w / 2, h - 10);

    graphCtx.save();
    graphCtx.translate(15, h / 2);
    graphCtx.rotate(-Math.PI / 2);
    graphCtx.fillText('Time (steps)', 0, 0);
    graphCtx.restore();

    plotCurve(points, { padding, w, h, xMin, xMax, yMax: yAxisMax, color: '#e53935' });

    // Curve label
    graphCtx.fillStyle = '#e53935';
    graphCtx.font = 'bold 12px Menlo';
    graphCtx.textAlign = 'left';
    graphCtx.fillText(config.label, padding + 10, padding + 18);

    drawProgressMarkers({
        padding,
        w,
        h,
        xMin,
        xMax,
        yMax: yAxisMax,
        totalSteps
    });
}

function plotCurve(points, { padding, w, h, xMin, xMax, yMax, color }) {
    const graphW = w - padding * 2;
    const graphH = h - padding * 2;
    const xRange = Math.max(1, xMax - xMin);

    graphCtx.beginPath();
    points.forEach((point, index) => {
        const px = padding + ((point.x - xMin) / xRange) * graphW;
        const py = (h - padding) - ((point.y / yMax) * graphH);
        if (index === 0) {
            graphCtx.moveTo(px, py);
        } else {
            graphCtx.lineTo(px, py);
        }
    });
    graphCtx.strokeStyle = color;
    graphCtx.lineWidth = 2;
    graphCtx.stroke();
}

function drawGridLines({ padding, w, h, xMin, xMax, yMax, graphW, graphH }) {
    const xTicks = Math.min(5, xMax - xMin);
    const yTicks = 5;

    graphCtx.strokeStyle = '#e6e6e6';
    graphCtx.lineWidth = 1;
    graphCtx.setLineDash([4, 4]);

    for (let i = 0; i <= yTicks; i++) {
        const value = (yMax / yTicks) * i;
        const y = (h - padding) - (value / yMax) * graphH;
        graphCtx.beginPath();
        graphCtx.moveTo(padding, y);
        graphCtx.lineTo(w - padding, y);
        graphCtx.stroke();

        graphCtx.fillStyle = '#666';
        graphCtx.font = '10px Menlo';
        graphCtx.textAlign = 'right';
        graphCtx.fillText(formatMetric(value), padding - 8, y + 3);
    }

    for (let i = 0; i <= xTicks; i++) {
        const value = xMin + ((xMax - xMin) / Math.max(1, xTicks)) * i;
        const x = padding + ((value - xMin) / Math.max(1, xMax - xMin)) * graphW;
        graphCtx.beginPath();
        graphCtx.moveTo(x, padding);
        graphCtx.lineTo(x, h - padding);
        graphCtx.stroke();

        graphCtx.fillStyle = '#666';
        graphCtx.font = '10px Menlo';
        graphCtx.textAlign = 'center';
        graphCtx.fillText(Math.round(value), x, h - padding + 14);
    }

    graphCtx.setLineDash([]);
}

function drawProgressMarkers({ padding, w, h, xMin, xMax, yMax, totalSteps }) {
    const graphW = w - padding * 2;
    const graphH = h - padding * 2;
    const xRange = Math.max(1, xMax - xMin);

    // Use smooth displayN for animated transitions
    const currentInputRaw = state.steps[0]?.n ?? state.displayN;
    const currentInput = clamp(currentInputRaw, xMin, xMax);
    const px = padding + ((currentInput - xMin) / xRange) * graphW;

    const total = Math.min(totalSteps, yMax);
    const current = Math.min(state.currentStepIndex, yMax);
    const totalY = (h - padding) - (total / yMax) * graphH;
    const progressY = (h - padding) - (current / yMax) * graphH;

    // Guide line
    graphCtx.setLineDash([6, 4]);
    graphCtx.strokeStyle = 'rgba(0,0,0,0.25)';
    graphCtx.beginPath();
    graphCtx.moveTo(px, padding);
    graphCtx.lineTo(px, h - padding);
    graphCtx.stroke();
    graphCtx.setLineDash([]);

    // Total marker (hollow)
    graphCtx.fillStyle = '#fff';
    graphCtx.strokeStyle = '#e53935';
    graphCtx.lineWidth = 2;
    graphCtx.beginPath();
    graphCtx.arc(px, totalY, 7, 0, Math.PI * 2);
    graphCtx.fill();
    graphCtx.stroke();

    // Progress marker (filled)
    graphCtx.fillStyle = '#e53935';
    graphCtx.beginPath();
    graphCtx.arc(px, progressY, 5, 0, Math.PI * 2);
    graphCtx.fill();

    graphCtx.fillStyle = '#111';
    graphCtx.font = '10px Menlo';
    graphCtx.textAlign = 'left';
    const labelY = Math.min(progressY, totalY) - 8;
    const displayInput = Math.round(currentInput);
    graphCtx.fillText(`n=${displayInput} | ${formatMetric(state.currentStepIndex)}/${formatMetric(totalSteps)}`, px + 10, labelY);
}

function getGraphSettings(complexity) {
    switch (complexity) {
        case 'O(1)':
            return { label: 'O(1)', maxInput: MAX_INPUT_SIZE, func: () => 1 };
        case 'O(log n)':
            return {
                label: 'O(log n)',
                maxInput: MAX_INPUT_SIZE,
                func: (n) => Math.log2(Math.max(n, 1)) + 1
            };
        case 'O(n)':
            return { label: 'O(n)', maxInput: MAX_INPUT_SIZE, func: (n) => n };
        case 'O(n²)':
            return { label: 'O(n²)', maxInput: MAX_INPUT_SIZE, func: (n) => n * n };
        case 'O(2ⁿ)':
            return {
                label: 'O(2ⁿ)',
                maxInput: Math.min(12, MAX_INPUT_SIZE),
                func: (n) => Math.pow(2, Math.max(0, n))
            };
        default:
            return null;
    }
}

function getNiceAxisMax(value) {
    const target = Math.max(1, value);
    const exponent = Math.floor(Math.log10(target));
    const fraction = target / Math.pow(10, exponent);
    let niceFraction;

    if (fraction <= 1) niceFraction = 1;
    else if (fraction <= 2) niceFraction = 2;
    else if (fraction <= 5) niceFraction = 5;
    else niceFraction = 10;

    return niceFraction * Math.pow(10, exponent);
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function formatMetric(num) {
    if (num >= 1000) {
        const formatted = num >= 10000 ? Math.round(num / 1000) : (num / 1000).toFixed(1);
        return `${formatted}k`;
    }
    return Math.round(num).toString();
}

// --- Start ---
init();
