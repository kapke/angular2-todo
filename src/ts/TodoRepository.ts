import {Injectable} from 'angular2/angular2';
import LocalStorage from './storage/LocalStorage';
import Todo from './Todo';
import Tag from './Tag';

const TODOS_KEY = 'todos';

@Injectable()
class TodoRepository {
    private todos:Todo[] = [
                {title: 'First todo. Some text.',isDone: true, tags: ['pretty'], image: 'http://lorempixel.com/320/240', isStarred: false},
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
            ].map(Todo.fromObject);
    private filters = {
        starred: (todo:Todo):boolean => {return todo.isStarred;},
        notStarred: (todo:Todo):boolean => {return !todo.isStarred;},
        includesText: function (text:string, todo:Todo):boolean {return todo.title.includes(text);},
        isTaggedByAll: function (tags:Tag[], todo:Todo):boolean {
            return tags.reduce((previous, tag) => {
                return previous && todo.isTaggedBy(tag);
            }, true);
        }
    };

    public constructor (private storage:LocalStorage) {
        this.fetchTodos();
    }

    public addTodo (todo:Todo):Promise<any> {
        this.todos.push(todo);
        this.pushTodos();
        return Promise.resolve(null);
    }

    public findStarredTodos (filterText = '', filterTags = []):Promise<Todo[]> {
        return this.findTodos([
            this.filters.starred,
            this.filters.includesText.bind(null, filterText),
            this.filters.isTaggedByAll.bind(null, filterTags)
        ]);
    }

    public findUnstarredTodos (filterText = '', filterTags = []):Promise<Todo[]> {
        return this.findTodos([
            this.filters.notStarred,
            this.filters.includesText.bind(null, filterText),
            this.filters.isTaggedByAll.bind(null, filterTags)
        ]);
    }

    public findUsedTags ():Promise<Tag[]> {
        let usedTags:{[name:string]:boolean} = {};
        this.todos.forEach((todo:Todo) => {
            todo.tags.forEach((tag:Tag) => {
                usedTags[tag.toString()] = true;
            });
        });

        return Promise.resolve(Object.keys(usedTags).map(name => new Tag(name)));
    }

    private findTodos (filters:Array<(Todo) => boolean>):Promise<Todo[]> {
        let todos = this.todos;
        filters.forEach((filter) => {
            todos = todos.filter(filter);
        });
        return Promise.resolve(todos);
    }

    private fetchTodos () {
        const fetchedTodos = this.storage.getData(TODOS_KEY);
        if(fetchedTodos) {
            this.todos = (<any[]>fetchedTodos).map(Todo.fromObject);
        }
    }

    private pushTodos () {
        this.storage.saveData(TODOS_KEY, this.todos);
    }
}

export default TodoRepository;