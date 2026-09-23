/** Content that still needs real data starts with this prefix. */
export const TODO_PREFIX = "TODO(nacho):";

export const isTodo = (value: string | undefined | null): boolean =>
  !value || value.trim().startsWith(TODO_PREFIX);

/** True when pending content should be visibly marked (dev only). */
export const showTodos = process.env.NODE_ENV !== "production";

/** Keep only values that are real content. */
export const filled = <T extends string>(values: T[]): T[] => values.filter((v) => !isTodo(v));
