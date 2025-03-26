"use client"
import { Task, TasksProvider, useTasks } from "@/components/task-context";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";

function TaskInput({
  taskToEdit,
  setTaskToEdit
}: {
  taskToEdit: Task | undefined,
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | undefined>>
}) {
  const { task, setTask, addTask, updateTask } = useTasks();

  return (
    <div className="flex items-start gap-4 sm:w-[425px] w-full mx-4">
    {taskToEdit ? (
      <textarea
      value={taskToEdit.title}
      onChange={(e) => setTaskToEdit((prev) => {
        if (prev) {
          return {...prev, title: e.target.value}
        }
      })}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />
    ) :<textarea
      value={task}
      onChange={(e) => setTask(e.target.value)}
      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." />}
      {taskToEdit ? (
        <button
        onClick={async () => {
          await updateTask(taskToEdit).then(() => setTaskToEdit(undefined))
        }}
        className="bg-blue-600 text-white rounded-md px-3 py-1.5 ">Save</button>
      ) :<button
        onClick={addTask}
        className="bg-blue-600 text-white rounded-md px-3 py-1.5 "> Add</button>}
    </div>
  )
}

function TaskBox({
  task,
  setTaskToEdit
}: {
  task: Task,
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | undefined>>
}) {
  const {deleteTask} = useTasks()

  return (
    <div className="flex-1 border-b border-b-gray-300 p-3 flex justify-between items-center">
      <h3 className="text-lg font-semibold text-black">{task.title}</h3>
      <div className="flex flex-row items-center gap-2">
        <button onClick={() => deleteTask(task)}>
          <Trash color="red" />
        </button>
        <button onClick={() => setTaskToEdit(task)}>
          <Pencil color="blue" />
        </button>
      </div>
    </div>
  )
}
function Tasks({
  setTaskToEdit
}: {
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | undefined>>
}){
  const { tasks } = useTasks();
 
  return(
    <div className="w-full sm:w-[425px] flex-1 bg-white rounded-md overflow-y-scroll">
      {
        tasks && tasks.length > 0 ? tasks.map((task) => (
          <TaskBox setTaskToEdit={setTaskToEdit} key={task._id} task={task} />
        )) : 
        (
          <div className="flex flex-1 h-full justify-center items-center text-black">
            NO TASKS
          </div>
        )
      }
    </div>
  )
}



export default function Home() {
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined)

  return (
    <TasksProvider>
      <div style={{
        backgroundImage: "url('https://images.pexels.com/photos/31297026/pexels-photo-31297026/free-photo-of-peaceful-sunset-over-ohrid-lake-and-snowy-mountains.jpeg?auto=compress&cs=tinysrgb&w=1200')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }} className="min-h-screen flex-1 flex gap-10 flex-col items-center h-full py-20">
      <TaskInput taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
        <Tasks setTaskToEdit={setTaskToEdit} />
      </div>
    </TasksProvider>
  );
}
