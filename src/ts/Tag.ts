class Tag {
    private name:string;

    get Name () {
        return this.name;
    }

    constructor (name: string) {
        this.name = name;
    }

    toString () {
        return this.name;
    }
}

export default Tag;