import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  
  const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "Все" },
  { key: "active", label: "Активные" },
  { key: "completed", label: "Выполненные" },
];

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
    <div className="max-w-md mx-auto mt-8 font-sans">
      <h1 className="text-6xl mb-4 text-center">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          placeholder="Новая задача"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Добавить
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {filters.map(({key, label}) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1 rounded ${filter === key ? "bg-gray-800 text-white" : "bg-gray-200"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((t) => (
          <li key={t.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(t.id)}
              className="w-4 h-4"
            />
            <span className={t.completed ? "line-through text-gray-500" : ""}>
              {t.text}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-600">Активных задач: {activeCount}</span>
        <button
          onClick={clearCompleted}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Удалить завершённые
        </button>
      </div>
    </div>
  );
}

export default App;
