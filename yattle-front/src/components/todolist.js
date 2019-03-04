/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react'
import Query from '@foundationjs/query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Pomodoro from './pomodoro'
import { LoginForm, SigninForm } from './login'
import './todolist.scss'
import { TaskController, UserController } from '../controllers'

class TodoList extends React.Component {
  state = {
    tasks: [],
    inputValue: '',
  }

  addTask = (event) => {
    console.log(this.state.inputValue)
    if (event.key === 'Enter') {
      const { tasks } = this.state
      const newTask = {
        content: this.state.inputValue,
      }
      tasks.push(newTask)
      console.log({ tasks })
      this.setState({
        tasks,
        inputValue: '',
      })
    }
  }

  setTaskAsDone = (i) => {
    const { tasks } = this.state
    const task = tasks[i]
    task.status = !task.status
    if (task.status) {
      tasks.splice(i, 1)
      tasks.push(task)
      const ding = new Audio('https://freesound.org/data/previews/66/66136_606715-lq.mp3')
      ding.play()
    } else if (!task.status) {
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

  onEditTask = (e, i) => {
    const { tasks } = this.state
    tasks[i].content = e.target.value
    const _id = e.target.id
    TaskController.mutate
      .update({
        _id,
      })
      .withContent({
        content: e.target.value,
      })
    this.setState({
      tasks,
    })
  }

  onChangeTask = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  loadTasks = async () => {
    const tasks = await TaskController.query
      .list()
      .select({
        content: true,
        status: true,
        _id: true,
      })
      .catch(err => console.log(err))
    this.setState({ tasks })
  }

  componentDidMount() {
    this.loadTasks()
  }

  render() {
    return (
      <div className="container">
        <button onClick={this.loadTasks}>Load Task</button>
        <LoginForm />
        <SigninForm />
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
            onEditTask={this.onEditTask}
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
  tasks, deleteTask, setTaskAsDone, onEditTask,
}) => (
  <div className="list-container">
    {tasks.map((task, i) => (
      <Task
        id={
        task._id
      }
        key={
        i
      }
        task={
        task
      }
        deleteTask={
        deleteTask
      }
        setTaskAsDone={
        setTaskAsDone
      }
        onEditTask={
        onEditTask
      }
      />
    ))
      }
  </div>
)

class Task extends React.Component {
  render() {
    const {
      setTaskAsDone, task, i, onEditTask, deleteTask,
    } = this.props
    const status = task.status
    return (

      <div key={i} className="list" draggable>
        <FontAwesomeIcon
          icon={status ? ['fas', 'check-circle'] : ['far', 'check-circle']}
          onClick={() => setTaskAsDone(i)}
          className={`tooltiped icon okay ${status ? 'done' : ''}`}
        />
        <input
          type="text"
          className={
            `text ${status ? 'done' : ''}`
          }
          value={task.content}
          onChange={(e) => {
            onEditTask(e, i)
          }}

        />
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
