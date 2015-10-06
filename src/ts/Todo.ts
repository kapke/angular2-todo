class Todo {
    public title:string;
    public isDone:boolean;

    constructor (title:string, isDone:boolean = false) {
        this.title = title;
        this.isDone = isDone;
    }

    public compareByTitle (anotherTodo:Todo):number {
        return this.title.localeCompare(anotherTodo.title);
    }

    public compareByStatus (anotherTodo:Todo):number {
        return !!this.isDone - !!anotherTodo.isDone;
    }
}

export default Todo;