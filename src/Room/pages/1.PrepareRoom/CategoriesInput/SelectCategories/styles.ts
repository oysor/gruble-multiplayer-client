import { styled } from 'styled-components'

export const TransparentButton = styled.button`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  appearance: none;

  padding: 0.8em;
  color: white;

  touch-action: none;
  cursor: var(--cursor, pointer);
`

export const BulletIcon = styled.div`
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  appearance: none;

  padding: 0.8em;
  font-size: 0.5em;
  color: black;

  justify-content: flex-start;
  gap: 1em;

  align-items: center;
  touch-action: none;
  cursor: var(--cursor, pointer);
`

export const ConfirmBox = styled.div`
  position: sticky;
  bottom: 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-bottom: 1.5em;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 36.52%);
`

export const OverLayTop = styled.div`
  width: 100%;
  background: linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, #fff 36.52%);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 3em;
`

export const OverLayButton = styled.button`
  display: flex;
  background-color: transparent;
  justify-content: center;
  align-items: center;

  border: none;
  outline: none;
  appearance: none;

  padding: 0.8em;
  color: white;

  touch-action: none;
  cursor: var(--cursor, pointer);

  width: 100%;
  background: linear-gradient(360deg, rgba(255, 255, 255, 0) 0%, #fff 36.52%);
`

export const OverLayContainer = styled.div`
  position: static;
  width: 100%;
  margin-top: 5em;
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;

  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  background-color: rgba(255, 255, 255, var(--tw-bg-opacity));

  background-color: white;

  border-radius: 13px;
  display: block;
  outline: 0.125rem solid transparent;
  outline-offset: -0.125rem;
`
