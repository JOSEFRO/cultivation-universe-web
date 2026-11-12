import { z } from 'zod'
import rootData from './roots.json'

export const rootSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  mark: z.string().min(1),
  essence: z.string().min(1),
  description: z.string().min(1),
  path: z.string().min(1),
}).strict()

export const rootsDocumentSchema = z.object({
  version: z.literal(1),
  roots: z.array(rootSchema).length(7),
}).strict().superRefine((document, context) => {
  const ids = document.roots.map((root) => root.id)
  if (new Set(ids).size !== ids.length) {
    context.addIssue({ code: 'custom', path: ['roots'], message: 'Los identificadores de las raíces deben ser únicos.' })
  }
})

const rootsDocument = rootsDocumentSchema.parse(rootData)
export type RootEntry = z.infer<typeof rootSchema>
export const roots: RootEntry[] = rootsDocument.roots
