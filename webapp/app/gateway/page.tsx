'use client'

import { useState } from 'react'

export default function GatewayPage() {
  const [gatewayUrl, setGatewayUrl] = useState('ws://localhost:18789')
  const [token, setToken] = useState('')
  const [status, setStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected')

  const handleConnect = () => {
    setStatus('connecting')
    // Connection logic will be implemented
    setTimeout(() => setStatus('connected'), 1000)
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Gateway Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Configure connection to Clawdbot gateway
        </p>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Gateway URL
            </label>
            <input
              type="text"
              value={gatewayUrl}
              onChange={(e) => setGatewayUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ws://localhost:18789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Gateway Token (Optional)
            </label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter gateway token"
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div>
            <p className="font-medium">Status</p>
            <p className={`text-sm ${
              status === 'connected' ? 'text-green-600' : 
              status === 'connecting' ? 'text-yellow-600' : 
              'text-gray-600'
            }`}>
              {status === 'connected' ? '● Connected' : 
               status === 'connecting' ? '◐ Connecting...' : 
               '○ Disconnected'}
            </p>
          </div>
          <button
            onClick={handleConnect}
            disabled={status === 'connecting'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'connected' ? 'Disconnect' : 'Connect'}
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2">Connection Info</h3>
          <ul className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
            <li>• Default gateway runs on port 18789</li>
            <li>• Use WebSocket protocol (ws:// or wss://)</li>
            <li>• Token is auto-generated if not set</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
