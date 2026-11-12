import { expect, test } from '@playwright/test'

test('el códice permite consultar las raíces', async ({ page }) => {
  await page.goto('/')
  const selector = page.getByRole('group', { name: 'Seleccionar una raíz' })
  await expect(selector).toBeVisible()
  await selector.getByRole('button', { name: /Vacío/ }).click()
  await expect(page.getByRole('heading', { name: 'Vacío' })).toBeVisible()
  await expect(page.getByText('Lo que existe entre todo')).toBeVisible()
  await selector.getByRole('button', { name: /Tiempo/ }).click()
  await expect(page.getByRole('heading', { name: 'Tiempo' })).toBeVisible()
  await expect(page.getByText('El curso de las eras')).toBeVisible()
})
