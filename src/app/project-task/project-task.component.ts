import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectAppService } from "../project-app.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {
  task: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectAppService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getTask();
  }

  async getTask(): Promise<void> {
    const functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));
    console.log(functionalityId);
    const taskId = Number(this.route.snapshot.paramMap.get('taskId'));
    console.log(taskId);
    await (await this.projectService.getTaskForFeature(functionalityId, taskId))
      .subscribe((response: any) => {
        this.task = response;
        if( this.task.idFeature !== functionalityId){
          this.router.navigate(['/projects']);
        }
      });
  }

  updateStatusTask(id: number, newStatus: string){
    this.projectService.updateTaskStatus(id,newStatus).subscribe(
    )
  }
}

