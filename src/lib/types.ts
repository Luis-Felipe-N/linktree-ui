/**
 * Types generated from Prisma schema (hand-written to match backend model names).
 *
 * Notes / contract:
 * - DateTime fields are represented as ISO strings (e.g. "2025-11-02T12:34:56.000Z").
 * - Field names use the same names as the Prisma schema (snake_case) to match the API payloads.
 * - Relation fields are represented by their foreign key IDs on the top-level objects (e.g. `ownerId`, `pageId`).
 *   Optional nested objects (like `theme` or `links`) may be included by the API; when present they follow the interfaces below.
 */

// ISO date string for serialized DateTime fields from the API
export type ISODateString = string

export interface User {
  id: string
  username: string
  email: string
  password_hash: string
  created_at: ISODateString
  updated_at: ISODateString

  // If the API embeds pages, they will be an array of Page objects.
  pages?: Page[]
}

export interface Page {
  id: string
  slug: string
  title?: string | null
  description?: string | null
  imageUrl?: string | null
  createdAt: ISODateString
  updatedAt: ISODateString

  // owner relation
  ownerId: string
  owner?: User

  // optional theme and links
  theme?: Theme | null
  links?: Link[]
}

export interface Theme {
  id: string
  title: string
  created_at: ISODateString
  active: boolean

  // relation to Page
  pageId: string
  page?: Page

  // optional relations to background and button
  backgroundId?: string | null
  background?: Background | null
  buttonId?: string | null
  button?: Button | null
}

export interface Background {
  id: string
  created_at: ISODateString
  active: boolean

  type: string
  color?: string | null
  gradientStart?: string | null
  gradientEnd?: string | null
  gradientDirection?: string | null
  imageUrl?: string | null
  videoUrl?: string | null

  style?: string | null

  // If API embeds themes that reference this background
  themes?: Theme[]
}

export interface Button {
  id: string
  created_at: ISODateString
  active: boolean

  style: string
  color: string
  textColor: string
  fontFamily?: string | null
  fontWeight?: string | null
  shadowStyle?: string | null
  shadowColor?: string | null

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

  // relation to Page
  pageId: string
  page?: Page
}

/**
 * Helpful utility types
 */
export type PartialLinkUpdate = Partial<Pick<Link, 'title' | 'url' | 'order' | 'active' | 'scheduledStart' | 'scheduledEnd'>>

// No runtime default export needed — file only exports types.
