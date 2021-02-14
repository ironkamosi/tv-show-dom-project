//You can edit ALL of the code here
// global variables


// window onload set up
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

// displays a single episode
function singleEpisode(element) {
  let episodeContainer = document.createElement("div");
  let img = document.createElement("img");
  img.src = element.image.medium
  let paragraph = document.createElement("p");
  let paragraphSummary = document.createElement("p");
  paragraph.innerHTML = `S${element.season} Number${element.number}`;
  paragraphSummary.innerHTML = `${element.summary}`;
  
  episodeContainer.appendChild(img);
  episodeContainer.appendChild(paragraph);
  episodeContainer.appendChild(paragraphSummary);
  rootElem.appendChild(episodeContainer)
}

// display multiple episodes + loops the data
function displayEpisodes(element) {
  singleEpisode(element[0]);
  // element.forEach((element) => {
  //   `${element.name} ${element.season}`
  // });
}

function makePageForEpisodes(episodeList) {
  displayEpisodes(episodeList)
  // const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
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
