// Swiper
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const btnCall = document.querySelector(".btnCall");
const gnbMo = document.querySelector("#gnbMo");

const sections = document.querySelectorAll(".section");
const scrollNavi = document.querySelector(".scrollNavi");
const scrollNavis = scrollNavi.querySelectorAll("li");
const base = -500;

let posArr = [];
for (let el of sections) {
  posArr.push(el.offsetTop);
}

// mobile menu
btnCall.addEventListener("click", (e) => {
  e.preventDefault();

  btnCall.classList.toggle("on");
  gnbMo.classList.toggle("on");
})

// scroll
window.addEventListener("scroll", () => {
  let scroll = window.scrollY || window.pageYOffset;

  // scrollNavi opacity
  if (scroll >= posArr[0] + base) { scrollNavi.style.opacity = "1" } else {
    scrollNavi.style.opacity = "0"
  }

  // scrollNavis .on, sections .show
  sections.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      scrollNavis.forEach((el, index) => {
        el.classList.remove('on');
      })
      scrollNavis[index].classList.add('on');
      sections[index].classList.add('show');
    }
  })

  // scrollNavis click
  scrollNavis.forEach((el, index) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();

      new Anim(window, {
        prop: 'scroll',
        value: posArr[index],
        duration: 500,
      })
    })
  })
})