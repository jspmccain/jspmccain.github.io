const canvas = document.getElementById('automaton-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let seedX, seedY, currentNoiseScale; // Variables for stochastic seeding

const numParticles = 80; 
const moveSpeed = 0.8;    
const trailOpacity = 0.01; 

function setup() {
  // --- High-DPI Sharpness Fix ---
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(dpr, dpr);

  // --- Stochastic Seeding ---
  // These move the "map" to a new random location every time you refresh
  seedX = Math.random() * 1000;
  seedY = Math.random() * 1000;
  // Slightly randomize the "wiggliness" (0.003 to 0.007)
  currentNoiseScale = 0.003 + Math.random() * 0.004;

  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

class Particle {
  constructor() {
    this.init();
  }

  init() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.prevX = this.x;
    this.prevY = this.y;
    // Randomized life creates asynchronous thread growth
    this.life = Math.random() * 400 + 100;
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;

    // The seeds (seedX, seedY) ensure the flow field is unique per refresh
    let angle = (Math.sin((this.x + seedX) * currentNoiseScale) + 
                 Math.cos((this.y + seedY) * currentNoiseScale)) * Math.PI * 2;
    
    this.x += Math.cos(angle) * moveSpeed;
    this.y += Math.sin(angle) * moveSpeed;
    this.life--;

    if (this.life <= 0 || this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
      this.init();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(40, 40, 40, 0.4)'; 
    ctx.lineWidth = 0.8; 
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

// Interaction: Disruption
window.addEventListener('mousemove', (e) => {
  particles.forEach(p => {
    let dx = e.clientX - p.x;
    let dy = e.clientY - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      p.x += dx * 0.05;
      p.y += dy * 0.05;
    }
  });
});

function animate() {
  ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', setup);
setup();
animate();