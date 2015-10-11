import Todo from './Todo';
import Tag from './Tag';

class TodoRepository {
    private todos:Todo[] = [
                {title: 'First todo. Some text.',isDone: true, tags: [], image: 'http://lorempixel.com/320/240', isStarred: false},
                {title: 'Second todo', isDone: true, tags: ['second', 'pretty'], image: '', isStarred: false},
                {title: 'Third todo', isDone: true, tags: [], image: '', isStarred: false},
                {
                    title: 'Advanced todo with a lot of content: tags and image.',
                    isDone: false,
                    tags: ['advanced', 'big', 'image'],
                    image: 'http://lorempixel.com/360/240',
                    isStarred: false
                },
                {title: 'Some important todo, so I\'m starred', isDone: false, tags: [], isStarred: true, image: ''},
                {title: 'Another important todo, but this one is done', isDone: true, isStarred: true, tags: [], image: ''}
            ].map((todo) => {
                function getTag (name) {
                    return new Tag(name);
                }

                const tags = todo.tags?todo.tags.map(getTag) : [];
                return new Todo(todo.title, todo.isDone, todo.image||'', tags, todo.isStarred);
            });
    private filters = {
        starred: (todo:Todo):boolean => {return todo.isStarred;},
        notStarred: (todo:Todo):boolean => {return !todo.isStarred;},
        includesText: function (text:string, todo:Todo):boolean {return todo.title.includes(text);}
    };

    constructor () {
    }

    public findAllTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos);
    }

    public findStarredTodos (filter = ''):Promise<Todo[]> {
        return this.findTodos([this.filters.starred, this.filters.includesText.bind(null, filter)]);
    }

    public findUnstarredTodos (filter = ''):Promise<Todo[]> {
        return this.findTodos([this.filters.notStarred, this.filters.includesText.bind(null, filter)]);
    }

    private findTodos (filters:Array<(Todo) => boolean>):Promise<Todo[]> {
        let todos = this.todos;
        filters.forEach((filter) => {
            todos = todos.filter(filter);
        });
        return Promise.resolve(todos);
    }
}

export default TodoRepository;