import { FaCheck } from "react-icons/fa";
import type { ITask } from ./"TaskManager";

type Props = {
    tasks: ITask[];
    toggleTaskCompletion: (id: number) => void;
};

const TaskItem = ({
    task,
    toggleTaskCompletion,
}: {
    task: ITsak[];
    toggleTaskCompletion: (id: number) => void;
}) => {
    return (
        <li
            key={task.id}
            onClick={() => toggleTaskCompletion(task.id)}
            className={'p-4 flex justify-between items-center cursor-pointer transition hover:bg-gray-50 ${
                task.st_status ? "bg-green-50 " : ""
            }`}
        >   
            <div className=""
    )
}