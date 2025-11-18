import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
todos: ToDo[] = [];
searchTitle: string = '';
searchCompleted: boolean | '' = '';
private searchSubject: Subject<void> = new Subject<void>();
  constructor(
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
    this.searchSubject.pipe(debounceTime(300)).subscribe(() => {
      this.todoService.searchTodos(this.searchTitle, this.searchCompleted).subscribe({
        next: (res) => (this.todos = res),
        error: (err) => (this.todos = []), 
      });
    });
  }

  loadTodos(): void {
    this.todoService.getAll().subscribe({
      next: (res) => (this.todos = res),
    });
    this.searchTitle = '';
    this.searchCompleted = ''
  }
   onSearch() {
    this.searchSubject.next();
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
