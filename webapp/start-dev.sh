#!/bin/bash

# Quick start script for Clawdbot Web App development

set -e

echo "🚀 Starting Clawdbot Web App Development Setup"
echo ""

# Check Node.js version
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Navigate to webapp directory
cd "$(dirname "$0")"

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo ""
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Clawdbot Gateway Configuration
CLAWDBOT_GATEWAY_URL=ws://localhost:18789
CLAWDBOT_GATEWAY_TOKEN=

# Server Configuration
PORT=3000
NODE_ENV=development
EOF
    echo "✅ Created .env.local"
fi

# Type check
echo ""
echo "🔍 Running type check..."
npm run type-check

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  cd webapp"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "Make sure Clawdbot gateway is running on port 18789!"
