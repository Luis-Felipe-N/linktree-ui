import { z } from 'zod'

export const addLinkBodySchema = z.object({
  url: z.string().url({ message: 'Invalid URL format.' }),
  title: z.string().max(100).optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  highlightEffect: z.string().optional(),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  type: z.enum(['link', 'embed', 'header']).optional(),
})

export type AddLinkBody = z.infer<typeof addLinkBodySchema>

// Schema para o backend (com transformação de datas)
export const addLinkBodyServerSchema = addLinkBodySchema.extend({
  scheduledStart: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
  scheduledEnd: z.string().datetime().optional().transform(val => val ? new Date(val) : undefined),
})
