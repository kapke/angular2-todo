import Todo from './Todo';

class TodoRepository {
    private todos:Todo[] = [
            ['First todo', true],
            ['Second todo', false],
            ['Third todo', true]
        ].map((todo) => {
            return new Todo(todo[0], todo[1]);
        });

    constructor () {
    }

    findTodos ():Promise<Todo[]> {
        return Promise.resolve(this.todos);
    }
}

export default TodoRepository;