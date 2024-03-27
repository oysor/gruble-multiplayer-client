import styled from 'styled-components'

export const TableContainer = styled.div`
  position: relative;
  /* left: 10%; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-size: 0.6em; */
  font-size: 50%;
  max-width: 800px;
  color: black;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
  /* font-size: 0.9em; */

  th {
    background-color: #ff99bb;
    color: black;
    padding: 0.4em;
    border: 1px solid black;
    text-align: left;
  }

  td {
    background-color: hsl(240, 50%, 90%);
    padding: 0.4em;
    border: 1px solid #ddd;
    text-align: left;
  }

  tr td {
    border: 1px solid black;
  }

  tr:nth-child(even) td {
    background-color: hsl(240, 50%, 85%);
  }

  tr:hover td {
    background-color: #ddd;
  }
`
