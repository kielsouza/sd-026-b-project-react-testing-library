import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../pages/Pokedex';
import App from '../App';

describe('Testando Componente Pokedex', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon.', () => {
    renderWithRouter(<App />);
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémon/i,
    });
    expect(headingText).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado.', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(/pikachu/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/charmander/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/caterpie/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/ekans/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/alakazam/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/mew/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/rapidash/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/snorlax/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/dragonair/i);
  });
  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(1);
    userEvent.click(nextButton);
    expect(pokemons).toHaveLength(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const allButton = screen.getByRole('button', { name: /all/i });
    const pokemon = screen.getByTestId('pokemon-name');
    const nextButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(allButton).toBeInTheDocument();
    userEvent.click(filterButton[0]); // electric click
    // electric pokemons
    expect(pokemon).toHaveTextContent(/pikachu/i);
    userEvent.click(filterButton[1]); // fire click
    // fire pokemons
    expect(pokemon).toHaveTextContent(/charmander/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/rapidash/i);
    userEvent.click(filterButton[2]); // bug click
    // bug pokemons
    expect(pokemon).toHaveTextContent(/caterpie/i);
    userEvent.click(filterButton[3]); // poison click
    // poison pokemons
    expect(pokemon).toHaveTextContent(/ekans/i);
    userEvent.click(filterButton[4]); // psychic click
    // psychic pokemons
    expect(pokemon).toHaveTextContent(/alakazam/i);
    userEvent.click(nextButton);
    expect(pokemon).toHaveTextContent(/mew/i);
    userEvent.click(filterButton[5]); // normal click
    // normal pokemons
    expect(pokemon).toHaveTextContent(/snorlax/i);
    userEvent.click(filterButton[6]); // dragon click
    expect(pokemon).toHaveTextContent(/dragonair/i);
  });
});
