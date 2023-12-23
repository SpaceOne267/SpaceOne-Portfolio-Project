"use strict";

// mouse follower event
const mouseF = document.getElementById("mouse_follower");
const mouseFmin = document.getElementById("mouse_follower_min");
const sections = document.querySelectorAll("#main section");
const navLinks = document.querySelectorAll("#menu ul li a");
const navLinksF = document.querySelectorAll("#footer .menu a");

let activeS = 0;
let scrollE = sections[0];
function navHandler(arr) {
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    el.addEventListener("click", (e) => {
      scrollE = sections[i];
      let scrY = 0;
      if (i != 0) {
        scrY =
          scrollE.offsetTop - (window.innerHeight - scrollE.clientHeight) / 3;
        window.scrollTo(0, scrY);
      } else {
        window.scrollTo(0, 0);
      }
    });
  }
}
navHandler(navLinks);
navHandler(navLinksF);
// mouse
window.addEventListener("mousemove", (e) => {
  const tgt = e.target;
  const computed = window.getComputedStyle(tgt)["cursor"];
  let posX = e.clientX;
  let posY = e.clientY;
  mouseFmin.style.transform = "translate(" + posX + "px," + posY + "px)";
  if (computed == "pointer") {
    mouseF.style.transform =
      "translate(" + posX + "px," + posY + "px) scale(0.5)";
  } else {
    mouseF.style.transform = "translate(" + posX + "px," + posY + "px)";
  }
});
window.addEventListener("scroll", (e) => {
  //   navLine
  let wh = window.innerHeight;
  let sy = window.scrollY;
  // sections scroll aniamtion
  for (let i = 0; i < sections.length; i++) {
    const el = sections[i];
    let elTop = el.offsetTop;
    if (sy + wh / 2 > elTop) {
      el.classList.add("active_section");
      activeS = i;
    } else {
      el.classList.remove("active_section");
    }
    if (sy + wh / 2 > elTop) {
      activeS = i;
    }
  }
});
window.addEventListener("scrollend", (e) => {
  let wh = window.innerHeight;
  let sy = window.scrollY;
  const navLine = document.getElementById("navLine");
  navLine.style.height = wh / 2 + sy + "px";
  // nav Activing
  for (let i = 0; i < navLinks.length; i++) {
    const el = navLinks[i];
    el.classList.remove("active");
  }
  navLinks[activeS].classList.add("active");
});
