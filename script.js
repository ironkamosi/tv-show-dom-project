//You can edit ALL of the code here
// global variables


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
  episodeContainer.style.backgroundColor = "#f5f5dc";
  episodeContainer.style.padding = "2em";
  episodeContainer.style.width = "30%";
  episodeContainer.style.margin = "2em";

  let title = document.createElement("h2");
  title.style.textAlign = "center";
  title.innerHTML = `${element.name}: S${formatSeasonNum(
    element.season
  )}E${formatSeasonNum(element.number)}`;

  let img = document.createElement("img");
  img.style.margin = "0 auto";
  img.style.width = "99%";
  // img.style.paddingLeft = "2em";
  // img.style.paddingRight = "2em";
  img.src = element.image.medium;

  let summary = document.createElement("p");
  summary.style.texAlign = "center";
  summary.innerHTML = `${element.summary}`;

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
  // styleContainer.style.width = "100%";
  // styleContainer.style.flexWrap = "wrap";

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
  footer()
}
const rootElem = document.getElementById("root");

window.onload = setup;



/*
pre task - create one card 

Java Script gather the elements for the the episode 
- name of episode, season (number), episode (number), image(medium), summary(p)
- create background 
html 
- create divs for each element.

*/

/*
Minimal features#
All episodes must be shown
For each episode, AT LEAST following must be displayed:
the episode's name
the season number
the episode number
the episode's medium-sized image
the episode's summary text
You should combine season number and episode number into an episode code:
Each part should be zero-padded to two digits.
Example: S02E07 would be the code for the 7th episode of the 2nd season. S2E7 would be incorrect.
Your page should state somewhere that the data has (originally) come from TVMaze.com, 
and link back to that site (or the specific episode on that site). See tvmaze.com/api#licensing.
*/
