import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToDo } from '../models/todo';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() todos: ToDo[] = [];
  @Output() editTodo = new EventEmitter<ToDo>();
  @Output() deleteTodo = new EventEmitter<number>();
}
