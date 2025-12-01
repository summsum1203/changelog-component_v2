document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".changelog-toggle");

  toggles.forEach((btn) => {
    const panelId = btn.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    // Initialize collapsed state
    btn.setAttribute("aria-expanded", "false");
    panel.classList.remove("open");
    panel.style.maxHeight = "0px";

    // Click and keyboard activation
    btn.addEventListener("click", () => togglePanel(btn, panel));
    btn.addEventListener("keydown", (e) => {
      // Enter or Space toggles; preserve native button behavior
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePanel(btn, panel);
      }
    });
  });

  function togglePanel(btn, panel) {
    const isOpen = btn.getAttribute("aria-expanded") === "true";

    if (isOpen) {
      // Collapse
      btn.setAttribute("aria-expanded", "false");
      panel.style.maxHeight = panel.scrollHeight + "px"; // set current to enable transition
      // next frame: animate to 0
      requestAnimationFrame(() => {
        panel.classList.remove("open");
        panel.style.maxHeight = "0px";
      });
    } else {
      // Expand
      btn.setAttribute("aria-expanded", "true");
      panel.classList.add("open");
      // Set to content height for smooth transition
      panel.style.maxHeight = panel.scrollHeight + "px";
      // After transition, remove inline height to allow responsive changes
      panel.addEventListener(
        "transitionend",
        function onEnd(ev) {
          if (ev.propertyName === "max-height" && btn.getAttribute("aria-expanded") === "true") {
            panel.style.maxHeight = "none";
          }
          panel.removeEventListener("transitionend", onEnd);
        }
      );
    }
  }
});
