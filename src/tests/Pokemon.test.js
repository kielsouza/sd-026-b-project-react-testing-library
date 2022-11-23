import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pokemonHref = '/pokemon/25';

describe('Testando Componente Pokemon', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', `${pokemonName.innerHTML} sprite`);
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    userEvent.click(allButton);
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(pokemonLink).toHaveAttribute('href', pokemonHref);
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const header = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(history.location.pathname).toBe(pokemonHref);
    expect(header).toHaveTextContent('Pikachu Details');
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>.', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(history.location.pathname).toBe(pokemonHref);
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados.', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(link);
    const favoriteCheck = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(favoriteCheck);
    const favoriteImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
