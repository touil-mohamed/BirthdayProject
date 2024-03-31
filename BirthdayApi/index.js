const giftRoute = require("./routes/gift.routes");
const giftListRoute = require("./routes/giftList.routes");




const express = require("express");
const cors = require("cors");
/* Creating an instance of the express module. */
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.static("public"));
app.use(express.json()); //Recuperer les datas au format json
app.use(express.urlencoded({ extended: true }));

app.use("/Gifts", giftRoute.routes);

//app.use("/GiftsList", giftListRoute.routes);

app.listen(3001, () => {
  console.log("Server listening on http://localhost:3001");
});
