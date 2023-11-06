import styled from 'styled-components';

export const Container = styled.div`
height: 100vh;

display: flex;
flex-direction: column;
align-items: center;

button {
border: none;
background-color: transparent;

color: #797D86;
font-size: 1rem;
font-style: normal;
font-weight: 500;
line-height: normal;
letter-spacing: 0.48px;
text-transform: capitalize;
}`;

export const Title = styled.div`
margin-top: 1.25rem;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

h1 {
margin-top: 1.25rem;
color: #41197F;
text-align: center;
font-size: 20px;
font-style: normal;
font-weight: 900;
line-height: normal;
letter-spacing: 2.1px;
text-transform: uppercase;
}
`;

export const ContainerDoneRecipes = styled.div`
display: flex;
align-items: center;
justify-content: start;
gap: 1.875rem;

width: 13.5898125rem;
height: 2.41825rem;
flex-shrink: 0;

margin-top: 1.875rem;

`;

export const ContainerFavoriteRecipes = styled.div`
display: flex;
align-items: center;
justify-content: start;
gap: 1.875rem;

width: 13.5625rem;
height: 2.41825rem;
flex-shrink: 0;

`;

export const ContainerLogout = styled.div`
display: flex;
align-items: center;
justify-content: start;
gap: 1.875rem;

width: 13.75rem;
height: 2.41825rem;
flex-shrink: 0;

`;

export const Line = styled.div`
width: 18.125rem;
height: 0.5px;
background: #B1B1B1;
margin: 2.5rem 0;
`;
