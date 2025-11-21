/**
 * Types generated from Prisma schema (hand-written to match backend model names).
 *
 * Notes / contract:
 * - DateTime fields are represented as ISO strings (e.g. "2025-11-02T12:34:56.000Z").
 * - Field names use the same names as the Prisma schema (snake_case) to match the API payloads.
 * - Relation fields are represented by their foreign key IDs on the top-level objects (e.g. `ownerId`, `pageId`).
 *   Optional nested objects (like `theme` or `links`) may be included by the API; when present they follow the interfaces below.
 */
export type ISODateString = string

export interface User {
  id: string
  username: string
  email: string
  password_hash: string
  created_at: ISODateString
  updated_at: ISODateString

  pages?: Page[]
}

export interface Page {
  id: string
  slug: string
  title?: string | null
  description?: string | null
  imageUrl?: string | null
  username?: string | null
  createdAt: ISODateString
  updatedAt: ISODateString

  ownerId: string
  owner: User

  theme: Theme
  links: Link[]
}

export interface Theme {
  id: string
  title: string
  created_at: ISODateString
  active: boolean

  pageId: string
  page?: Page

  backgroundId?: string | null
  background?: Background | null
  buttonId?: string | null
  button?: Button | null

  // Campos adicionais do schema Prisma
  key?: string | null
  editable?: boolean | null
  luminance?: string | null
  typeface?: any | null // JSON
  socialStyle?: any | null // JSON
  heading?: any | null // JSON
  footer?: any | null // JSON
}

export interface Background {
  id: string
  created_at: ISODateString
  active: boolean

  type: string
  style?: string | null
  className?: string | null
  properties?: any | null // JSON - CSSProperties
  noise?: boolean | null

  // Campos opcionais para compatibilidade
  color?: string | null
  gradientStart?: string | null
  gradientEnd?: string | null
  gradientDirection?: string | null
  imageUrl?: string | null
  videoUrl?: string | null

  themes?: Theme[]
}

export interface Button {
  id: string
  created_at: ISODateString
  active: boolean

  style: string
  className?: string | null
  properties?: any | null

  themes?: Theme[]
}

export interface Link {
  id: string
  created_at: ISODateString
  updated_at: ISODateString
  active: boolean
  title?: string | null
  url: string
  order: number
  thumbnailUrl?: string | null
  clickCount: number
  highlightEffect?: string | null
  scheduledStart?: ISODateString | null
  scheduledEnd?: ISODateString | null
  type?: string
  isLocked?: boolean

  pageId: string
  page?: Page
}

/**
 * Helpful utility types
 */
export type PartialLinkUpdate = Partial<Pick<Link, 'title' | 'url' | 'order' | 'active' | 'scheduledStart' | 'scheduledEnd'>>

/**
 * Appearance / theme types used by the frontend (match example JSON shape)
 */
import type { CSSProperties } from 'react'

export type Luminance = 'LIGHT' | 'DARK'

export interface AppearanceBackground {
  color?: string | null
  style?: string | null
  type?: string | null
  gradientStart?: string | null
  gradientEnd?: string | null
  gradientDirection?: string | null
  className?: string | null
  properties?: CSSProperties | null
  noise?: boolean | null
  image?: string | null
  imageUrl?: string | null
}

export interface AppearanceButton {
  type?: string | null
  className?: string | null
  properties?: CSSProperties | null
}

export interface AppearanceTypeface {
  color?: string | null
  family?: string | null
}

export interface AppearanceHeadingOptions {
  type?: string | null
  logo?: string | null
  font?: string | null
  color?: string | null
  size?: string | null
  effect?: string | null
  logoSize?: string | null
}

export interface AppearanceFooter {
  logoUrl?: string | null
  url?: string | null
  color?: string | null
}

export interface AppearanceTheme {
  key?: string | null
  editable?: boolean | null
  luminance?: Luminance | null
  background?: AppearanceBackground | null
  button?: AppearanceButton | null
  socialStyle?: { color?: string | null } | null
  typeface?: AppearanceTypeface | null
  heading?: AppearanceHeadingOptions | null
  footer?: AppearanceFooter | null
}
