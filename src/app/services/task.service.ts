import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Complete project proposal',
      assignedTo: 'User 1',
      status: 'In Progress',
      dueDate: new Date('2024-03-15'),
      priority: 'High',
      comments: 'Needs review',
    },
    {
      id: 2,
      title: 'Review code changes',
      assignedTo: 'User 2',
      status: 'Not Started',
      dueDate: new Date('2024-03-10'),
      priority: 'Medium',
      comments: 'Pull request #123',
    },
    {
      id: 3,
      title: 'Update documentation',
      assignedTo: 'User 3',
      status: 'Completed',
      dueDate: new Date('2024-03-05'),
      priority: 'Low',
      comments: 'Ready for publishing',
    },
    {
      id: 4,
      title: 'Plan team meeting',
      assignedTo: 'User 4',
      status: 'In Progress',
      dueDate: new Date('2024-03-20'),
      priority: 'Normal',
      comments: 'Agenda items needed',
    },
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): Observable<Task> {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
    }
    return of(task);
  }

  deleteTask(id: number): Observable<any> {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return of(null);
  }
}
