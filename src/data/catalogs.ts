import { z } from 'zod'
import { roots } from './roots'

const contentStatusSchema = z.enum(['canon', 'proposal', 'pending', 'deprecated'])
const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
const baseEntrySchema = z.object({
  id: idSchema, name: z.string().min(1), status: contentStatusSchema,
  summary: z.string().min(1), tags: z.array(z.string().min(1)).optional(),
  sourceNotes: z.array(z.string().min(1)).optional(),
}).strict()

export const masterSchema = baseEntrySchema.extend({
  epithet: z.string().optional(), rootAffinities: z.array(idSchema).optional(),
  cultivationRealmId: idSchema.optional(), factionId: idSchema.optional(),
  philosophy: z.string().optional(), biography: z.string().optional(),
  techniqueIds: z.array(idSchema).optional(),
})
export const cultivationRealmSchema = baseEntrySchema.extend({
  order: z.number().int().positive().optional(), grades: z.array(z.string().min(1)).optional(),
  prerequisites: z.array(z.string().min(1)).optional(), breakthrough: z.string().optional(),
  risks: z.array(z.string().min(1)).optional(),
})
export const artifactSchema = baseEntrySchema.extend({
  rank: z.string().optional(), artifactType: z.string().optional(), origin: z.string().optional(),
  abilities: z.array(z.string().min(1)).optional(), limitations: z.array(z.string().min(1)).optional(),
  cost: z.string().optional(), ownerId: idSchema.optional(),
})
export const techniqueSchema = baseEntrySchema.extend({
  path: z.string().optional(), rank: z.string().optional(), requiredRealmId: idSchema.optional(),
  effects: z.array(z.string().min(1)).optional(), limitations: z.array(z.string().min(1)).optional(),
  cost: z.string().optional(),
})
export const factionSchema = baseEntrySchema.extend({
  ideology: z.string().optional(), territories: z.array(z.string().min(1)).optional(),
  hierarchy: z.array(z.string().min(1)).optional(), alliedFactionIds: z.array(idSchema).optional(),
  rivalFactionIds: z.array(idSchema).optional(),
})
export const adventureSchema = baseEntrySchema.extend({
  adventureType: z.string().optional(), worldScale: z.string().optional(), location: z.string().optional(),
  objectives: z.array(z.string().min(1)).optional(), consequences: z.array(z.string().min(1)).optional(),
  rewardIds: z.array(idSchema).optional(),
})
export const missionSchema = baseEntrySchema.extend({
  classification: z.string().optional(), issuerId: idSchema.optional(),
  objectives: z.array(z.string().min(1)).optional(), rewards: z.array(z.string().min(1)).optional(),
  risks: z.array(z.string().min(1)).optional(),
})
export const creatureSchema = baseEntrySchema.extend({
  species: z.string().optional(), habitat: z.array(z.string().min(1)).optional(),
  threatRank: z.string().optional(), abilities: z.array(z.string().min(1)).optional(),
  weaknesses: z.array(z.string().min(1)).optional(),
})
export const civilizationSchema = baseEntrySchema.extend({
  worldScale: z.string().optional(), government: z.string().optional(),
  culture: z.array(z.string().min(1)).optional(), history: z.string().optional(),
})

const catalogFileSchema = <T extends z.ZodType>(itemSchema: T) =>
  z.object({ version: z.literal(1), items: z.array(itemSchema) }).strict()

import mastersData from './catalogs/masters.json'
import cultivationRealmsData from './catalogs/cultivation-realms.json'
import artifactsData from './catalogs/artifacts.json'
import techniquesData from './catalogs/techniques.json'
import factionsData from './catalogs/factions.json'
import adventuresData from './catalogs/adventures.json'
import missionsData from './catalogs/missions.json'
import creaturesData from './catalogs/creatures.json'
import civilizationsData from './catalogs/civilizations.json'

