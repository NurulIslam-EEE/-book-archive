
const inputField = document.getElementById('input-field');
const inputButton = document.getElementById('input-btn');
const errorMessage = document.getElementById('error-message');
const cardContainer = document.getElementById('card-container');
const itemFound = document.getElementById('item-found');

// -----------------load data--------------


  const url = `https://openlibrary.org/search.json?q=science`;
  fetch(url)
    .then(response => response.json())
    .then(data => displayData(data.docs));

const loadData = () => {

  //----------clear previous data------------

  errorMessage.innerText = '';
  itemFound.innerText = '';
  cardContainer.innerHTML = '';

  //-------storing input value and validation------

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

//--------display data and error handling--------

const displayData = (booksDetails) => {
  if (booksDetails.length === 0) {
    itemFound.innerText = '';
    errorMessage.innerText = 'No result found. Please input a valid name';
    inputField.value = '';

  } else {
    errorMessage.innerText = '';
    booksDetails.forEach(element => {
      const div = document.createElement('div');
      div.classList.add('card-sizing');
      div.classList.add('card');
      div.innerHTML = `   
    <img class="img-sizing" src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">Author:${element.author_name ? element.author_name[0] : 'N/A'}</p>
      <p class="card-text">Publisher: ${element.publisher ? element.publisher[0] : 'N/A'}</p>
      <p class="card-text">Publish date:  ${element.publish_date ? element.publish_date[0] : 'N/A'}</p>
      <p class="card-text">First Publish Year: ${element?.first_publish_year ?? "N/A"}</p>
    </div>
  `;
      cardContainer.appendChild(div);
    });

    itemFound.innerText = `about ${booksDetails.length} result found`;
    inputField.value = '';

  }
}


