class Note {
    public title:string;
    public isDone:boolean;

    constructor (title:string, isDone:boolean = false) {
        this.title = title;
        this.isDone = isDone;
    }
}

export default Note;