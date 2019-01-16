/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  addTask = (event) => {
    if (event.key === 'Enter') {
      const { tasks } = this.state
      const newTask = {
        text: this.state.inputValue,
      }
      tasks.push(newTask)
      this.setState({
        tasks,
      })
    }
  }

  deleteTask = (i) => {
    const { tasks } = this.state
    console.log(i)
    tasks.splice(i, 1)
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
    <label className="input-label">
    What's on your path today ?
      <input
          className="input-round"
          onChange={onChangeTask}
          value={value}
          type="text"
          onKeyPress={addTask}
        />
    </label>
    
    
  </div>
)


const ListOfTasks = ({ tasks, deleteTask }) => (
  <div>
    <ol>
      {tasks.map((task, i) => (
        <li>
          {task.text}
          <FontAwesomeIcon key={i} icon={'fas','trash'} onClick={() => deleteTask(i)} className="icon-button"/>
        </li>
      ))
      }
    </ol>
  </div>
)

export default TodoList
