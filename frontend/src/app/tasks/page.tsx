"use client";
import {
  faArrowDownShortWide,
  faCheck,
  faCheckCircle,
  faFilePen,
  faPen,
  faPenSquare,
  faPenToSquare,
  faPlus,
  faRemove,
  faRightFromBracket,
  faTrash,
  faX,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ITask from "../interfaces/ITask";
import { inputStyle } from "../page";
import { API } from "../shared/api/api";

export default function Tasks() {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState("");
  const [user] = useState(localStorage.getItem("user"));
  const [taskId, setTaskId] = useState("");
  const token = localStorage.getItem("token");
  const getTasks = async (token: string) => {
    try {
      const response = await API.get(`/tasks/${token}/`);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const greetingsMessage = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 6 && hour < 12) {
      return "Bom dia,";
    } else if (hour >= 12 && hour < 18) {
      return "Boa tarde,";
    } else {
      return "Boa noite,";
    }
  };
  useEffect(() => {
    if (!token) router.push("/");
    if (token) getTasks(token);
  }, []);

  const addOrEditTask = async () => {
    if (token) {
      if (form === "add") {
        try {
          const newTask = await API.post(`/tasks/${token}`, {
            title,
            description,
          });
          console.log(newTask);
          setTitle("");
          setDescription("");
        } catch (error) {
          console.log(error);
        }
      }

      if (form === "edit" && taskId) {
        try {
          const editedTask = await API.patch(`/tasks/${taskId}/${token}`, {
            title,
            description,
          });
          console.log(editedTask);
        } catch (error) {
          console.log(error);
        }
      }

      setForm("");
      await getTasks(token);
    }
  };

  const deleteOneTask = async (taskId: string) => {
    if (token) {
      try {
        await API.delete(`/tasks/${taskId}/${token}`);
        await getTasks(token);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex sm:rounded-3xl bg-transparent sm:my-4 max-sm:items-center justify-center w-full max-w-md">
      {form && (
        <form
          className="right-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-50 w-full sm:max-w-lg sm:rounded-3xl flex flex-col py-8 shadow"
          onSubmit={addOrEditTask}
        >
          <button
            className="absolute right-3 top-1 text-xl"
            onClick={() => {
              setTitle("");
              setDescription("");
              setForm("");
            }}
            type="button"
          >
            <FontAwesomeIcon
              className="text-sky-900 m-auto"
              icon={faXmarkCircle}
              size="1x"
            />
          </button>
          <div className="m-auto flex flex-col gap-6 w-full px-4">
            <div className="">
              <label className="uppercase text-sm text-gray-400">título*</label>
              <input
                placeholder="Digite aqui o título da tarefa"
                type="text"
                className="text-gray-500 outline-none w-full shadow py-2 placeholder-gray-500 rounded bg-sky-100 px-2 focus:shadow-lg"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <label className="uppercase text-sm text-gray-400">
                descrição*
              </label>
              <textarea
                placeholder="Digite aqui a descrição da tarefa"
                className="text-gray-500 outline-none w-full shadow py-2 placeholder-gray-500 rounded bg-sky-100 px-2 focus:shadow-lg"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <button className="uppercase text-gray-50 bg-sky-900 p-3 text-center rounded-3xl shadow-md hover:brightness-90 w-fit m-auto px-12">
              adicionar
            </button>
          </div>
        </form>
      )}
      <div
        className={`w-full bg-sky-900 flex-1 flex-col sm:rounded-3xl shadow-lg sm:max-w-lg sm:px-2 py-10 min-h-screen ${
          form && "blur-sm"
        }`}
      >
        <div className="px-10 mb-10">
          <h2 className="text-gray-50 text-xl">{greetingsMessage()}</h2>
          <h1 className="text-gray-50 text-2xl">{user}</h1>
        </div>
        <ol className="flex gap-4 flex-col bg-gray-50 w-full max-w-md m-auto p-4 rounded-3xl h-fit">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-gray-100 shadow p-3 rounded-3xl hover:scale-110 hover:shadow-2xl"
            >
              <div className="relative">
                <button
                  className="rounded-full w-6 h-6 flex items-center justify-center absolute hover:scale-110 hover:brightness-200"
                  onClick={() => {
                    setForm("edit");
                    setTaskId(task._id);
                    setTitle(task.title);
                    setDescription(task.description);
                  }}
                >
                  <FontAwesomeIcon
                    className="text-sky-900"
                    icon={faPen}
                    size="1x"
                  />
                </button>
                <div className="pl-7">
                  <h3 className="uppercase text-gray-700 text-lg font-bold">
                    {task.title}
                  </h3>
                  <p className="text-gray-600 break-words">
                    {task.description}
                  </p>
                </div>
                <button
                  className="absolute top-1/2 right-0 -translate-y-1/2 h-6 w-6 rounded-full hover:scale-110 hover:brightness-200"
                  onClick={() => deleteOneTask(task._id)}
                >
                  <FontAwesomeIcon
                    className="text-red-800 "
                    icon={faTrash}
                    size="1x"
                  />
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div
        className={`bg-sky-900 max-sm:shadow-lg sm:bg-transparent sm:rounded-r-3xl p-1 flex gap-3 items-center max-sm:bottom-0 max-sm:fixed w-full max-sm:justify-center sm:flex-col sm:max-w-fit ${
          form && "blur-sm"
        }`}
      >
        <button
          className="text-gray-50 sm:rounded-full w-12 h-12 sm:hover:scale-110 transition-all delay-75 sticky top-1 text-2xl shadow-xl bg-sky-900"
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
        >
          <FontAwesomeIcon
            className="text-gray-50 m-auto"
            icon={faRightFromBracket}
            size="1x"
          />
        </button>
        <button
          className="text-gray-50 sm:rounded-full w-12 h-12 sm:hover:scale-110 transition-all delay-75 sticky top-16 text-2xl shadow-xl bg-sky-900"
          onClick={() => setForm("add")}
        >
          <FontAwesomeIcon
            className="text-gray-50 m-auto"
            icon={faPlus}
            size="1x"
          />
        </button>
      </div>
    </div>
  );
}
