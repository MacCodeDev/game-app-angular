import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable, of, switchMap, throwError, forkJoin} from 'rxjs';
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


  updateFeatureStatus(Id: number, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/features/${Id}`;
    return this.http.get<any>(url).pipe(map((response) => {
        const updatedTask = { ...response, status: newStatus}
        return updatedTask
      }),
      map((res) => {
        this.http.get<any>(`${this.apiUrl}/tasks?idFeature=${Id}`).pipe(
          map(res => {
            // @ts-ignore
            return res.map(x => {
              x.status = newStatus;
              return x;
            })
          }),
          map(res => {
            // @ts-ignore
            res.forEach(x => this.http.put(`${this.apiUrl}/tasks/${Id}`, x))
            return res
          })
        )
      })
    );
  }

  changeFeatureStatus(featureId: number, newStatus: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/features/${featureId}`).pipe(
      switchMap(selectedFeature => {
        if (!selectedFeature) {
          throw new Error(`Feature with ID ${featureId} not found`);
        }

        // Change the status of the selected feature
        selectedFeature.status = newStatus;

        // Update the feature on the server
        return this.http.put(`${this.apiUrl}/features/${featureId}`, selectedFeature);
      }),
      switchMap(() => {
        // Retrieve the tasks assigned to the selected feature
        return this.http.get<any[]>(`${this.apiUrl}/tasks?idFeature=${featureId}`);
      }),
      map(assignedTasks => {
        // Change the status of the assigned tasks
        assignedTasks.forEach(task => {
          task.status = newStatus;
          // Update the task on the server
          this.http.put(`${this.apiUrl}/tasks/${task.id}`, task).subscribe();
        });

        return assignedTasks;
      })
    );
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

  async getTaskForFeature(idFeature: number, id: number): Promise<Observable<any>> {
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

  updateTask(id: number, task: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/tasks/${id}`, task, { headers })
      .pipe(catchError(this.handleError));
  }

  updateTaskStatus(taskId: number, newStatus: string): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    return this.http.get<any>(url).pipe(map((response) => {
      const updatedTask = { ...response, status: newStatus}
      console.log(newStatus)
      return updatedTask
    }),
      map((res) => {
        this.http.put(url,res).subscribe();
      })
    );
  }


  deleteTask(task: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tasks/${task}`)
      .pipe(catchError(this.handleError));
  }


  //Error Handler
  private handleError(error: any) {
    console.error('Wystąpił błąd:', error);
    return throwError('Wystąpił błąd. Spróbuj ponownie.');
  }
}
