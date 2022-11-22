import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
  const history = createMemoryHistory();
  render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  const link1 = screen.getByRole('link', {
    name: /home/i,
  });
  const link2 = screen.getByRole('link', {
    name: /about/i,
  });
  const link3 = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  expect(link1).toBeInTheDocument();
  expect(link2).toBeInTheDocument();
  expect(link3).toBeInTheDocument();
});
