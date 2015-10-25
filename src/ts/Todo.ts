import Tag from './Tag';

class Todo {
    public title:string;
    public isDone:boolean;
    public isStarred:boolean;
    public image:string;
    public tags:Tag[];

    public static empty ():Todo {
        return new Todo('');
    }

    public static fromObject (todo:any):Todo {
        const getTag = (name) => {
            if (typeof name == 'object') {
                return new Tag(name.name);
            } else if (typeof name == 'string') {
                return new Tag(name);
            }
        };

        const tags = todo.tags ? todo.tags.map(getTag) : [];
        return new Todo(todo.title, todo.isDone, todo.image || '', tags, todo.isStarred);
    }

    constructor (title:string, isDone:boolean = false, image:string = '', tags:Tag[] = [], isStarred:boolean = false) {
        this.title = title;
        this.isDone = isDone;
        this.isStarred = isStarred;
        this.image = image;
        this.tags = tags;
    }

    public compareByTitle (anotherTodo:Todo):number {
        return this.title.localeCompare(anotherTodo.title);
    }

    public compareByStatus (anotherTodo:Todo):number {
        return ~~this.isDone - ~~anotherTodo.isDone;
    }

    public isTaggedBy (tagToCheck:Tag) {
        return this.tags.reduce((previous, tag) => {
            return previous || tagToCheck.eq(tag);
        }, false);
    }

    public update (another:Todo) {
        this.title = another.title;
        this.isDone = another.isDone;
        this.isStarred = another.isStarred;
        this.image = another.image;
        this.tags = another.tags.splice(0);
    }
}

export default Todo;