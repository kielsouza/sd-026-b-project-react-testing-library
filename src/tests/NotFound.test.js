import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testando Componente NotFound', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found.', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem.', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
