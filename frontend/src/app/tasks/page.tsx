"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ITask from "../interfaces/ITask";
import { API } from "../shared/api/api";

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const getTasks = async (token: string) => {
    try {
      const response = await API.post("/tasks/get", { token });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
    if (token) getTasks(token);
  }, []);

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  return (
    <div className="w-full">
      <h1 className="text-4xl text-blue-400 text-center mb-4">My tasks</h1>
      <ol className="flex gap-4 flex-col bg-white w-full max-w-md m-auto p-4 rounded">
        {tasks.map((task, i) => (
          <li
            key={i}
            className="bg-white border border-blue-400 p-3 rounded-lg"
          >
            <div>
              <h3 className="text-gray-700 text-lg">☆ {task.title}</h3>
              <p className="text-gray-600">{task.description}</p>
            </div>
          </li>
        ))}
      </ol>
      <button className="text-7xl rounded-full bg-blue-400 w-20 h-20 absolute right-3 bottom-3">
        +
      </button>
    </div>
  );
}
