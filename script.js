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