require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Firebase Project:", process.env.FIREBASE_PROJECT_ID);
  console.log(`Server running on port ${PORT}`);
});
