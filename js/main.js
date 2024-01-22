let section = document.querySelectorAll("section");
let navList = document.querySelectorAll("header nav a");
console.log(section);
console.log(navList);
// scroll section
window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY;
    // console.log(top);
    let offset = sec.offsetTop - 100;
    // console.log(offset);
    let height = sec.offsetHeight;
    // console.log(height);
    let id = sec.getAttribute("id");
    // console.log(id);
    if (top >= offset && top < offset + height) {
      navList.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  let header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // remove toggle icon and novbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x")
  navbar.classList.remove("active")
};

// navbar icon
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
