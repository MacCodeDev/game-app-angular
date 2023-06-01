import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './guards/auth.guard';
import { FunctionalitiesComponent } from "./functionalities/functionalities.component";
import { ProjectTaskComponent } from "./project-task/project-task.component";

const routes: Routes = [
  { path: '', component:LoginComponent},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'projects/functionalities/:functionalityId', component: FunctionalitiesComponent, canActivate: [AuthGuard] },
  { path: 'projects/functionalities/:functionalityId/task/:taskId', component: ProjectTaskComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
