import styled from 'styled-components'

export const TableContainer = styled.div`
  position: relative;
  /* left: 10%; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  max-width: 800px;
  color: black;
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 0.9em;

  th {
    background-color: #ff99bb;
    color: black;
    padding: 5px;
    border: 1px solid black;
    text-align: left;
  }

  td {
    background-color: hsl(240, 50%, 90%);
    padding: 5px;
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
