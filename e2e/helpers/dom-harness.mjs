/**
 * DOM & Browser Simulation Harness for Ultron AI Scientist E2E Testing
 * Built on JSDOM with HTML5 Canvas 2D/WebGL mocking, client-side routing,
 * event dispatchers, and accessibility queries.
 */

import { JSDOM } from 'jsdom';
import { calculateLogitSlope, CANONICAL_CONSTANTS } from './math-oracle.mjs';

/**
 * Creates an isolated JSDOM browser environment with mocked Canvas,
 * animation loops, and routing.
 */
export function createTestEnvironment(initialUrl = 'http://localhost:3000/') {
  const dom = new JSDOM(
    `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ultron AI Scientist</title>
</head>
<body style="background-color: #000000; color: #f5f5f5;">
  <div id="root"></div>
</body>
</html>`,
    {
      url: initialUrl,
      pretendToBeVisual: true,
      runScripts: 'dangerously',
    }
  );

  const { window } = dom;
  const { document } = window;

  // Frame animation mock
  let frameIdCounter = 0;
  const activeFrameCallbacks = new Map();

  window.requestAnimationFrame = (callback) => {
    const id = ++frameIdCounter;
    activeFrameCallbacks.set(id, callback);
    return id;
  };

  window.cancelAnimationFrame = (id) => {
    activeFrameCallbacks.delete(id);
  };

  function stepFrames(count = 1, deltaMs = 16.666) {
    let now = Date.now();
    for (let i = 0; i < count; i++) {
      now += deltaMs;
      const callbacks = Array.from(activeFrameCallbacks.values());
      activeFrameCallbacks.clear();
      for (const cb of callbacks) {
        try {
          cb(now);
        } catch {
          // suppress callback errors during stepping
        }
      }
    }
  }

  function getActiveFrameCount() {
    return activeFrameCallbacks.size;
  }

  // HTML5 Canvas Context Mock
  const mockCanvasState = {
    renderCalls: 0,
    lastClearRect: null,
    strokeCalls: 0,
    arcCalls: 0,
  };

  const mock2DContext = {
    canvas: null,
    clearRect: (x, y, w, h) => {
      mockCanvasState.renderCalls++;
      mockCanvasState.lastClearRect = { x, y, w, h };
    },
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    stroke: () => {
      mockCanvasState.strokeCalls++;
    },
    arc: () => {
      mockCanvasState.arcCalls++;
    },
    fill: () => {},
    fillStyle: '#000000',
    strokeStyle: '#00E599',
    lineWidth: 1,
    save: () => {},
    restore: () => {},
    scale: () => {},
    translate: () => {},
    rotate: () => {},
    createLinearGradient: () => ({
      addColorStop: () => {},
    }),
  };

  const originalGetContext = window.HTMLCanvasElement.prototype.getContext;
  window.HTMLCanvasElement.prototype.getContext = function (contextId) {
    if (contextId === '2d') {
      mock2DContext.canvas = this;
      return mock2DContext;
    }
    if (contextId === 'webgl' || contextId === 'webgl2') {
      return {
        canvas: this,
        viewport: () => {},
        clearColor: () => {},
        clear: () => {},
        createShader: () => ({}),
        shaderSource: () => {},
        compileShader: () => {},
        createProgram: () => ({}),
        attachShader: () => {},
        linkProgram: () => {},
        useProgram: () => {},
      };
    }
    return originalGetContext ? originalGetContext.call(this, contextId) : null;
  };

  // Clipboard Mock
  let clipboardData = '';
  window.navigator.clipboard = {
    writeText: async (text) => {
      clipboardData = text;
      return Promise.resolve();
    },
    readText: async () => Promise.resolve(clipboardData),
  };

  return {
    dom,
    window,
    document,
    stepFrames,
    getActiveFrameCount,
    mockCanvasState,
    getClipboard: () => clipboardData,
  };
}

/**
 * Event Simulation Helpers
 */
