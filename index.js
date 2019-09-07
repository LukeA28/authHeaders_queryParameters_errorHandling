'use strict';

const accessToken = 'f1515a2e0b7885766306510aa8441dff8202530c';

const searchURL = 'https://api.github.com/users/';

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
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
    language: "en"
  };

  const queryString = formatQueryParams(params);
  const url = searchURL + $('#js-search-term').val() + '/repos' + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "Accept": 'application/vnd.github.v3.full+json',
      "Authorization": `token ${accessToken}`})
  };

  fetch(url, options)
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

$(watchForm());