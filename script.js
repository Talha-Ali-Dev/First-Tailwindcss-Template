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

const chatCopy = document.querySelector(".chat-copy");
const chatCopyParent = document.querySelector(".chat-copy-parent");

chatCopyParent.addEventListener("mouseenter", (e) => {
  chatCopy.style.opacity = "1";
  chatCopy.style.top = e.clientY + 'px';
  chatCopy.style.left = e.clientX + 'px';
});

chatCopyParent.addEventListener("mouseleave", () => {
  chatCopy.style.opacity = "0";
});
