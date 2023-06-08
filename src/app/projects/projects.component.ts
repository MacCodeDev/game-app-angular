import { Component, OnInit } from '@angular/core';
import { ProjectAppService } from "../project-app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{
  features: any[] = [];
  newFeature: any = {};
  tasks: any[]=[];

  constructor(
    private projectService: ProjectAppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFeatures();
  }

  getFeatures(): void {
    this.projectService.getFeatures()
      .subscribe((response: any) => {
        this.features = response;
        //console.log(response);
      });
  }

  async deleteTask(id: number): Promise<void> {
    this.projectService.deleteTask(id).subscribe(
      () => {
        console.log('Usunięto funkcję');
      },
      error => {
        console.error('Wystąpił błąd podczas usuwania funkcji:', error);
      }
    );
    //location.reload();
  }

  deleteFeature(id: number): void {
    this.projectService.getTasksForFeature(id).subscribe(
      (response) => {
        response.forEach((task) => {
          this.projectService.deleteTask(task.id).subscribe();
        });
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania zadań:', error);
      },
      () => {
        this.projectService.deleteFeature(id).subscribe(
          () => {
            console.log('Usunięto funkcję');
            location.reload()
          },
          (error) => {
            console.error('Wystąpił błąd podczas usuwania funkcji:', error);
          }
        );
      }
    );
  }


  addFeature(): void {
    this.projectService.createFeature(this.newFeature)
      .subscribe((response: any) => {
        this.features.push(response);
        this.newFeature = {};
      });
  }
}
