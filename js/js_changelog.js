// js_changelog.js

// Load changelog data from external JSON file
async function loadChangelog() {
  try {
    const response = await fetch("assets/data/changelog.json"); // adjust path if needed
    const data = await response.json();
    renderChangelog(data.changelog);
    animateChangelog();
  } catch (error) {
    console.error("Error loading changelog:", error);
  }
}

// Render changelog items into the timeline
function renderChangelog(items) {
  const timeline = document.querySelector(".timeline");
  timeline.innerHTML = "";

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.classList.add("timeline-item", index % 2 === 0 ? "left" : "right");

    article.innerHTML = `
      <div class="content">
        <time datetime="${item.date}">
          ${new Date(item.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
          })}
        </time>
        <h2>${item.title}</h2>
        <p>${item.description}</p>
      </div>
    `;

    timeline.appendChild(article);
  });
}

// Simple fade-in animation for each item
function animateChangelog() {
  const items = document.querySelectorAll(".timeline-item");
  items.forEach((item, i) => {
    item.style.opacity = 0;
    setTimeout(() => {
      item.style.transition = "opacity 0.6s ease-in-out";
      item.style.opacity = 1;
    }, i * 200);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", loadChangelog);
