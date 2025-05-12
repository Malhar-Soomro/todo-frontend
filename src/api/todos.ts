import axios from "axios";

const authInstance = axios.create({baseURL:"https://todo-backend-1v3r.onrender.com/api/todos"});

// ensure only authenticated users can interact with todos

authInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});


export function addTodo(title:string, description:string){

    return authInstance.post("/", {title, description});
}

export function deleteTodo(todoId:string){

    return authInstance.delete("/"+todoId);
}

export function getTodos(){

    return authInstance.get("/");
}

export function updateTodo(todoId:string, todo:Record<string,any>){

  return authInstance.put("/"+todoId, todo);
}