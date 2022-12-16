const vidList = document.querySelector(".vidList");
const key = "AIzaSyCaXRXk4IImstZdfY92MFZLzPLaz0VxlRc";
const playlistId = "PL5lm99t4rEC4v0vphLBO7rm2f9mR_nMeY";
const num = 12;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    let items = json.items;
    console.log(items);

    let result = "";

    items.map((el) => {

      let title = el.snippet.title;
      if (title.length > 30) {
        title = title.substr(0, 30) + "...";
      }

      let con = el.snippet.description;
      if (con.length > 100) {
        con = con.substr(0, 25) + "...";
      }

      let owner = el.snippet.videoOwnerChannelTitle;

      result += `
        <article>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.maxres.url}">
          </a>
          <div class="text">
            <h2>${title}</h2>
            <span>${owner}</span>
            <em>${con}</em>
          </div>
        </article>
      `;
    })

    vidList.innerHTML = result;
  })

vidList.addEventListener("click", (e) => {
  e.preventDefault();

  const vidId = e.target.closest("a").getAttribute("href");

  let pop = document.createElement("aside");
  pop.classList.add("pop");
  pop.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
    <span class="btnClose"><i class="fa-solid fa-xmark"></i></span>
  `;

  vidList.append(pop);
})

vidList.addEventListener("click", (e) => {
  const pop = vidList.querySelector(".pop");

  if (pop) {
    const close = pop.querySelector("span i");

    if (e.target == close) pop.remove();
  }
})