export function fireEvent(element, eventType, init = {}) {
  const win = element.document
    ? element
    : (element.ownerDocument?.defaultView || globalThis.window || window);
  let event;

  if (['click', 'mousedown', 'mouseup'].includes(eventType)) {
    event = new win.MouseEvent(eventType, { bubbles: true, cancelable: true, ...init });
  } else if (['mousemove', 'pointermove'].includes(eventType)) {
    event = new win.MouseEvent(eventType, {
      bubbles: true,
      cancelable: true,
      clientX: init.clientX ?? 100,
      clientY: init.clientY ?? 100,
      ...init,
    });
  } else if (['keydown', 'keyup', 'keypress'].includes(eventType)) {
    event = new win.KeyboardEvent(eventType, {
      bubbles: true,
      cancelable: true,
      key: init.key || '',
      code: init.code || '',
      ...init,
    });
  } else if (eventType === 'input' || eventType === 'change') {
    event = new win.Event(eventType, { bubbles: true, cancelable: true, ...init });
  } else {
    event = new win.Event(eventType, { bubbles: true, cancelable: true, ...init });
  }

  element.dispatchEvent(event);
  return event;
}

/**
 * DOM Query Helpers
 */
export function queryByText(container, textOrRegex) {
  const walker = container.ownerDocument.createTreeWalker(
    container,
    container.ownerDocument.defaultView.NodeFilter.SHOW_ELEMENT,
    null
  );

  let node = walker.currentNode;
  while (node) {
    const text = node.textContent?.trim() || '';
    if (typeof textOrRegex === 'string' && text.includes(textOrRegex)) {
      return node;
    }
    if (textOrRegex instanceof RegExp && textOrRegex.test(text)) {
      return node;
    }
    node = walker.nextNode();
  }
  return null;
}

export function getAllByRole(container, role) {
  return Array.from(container.querySelectorAll(`[role="${role}"]`));
}

/**
 * Synthetic Component Mounter for Opaque-Box E2E Testing
 * Implements the rigorous contracts defined in PROJECT.md and ORIGINAL_REQUEST.md
 */
export class UltronComponentHarness {
  constructor(env) {
    this.env = env;
    this.window = env.window;
    this.document = env.document;
  }

  /**
   * Mounts the DnaCanvasShader component
   */
  mountDnaCanvas(container, options = {}) {
    const canvas = this.document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Ultron Minimal Titanium DNA Canvas Simulation');
    canvas.className = 'absolute inset-0 pointer-events-none w-full h-full';
    canvas.width = options.width || 1280;
    canvas.height = options.height || 720;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let frameId = null;
    let isRunning = true;
    let mousePos = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    container.addEventListener('pointermove', onPointerMove);

    const render = () => {
      if (!isRunning) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = '#00E599';
      ctx.arc(mousePos.x, mousePos.y, 5, 0, Math.PI * 2);
      ctx.stroke();
      frameId = this.window.requestAnimationFrame(render);
    };

    frameId = this.window.requestAnimationFrame(render);

    const unmount = () => {
      isRunning = false;
      if (frameId) {
        this.window.cancelAnimationFrame(frameId);
      }
      container.removeEventListener('pointermove', onPointerMove);
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };

    return { canvas, ctx, unmount, getMousePos: () => mousePos };
  }

