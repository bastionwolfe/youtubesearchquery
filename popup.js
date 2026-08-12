const browserAPI = globalThis.browser ?? globalThis.chrome;

const queryInput = document.getElementById("query");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const newTabInput = document.getElementById("newTab");
const excludeShortsInput = document.getElementById("excludeShorts");
const searchButton = document.getElementById("search");
const error = document.getElementById("error");

searchButton.addEventListener("click", async () => {
  const query = queryInput.value.trim();
  const from = fromInput.value;
  const to = toInput.value;
  const openNewTab = newTabInput.checked;
  const excludeShorts = excludeShortsInput.checked;

  error.textContent = "";

  if (!query) {
    error.textContent = "Enter something to search.";
    return;
  }

  if (!from || !to) {
    error.textContent = "Choose both dates.";
    return;
  }

  if (from > to) {
    error.textContent = "The 'From' date must be before the 'To' date.";
    return;
  }

  // Build the YouTube search query
  const searchQuery =
    `${query} after:${from} before:${to}`;

  // Create YouTube search URL
  const url = new URL("https://www.youtube.com/results");

  url.searchParams.set("search_query", searchQuery);

  // YouTube's "Videos" result-type filter.
  // IMPORTANT: Do not include the extra %25 encoding.
  if (excludeShorts) {
    url.searchParams.set("sp", "EgIQAQ%3D%3D");
  }

  const searchUrl = url.toString();

  try {
    if (openNewTab) {

      // Open search in a new tab
      await browserAPI.tabs.create({
        url: searchUrl
      });

    } else {

      // Replace the currently active tab
      const tabs = await browserAPI.tabs.query({
        active: true,
        currentWindow: true
      });

      if (tabs.length === 0) {
        return;
      }

      await browserAPI.tabs.update(tabs[0].id, {
        url: searchUrl
      });
    }

  } catch (err) {

    console.error("Could not open YouTube:", err);

    error.textContent = "Could not open YouTube.";

  }
});

queryInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});