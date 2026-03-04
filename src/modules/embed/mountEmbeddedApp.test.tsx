import { waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { setupEmbeddedFixture } from '../../test/utils/embeddedFixture'
import { mountEmbeddedApp } from './mountEmbeddedApp'

function TestApp() {
  return <div>Embedded app mounted</div>
}

describe('mountEmbeddedApp', () => {
  it('reuses shadow setup nodes across repeated mounts', async () => {
    const { mountNode } = setupEmbeddedFixture()

    mountEmbeddedApp(TestApp)
    mountEmbeddedApp(TestApp)

    const shadowRoot = mountNode.shadowRoot
    expect(shadowRoot).toBeTruthy()

    expect(shadowRoot?.querySelectorAll('#emily-shadow-base')).toHaveLength(1)
    expect(shadowRoot?.querySelectorAll('#emily-shadow-stylesheet')).toHaveLength(1)
    expect(shadowRoot?.querySelectorAll('#emily-shadow-app')).toHaveLength(1)

    const stylesheet = shadowRoot?.querySelector<HTMLLinkElement>('#emily-shadow-stylesheet')
    expect(stylesheet).toBeTruthy()
    stylesheet?.dispatchEvent(new Event('load'))

    await waitFor(() => {
      const appNode = shadowRoot?.querySelector('#emily-shadow-app')
      expect(appNode?.textContent).toContain('Embedded app mounted')
    })
  })
})
