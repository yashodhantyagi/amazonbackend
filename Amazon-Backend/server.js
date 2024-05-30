const mongoose = require("mongoose");
const app = require("./app");

const url =
  "mongodb+srv://$_USERNAME_$:$_PASSWORD_$@cluster0.iw1yf9v.mongodb.net/$_DB_NAME_$?retryWrites=true&w=majority&appName=Cluster0";

const dbUser = "root";
const dbPassword = "abcd1234";
const dbName = "amazon_backend";

const dbLink = url
  .replace("$_USERNAME_$", dbUser)
  .replace("$_PASSWORD_$", dbPassword)
  .replace("$_DB_NAME_$", dbName);

mongoose.connect(dbLink).then(() => console.log("------Connected!------"));

const PORT = 5500;
const HOST = "localhost";
app.listen(PORT, HOST, () => {
  console.log(`------App Started------\nListening on http://${HOST}:${PORT}`);
});
