# Problem Tracker

## Project Overview

A small personal web app for capturing problems noticed throughout the day. Each problem has a title, an optional description, a frequency rating (daily, weekly, monthly, or rarely), and a timestamp set when it is added. Problems are listed newest first. Their frequency can be changed in the list, and they can be deleted after a confirmation.

## Tech Stack

- Plain HTML, CSS, and JavaScript, all in `index.html`
- Browser `localStorage` for saved data
- No dependencies: open `index.html` in a browser to run it

## Development Notes

- **No frameworks or build step.** Everything stays in `index.html`.
- **Never store data on a server.** Use `localStorage` only.
- **Ask before adding features I didn't request.**