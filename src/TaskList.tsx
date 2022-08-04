import Clipboard from "./assets/clipboard.svg";
import Task, { TaskProps } from "./Task";
import styles from "./TaskList.module.css";

export type TaskListProps = {
  tasks: TaskProps[];
  handleDeleteTask: (taskId: string) => void;
  handleFinishTask: (taskId: string) => void;
};

export default function TaskList({
  tasks,
  handleDeleteTask,
  handleFinishTask,
}: TaskListProps) {
  const tasksCount = tasks.length;
  const finishedTasks = tasks.reduce((total, task) => {
    if (task.isFinished) return (total += 1);
    return total;
  }, 0);

  return (
    <div className={styles.wrapper}>
      <header className={styles.listHeader}>
        <div className={styles.createdScore}>
          <strong>Tarefas criadas</strong>
          <span>{tasksCount}</span>
        </div>

        <div className={styles.finishedScore}>
          <strong>Concluídas</strong>
          <span>
            {finishedTasks} de {tasksCount}
          </span>
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className={styles.emptyList}>
          <img src={Clipboard} />
          <strong>Você ainda não tem tarefas cadastradas</strong>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      ) : (
        tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            isFinished={task.isFinished}
            content={task.content}
            handleDeleteTask={handleDeleteTask}
            handleFinishTask={handleFinishTask}
          />
        ))
      )}
    </div>
  );
}
