import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToDo } from '../models/todo';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() todoToEdit?: ToDo;
  @Output() formSubmit = new EventEmitter<ToDo>();
  @Output() formCancel = new EventEmitter<void>();

  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      isCompleted: [false]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todoToEdit'] && this.todoToEdit) {
      this.todoForm.patchValue(this.todoToEdit);
    }
  }

  submit() {
    if (this.todoForm.invalid) return;
    this.formSubmit.emit(this.todoForm.value);
    this.todoForm.reset({ isCompleted: false });
  }

  cancel() {
    this.todoForm.reset({ isCompleted: false });
    this.formCancel.emit();
  }

}
