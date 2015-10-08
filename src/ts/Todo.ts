import Tag from './Tag';

class Todo {
    public title:string;
    public isDone:boolean;
    public image:string;
    public tags:Tag[];

    constructor (title:string, isDone:boolean = false, image:string = '', tags:Tag[] = []) {
        this.title = title;
        this.isDone = isDone;
        this.image = image;
        this.tags = tags;
    }

    public compareByTitle (anotherTodo:Todo):number {
        return this.title.localeCompare(anotherTodo.title);
    }

    public compareByStatus (anotherTodo:Todo):number {
        return ~~this.isDone - ~~anotherTodo.isDone;
    }
}

export default Todo;