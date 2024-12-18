const express = require("express");
require("dotenv").config();
const app = express();
const createNewUser = require("./controllers/createNewUser.js");
const { searchImages } = require("./controllers/searchImages.js");
const { sequelize } = require("./models/index.js");
const { saveImages } = require("./controllers/saveImages.js");
const { addTagsByPhotoId } = require("./controllers/addTagsByPhotoId.js");
const { searchPhotosByTag } = require("./controllers/searchPhotosByTag.js");
const {
  displaySearchHistory,
} = require("./controllers/displaySearchHistory.js");

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/api/users", createNewUser);
app.get("/api/search/photos", searchImages);
app.post("/api/photos", saveImages);
app.post("/api/photos/:photoId/tags", addTagsByPhotoId);
app.get("/api/photos/tag/search", searchPhotosByTag);
app.get("/api/search-history", displaySearchHistory);

sequelize
  .authenticate()
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.error("Unable to connect to database", error);
  });

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
}

module.exports = { app };
