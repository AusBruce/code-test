import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // make sure no pending HTTP requests
  });

  it('should fetch todos via GET', () => {
    const mockTodos = [{ id: 1, title: 'Test Task' }];

    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('http://localhost:5185/api/todo');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a todo via POST', () => {
    const title = 'New Task';
    const response = { id: 2, title: 'New Task' };

    service.addTodo(title).subscribe(todo => {
      expect(todo).toEqual(response);
    });

    const req = httpMock.expectOne('http://localhost:5185/api/todo');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ title });
    req.flush(response);
  });

  it('should delete a todo via DELETE', () => {
    const id = 1;

    service.deleteTodo(id).subscribe(result => {
      expect(result).toBeNull(); // because DELETE returns void
    });

    const req = httpMock.expectOne(`http://localhost:5185/api/todo/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
