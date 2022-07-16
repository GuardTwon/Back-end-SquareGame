const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const {validateFields}=require('../middlewares/validate-fields')
const {check} =require('express-validator')
const {
  createScore,
  deleteScore,
  getScore,
  updateScore,
} = require("../controllers/scores");

const router = Router();

router.use(validateJWT);

router.get("/", getScore);

router.post("/",
    [
    check('score','Score is required').not().isEmpty(),
    validateFields
    ],
    createScore);

router.put("/:id", updateScore);



module.exports = router;
