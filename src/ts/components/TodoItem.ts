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
    templateUrl: 'src/template/todo-item.html'
})
class TodoItem {
    public todo:Todo;

    constructor () {
        this.todo = null;
    }

    public toggleIsDone () {
        this.todo.isDone = !this.todo.isDone;
    }
}

export default TodoItem;