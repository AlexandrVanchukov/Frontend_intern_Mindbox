import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Todo App", () => {
  test("рендерит заголовок", () => {
    render(<App />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  });

  test("можно добавить задачу", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Первая задача" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Первая задача")).toBeInTheDocument();
  });

  test("можно отметить задачу выполненной", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Задача 1" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(screen.getByText("Задача 1")).toHaveClass("line-through");
  });

  test("фильтры работают корректно", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    // Добавляем 2 задачи
    fireEvent.change(input, { target: { value: "Активная" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Выполненная" } });
    fireEvent.click(addButton);

    // Делаем вторую выполненной
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    // Фильтр "Активные"
    fireEvent.click(screen.getByText("Активные"));
    expect(screen.getByText("Активная")).toBeInTheDocument();
    expect(screen.queryByText("Выполненная")).not.toBeInTheDocument();

    // Фильтр "Выполненные"
    fireEvent.click(screen.getByText("Выполненные"));
    expect(screen.getByText("Выполненная")).toBeInTheDocument();
    expect(screen.queryByText("Активная")).not.toBeInTheDocument();

    // Фильтр "Все"
    fireEvent.click(screen.getByText("Все"));
    expect(screen.getByText("Активная")).toBeInTheDocument();
    expect(screen.getByText("Выполненная")).toBeInTheDocument();
  });

  test("кнопка удаляет завершённые задачи", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Задача X" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByText(/Удалить завершённые/i));

    expect(screen.queryByText("Задача X")).not.toBeInTheDocument();
  });

  test("считает количество активных задач", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: "Задача A" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Задача B" } });
    fireEvent.click(addButton);

    // Делаем одну выполненной
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    expect(screen.getByText(/Активных задач: 1/)).toBeInTheDocument();
  });
});
