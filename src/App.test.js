import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main navigation links', () => {
  render(<App />);
  expect(screen.getByRole('link', { name: /inicio/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /sobre m[ií]/i }).length).toBeGreaterThan(0);
});
