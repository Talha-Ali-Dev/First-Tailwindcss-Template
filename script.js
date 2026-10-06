let dropdowns = document.querySelectorAll(".dropdown-opener");

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("mouseenter", () => {
    let target = dropdown.dataset.target;
    let targetElement = document.getElementById(target);

    targetElement.classList.remove("hidden");
  });

  dropdown.addEventListener("mouseleave", () => {
    let target = dropdown.dataset.target;
    let targetElement = document.getElementById(target);

    targetElement.classList.add("hidden");
  });
});

// mousemove movement
const chatCopy = document.querySelector(".chat-copy");
const chatCopyParent = document.querySelector(".chat-copy-parent");

chatCopyParent.addEventListener("mouseenter", (e) => {
  chatCopy.style.opacity = "1";
  chatCopy.style.top = e.clientY + "px";
  chatCopy.style.left = e.clientX + "px";
});

chatCopyParent.addEventListener("mouseleave", () => {
  chatCopy.style.opacity = "0";
});

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
