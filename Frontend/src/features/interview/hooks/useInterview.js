import {
  getAllInterviewReports,
  getInterviewReportById,
  generateInterviewReport,
} from "../services/interview.api.js";
import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";
import { useParams } from "react-router";
import { useEffect } from "react";
import { generateResumePdf,deleteInterviewReport } from "../services/interview.api.js";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  const { interviewId } = useParams();
  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log("Error in generating interview report:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {
    setLoading(true);
    let response = null;
    try {
      console.log("Fetching interview report with ID:", interviewId);
      response = await getInterviewReportById(interviewId);
      console.log("Fetched interview report:", response);
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (error) {
      console.log("Error in fetching interview report:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
      return response.interviewReports;
    } catch (error) {
      console.log("Error in fetching all interview reports:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    let response = null;
    try {
      response = await generateResumePdf({ interviewReportId });
      const url = window.URL.createObjectURL(
        new Blob([response], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `resume_${interviewReportId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return response;
    } catch (error) {
      console.log("Error in generating resume PDF:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (interviewId) => {
    try {
      await deleteInterviewReport(interviewId);
      setReports((prev) => prev.filter((r) => r._id !== interviewId));
      toast.success("Report deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReports();
    }
  }, [interviewId]);

  return {
    loading,
    setLoading,
    report,
    reports,
    setReport,
    setReports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
    handleDeleteReport
  };
};
