const { Router } = require("express")
const router = Router()
const handelRequests = require("../controllers/authContoller")

router.get('/singup' , handelRequests.singup_get)
router.post('/singup' , handelRequests.singup_post)
router.get('/login' , handelRequests.login_get)
router.post('/login' , handelRequests.login_post)
rourer.get('/logout' , handelRequests.logout_get)

module.exports = router