const express = require("express");
const router = express.Router();
const userController = require('../Controllers/user_controller');

router.get("/read", userController.getUsers);
router.post("/create", userController.setUser);
router.delete("/delete", userController.deleteUser);

module.exports = router;


// module.exports = (app) => {
//     const user = require('../Controllers/user_controller');
//     const express = require("express");
//     const router = express.Router();

//     router.use(express.json());
//     router.get("/read", user.getUsers);
//     router.post("/create", user.setUser);

//     app.use("/user", router);
// };