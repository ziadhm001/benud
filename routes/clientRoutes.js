import express from "express"
import {
    getClients,
    createClient,
    getClientData,
    addClientData,
} from "../controllers/clientController.js"

import { requireAuth } from "../middlewares/requireAuth.js"

const router = express.Router()

router.use(requireAuth)
router.post("/create", createClient)
router.post("/data", addClientData)

router.get("/", getClients)
router.get("/data/:_id", getClientData)

export default router
