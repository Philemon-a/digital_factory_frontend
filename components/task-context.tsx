import { createContext, useCallback, useContext, useEffect, useState } from "react";

export interface Task {
    _id: string,
    title: string,
    user: string
}

interface TaskProps {
    tasks: Array<Task>;
    setTasks: React.Dispatch<React.SetStateAction<Array<Task>>>
    task: string
    setTask: React.Dispatch<React.SetStateAction<string>>
    addTask: () => Promise<void>
    deleteTask: (task: Task) => Promise<void>
    updateTask: (task: Task | undefined) => Promise<void>
    showAlert: boolean;
    triggerAlert: (message: string) => void;
    alertMessage: string;
}


const TaskContext = createContext<TaskProps | null>(null)

function TasksProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [task, setTask] = useState('')
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const triggerAlert = useCallback((message: string) => {
        setAlertMessage(message);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }, []);

    const addTask = useCallback(async () => {
        if (task.length === 0){
            return
        }
        try {
            await fetch('http://localhost:4444/add-task', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: task })
            });
            setTasks((prev) => [...prev, { _id: Date.now().toString(), title: task, user: 'currentUser' }]);
            setTask('');
            triggerAlert('Task added successfully!');
        } catch (error) {
            console.error(error);
            triggerAlert('Failed to add task.');
        }
    }, [task, triggerAlert]);

    const deleteTask = useCallback(async (task: Task) => {
        try {
            await fetch(`http://localhost:4444/delete-task/${task._id}`, {
                method: 'DELETE'
            });
            setTasks((prev) => prev.filter((t) => t._id !== task._id));
            triggerAlert('Task deleted successfully!');
        } catch (error) {
            console.error(error);
            triggerAlert('Failed to delete task.');
        }
    }, [triggerAlert]);
    
    const updateTask = useCallback(async (task: Task | undefined) => {
        if (!task) return;
        try {
            await fetch(`http://localhost:4444/update-task/${task._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: task.title })
            });
            setTasks((prev) =>
                prev.map((t) => (t._id === task._id ? { ...t, title: task.title } : t))
            );
            triggerAlert('Task updated successfully!');
        } catch (error) {
            console.error(error);
            triggerAlert('Failed to update task.');
        }
    }, [triggerAlert]);

    useEffect(() => {
        const fetchTasks = async () => {
            await fetch('http://localhost:4444/get-tasks', {
                credentials: 'include'
            })
                .then((res) => res.json())
                .then(data => setTasks(data))
        }
        fetchTasks()
    }, [setTasks])


    return (
        <TaskContext.Provider
            value={{
                tasks,
                setTasks,
                task,
                setTask,
                addTask,
                deleteTask,
                updateTask,
                showAlert,
                triggerAlert,
                alertMessage
            }}
        >
            {children}
            {showAlert && (
                <div className="fixed bottom-4 right-4 p-4 bg-green-500 text-white rounded shadow">
                    {alertMessage}
                </div>
            )}
        </TaskContext.Provider>
    )
}

function useTasks() {
    const context = useContext(TaskContext);
    if (context === null) {
        throw new Error()
    }
    return context
}

export { useTasks, TasksProvider }

<div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:text-gray-400 dark:bg-gray-800" role="alert">
    <div className="inline-flex items-center justify-center shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <span className="sr-only">Check icon</span>
    </div>
    <div className="ms-3 text-sm font-normal">Item moved successfully.</div>
    <button type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
        </svg>
    </button>
</div>

