const { Router } = require('express')
const router = Router();
const { Register,Login,Delete } = require('../Controller/Controller')


router.post("/reg",Register);
router.post("/log",Login);
router.post("/:id",Delete);



module.exports = router 