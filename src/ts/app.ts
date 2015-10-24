/// <reference path="ambients.d.ts" />
/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="../../node_modules/angular2/bundles/typings/angular2/angular2.d.ts" />

import * as es6Shim from 'es6-shim';
import * as Reflect from 'reflect-metadata';
import {bootstrap, FORM_BINDINGS} from 'angular2/angular2';

import TodosApp from './components/TodosApp';
import TodoRepository from './TodoRepository';

bootstrap(TodosApp, [TodoRepository, FORM_BINDINGS]);
