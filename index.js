'use strict';

const searchURL = `https://api.github.com/users/lukea28/repos`;

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.repos.length & i<maxResults ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li>
        <h3>
            <a href="${responseJson[i].html_url}">${responseJson[i].name}</a>
        </h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos() {
  const params = {
    type: "all"
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "Accept": 'application/VRDisplayEvent.github.v3+json'
    })
  };

  fetch(url,options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(watchForm);