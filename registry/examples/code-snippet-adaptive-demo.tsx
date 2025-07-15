"use client"

import React from "react"
import { PrismTheme } from "prism-react-renderer"

import { CodeSnippet } from "@/registry/media/code-snippet"

// Light theme - clean and professional
const lightTheme: PrismTheme = {
  plain: {
    color: "#24292f",
    backgroundColor: "#ffffff",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#656d76",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#cf222e",
        fontWeight: "600",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#0a3069",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#0550ae",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#8250df",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#953800",
        fontWeight: "500",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#24292f",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#116329",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#0550ae",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#0a3069",
      },
    },
  ],
}

// Dark theme - modern and vibrant
const darkTheme: PrismTheme = {
  plain: {
    color: "#e6edf3",
    backgroundColor: "#0d1117",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "#7d8590",
        fontStyle: "italic",
      },
    },
    {
      types: ["keyword", "operator"],
      style: {
        color: "#ff7b72",
        fontWeight: "600",
      },
    },
    {
      types: ["string", "char"],
      style: {
        color: "#a5d6ff",
      },
    },
    {
      types: ["number"],
      style: {
        color: "#79c0ff",
      },
    },
    {
      types: ["function", "method"],
      style: {
        color: "#d2a8ff",
      },
    },
    {
      types: ["class-name", "type"],
      style: {
        color: "#ffa657",
        fontWeight: "500",
      },
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: "#e6edf3",
      },
    },
    {
      types: ["tag"],
      style: {
        color: "#7ee787",
      },
    },
    {
      types: ["attr-name"],
      style: {
        color: "#79c0ff",
      },
    },
    {
      types: ["attr-value"],
      style: {
        color: "#a5d6ff",
      },
    },
  ],
}

export default function CodeSnippetAdaptiveDemo() {
  const reactCode = `import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      const newTodo: TodoItem = {
        id: crypto.randomUUID(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      }
      setTodos(prev => [...prev, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Todo App
      </h1>
      
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>
      </form>

      <div className="flex gap-2 mb-4">
        {(['all', 'active', 'completed'] as const).map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={\`px-3 py-1 rounded-md text-sm transition-colors \${
              filter === filterType
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }\`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {filteredTodos.map(todo => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-md mb-2"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="rounded"
            />
            <span
              className={\`flex-1 \${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }\`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {todos.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}

export default TodoApp`

  return (
    <div className="w-full py-4">
      <div className="mb-4 text-sm text-muted-foreground">
        The code snippet automatically follows your theme preference. This demo
        shows custom light and dark themes that switch automatically.
      </div>

      <CodeSnippet
        title="TodoApp.tsx"
        code={reactCode}
        language="typescript"
        adaptiveTheme={{
          light: lightTheme,
          dark: darkTheme,
        }}
        showLineNumbers={true}
      />
    </div>
  )
}
