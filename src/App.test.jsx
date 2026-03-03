import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';
import { setupEmbeddedFixture } from './test/utils/embeddedFixture.js';

describe('App embedded integration', () => {
  it('removes container classes from parent wrappers', async () => {
    const { mountNode } = setupEmbeddedFixture();

    render(<App />, { container: mountNode });

    await waitFor(() => {
      expect(document.querySelectorAll('.container')).toHaveLength(0);
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
