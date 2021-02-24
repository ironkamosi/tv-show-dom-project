//You can edit ALL of the code here
// global variables
const rootElem = document.getElementById("root");



// window onload set up
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// formats the number for the season data
function formatSeasonNum(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

/* 
turnery operation version 
function formatSeasonNum(num) {
  return (num < 10) ?  "0" + num : num;
  
}
 */
// displays a single episode
function singleEpisode(element) {
  let container = document.getElementsByClassName("episodeContainerClassName");
  if (container) {
    container.innerHTML = "";
  }
  let episodeContainer = document.createElement("div");
  episodeContainer.className = "episodeContainerClassName";
  episodeContainer.style.backgroundColor = "#f5f5dc";
  episodeContainer.style.padding = "1.5em";
  episodeContainer.style.width = "20rem";
  episodeContainer.style.margin = "1.5em";

  let title = document.createElement("h2");
  title.style.textAlign = "center";
  title.innerHTML = `${element.name}: S${formatSeasonNum(
    element.season
  )}E${formatSeasonNum(element.number)}`;
  title.className = "title";

  let img = document.createElement("img");
  img.style.margin = "0 auto";
  img.style.width = "99%";
  // img.style.paddingLeft = "2em";
  // img.style.paddingRight = "2em";
  img.src = element.image.medium;

  let summary = document.createElement("p");
  summary.style.texAlign = "center";
  summary.innerHTML = `${element.summary}`;
  summary.className = "summary";
  episodeContainer.appendChild(title);
  episodeContainer.appendChild(img);
  episodeContainer.appendChild(summary);
  rootElem.appendChild(episodeContainer);
  return episodeContainer;
}

// display multiple episodes + loops the data
function displayEpisodes(elements) {
  
  let styleContainer = document.createElement("div");
  styleContainer.className = "style-container";
  styleContainer.style.width = "98%";
  styleContainer.style.flexWrap = "wrap";
  styleContainer.style.margin = "0 auto";

  elements.forEach((element) => {
    styleContainer.appendChild(singleEpisode(element));
  });
  rootElem.appendChild(styleContainer);
}

function makePageForEpisodes(episodeList) {
  displayEpisodes(episodeList);
  // const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  function footer() {
    let footer = document.createElement("footer");
    footer.innerHTML = "<p>https://tvmaze.com/</p>";
    rootElem.appendChild(footer);
  }
  footer();
}
          
function searchKeyWords() {
  
  let inputBox = document.createElement("input"); // text box
  inputBox.setAttribute("id", "inputBoxId");
  inputBox.setAttribute("placeHolder", "type and search for episode");
  inputBox.style.width = "25em";
  inputBox.style.backgroundColor = "#f5f5f5";
  rootElem.appendChild(inputBox);

  inputBox.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase();
    if (searchString.trim() === "") {
      displayEpisodes(getAllEpisodes());
    } else {
     const searchResults = getAllEpisodes().filter((episode) => {
       return (
         episode.name.toLowerCase().includes(searchString) ||
         episode.summary.toLowerCase().includes(searchString)
       );
     });
      displayEpisodes(searchResults); 
    }
  });
}




searchKeyWords();
window.onload = setup;

