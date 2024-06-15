document.querySelector("button").addEventListener("click", searchRequest);
document.querySelector("input").addEventListener("keypress", (e) => {});

async function fetchUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

async function mainPageFetch() {
  const url = `https://api.jikan.moe/v4/top/anime`;
  const data = await fetchUrl(url);
  try {
    createCards(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function createCards(data) {
  const cardWrapper = document.querySelector(".cards");
  cardWrapper.innerHTML = ""; // Clear existing cards
  data.data.filter((item) => {
    let characterCard = document.createElement("section");
    let cardWrapper = document.querySelector(".cards");
    let characterImage = document.createElement("img");
    let vidWrapper = document.createElement("iframe");
    vidWrapper.classList.add("videoWrapper");
    characterImage.src = item.images.jpg.image_url;
    let cardButtons = document.createElement("h3");
    cardButtons.classList.add("cardButtons");

    let characterTitle = document.createElement("h3");

    characterTitle.innerText = item.title;
    let icon = document.createElement("i");
    let plusIcon = document.createElement("i");

    icon.setAttribute("class", "lni lni-play");
    plusIcon.setAttribute("class", "lni lni-circle-plus");

    let charactertitleJapanese = document.createElement("h3");
    charactertitleJapanese.innerText = item.title_japanese;

    if (
      item.rating === "G - All Ages" ||
      (item.rating === "PG-13 - Teens 13 or older" &&
        item.trailer.embed_url != null) // not empty
    ) {
      cardWrapper.appendChild(characterCard);
      characterCard.classList.add("card");

      characterCard.appendChild(characterImage);
      characterCard.appendChild(cardButtons);
      characterCard.appendChild(characterTitle);
      cardButtons.appendChild(icon);
      cardButtons.appendChild(plusIcon);

      characterCard.addEventListener("mouseover", () => {
        imageMouseOver();
      });
      characterCard.addEventListener("mouseleave", () => {
        imageMouseOut();
      });
    }
  });
}

async function searchFetchRequest(choice) {
  let url = `https://api.jikan.moe/v4/anime?q=${choice}`;
  try {
    const data = await fetchUrl(url);
    createCards(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
async function searchRequest() {
  const choice = document.querySelector("input").value;
  if (choice) {
    await searchFetchRequest(choice);
  } else {
    await mainPageFetch();
  }
}

// Initial fetch for main page data
mainPageFetch();

async function addToFavourites(event) {
  const card = event.target.parentElement.parentElement;
  const childElements = card.querySelectorAll("*");
  const innerTexts = Array.from(childElements).map((el) => [
    el.innerText,
    el.src,
    el.title,
  ]);
  if (localStorage.getItem("favourites") === null) {
    localStorage.setItem("favourites", card);
  } else if (localStorage.getItem("favourites").includes(card)) {
    return;
  } else {
    localStorage.setItem(
      "favourites",
      `${localStorage.getItem("favourites")},${card}`
    );
  }
}

async function getFavouritesPage() {
  const cardWrapper = document.querySelector(".cards");
  // let main = document.querySelector("main");
  cardWrapper.innerHTML = "";
  // if (main) {
  //   main.remove();
  // }

  let array = localStorage.getItem("favourites").split(",");
  array.forEach((item) => {
    let card = document.createElement("card");
    card.classList.add("card");
    card.innerHTML = item;
    cardWrapper.appendChild(card);
  });
}
let favouritesLink = document.querySelector(".favourites");
favouritesLink.addEventListener("click", getFavouritesPage);
// let index = 0;

// function imageMouseOver() {
//   if (characterImage) {
//     characterImage.classList.add("hide");
//     vidWrapper.classList.remove("hide");
//     characterCard.appendChild(vidWrapper);
//     characterCard.insertBefore(vidWrapper, cardButtons);
//     cardButtons.appendChild(icon);
//     cardButtons.appendChild(plusIcon);
//     youTubeid = `?controls=0&autoplay=1&mute=0&playlist=${item.trailer.youtube_id}&loop=1`;
//     splitUrl = item.trailer.embed_url.split(`?`)[0].toString();
//     vidWrapper.src = `${splitUrl} ${youTubeid}`; // join youtube string
//     icon.classList.remove("hide");
//     plusIcon.classList.remove("hide");
//     plusIcon.addEventListener("click", addToFavourites);
//   }
// }

// function setTheIntervalForTheVids() {
//   let index = 0;
//   let iframe = document.querySelector("iframe");
//   setInterval(() => {
//     if (data.data[index].trailer.embed_url) {
//       id = `?controls=0&autoplay=1&mute=0&playlist=${data.data[index].trailer.youtube_id}&loop=1`;
//       splitUrl = data.data[index].trailer.embed_url.split(`?`)[0].toString();
//       let movie = `${splitUrl} ${id}`;
//       iframe.src = movie;
//     }
//     index++;
//     if (index > data.data.length) {
//       index = 1;
//     }
//   }, 10000);
// }

// setTheIntervalForTheVids();

// let favouritesLink = document.querySelector(".favourites");
// favouritesLink.addEventListener("click", getFavouritesPage);

// function getFavouritesPage() {
//   let main = document.querySelector("main");
//   cardWrapper.innerHTML = "";
//   if (main) {
//     main.remove();
//   }

//   let array = localStorage.getItem("favourites").split(","); // creates an array from the inner card details using the comma

//   array.forEach((item) => {
//     console.log(item, "html item");
//     let card = document.createElement("card");
//     card.classList.add("card");
//     card.innerHTML = item;
//     cardWrapper.appendChild(card); // create cards in favourites and append the details from the array
//   });
// }

// function addToFavourites(event) {
//   console.log(event.target.parentElement.parentElement);
//   const card = event.target.parentElement.parentElement;
//   //get all the inner text of the card
//   const childElements = card.querySelectorAll("*");
//   const innerTexts = Array.from(childElements).map((el) => [
//     el.innerText,
//     el.src,
//   ]);
//   console.log(innerTexts, "innerTexts");
//   // if (localStorage.getItem("favourites") === null) {
//   // localStorage.setItem("favourites", card);
//   // } else if (localStorage.getItem("favourites").includes(card)) {
//   // return;
//   // } else {
//   // localStorage.setItem(
//   // "favourites",
//   // `${localStorage.getItem("favourites")},${card}`
//   // ); // add the card to the array
//   // }
// }

// function removeFavourites(event) {}

// function imageMouseOut() {
//   // closure
//   if (characterImage) {
//     characterImage.classList.remove("hide");
//     vidWrapper.classList.add("hide");
//     icon.classList.add("hide");
//     plusIcon.classList.add("hide");
//   }
// }

// set the main screen to random vids but only those cards with vids = done
// set each card to play video on card when clicked on but only show cards with videos
//only bring back cards with videos
//wild card search on name
//if not in db display message
// automatically play random vids
// filter out those that don't have working vids
/// on click of image play video in background and then get some stats on the characters.
//translate name to japanese on click
//horizontal scroll to keep things in frame
// refactor everything to a class
