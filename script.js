//You can edit ALL of the code here

// tv input selector 

function tvShowDropDown (episodeList){
  let select = document.createElement("select");
  select.setAttribute("id", "select");

  let option = document.createElement("option");
  option.innerText = "All episodes";
  select.appendChild(option);

  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `${episode.name}: S${formatSeasonNum(
      episode.season
    )}E${formatSeasonNum(episode.number)}`;
    select.appendChild(option);
  });

  select.addEventListener("change", function (event) {
    let episodeContainers = document.getElementsByClassName(
      "episode-container-class-name"
    ); // An array of episode container
    //let navBarContainer = document.getElementById("navBarContainer");
    let episodeIndex = 0;
    let episodeCounter = 0;
    if (event.target.options[event.target.selectedIndex].index === 0) {
      // refers to the all episode option
      episodeList.forEach(() => {
        episodeCounter = episodeList.length;
        episodeContainers[episodeIndex].style.display = "";
        episodeIndex++; // This increments});
      });
    } else {
      episodeList.forEach(() => {
        if (
          episodeIndex ===
          event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index
        ) {
          showEpisode(episodeContainers[episodeIndex]); //.style.display = "";
        } else {
          hideEpisode(episodeContainers[episodeIndex]); //.style.display = "none";
        }
        episodeIndex++; // This increments});
      });
      episodeCounter = 1;
    }
    updateCounter(episodeCounter, episodeList.length);
  });
  return select;
};





function addFooter () {
  const rootElem = document.getElementById("root");
  let footer = document.createElement("footer");
  footer.innerHTML = "<p>https://tvmaze.com/</p>";
  rootElem.appendChild(footer);
};

const hideEpisode = (episode) => {
  episode.style.display = "none";
};

const showEpisode = (episode) => {
  episode.style.display = "";
};

