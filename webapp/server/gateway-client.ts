/**
 * WebSocket client for connecting to Clawdbot gateway
 * Handles message sending/receiving and connection management
 */

import { GATEWAY_CONFIG } from './config'
import type { WebSocketEvent } from '../shared/types'

export class GatewayClient {
  private ws: WebSocket | null = null
  private url: string
  private token?: string
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5

  constructor(url?: string, token?: string) {
    this.url = url || GATEWAY_CONFIG.defaultUrl
    this.token = token || GATEWAY_CONFIG.defaultToken
  }

  connect(onEvent: (event: WebSocketEvent) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = this.token 
          ? `${this.url}?token=${this.token}`
          : this.url

        this.ws = new WebSocket(wsUrl)

        this.ws.onopen = () => {
          console.log('Connected to Clawdbot gateway')
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            onEvent(data)
          } catch (error) {
            console.error('Failed to parse message:', error)
          }
        }

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log('Disconnected from gateway')
          this.handleReconnect(onEvent)
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private handleReconnect(onEvent: (event: WebSocketEvent) => void) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)
      
      console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`)
      
      setTimeout(() => {
        this.connect(onEvent).catch(console.error)
      }, delay)
    }
  }

  send(data: any) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      console.error('WebSocket is not connected')
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN
  }
}
