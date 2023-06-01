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

  addFeature(): void {
    this.projectService.createFeature(this.newFeature)
      .subscribe((response: any) => {
        this.features.push(response);
        this.newFeature = {};
      });
  }
}
