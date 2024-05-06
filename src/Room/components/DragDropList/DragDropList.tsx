import React, { FunctionComponent } from 'react'
import { SortableList } from './components/SortableList'

type Item = {
  id: number
  value: string
}

type DragDropListProps = {
  items: Item[]
  setItems: (value: Item[]) => void
}

export const DragDropList: FunctionComponent<DragDropListProps> = ({
  items,
  setItems,
}) => {
  const removeItem = (value: string) => {
    const updated = items.filter((item) => item.value !== value)
    setItems(updated)
  }

  return (
    <SortableList
      items={items}
      onChange={setItems}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <div className="flex w-[100%] items-center">
            <SortableList.DragHandle />

            <div className="flex-[1] flex items-center">
              <span>{item.value}</span>
            </div>

            <SortableList.RemoveHandle onClick={() => removeItem(item.value)} />
          </div>
        </SortableList.Item>
      )}
    />
  )
}
