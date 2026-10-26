document.querySelectorAll(".menu-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const nav = document.querySelector(".nav-links");
    const open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", String(open));
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("open");
    button.setAttribute("aria-expanded", String(item.classList.contains("open")));
    const mark = button.querySelector(".faq-mark");
    if (mark) mark.textContent = item.classList.contains("open") ? "−" : "+";
  });
});

// 图片轮播功能
document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".slide"));
  const dotsWrap = carousel.querySelector(".hero-dots");
  if (slides.length < 2) return;
  let current = 0;
  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "切换到第 " + (index + 1) + " 张图片");
    dot.addEventListener("click", () => show(index));
    dotsWrap.appendChild(dot);
    return dot;
  });
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.style.opacity = i === current ? "1" : "0";
      slide.style.pointerEvents = i === current ? "auto" : "none";
    });
    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }
  slides.forEach((slide) => {
    slide.style.position = "absolute";
    slide.style.inset = "0";
    slide.style.transition = "opacity .8s ease";
  });
  show(0);
  window.setInterval(() => show(current + 1), Number(carousel.dataset.interval || 4000));
});

// 自动隐藏图片占位符
document.querySelectorAll("img[data-local-image]").forEach((img) => {
  const placeholder = img.parentElement.querySelector(".image-placeholder");
  img.addEventListener("load", () => { if (placeholder) placeholder.hidden = true; });
  img.addEventListener("error", () => { if (placeholder) placeholder.hidden = false; });
  if (img.complete && img.naturalWidth > 0 && placeholder) placeholder.hidden = true;
});