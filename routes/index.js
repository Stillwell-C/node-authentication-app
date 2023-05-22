const express = require("express");
const router = express.Router();
const index_controller = require("../controllers/indexController");

router.get("/", index_controller.index_get);

router.get("/log-in", index_controller.log_in_get);

router.post("/log-in", index_controller.log_in_post);

router.get("/log-out", index_controller.log_out_get);

router.get("/sign-up", index_controller.sign_up_get);

router.post("/sign-up", index_controller.sign_up_post);

router.get("/new-post", index_controller.new_post_get);

router.post("/new-post", index_controller.new_post_post);

router.post("/delete-post", index_controller.delete_post);

module.exports = router;
