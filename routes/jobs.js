import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} from "../controllers/jobs.js";
import express from "express";

const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

export default router;
