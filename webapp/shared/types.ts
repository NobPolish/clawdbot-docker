/**
 * Shared TypeScript types and interfaces for Clawdbot Web App
 * Used across frontend (app) and backend (server) code
 */

export interface ClawdbotMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    error?: string;
  };
}

export interface ClawdbotSession {
  id: string;
  userId: string;
  createdAt: Date;
  lastActivity: Date;
  messages: ClawdbotMessage[];
}

export interface ClawdbotConfig {
  gatewayUrl: string;
  gatewayToken?: string;
  websocketUrl: string;
  model?: string;
}

export interface GatewayStatus {
  online: boolean;
  model: string;
  version: string;
  capabilities: string[];
}

export interface AuthUser {
  id: string;
  username: string;
  displayName?: string;
  avatar?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
  status?: 'sending' | 'sent' | 'error';
}

export interface CanvasProject {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  files: CanvasFile[];
}

export interface CanvasFile {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  lastModified: Date;
}

export type WebSocketEvent = 
  | { type: 'message'; payload: ChatMessage }
  | { type: 'status'; payload: GatewayStatus }
  | { type: 'typing'; payload: { isTyping: boolean } }
  | { type: 'error'; payload: { message: string } };
