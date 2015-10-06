/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgClass} from 'angular2/angular2';
import TodoItem from './TodoItem';
import Todo from '../Todo';
import TodoRepository from '../TodoRepository';

@Component({
    selector: 'todos-app'
}) @View({
    directives: [NgFor, NgClass, TodoItem],
    styleUrls: ['src/style/todos-app.css'],
    templateUrl: 'src/template/todos-app.html'
})
class TodosApp {
    todos:Array<Todo>;
    sortingOptions = {
        title: 0,
        status: 0
    };

    constructor (todoRepository:TodoRepository) {
        todoRepository.findTodos().then((todos) => {
            this.todos = todos;
        });
    }

    public sortTodosBy (name:string) {
        this.updateSortOptions(name);
        this.sortTodos();
    }

    private sortTodos () {
        this.todos = this.todos.sort((todo1:Todo, todo2:Todo) => {
            if(this.sortingOptions.title) {
                return todo1.compareByTitle(todo2)*this.sortingOptions.title;
            }
            if(this.sortingOptions.status) {
                return todo1.compareByStatus(todo2)*this.sortingOptions.status;
            }
            return 0;
        });
    }

    private updateSortOptions (name:string) {
        //0 - not sorting, 1 - increasing, -1 - decreasing
        const currentValue = this.sortingOptions[name];
        let newValue = 0;

        switch(currentValue) {
            case -1:
                newValue = 0;
                break;
            case 0:
                newValue = 1;
                break;
            case 1:
                newValue = -1;
                break;
        }

        this.sortingOptions[name] = newValue;
    }
}
export default TodosApp;
