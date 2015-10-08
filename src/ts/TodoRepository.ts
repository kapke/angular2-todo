import Todo from './Todo';

class TodoRepository {
    private todos:Todo[] = [
                {title:'First todo. Some text.',isDone: true, image: 'http://lorempixel.com/320/240'},
                {title:'Second todo', isDone: true},
                {title:'Third todo', isDone: true}
            ].map((todo) => {
                return new Todo(todo.title, todo.isDone, todo.image||'');
            });

    constructor () {
    }

    findTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos);
    }
}

export default TodoRepository;