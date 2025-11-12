import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { TodosComponent } from './todos/todos.component';




const routes: Routes = [
  { path: '', component: TodosComponent },      
  { path: 'create', component: FormComponent }, 
  { path: 'edit/:id', component: FormComponent }
];

@NgModule({
  declarations: [ListComponent,FormComponent,TodosComponent],
  imports: [CommonModule,ReactiveFormsModule,RouterModule.forChild(routes)]
})
export class TodoModule {}
