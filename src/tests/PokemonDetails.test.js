import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando Componente PokemonDetails', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonLink);
    const pokemon = screen.getByTestId('pokemon-name');
    const pokeTitle = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(pokeTitle).toHaveTextContent(`${pokemon.innerHTML} Details`);
    expect(pokemonLink).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();
    const summaryText = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);
    expect(summaryText).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonLink);
    const pokemonName = screen.getByTestId('pokemon-name');
    const locationsTitle = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(locationsTitle).toBeInTheDocument();
    const mapsArray = screen.getAllByRole('img', {
      name: /pikachu location/i,
    });
    expect(mapsArray).toHaveLength(2);
    const map1 = screen.getByText(/kanto viridian forest/i);
    const map2 = screen.getByText(/kanto power plant/i);
    expect(map1).toBeInTheDocument();
    expect(map2).toBeInTheDocument();
    expect(mapsArray[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsArray[0]).toHaveAttribute('alt', `${pokemonName.innerHTML} location`);
    expect(mapsArray[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(mapsArray[1]).toHaveAttribute('alt', `${pokemonName.innerHTML} location`);
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(pokemonLink);
    const favoriteCheck = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    const favoriteImg = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteImg).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    expect(favoriteImg).not.toBeInTheDocument();
    const favoriteText = screen.getByText(/pokémon favoritado/i);
    expect(favoriteText).toBeInTheDocument();
  });
});
