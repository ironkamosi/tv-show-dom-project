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
  let episodeContainer = document.createElement("div");
  episodeContainer.style.display = "block"; // dis
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

// displays the episodes onto the entire page
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

// counter function display

function counterDisplay(numberOfEpisodes) { // counter for number of episode found in search
  let counterDisplay = document.createElement("div");
  counterDisplay.setAttribute("id", "counterDisplayID");
  counterDisplay.innerText = "hola, Juan"
  //`number of episodes found ${}`
}

// input search bar
function searchKeyWords() {
  let episodeList = getAllEpisodes();
  let inputBox = document.createElement("input");
  inputBox.setAttribute("id", "inputBoxId");
  inputBox.setAttribute("placeHolder", "type and search for episode");
  inputBox.style.width = "25em";
  inputBox.style.backgroundColor = "#f5f5f5";

  rootElem.appendChild(inputBox);

  inputBox.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase(); // gets search string from input
    let episodeContainers = document.getElementsByClassName(
      "episodeContainerClassName"
    ); // An array of episode container
    let episodeIndex = 0; // this allows us to access each episode counter

    //console.log(episodeContainers);
    let episodeCounter = 0; // this is the number of episodes that match the key word search string

    //console.log(episodeContainers,"hello")
    episodeList.forEach((episode) => {
      if (
        episode.name.toLowerCase().includes(searchString) ||
        episode.summary.toLowerCase().includes(searchString)
      ) {
        episodeCounter += 1;
        episodeContainers[episodeIndex].style.display = "";
      } else {
        episodeContainers[episodeIndex].style.display = "none";
      }
      episodeIndex++; // This increments
    });
    counterDisplay(episodeCounter);
    console.log(episodeCounter);
    console.log(episodeIndex)
  });

  /*
filter key terms 
hide elements 
add a condition when there is "" then all episodes are displayed
*/

  // inputBox.addEventListener('keyup', (event) => {
  //   const searchString = event.target.value.toLowerCase();
  //   const filteredCharacters = episodeList.filter((episode) => {
  //     return (
  //       episode.name.toLowerCase().includes(searchString) ||
  //       episode.summary.toLowerCase().includes(searchString)
  //     );

  //   });
  // });
}
searchKeyWords();
window.onload = setup;

/* 
pre task - t
create function - create elements for search bar / access div's from html
create a loop with a condition 
modify the dom each time you are checking 
*/

/* Task 2- level 200
Add Search#
Add a "live" search input:
Only episodes whose summary OR name contains the search term should be displayed
The search should be case-insensitive
The display should update immediately after each keystroke changes the input.
Display how many episodes match the current search
If the search box is cleared, all episodes should be shown.
If you have been fetching the episode data from the API, be careful not 
to cause many frequent requests with this search feature. 
The search should look through an in-memory copy of the episode list. 
Do not fetch the data again each time something is typed!
*/

/*
pre task - create one card 
Java Script gather the elements for the the episode 
- name of episode, season (number), episode (number), image(medium), summary(p)
- create background 
html 
- create divs for each element.
*/
