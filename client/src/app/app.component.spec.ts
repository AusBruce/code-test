import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TodoService } from './todo.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let todoServiceSpy: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['getTodos', 'addTodo', 'deleteTodo']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, NgFor],
      providers: [{ provide: TodoService, useValue: spy }]
    }).overrideComponent(AppComponent, {
      set: {
        providers: [{ provide: TodoService, useValue: spy }],
        imports: [FormsModule, NgFor]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoServiceSpy = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on init', () => {
    const mockTodos = [{ id: 1, title: 'Mock Task' }];
    todoServiceSpy.getTodos.and.returnValue(of(mockTodos));

    component.ngOnInit();

    expect(todoServiceSpy.getTodos).toHaveBeenCalled();
    expect(component.todos).toEqual(mockTodos);
  });

  it('should add a todo and clear the input', () => {
    component.newTodo = 'New Task';
    todoServiceSpy.addTodo.and.returnValue(of({ id: 2, title: 'New Task' }));
    todoServiceSpy.getTodos.and.returnValue(of([{ id: 2, title: 'New Task' }]));

    component.addTodo();

    expect(todoServiceSpy.addTodo).toHaveBeenCalledWith('New Task');
    expect(component.newTodo).toBe('');
    expect(todoServiceSpy.getTodos).toHaveBeenCalled();
  });

  it('should not add empty todo', () => {
    component.newTodo = '   ';
    component.addTodo();
    expect(todoServiceSpy.addTodo).not.toHaveBeenCalled();
  });

  it('should delete a todo and reload', () => {
    todoServiceSpy.deleteTodo.and.returnValue(of(null));
    todoServiceSpy.getTodos.and.returnValue(of([]));

    component.deleteTodo(1);

    expect(todoServiceSpy.deleteTodo).toHaveBeenCalledWith(1);
    expect(todoServiceSpy.getTodos).toHaveBeenCalled();
  });
});
