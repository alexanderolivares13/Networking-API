const express = require("express");
const db = require("./config/connection");
// import * as routes from './routes';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(route);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Networking API live at http://localhost:3001 server listening on PORT ${PORT}`);
  });
});
