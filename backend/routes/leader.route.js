import express from "express";
import { upload } from "../middleware/upload.js";
import {
  getLeaders,
  addOrUpdateLeader,
  deleteLeader,
} from "../controllers/leader.controller.js";

const router = express.Router();

router.get("/", getLeaders);
router.post("/", upload.single("photo"), addOrUpdateLeader);
router.delete("/:role", deleteLeader);

export default router;
