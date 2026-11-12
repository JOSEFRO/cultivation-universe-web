import { z } from 'zod'
import rootData from './roots.json'

export const rootSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  mark: z.string().min(1),
  essence: z.string().min(1),
  description: z.string().min(1),
  path: z.string().min(1),
})

export const rootsDocumentSchema = z.object({
  version: z.literal(1),
  roots: z.array(rootSchema).length(7),
})

// Fail during development/build rather than silently showing incomplete canon data.
const rootsDocument = rootsDocumentSchema.parse(rootData)

export type RootEntry = z.infer<typeof rootSchema>
export const roots: RootEntry[] = rootsDocument.roots
