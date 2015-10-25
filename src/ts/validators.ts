import {Control} from 'angular2/angular2';
import {isUri} from 'valid-url';

export function UrlValidator (control: Control):{[key:string]: boolean} {
    return !isUri(control.value) ? {'uri': true} : null;
}