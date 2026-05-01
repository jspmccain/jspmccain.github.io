const canvas = document.getElementById('automaton-canvas');
const ctx = canvas.getContext('2d');

let resolution = 6; 
let grid;
let cols, rows;
let frameCount = 0;
const speedGovernor = 4; // Slightly faster logic for smoother mouse interaction

// Organic Tuning Parameters
const initialSpawnChance = 0.05; // Much lower for a sparse look
const birthChance = 0.02;       // Random spontaneous "mutations"
const deathChance = 0.1;        // Natural decay to keep it from getting crowded

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  cols = Math.floor(canvas.width / resolution);
  rows = Math.floor(canvas.height / resolution);
  grid = buildGrid();
}

function buildGrid() {
  return new Array(cols).fill(null)
    .map(() => new Array(rows).fill(null)
    .map(() => Math.random() < initialSpawnChance ? 1 : 0));
}

// Interaction: Seed life with the mouse
window.addEventListener('mousemove', (e) => {
  const mouseX = Math.floor(e.clientX / resolution);
  const mouseY = Math.floor(e.clientY / resolution);
  const radius = 3; // How many cells the cursor affects

  for (let i = -radius; i <= radius; i++) {
    for (let j = -radius; j <= radius; j++) {
      let c = (mouseX + i + cols) % cols;
      let r = (mouseY + j + rows) % rows;
      if (Math.random() < 0.5) grid[c][r] = 1;
    }
  }
});

function draw() {
  // Fade effect for trails
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j]) {
        // Varying alpha based on neighbors for a soft, "fuzzy" look
        ctx.fillStyle = `rgba(74, 144, 226, ${Math.random() * 0.5 + 0.2})`; 
        ctx.beginPath();
        // Smaller circles for a more refined, sparse appearance
        ctx.arc(i * resolution, j * resolution, resolution / 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
  
  if (frameCount % speedGovernor === 0) {
    grid = nextGen();
  }
  
  frameCount++;
  requestAnimationFrame(draw); 
}

function nextGen() {
  let next = grid.map(arr => [...arr]);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j);
      let state = grid[i][j];

      // Organic Logic: 
      // Instead of rigid "3", we allow a range and add a tiny bit of entropy
      if (state === 0) {
        if (neighbors === 3 || Math.random() < birthChance) {
          next[i][j] = 1;
        }
      } else {
        if (neighbors < 2 || neighbors > 4 || Math.random() < deathChance) {
          next[i][j] = 0;
        }
      }
    }
  }
  return next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

window.addEventListener('resize', setup);
setup();
draw();