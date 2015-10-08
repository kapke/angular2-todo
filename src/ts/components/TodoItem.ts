///<reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgClass, NgIf} from 'angular2/angular2';
import Todo from '../Todo';

@Component({
    selector: 'todo-item',
    properties: ['todo'],
})
@View({
    directives: [NgClass, NgIf],
    styleUrls: ['src/style/todo-item.css'],
    templateUrl: 'src/template/todo-item.html'
})
class TodoItem {
    public todo:Todo;
    public ifExpanded:boolean = false;

    constructor () {
        this.todo = null;
    }

    public toggleIsDone ($e) {
        console.log($e);
        $e.stopPropagation();
        this.todo.isDone = !this.todo.isDone;
    }

    public toggleExpandedState () {
        this.ifExpanded = this.todo.image && !this.ifExpanded;
    }
}

export default TodoItem;