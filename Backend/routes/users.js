import express from "express"
import { deleteProfile, index, login, signup } from "../controllers/users.js"
const router = express.Router()

router.get("/", index)

router.post("/login", login)

router.post("/signup", signup)

router.delete("/:username", deleteProfile)

export default router