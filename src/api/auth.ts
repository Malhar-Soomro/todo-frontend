import axios from "axios";

const authInstance = axios.create({baseURL:"https://todo-backend-1v3r.onrender.com/api/auth"});

export function login(email:string, password:string){

    return authInstance.post("/login", {email, password});
}

export function register(firstName:string, lastName:string, email:string, password:string){

    return authInstance.post("/register", {firstName, lastName, email, password});
}

export function getUser(){
    return authInstance.get("/user", {headers:{
        "Authorization":"Bearer "+sessionStorage.getItem("token")
    }});
}
