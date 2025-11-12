import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToDo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todos',
  standalone: false,
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {
  todos: ToDo[] = [];
  selectedTodo?: ToDo;

  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getAll().subscribe({
      next: (res) => (this.todos = res),
      error: (err) => this.snackBar.open(err.error?.error_message || 'Error loading todos', 'Close', { duration: 3000 })
    });
  }
  
  onFormSubmit(todo: ToDo) {
    if (todo.id) {
      this.todoService.update(todo).subscribe({
        next: () => {
          // this.snackBar.open('Todo updated!', 'Close', { duration: 2000 });
          this.selectedTodo = undefined;
          this.loadTodos();
        }
      });
    } else {
      this.todoService.create(todo).subscribe({
        next: () => {
          // this.snackBar.open('Todo created!', 'Close', { duration: 2000 });
          this.loadTodos();
        }
      });
    }
  }

  onFormCancel() {
    this.selectedTodo = undefined;
  }

  onEdit(todo: ToDo) {
    this.selectedTodo = todo;
  }

  onDelete(id: number) {
    this.todoService.delete(id).subscribe({
      next: () => {
        this.snackBar.open('Todo deleted!', 'Close', { duration: 2000 });
        this.loadTodos();
      }
    });
  }

}
