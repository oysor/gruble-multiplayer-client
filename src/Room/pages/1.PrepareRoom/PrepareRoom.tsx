import React, { FunctionComponent, useState } from 'react'

import { useAppSelector } from '../../hooks'
import { Cluster_l } from '../../../common/everyLayout'
import { PondrButton } from '../../../common/components/buttons'

import { NameInput } from './NameInput'
import { TimeInput } from './TimeInput'
import { RoomState } from '../../store'
import { CategoriesInput } from './CategoriesInput/CategoriesInput'
import { CreateRoom } from './CreateGame'

export const PrepareRoom: FunctionComponent = () => {
  const { roomName, timeLimit } = useAppSelector((state: RoomState) => state.room)
  const [nextInput, setNextInput] = useState(0)

  const handleNextInput = (i: number) => {
    const next = nextInput + i

    console.log(next)

    if (next <= 0) {
      setNextInput(0)
    }

    if (next === 1 && roomName.length > 1) {
      setNextInput(next)
    }

    if (next === 2 && timeLimit > 1) {
      setNextInput(next)
    }

    if (next === 3) {
      setNextInput(next)
    }
  }

  function SetComponent(nextInput: number) {
    switch (nextInput) {
      case 0:
        return <NameInput />
      case 1:
        return <TimeInput />
      case 2:
        return <CategoriesInput />
      case 3:
        return <CreateRoom />
      default:
        return <div>Error: Invalid User Role</div>
    }
  }

  const isCreateRoom = nextInput === 3

  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="flex-1 ">{SetComponent(nextInput)}</div>
      <div className="flex flex-col">
        <div className="flex-1 flex flex-col">
          <Cluster_l justify="center" align="end" className="mb-[1rem]">
            <PondrButton
              invert
              transparent={isCreateRoom}
              onClick={() => {
                if (nextInput === 0) {
                  history.back()
                } else {
                  handleNextInput(-1)
                }
              }}
            >
              Back
            </PondrButton>
            {!isCreateRoom && (
              <PondrButton
                onClick={() => {
                  handleNextInput(1)
                }}
              >
                Next
              </PondrButton>
            )}
          </Cluster_l>
        </div>
      </div>
    </div>
  )
}
