import { describe, expect, it } from 'vitest'
import { roots, rootsDocumentSchema } from '../../src/data/roots'
import { contentCatalogs, contentCatalogsSchema } from '../../src/data/catalogs'

describe('Catálogo de las siete raíces', () => {
  it('contiene exactamente siete raíces', () => expect(roots).toHaveLength(7))
  it('mantiene identificadores únicos', () => expect(new Set(roots.map((root) => root.id)).size).toBe(7))
  it('rechaza versiones no soportadas', () => {
    expect(rootsDocumentSchema.safeParse({ version: 2, roots }).success).toBe(false)
  })
  it('rechaza identificadores duplicados', () => {
    expect(rootsDocumentSchema.safeParse({ version: 1, roots: [...roots.slice(0, 6), roots[0]] }).success).toBe(false)
  })
})

describe('Catálogos de contenido', () => {
  it('carga nueve categorías vacías sin inventar entradas', () => {
    expect(Object.keys(contentCatalogs)).toHaveLength(9)
    for (const catalog of Object.values(contentCatalogs)) {
      expect(catalog.version).toBe(1)
      expect(catalog.items).toEqual([])
    }
  })
  it('rechaza entradas sin estado editorial', () => {
    const base = { id: 'maestro-prueba', name: 'Maestro de prueba', summary: 'Entrada inválida' }
    const empty = { version: 1, items: [] }
    const invalid = {
      masters: { version: 1, items: [base] },
      cultivationRealms: empty, artifacts: empty, techniques: empty, factions: empty,
      adventures: empty, missions: empty, creatures: empty, civilizations: empty,
    }
    expect(contentCatalogsSchema.safeParse(invalid).success).toBe(false)
  })
  it('rechaza IDs repetidos entre categorías', () => {
    const entry = { id: 'registro-unico', name: 'Registro', status: 'proposal', summary: 'Prueba' }
    const empty = { version: 1, items: [] }
    const duplicate = {
      masters: { version: 1, items: [entry] },
      cultivationRealms: { version: 1, items: [{ ...entry, order: 1 }] },
      artifacts: empty, techniques: empty, factions: empty, adventures: empty,
      missions: empty, creatures: empty, civilizations: empty,
    }
    expect(contentCatalogsSchema.safeParse(duplicate).success).toBe(false)
  })
})
