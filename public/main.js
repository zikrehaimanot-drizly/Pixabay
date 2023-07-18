const searchButton = document.getElementById('searchButton');
const moreResultsButton = document.getElementById('nextPageOfResults');
const prevResultsButton = document.getElementById('prevPageOfResults');
const imageContainer = document.getElementById('imageContainer');
let previousSearchTerm = '';
let previousLanguage = '';
let pageCount = 1;

function fetchAndRenderImages(searchTerm, selectedLanguage) {
  console.log(`${pageCount} thisi spage count`)
  fetch(`/search?term=${encodeURIComponent(searchTerm)}&page=${pageCount}&lang=${selectedLanguage}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      pageCount += 1;
      console.log(data);
      const images = data.hits;

      imageContainer.innerHTML = '';

      if (images.length === 0) {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No Images.';
        imageContainer.appendChild(noResultsMessage);
      } else {
        images.forEach(image => {
          const liElement = document.createElement('li');
          const imgElement = document.createElement('img');
          imgElement.src = image.webformatURL;
          imgElement.addEventListener('click', () => {
            const queryParams = new URLSearchParams({
              id: image.id,
              imageUrl: image.webformatURL,
              imagePoster: image.user,
              imageTags: image.tags
            });
            window.location.href = `/imageDetails?${queryParams.toString()}`;
          });
          liElement.appendChild(imgElement);
          imageContainer.appendChild(liElement);
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      const errorContainer = document.getElementById('errorContainer');
      errorContainer.innerHTML = 'An error occurred while fetching images. Please try again.';
    });
}

function handleSearch() {
  const searchTerm = document.getElementById('input').value;
  const selectedLanguage = document.getElementById('languageDropdown').value;

  if (searchTerm !== previousSearchTerm || selectedLanguage !== previousLanguage) {
    pageCount = 1;
  }

  fetchAndRenderImages(searchTerm, selectedLanguage);

  previousSearchTerm = searchTerm;
  previousLanguage = selectedLanguage;
}


function handlePrevSearch() {
  // for some reason decrementing by 2 works on the surface, im not sure why..might be worth exploring during a chat but its late now
  //this will be last commit and includes minor css changes and trying to debug this edge case when i added the prevsearch button
  const searchTerm = document.getElementById('input').value;
  const selectedLanguage = document.getElementById('languageDropdown').value;
  pageCount = pageCount - 2
  fetchAndRenderImages(searchTerm, selectedLanguage);
 

  previousSearchTerm = searchTerm;
  previousLanguage = selectedLanguage;
}

searchButton.addEventListener('click', handleSearch);
moreResultsButton.addEventListener('click', handleSearch);
prevResultsButton.addEventListener('click', handlePrevSearch);
