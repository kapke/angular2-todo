/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import TodoItem from './TodoItem';
import Todo from '../Todo';

@Component({
    selector: 'todos-app'
})
@View({
    directives: [NgFor, TodoItem],
    template: `
        <div>
            <todo-item *ng-for="#todo of todos" [todo]="todo"></todo-item>
        </div>`
})
class TodosApp {
    todos: Array<Todo>;

    constructor () {
        this.todos = ['Todo', 'Second todo'].map((title:string) => {
            return new Todo(title, true);
        });

        setTimeout(() => {
            console.log('ala ma kota');
            this.todos.push(new Todo('ala ma kota'));
        }, 1000);
    }
}
export default TodosApp;
