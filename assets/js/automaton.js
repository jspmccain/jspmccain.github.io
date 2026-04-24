const canvas = document.getElementById('automaton-canvas');
const ctx = canvas.getContext('2d');

let resolution = 5; // Size of the "cells"
let grid;
let cols, rows;

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
    .map(() => Math.floor(Math.random() * 2)));
}

function draw() {
  // Instead of ctx.clearRect, we draw a faint rectangle over everything
  // This creates the "fade" or "trail" effect
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; // Match your background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j]) {
        ctx.fillStyle = '#4a90e2'; 
        // Use a circle instead of a square for a more organic feel
        ctx.beginPath();
        ctx.arc(i * resolution, j * resolution, resolution / 2, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }
  
  grid = nextGen();
  // Remove the setTimeout to let it run at 60fps for maximum fluidity
  requestAnimationFrame(draw); 
}

function nextGen() {
  let next = grid.map(arr => [...arr]);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j);
      let state = grid[i][j];
      
      if (state === 0 && neighbors === 3) next[i][j] = 1;
      else if (state === 1 && (neighbors < 2 || neighbors > 3)) next[i][j] = 0;
    }
  }
  return next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols; // Wrap around edges (Toroidal)
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
