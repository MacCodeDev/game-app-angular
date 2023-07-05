import { Component, OnInit } from '@angular/core';
import { ProjectAppService } from "../project-app.service";
import { Router } from '@angular/router';
import {concatMap, delay, finalize} from 'rxjs/operators';
import {Observable, of, switchMap, throwError, forkJoin, concat} from 'rxjs';
import {waitForAngularReady} from "@angular/cdk/testing/selenium-webdriver";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{
  features: any[] = [];
  newFeature: any = {};
  updateFeatureArray: any = {};
  tasks: any[]=[];
  showForm: boolean = false;

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

  // async deleteTask(id: number): Promise<void> {
  //   this.projectService.deleteTask(id).subscribe(
  //     () => {
  //       console.log('Usunięto funkcję');
  //     },
  //     error => {
  //       console.error('Wystąpił błąd podczas usuwania funkcji:', error);
  //     }
  //   );
  // }

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
            this.getFeatures();
          },
          (error) => {
            console.error('Wystąpił błąd podczas usuwania funkcji:', error);
          }
        );
      }
    );
  }

  editFeature(id: number) {
    const feature = this.features.find(f => f.id === id);
    this.updateFeatureArray = feature;
    this.showForm = true;
  }

  updateStatusFeature(id: number, newStatus: string) {
    this.projectService.changeFeatureStatus(id, newStatus).subscribe(
      () => {
        this.getFeatures();
    }
    )

  }

  updateFeature() {
    this.projectService.updateFeature(this.updateFeatureArray.id, this.updateFeatureArray).subscribe(
      response => {
        console.log('Feature updated successfully', response);
        this.getFeatures();
      },
      error => {
        console.error('There was an error updating the feature', error);
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
