import { isTodo, showTodos } from "@/lib/todo";
import styles from "./Todo.module.css";

/**
 * Pending content. In development it renders a small dashed marker so it's
 * impossible to miss; in production it renders nothing.
 */
export function Todo({ value }: { value: string }) {
  if (!showTodos) return null;
  return (
    <span className={styles.todo} title="src/content — TODO(nacho)">
      {value.replace("TODO(nacho):", "TODO ·")}
    </span>
  );
}

/** Renders the value, or a <Todo> marker (dev) / nothing (prod) when it's pending. */
export function Maybe({ value }: { value: string }) {
  return isTodo(value) ? <Todo value={value} /> : <>{value}</>;
}
