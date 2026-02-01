/**
 * Server-side API utilities and configurations
 * This directory contains backend services for the Clawdbot web app
 */

export const GATEWAY_CONFIG = {
  defaultUrl: process.env.CLAWDBOT_GATEWAY_URL || 'ws://localhost:18789',
  defaultToken: process.env.CLAWDBOT_GATEWAY_TOKEN || '',
  timeout: 30000,
}

export const SERVER_CONFIG = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
}
