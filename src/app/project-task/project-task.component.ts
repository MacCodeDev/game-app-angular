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
  ) {
  }

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
        if (this.task.idFeature !== functionalityId) {
          this.router.navigate(['/projects']);
        }
      });
  }

  async updateStatusTask(id: number, newStatus: string) {
    await this.projectService.updateTaskStatus(id, newStatus).subscribe(() => {
      location.reload();
    })
  }

  deleteTask(id: number): void {
    const functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));
    this.projectService.deleteTask(id).subscribe(
      () => {
        console.log('Usunięto zadanie');
        this.router.navigate([`projects/functionalities/${functionalityId}`]).then(() => {
          console.log('Navigation has finished');
        }).catch(error => {
          console.error('Navigation failed with error:', error);
        });
      },
      error => {
        console.error('Wystąpił błąd podczas usuwania zadania:', error);
      }
    );
  }
}

