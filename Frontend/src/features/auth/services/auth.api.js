import axios from "axios"
import api from "../../../api/axios";


export async function register({username , email , password}){
    try {
        const response = await api.post('/auth/register',{
            username,email,password
        },{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Registration failed";
        console.error("Registration error:", errorMessage);

        throw new Error(errorMessage);
    }
}

export async function login({email,password}){
    try {
        const response=await api.post("/auth/login",{
            email,password
        },{
            withCredentials:true
        })
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Login failed";
        console.error("Login error:", errorMessage);
        throw new Error(errorMessage);
    }
}

export async function logout(){
    try {
        const response=await api.get("/auth/logout")
        return response.data
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Logout failed";
        console.error("Logout error:", errorMessage);
        throw new Error(errorMessage);
    }
}

export async function getMe() {

    try {

        const response = await api.get("/auth/get-me")
        return response.data

    } catch (err) {
        console.log(err)
    }

}