const giftRoute = require("./routes/gift.routes");
const giftListRoute = require("./routes/giftList.routes");

const express = require("express");
const cors = require("cors");
const webPush = require('web-push');
const dotenv = require("dotenv");


dotenv.config();


/* Creating an instance of the express module. */
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
let subscriptions = [];

const vapidKeys = webPush.generateVAPIDKeys();

webPush.setVapidDetails(
  'mailto:momo2grem@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(express.static("public"));
app.use(express.json()); //Recuperer les datas au format json
app.use(express.urlencoded({ extended: true }));

app.use("/Gifts", giftRoute.routes);

app.use("/GiftsList", giftListRoute.routes);

// Endpoint pour récupérer la clé VAPID publique
app.get('/push/key', (req, res) => {
  res.json({
    pubkey: process.env.VAPID_PUBLIC_KEY
  });
});

app.post('/push/sub', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/push/send', (req, res) => {
  const { title, body } = req.body;
  const payload = JSON.stringify({ title, body });

  Promise.all(subscriptions.map(sub => webPush.sendNotification(sub, payload)))
    .then(() => res.status(200).json({ message: 'Notifications sent successfully.' }))
    .catch(err => {
      console.error('Error sending notifications:', err);
      res.status(500).json({ error: 'Error sending notifications' });
    });
});

app.listen(3001, () => {
  console.log("Server listening on http://localhost:3001");
});

module.exports = { app };
