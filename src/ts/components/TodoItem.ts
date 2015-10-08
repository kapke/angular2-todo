///<reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgClass, NgIf, NgFor} from 'angular2/angular2';
import Todo from '../Todo';

@Component({
    selector: 'todo-item',
    properties: ['todo'],
})
@View({
    directives: [NgClass, NgIf, NgFor],
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
        $e.stopPropagation();
        this.todo.isDone = !this.todo.isDone;
    }

    public toggleExpandedState () {
        this.ifExpanded = this.canBeExpanded() && !this.ifExpanded;
    }

    private canBeExpanded () {
        return this.todo.tags.length>0 || this.todo.image;
    }
}

export default TodoItem;