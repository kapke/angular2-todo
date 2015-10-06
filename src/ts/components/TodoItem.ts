///<reference path="../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import Todo from '../Todo';

@Component({
    selector: 'todo-item',
    properties: ['todo'],
})
@View({
    template: `
        <div (click)="toggleIsDone()">{{ todo.isDone}} {{ todo.title }}</div>
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