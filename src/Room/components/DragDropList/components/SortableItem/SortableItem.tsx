import React, { createContext, useContext, useMemo } from 'react'
import type { CSSProperties, PropsWithChildren } from 'react'
import type { DraggableSyntheticListeners, UniqueIdentifier } from '@dnd-kit/core'
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Close from '../../../../../assets/svg/close.svg'
import Drag from '../../../../../assets/svg/drag.svg'
import './SortableItem.css'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function animateLayoutChanges(args: any) {
  const { isSorting, wasDragging } = args

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args)
  }

  return true
}

interface Props {
  id: UniqueIdentifier
}

interface Context {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ animateLayoutChanges, id })

  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li className="SortableItem" ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button className="DragHandle" {...attributes} {...listeners} ref={ref}>
      <Drag />
    </button>
  )
}

interface DragWrapperProps {
  children: JSX.Element | string
}

export function DragWrapper({ children }: DragWrapperProps) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <div
      className="flex-[1] flex items-center cursor-pointer"
      {...attributes}
      {...listeners}
      ref={ref}
    >
      {children}
    </div>
  )
}

interface RemoveHandleProps {
  onClick: () => void
}

export function RemoveHandle({ onClick }: RemoveHandleProps) {
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <button
      className="DragHandle"
      // {...attributes}
      // {...listeners}
      ref={ref}
      onClick={onClick}
    >
      <Close />
    </button>
  )
}

export function AddButton({ onClick }: RemoveHandleProps) {
  const { ref } = useContext(SortableItemContext)

  return (
    <button className="DragHandle" ref={ref} onClick={onClick}>
      <svg viewBox="0 0 20 20" width="12">
        <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
      </svg>
    </button>
  )
}
