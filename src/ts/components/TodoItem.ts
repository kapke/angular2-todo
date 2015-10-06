///<reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgClass} from 'angular2/angular2';
import Todo from '../Todo';

@Component({
    selector: 'todo-item',
    properties: ['todo'],
})
@View({
    directives: [NgClass],
    styleUrls: ['src/style/todo-item.css'],
    template: `
        <div (click)="toggleIsDone()" [ng-class]="{done: todo.isDone}">{{ todo.title }}</div>
    `
})
class TodoItem {
    public todo:Todo;

    constructor () {
        this.todo = null;
    }

    toggleIsDone () {
        this.todo.isDone = !this.todo.isDone;
    }
}

export default TodoItem;