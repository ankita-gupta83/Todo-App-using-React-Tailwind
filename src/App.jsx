import { useState, useEffect, useRef } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const isFirstRender = useRef(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const handleEdit = (id) => {
    let newText = todos.filter(i => i.id === id)
    setTodo(newText[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);


  }
  const handleDelete = (id) => {
    setTodos(
      todos.filter((t) => t.id !== id)
    );
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    // console.log(todos)

  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  }

  const toggleChange = () => {
    setshowFinished(!showFinished)
  }


  return (
    <>
      <div className="main min-h-screen bg-linear-to-br from-indigo-50 to-violet-100" >
        <Navbar />
        <div className="todos">
          {/* todo heading section */}
          <div className="todo max-w-xl mx-auto mt-2 sm:mt-10 bg-white rounded-xl shadow p-4 sm:p-6 sm:mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-4 text-left">
              Manage Your Tasks
            </h2>
            <div className="addtodo">
              <input onChange={handleChange} value={todo} className='sm:w-1/2 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400' type="text" placeholder='add new todo..' />
              <button onClick={handleAdd} disabled={todo.length <= 3} className='sm:mx-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white disabled:bg-gray-400 px-5 py-2 rounded-lg font-medium w-full mt-2 sm:w-auto'>Add</button>
            </div>

            <div className="showFinished flex gap-1 mt-5">
              <input onChange={toggleChange} type="checkbox" checked={showFinished} name="" id="" />
              <p className='text-xs'> Show Finished</p>
            </div>

            <div className="sep h-[0.5px] bg-gray-300 my-3"></div>

            {/* todo lists */}
            <div className="todolist mt-2">
              <h3 className="text-base sm:text-lg font-semibold text-violet-600 mb-3">
                Your Todos
              </h3>

              <div className="notodo">
                {todos.length === 0 && (
                  <p className="text-gray-400 text-sm text-center sm:text-left">
                    No todos yet ✨
                  </p>
                )}
              </div>

              {todos.map(item => {
                return (showFinished || !item.isCompleted) && <div key={item.id} className="list flex items-center justify-between mb-2">


                  <div className="text-sm flex bg-indigo-50 p-3 rounded-2xl w-3/4">

                    <input onChange={() => handleCheckbox(item.id)} name={item.id} type="checkbox" checked={item.isCompleted} id="" className='mr-2' />

                    <p className={item.isCompleted ? "line-through text-gray-600" : ""} >{item.todo}</p> </div>

                  <div className="buttons  ml-2 flex gap-4 sm:gap-2 justify-end">
                    <button onClick={() => handleEdit(item.id)} className="text-md text-indigo-600 hover:underline cursor-pointer">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-md text-indigo-600 hover:underline cursor-pointer">
                      <RiDeleteBin2Fill />
                    </button>
                  </div>
                </div>
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App