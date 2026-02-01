import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Clawdbot
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
          Your Personal AI Assistant
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Link 
            href="/gateway" 
            className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Gateway</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect to Clawdbot gateway
            </p>
          </Link>
          
          <Link 
            href="/chat" 
            className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">WebChat</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Chat with your AI assistant
            </p>
          </Link>
          
          <Link 
            href="/canvas" 
            className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Canvas</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Code editor and workspace
            </p>
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            📱 This is a Progressive Web App (PWA). Install it on your device for the best experience!
          </p>
        </div>
      </div>
    </main>
  )
}
