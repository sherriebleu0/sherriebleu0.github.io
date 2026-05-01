function scaleSite() {
	const baseWidth = 1960;
	const scale = window.innerWidth / baseWidth;
	const container = document.getElementById("scale-container-content");
	if (!container) return;
	container.style.transform = `scale(${scale})`;
	container.style.transformOrigin = "top left";
	const containerRect = container.getBoundingClientRect();
	const allDesc = Array.from(container.querySelectorAll("*"));
	let maxBottom = 0;
	allDesc.forEach(el => {
		if (el === container) return;
		if (el.classList && el.classList.contains("hidden")) return;
		const style = getComputedStyle(el);
		if (style.display === "none" || style.visibility === "hidden") return;
		const r = el.getBoundingClientRect();
		if (r.width === 0 && r.height === 0) return;
		const bottomRel = r.bottom - containerRect.top;
		if (bottomRel > maxBottom) maxBottom = bottomRel;
	});
	let unscaledHeight;
	if (maxBottom > 0) {
		unscaledHeight = maxBottom / scale;
	} else {
		unscaledHeight = container.scrollHeight || (containerRect.height / scale);
	}
	const finalHeight = Math.ceil(unscaledHeight * scale);
	container.style.height = finalHeight + "px";
} 
function scaleMenu() {
  const baseHeight = 1160;
  const scale = window.innerHeight / baseHeight;
  const menu = document.getElementById("scale-container-menu");
  if (!menu) return;
  menu.style.transform = `scale(${scale})`;
  menu.style.transformOrigin = "top left";
}
function runScaling() {
  scaleSite();
  scaleMenu();
}
document.addEventListener("DOMContentLoaded", runScaling);
window.addEventListener("resize", runScaling);
window.addEventListener("load", runScaling);


function toggleMenu(){
  document.getElementById("sidebar").classList.toggle("active")
	document.getElementById("close-sidebar").classList.toggle("active");
}


document.querySelectorAll(".card-wrapper").forEach(wrapper => {
  const card = wrapper.querySelector(".card");
  let interval = null;
  card.addEventListener("mouseenter", () => {
    interval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        star.setAttribute("viewBox", "0 0 9.53 9.12");
        star.classList.add("stars");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M6.24 2.81l2.71 0.2c0.26,0.02 0.47,0.19 0.55,0.44 0.08,0.25 -0,0.51 -0.21,0.67l-2.01 1.6 0.65 2.64c0.06,0.25 -0.03,0.51 -0.25,0.66 -0.21,0.15 -0.48,0.15 -0.7,0.01l-2.14 -1.42 -2.31 1.43c-0.22,0.14 -0.49,0.13 -0.7,-0.03 -0.21,-0.16 -0.3,-0.41 -0.23,-0.66l0.69 -2.48 -2.08 -1.75c-0.2,-0.17 -0.27,-0.43 -0.19,-0.67 0.08,-0.25 0.3,-0.41 0.56,-0.42l2.57 -0.11 1.03 -2.52c0.1,-0.24 0.32,-0.39 0.58,-0.39 0.26,0 0.48,0.16 0.57,0.4l0.9 2.41z");
        star.appendChild(path);
        const rect = wrapper.getBoundingClientRect();
        const x = rect.width / 1.75;
        const y = rect.height / 1.75;
        star.style.left = x + "px";
        star.style.top = y + "px";
        const angle = Math.random() * Math.PI * 2;
        const radius = 80 + Math.random() * 120;
        const stretchY = 1 + Math.random() * 1.5;
        const stretchX = 1 + Math.random();
        const moveX = Math.cos(angle) * radius * stretchX;
        const moveY = Math.sin(angle) * radius * stretchY;
        star.style.transform = `translate(0px, 0px) scale(0.5) rotate(0deg)`;
        star.style.opacity = "1";
        wrapper.appendChild(star);
        requestAnimationFrame(() => {
          star.style.transition = "transform 2s ease, opacity 2s linear";
          star.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.2) rotate(360deg)`;
          star.style.opacity = "0";
        });
        setTimeout(() => {
          star.remove();
        }, 2000);
      }
    }, 120);
  });
  card.addEventListener("mouseleave", () => {
    clearInterval(interval);
  });
});
