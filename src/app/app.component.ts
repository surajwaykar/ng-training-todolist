import { Component, EventEmitter } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { Task } from './models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  template: `
    <div class="slds-container slds-container_center slds-p-around_medium">
      <h1>Task Manager</h1>
      <button
        class="slds-button slds-button_brand"
        (click)="openNewTaskModal()"
      >
        New Task
      </button>
      <app-task-list (editTask)="openEditTaskModal($event)"></app-task-list>
      <app-task-form
        *ngIf="showModal"
        [taskToEdit]="currentTask"
        (taskAdded)="onTaskAdded($event)"
        (taskUpdated)="onTaskUpdated($event)"
        (modalClosed)="closeModal()"
      >
      </app-task-form>
    </div>
  `,
})
export class AppComponent {
  showModal = false;
  currentTask: Task | null = null;

  openNewTaskModal() {
    this.currentTask = null;
    this.showModal = true;
  }

  openEditTaskModal(task: Task) {
    this.currentTask = task;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.currentTask = null;
  }

  onTaskAdded(task: Task) {
    console.log('New task added:', task);
    this.closeModal();
  
  }

  onTaskUpdated(task: Task) {
    console.log('Task updated:', task);
    this.closeModal();
   
  }
}
