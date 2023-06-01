import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, of, switchMap, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//install json server: npm install -g json-server
//run json server: json-server --watch db.json

@Injectable({
  providedIn: 'root'
})
export class ProjectAppService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient,private router: Router) { }

  //Features services
  getFeatures(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/features`)
      .pipe(catchError(this.handleError));
  }

  getFeature(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/features/${id}`)
      .pipe(catchError(this.handleError));
  }

  createFeature(feature: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/features`, feature, { headers })
      .pipe(catchError(this.handleError));
  }

  updateFeature(id: number, feature: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/features/${id}`, feature, { headers })
      .pipe(catchError(this.handleError));
  }

  deleteFeature(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/features/${id}`)
      .pipe(catchError(this.handleError));
  }


  //Task Services
  getTasksForFeature(idFeature: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`).pipe(
      map((tasks: any) => tasks.filter((task: any) => task.idFeature === idFeature))
    );
  }

  getTaskForFeature(idFeature: number, id: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks/${id}`).pipe(
      switchMap((response: any[]) => {
        if (response != null) {
          return of(response);
        } else {
          this.router.navigate(['/projects']);
          return this.handleError('Brak danych');
        }
      }),
      catchError((error: any) => {
        this.router.navigate(['/projects']);
        return this.handleError(error);
      })
    );
  }

  createTask(task: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/tasks`, task, { headers })
      .pipe(catchError(this.handleError));
  }


  //Error Handler
  private handleError(error: any) {
    console.error('Wystąpił błąd:', error);
    return throwError('Wystąpił błąd. Spróbuj ponownie.');
  }
}
