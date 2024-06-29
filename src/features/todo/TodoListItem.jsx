import React from 'react'
import timesSolid from './times-solid.svg'

import { useSelector, useDispatch } from 'react-redux'
import { availableColors, capitalize } from '../filters/colors'

const selectTodoById = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId)
}

const TodoListItem = ({ id }) => {
  const todo = useSelector(state => selectTodoById(state,id))
  const { text, completed, color } = todo

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch({ type: 'todos/todoToggled', payload: id })
  }

  const handleColorChanged = () => {
    dispatch({ type: 'todos/colorSelected', payload: { color, id } })
  }

  const handleDeleteClick = () => {
    dispatch({ type: 'todos/todoDeleted', payload: id })
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={handleDeleteClick}>
            <img src={timesSolid}/>
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
