/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="ambients.d.ts" />

import {bootstrap} from 'angular2/angular2';
import * as es6Shim from 'es6-shim';
import * as Reflect from 'reflect-metadata';

import TodosApp from './components/TodosApp';
import TodoRepository from './TodoRepository';

bootstrap(TodosApp, [TodoRepository]);
