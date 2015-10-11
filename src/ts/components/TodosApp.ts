/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgClass, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import TodoItem from './TodoItem';
import Todo from '../Todo';
import TodoRepository from '../TodoRepository';

interface SortingOptionDescriptor {
    title: string,
    //0 - not sorting, 1 - increasing, -1 - decreasing
    value:{property:string, direction: number}
}

@Component({
    selector: 'todos-app'
})
@View({
    directives: [NgFor, NgClass, NgIf, TodoItem, FORM_DIRECTIVES],
    styleUrls: ['src/style/todos-app.css'],
    templateUrl: 'src/template/todos-app.html'
})
class TodosApp {
    public todos:Array<Todo>;
    private starredTodos:Todo[];
    public sortingOptions:SortingOptionDescriptor[] = [];

    constructor (todoRepository:TodoRepository) {
        ['title', 'status'].forEach((name) => {
            this.sortingOptions.push(this.getSortingOptionDescriptor(name, 1));
            this.sortingOptions.push(this.getSortingOptionDescriptor(name, -1));
        });
        todoRepository.findUnstarredTodos().then((todos) => {
            this.todos = todos;
        });
        todoRepository.findStarredTodos().then((todos) => {
            this.starredTodos = todos;
        })
    }

    public sortTodos ($event) {
        if($event.target.value) {
            const [property, direction] = $event.target.value.split(':');
            this.sortTodosBy(property, direction);
        }
    }

    private sortTodosBy (name:string, direction:number) {
        function todoComparator (todo1:Todo, todo2:Todo) {
            if (name == 'title') {
                return todo1.compareByTitle(todo2) * direction;
            } else if (name == 'status') {
                return todo1.compareByStatus(todo2) * direction;
            }
            return 0;
        }

        this.todos = this.todos.sort(todoComparator);
        this.starredTodos = this.starredTodos.sort(todoComparator);
    }

    private getSortingOptionDescriptor (name, direction) {
        const suffix = direction == 1 ? 'ascending' : 'descending';

        return {
            title: name + ' ' + suffix, value: {
                property: name, direction: direction
            }
        }
    }
}
export default TodosApp;
