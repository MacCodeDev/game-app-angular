import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  featureID: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectAppService
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

  getTasks(): void {
    const id = Number(this.route.snapshot.paramMap.get('functionalityId'));
    this.projectService.getTasksForFeature(id)
      .subscribe((response: any) => {
        this.tasks = response;
        console.log(response);
      });
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
