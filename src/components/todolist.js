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
        done: true,
        ts: 123456,
      },
      {
        text: 'Test Task 2',
        priority: 5,
        done: false,
        ts: 2345678,
      }],
    inputValue: '',
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

  setTaskAsDone = (i) => {
    const { tasks } = this.state
    const task = tasks[i]
    task.done = !task.done
    if (task.done) {
      tasks.splice(i, 1)
      tasks.push(task)
      const ding = new Audio('https://freesound.org/data/previews/66/66136_606715-lq.mp3')
      ding.play()
    } else if (!task.done) {
      // to be done to let the task goes back to it's initial position
    }

    console.log(tasks)
    this.setState({
      tasks,
    })
  }


  deleteTask = (i) => {
    const { tasks } = this.state

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
            setTaskAsDone={this.setTaskAsDone}
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


const ListOfTasks = ({ tasks, deleteTask, setTaskAsDone }) => (
  <div className="list-container">
    {tasks.map((task, i) => (
        <Task i={i} task={task} deleteTask={deleteTask} setTaskAsDone={setTaskAsDone}/>
      ))
      }
  </div>
)

class Task extends React.Component {
  render() {
    const done = this.props.task.done
    return (
      <div key={this.props.i} className="list" draggable>
        <FontAwesomeIcon
          icon={done ? ['fas', 'check-circle'] : ['far', 'check-circle']}
          onClick={() => this.props.setTaskAsDone(this.props.i)}
          className={`tooltiped icon okay ${done ? 'done' : ''}`}
        />
        <p className={`text ${done ? 'done' : ''}`}>
          {this.props.task.text}
        </p>
        <FontAwesomeIcon
          icon={['fas', 'times']}
          onClick={() => this.props.deleteTask(this.props.i)}
          className="icon delete"
        />
      </div>
    )
  }
}

export default TodoList
