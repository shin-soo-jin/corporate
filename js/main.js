var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const btnCall = document.querySelector(".btnCall");
const gnbMo = document.querySelector("#gnbMo");

btnCall.onclick = function (e) {
  e.preventDefault();

  btnCall.classList.toggle("on");
  gnbMo.classList.toggle("on");
}