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
        headline: 'Constant Space O(1)',
        intro: 'Uses a fixed amount of memory regardless of input size.',
        keyPoints: [
            'Memory usage does not grow with n',
            'Only uses a few variables or fixed-size buffers',
            'Most space-efficient complexity class'
        ],
        analogy: 'Using one bookmark while reading any size book.',
        realWorld: ['Iterative binary search', 'Array element access', 'Variable swap'],
        takeaway: 'O(1) space is the gold standard for memory efficiency.',
        animation: 'The visualization shows a constant number of blocks/frames.',
        graph: 'Flat horizontal line at y=1.'
    },
    'O(log n)': {
        headline: 'Logarithmic Space O(log n)',
        intro: 'Memory grows slowly as input doubles.',
        keyPoints: [
            'Typical for divide-and-conquer recursive algorithms',
            'Stack depth equals log₂(n)',
            'Very scalable for large inputs'
        ],
        analogy: 'Finding a name in a phone book by halving the pages each time.',
        realWorld: ['Recursive binary search', 'Balanced BST operations'],
        takeaway: 'O(log n) space scales extremely well.',
        animation: 'Stack grows slowly, adding one frame per doubling of n.',
        graph: 'Gentle logarithmic curve.'
    },
    'O(n)': {
        headline: 'Linear Space O(n)',
        intro: 'Memory usage is directly proportional to input size.',
        keyPoints: [
            'Common when storing all input elements',
            'Each element requires one unit of memory',
            'Doubling n doubles memory usage'
        ],
        analogy: 'Copying a list item-by-item.',
        realWorld: ['Creating a copy of an array', 'Storing DFS path', 'Hash table with n entries'],
        takeaway: 'O(n) is acceptable for most practical problems.',
        animation: 'Blocks/frames increase linearly with n.',
        graph: 'Straight diagonal line.'
    },
    'O(n log n)': {
        headline: 'Linearithmic Space O(n log n)',
        intro: 'Combines linear storage with logarithmic depth.',
        keyPoints: [
            'Appears in divide-and-conquer algorithms',
            'Needs O(n) space at each of O(log n) levels',
            'More memory than O(n) but still manageable'
        ],
        analogy: 'Tournament bracket needing space for all players plus rounds.',
        realWorld: ['Merge sort with auxiliary arrays', 'Certain recursive tree algorithms'],
        takeaway: 'Common trade-off for faster sorting.',
        animation: 'Memory grows faster than linear.',
        graph: 'Upward curve, steeper than linear.'
    },
    'O(n²)': {
        headline: 'Quadratic Space O(n²)',
        intro: 'Memory usage grows with the square of input size.',
        keyPoints: [
            'Typical for 2D grids and matrices',
            'Doubling n quadruples memory',
            'Only practical for small inputs'
        ],
        analogy: 'Multiplication table where 10 numbers need 100 cells.',
        realWorld: ['Graph adjacency matrix', '2D dynamic programming table'],
        takeaway: 'Avoid O(n²) space for large datasets.',
        animation: 'Blocks explode quickly as n increases.',
        graph: 'Steep parabolic curve.'
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
