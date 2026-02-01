# Clawdbot Web App - UI/UX Design Document

## Overview
This document outlines the minimal set of web UI screens for a single-user Clawdbot setup, mapping to Gateway/WebChat/Canvas concepts, along with PWA packaging and authentication strategy.

## Screen Architecture

### 1. Gateway Screen (`/gateway`)
**Purpose**: Configuration and connection management to the Clawdbot gateway server.

**Components**:
- Gateway URL input (default: `ws://localhost:18789`)
- Authentication token input (optional, auto-generated if not set)
- Connection status indicator (Disconnected/Connecting/Connected)
- Connection/Disconnection button
- Connection info panel

**Mobile Optimizations**:
- Large touch targets (min 44x44px)
- Simplified single-column layout
- Auto-save connection settings to localStorage
- Quick reconnect on app resume

**Integration Points**:
- WebSocket connection to port 18789
- Token authentication via query parameter
- Connection state management via React hooks/Zustand

---

### 2. WebChat Screen (`/chat`)
**Purpose**: Real-time conversation interface with Clawdbot AI assistant.

**Components**:
- Message list (scrollable, virtualized for performance)
- Message input field with send button
- Typing indicator
- Message status (sending/sent/error)
- Settings button (model selection, history clear)

**Mobile Optimizations**:
- Bottom-anchored input field (iOS keyboard safe)
- Pull-to-refresh for message history
- Haptic feedback on send
- Auto-scroll to latest message
- Optimistic UI updates

**Message Types**:
- User messages (right-aligned, blue)
- Assistant messages (left-aligned, gray)
- System messages (centered, small)
- Error messages (highlighted)

**Integration Points**:
- WebSocket for real-time messaging
- Message persistence to localStorage
- Markdown rendering for bot responses
- Code syntax highlighting

---

### 3. Canvas Screen (`/canvas`)
**Purpose**: AI-powered code editor and workspace for collaborative coding.

**Components**:
- File tree sidebar (collapsible on mobile)
- Code editor (Monaco or CodeMirror)
- Status bar (line count, language, file path)
- Save/Export buttons
- Mobile: Bottom toolbar with common actions

**Mobile Optimizations**:
- Swipe gestures to toggle sidebar
- Zoom/pinch support for code
- Virtual keyboard optimization
- Syntax highlighting with mobile-friendly colors
- Horizontal scroll for long lines

**Editor Features**:
- TypeScript/JavaScript support
- Syntax highlighting
- Auto-save to localStorage
- File management (create/rename/delete)
- AI code suggestions (future)

**Integration Points**:
- Gateway API for AI code assistance
- File system abstraction
- Version history (localStorage)

---

## Screen Flow Diagram

```
[Home] ─┬─> [Gateway] ──> Configure connection
        │
        ├─> [WebChat] ──> Chat with AI
        │
        └─> [Canvas]  ──> Code editor
```

**Navigation**:
- Bottom tab bar on mobile (Home, Chat, Canvas)
- Sidebar navigation on desktop
- Quick action floating button for new chat/file

---

## PWA → Bubblewrap TWA Packaging Plan

### Progressive Web App (PWA) Configuration

**Manifest (`/public/manifest.json`)**:
```json
{
  "name": "Clawdbot",
  "short_name": "Clawdbot",
  "display": "standalone",
  "orientation": "portrait-primary",
  "theme_color": "#0ea5e9",
  "background_color": "#ffffff",
  "start_url": "/",
  "icons": [
    { "src": "/icon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512x512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Service Worker** (via `next-pwa`):
- Cache-first strategy for static assets
- Network-first for API calls
- Offline fallback page
- Background sync for messages

**Install Prompts**:
- Desktop: Browser prompt after 2 sessions
- Mobile: Custom bottom banner with "Add to Home Screen"

---

### Bubblewrap TWA Conversion

**Purpose**: Convert PWA to native Android app (TWA = Trusted Web Activity).

**Tool**: [Bubblewrap CLI](https://github.com/GoogleChromeLabs/bubblewrap)

**Steps**:

1. **Initialize Bubblewrap project**:
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest=https://your-domain.com/manifest.json
```

2. **Configure TWA settings**:
```json
{
  "host": "your-domain.com",
  "name": "Clawdbot",
  "launcherName": "Clawdbot",
  "display": "standalone",
  "themeColor": "#0ea5e9",
  "navigationColor": "#ffffff",
  "backgroundColor": "#ffffff",
  "startUrl": "/",
  "iconUrl": "https://your-domain.com/icon-512x512.png",
  "maskableIconUrl": "https://your-domain.com/icon-maskable-512x512.png",
  "shortcuts": [
    { "name": "Chat", "url": "/chat" },
    { "name": "Canvas", "url": "/canvas" }
  ]
}
```

3. **Digital Asset Links** (for domain verification):
   - Add `.well-known/assetlinks.json` to web server
   - Configure SHA-256 fingerprint of signing key

4. **Build APK**:
```bash
bubblewrap build
```

5. **Publish to Play Store** (optional):
   - Sign APK with keystore
   - Upload to Google Play Console
   - Configure store listing

**TWA Benefits**:
- Native Android app experience
- Full screen (no browser UI)
- Splash screen
- App shortcuts
- Push notifications (future)
- Background sync

**TWA Limitations**:
- Requires HTTPS in production
- Domain verification needed
- Chrome Custom Tabs dependency
- Android only (iOS requires different approach)

---

## Authentication Strategy

### Single-User Setup Requirements

For a personal, single-user Clawdbot instance, authentication needs are simplified:

1. **Gateway Token**: Simple bearer token for WebSocket auth
2. **Local Session**: Browser-based session management
3. **No Multi-User**: Skip user registration/login flows
4. **Optional Lock Screen**: PIN/biometric for device security

