import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

//install json server: npm install -g json-server
//run json server: json-server --watch db.json

@Injectable({
  providedIn: 'root'
})
export class ProjectAppService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

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

  private handleError(error: any) {
    console.error('Wystąpił błąd:', error);
    return throwError('Wystąpił błąd. Spróbuj ponownie.');
  }

  getTasksForFeature(idFeature: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tasks`).pipe(
      map((tasks: any) => tasks.filter((task: any) => task.idFeature === idFeature))
    );
  }

}
