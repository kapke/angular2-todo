///<reference path="../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import Note from './Note';

@Component({
    selector: 'note-item',
    properties: ['note']
})
@View({
    template: `
        <div>{{ note.title }}</div>
    `
})
class NoteItem {
    public note:Note;

    constructor() {
        this.note = null;
    }
}

export default NoteItem;