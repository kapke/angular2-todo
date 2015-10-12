class Tag {
    private name:string;

    get Name () {
        return this.name;
    }

    constructor (name: string) {
        this.name = name;
    }

    public toString () {
        return this.name;
    }

    public eq (tag:Tag):boolean {
        return (this.toString() == tag.toString());
    }
}

export default Tag;