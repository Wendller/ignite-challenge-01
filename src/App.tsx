import Header from "./Header";
import TaskList from "./TaskList";
import { v4 } from "uuid";
import { PlusCircle } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { TaskProps } from "./Task";

import styles from "./App.module.css";

function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const isNewTaskEmpty = newTaskText.length === 0;

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(event.target.value);
  }

  function onCreateTask() {
    setNewTaskText("");

    const newTask: TaskProps = {
      id: v4(),
      content: newTaskText,
      isFinished: false,
      handleDeleteTask: onDeleteTask,
      handleFinishTask: onFinishTask,
    };

    setTasks([newTask, ...tasks]);
  }

  function onDeleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksWithoutDeletedOne);
  }

  function onFinishTask(taskId: string) {
    const tasksWithUpdatedTask = tasks.map((task) => {
      if (task.id === taskId) return { ...task, isFinished: !task.isFinished };
      return task;
    });

    setTasks(tasksWithUpdatedTask);
  }

  return (
    <>
      <Header />

      <main className={styles.main}>
        <form className={styles.form}>
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => handleNewTask(e)}
            placeholder="Adicione uma nova tarefa"
          />
          <button
            type="button"
            onClick={onCreateTask}
            disabled={isNewTaskEmpty}
          >
            Criar <PlusCircle size={20} />
          </button>
        </form>
        <TaskList
          tasks={tasks}
          handleDeleteTask={onDeleteTask}
          handleFinishTask={onFinishTask}
        />
      </main>
    </>
  );
}

export default App;
