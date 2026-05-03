const canvas = document.getElementById('automaton-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const numParticles = 80; // Sparse: lower count for a cleaner look
const noiseScale = 0.005; // Lower = straighter lines; Higher = more turbulence
const moveSpeed = 0.8;    // The "flow" velocity
const trailOpacity = 0.01; // How quickly lines fade (0.01 is very slow/long trails)

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }
  // Start with a clean white slate
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

class Particle {
  constructor() {
    this.init();
  }

  init() {
    // Start at random positions
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.prevX = this.x;
    this.prevY = this.y;
    
    // Life determines how long a thread grows before resetting
    this.life = Math.random() * 300 + 100;
  }

  update() {
    this.prevX = this.x;
    this.prevY = this.y;

    // We simulate a Perlin-like flow using trigonometric functions
    // This creates a smooth, curving "wind" field across the screen
    let angle = (Math.sin(this.x * noiseScale) + Math.cos(this.y * noiseScale)) * Math.PI * 2;
    
    this.x += Math.cos(angle) * moveSpeed;
    this.y += Math.sin(angle) * moveSpeed;
    this.life--;

    // Reset if it goes off screen or "dies"
    if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.init();
    }
  }

  draw() {
    ctx.beginPath();
    // Using a subtle blue-grey for a professional feel
    ctx.strokeStyle = 'rgba(74, 144, 226, 0.1)'; 
    ctx.lineWidth = 1;
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}

// Interaction: Mouse disrupts the local flow
window.addEventListener('mousemove', (e) => {
  particles.forEach(p => {
    let dx = e.clientX - p.x;
    let dy = e.clientY - p.y;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      p.x += dx * 0.05; // Particles gently nudge away from mouse
      p.y += dy * 0.05;
    }
  });
});

function animate() {
  // Instead of clearing, we draw a nearly transparent rectangle 
  // to slowly "fade" older parts of the lines.
  ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', setup);
setup();
animate();