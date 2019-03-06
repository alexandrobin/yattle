/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  observer,
  inject,
} from 'mobx-react'
import Pomodoro from './pomodoro'
import '../style/todolist.scss'
import { TaskController } from '../controllers'


@inject(({ session }) => ({ session }))
@observer
class TodoList extends React.Component {
  state = {
    tasks: [],
    inputValue: '',
  }

  componentDidMount() {
    const self = this
    console.log(self.props.session.user)
    this.loadTasks()
  }

  setTaskAsDone = (i, id) => {
    const { tasks } = this.state
    const task = tasks[i]
    task.status = !task.status
    TaskController.mutate
      .update()
      .withId(id)
      .withContent({
        status: task.status,
      })
      .catch(err => console.log(err))
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


  deleteTask = (i, id) => {
    const { tasks } = this.state
    tasks.splice(i, 1)
    TaskController.mutate
      .delete()
      .withId(id)
      .catch(err => console.log(err))
    this.setState({
      tasks,
    })
  }

  onEditTask = (e, i, id) => {
    const { tasks } = this.state
    tasks[i].content = e.target.value
    TaskController.mutate
      .update()
      .withId(id)
      .withContent({
        content: e.target.value,
      })
      .catch(err => console.log(err))
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


  addTask = (event) => {
    console.log(this.state.inputValue)
    if (event.key === 'Enter') {
      TaskController.mutate
        .create()
        .withContent({
          content: this.state.inputValue,
          status: false,
        })
        .catch(err => console.log(err))
      const {
        tasks,
      } = this.state
      const newTask = {
        content: this.state.inputValue,
      }
      tasks.push(newTask)
      console.log({
        tasks,
      })
      this.setState({
        tasks,
        inputValue: '',
      })
    }
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
        i={i}
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
      setTaskAsDone, task, i, id, onEditTask, deleteTask,
    } = this.props
    const status = task.status
    return (

      <div key={i} className="list" draggable>
        <FontAwesomeIcon
          icon={status ? ['fas', 'check-circle'] : ['far', 'check-circle']}
          onClick={() => setTaskAsDone(i, id)}
          className={`tooltiped icon okay ${status ? 'done' : ''}`}
        />
        <input
          type="text"
          className={
            `text ${status ? 'done' : ''}`
          }
          value={task.content}
          onChange={(e) => {
            onEditTask(e, i, id)
          }}

        />
        <Pomodoro />
        <FontAwesomeIcon
          icon={['fas', 'trash']}
          onClick={() => deleteTask(i, id)}
          className="icon delete"
        />
      </div>
    )
  }
}

export default TodoList
