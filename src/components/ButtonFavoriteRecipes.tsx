import { Container, Button, Img } from './styles/ButtonFavoriteRecipesStyles';

type ButtonProps = {
  imgSrc: string;
  altText: string;
  buttonText: string;
  datatestid: string;
};

function ButtonFavoriteRecipes({ imgSrc, altText, buttonText, datatestid }: ButtonProps) {
  return (
    <Container>
      <Button
        data-testid={ datatestid }
      >
        <Img src={ imgSrc } alt={ altText } />
      </Button>
      <p>{buttonText}</p>
    </Container>
  );
}

export default ButtonFavoriteRecipes;