---

### Option A: Authelia (Recommended for Home Labs)

**Pros**:
- Lightweight (single binary, ~30MB)
- Easy Docker deployment
- LDAP/File-based user backend
- 2FA support (TOTP, U2F, Duo)
- Session management
- Reverse proxy integration

**Cons**:
- Limited to authentication (no OAuth2 provider)
- Requires reverse proxy (Traefik/Nginx)
- Configuration complexity for advanced features

**Deployment**:
```yaml
# docker-compose.yml
authelia:
  image: authelia/authelia:latest
  volumes:
    - ./authelia:/config
  environment:
    - TZ=UTC
  ports:
    - 9091:9091
```

**Integration**:
- Place Authelia in front of Clawdbot gateway
- Configure Traefik/Nginx to forward auth
- Clawdbot reads authenticated user from headers

---

### Option B: Keycloak (Overkill for Single User)

**Pros**:
- Full-featured IAM platform
- OAuth2/OIDC provider
- Social login support
- User federation
- Rich admin UI

**Cons**:
- Heavy resource usage (~500MB RAM)
- Complex setup for simple use case
- Overkill for single-user
- Steeper learning curve

**When to Use**:
- Planning to expand to multi-user
- Need OAuth2 for other services
- Enterprise compliance requirements

---

### Option C: Simple Token Authentication (Recommended for MVP)

**For single-user Clawdbot instance, use built-in token auth**:

1. **Gateway Token** (already implemented):
   - Auto-generated on first run
   - Stored in environment variable
   - Passed via WebSocket query param

2. **Web App Token Storage**:
   - Store token in localStorage (encrypted)
   - Include in WebSocket connection
   - Auto-reconnect with stored token

3. **Optional PIN Lock**:
   - Client-side PIN protection
   - Biometric unlock (WebAuthn)
   - Lock after inactivity

**Implementation**:
```typescript
// Token storage
const TOKEN_KEY = 'clawdbot_token'

function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

// WebSocket connection
const ws = new WebSocket(`ws://localhost:18789?token=${getToken()}`)
```

---

## Threat Model Checklist

### Authentication Threats

| Threat | Mitigation | Priority |
|--------|-----------|----------|
| **Token Theft** | HTTPS only, short token expiry | High |
| **Session Hijacking** | Secure cookies, SameSite=Strict | High |
| **Brute Force** | Rate limiting, token complexity | Medium |
| **CSRF** | CSRF tokens, SameSite cookies | Medium |
| **XSS** | CSP headers, input sanitization | High |

### Network Threats

| Threat | Mitigation | Priority |
|--------|-----------|----------|
| **MITM Attack** | TLS/HTTPS only in production | High |
| **DNS Hijacking** | DNSSEC, HSTS headers | Medium |
| **Replay Attack** | Nonce in messages, timestamp validation | Low |
| **DDoS** | Rate limiting, Cloudflare | Low |

### Application Threats

| Threat | Mitigation | Priority |
|--------|-----------|----------|
| **Injection** | Parameterized queries, input validation | High |
| **Path Traversal** | Whitelist allowed paths | Medium |
| **Code Execution** | Sandbox exec tool, minimal privileges | High |
| **Data Leakage** | Encrypt sensitive data, minimal logging | Medium |

### Infrastructure Threats

| Threat | Mitigation | Priority |
|--------|-----------|----------|
| **Container Escape** | Run as non-root (UID 1000) | High |
| **Volume Exposure** | Minimal volume mounts, read-only where possible | Medium |
| **Secret Exposure** | Use Docker secrets, .env files | High |
| **Outdated Dependencies** | Automated updates, CVE scanning | Medium |

---

## Security Best Practices

### For Single-User Home Lab Setup:

1. **Network Isolation**:
   - Run on private network (VPN/Tailscale)
   - Don't expose to public internet
   - Use mTLS for external access

2. **Token Management**:
   - Generate strong tokens (32+ chars)
   - Rotate tokens periodically
   - Store securely (environment variables, not in code)

3. **Browser Security**:
   - Enable Content Security Policy (CSP)
   - Use Subresource Integrity (SRI) for CDN assets
   - Implement X-Frame-Options, X-Content-Type-Options

4. **Data Protection**:
   - Encrypt sensitive data at rest
   - Clear messages after N days
   - No PII in logs

5. **Monitoring**:
   - Log authentication attempts
   - Alert on suspicious activity
   - Regular backup of configuration

---

## Recommended Auth Strategy: Simple Token + Optional PIN

**For personal Clawdbot instance**:

1. **Use built-in gateway token** (already implemented)
2. **Add optional PIN lock in web app** (client-side)
3. **Deploy behind VPN/Tailscale** (network security)
4. **Skip Authelia/Keycloak** (unnecessary complexity)

**Future Enhancements** (if scaling to multi-user):
1. Implement Authelia for session management
2. Add user roles (admin, user)
3. Integrate with OAuth2 providers (Google, GitHub)

---

## Implementation Priority

### Phase 1 (MVP - Current):
- ✅ Gateway token authentication
- ✅ localStorage for token persistence
- ✅ Basic WebSocket security

### Phase 2 (PWA):
- 🔲 Service worker caching
- 🔲 Offline support
- 🔲 Install prompts

### Phase 3 (Native App):
- 🔲 Bubblewrap TWA setup
- 🔲 Play Store listing
- 🔲 App shortcuts

### Phase 4 (Enhanced Security):
- 🔲 Client-side PIN lock
- 🔲 Biometric authentication (WebAuthn)
- 🔲 Token rotation

### Phase 5 (Multi-User - Optional):
- 🔲 Authelia integration
- 🔲 User management
- 🔲 RBAC
