# Clawdbot Web App

Modern, mobile-first Progressive Web App (PWA) interface for Clawdbot AI assistant.

## Features

- 🎨 **Modern UI**: Built with Next.js 14 and Tailwind CSS
- 📱 **Mobile-First**: Optimized for mobile devices with responsive design
- 🔄 **PWA Support**: Install as a native app on any device
- 🌐 **Three Core Interfaces**:
  - **Gateway**: Configure and manage connection to Clawdbot
  - **WebChat**: Real-time chat with AI assistant
  - **Canvas**: Code editor and workspace
- ⚡ **Real-Time**: WebSocket integration for instant messaging
- 🎯 **TypeScript**: Full type safety across frontend and backend
- 🔒 **Secure**: Token-based authentication with security best practices

## Project Structure

```
webapp/
├── app/                    # Next.js App Router pages
│   ├── gateway/           # Gateway configuration screen
│   ├── chat/              # WebChat interface
│   ├── canvas/            # Code editor screen
│   ├── api/               # API routes
│   └── components/        # Shared React components
├── server/                # Backend server code
│   ├── config.ts         # Server configuration
│   └── gateway-client.ts # WebSocket client for Clawdbot gateway
├── shared/                # Shared code (types, utils)
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Utility functions
├── public/                # Static assets
│   └── manifest.json     # PWA manifest
├── package.json          # Dependencies
├── next.config.js        # Next.js + PWA configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Running Clawdbot instance (gateway on port 18789)

### Installation

```bash
cd webapp
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Clawdbot Gateway
CLAWDBOT_GATEWAY_URL=ws://localhost:18789
CLAWDBOT_GATEWAY_TOKEN=your-gateway-token

# Server
PORT=3000
NODE_ENV=production
```

### Gateway Connection

The app connects to Clawdbot gateway via WebSocket:
- **Default URL**: `ws://localhost:18789`
- **Authentication**: Bearer token (optional, auto-generated if not set)
- **Protocol**: WebSocket with JSON messages

## Screens

### 1. Gateway (`/gateway`)
Configure connection to Clawdbot gateway server.

**Features**:
- URL configuration
- Token authentication
- Connection status
- Auto-reconnect

### 2. WebChat (`/chat`)
Real-time chat interface with AI assistant.

**Features**:
- Message history
- Real-time messaging via WebSocket
- Typing indicators
- Markdown support
- Code syntax highlighting

### 3. Canvas (`/canvas`)
Code editor and workspace.

**Features**:
- File management
- Syntax highlighting
- Auto-save to localStorage
- Multiple file support
- Mobile-optimized editor

## Progressive Web App (PWA)

### Installing as App

**Desktop**:
1. Visit the app in Chrome/Edge
2. Look for install icon in address bar
3. Click "Install" to add to desktop

**Mobile**:
1. Open in mobile browser
2. Tap "Add to Home Screen" 
3. Icon appears on home screen
4. Opens in fullscreen mode

### Offline Support

The PWA includes a service worker that:
- Caches static assets for offline use
- Provides network-first strategy for API calls
- Enables offline fallback page
- Syncs messages in background

## Converting to Android App (TWA)

See [DESIGN.md](./DESIGN.md#pwa--bubblewrap-twa-packaging-plan) for detailed instructions on converting to a native Android app using Bubblewrap.

Quick steps:
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://your-domain.com/manifest.json
bubblewrap build
```

## Security

### Authentication

- **Token-based**: Bearer token for gateway authentication
- **Client-side storage**: Token stored in localStorage
- **HTTPS only**: Production must use HTTPS
- **CSP headers**: Content Security Policy enabled

### Threat Model

See [DESIGN.md](./DESIGN.md#threat-model-checklist) for complete threat model and mitigations.

### Best Practices

1. Run behind VPN/Tailscale for personal use
2. Use strong gateway tokens (32+ characters)
3. Enable HTTPS in production
4. Rotate tokens periodically
5. Don't expose to public internet without additional auth

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: React 18 + Tailwind CSS
- **PWA**: next-pwa
- **State**: Zustand (planned)
- **WebSocket**: socket.io-client
- **TypeScript**: Full type safety
- **Icons**: Native emojis (no dependencies)

## Mobile Optimizations

- Touch-friendly UI (44px minimum touch targets)
- Bottom-anchored inputs (iOS keyboard safe)
- Swipe gestures
- Haptic feedback
- Pull-to-refresh
- Optimistic UI updates
- Responsive breakpoints: mobile → tablet → desktop

## Development

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Docker Integration

To integrate with the main Clawdbot Docker image, add to `Dockerfile`:

```dockerfile
# Build webapp
WORKDIR /tmp/clawdbot-webapp
COPY webapp/ .
RUN npm ci && npm run build

# Copy to runtime
COPY --from=builder /tmp/clawdbot-webapp/.next /app/.next
COPY --from=builder /tmp/clawdbot-webapp/public /app/public
```

Add to `docker-compose.yml`:
```yaml
ports:
  - "3000:3000"   # Web App
  - "18789:18789" # Gateway
```

## Future Enhancements

- [ ] Real WebSocket integration with Clawdbot gateway
- [ ] Message persistence (IndexedDB)
- [ ] Code editor improvements (Monaco/CodeMirror)
- [ ] File upload/download
- [ ] Voice input (Web Speech API)
- [ ] Push notifications
- [ ] Dark mode (system preference)
- [ ] i18n (internationalization)
- [ ] Theming support

## License

This web app is part of the Clawdbot Docker project. See the main repository for licensing information.

## Support

For issues, questions, or contributions, please visit the [main repository](https://github.com/NobPolish/clawdbot-docker).
