///<reference path="../../../typings/tsd.d.ts" />

import {Component, View, FormBuilder, ControlGroup, Control, FORM_DIRECTIVES, Validators, StringMap, EventEmitter} from 'angular2/angular2';
import Todo from '../Todo';
import Tag from '../Tag';

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
    public submitButtonTitle:string;
    public todoForm:ControlGroup;

    public todoReady = new EventEmitter();
    public cancel = new EventEmitter();

    private originalTodo:Todo = Todo.empty();

    public set fillWith (todo:Todo) {
        this.todoForm.controls.title.updateValue(todo.title);
        this.todoForm.controls.image.updateValue(todo.image);
        this.todoForm.controls.tags.updateValue(todo.tags.join(' '));
        this.originalTodo = todo;
    }

    constructor (fb: FormBuilder) {
        this.todoForm = fb.group(<StringMap<string, any>>{
            'title': fb.control(''),
            'image': fb.control(''),
            'tags': fb.control('')
        });
    }

    public sendTodo ($event) {
        $event.preventDefault();
        const todo = this.extractTodoFromForm();
        this.todoReady.next(todo);
    }

    public cancelled () {
        this.cancel.next();
    }

    private extractTodoFromForm ():Todo {
        const title = this.todoForm.controls.title.value,
              image = this.todoForm.controls.image.value,
              tags = this.todoForm.controls.tags.value.split(' ').map(t => new Tag(t));
        return new Todo(title, this.originalTodo.isDone, image, tags, this.originalTodo.isStarred);
    }
}

export default TodoForm;