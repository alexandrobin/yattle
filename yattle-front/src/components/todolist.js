/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pomodoro from './pomodoro'
import './todolist.scss'

class TodoList extends React.Component {
  state = {
    tasks: [
      {
        content: 'Test Task',
        priority: 5,
        done: true,
        ts: 123456,
      },
      {
        content: 'Test Task 2',
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

  onEditTask = (e) => {
    const { tasks } = this.state
    console.log(e)
  }

  onChangeTask = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  render() {
    const { data } = this.props
    return (
      <div className="container">
        <div className="main-app">
          <InputTask
            addTask={this.addTask}
            onChangeTask={this.onChangeTask}
            value={this.state.inputValue}
          />
          <ListOfTasks
            data={data}
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


const ListOfTasks = ({
  tasks, deleteTask, setTaskAsDone, onEditTask, data,
}) => (
  <div className="list-container">
    {tasks.map((task, i) => (
      <Task i={i} task={task} deleteTask={deleteTask} setTaskAsDone={setTaskAsDone} onEditTask={onEditTask} />
    ))
      }
  </div>
)

class Task extends React.Component {
  render() {
    const {
      setTaskAsDone, task, i, onEditTask, deleteTask,
    } = this.props
    const done = task.done
    return (

      <div key={i} className="list" draggable>
        <FontAwesomeIcon
          icon={done ? ['fas', 'check-circle'] : ['far', 'check-circle']}
          onClick={() => setTaskAsDone(i)}
          className={`tooltiped icon okay ${done ? 'done' : ''}`}
        />
        <p
          contentEditable
          className={
          `text ${done ? 'done' : ''}`
        }
          onChange={onEditTask}
        >
          {task.content}
        </p>
        <Pomodoro />
        <FontAwesomeIcon
          icon={['fas', 'trash']}
          onClick={() => deleteTask(i)}
          className="icon delete"
        />
      </div>
    )
  }
}

export default TodoList
