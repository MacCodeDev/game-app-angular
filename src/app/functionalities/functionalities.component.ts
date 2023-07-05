import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ProjectAppService } from "../project-app.service";

@Component({
  selector: 'app-functionalities',
  templateUrl: './functionalities.component.html',
  styleUrls: ['./functionalities.component.scss']
})
export class FunctionalitiesComponent implements OnInit {
  feature: any;
  tasks: any[]=[];
  newTask: any = {};
  editTaskArray: any = {};
  featureID: any;
  showForm: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectAppService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFeatureDetails();
    this.getTasks();
  }

  getFeatureDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('functionalityId'));
    this.featureID = id;
    this.projectService.getFeature(id)
      .subscribe((response: any) => {
        this.feature = response;
      });
  }

  async getTasks(): Promise<void> {
    const id = Number(this.route.snapshot.paramMap.get('functionalityId'));
    await this.projectService.getTasksForFeature(id)
      .subscribe((response: any) => {
        this.tasks = response;
        console.log(response);
      });
  }

  taskDetails(id: number): void {
    const functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));
    this.router.navigate([`projects/functionalities/${functionalityId}/task/${id}`])
  }

  deleteTask(id: number): void {
    this.projectService.deleteTask(id).subscribe(
      () => {
        console.log('Usunięto funkcję');
        this.getTasks(); // Reload tasks after one has been deleted
      },
      error => {
        console.error('Wystąpił błąd podczas usuwania funkcji:', error);
      }
    );
  }

  backPage(): void{
    this.router.navigate(['/projects']);
  }

  updateTask() {
    this.projectService.updateTask(this.editTaskArray.id, this.editTaskArray).subscribe(
      response => {
        console.log('Task updated successfully', response);
        this.getTasks();
      },
      error => {
        console.error('There was an error updating the task', error);
      }
    );
  }

  editTask(id: number) {
    const task= this.tasks.find(f => f.id === id);
    this.editTaskArray = { ...task };
    this.showForm = true;
  }

  createTask(): void {
    this.newTask.idFeature = this.featureID
    this.projectService.createTask(this.newTask)
      .subscribe((response: any) => {
        this.tasks.push(response);
        this.newTask = {};
      });
  }
}
