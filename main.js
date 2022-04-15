let button = document.querySelector("button");
button.addEventListener("click", searchRequest);

function mainPageFetch() {
  fetch(`https://api.jikan.moe/v4/top/anime`)
    .then((response) => response.json())
    .then((data) => {
      searchDetails(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

mainPageFetch();

function searchRequest() {
  let choice = document.querySelector("input").value;
  fetch(`https://api.jikan.moe/v4/anime?q=${choice}`)
    .then((response) => response.json())
    .then((data) => {
      if (choice === "") {
        return;
      } else {
        searchDetails(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function searchDetails(data) {
  let cardWrapper = document.querySelector(".cards");

  // let reducedData = data.data.splice(0, 10);
  cardWrapper.innerHTML = "";
  data.data.filter((item) => {
    let characterCard = document.createElement("section");

    let characterImage = document.createElement("img");

    characterImage.src = item.images.jpg.image_url;
    let characterTitle = document.createElement("h3");
    characterTitle.innerText = item.title;
    let translate = document.createElement("button");
    translate.innerText = "Translate to Japanese";

    let charactertitleJapanese = document.createElement("h3");
    charactertitleJapanese.innerText = item.title_japanese;
    if (
      item.rating === "G - All Ages" ||
      item.rating === "PG-13 - Teens 13 or older"
    ) {
      characterCard.classList.add("card");

      // characterCard.appendChild(characterImage)
      characterCard.appendChild(characterImage);
      characterCard.appendChild(characterTitle);
      characterCard.appendChild(translate);
      characterCard.appendChild(charactertitleJapanese);
      charactertitleJapanese.classList.add("hide");
      cardWrapper.appendChild(characterCard);
      translate.addEventListener("click", () => {
        charactertitleJapanese.classList.remove("hide");
      });
      characterCard.addEventListener("click", () => {
        //set video as bacground

        let iframe = document.querySelector("iframe");

        iframe.src = ``;

        if (item.trailer.embed_url != null) {
          // let splitUrl= item.trailer.embed_url.split(`?`)[0].toString()
          let id = `?controls=0&autoplay=1&mute=0&playlist=${item.trailer.youtube_id}&loop=1`;
          let splitUrl = item.trailer.embed_url.split(`?`)[0].toString();
          iframe.src = `${splitUrl} ${id}`;
        } else {
          let main = document.querySelector("main");
          main.style.backgroundImage = `url(${item.images.jpg.large_image_url})`;
        }
      });
    }
  });
}

//wild card search on name
//if not in db display message
// automatically play random vids
// filter out those that don't have working vids
/// on click of image play video in background and then get some stats on the characters.
//translate name to japanese on click
//horizontal scroll to keep things in frame
