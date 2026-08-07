# Expense Tracker

A simple, client-side expense tracker built with vanilla HTML, CSS, and JavaScript. Add income and expenses, remove transactions, and see a live summary of your balance.

## Features

- **Add transactions**: enter a description and amount (positive for income, negative for expenses)
- **Remove transactions**: delete any entry with one click
- **Live summary**: automatically updates your total balance, income, and expenses
- **Persistent storage**: transactions are saved in the browser's `localStorage`, so your data survives page reloads
- **Animated balance**: the balance smoothly counts up/down when it changes

## Tech Stack

- **HTML**: page structure and layout
- **CSS**: styling
- **JavaScript (vanilla)**: no frameworks or libraries, handles state, DOM rendering, and persistence

## How It Works

1. Transactions are stored as an array of objects (`{ id, description, amount }`) in memory and synced to `localStorage`.
2. Adding a transaction updates the array, saves it, and re-renders the transaction list and summary.
3. The summary is calculated by splitting transactions into income (positive amounts) and expenses (negative amounts), then totaling each.

## Getting Started

No build tools or dependencies required. Just open `index.html` in your browser.
