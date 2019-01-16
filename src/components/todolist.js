/* eslint-disable react/button-has-type */
import React from 'react'

import './todolist.scss'

class TodoList extends React.Component {
  state = {
    tasks: [
      {
        text: 'Test Task',
        priority: 5,
      },
      {
        text: 'Test Task 2',
      }],
    inputValue: null,
  }

  addTask = () => {
    const { tasks } = this.state
    const newTask = {
      text: this.state.inputValue,
    }
    tasks.push(newTask)
    this.setState({
      tasks,
    })
  }

  deleteTask = (e) => {
    const { tasks } = this.state
    tasks.splice(e.target.getAttribute('index'), 1)
    this.setState({
      tasks,
    })
  }

  onChangeTask = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render() {
    return (
      <div className="container">
        <div className="main-app">
          <InputTask
            addTask={this.addTask}
            onChangeTask={this.onChangeTask}
            value={this.state.inputValue}
          />
          <ListOfTasks
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
          />
        </div>
      </div>
    )
  }
}


// COMPONENTS

const InputTask = ({ onChangeTask, value, addTask }) => (
  <div className="input">
    <input
      onChange={onChangeTask}
      value={value}
      type="text"
    />
    <button className="button" onClick={addTask}>
      Add
    </button>
  </div>
)


const ListOfTasks = ({ tasks, deleteTask }) => (
  <div>
    <ol>
      {tasks.map((task, i) => (
        <li>
          {task.text}
          <button index={i} onClick={deleteTask} type="reset">
            Delete
          </button>
        </li>
      ))
      }
    </ol>
  </div>
)

export default TodoList
