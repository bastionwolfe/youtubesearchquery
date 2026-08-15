const browserAPI = globalThis.browser ?? globalThis.chrome;

const queryInput = document.getElementById("query");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const dateRangeInput = document.getElementById("dateRange");
const newTabInput = document.getElementById("newTab");
const excludeShortsInput = document.getElementById("excludeShorts");
const searchButton = document.getElementById("search");
const error = document.getElementById("error");

function getLocalDate() {
    const today = new Date();

    return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );
}

function formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}


dateRangeInput.addEventListener("change", () => {
    const range = dateRangeInput.value;
    const today = getLocalDate();

    let fromDate = new Date(today);
    const toDate = new Date(today);

    switch (range) {
        case "today":
            fromDate = new Date(today);
            break;

        case "7days":
            fromDate.setDate(fromDate.getDate() - 6);
            break;

        case "30days":
            fromDate.setDate(fromDate.getDate() - 29);
            break;

        case "6months":
            fromDate.setMonth(fromDate.getMonth() - 6);
            break;

        case "year":
            fromDate = new Date(today.getFullYear(), 0, 1);
            break;

        case "custom":
            return;
    }

    fromInput.value = formatDate(fromDate);
    toInput.value = formatDate(toDate);
});

searchButton.addEventListener("click", async () => {
    const query = queryInput.value.trim();

    // Default dates
    const defaultFrom = "2005-06-28";

    const today = getLocalDate();
    const defaultTo = formatDate(today);

    const from = fromInput.value || defaultFrom;
    const to = toInput.value || defaultTo;

    const openNewTab = newTabInput.checked;
    const excludeShorts = excludeShortsInput.checked;

    error.textContent = "";

    if (!query) {
        error.textContent = "Enter something to search.";
        return;
    }

    if (from > to) {
        error.textContent = "The 'From' date must be before the 'To' date.";
        return;
    }

    const searchQuery =
        `${query} after:${from} before:${to}`;

    const url = new URL("https://www.youtube.com/results");

    url.searchParams.set("search_query", searchQuery);

    if (excludeShorts) {
        url.searchParams.set("sp", "EgIQAQ%3D%3D");
    }

    const searchUrl = url.toString();

    try {
        if (openNewTab) {
            await browserAPI.tabs.create({
                url: searchUrl
            });
        } else {
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