let express = require("express");
let routes = express.Router();
let user = require("./controller/userController");

routes.post("/user", user.createUser);
routes.get("/user/:id", user.getUserDetails);
routes.get("/user", user.getAllDetails);
routes.delete("/user/:id", user.delUserDetails)
routes.put("/user/:id", user.updateUserDetails)
routes.post("/user/upload", user.addImage)
module.exports = { routes }