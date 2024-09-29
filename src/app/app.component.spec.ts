import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { Task } from './models/task.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TaskListComponent, TaskFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial showModal as false', () => {
    expect(component.showModal).toBeFalse();
  });

  it('should open new task modal', () => {
    component.openNewTaskModal();
    expect(component.showModal).toBeTrue();
    expect(component.currentTask).toBeNull();
  });

  it('should open edit task modal', () => {
    const task: Task = {
      id: 1,
      title: 'Test Task',
      assignedTo: 'User',
      status: 'Not Started',
      dueDate: new Date(),
      priority: 'Normal',
      comments: '',
    };
    component.openEditTaskModal(task);
    expect(component.showModal).toBeTrue();
    expect(component.currentTask).toEqual(task);
  });

  it('should close modal', () => {
    component.showModal = true;
    component.currentTask = {
      id: 1,
      title: 'Test Task',
      assignedTo: 'User',
      status: 'Not Started',
      dueDate: new Date(),
      priority: 'Normal',
      comments: '',
    };
    component.closeModal();
    expect(component.showModal).toBeFalse();
    expect(component.currentTask).toBeNull();
  });
});