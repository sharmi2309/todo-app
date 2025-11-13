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
 
}
