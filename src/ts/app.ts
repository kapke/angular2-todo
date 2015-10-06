/// <reference path="../../typings/tsd.d.ts" />

import {bootstrap} from 'angular2/angular2';

import TodosApp from './components/TodosApp';
import TodoRepository from './TodoRepository';

bootstrap(TodosApp, [TodoRepository]);
