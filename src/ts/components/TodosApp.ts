/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, NgFor, NgClass, NgIf, FORM_DIRECTIVES} from 'angular2/angular2';
import TodoItem from './TodoItem';
import {SortingPanel, SortingOptionDescriptor, SortingDirection} from './SortingPanel';
import Todo from '../Todo';
import Tag from '../Tag';
import TodoRepository from '../TodoRepository';
import TodoForm from './TodoForm';

@Component({
    selector: 'todos-app'
})
@View({
    directives: [NgFor, NgClass, NgIf, TodoItem, FORM_DIRECTIVES, SortingPanel, TodoForm],
    templateUrl: 'src/template/todos-app.html'
})
class TodosApp {
    public todos:Array<Todo>;
    public starredTodos:Todo[];
    public filterText:string = '';
    public hideStarred:boolean = false;
    public usedTags:Tag[] = [];
    public newTodo:Todo = Todo.empty();

    private todoRepository:TodoRepository;
    private currentSortingOption:SortingOptionDescriptor = null;
    private activeTagFilters:WeakMap<Tag, boolean> = new WeakMap<Tag, boolean>();

    constructor (todoRepository:TodoRepository) {
        this.todoRepository = todoRepository;

        this.fetchTodos();
        this.fetchTags();
    }

    public filterTodos ($event) {
        this.filterText = $event.target.value;
        this.fetchTodos();
    }

    public toggleStarredVisibility () {
        this.hideStarred = !this.hideStarred;
    }

    public canShowStarred ():boolean {
        return (!this.hideStarred && !!this.starredTodos.length);
    }

    public isTagFilterActive (tag:Tag):boolean {
        return !!this.activeTagFilters.get(tag);
    }

    public toggleTagFilterActivity (tag:Tag) {
        this.activeTagFilters.set(tag, !this.isTagFilterActive(tag));
        this.fetchTodos();
    }

    public sortingOptionChanged (newSortingOption:SortingOptionDescriptor) {
        this.currentSortingOption = newSortingOption;
        this.sortTodosBy(this.currentSortingOption);
    }

    public clearNewTodo () {
        this.newTodo = Todo.empty();
    }

    public addNewTodo (newTodo:Todo) {
        this.todoRepository.addTodo(newTodo).then(() => {
            this.fetchTodos();
        });
        this.clearNewTodo();
    }

    private sortTodosBy (sortingOption:string|SortingOptionDescriptor, direction?:number) {
        const that = this;

        function todoComparator (name:string, direction:SortingDirection, todo1:Todo, todo2:Todo) {
            if (name == 'title') {
                return todo1.compareByTitle(todo2) * direction;
            } else if (name == 'status') {
                return todo1.compareByStatus(todo2) * direction;
            }
            return 0;
        }

        function sort (comparatorFunc:(todo1:Todo, todo2:Todo) => number) {
            that.todos = that.todos.sort(comparatorFunc);
            that.starredTodos = that.starredTodos.sort(comparatorFunc);
        }

        if (typeof sortingOption == 'object') {
            sort(todoComparator.bind(null, (<SortingOptionDescriptor>sortingOption).value.property, (<SortingOptionDescriptor>sortingOption).value.direction));
        } else if (typeof sortingOption == 'string') {
            sort(todoComparator.bind(null, sortingOption, direction));
        }
    }

    private fetchTodos () {
        const activeTagFilters = this.getActiveTagFilters();
        this.todoRepository.findUnstarredTodos(this.filterText, activeTagFilters).then((todos) => {
            this.todos = todos;
        });
        this.todoRepository.findStarredTodos(this.filterText, activeTagFilters).then((todos) => {
            this.starredTodos = todos;
        });
        if(this.currentSortingOption) {
            this.sortTodosBy(this.currentSortingOption.value.property, this.currentSortingOption.value.direction);
        }
    }

    private fetchTags () {
        this.todoRepository.findUsedTags().then((tags) => {
            this.usedTags = tags;
        });
    }

    private getActiveTagFilters ():Tag[] {
        return this.usedTags.filter(this.isTagFilterActive.bind(this));
    }


}
export default TodosApp;
