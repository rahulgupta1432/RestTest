let express = require("express");
let { routes } = require("./routes");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes)
app.listen(3001, () => {
      console.log("Server is running on port 3001")
})