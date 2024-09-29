import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Task } from '../../models/task.model';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskService', ['addTask', 'updateTask']);

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent, FormsModule],
      providers: [{ provide: TaskService, useValue: spy }],
    }).compileComponents();

    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default task', () => {
    component.ngOnInit();
    expect(component.task).toBeDefined();
    expect(component.task.id).toBe(0);
    expect(component.task.title).toBe('');
  });

  it('should initialize with taskToEdit', () => {
    const editTask: Task = {
      id: 1,
      title: 'Edit Task',
      assignedTo: 'User',
      status: 'In Progress',
      dueDate: new Date(),
      priority: 'High',
      comments: 'Test',
    };
    component.taskToEdit = editTask;
    component.ngOnInit();
    expect(component.task).toEqual(editTask);
  });

  it('should add new task', () => {
    const newTask: Task = {
      id: 0,
      title: 'New Task',
      assignedTo: 'User',
      status: 'Not Started',
      dueDate: new Date(),
      priority: 'Normal',
      comments: '',
    };
    component.task = newTask;
    taskServiceSpy.addTask.and.returnValue(of({ ...newTask, id: 1 }));
    spyOn(component.taskAdded, 'emit');
    spyOn(component.modalClosed, 'emit');

    component.saveTask();

    expect(taskServiceSpy.addTask).toHaveBeenCalledWith(newTask);
    expect(component.taskAdded.emit).toHaveBeenCalled();
    expect(component.modalClosed.emit).toHaveBeenCalled();
  });

  it('should update existing task', () => {
    const existingTask: Task = {
      id: 1,
      title: 'Existing Task',
      assignedTo: 'User',
      status: 'In Progress',
      dueDate: new Date(),
      priority: 'High',
      comments: 'Test',
    };
    component.taskToEdit = existingTask;
    component.task = { ...existingTask, title: 'Updated Task' };
    taskServiceSpy.updateTask.and.returnValue(of(component.task));
    spyOn(component.taskUpdated, 'emit');
    spyOn(component.modalClosed, 'emit');

    component.saveTask();

    expect(taskServiceSpy.updateTask).toHaveBeenCalledWith(component.task);
    expect(component.taskUpdated.emit).toHaveBeenCalled();
    expect(component.modalClosed.emit).toHaveBeenCalled();
  });
});