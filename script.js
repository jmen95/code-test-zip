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
//Type 1= Success, 2= error
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
