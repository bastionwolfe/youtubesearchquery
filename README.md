# youtubesearchquery

a small search query for youtube for refined searches and option to exclude shorts from results.

## Why I Built This

YouTube's search is great for finding popular and relevant videos, but sometimes I want something much more specific:

> **"Show me videos about this topic that were published between these two dates."**

YouTube doesn't make that workflow particularly convenient, especially when researching older or time-sensitive content.

I built this to make that process faster and simpler.

The extension lets you enter a search term, choose a start and end date, and send the search directly to YouTube.

The goal is to keep the extension lightweight and simple. It **doesn't use the YouTube API and doesn't scrape YouTube pages**. Instead, it builds a normal YouTube search URL and lets YouTube handle the actual search.

## Features

* Search YouTube directly from the extension
* Search within a custom date range
* Option to exclude Shorts
* Open results in the current tab
* Option to open results in a new tab
* Chrome support
* Firefox support
* Brave support
* No YouTube API required
* No web scraping

## How It Works

The extension takes your search and date range and constructs a YouTube search query.

For example:

```text
Search: Memes
From: 08/01/2016
To: 08/10/2026
```

The extension turns that into a YouTube search using:

```text
Memes after:2016-08-01 before:2026-08-10
```

YouTube then performs the search normally.

The extension does not download, parse, or analyze YouTube's search results.

## Supported Browsers

Currently supported or being tested on:

* Google Chrome
* Brave
* Mozilla Firefox
* Other Chromium-based browsers should also work

The goal is to maintain a single codebase wherever possible.

## Future Updates

This project is still early, and there are plenty of features I'd like to add.

### Search Sorting

Add options to sort results by:

* Newest
* Oldest
* Relevance
* View count

### More YouTube Filters

Expand the search options with things like:

* Videos
* Shorts
* Live videos
* Playlists
* Channels
* Video duration

### Quick Date Presets

Add one-click options such as:

```text
Today
Last 7 Days
Last 30 Days
Last 6 Months
This Year
Custom
```

### Saved Searches

Allow users to save frequently used searches and date ranges.

For example:

```text
SpaceX — Last 30 Days
Programming Tutorials — 2025
```

### Better UI

Improve the popup with a cleaner interface, better date selection, and easier access to frequently used filters.

### More Browser Support

Continue improving compatibility across Chrome, Firefox, Brave, and other Chromium-based browsers.

## Philosophy

I want this extension to stay simple.

Rather than building a system that collects YouTube data, the extension focuses on generating useful searches and letting YouTube do the heavy lifting.

That keeps the project lightweight, easy to understand, and easy for other developers to contribute to.

## Contributing

Contributions, ideas, bug reports, and feature requests are welcome.

If you have an idea for a useful YouTube search filter, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

You're free to use, modify, and distribute the code.
