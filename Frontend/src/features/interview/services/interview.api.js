import axios from "axios";
import API from "../../../api/axios";

export const generateInterviewReport=async ({jobDescription,selfDescription,resumeFile})=>{
    try {
        const formData=new FormData()

        formData.append("jobDescription",jobDescription)
        formData.append("selfDescription",selfDescription)
        formData.append("resume",resumeFile)

        const response=await API.post("/interview",formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })

        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to generate interview report";
        console.error("Interview Report Generation Error:", errorMessage);
        throw new Error(errorMessage);
    }
}

export const getInterviewReportById=async(interviewId)=>{
    try {
        const response=await API.get(`/interview/report/${interviewId}`)
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch interview report";
        console.error("Get Interview Report Error:", errorMessage);
        throw new Error(errorMessage);
    }
}

export const getAllInterviewReports=async()=>{
    try {
        const response=await API.get(`/interview`)
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to fetch all interview reports";
        console.error("Get All Interview Reports Error:", errorMessage);
        throw new Error(errorMessage);
    }
}

export const generateResumePdf=async({interviewReportId})=>{
    try {
        const response=await API.get(`/interview/resume/pdf/${interviewReportId}`,{
            responseType:"blob"
        })
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Failed to generate resume PDF";
        console.error("Generate Resume PDF Error:", errorMessage);
        throw new Error(errorMessage);
    }
}