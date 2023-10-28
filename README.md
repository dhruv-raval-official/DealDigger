# DealDigger Price Tracker
![DealDigger Logo](https://raw.githubusercontent.com/dhruv-raval-official/DealDigger/main/b983b740e7cf4bc289d2b1d6e0d6dce1%20(1).png)

Track prices on your favorite products and get notified when they drop below your desired price.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)

## Features

- Track the prices of products from various online retailers.
- Receive email notifications when the price of a tracked product drops below your desired price.
- Easy-to-use web interface for adding and managing tracked products.
- Flexible and customizable for your needs.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your system.
- A Gmail account (for sending email notifications).
- MongoDB database for storing user and product data.

## Installation

1. Clone this repository to your local machine.

```bash
git clone https://github.com/your-username/DealDigger.git
```
2. Install the project dependencies.

```bash
cd DealDigger
npm install
```

## Usage

1. Start the application.
```bash
node parser.js
```
2. Access the web interface in your browser at http://localhost:PORT .
3. Sign up or log in to start tracking product prices.
4. Add the URL of a product and your desired price. The system will automatically check and notify you when the price drops.

## Configuration
For email notifications to work, create a .env file in the project root and configure the following environment variables:
```env
EMAIL_ADDRESS=your-email@gmail.com
EMAIL_PASSWORD=your-email-password
MONGODB_URI=your-mongodb-connection-uri
```
Note: Be careful with your email and password information. Never commit this file to your version control system.
