export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE";

export interface Todo {
    id: string;
    description: string;
    status: TodoStatus;
}

export const TodoFormValues: TodoStatus[] = ["OPEN", "IN_PROGRESS", "DONE"];