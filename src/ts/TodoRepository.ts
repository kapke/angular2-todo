import Todo from './Todo';
import Tag from './Tag';

class TodoRepository {
    private todos:Todo[] = [
                {title:'First todo. Some text.',isDone: true, image: 'http://lorempixel.com/320/240'},
                {title:'Second todo', isDone: true, tags: ['second', 'pretty']},
                {title:'Third todo', isDone: true},
                {title: 'Advanced todo with a lot of content: tags and image.', isDone: false, tags: ['advanced', 'big', 'image'], image: 'http://lorempixel.com/360/240'}
            ].map((todo) => {
                function getTag (name) {
                    return new Tag(name);
                }

                const tags = todo.tags?todo.tags.map(getTag) : [];
                return new Todo(todo.title, todo.isDone, todo.image||'', tags);
            });

    constructor () {
    }

    findTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos);
    }
}

export default TodoRepository;