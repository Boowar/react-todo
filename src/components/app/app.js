import React, { Component } from "react"

import AppHeader from "../app-header"
import SearchPanel from "../search-panel"
import TodoList from "../todo-list"
import ItemStatusFilter from "../item-status-filter"
import ItemAddForm from "../item-add-form"

import "./app.css"

export default class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch"),
    ],
    term: "",
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
    }
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      return { todoData: todoData.filter(item => item.id !== id) }
    })
  }

  addItem = text => {
    this.setState(({ todoData }) => {
      let newItem = this.createTodoItem(text)
      return {
        todoData: [...todoData, newItem],
      }
    })
  }

  toggleProperty(arr, id, propName) {
    return arr.map(item => {
      if (item.id === id) {
        return { ...item, [propName]: !item[propName] }
      } else return { ...item }
    })
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important"),
      }
    })
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done"),
      }
    })
  }

  onSearchChange = term => {
    this.setState({ term })
  }

  search(items, term) {
    if (items.length !== 0) {
      return items.filter(item => {
        return item.label.indexOf(term) > -1
      })
    } else return items
  }

  render() {
    const { todoData, term } = this.state

    const visibleItems = this.search(todoData, term)

    const doneCount = todoData.filter(item => item.done).length

    const todoCount = todoData.length - doneCount

    return (
      <div className='todo-app'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    )
  }
}
