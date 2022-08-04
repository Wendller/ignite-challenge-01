import { Trash, Circle, CheckCircle } from "phosphor-react";
import styles from "./Task.module.css";

export type TaskProps = {
  id: string;
  content: string;
  isFinished: boolean;
  handleDeleteTask: (taskId: string) => void;
  handleFinishTask: (taskId: string) => void;
};

export default function Task({
  id,
  content,
  isFinished,
  handleDeleteTask,
  handleFinishTask,
}: TaskProps) {
  return (
    <article className={styles.taskWrapper}>
      <button
        className={styles.checkButton}
        onClick={() => handleFinishTask(id)}
      >
        {isFinished ? (
          <CheckCircle size={20} style={{ color: "#5e60ce" }} />
        ) : (
          <Circle size={20} />
        )}
      </button>
      <p
        className={isFinished ? styles.contentFinished : styles.content}
        onClick={() => handleFinishTask(id)}
      >
        {content}
      </p>
      <button
        className={styles.deleteButton}
        onClick={() => handleDeleteTask(id)}
      >
        <Trash size={20} />
      </button>
    </article>
  );
}
