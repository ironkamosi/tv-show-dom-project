//You can edit ALL of the code here
// global variable 
function compare(showOne, showTwo) {
  // its comparing the content of the elements, it tries to understand the position of the string elements
  // console.log(showOne);

  if (showOne.name.toLowerCase() < showTwo.name.toLowerCase()) {
    return -1;
  }
  if (showOne.name.toLowerCase() < showTwo.name.toLowerCase()) {
    return 1;
  }
  return 0;
}

// when logic is done call in the eventListener
// tv input selector
function addShowSelector(showData) {
  const rootElem = document.getElementById("root");

 // let select = document.getElementById("select-tv"); // this only adds the show select if it is not present in the DOM
  // console.log("test", select);

//  if (select === null) {
    // this only works if the element does not exist 
    select = document.createElement("select");
    select.setAttribute("id", "select-tv");
    rootElem.appendChild(select);

    showData.sort(compare).forEach((show) => {
      //  when the function processes the forEach the array will be sorted
      let option = document.createElement("option");
      option.innerHTML = `${show.name}`; // loops over the tv show data
      select.appendChild(option);
    });
 // }
// loose a track of the episode list because errors occur when it tries to 
  //compare the two fields and the array 
  // it also fails with the hide and show
  select.addEventListener("change", function (event) {
    let episodeContainers = document.getElementsByClassName("episode-container-class-name"); // An array of episode container
    // let episodeIndex = 0;
    // let episodeCounter = 0;
    let optionId = event.target.options[event.target.selectedIndex].index;
    let showId = showData[optionId].id;
    // for every item duplicate we need an test to see if it exists

    getAllEpisodesApi(showId); // this call gets the all the episodes
    //addDropDownMenu(episodeList) // creates an error
    // console.log("test", showData[optionId]);


    let styleContainer = document.getElementById("styleContainer");
    styleContainer.innerHTML = ""; // its removing all the episode containers

    // fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    //   .then((response) => response.json().then((data) => data))
    //   .then((allEpisodes) => (arrayOfEpisodes = allEpisodes)) // gets the episode data and sets it to an array of episodes
    //   .catch((error) => console.log(error));

    // if (event.target.options[event.target.selectedIndex].index === 0) {
    //   // refers to the all episode option
    //   episodeList.forEach(() => {
    //     episodeCounter = episodeList.length;
    //     episodeContainers[episodeIndex].style.display = "";
    //     episodeIndex++; // This increments});
    //   });
    // } else {
    //   episodeList.forEach(() => {
    //     if (
    //       episodeIndex ===
    //       event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index
    //     ) {
    //       showEpisode(episodeContainers[episodeIndex]); //.style.display = "";
    //     } else {
    //       hideEpisode(episodeContainers[episodeIndex]); //.style.display = "none";
    //     }
    //     episodeIndex++; // This increments});
    //   });
    //   episodeCounter = 1;
    // }
    // updateCounter(episodeCounter, episodeList.length);
  });

  return select;
}

function addFooter() {
  const rootElem = document.getElementById("root");
  let footer = document.getElementById("footer");
  if (footer === null) {
    footer = document.createElement("footer");
    footer.setAttribute("id", "footer");
    footer.innerHTML = "<p>https://tvmaze.com/</p>";
    rootElem.appendChild(footer);
  }
}

const hideEpisode = (episode) => {
  episode.style.display = "none";
  // console.log("test",episode);

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
  title.className = "title";
  title.style.textAlign = "center";
  if (episode.name == "" || episode.name == null) {
    title.innerText = "Tv show data is currently unavailable";
  } else {
      title.innerHTML = `${episode.name}: S${formatSeasonNum(episode.season)}E${formatSeasonNum(episode.number)}`;
  }
  

  let img = document.createElement("img");
  img.style.margin = "0 auto";
  img.style.width = "99%";
  // img.style.paddingLeft = "2em";
  // img.style.paddingRight = "2em";
  if (episode.image == null || episode.image == "") {
    //console.log("test",episode.image)
    img.src = "./img/error.jpg" 
  } else {
   img.src = episode.image.medium;
  }

  
  let summary = document.createElement("p");
  summary.style.texAlign = "center";
  summary.className = "summary";
  if (episode.summary == ""|| episode.summary == null) {
  summary.innerText = "Information for this episode is currently unavailable"  
  } else {
  summary.innerHTML = `${episode.summary}`;   
  }

  episodeContainer.appendChild(title);
  episodeContainer.appendChild(img);
  episodeContainer.appendChild(summary);
  //rootElem.appendChild(episodeContainer);
  return episodeContainer;
}

