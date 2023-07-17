const searchButton = document.getElementById('searchButton');
const moreResultsButton = document.getElementById('nextPageOfResults');
const imageContainer = document.getElementById('imageContainer');
let pageCount = 0

searchButton.addEventListener('click', () => {
  let searchTerm = document.getElementById('input').value;
  fetch(`/search?term=${encodeURIComponent(searchTerm)}&page=${pageCount}`)
    .then(response => response.json())
    .then(data => {
      pageCount+= 1
      console.log(data)
      images = data.hits
      images.forEach(image => {
        const liElement = document.createElement('li');
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        liElement.appendChild(imgElement);
        imageContainer.appendChild(liElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

});

moreResultsButton.addEventListener('click', () => {
  let searchTerm = document.getElementById('input').value;
  console.log(pageCount)
  fetch(`/search?term=${encodeURIComponent(searchTerm)}&page=${pageCount}`)
    .then(response => response.json())
    .then(data => {
      pageCount+= 1
      console.log(data)
      imageContainer.innerHTML = '';
      images = data.hits
      images.forEach(image => {
        const liElement = document.createElement('li');
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        liElement.appendChild(imgElement);
        imageContainer.appendChild(liElement);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

});