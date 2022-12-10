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
const scrollNavi = document.querySelectorAll(".scrollNavi li");

let posArr = [];
for (let el of sections) {
  posArr.push(el.offsetTop);
}
// (6) [0, 937, 1227, 1681, 2269, 2632] 아닌디디디디디디디디디

// mobile menu
btnCall.addEventListener("click", (e) => {
  e.preventDefault();

  btnCall.classList.toggle("on");
  gnbMo.classList.toggle("on");
})

// scroll
window.addEventListener("scroll", () => {
  let scroll = window.scrollY || window.pageYOffset;

  // scrollNavi .on, sections .show
  sections.forEach((el, index) => {
    if (scroll >= posArr[index] - 500) {
      scrollNavi.forEach((el, index) => {
        el.classList.remove('on');
      })
      scrollNavi[index].classList.add('on');
      sections[index].classList.add('show');
    }
  })

  // scrollNavi click
  scrollNavi.forEach((el, index) => {
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