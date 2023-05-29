import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Functionality {
  id: number;
  title: string;
  description: string;
  priority: string;
  owner: string;
  state: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  functionalities: Functionality[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  constructor(private router: Router) {}

  projects: Project[] = [];

  showForm = false;
  newFunctionality: Functionality = {
    id: 0,
    title: '',
    description: '',
    priority: '',
    owner: '',
    state: ''
  };
  currentProject: Project | null = null;

  ngOnInit() {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects);
    } else {
      this.projects = [
        {
          id: 1,
          name: 'Projekt 1',
          description: 'Opis projektu 1',
          functionalities: []
        }
      ];
      this.saveProjects();
    }
  }

  saveProjects() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  openForm(project: Project) {
    this.currentProject = project;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.clearForm();
  }

  clearForm() {
    this.newFunctionality = {
      id: 0,
      title: '',
      description: '',
      priority: '',
      owner: '',
      state: ''
    };
  }

  addFunctionality() {
    if (this.newFunctionality.title && this.newFunctionality.description) {
      const functionality: Functionality = {
        id: this.currentProject!.functionalities.length + 1,
        title: this.newFunctionality.title,
        description: this.newFunctionality.description,
        priority: this.newFunctionality.priority,
        owner: this.newFunctionality.owner,
        state: this.newFunctionality.state
      };

      this.currentProject!.functionalities.push(functionality);
      this.saveProjects();
      this.closeForm();
    }
  }

  deleteProject(project: Project) {
    const index = this.projects.indexOf(project);
    if (index !== -1) {
      this.projects.splice(index, 1);
      this.saveProjects();
    }
  }

  async viewFunctionality(project: Project, functionality: Functionality) {
    await this.router.navigate(['/projects', project.id, 'functionalities', functionality.id]);
  }
}