// container for the single episodes
const addAllEpisodes = (episodeList) => {
  // addDropDownMenu(episodeList);
  upDateDropDownMenu(episodeList);
  const rootElem = document.getElementById("root");
  let styleContainer = document.getElementById("styleContainer");

  if (styleContainer === null) {
    styleContainer = document.createElement("div");
    styleContainer.setAttribute("id", "styleContainer");
    styleContainer.className = "style-container";
    styleContainer.style.width = "98%";
    styleContainer.style.flexWrap = "wrap";
    styleContainer.style.margin = "0 auto";
    rootElem.appendChild(styleContainer);
  }
  episodeList.forEach((episode) => {
    styleContainer.appendChild(addSingleEpisode(episode));
  });
};

function upDateDropDownMenu(episodeList) {
  //goes through the options removes the options and recreates the opitons in the second loop
  let select = document.getElementById("select");
  if (select !== null) {
    for (let index = select.options.length; index > 0; index--) {
      select.remove(index);
    }

    episodeList.forEach((episode) => {
      let option = document.createElement("option");
      option.innerHTML = `${episode.name}: S${formatSeasonNum(episode.season)}E${formatSeasonNum(episode.number)}`;
      select.appendChild(option);
    });
  }
}

const addDropDownMenu = (episodeList) => {
  let option;
  let select = document.getElementById("select");

  if (select === null) {
    select = document.createElement("select");
    select.setAttribute("id", "select");
    option = document.createElement("option");
    option.innerText = "All episodes";
    select.appendChild(option);
  } else {
    // let options = select.getElementsByTagName("option");
    // console.log("test", options);
    // select.innerHTML = "";
    for (let index = select.options.length; index > 0; index--) {
      // this will go through the loop starting at the end and for each element it will remove all the options before it rebuilds it
      select.remove(index);
    }
  }

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
    );
    episodeContaine
    
    
    // An array of episode container
    //let navBarContainer = document.getElementById("navBarContainer");
    let episodeIndex = 0;
    let episodeCounter = 0;
    if (event.target.options[event.target.selectedIndex].index === 0) {
      // refers to the all episode option

      episodeContainers.forEach((container, containerIndex) => {
        episodeCounter = episodeList.length;
        container.style.display = "";
      });
    } else {
      episodeContainers.forEach((container, containerIndex) => {
      
        if (
          containerIndex ===
          event.target.options[event.target.selectedIndex].index - 1 // test if the current index is equal to the index
        ) {
          showEpisode(container); //.style.display = "";
        } else {
          hideEpisode(container); //.style.display = "none";
        }
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
  let episodeContainers = document.getElementsByClassName("episode-container-class-name"); // An array of episode container
  episodeContainers= Array.from (episodeContainers)
  // console.log(episodeContainers);

  let inputBox = document.getElementById("inputBoxId");
  if (inputBox === null) {
    // this only works if the ""inputBox does not exist
    inputBox = document.createElement("input");
    inputBox.setAttribute("id", "inputBoxId");
    inputBox.setAttribute("placeHolder", "type and search for episode");
    inputBox.style.width = "25em";
    inputBox.style.backgroundColor = "#f5f5f5";
    inputBox.style.margin = "0.8em"; // spacing to the left of episode list
  }

  inputBox.addEventListener("keyup", (event) => {
    const searchString = event.target.value.toLowerCase(); // gets search string from input
    let episodeIndex = 0;
    let episodeCount = 0; // this is the number of episodes that match the key word search string
    // console.log(episode);
    let informationMissing = document.createElement("p");
    let errorContainer = document.getElementById("styleContainer")
    
    // access the data through the array


    episodes.forEach((episode) => {
      // if ((episode.name == null || episode.name == "") || (episode.summary == null || episode.summary == "")){
      //   // errorContainer.innerText = "Sorry, the keyword does not exist in database";
      //   // console.log(errorContainer.innerText)
      //   // informationMissing.innerText = "Sorry, the keyword does not exist in database"
      //   // errorContainer.appendChild(informationMissing)
      //   //console.log(informationMissing.innerText)
      // }
      if (episode.name.toLowerCase().includes(searchString) || episode.summary.toLowerCase().includes(searchString))
      {
        episodeCount++;
        showEpisode(episodeContainers[episodeIndex]);
       }
       else if((episode.name == null || episode.name == "") || (episode.summary == null || episode.summary == "")){
        hideEpisode(episodeContainers[episodeIndex]);
        informationMissing.innerText = "Sorry, the keyword does not exist in database"
        errorContainer.appendChild(informationMissing)
        //console.log(informationMissing.innerText)
      }else {
         hideEpisode(episodeContainers[episodeIndex]);
         informationMissing.innerText = "Sorry, the keyword does not exist in database";
         errorContainer.appendChild(informationMissing);
         //console.log(errorContainer)
      }
      episodeIndex++;
    });
    updateCounter(episodeCount, episodeList.length);
     




  });

  return inputBox;
};

const addHeader = (episodeList, showData) => {
  const rootElem = document.getElementById("root");
  let body = document.querySelector("body");

  let navBarContainer = document.getElementById("navBarContainer");

  if (navBarContainer === null) {
    //
    navBarContainer = document.createElement("div");
    navBarContainer.style.display = "flex";
    navBarContainer.setAttribute("id", "navBarContainer");

    body.insertBefore(navBarContainer, rootElem);

    const showSelector = addShowSelector(showData);
    navBarContainer.appendChild(showSelector);

    const inputBox = addSearchBox(episodeList);
    navBarContainer.appendChild(inputBox);
    const counter = addCounter();

    navBarContainer.appendChild(counter);
    updateCounter(episodeList.length, episodeList.length);
  }

  const dropDown = addDropDownMenu(episodeList);
  navBarContainer.appendChild(dropDown);
};

function makePageForEpisodes(episodeList) {
  episodes = episodeList;
  const tvShowData = getAllShows();
  addAllEpisodes(episodeList);
  addHeader(episodeList, tvShowData);
  addFooter();
}

function setup() {
  // fetches the data from the tv show website
  const shows = getAllShows().sort(compare);
  // console.log(shows[0]);
  const showId = shows[0].id;
  fetch(`https://api.tvmaze.com/shows/${showId}/episodes`)
    .then((response) => response.json().then((data) => data)) // remove the end of the json once bug is fixed with the header// return response.json this gathers the data
    .then((allEpisodes) => makePageForEpisodes(allEpisodes)) // this does nt get called until we get the data
    .catch((error) => console.log(error));
  
  //getAllEpisodesApi(82);
}

let episodes; // global variable that contains the episodes/ data from the api

function getAllEpisodesApi(id) {
  // function to get the apis
  let arrayOfEpisodes;
  fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
    .then((response) => response.json().then((data) => data)) // return response.json this gathers the data
    .then((allEpisodes) => {
      episodes = allEpisodes;
      addAllEpisodes(allEpisodes);
    }) // this does not get called until we get the data
    .catch((error) => console.log(error));
}
window.onload = setup; // when the browser is load call set up


/*
1 counter code - 
update the counter code
issue: when show changes the counter doesnt update

2-Missing data
create a condition that checks that the all the fields I am displaying in the data

name
medium.img
summary

message blank




*/
