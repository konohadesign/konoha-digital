"use strict";

console.log("Script Loaded");

window.Webflow ||= [];
window.Webflow.push(() => {
  //Service Overview Section
  console.log("Service Overview Section Initialized");

  document.getElementById("tabsList").onmousemove = (e) => {
    console.log("Mousemove event triggered on #tabsList");

    for (const card of document.getElementsByClassName("tab-link")) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

      console.log("Coordinates on card:", card, "x:", x, "y:", y);

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  console.log("Service Overview Section Attached Event Listener");
  //Testimonial Section (Infinite Scroll)
  document.addEventListener("DOMContentLoaded", function () {
    const scrollers = document.querySelectorAll(".infinite-scroller");

    scrollers.forEach((scroller) => {
      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);
      let totalWidth = 0;

      // Clone and prepend items
      scrollerContent
        .slice()
        .reverse()
        .forEach((item) => {
          const clone = item.cloneNode(true);
          clone.setAttribute("aria-hidden", "true");
          scrollerInner.prepend(clone);
          totalWidth +=
            item.offsetWidth +
            parseFloat(getComputedStyle(item).marginLeft) +
            parseFloat(getComputedStyle(item).marginRight);
        });

      // Clone and append items
      scrollerContent.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        scrollerInner.appendChild(clone);
      });

      // Initial scroll position set to the first clone
      scroller.scrollLeft = totalWidth;
    });
  });
});
