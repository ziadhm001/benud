import express from "express"
import {
    validateUser,
    createUser,
    changePW,
} from "../controllers/userController.js"

import { requireAuth } from "../middlewares/requireAuth.js"

const router = express.Router()

router.post("/login", validateUser)
router.post("/register", createUser)

router.use(requireAuth)


router.post("/change-pw", changePW)


export default router
