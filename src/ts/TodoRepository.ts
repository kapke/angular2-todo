import Todo from './Todo';
import Tag from './Tag';

class TodoRepository {
    private todos:Todo[] = [
                {title: 'First todo. Some text.',isDone: true, tags: [], image: 'http://lorempixel.com/320/240'},
                {title: 'Second todo', isDone: true, tags: ['second', 'pretty'], image: ''},
                {title: 'Third todo', isDone: true, tags: [], image: ''},
                {title: 'Advanced todo with a lot of content: tags and image.', isDone: false, tags: ['advanced', 'big', 'image'], image: 'http://lorempixel.com/360/240'},
                {title: 'Some important todo, so I\'m starred', isDone: false, tags: [], isStarred: true},
                {title: 'Another important todo, but this one is done', isDone: true, isStarred: true}
            ].map((todo) => {
                function getTag (name) {
                    return new Tag(name);
                }

                const tags = todo.tags?todo.tags.map(getTag) : [];
                return new Todo(todo.title, todo.isDone, todo.image||'', tags, todo.isStarred);
            });

    constructor () {
    }

    public findAllTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos);
    }

    public findStarredTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos.filter((todo) => {return todo.isStarred;}));
    }

    public findUnstarredTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos.filter((todo) => {return !todo.isStarred;}));
    }
}

export default TodoRepository;