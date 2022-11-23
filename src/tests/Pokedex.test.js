import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
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
    if (pokemon === /dragonair/i) {
      userEvent.click(nextButton);
      expect(pokemon).toHaveTextContent(/pikachu/i);
    }
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
    const pokemonButtons = screen.getAllByTestId('pokemon-type-button');
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    pokemonTypes.forEach((p, i) => {
      expect(pokemonButtons[i].innerHTML).toBe(p);
      const pokeType = screen.getByTestId('pokemon-type');
      const button = screen.getByRole('button', {
        name: pokemonButtons[i].innerHTML,
      });
      userEvent.click(button);
      expect(pokeType).toHaveTextContent(p);
    });
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    expect(pikachu).toBeInTheDocument();
  });
});
