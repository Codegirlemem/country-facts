const hero = document.getElementById("hero");
const heroText = document.querySelector(".hero-text");

const more = document.createElement("div");
more.classList.add("more");
heroText.appendChild(more);

const mainHeading = document.querySelector("h1");
const heroPara = document.querySelector(".hero-para");
const countryImg = document.querySelector("#countryImg");
const inputForm = document.querySelector("#input-form");
const searchInput = document.querySelector("#search-input");

const flagInfo = document.createElement("div");
flagInfo.classList.add("flag-info");
hero.appendChild(flagInfo);

const getUserInput = (event) => {
  event.preventDefault();
  let userInput = searchInput.value;

  hero.classList.remove("slideIn");
  countryData(userInput);
  userInput = "";
};

inputForm.addEventListener("submit", getUserInput);

function countryData(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((Response) => Response.json())
    .then((response) => {
      const [data] = response;

      displayCountry(data);
      return data;
    });
}

function displayCountry(data) {
  hero.classList.add("slideIn");

  const currencies = Object.values(data.currencies)[0];
  mainHeading.innerText = data.name.common;
  heroPara.innerText = data.capital;
  countryImg.src = data.flags.svg;
  countryImg.alt = `A flag of ${data.name.common}`;
  const moreHtml = `
    <p>Region: ${data.subregion}</p>
    <p>Continent: ${data.continents}</p>
    <p>Language: ${Object.values(data.languages)[0]}</p>
    <p>Population: ${data.population}</p>
<p>Currency: ${currencies.name}(${currencies.symbol})</p>
    <p>Timezone: ${data.timezones[0]}</p> 
    `;
  more.innerHTML = moreHtml;
  flagInfo.innerHTML = `
  <h3>Flag Fact</h3>
  <p> ${data.flags.alt}</p>   
  `;
}
