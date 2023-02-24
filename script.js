const apiViaCEP = {
    base: "https://viacep.com.br/ws/",
    format: "/json/",
} 

const CEP = document.querySelector('.CEP');
const city = document.querySelector('.city');
const state = document.querySelector('.state');
const street = document.querySelector('.street');
const neighborhood = document.querySelector('.neighborhood');
const search_input = document.querySelector('.form-control');
const search_button = document.querySelector('.btn');
const low_high = document.querySelector('.low-high');

search_button.addEventListener('click', function() {
  searchResults(search_input.value)
})

search_input.addEventListener('keypress', (e) => {

const onlyNumbers = "0123456789";
const key = String.fromCharCode(e.keycode)

if (e.target.value.length === 8) {
  searchResults(e.target.value)
  e.preventDefault();
}

if (!onlyNumbers.includes(e.keycode)) {
    //e.preventDefault();
    return;
}

})

function searchResults(cep) {
  fetch(`${apiViaCEP.base}${cep}${apiViaCEP.format}`)
   .then(response => {
    if (!response.ok) {
      throw new Error (`http error: status ${response.status}`)
    }
    return response.json();
   })
   .catch(error => {
    alert(error.message)
   })
   .then(response => {
    displayResults (response)
   });
} 

function displayResults(dados) {
 
  CEP.innerHTML = dados.cep;
  street.innerHTML = dados.logradouro;
  neighborhood.innerHTML = dados.bairro;
  city.innerHTML = dados.localidade;
  state.innerHTML = dados.uf;
}