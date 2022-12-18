const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");

const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const api_key = "90b16afc1c9a03f06cb7f099502e292c";
const per_page = 12;

const url = `https://www.flickr.com/services/rest/?method=${method1}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1`;

callData(url);

// 검색 버튼 클릭
btnSearch.addEventListener("click", (e) => {
  e.preventDefault();
  errMsgBlank();
})
// 검색 키보드 엔터 클릭
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    errMsgBlank();
  }
})

// 이미지 클릭시 큰이미지 나타나게
frame.addEventListener("click", (e) => {
  e.preventDefault();

  let target = e.target.closest(".item").querySelector(".thumb");

  if (e.target == target) {
    let imgSrc = target.parentElement.getAttribute("href");

    let pop = document.createElement("aside");
    pop.classList.add("pop");
    pop.innerHTML = `
      <div class="con">
        <img src="${imgSrc}">
      </div>
      <span class="btnClose"><i class="fa-solid fa-xmark"></i></span>
    `

    frame.parentElement.append(pop);
    body.style.overflow = "hidden";
  } else {
    return;
  }
})
// 이미지 닫기
body.addEventListener("click", (e) => {
  let pop = body.querySelector(".pop");

  if (pop) {
    let close = pop.querySelector("span i");
    if (e.target == close) {
      pop.remove();
      body.style.overflow = "auto";
    }
  }
})

// 데이터 불러오기
function callData(url) {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      // console.log(json);
      let items = json.photos.photo;
      // console.log(items);

      if (items.length > 0) {
        createList(items);
        delayLoading();
      } else {
        errMsgNo();
      }
    })

  let errMsgs = frame.parentElement.querySelectorAll("p");
  if (errMsgs.length > 0) frame.parentElement.querySelector("p").remove();

  frame.innerHTML = "";
  frame.classList.remove("on");
  loading.classList.remove("off");
}

// 검색결과 없을 때 에러메세지
function errMsgNo() {
  loading.classList.add("off");
  frame.innerHTML = "";
  frame.classList.remove("on");
  frame.style.height = "auto";

  const errMsgs = frame.parentElement.querySelectorAll("p");
  if (errMsgs.length > 0) frame.parentElement.querySelector("p").remove();

  const errMsg = document.createElement("p");
  errMsg.classList.add("errMsg");
  errMsg.innerText = "검색하신 이미지의 데이터가 없습니다.";
  frame.parentElement.append(errMsg);
}
// 검색창 빈칸일때 에러메세지
function errMsgBlank() {
  let tag = input.value;
  tag = tag.trim();
  input.value = "";

  const url = `https://www.flickr.com/services/rest/?method=${method2}&api_key=${api_key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

  if (tag != "") {
    callData(url);
  } else {
    loading.classList.add("off");
    frame.innerHTML = "";
    frame.classList.remove("on");
    frame.style.height = "auto";

    const errMsgs = frame.parentElement.querySelectorAll("p");
    if (errMsgs.length > 0) frame.parentElement.querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.classList.add("errMsg");
    errMsg.innerText = "검색어를 입력하지 않았습니다. 검색어를 입력하세요.";

    frame.parentElement.append(errMsg);
  }
}

// 이미지 리스트 만들기
function createList(items) {
  let htmls = "";

  items.map((el) => {

    let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
    let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

    htmls += `
      <li class="item">
        <div>
          <a href="${imgSrcBig}">
            <img src="${imgSrc}" class="thumb">
          </a>
          <span>
            <p>${el.title}</p>
            <img src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg" class="profile">
            <strong>${el.owner}</strong>
          </span>
        </div>
      </li>
    `;
  })
  frame.innerHTML = htmls;
}

// 로딩후 이미지 나타나게
function delayLoading() {
  const imgs = frame.querySelectorAll("img");
  const len = imgs.length;
  let count = 0;

  for (let el of imgs) {
    el.onload = () => {
      count++;
      if (count == len) {
        isoLayout();
      }
    }

    // 이미지 대체 이미지 
    el.onerror = (e) => {
      e.currentTarget.setAttribute("src", "img/k1.jpg");
    }
    // 프로필 대체 이미지
    let profile = el.closest(".item").querySelector(".profile");
    profile.onerror = (e) => {
      e.currentTarget.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    }
  }
}
// Isotope 플러그인 적용
function isoLayout() {
  loading.classList.add("off");
  frame.classList.add("on");

  new Isotope("#list", {
    itemSelection: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s",
  })
}