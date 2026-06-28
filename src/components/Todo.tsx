import { Button, TextField } from '@mui/material'
import { useState } from 'react'

function Todo() {
  const [todos, setTodos] = useState([]) // hooks
  
  // controlled element
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleAddTodo = () => {
    const newTodos = [...todos, inputValue]
    setTodos(newTodos)
    setInputValue('')
  }

  return (
    <>
      <div>
        <h1>Todo</h1>
        <TextField size='small' type="text" placeholder="Add a new todo" value={inputValue} onChange={handleInputChange} />
        <Button style={{marginLeft: '10px'}} variant="contained" color="primary" onClick={handleAddTodo}>Click</Button>
        <ul>
          {todos.map((todo) => {
            return <li key={todo}>{todo}</li>
          })}
        </ul>
      </div>
    </>
  )
}

export default Todo
