"use strict";

console.log("Script Loaded");

window.Webflow ||= [];
window.Webflow.push(() => {
  //Service Overview Section
  console.log("Service Overview Section Initialized");

  const tabsIds = ["tabsList", "tabsPanels"];

  tabsIds.forEach((tabsId) => {
    const tabsElement = document.getElementById(tabsId);
    if (tabsElement) {
      tabsElement.onmousemove = (e) => {
        for (const card of document.getElementsByClassName("card")) {
          const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      };
    }
  });
  console.log("Service Overview Section Attached Event Listener");

  //Selected Works Section Hover Effect
  document.querySelectorAll(".sw_s-cl-item").forEach((item) => {
    const imgWrapper = item.querySelector(".sw_preview-img-wrapper");
    const preview = item.querySelector(".sw_preview");

    // Function to update image position smoothly and center it on the cursor
    const updateImagePosition = (e) => {
      const itemRect = item.getBoundingClientRect();
      // Calculate the center position of the .sw_preview element relative to the cursor
      const centerX = e.clientX - itemRect.left - preview.offsetWidth / 2;
      const centerY = e.clientY - itemRect.top - preview.offsetHeight / 2;

      // Use GSAP to smoothly update the position of the .sw_preview element
      gsap.to(preview, { x: centerX, y: centerY, duration: 0.1 });
    };

    // Mouse enter event
    item.addEventListener("mouseenter", (e) => {
      updateImagePosition(e);
      gsap.to(imgWrapper, { scale: 1, duration: 0.3, ease: "power1.out" });
    });

    // Mouse move event
    item.addEventListener("mousemove", updateImagePosition);

    // Mouse leave event
    item.addEventListener("mouseleave", () => {
      gsap.to(imgWrapper, { scale: 0, duration: 0.3, ease: "power1.in" });
    });
  });

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
