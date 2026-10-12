/**
 * SCI-FI HOLOGRAPHIC SOC WAR ROOM INTERACTIVE ENGINE
 * Continuous Fullscreen Presentation Engine, Holographic Node Grid & Audio FX
 * Presented by Somesh Som Pattnaik (Defensive Security Analyst, Threat Hunter)
 */

// Web Audio API Sci-Fi Tactical Synthesizer
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    try {
      this.muted = localStorage.getItem('cyber_audio_muted') === 'true';
    } catch (e) {
      this.muted = false;
    }
  }

  init() {
    if (!this.ctx && typeof AudioContext !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type = 'sine', duration = 0.07, gainVal = 0.035) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  click() {
    // Holographic blip
    this.playTone(920, 'sine', 0.03, 0.02);
  }

  confirm() {
    // Dual crystal harmonic
    this.playTone(659.25, 'sine', 0.06, 0.03); // E5
    setTimeout(() => this.playTone(1046.50, 'sine', 0.09, 0.04), 45); // C6
  }

  alert() {
    // Tactical breach horn
    this.playTone(440, 'sawtooth', 0.12, 0.05);
    setTimeout(() => this.playTone(311.13, 'sawtooth', 0.15, 0.06), 80);
  }

  resolve() {
    // Futuristic affirmative sweep
    this.playTone(523.25, 'sine', 0.06, 0.03);
    setTimeout(() => this.playTone(783.99, 'sine', 0.08, 0.035), 60);
    setTimeout(() => this.playTone(1046.50, 'sine', 0.12, 0.04), 120);
  }

  toggle() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('cyber_audio_muted', this.muted);
    } catch (e) {}
    if (!this.muted) this.confirm();
    return this.muted;
  }
}

const cyberAudio = new CyberAudioEngine();

// Sci-Fi Slides Registry (14 Dedicated Strategic Modules)
const SLIDES = [
  { id: '01', file: 'index.html', title: 'Intro: Security Operation Center (Speaker Briefing)' },
  { id: '02', file: '02_soc_architecture.html', title: 'Topic 01: SOC Architecture & Tiered Operations' },
  { id: '03', file: '03_siem_platforms.html', title: 'Topic 02: SIEM Platforms & Log Analytics' },
  { id: '04', file: '04_ids_ips_inspection.html', title: 'Topic 03: IDS / IPS & Deep Packet Inspection' },
  { id: '05', file: '05_edr_endpoint.html', title: 'Topic 04: EDR & Endpoint Protection' },
  { id: '06', file: '06_soar_playbooks.html', title: 'Topic 05: SOAR & Automated Orchestration' },
  { id: '07', file: '07_ngfw_waf.html', title: 'Topic 06: Next-Gen Firewall (NGFW) & WAF' },
  { id: '08', file: '08_email_security.html', title: 'Topic 07: Email Security Gateways (SEG)' },
  { id: '09', file: '09_cloud_infra.html', title: 'Topic 08: Cloud & Infrastructure Security (CNAPP)' },
  { id: '10', file: '10_threat_intel_sandbox.html', title: 'Topic 09: Threat Intel & Malware Sandboxing' },
  { id: '11', file: '11_threat_hunting.html', title: 'Topic 10: Threat Hunting & DFIR Telemetry' },
  { id: '12', file: '12_scripting_automation.html', title: 'Topic 11: Scripting Automation for SecOps' },
  { id: '13', file: '13_ransomware_war_room.html', title: 'Topic 12: ⚔️ WAR ROOM (Live Ransomware Crisis & DFIR)' },
  { id: '14', file: '14_career_roadmap.html', title: 'Topic 13: B.Tech Cybersecurity Career Blueprint' }
];

function getCurrentSlideIndex() {
  if (window.currentSpaSlideIndex !== undefined) {
    return window.currentSpaSlideIndex;
  }
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const idx = SLIDES.findIndex(s => s.file === currentPath || (currentPath === '' && s.file === 'index.html'));
  return idx !== -1 ? idx : 0;
}

function navigateSlide(direction) {
  // If SPA multi-slide runner is present on the page, use zero-reload transition to maintain 100% continuous Fullscreen!
  if (typeof window.goToSpaSlide === 'function') {
    const nextIdx = getCurrentSlideIndex() + direction;
    if (nextIdx >= 0 && nextIdx < SLIDES.length) {
      if (cyberAudio && cyberAudio.click) cyberAudio.click();
      window.goToSpaSlide(nextIdx);
      return;
    }
  }

  // Fallback standalone file navigation
  const currentIdx = getCurrentSlideIndex();
  let nextIdx = currentIdx + direction;
  if (nextIdx >= 0 && nextIdx < SLIDES.length) {
    if (cyberAudio && cyberAudio.click) cyberAudio.click();
    if (document.fullscreenElement) {
      try { sessionStorage.setItem('presentation_keep_fullscreen', 'true'); } catch (e) {}
    }
    window.location.href = SLIDES[nextIdx].file;
  }
}

