import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
todos: ToDo[] = [];

  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAll().subscribe({
      next: (res) => (this.todos = res),
    });
  }

  onDelete(id: number): void {
    this.todoService.delete(id).subscribe({
      next: () => {
        this.loadTodos();
      }
    });
  }

  onEdit(todo: ToDo): void {
    this.router.navigate(['todos/edit', todo.id]);
  }

  onAdd(): void {
    this.router.navigate(['todos/create']);
    
  }
}
