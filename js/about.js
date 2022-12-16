const btns = document.querySelectorAll(".team span a");
const teams = document.querySelectorAll(".team ul");

btns.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    activation(btns, index);
    activation(teams, index);
  })
})

function activation(arr, index) {
  for (let el of arr) el.classList.remove("on");
  arr[index].classList.add("on");
}