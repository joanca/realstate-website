import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';
import { setupEmbeddedFixture } from './test/utils/embeddedFixture';

describe('App embedded integration', () => {
  it('normalizes embedded wrapper structure after hydration', async () => {
    const { mountNode } = setupEmbeddedFixture();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      const wrapper = document.getElementById('wrapper');
      const reactRoot = document.getElementById('react-root');
      const main = document.querySelector('main#emily-realestate');
      const pushFooter = document.querySelector('.push-footer');
      const customFooter = document.querySelector('.custom-footer');

      expect(wrapper).toBeInTheDocument();
      expect(wrapper).not.toHaveAttribute('class');
      expect(reactRoot).toBeInTheDocument();
      expect(reactRoot).not.toHaveAttribute('class');
      expect(main?.parentElement).toBe(reactRoot);
      expect(reactRoot?.children).toHaveLength(1);
      expect(customFooter?.previousElementSibling).toBe(pushFooter);
    });
  });

  it('does not remove external stylesheets from host document', async () => {
    const { mountNode } = setupEmbeddedFixture();

    expect(document.getElementById('dashicons-css')).toBeInTheDocument();
    expect(document.getElementById('admin-bar-css')).toBeInTheDocument();
    expect(document.getElementById('mx_0-css')).toBeInTheDocument();
    expect(document.getElementById('mx_1-css')).toBeInTheDocument();
    expect(document.getElementById('app-styles')).toBeInTheDocument();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.getElementById('dashicons-css')).toBeInTheDocument();
      expect(document.getElementById('admin-bar-css')).toBeInTheDocument();
      expect(document.getElementById('mx_0-css')).toBeInTheDocument();
      expect(document.getElementById('mx_1-css')).toBeInTheDocument();
      expect(document.getElementById('app-styles')).toBeInTheDocument();
    });
  });
});
