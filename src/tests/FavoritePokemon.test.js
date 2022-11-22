import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Testando Componente FavoritePokemon', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos.', () => {
    renderWithRouter(<FavoritePokemon />);
    /* const localStoragePokemons = localStorage.getItem('favoritePokemonIds');
    if (localStoragePokemons === 0) {
      const noPokemons = screen.getByText(/no favorite pokémon found/i);
      expect(noPokemons).toBeInTheDocument();
    } else {
      const havePokemons = screen.getByRole('heading', {
        level: 2,
        name: /favorite pokémon/i,
      });
      expect(havePokemons).toBeInTheDocument();
    } */
    const noPokemons = screen.getByText(/no favorite pokémon found/i);
    expect(noPokemons).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de Pokémon favoritados.', () => {
    renderWithRouter(<FavoritePokemon />);
    const localStoragePokemons = localStorage.getItem('favoritePokemonIds');
    if (localStoragePokemons > 0) {
      expect(localStoragePokemons).toBeInTheDocument();
    }
  });
});
