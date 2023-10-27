require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const nightmare = require('nightmare')();
const mongoose = require('mongoose');
const cron = require('node-cron');

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/price_checker_db', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
  email: String,
  url: String,
  price: Number
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/check-price', async (req, res) => {
  const { url, email, price } = req.body; // Capture price from the request
  try {
    const user = await User.findOne({ email, url });
    if (user) {
      res.send('You are already tracking this product.');
    } else {
      await User.create({ email, url, price }); // Store the price in the database
      res.send('Product added for price tracking.');
      // Check the price immediately
      await checkPrice(url, email);
    }
  } catch (error) {
    console.error(error);
    res.send('An error occurred while adding the product.');
  }
});

async function checkPrice(url, email) {
  try {
    const user = await User.findOne({ email, url });
    if (!user) {
      return;
    }

    const priceString = await nightmare
      .goto(url)
      .wait(".a-price-whole")
      .evaluate(() => document.querySelector(".a-price-whole").innerText)
      .end();

    const priceNumber = parseFloat(priceString.replace('$', ''));

    if (priceNumber < user.price) {
      sendEmail('Price Drop Alert', `The price on ${url} has dropped below your desired price of ₹${user.price}<br><br>Thanks<br>Dhruv Raval<br>Developer & CEO<br>DealDigger`, email);
    }
  } catch (e) {
    sendEmail('Amazon Price Checker Error', e.message, email);
  }
}

async function sendEmail(subject, body, semail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const email = {
    to: semail,
    from: process.env.EMAIL_ADDRESS,
    subject: subject,
    text: body,
    html: body
  };

  transporter.sendMail(email, (err, info) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Email sent successfully');
    }
  });
}

// Schedule the price-checking task to run every day
cron.schedule('0 0 * * *', async () => {
  const users = await User.find();
  for (const user of users) {
    await checkPrice(user.url, user.email);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