// formats the number for the season data
function formatSeasonNum(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

// displays a single episode
function addSingleEpisode(episode) {
  let episodeContainer = document.createElement("div");
  episodeContainer.style.display = "block"; // dis
  episodeContainer.className = "episode-container-class-name";
  episodeContainer.style.backgroundColor = "#f5f5dc";
  episodeContainer.style.padding = "1.5em";
  episodeContainer.style.width = "20rem";
  episodeContainer.style.margin = "1.5em";

  let title = document.createElement("h2");
  title.style.textAlign = "center";
  title.innerHTML = `${episode.name}: S${formatSeasonNum(
    episode.season
  )}E${formatSeasonNum(episode.number)}`;
  title.className = "title";

  let img = document.createElement("img");
  img.style.margin = "0 auto";
  img.style.width = "99%";
  // img.style.paddingLeft = "2em";
  // img.style.paddingRight = "2em";
  img.src = episode.image.medium;

  let summary = document.createElement("p");
  summary.style.texAlign = "center";
  summary.innerHTML = `${episode.summary}`;
  summary.className = "summary";
  episodeContainer.appendChild(title);
  episodeContainer.appendChild(img);
  episodeContainer.appendChild(summary);
  //rootElem.appendChild(episodeContainer);
  return episodeContainer;
}

const addAllEpisodes = (episodeList) => {
  const rootElem = document.getElementById("root");
  let styleContainer = document.createElement("div");
  styleContainer.className = "style-container";
  styleContainer.style.width = "98%";
  styleContainer.style.flexWrap = "wrap";
  styleContainer.style.margin = "0 auto";

  episodeList.forEach((episode) => {
    styleContainer.appendChild(addSingleEpisode(episode));
  });
  rootElem.appendChild(styleContainer);
};

const addDropDownMenu = (episodeList) => {
  let select = document.createElement("select");
  select.setAttribute("id", "select");

  let option = document.createElement("option");
  option.innerText = "All episodes";
  select.appendChild(option);

  episodeList.forEach((episode) => {
    let option = document.createElement("option");
    option.innerHTML = `${episode.name}: S${formatSeasonNum(
      episode.season
    )}E${formatSeasonNum(episode.number)}`;
    select.appendChild(option);
  });

  select.addEventListener("change", function (event) {
    let episodeContainers = document.getElementsByClassName(
      "episode-container-class-name"
    ); // An array of episode container
    //let navBarContainer = document.getElementById("navBarContainer");
    let episodeIndex = 0;
    let episodeCounter = 0;
    if (event.target.options[event.target.selectedIndex].index === 0) { // refers to the all episode option
      episodeList.forEach(() => {
        episodeCounter = episodeList.length;
        episodeContainers[episodeIndex].style.display = "";
        episodeIndex++; // This increments});
      });
    } else {
      episodeList.forEach(() => {
        if (
          episodeIndex ===
          event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index 
        ) {
          showEpisode(episodeContainers[episodeIndex]); //.style.display = "";
        } else {
          hideEpisode(episodeContainers[episodeIndex]); //.style.display = "none";
        }
        episodeIndex++; // This increments});
      });
      episodeCounter = 1;
    }
    updateCounter(episodeCounter, episodeList.length);
  });
  return select;
};

// counter function display
const addCounter = (_) => {
  counterDisplay = document.createElement("div");
  counterDisplay.setAttribute("id", "counterDisplayID");
  //counterDisplay.style.backgroundColor = "blue";
  counterDisplay.style.marginTop = "0.5em"; // centre below

  return counterDisplay;
};

function updateCounter(numberOfEpisodes, totalEpisodes) {
  // counter for number of episode found in search
  let counterDisplay = document.querySelector("#counterDisplayID");

  counterDisplay.innerText = `Displaying ${numberOfEpisodes} / ${totalEpisodes} episodes`; // update of the counter
}

const addSearchBox = (episodeList) => {
  let episodeContainers = document.getElementsByClassName(
    "episode-container-class-name"
  ); // An array of episode container
  let inputBox = document.createElement("input");
  inputBox.setAttribute("id", "inputBoxId");
  inputBox.setAttribute("placeHolder", "type and search for episode");
  inputBox.style.width = "25em";
  inputBox.style.backgroundColor = "#f5f5f5";
  inputBox.style.margin = "0.8em"; // spacing to the left of episode list

  inputBox.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase(); // gets search string from input
    let episodeIndex = 0;
    let episodeCount = 0; // this is the number of episodes that match the key word search string

    episodeList.forEach((episode) => {
      if (
        episode.name.toLowerCase().includes(searchString) ||
        episode.summary.toLowerCase().includes(searchString)
      ) {
        episodeCount++;
        showEpisode(episodeContainers[episodeIndex]);
      } else {
        hideEpisode(episodeContainers[episodeIndex]);
      }
      episodeIndex++;
    });
    updateCounter(episodeCount, episodeList.length);
  });

  return inputBox;
};

const addHeader = (episodeList) => {
  const rootElem = document.getElementById("root");
  let navBarContainer = document.createElement("div");
  let body = document.querySelector("body");

  navBarContainer.style.display = "flex";
  navBarContainer.setAttribute("id", "navBarContainer");
  body.insertBefore(navBarContainer, rootElem);
  const inputBox = addSearchBox(episodeList);
  navBarContainer.appendChild(inputBox);
  const counter = addCounter();
  navBarContainer.appendChild(counter);
  updateCounter(episodeList.length, episodeList.length);
  const dropDown = addDropDownMenu(episodeList);
  navBarContainer.appendChild(dropDown);
};

function makePageForEpisodes(episodeList) {
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  addAllEpisodes(episodeList);
  addHeader(episodeList);
  addFooter();
}

function setup() {
fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((response) => response.json().then((data) => data))
  .then((allEpisodes) => makePageForEpisodes(allEpisodes))
  .catch((error) => console.log(error));
}

window.onload = setup;
