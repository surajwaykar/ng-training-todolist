import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() taskToEdit: Task | null = null;
  @Output() taskAdded = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() modalClosed = new EventEmitter<void>();

  task: Task = {
    id: 0,
    title: '',
    assignedTo: '',
    status: 'Not Started',
    dueDate: new Date(),
    priority: 'Normal',
    comments: '',
  };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    if (this.taskToEdit) {
      this.task = { ...this.taskToEdit };
    }
  }

  openNewTaskModal(): void {
    this.taskToEdit = this.task;
  }

  saveTask(): void {
    if (this.taskToEdit) {
      this.taskService.updateTask(this.task).subscribe(
        (updatedTask) => {
          console.log('Task updated successfully', updatedTask);
          this.taskUpdated.emit(updatedTask);
          this.closeModal();
        },
        (error) => console.error('Error updating task', error),
      );
    } else {
      this.taskService.addTask(this.task).subscribe(
        (addedTask) => {
          console.log('Task added successfully', addedTask);
          this.taskAdded.emit(addedTask);
          this.closeModal();
        },
        (error) => console.error('Error adding task', error),
      );
    }
  }

  closeModal(): void {
    this.modalClosed.emit();
  }
}
