import express from "express"
import { createMovie, deleteMovie, index, updateMovie, upload } from "../controllers/movies.js"
const router = express.Router()


router.get("/", index)

router.post("/new", upload.single("photo"), createMovie)

router.patch("/:id", updateMovie)

router.delete("/:id", deleteMovie)

export default router;