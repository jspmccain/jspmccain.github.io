const canvas = document.getElementById('automaton-canvas');
const ctx = canvas.getContext('2d');

let agents = [];
const numAgents = 200; // Sparse: Keep this relatively low for a background
const sensorAngle = Math.PI / 4; // 45 degrees
const sensorDist = 20;
const turnSpeed = 0.4;
const moveSpeed = 1.5;

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  agents = [];
  
  // Initialize agents in a small central cluster
  for (let i = 0; i < numAgents; i++) {
    agents.push(new Agent());
  }
  
  // Initial clear to white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

class Agent {
  constructor() {
    this.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
    this.y = canvas.height / 2 + (Math.random() - 0.5) * 100;
    this.angle = Math.random() * Math.PI * 2;
  }

  update() {
    // 1. Sensing: Check the trail "pheromones" (pixel brightness)
    // For a simple JS version, we'll use a simplified random-walk with momentum
    // to simulate foraging without a heavy per-pixel buffer calculation.
    this.angle += (Math.random() - 0.5) * turnSpeed;

    // 2. Movement
    this.x += Math.cos(this.angle) * moveSpeed;
    this.y += Math.sin(this.angle) * moveSpeed;

    // 3. Boundary handling (Wrap around)
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    // Draw the "trail" line
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(74, 144, 226, 0.2)'; // Sparse blue lines
    ctx.lineWidth = 0.5;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - Math.cos(this.angle) * 2, this.y - Math.sin(this.angle) * 2);
    ctx.stroke();
  }
}

// Interaction: Mouse acts as a "repellent" or "attractor"
window.addEventListener('mousemove', (e) => {
  agents.forEach(a => {
    let dx = e.clientX - a.x;
    let dy = e.clientY - a.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      // Repel: Turn away from mouse
      let angleToMouse = Math.atan2(dy, dx);
      a.angle += (a.angle - angleToMouse) * 0.1;
    }
  });
});

function animate() {
  // Trail Decay: This creates the "organic" fading effect
  // Change 0.02 to 0.01 for longer-lasting lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  agents.forEach(a => {
    a.update();
    a.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', setup);
setup();
animate();