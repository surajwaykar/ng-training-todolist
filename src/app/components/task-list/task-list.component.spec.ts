import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskService', ['getTasks', 'deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [{ provide: TaskService, useValue: spy }],
    }).compileComponents();

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    const testTasks: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        assignedTo: 'User 1',
        status: 'Not Started',
        dueDate: new Date(),
        priority: 'Normal',
        comments: '',
      },
      {
        id: 2,
        title: 'Task 2',
        assignedTo: 'User 2',
        status: 'In Progress',
        dueDate: new Date(),
        priority: 'High',
        comments: '',
      },
    ];
    taskServiceSpy.getTasks.and.returnValue(of(testTasks));

    component.ngOnInit();

    expect(component.tasks).toEqual(testTasks);
  });

  it('should emit editTask event', () => {
    const task: Task = {
      id: 1,
      title: 'Test Task',
      assignedTo: 'User',
      status: 'Not Started',
      dueDate: new Date(),
      priority: 'Normal',
      comments: '',
    };
    spyOn(component.editTask, 'emit');

    component.onEditTask(task);

    expect(component.editTask.emit).toHaveBeenCalledWith(task);
  });

  it('should confirm delete', () => {
    const task: Task = {
      id: 1,
      title: 'Test Task',
      assignedTo: 'User',
      status: 'Not Started',
      dueDate: new Date(),
      priority: 'Normal',
      comments: '',
    };
    component.confirmDelete(task);

    expect(component.showDeleteConfirmation).toBeTrue();
    expect(component.taskToDelete).toEqual(task);
  });

  it('should delete task', () => {
    const taskId = 1;
    taskServiceSpy.deleteTask.and.returnValue(of(null));
    component.tasks = [
      {
        id: 1,
        title: 'Task 1',
        assignedTo: 'User 1',
        status: 'Not Started',
        dueDate: new Date(),
        priority: 'Normal',
        comments: '',
      },
      {
        id: 2,
        title: 'Task 2',
        assignedTo: 'User 2',
        status: 'In Progress',
        dueDate: new Date(),
        priority: 'High',
        comments: '',
      },
    ];

    component.deleteTask(taskId);

    expect(taskServiceSpy.deleteTask).toHaveBeenCalledWith(taskId);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0].id).toBe(2);
  });
});