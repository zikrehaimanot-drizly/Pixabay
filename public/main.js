const searchButton = document.getElementById('searchButton');
const moreResultsButton = document.getElementById('nextPageOfResults');
const prevResultsButton = document.getElementById('prevPageOfResults');
const imageContainer = document.getElementById('imageContainer');
let previousSearchTerm = '';
let previousLanguage = '';
var pageCount = 0;

function fetchAndRenderImages(searchTerm, selectedLanguage) {
  pageCount += 1;
  console.log(`${pageCount} this is page count when we make the call`)
  fetch(`/search?term=${encodeURIComponent(searchTerm)}&page=${pageCount}&lang=${selectedLanguage}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      
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
          console.log(`${pageCount} after we've displayed images after fetch`)
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

  //this might need to be AND instead of OR

  if (searchTerm !== previousSearchTerm || selectedLanguage !== previousLanguage) {
    pageCount = 0;
  }
  console.log(`${pageCount} right before we call fetchimage during more pic call`)
  fetchAndRenderImages(searchTerm, selectedLanguage);

  previousSearchTerm = searchTerm;
  previousLanguage = selectedLanguage;
}


function handlePrevSearch() {
  // for some reason decrementing by 2 works on the surface, im not sure why..might be worth exploring during a chat but its late now
  //this will be last commit and includes minor css changes and trying to debug this edge case when i added the prevsearch button
  const searchTerm = document.getElementById('input').value;
  const selectedLanguage = document.getElementById('languageDropdown').value;
  console.log(`${pageCount} right before we atttempt subtracting`)
  pageCount = pageCount - 2
  console.log(`${pageCount}, this is count after we've subtracted from count`)
  fetchAndRenderImages(searchTerm, selectedLanguage);
 

  previousSearchTerm = searchTerm;
  previousLanguage = selectedLanguage;
}

searchButton.addEventListener('click', handleSearch);
moreResultsButton.addEventListener('click', handleSearch);
prevResultsButton.addEventListener('click', handlePrevSearch);
