

const inputField = document.getElementById('input-field');
const inputButton = document.getElementById('input-btn');
const errorMessage = document.getElementById('error-message');
const cardContainer = document.getElementById('card-container');
const itemFound = document.getElementById('item-found');

// -----------------load data--------------

const loadData = () => {
  //----------clear previous data------------
  errorMessage.innerText = '';
  itemFound.innerText = '';
  cardContainer.innerHTML = '';
  const inputValue = inputField.value;
  if (inputValue === "") {
    errorMessage.innerText = 'Search field can not be empty';
    return;
  }

  const url = `https://openlibrary.org/search.json?q=${inputValue}`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayData(data.docs));
}

//--------display data--------

const displayData = (booksDetails) => {
  if (booksDetails.length === 0) {
    itemFound.innerText = '';
    errorMessage.innerText = 'No result found';
    inputField.value = '';

  } else {
    errorMessage.innerText = '';
    booksDetails.forEach(element => {
      const div = document.createElement('div');
      div.classList.add('card-sizing');
      // div.setAttribute('width', '100px')
      div.innerHTML = `
        <div class="card">
    <img class="img-sizing" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">Author:${element.author_name ? element.author_name[0] : 'N/A'}</p>
      <p class="card-text">Publisher: ${element.publisher ? element.publisher[0] : 'N/A'}</p>
      <p class="card-text">Publish:  ${element.publish_date ? element.publish_date[0] : 'N/A'}</p>
      <p class="card-text">First Publish: ${element.first_publish_year}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">see details</small>
    </div>
  </div>`;
      cardContainer.appendChild(div);
    });
    itemFound.innerText = `about ${booksDetails.length} result found`;
    inputField.value = '';

  }
}

