const searchButton = document.getElementById('searchButton');
const moreResultsButton = document.getElementById('nextPageOfResults');
const imageContainer = document.getElementById('imageContainer');
let pageCount = 1;

// edge case -- if you switch search term you should have the pageCount restart - may or may not come back to this dpending on priorites
function fetchAndRenderImages(searchTerm, selectedLanguage) {
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
  fetchAndRenderImages(searchTerm, selectedLanguage);
}

searchButton.addEventListener('click', handleSearch);
moreResultsButton.addEventListener('click', handleSearch);
