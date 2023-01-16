const express = require("express");
const cors = require("cors");

// const nodeFetch = require("node-fetch");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.route");
const { errLogger } = require("./middlewares/logger");
const { userAuth } = require("./middlewares/user.auth");

const app = express();
app.use(express.json());
useUnifiedTopology: true;
app.use(
  cors({
    origin: "*",
  })
);
app.use(errLogger);

app.use("/user", UserRouter);
// app.use("/e", UserRouter);
app.use(userAuth);
app.get("/", (req, res) => {
  res.send("Hello, Welcome to Weather app");
});
app.get("/err", (req, res) => {
  res.status(500).send("Hello, It's Error");
});

app.get("/weather/:location", async (req, res) => {
  const { location } = req.params;
  try {
    const data = await fetch(
      `http:api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&limit=5&appid=d5eb353971f0f7d5943dd6c66baeb593`
    );
    res.status(200).send(data);
  } catch (error) {
    res.status(401).send({ msg: "LOcation Not found" });
    console.log(error);
  }
});

app.listen(process.env.PORT | 5000, async () => {
  try {
    connection;
    console.log("Listining and DB connected");
  } catch (err) {
    console.log(err);
  }
});
