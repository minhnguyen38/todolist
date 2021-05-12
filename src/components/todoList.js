import React, { useState, useEffect } from 'react'
import { Input, Button } from 'antd';

const TodoList = () => {
  const [inputValue, setInputValue] = useState("")
  const [taskArr, setTaskArr] = useState([])
  const [editTask, setEditTask] = useState(null)

  const onInputChange = e => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (editTask) setInputValue(editTask.title)
    else setInputValue("")
  }, [setInputValue, editTask])

  const onTodosSubmit = () => {
    if (!editTask) {
      setTaskArr([...taskArr, { id: Date.now(), title: inputValue, completed: false }]);
      setInputValue("")
    } else updateTask(editTask.id, inputValue, editTask.completed)
  }

  const updateTask = (id, title, completed) => {
    const newTask = taskArr.map(item =>
      item.id === id ? { id, title, completed } : item
    )
    setTaskArr(newTask)
    setEditTask("")
  }

  const handleCompleted = (taskId) => {
    setTaskArr(taskArr.map((item) => {
      if (item.id === taskId) return { ...item, completed: !item.completed }
      return item
    }))
  }

  const handleEdit = (taskId) => {
    const findTask = taskArr.find(task => task.id === taskId)
    setEditTask(findTask)
  }

  const handleDelete = (id) => {
    setTaskArr(taskArr.filter(task => task.id !== id))
  }


  const dataTable = taskArr.map((task) => {
    let taskStatus
    if (task.completed === false) taskStatus = <span>Task này chưa hoàn thành</span>
    else taskStatus = <span>Task này đã hoàn thành</span>
    return (
      <li key={task.id}>
        {task.title}
        <Button
          type="primary"
          onClick={() => handleCompleted(task.id)}
        >Completed</Button>
        <Button
          type="primary"
          onClick={() => handleEdit(task.id)}
        >Edit</Button>
        <Button
          type="primary"
          onClick={() => handleDelete(task.id)}
        >Delete</Button>
        {taskStatus}
      </li>
    )
  })

  return (
    <>
      <h1>Todolist</h1>
      <div>
        <Input
          style={{ width: 200 }}
          type="text"
          placeholder="Thêm 1 task"
          value={inputValue}
          required
          onChange={onInputChange}
        />
        <Button
          onClick={onTodosSubmit}
          type="primary"
        >{editTask ? "Sửa" : "Thêm"}</Button>
      </div>
      {dataTable}
    </>
  );
}

export default TodoList