export interface IceCastRoot {
  icecast: Icecast
}

export interface Icecast {
  "listen-socket": ListenSocket[]
  authentication: Authentication
  limits: Limits
  hls: Hls
  mount: Mount[]
  relay: Relay[]
}

export interface ListenSocket {
  port: number
  "bind-address": string
}

export interface Authentication {
  "admin-password": string
  "health-password": string
}

export interface Limits {
  workers: string
  clients: number
  "max-http-header-size": number
}

export interface Hls {
  enabled: number
}

export interface Mount {
  "mount-name": string
  username?: string
  password?: string
  "max-listeners"?: number
  "fallback-mount"?: string
  "fallback-override"?: number
  "fallback-when-full"?: number
  "max-listener-duration"?: number
  hidden?: number
  "health-password"?: string
  hls?: number
  preroll?: string
  postroll?: string
  "midroll-webhook"?: string
  "default-midroll-title"?: string
  type?: string
  bitrate?: number
  channels?: number
  samplerate?: number
}

export interface Relay {
  url: string
  "local-mount": string
  "on-demand": number
  "auto-stop"?: number
  "hls-relay"?: number
}
