import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToDo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

   private baseUrl = 'http://localhost:8080/api/todo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ToDo[]> {
    return this.http.get<ToDo[]>(`${this.baseUrl}/get`);
  }

  getById(id: number): Observable<ToDo> {
    return this.http.get<ToDo>(`${this.baseUrl}/${id}`);
  }

  create(todo: ToDo): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, todo);
  }

  update(todo: ToDo): Observable<any> {
    return this.http.put(`${this.baseUrl}`, todo);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  searchTodos(title?: string, isCompleted?: boolean | ''): Observable<ToDo[]> {
    let params = new HttpParams();
    if (title) params = params.set('title', title);
    if (isCompleted !== '') params = params.set('isCompleted', isCompleted!);

    return this.http.get<ToDo[]>(`${this.baseUrl}/search`, { params });
  }
}
