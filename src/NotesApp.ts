/// <reference path="../typings/angular2/angular2.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';

@Component({
    selector: 'notes-app'
})
@View({
    directives: [NgFor],
    template: `
        <div>
            <h1>Hello, {{ name }} </h1>
            <ul>
                <li *ng-for="#note of notes">{{ note }}</li>
            </ul>
        </div>`
})
class NotesApp {
    notes: Array<string>;
    name: string;

    constructor () {
        this.name = 'Asia';
        this.notes = ['Note', 'Second note'];
    }
}
export default NotesApp;
