import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  @Output() editTask = new EventEmitter<Task>();
  showDeleteConfirmation = false;
  taskToDelete: Task | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => (this.tasks = tasks),
      (error) => console.error('Error loading tasks', error),
    );
  }

  onEditTask(task: Task): void {
    this.editTask.emit(task);
  }

  confirmDelete(task: Task): void {
    this.taskToDelete = task;
    this.showDeleteConfirmation = true;
  }

  cancelDelete(): void {
    this.showDeleteConfirmation = false;
    this.taskToDelete = null;
  }

  confirmDeleteTask(): void {
    if (this.taskToDelete) {
      this.deleteTask(this.taskToDelete.id);
      this.showDeleteConfirmation = false;
      this.taskToDelete = null;
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== id);
        console.log('Task deleted successfully');
      },
      (error) => console.error('Error deleting task', error),
    );
  }
}
