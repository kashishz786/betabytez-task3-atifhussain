const express = require("express");
const postRoutes = require("./routes/postRoutes");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/auth");

const PORT = 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Blog API");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});