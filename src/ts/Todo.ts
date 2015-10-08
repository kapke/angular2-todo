class Todo {
    public title:string;
    public isDone:boolean;
    public image:string;

    constructor (title:string, isDone:boolean = false, image:string = '') {
        this.title = title;
        this.isDone = isDone;
        this.image = image;
    }

    public compareByTitle (anotherTodo:Todo):number {
        return this.title.localeCompare(anotherTodo.title);
    }

    public compareByStatus (anotherTodo:Todo):number {
        return ~~this.isDone - ~~anotherTodo.isDone;
    }
}

export default Todo;