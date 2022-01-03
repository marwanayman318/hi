import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.scss']
})
export class ListTodosComponent implements OnInit {
  public todo : Todo = new Todo();

  public todos: any = []
  constructor(private _todoService : TodosService,private router : Router) { }

  ngOnInit(): void {
    this._todoService.getTodos().subscribe(todos =>
      {
        this.todos=todos
      });
  }

  saveTodo()
  {
     console.log("printing todo",this.todo);
     this._todoService.saveTodo(this.todo).subscribe(todo =>
      {
        window.location.reload();
      });
      
  }

}
