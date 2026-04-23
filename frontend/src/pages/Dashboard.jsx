import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = ({ user, setUser }) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(response.data)
    } catch (err) {
      setError('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks`,
        { title: newTask },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTasks([response.data, ...tasks])
      setNewTask('')
    } catch (err) {
      setError('Failed to add task')
    }
  }

  const toggleTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token')
      const task = tasks.find(t => t._id === taskId)
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`,
        { title: task.title, completed: !task.completed },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ))
    } catch (err) {
      setError('Failed to update task')
    }
  }

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(tasks.filter(task => task._id !== taskId))
    } catch (err) {
      setError('Failed to delete task')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="container">
      <div className="card">
        <div className="user-info">
          Welcome, {user?.name}!
        </div>
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
        
        <h2>My Tasks</h2>
        
        {error && <div className="error">{error}</div>}
        
        <form className="add-task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No tasks yet. Add one above!</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task._id)}
                />
                <span className="task-title">{task.title}</span>
                <div className="task-actions">
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
