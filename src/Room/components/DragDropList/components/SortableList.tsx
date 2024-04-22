import React, { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Active, UniqueIdentifier } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'

import './SortableList.css'

import { DragHandle, SortableItem, SortableOverlay } from '.'
import { DragWrapper, RemoveHandle } from './SortableItem/SortableItem'

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
}

interface BaseItem {
  id: UniqueIdentifier
  //   handleRemove: (id: UniqueIdentifier) => void
}

interface Props<T extends BaseItem> {
  items: T[]
  onChange(items: T[]): void
  renderItem(item: T): ReactNode
}

export function SortableList<T extends BaseItem>({
  items,
  onChange,
  renderItem,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  )
  const sensors = useSensors(
    // useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      measuring={measuringConfig}
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id)
          const overIndex = items.findIndex(({ id }) => id === over.id)

          onChange(arrayMove(items, activeIndex, overIndex))
        }
        setActive(null)
      }}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items}>
        <ul className="SortableList" role="application">
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <SortableOverlay>{activeItem ? renderItem(activeItem) : null}</SortableOverlay>
    </DndContext>
  )
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle
SortableList.RemoveHandle = RemoveHandle
SortableList.DragWrapper = DragWrapper
