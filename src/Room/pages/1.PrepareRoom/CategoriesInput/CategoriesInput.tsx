import React, { FunctionComponent, useEffect, useState } from 'react'
import { Stack_l } from '../../../../common/everyLayout'
import { Headline, UnderHeadline } from '../styles'

import { useAppDispatch, useAppSelector } from '../../../hooks'
import { RoomState } from '../../../store'

import { SelectCategories } from './SelectCategories/SelectCategories'
import { DragDropList } from '../../../components/DragDropList/DragDropList'
import { OverLayList, ShowOverlayButton } from './styles'
import { boardCategories } from '../../../reducer'

export type values = {
  id: number
  value: string
}[]

export const CategoriesInput: FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const { boardSettings } = useAppSelector((state: RoomState) => state.room)
  const { categories } = boardSettings
  const [showOvelay, setShowOvelay] = useState(false)
  const [items, setItems] = useState<values>(
    categories.map((cat, i) => ({ id: i + 1, value: cat }))
  )

  const itemsCheckRef = React.useRef(items)

  useEffect(() => {
    itemsCheckRef.current = items // save userCheck state value to ref
  }, [items])

  useEffect(() => {
    return () => {
      const update = itemsCheckRef.current
      dispatch(boardCategories({ categories: update.map((cat) => cat.value) }))
    }
  }, [])

  const handleRemove = (value: string) => {
    const updated = items.filter((item) => item.value !== value)
    setItems(updated)
  }

  const handleAdd = (category: string) => {
    const highestId = Math.max(Math.max(...items.map((e) => e.id)), 1)
    const updated = [...items, { id: highestId + 1, value: category }]
    setItems(updated)
  }

  useEffect(() => {
    if (showOvelay) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }

    return () => {
      document.body.style.overflow = 'scroll'
    }
  }, [showOvelay])

  return (
    <>
      <div className="flex flex-col justify-center items-center w-[100%]">
        <Stack_l className="p-[0.5em]">
          <Stack_l className="text-center h-[6rem] ">
            <Headline>Categories</Headline>
            <UnderHeadline className="self-center text-center mt-[0.5em]">
              {'Select up to 10 categories.'}
            </UnderHeadline>
          </Stack_l>
          <Stack_l
            space="0.4em"
            className={'flex flex-col self-center  w-[100%]  max-w-[20rem] p-[0.2em]'}
          >
            <DragDropList items={items} setItems={setItems} />
            <ShowOverlayButton onClick={() => setShowOvelay(true)}>
              {'Add categories'}
            </ShowOverlayButton>
          </Stack_l>
        </Stack_l>
        <OverLayList move={showOvelay}>
          <SelectCategories
            categories={items.map((cat) => cat.value)}
            onClick={setShowOvelay}
            removeCategory={handleRemove}
            addCategory={handleAdd}
          />
        </OverLayList>
      </div>
    </>
  )
}
