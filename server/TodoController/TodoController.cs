using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
    private static List<TodoItem> Todos = new();
    private static int nextId = 1;

    [HttpGet]
    public IActionResult Get() => Ok(Todos);

    [HttpPost]
    public IActionResult Post([FromBody] TodoItem item)
    {
        item.Id = nextId++;
        Todos.Add(item);
        return Ok(item);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var todo = Todos.FirstOrDefault(t => t.Id == id);
        if (todo == null) return NotFound();
        Todos.Remove(todo);
        return NoContent();
    }
}