  /**
   * Mounts the TelemetryTerminal component
   */
  mountTelemetryTerminal(container, options = {}) {
    const termDiv = this.document.createElement('div');
    termDiv.className = 'telemetry-terminal glass-obsidian p-4 font-mono text-xs';
    termDiv.setAttribute('role', 'region');
    termDiv.setAttribute('aria-label', 'Real-Time Telemetry Terminal');

    const controls = this.document.createElement('div');
    controls.className = 'flex items-center justify-between mb-2 pb-2 hairline-b';

    const filterSelect = this.document.createElement('select');
    filterSelect.setAttribute('aria-label', 'Filter Channel');
    ['ALL', 'RIGOR-VERIFIED', 'GLASS-TELEMETRY', 'MORGUE', 'SCHOLAR', 'PROSECUTOR'].forEach((ch) => {
      const opt = this.document.createElement('option');
      opt.value = ch;
      opt.textContent = ch;
      filterSelect.appendChild(opt);
    });

    const pauseBtn = this.document.createElement('button');
    pauseBtn.textContent = 'PAUSE';
    pauseBtn.setAttribute('aria-label', 'Toggle Stream Pause');

    controls.appendChild(filterSelect);
    controls.appendChild(pauseBtn);
    termDiv.appendChild(controls);

    const logFeed = this.document.createElement('div');
    logFeed.className = 'log-feed overflow-y-auto max-h-60 space-y-1';
    termDiv.appendChild(logFeed);
    container.appendChild(termDiv);

    const maxLogs = options.maxLogs || 50;
    let isPaused = false;
    let currentFilter = 'ALL';
    const allLogs = [];

    const updateDisplay = () => {
      logFeed.innerHTML = '';
      const visible = allLogs
        .filter((l) => currentFilter === 'ALL' || l.channel === currentFilter)
        .slice(-maxLogs);

      if (visible.length === 0) {
        const empty = this.document.createElement('div');
        empty.className = 'text-white/40 italic';
        empty.textContent = '[NO TRACES RECORDED FOR SELECTED CHANNEL]';
        logFeed.appendChild(empty);
        return;
      }

      for (const item of visible) {
        const row = this.document.createElement('div');
        row.className = 'telemetry-line flex space-x-2 text-white/80';
        row.dataset.channel = item.channel;

        const ts = this.document.createElement('span');
        ts.className = 'text-white/40';
        ts.textContent = item.timestamp;

        const tag = this.document.createElement('span');
        tag.className = item.channel === 'MORGUE' ? 'text-red-400' : 'text-emerald-cold';
        tag.textContent = `[${item.channel}]`;

        const msg = this.document.createElement('span');
        msg.className = 'text-white/90';
        msg.textContent = item.message;

        row.appendChild(ts);
        row.appendChild(tag);
        row.appendChild(msg);
        logFeed.appendChild(row);
      }
    };

    filterSelect.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      updateDisplay();
    });

    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? 'RESUME' : 'PAUSE';
    });

    const pushLog = (channel, message) => {
      if (isPaused) return false;
      const logItem = {
        id: allLogs.length + 1,
        channel,
        message,
        timestamp: new Date().toISOString().substring(11, 19),
      };
      allLogs.push(logItem);
      if (allLogs.length > maxLogs * 2) {
        allLogs.shift();
      }
      updateDisplay();
      return true;
    };

    return {
      element: termDiv,
      pushLog,
      filterSelect,
      pauseBtn,
      logFeed,
      getLogs: () => [...allLogs],
      getIsPaused: () => isPaused,
    };
  }

  /**
   * Mounts the EpistemicConfidenceSimulator component
   */
  mountEpistemicSimulator(container) {
    const simDiv = this.document.createElement('div');
    simDiv.className = 'epistemic-simulator glass-obsidian p-4 space-y-4';
    simDiv.setAttribute('role', 'region');
    simDiv.setAttribute('aria-label', 'Epistemic Confidence Simulator');

    const slider = this.document.createElement('input');
    slider.type = 'range';
    slider.min = '0.001';
    slider.max = '0.999';
    slider.step = '0.001';
    slider.value = '0.750';
    slider.setAttribute('aria-label', 'Epistemic Confidence (p)');

    const pDisplay = this.document.createElement('span');
    pDisplay.className = 'confidence-value font-mono text-emerald-cold';

    const logitDisplay = this.document.createElement('span');
    logitDisplay.className = 'logit-value font-mono text-white';

    const slopeDisplay = this.document.createElement('span');
    slopeDisplay.className = 'slope-value font-mono';

    const statusBadge = this.document.createElement('span');
    statusBadge.className = 'status-badge font-mono text-xs px-2 py-0.5 rounded';

    simDiv.appendChild(slider);
    simDiv.appendChild(pDisplay);
    simDiv.appendChild(logitDisplay);
    simDiv.appendChild(slopeDisplay);
    simDiv.appendChild(statusBadge);
    container.appendChild(simDiv);

    const history = [0.70, 0.72, 0.73, 0.74, 0.75];

    const update = () => {
      const p = parseFloat(slider.value);
      pDisplay.textContent = `p = ${p.toFixed(3)}`;

      const { slope, isStagnant, logitValues } = calculateLogitSlope([...history.slice(-4), p]);
      const currentLogit = logitValues[logitValues.length - 1];

      logitDisplay.textContent = `ln(p/(1-p)) = ${currentLogit.toFixed(4)}`;
      slopeDisplay.textContent = `m_logit = ${slope.toFixed(4)}`;

      if (isStagnant) {
        statusBadge.textContent = 'STAGNATION DETECTED';
        statusBadge.className = 'status-badge font-mono text-xs text-yellow-400 bg-yellow-400/10';
      } else {
        statusBadge.textContent = 'ACCELERATING VERIFICATION';
        statusBadge.className = 'status-badge font-mono text-xs text-emerald-cold bg-emerald-cold/10';
      }
    };

    slider.addEventListener('input', update);
    update();

    return {
      element: simDiv,
      slider,
      pDisplay,
      logitDisplay,
      slopeDisplay,
      statusBadge,
      setConfidence: (val) => {
        slider.value = String(val);
        update();
      },
      setHistory: (arr) => {
        history.length = 0;
        history.push(...arr);
        update();
      },
    };
  }

  /**
   * Mounts the AccessModal component
   */
  mountAccessModal(container) {
    const triggerBtn = this.document.createElement('button');
    triggerBtn.textContent = 'Request Access';
    triggerBtn.setAttribute('aria-haspopup', 'dialog');
    container.appendChild(triggerBtn);

    const modalBackdrop = this.document.createElement('div');
    modalBackdrop.className = 'modal-backdrop fixed inset-0 bg-black/80 hidden z-50 flex items-center justify-center';
    modalBackdrop.setAttribute('role', 'dialog');
    modalBackdrop.setAttribute('aria-modal', 'true');
    modalBackdrop.setAttribute('aria-label', 'Ultron Early Access Request');

    const modalContent = this.document.createElement('div');
    modalContent.className = 'modal-content glass-obsidian p-6 w-full max-w-md';

    const title = this.document.createElement('h2');
    title.textContent = 'Request Research Access';

    const form = this.document.createElement('form');

    const nameInput = this.document.createElement('input');
    nameInput.placeholder = 'Researcher Name';
    nameInput.required = true;

    const emailInput = this.document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Institutional Email';
    emailInput.required = true;

    const orgInput = this.document.createElement('input');
    orgInput.placeholder = 'Organization / Institution';
    orgInput.required = true;

    const domainSelect = this.document.createElement('select');
    ['Genomics & Medicine', 'Materials & Condensed Matter', 'Fusion & Plasma Physics', 'Multimodal ML'].forEach((d) => {
      const opt = this.document.createElement('option');
      opt.value = d;
      opt.textContent = d;
      domainSelect.appendChild(opt);
    });

    const submitBtn = this.document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Generate API Key';

    const closeBtn = this.document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.textContent = 'Close';
    closeBtn.setAttribute('aria-label', 'Close Modal');

    const resultBox = this.document.createElement('div');
    resultBox.className = 'result-box hidden mt-4 p-3 bg-obsidian-800 hairline-all text-xs font-mono';

    const keyDisplay = this.document.createElement('code');
    keyDisplay.className = 'text-emerald-cold block break-all';

    const copyBtn = this.document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = 'Copy Key';
    copyBtn.className = 'mt-2 text-xs text-white/80';

    resultBox.appendChild(keyDisplay);
    resultBox.appendChild(copyBtn);

    form.appendChild(nameInput);
    form.appendChild(emailInput);
    form.appendChild(orgInput);
    form.appendChild(domainSelect);
    form.appendChild(submitBtn);

    modalContent.appendChild(title);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(form);
    modalContent.appendChild(resultBox);
    modalBackdrop.appendChild(modalContent);
    container.appendChild(modalBackdrop);

    const openModal = () => {
      modalBackdrop.classList.remove('hidden');
    };

    const closeModal = () => {
      modalBackdrop.classList.add('hidden');
    };

    triggerBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    this.window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modalBackdrop.classList.contains('hidden')) {
        closeModal();
      }
    });

    const handleSubmit = () => {
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const org = orgInput.value.trim();
      if (!name || !org) {
        return;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email) || email.includes('..')) {
        return;
      }

      // Generate simulated API key: ultron_live_sk_<32hex>
      const hex = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const apiKey = `ultron_live_sk_${hex}`;

      keyDisplay.textContent = apiKey;
      resultBox.classList.remove('hidden');
    };

    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleSubmit();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSubmit();
    });

    copyBtn.addEventListener('click', () => {
      const key = keyDisplay.textContent;
      if (key) {
        this.window.navigator.clipboard.writeText(key);
      }
    });

    return {
      triggerBtn,
      modalBackdrop,
      modalContent,
      nameInput,
      emailInput,
      orgInput,
      domainSelect,
      submitBtn,
      closeBtn,
      resultBox,
      keyDisplay,
      copyBtn,
      openModal,
      closeModal,
      isOpen: () => !modalBackdrop.classList.contains('hidden'),
    };
  }

  /**
   * Mounts synthetic full multi-page application DOM shell
   */
  mountFullApp(container, activeRoute = '/') {
    container.innerHTML = `
      <div class="ultron-app min-h-screen bg-black text-[#f5f5f5] font-sans">
        <header role="banner" class="navbar fixed top-0 w-full glass-obsidian hairline-b z-40">
          <nav role="navigation" aria-label="Main Navigation" class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <a href="/" class="brand-link flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00E599] beacon-emerald"></span>
              <span class="font-mono text-sm tracking-widest uppercase font-bold">ULTRON</span>
            </a>
            <div class="nav-links hidden md:flex items-center space-x-8 text-xs font-mono">
              <a href="/" class="nav-link ${activeRoute === '/' ? 'text-[#00E599]' : 'text-white/70'}">Overview</a>
              <a href="/architecture" class="nav-link ${activeRoute === '/architecture' ? 'text-[#00E599]' : 'text-white/70'}">Architecture</a>
              <a href="/campaigns" class="nav-link ${activeRoute === '/campaigns' ? 'text-[#00E599]' : 'text-white/70'}">Campaigns</a>
              <a href="/domains" class="nav-link ${activeRoute === '/domains' ? 'text-[#00E599]' : 'text-white/70'}">Domains</a>
              <a href="/console" class="nav-link ${activeRoute === '/console' ? 'text-[#00E599]' : 'text-white/70'}">Console</a>
            </div>
            <div class="nav-actions">
              <button class="access-trigger text-xs font-mono px-3 py-1.5 hairline-all hover:bg-white/5">Request Access</button>
            </div>
          </nav>
        </header>

        <main role="main" class="pt-20 pb-16 max-w-7xl mx-auto px-6">
          <div id="page-content" data-route="${activeRoute}"></div>
        </main>

        <footer role="contentinfo" class="hairline-t bg-[#080808] py-8 text-xs font-mono text-white/50">
          <div class="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <span>SHA-256 RIGOR AUDIT VERIFIED</span>
            <span>$3.25 / RUN UNIT COST</span>
          </div>
        </footer>
      </div>
    `;

    const pageContent = container.querySelector('#page-content');
    return { container, pageContent };
  }
}
