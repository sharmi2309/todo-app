import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToDo } from '../models/todo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  todoForm!: FormGroup;
  isEditMode = false;
  todoId?: number;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      is_Completed: [false]
    });

    this.todoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.todoId) {
      this.isEditMode = true;
      this.loadTodo(this.todoId);
    }
  }

  loadTodo(id: number): void {
    this.todoService.getById(id).subscribe({
      next: (todo) => this.todoForm.patchValue(todo),
      
    });
  }

  onSubmit(): void {
    const todoData: ToDo = this.todoForm.value;
    // console.log(todoData,"Data")
    if (this.isEditMode && this.todoId) {
      todoData.id = this.todoId;
      this.todoService.update(todoData).subscribe({
        next: () => {
          this.router.navigate(['/todos']);
        }
      });
    } else {
      this.todoService.create(todoData).subscribe({
        next: () => {
         this.router.navigate(['/todos']);
        }
      });
    }
  }
  onCancel(): void {
    this.router.navigate(['/todos']);
  }

}
