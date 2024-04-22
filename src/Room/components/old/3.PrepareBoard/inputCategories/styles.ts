import { styled } from 'styled-components'

export const InputCategories = styled.div`
  /* border: 1px solid black; */
  border-radius: 0.2rem;
  background: var(--input-color);
  padding: 0.5em;
  color: black;
  font-size: 0.9em;
`

export const InputCategory = styled.div`
  display: flex;
  border: 0;
`

const BaseButton = styled.button`
  display: inline-block;
  border: none;
  text-decoration: none;
  background: var(--input-color);
  padding: 0.5em;
  border-radius: 0.2rem;

  &:hover,
  &:active {
    background-color: #cccccc;
  }

  &:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: 0 0 0 0.2rem darkgray;
  }
`

export const AddCategory = styled(BaseButton)`
  width: 100%;
  font-size: 1.5em;
`

export const RemoveCategory = styled(BaseButton)`
  font-size: 1.5em;
  margin: 0.2em;
`

export const WriteCategory = styled.input`
  font-size: 1em;
  margin: 0.3em;
  width: 10em;

  display: inline-block;
  border: none;
  text-decoration: none;
  background: var(--input-color);
  padding: 0.5em;
  border-radius: 0.2rem;

  &:hover,
  &:active {
    background-color: #cccccc;
  }

  &:focus {
    outline-style: solid;
    outline-color: transparent;
    box-shadow: 0 0 0 0.2rem darkgray;
  }
`
