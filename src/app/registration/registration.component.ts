import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Functionality {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})

export class RegistrationComponent {
  functionalities: Functionality[] = [];
  editMode = false;
  name = '';
  description = '';
  selectedFunctionality: Functionality | null = null;
  showTasksFlag = false;

  saveFunctionality() {
    if (this.editMode) {
// Editing an existing functionality
      this.selectedFunctionality!.name = this.name;
      this.selectedFunctionality!.description = this.description;
      this.editMode = false;
    } else {
// Adding a new functionality
      const newFunctionality: Functionality = {
        id: this.generateId(),
        name: this.name,
        description: this.description
      };
      this.functionalities.push(newFunctionality);
    }

    this.name = '';
    this.description = '';
  }

  generateId(): number {
    return Math.floor(Math.random() * 1000);
  }

  deleteFunctionality(id: number) {
    this.functionalities = this.functionalities.filter(f => f.id !== id);
  }

  editFunctionality(functionality: Functionality) {
    this.editMode = true;
    this.name = functionality.name;
    this.description = functionality.description;
    this.selectedFunctionality = functionality;
  }

  showTasks(functionality: Functionality) {
    this.selectedFunctionality = functionality;
    this.showTasksFlag = true;
  }
}




