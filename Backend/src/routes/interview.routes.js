import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/file.middleware.js";
import { generateInterviewReport,getInteviewReportById,getAllInterviewReportsController,generateResumePdfController, deleteInterviewReportController } from "../controllers/interview.controller.js";

const interviewRouter=Router()

/**
 * @route POST /api/interview/
 * @description Generate new interview Report by accepting the user resume and job description and self description
 * @access private
 */
interviewRouter.post("/",authMiddleware,upload.single("resume"),generateInterviewReport)

/**
 * @route POST /api/interview/report/:interviewId
 * @description Get interview report of a particular job description
 * @access private
 */
interviewRouter.get("/report/:interviewId",authMiddleware,getInteviewReportById)

/**
 * @route POST /api/interview/
 * @description Get all the interview reports of all the user
 * @access private
 */
interviewRouter.get("/",authMiddleware,getAllInterviewReportsController)

/**
 * @route POST /api/interview/resume/pdf
 * @description Generate PDF for a specific interview report
 * @access private
 */
interviewRouter.get("/resume/pdf/:interviewReportId", authMiddleware, generateResumePdfController)


/**
 * @route DELETE /api/interview/:interviewId
 * @description Delete a specific interview report
 * @access private
 */
interviewRouter.delete("/:interviewId", authMiddleware, deleteInterviewReportController);


export default interviewRouter