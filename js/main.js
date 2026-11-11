const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");
const navigationLinks = navigation?.querySelectorAll("a");

function closeNavigation() {
  if (!menuToggle || !navigation) {
    return;
  }

  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

menuToggle?.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  navigation?.classList.toggle("is-open", !isExpanded);
});

navigationLinks?.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    closeNavigation();
    menuToggle?.focus();
  }
});

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectStatus = document.querySelector("#project-status");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle("is-active", isSelected);
      filterButton.setAttribute("aria-pressed", String(isSelected));
    });

    projectCards.forEach((card) => {
      const isVisible = filter === "all" || card.dataset.category === filter;
      card.hidden = !isVisible;
      visibleCount += Number(isVisible);
    });

    if (projectStatus) {
      projectStatus.textContent = `${visibleCount} ${visibleCount === 1 ? "project" : "projects"} shown.`;
    }
  });
});

const copyEmailButton = document.querySelector(".copy-email");

async function copyEmailAddress() {
  const email = copyEmailButton?.dataset.email;
  if (!email) {
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
    const originalText = copyEmailButton.textContent;
    copyEmailButton.textContent = "Copied!";
    copyEmailButton.setAttribute("aria-label", `Copied email address ${email}`);

    setTimeout(() => {
      copyEmailButton.textContent = originalText;
      copyEmailButton.setAttribute("aria-label", "Copy email address");
    }, 1800);
  } catch (error) {
    copyEmailButton.textContent = "Copy failed";
    copyEmailButton.setAttribute("aria-label", "Copy email address failed");
  }
}

copyEmailButton?.addEventListener("click", copyEmailAddress);

const currentYear = document.querySelector("#current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}
