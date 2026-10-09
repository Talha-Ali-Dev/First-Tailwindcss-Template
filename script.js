function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown-opener");

  console.log("Dropdown openers found:", dropdowns.length);

  dropdowns.forEach((dropdown) => {
    const targetId = dropdown.dataset.target;
    const targetElement = document.getElementById(targetId);

    let closeTimer;

    if (!targetElement) {
      console.error("Dropdown panel not found:", targetId);
      return;
    }

    const openDropdown = () => {
      clearTimeout(closeTimer);

      document.querySelectorAll(".dropdown-item").forEach((menu) => {
        if (menu !== targetElement) {
          menu.classList.add("hidden");
        }
      });

      targetElement.classList.remove("hidden");
    };

    const scheduleClose = () => {
      clearTimeout(closeTimer);

      closeTimer = setTimeout(() => {
        targetElement.classList.add("hidden");
      }, 200);
    };

    dropdown.addEventListener("mouseenter", openDropdown);
    dropdown.addEventListener("mouseleave", scheduleClose);

    targetElement.addEventListener("mouseenter", openDropdown);
    targetElement.addEventListener("mouseleave", scheduleClose);
  });
}

// mousemove movement
const chatParent = document.querySelector(".chat-copy-parent");
const chatCopy = chatParent?.querySelector(".chat-copy");

if (chatParent && chatCopy) {
  let x = 0,
    y = 0,
    raf = 0;

  const render = () => {
    raf = 0;
    chatCopy.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  const track = (e) => {
    const r = chatParent.getBoundingClientRect();
    x = e.clientX - r.left;
    y = e.clientY - r.top;
  };

  chatParent.addEventListener("pointerenter", (e) => {
    if (e.pointerType !== "mouse") return; // skip touch/pen
    track(e);
    render(); // place it first (no transition on transform)
    chatCopy.style.opacity = "1";
  });

  chatParent.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    track(e);
    if (!raf) raf = requestAnimationFrame(render); // one update per frame
  });

  const hide = () => {
    chatCopy.style.opacity = "0";
  };
  chatParent.addEventListener("pointerleave", hide);
  chatParent.addEventListener("pointercancel", hide);
}

// videos
const videoBtn = document.querySelectorAll(".video-btn");
const videos = document.querySelectorAll(".videos video");

videoBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    const targetVideo = document.getElementById(target);

    videos.forEach((video) => {
      video.classList.add("hidden");
      video.pause();
    });

    targetVideo.classList.remove("hidden");
    targetVideo.play();
  });
});

// for code block

const codeBtns = document.querySelectorAll("#code-btns button");
codeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let codeText = document.querySelector(".code-text");
    let target = btn.dataset.target;
    let targetEl = document.getElementById(target);
    let myCodeContainer = document.querySelectorAll(".code-cont");
    myCodeContainer.forEach((cont) => {
      cont.classList.add("hidden");
    });
    targetEl.classList.remove("hidden");
    codeText.innerText = btn.dataset.value;
    // Restart animation
    codeText.classList.remove("animate-enter");

    void codeText.offsetWidth;

    codeText.classList.add("animate-enter");
  });
});

// For dot matrix
(function () {
  const root = document.getElementById("dm-block");
  const grid = document.getElementById("dm-grid");
  const value = root.dataset.value;

  // 5x7 glyphs
  const G = {
    0: [".###.", "#...#", "#..##", "#.#.#", "##..#", "#...#", ".###."],
    1: ["..#..", ".##..", "..#..", "..#..", "..#..", "..#..", ".###."],
    2: [".###.", "#...#", "....#", "...#.", "..#..", ".#...", "#####"],
    3: ["####.", "....#", "....#", ".###.", "....#", "....#", "####."],
    4: ["...#.", "..##.", ".#.#.", "#..#.", "#####", "...#.", "...#."],
    5: ["#####", "#....", "####.", "....#", "....#", "#...#", ".###."],
    6: ["..##.", ".#...", "#....", "####.", "#...#", "#...#", ".###."],
    7: ["#####", "....#", "...#.", "..#..", ".#...", ".#...", ".#..."],
    8: [".###.", "#...#", "#...#", ".###.", "#...#", "#...#", ".###."],
    9: [".###.", "#...#", "#...#", ".####", "....#", "...#.", ".##.."],
    K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
    M: ["#...#", "##.##", "#.#.#", "#.#.#", "#...#", "#...#", "#...#"],
    B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
    ".": [".....", ".....", ".....", ".....", ".....", ".....", "..#.."],
  };

  const LIT = [
    "#86e0b3",
    "#34d399",
    "#2fc58b",
    "#10b981",
    "#7fd8ae",
    "#34d399",
    "#0a6b4a",
  ];
  const PITCH = 11.7; // px per cell
  const rand = (a) => a[Math.floor(Math.random() * a.length)];

  function build() {
    const w = root.clientWidth,
      h = root.clientHeight;
    const chars = [...value];
    const textCols = chars.length * 6 - 1;
    const cell = Math.min(PITCH, w / (textCols + 6));
    const cols = Math.floor(w / cell),
      rows = Math.floor(h / cell);

    // which cells are lit
    const lit = new Map();
    const c0 = Math.floor((cols - textCols) / 2);
    const r0 = Math.floor((rows - 7) / 2);
    chars.forEach((ch, i) => {
      (G[ch] || G["."]).forEach((line, r) =>
        [...line].forEach((p, c) => {
          if (p === "#") lit.set((r0 + r) * cols + c0 + i * 6 + c, true);
        }),
      );
    });

    grid.style.gridTemplateColumns = `repeat(${cols}, ${cell}px)`;
    grid.style.gridAutoRows = `${cell}px`;

    const frag = document.createDocumentFragment();
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const d = document.createElement("div");
        d.className = "m-px rounded-[3px]";
        if (lit.has(r * cols + c)) {
          d.style.background = rand(LIT);
        } else {
          // dim ambient dots, fading toward the edges
          const dx = (c - cols / 2) / (cols / 2),
            dy = (r - rows / 2) / (rows / 2);
          const fall = Math.max(0, 1 - Math.hypot(dx, dy * 0.9));
          d.style.background = `rgba(255,255,255,${(Math.random() * 0.1 * fall + 0.012).toFixed(3)})`;
        }
        frag.appendChild(d);
      }
    }
    grid.replaceChildren(frag);
  }

  build();
  let t;
  new ResizeObserver(() => {
    clearTimeout(t);
    t = setTimeout(build, 120);
  }).observe(root);
})();

// Resuable Component
function initializeAnimations() {
  const animatedElements = document.querySelectorAll(".animate");

  animatedElements.forEach((element) => {
    const rect = element.getBoundingClientRect();

    const isVisible =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;

    if (isVisible) {
      element.classList.add("show");
    }
  });
}

function loadComponent(selector, file) {
  return fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load ${file}: ${response.status}`);
      }

      return response.text();
    })
    .then((data) => {
      const element = document.querySelector(selector);

      if (!element) {
        throw new Error(`Element ${selector} not found`);
      }

      element.innerHTML = data;
    });
}

window.addEventListener("scroll", initializeAnimations);
window.addEventListener("resize", initializeAnimations);

Promise.all([
  loadComponent("#header", "components/header.html"),
  loadComponent("#footer", "components/footer.html"),
])
  .then(() => {
    initializeDropdowns();
    initializeAnimations();
  })
  .catch((error) => {
    console.error("Component loading failed:", error);
  });
  
