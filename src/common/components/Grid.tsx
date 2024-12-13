import { styled } from 'styled-components'

export const Headline = styled.div`
  font-family: var(--font-medium);
  font-size: 2em;
  margin-bottom: 0.5rem;
`
export const Headline2 = styled.div`
  font-family: var(--font-medium);
  font-size: 2.4em;
`

export const InfoText1 = styled.div`
  font-family: var(--font-regular);
  font-size: 1em;
`
export const Grid = styled.div`
  flex: 1;
  padding: 1rem;

  display: grid;
  grid-template-columns: minmax(auto, 10rem) 1fr minmax(auto, 10rem);
  grid-template-rows: minmax(auto, 8rem) auto auto;
  grid-template-areas:
    'leftbar logo rightbar'
    'leftbar main rightbar'
    'navigation navigation navigation';

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto minmax(2rem, auto) 1fr auto;
    gap: 1rem;
    grid-template-areas:
      ' logo '
      ' main '
      ' rightbar '
      ' leftbar '
      ' navigation ';
  }
`

export const Grid2 = styled.div`
  flex: 1;
  padding: 1rem;

  display: grid;
  grid-template-columns: minmax(auto, 10rem) 1fr minmax(auto, 10rem);
  grid-template-rows: minmax(auto, 8rem) auto auto;
  grid-template-areas:
    'leftbar logo rightbar'
    'leftbar main rightbar'
    'navigation navigation navigation';

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto minmax(2rem, auto) 1fr auto;
    gap: 1rem;
    grid-template-areas:
      ' logo logo '
      ' main main'
      ' rightbar leftbar'
      ' navigation navigation';
  }
`

export const Logo = styled.div`
  grid-area: logo;
`

export const Main = styled.div`
  grid-area: main;
`
export const Leftbar = styled.div`
  grid-area: leftbar;

  @media (max-width: 768px) {
   display:flex;
   justify-content: center;
   align-items: flex-end;
  }


`
export const Rightbar = styled.div`
  grid-area: rightbar;
  /* @media (max-width: 768px) {
    display: none;
  } */
`
export const Navigation = styled.div`
  grid-area: navigation;
`

export const MobileOnly = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`
export const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`
