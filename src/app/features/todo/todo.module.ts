import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TodosComponent } from './todos/todos.component';




const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'create', component: FormComponent },
      { path: 'edit/:id', component: FormComponent }
    ]
  }
];


@NgModule({
  declarations: [ListComponent,FormComponent,TodosComponent],
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule.forChild(routes)]
})
export class TodoModule {}
