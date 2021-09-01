

const inputField = document.getElementById('input-field');
const inputButton = document.getElementById('input-btn');


const loadData = () => {
    const inputValue = inputField.value;
    const url = `http://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayData(data.docs))
}
const parent = document.getElementById('card-container');

const displayData = (array) => {

    array.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('card-size');
        div.setAttribute('width', '100px')
        console.log(div);
        div.innerHTML = `
        <div class="card">
    <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Last updated 3 mins ago</small>
    </div>
  </div>`
        parent.appendChild(div);
    });

}

