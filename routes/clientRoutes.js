import express from "express"
import {
    getClients,
    createClient,
    getClientData,
    addClientData,
    updateClient,
    getAccount,
    createClientData,
    updateClientData,
    getBenod,
    addBand,
    updateBand,
    addHesab,
    getHesabat,
    updateHesab,
    updateReceieved,
    getReceived,
    endProject
} from "../controllers/clientController.js"

import { requireAuth } from "../middlewares/requireAuth.js"

const router = express.Router()

router.use(requireAuth)
router.post("/create", createClient)
router.post("/createData", createClientData)
router.put("/update", updateClient)
router.put("/updateData", updateClientData)
router.post("/data", addClientData)
router.get("/getAccount/:id", getAccount)
router.get("/", getClients)
router.post("/benod/addBand", addBand)
router.put("/benod/update", updateBand)
router.put("/project/updateReceieved", updateReceieved)
router.get("/benod/:projectId", getBenod)
router.post("/hesabat/addHesab", addHesab)
router.get("/hesabat/:bandId/:classType", getHesabat)
router.get("/project/:_id", getReceived)
router.delete("/project/delete", endProject)
router.put("/hesabat/update", updateHesab)




router.get("/data/:_id", getClientData)

export default router
