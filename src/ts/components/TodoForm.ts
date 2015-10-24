///<reference path="../../../typings/tsd.d.ts" />

import {Component, View, FormBuilder, ControlGroup, Control, FORM_DIRECTIVES, Validators, EventEmitter} from 'angular2/angular2';
import Todo from '../Todo';
import Tag from '../Tag';

interface TodoFormControls {
    title: Control,
    image: Control,
    tags: Control
}

@Component({
    properties: ['fillWith', 'submitButtonTitle'],
    events: ['todoReady', 'cancel'],
    selector: 'todo-form'
})
@View({
    directives: [FORM_DIRECTIVES],
    templateUrl: 'src/template/todo-form.html'
})
class TodoForm {
    public submitButtonTitle:string = '';
    public todoForm:ControlGroup;

    public todoReady = new EventEmitter();
    public cancel = new EventEmitter();

    private originalTodo:Todo = Todo.empty();
    private controls:TodoFormControls;

    public set fillWith (todo:Todo) {
        this.controls.title.updateValue(todo.title, {});
        this.controls.image.updateValue(todo.image, {});
        this.controls.tags.updateValue(todo.tags.join(' '), {});
        this.originalTodo = todo;
    }

    constructor (fb: FormBuilder) {
        this.controls = {
            title: fb.control(''),
            image: fb.control(''),
            tags: fb.control('')
        };
        this.todoForm = fb.group(this.controls);
    }

    public sendTodo ($event) {
        $event.preventDefault();
        const todo = this.extractTodoFromForm();
        this.todoReady.next(todo);
    }

    public cancelled (e) {
        this.cancel.next(e);
    }

    private extractTodoFromForm ():Todo {
        const title = this.controls.title.value,
              image = this.controls.image.value,
              tags = this.controls.tags.value.split(' ').map(t => new Tag(t));
        return new Todo(title, this.originalTodo.isDone, image, tags, this.originalTodo.isStarred);
    }
}

export default TodoForm;