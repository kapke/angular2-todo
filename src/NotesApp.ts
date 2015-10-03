/// <reference path="../typings/tsd.d.ts" />

import {Component, View, NgFor} from 'angular2/angular2';
import NoteItem from './NoteItem';
import Note from './Note';

@Component({
    selector: 'notes-app',
})
@View({
    directives: [NgFor, NoteItem],
    template: `
        <div>
            <h1>Hello, {{ name }} </h1>
            <ul>
                <li *ng-for="#note of notes">
                    <note-item [note]="note"></note-item>
                </li>
            </ul>
        </div>`
})
class NotesApp {
    notes: Array<Note>;
    name: string;

    constructor () {
        this.name = 'Asia';
        this.notes = ['Note', 'Second note'].map((title:string) => {
            return new Note(title);
        })
    }
}
export default NotesApp;
