import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private baseUrl : string ="";

  constructor(private _HttpClient: HttpClient) { }

  getTodos()
  {
    return this._HttpClient.get('http://backend-nice.apps.eu45.prod.nextcle.com/');
  }


  saveTodo(todo : Todo)
  {
    return this._HttpClient.post('http://backend-nice.apps.eu45.prod.nextcle.com/', todo);
  }
}