// SCI-FI HOLOGRAPHIC LASER NODE & TELEMETRY CANVAS
function initCyberCanvas() {
  const canvas = document.getElementById('cyberCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const nodeCount = Math.min(65, Math.floor((width * height) / 22000));
  const nodes = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 2 + 1.2,
      pulse: Math.random() * Math.PI,
      isCyan: Math.random() > 0.35
    });
  }

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function drawHologramGrid() {
    // Sci-Fi void clearing
    ctx.fillStyle = 'rgba(3, 7, 18, 0.22)';
    ctx.fillRect(0, 0, width, height);

    // Subtle Perspective Holographic Grid Lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
    ctx.lineWidth = 1;
    const gridSpacing = 90;
    for (let x = 0; x < width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Update and draw nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      n.pulse += 0.03;
      const currentRadius = n.radius + Math.sin(n.pulse) * 0.6;

      // Mouse proximity interaction
      const distMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y);
      if (distMouse < 140) {
        ctx.strokeStyle = 'rgba(0, 240, 255, ' + (1 - distMouse / 140) * 0.6 + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      // Draw particle
      ctx.fillStyle = n.isCyan ? '#00f0ff' : '#0070f3';
      ctx.shadowColor = n.isCyan ? 'rgba(0, 240, 255, 0.8)' : 'rgba(0, 112, 243, 0.8)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(n.x, n.y, Math.max(1, currentRadius), 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect nearby nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const n2 = nodes[j];
        const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.16;
          ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(drawHologramGrid);
  }

  drawHologramGrid();
}

// 3D Card Hover Tilt Effect
function initTiltEffect() {
  const cards = document.querySelectorAll('.tool-card, .kpi-card, .presenter-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateX = (-y / (rect.height / 2)) * 4;
      const rotateY = (x / (rect.width / 2)) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });

    card.addEventListener('mouseenter', () => {
      if (cyberAudio && cyberAudio.click) cyberAudio.click();
    });
  });
}

// HUD Matrix Modal Setup
function setupHUDModal() {
  const modal = document.getElementById('hudModal');
  if (!modal) return;

  const currentIdx = getCurrentSlideIndex();
  const grid = modal.querySelector('.hud-grid');
  if (grid) {
    grid.innerHTML = SLIDES.map((s, idx) => `
      <a href="${typeof window.goToSpaSlide === 'function' ? 'javascript:goToSpaSlide(' + idx + ')' : s.file}" class="hud-slide-card ${idx === currentIdx ? 'active' : ''}" onclick="if(cyberAudio&&cyberAudio.confirm)cyberAudio.confirm(); if(window.toggleHUD)toggleHUD();">
        <div class="hud-slide-num">MODULE ${String(idx + 1).padStart(2, '0')} ${idx === currentIdx ? '• [ACTIVE]' : ''}</div>
        <div class="hud-slide-name">${s.title}</div>
      </a>
    `).join('');
  }

  window.toggleHUD = function() {
    if (cyberAudio && cyberAudio.click) cyberAudio.click();
    modal.classList.toggle('open');
  };

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

// Fullscreen Toggle Helper
function togglePresentationFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().then(() => {
      try { sessionStorage.setItem('presentation_keep_fullscreen', 'true'); } catch (e) {}
    }).catch(() => {});
  } else {
    document.exitFullscreen().then(() => {
      try { sessionStorage.setItem('presentation_keep_fullscreen', 'false'); } catch (e) {}
    }).catch(() => {});
  }
}

// Keyboard Navigation Controls
function setupKeyboardControls() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      navigateSlide(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      navigateSlide(-1);
    } else if (e.key.toLowerCase() === 'f') {
      togglePresentationFullscreen();
    } else if (e.key.toLowerCase() === 'm') {
      if (window.toggleHUD) window.toggleHUD();
    } else if (e.key.toLowerCase() === 's') {
      const audioBtn = document.getElementById('audioToggleBtn');
      if (audioBtn) audioBtn.click();
    } else if (e.key === 'Escape') {
      const modal = document.getElementById('hudModal');
      if (modal && modal.classList.contains('open')) {
        modal.classList.remove('open');
      }
    }
  });
}

// Check and attempt auto-resume fullscreen if requested
function checkResumeFullscreen() {
  try {
    if (sessionStorage.getItem('presentation_keep_fullscreen') === 'true') {
      const clickHandler = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
        document.removeEventListener('click', clickHandler);
      };
      document.addEventListener('click', clickHandler);
    }
  } catch (e) {}
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initCyberCanvas();
  initTiltEffect();
  setupHUDModal();
  setupKeyboardControls();
  checkResumeFullscreen();

  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn) {
    const updateAudioIcon = () => {
      audioBtn.innerHTML = cyberAudio.muted ? '🔇 Sound OFF' : '🔊 Sound ON';
      audioBtn.style.borderColor = cyberAudio.muted ? 'var(--text-dim)' : 'var(--cyan-neon)';
    };
    updateAudioIcon();
    audioBtn.addEventListener('click', () => {
      cyberAudio.toggle();
      updateAudioIcon();
    });
  }

  document.querySelectorAll('a, button, .btn-cyber-nav').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cyberAudio && cyberAudio.click) cyberAudio.click();
    });
  });
});
