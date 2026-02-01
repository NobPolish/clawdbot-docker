'use client'

import { useState } from 'react'

interface File {
  id: string
  name: string
  content: string
}

export default function CanvasPage() {
  const [files, setFiles] = useState<File[]>([
    {
      id: '1',
      name: 'example.ts',
      content: '// Welcome to Clawdbot Canvas\n// Your AI-powered code editor\n\nfunction greet(name: string): string {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));'
    }
  ])
  const [activeFileId, setActiveFileId] = useState('1')
  const [showFileList, setShowFileList] = useState(false)

  const activeFile = files.find(f => f.id === activeFileId)

  const handleContentChange = (content: string) => {
    setFiles(files.map(f => 
      f.id === activeFileId ? { ...f, content } : f
    ))
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFileList(!showFileList)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg md:hidden"
            >
              ☰
            </button>
            <h1 className="text-xl font-bold">Canvas</h1>
            {activeFile && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {activeFile.name}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Save
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
              ⚙️
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* File Sidebar */}
        <aside className={`
          ${showFileList ? 'block' : 'hidden'} md:block
          w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto
        `}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase text-gray-600 dark:text-gray-400">
                Files
              </h2>
              <button className="text-sm text-blue-600 hover:text-blue-700">
                + New
              </button>
            </div>
            <div className="space-y-1">
              {files.map(file => (
                <button
                  key={file.id}
                  onClick={() => {
                    setActiveFileId(file.id)
                    setShowFileList(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm ${
                    file.id === activeFileId
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  📄 {file.name}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 flex flex-col">
          {activeFile ? (
            <>
              <div className="flex-1 overflow-hidden">
                <textarea
                  value={activeFile.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-900 resize-none focus:outline-none"
                  spellCheck={false}
                />
              </div>
              
              {/* Status Bar */}
              <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-xs text-gray-600 dark:text-gray-400 flex justify-between">
                <span>Lines: {activeFile.content.split('\n').length}</span>
                <span>TypeScript</span>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <p>No file selected</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
