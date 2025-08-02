import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
   //imports: [FormsModule, NgFor],
  template: `
    <h1>TODO List</h1>
    <form (submit)="addTodo()">
      <input [(ngModel)]="newTodo" name="todo" required placeholder="Enter a new todo" />
      <button type="submit">Add</button>
    </form>
    <ul>
      <li *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  `,
  imports: [FormsModule, NgFor]
})
export class AppComponent implements OnInit {
  todos: any[] = [];
  newTodo = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((data) => this.todos = data);
  }

  addTodo() {
    if (!this.newTodo.trim()) return;
    this.todoService.addTodo(this.newTodo).subscribe(() => {
      this.newTodo = '';
      this.loadTodos();
    });
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => this.loadTodos());
  }
}
