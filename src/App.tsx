import { useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "active" | "completed";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const addTask = () => {
    if (!value.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      text: value,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setValue("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          placeholder="Новая задача"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={addTask}>
          Добавить
        </button>
      </div>


      <div>
        <button onClick={() => setFilter("all")}>
          Все
        </button>
        <button onClick={() => setFilter("active")}>
          Активные
        </button>
        <button onClick={() => setFilter("completed")}>
          Выполненные
        </button>
      </div>

      <ul>
        {filteredTasks.map((t) => (
          <li key={t.id}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
            />
            <span>
              {t.text}
            </span>
          </li>
        ))}
      </ul>

    
      <div>
        <span>Активных задач: {activeCount}</span>
        <button
          onClick={clearCompleted}
        >
          Удалить завершённые
        </button>
      </div>
    </div>
  );
}

export default App;
