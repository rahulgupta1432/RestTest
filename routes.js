let express = require("express");
let routes = express.Router();
let user = require("./controller/userController");

routes.post("/user", user.createUser);
routes.get("/user/:id", user.getUserDetails);
routes.delete("/user/:id", user.delUserDetails)
routes.put("/user/:id", user.updateUserDetails)

module.exports = { routes }