import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Testando Componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const infosPokedex = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    expect(infosPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const titlePokedex = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(titlePokedex).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const text1 = screen.getByText(
      'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon',
    );
    const text2 = screen.getByText(
      'One can filter Pokémon by type, and see more details for each one of them',
    );
    expect(text1).toBeInTheDocument();
    expect(text2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: (url disp. no readme)', () => {
    renderWithRouter(<About />);
    const imgPokedex = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
