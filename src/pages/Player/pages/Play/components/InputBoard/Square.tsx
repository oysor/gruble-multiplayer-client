import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { updateBoard } from '../../../../playerReducer';

interface SquareProps {
    board: string[][],
    coords: { x: number, y: number }
}

export const Square: FunctionComponent<SquareProps> = ({ board, coords }) => {

    const { x, y } = coords

    const dispatch = useDispatch()

    // handle input change
    const onInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        // deep copy array for every input
        const arr = [...Array(board.length)].map((a, i) => [...board[i]])
        arr[x][y] = value;
        dispatch(updateBoard(arr))
    };

    return (
        <div className="board-square">
            <input
                className={"input-square"}
                type="text"
                placeholder={"..."}
                onChange={
                    (ev: React.ChangeEvent<HTMLInputElement>,) => onInput(ev)
                }
            />
        </div>
    );
}