import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);
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

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(link);
    expect(history.location.pathname).toBe('/about');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    userEvent.click(link);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/notfound');
    });
    const errorMsg = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(errorMsg).toBeInTheDocument();
  });
});
