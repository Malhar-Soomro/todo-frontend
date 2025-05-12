import {addTodo, getTodos, deleteTodo as dl, updateTodo} from "@/api/todos";
import Layout from "@/components/layout";
import {useGetApi, useUploadApi} from "@/hooks/useApi";
import React, {useState} from "react";
import Swal from "sweetalert2";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const Todos: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addApi = useUploadApi();
  const getApi = useGetApi(() => getTodos());
  const deleteApi = useUploadApi();
  const updateApi = useUploadApi();

  const handleAddTodo = () => {
    if (!title.trim()) return;

    addApi
      .makeRequest(() => addTodo(title, description))
      .then(() => {
        setTitle("");
        setDescription("");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Todo added successfully",
          timer: 1000,
        });
        getApi.makeRequest();
      })
      .catch(() => {
          Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
          timer: 1000,
        });
      });
  };

  const toggleTodo = (id: string, completed: boolean) => {
    updateApi
      .makeRequest(() => updateTodo(id, {completed}))
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: `Todo ${completed? "marked":"unmarked"} successfully`,
          timer: 1000,
        });
        getApi.makeRequest();
      })
      .catch(() => {
          Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
          timer: 1000,
        });
      });
  };

  const deleteTodo = (id: string) => {
    deleteApi
      .makeRequest(() => dl(id))
      .then(() => {
         Swal.fire({
          icon: "success",
          title: "Success",
          text: "Todo deleted successfully",
          timer: 1000,
        });
        getApi.makeRequest();
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
          timer: 1000,
        });
      });
  };


  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-sans">
        <h1 className="text-5xl font-extrabold mb-8">Just do it.</h1>

        <div className="w-full max-w-md bg-white text-black p-6 rounded-xl shadow-lg space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="w-full p-3 rounded-lg border border-gray-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            disabled={addApi.isLoading}
            onClick={handleAddTodo}
            className="w-full bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
          >
            Add Task
          </button>
        </div>

        <div className="mt-10 w-full max-w-md space-y-4">
          {getApi?.data?.map((todo: Todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-800/80"
            >
              <div>
                <h3 className="text-lg font-semibold">{todo.title}</h3>
                <p className="text-lg font-semibold">{todo.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleTodo(todo._id, e.target.checked)}
                  className="h-5 w-5 to-blue-500"
                  title="Mark todo"
                />
                <button
                  disabled={deleteApi.isLoading}
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-400 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Todos;
