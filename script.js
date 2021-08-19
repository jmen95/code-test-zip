const country = "us";

/**
 * API config
 */
const baseURL = "https://api.zippopotam.us/";
/**
 * Fetch Data to Zippopotomus API
 * @param {string} url
 * @param {*} data
 * @param {*} options
 * @returns
 */
async function getDataZippopotomus(url) {
  const options = {
    method: "GET",
    mode: "cors",
    cache: "default",
  };

  const finalURL = `${baseURL}${country}/${url?.replace(/^\//g, "")}`;

  const response = await fetch(finalURL, options);
  const json = await response.json();
  return json;
}

const $message = document.querySelector(".message");

/**
 *
 * @param {string} text
 * @param {number} type Type 1= Success, 2= error
 */
function message(text, type = 1) {
  const messageType = type === 2 ? "error" : "success";
  $message.innerHTML = text;
  $message.classList.remove("show");
  $message.classList.remove("message--success");
  $message.classList.remove("message--error");
  $message.classList.add("show");
  $message.classList.add("message--" + messageType);
}

function hideMessage() {
  $message.innerHTML = "";
  $message.classList.remove("show");
  $message.classList.remove("message--success");
  $message.classList.remove("message--error");
}

const $resultSearch = document.querySelector("#resultSearch");

/**
 * Get info item HTML
 * @param {string} title
 * @param {string} description
 * @returns HTML info item
 */
function infoItemHTML(title, description) {
  return `<li class="info__item">
    <strong>${title}:</strong> ${description}
</li>`;
}

/**
 * Place card info
 * @param {*} place
 * @returns
 */
function infoPlaceCard(place) {
  return `<div class="place">
<div class="place__aside">
    <img src="states/${place["state abbreviation"]}.svg" alt="${
    place["state"]
  }" class="place__aside__img" width="200" />
</div>
<h4 class="place-title">${place["place name"]}</h4>
<ul class="info">
    ${infoItemHTML("State", place["state"])}
    ${infoItemHTML("State Abbreviation", place["state abbreviation"])}
    ${infoItemHTML("Latitude", place["latitude"])}
    ${infoItemHTML("Longitude", place["longitude"])}
  
</ul>
</div>`;
}

/**
 * Print zipcode data
 * @param {*} zipCodeData
 */
function printSearchResult(zipCodeData) {
  const HTML = `<section class="details">
  <h2 class="subtitle">Post Code: ${zipCodeData["post code"]}</h2>
  <ul class="info">
      ${infoItemHTML("Country", zipCodeData["country"])}
      ${infoItemHTML(
        "Country Abbreviation",
        zipCodeData["country abbreviation"]
      )}
  </ul>
  <h3 class="places-title">Places</h3>
  ${zipCodeData.places?.map((place) => infoPlaceCard(place))}
</section>`;
  $resultSearch.innerHTML = HTML;
}

function noResultsFound() {
  message("No zip code found.", 2);
  $resultSearch.innerHTML = "";
}

/**
 * Events
 */

const $form = document.querySelector("#frmSearch");
const $zipCode = document.querySelector("#zipCode");
/**
 * Handle submit form
 * @param {*} event
 */
async function handleSubmit(event) {
  event.preventDefault();
  hideMessage();
  $form.classList.remove("validated");
  if ($form.checkValidity()) {
    const zipCode = $zipCode.value;
    if (/^[\d]{5}$/.test(zipCode)) {
      try {
        const zipCodeData = await getDataZippopotomus(zipCode);
        if (Object.keys(zipCodeData).length) {
          printSearchResult(zipCodeData);
        } else {
          noResultsFound();
        }
      } catch (error) {
        console.error(`handleSubmit Error`, error);
        message("Error to connect with API", 2);
      }
    } else {
      $form.classList.add("validated");
      $zipCode.setCustomValidity("Invalid zip code.");
      message("Invalid zip code.", 2);
    }
  } else {
    $form.classList.add("validated");
  }
}
function handleChange() {
  if (this.value) {
    this.setCustomValidity("");
  }
}

$form.addEventListener("submit", handleSubmit);

$zipCode.addEventListener("change", handleChange);
