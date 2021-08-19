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

getDataZippopotomus("90210").then((response) => {
  console.log(`response`, response);
});