export const contentCatalogsSchema = z.object({
  masters: catalogFileSchema(masterSchema),
  cultivationRealms: catalogFileSchema(cultivationRealmSchema),
  artifacts: catalogFileSchema(artifactSchema),
  techniques: catalogFileSchema(techniqueSchema),
  factions: catalogFileSchema(factionSchema),
  adventures: catalogFileSchema(adventureSchema),
  missions: catalogFileSchema(missionSchema),
  creatures: catalogFileSchema(creatureSchema),
  civilizations: catalogFileSchema(civilizationSchema),
}).strict().superRefine((catalogs, context) => {
  const seen = new Set<string>(roots.map((root) => root.id))
  for (const [catalogName, catalog] of Object.entries(catalogs)) {
    catalog.items.forEach((entry, index) => {
      if (seen.has(entry.id)) {
        context.addIssue({ code: 'custom', path: [catalogName, 'items', index, 'id'], message: `El ID "${entry.id}" ya existe en el universo.` })
      }
      seen.add(entry.id)
    })
  }

  const rootIds = new Set(roots.map((root) => root.id))
  const realmIds = new Set(catalogs.cultivationRealms.items.map((entry) => entry.id))
  const factionIds = new Set(catalogs.factions.items.map((entry) => entry.id))
  const techniqueIds = new Set(catalogs.techniques.items.map((entry) => entry.id))

  catalogs.masters.items.forEach((master, index) => {
    for (const rootId of master.rootAffinities ?? []) {
      if (!rootIds.has(rootId)) context.addIssue({ code: 'custom', path: ['masters', 'items', index, 'rootAffinities'], message: `Raíz desconocida: ${rootId}` })
    }
    if (master.cultivationRealmId && !realmIds.has(master.cultivationRealmId)) {
      context.addIssue({ code: 'custom', path: ['masters', 'items', index, 'cultivationRealmId'], message: 'El reino asociado no existe.' })
    }
    if (master.factionId && !factionIds.has(master.factionId)) {
      context.addIssue({ code: 'custom', path: ['masters', 'items', index, 'factionId'], message: 'La facción asociada no existe.' })
    }
    for (const techniqueId of master.techniqueIds ?? []) {
      if (!techniqueIds.has(techniqueId)) context.addIssue({ code: 'custom', path: ['masters', 'items', index, 'techniqueIds'], message: `Técnica desconocida: ${techniqueId}` })
    }
  })

  catalogs.techniques.items.forEach((technique, index) => {
    if (technique.requiredRealmId && !realmIds.has(technique.requiredRealmId)) {
      context.addIssue({ code: 'custom', path: ['techniques', 'items', index, 'requiredRealmId'], message: 'El reino requerido no existe.' })
    }
  })

  catalogs.factions.items.forEach((faction, index) => {
    for (const relationId of [...(faction.alliedFactionIds ?? []), ...(faction.rivalFactionIds ?? [])]) {
      if (!factionIds.has(relationId)) context.addIssue({ code: 'custom', path: ['factions', 'items', index], message: `Facción relacionada desconocida: ${relationId}` })
    }
  })
})

export const contentCatalogs = contentCatalogsSchema.parse({
  masters: mastersData, cultivationRealms: cultivationRealmsData, artifacts: artifactsData,
  techniques: techniquesData, factions: factionsData, adventures: adventuresData,
  missions: missionsData, creatures: creaturesData, civilizations: civilizationsData,
})

export type MasterEntry = z.infer<typeof masterSchema>
export type CultivationRealmEntry = z.infer<typeof cultivationRealmSchema>
export type ArtifactEntry = z.infer<typeof artifactSchema>
export type TechniqueEntry = z.infer<typeof techniqueSchema>
export type FactionEntry = z.infer<typeof factionSchema>
export type AdventureEntry = z.infer<typeof adventureSchema>
export type MissionEntry = z.infer<typeof missionSchema>
export type CreatureEntry = z.infer<typeof creatureSchema>
export type CivilizationEntry = z.infer<typeof civilizationSchema>
