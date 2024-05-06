export interface GridProps {
  min?: string
  space?: string
}

export interface ImposterProps {
  breakout?: boolean
  margin?: string
  fixed?: boolean
}

export interface ReelProps {
  itemWidth?: string
  space?: string
  height?: string
  noBar?: boolean
}

export interface ClusterProps {
  justify?: string
  align?: string
  space?: string
}

export interface IconProps {
  space?: string
}

export interface CenterProps {
  intrinsic?: boolean
  max?: string
  gutters?: string
}

export interface CoverProps {
  noPad?: boolean
  minHeight?: string
  centered?: string
  space?: string
}

export interface BoxProps {
  color?: string
  padding?: string
  borderWidth?: string
  borderColor?: string
  backgroundColor?: string
}

export interface StackProps {
  justify?: string
  align?: string
  splitAfter?: string
  recursive?: boolean
  space?: string
  desktop?: boolean
  mobile?: boolean
}

export interface SwitcherProps {
  threshold?: string
  limit?: string
  space?: string
}

export interface SidebarProps {
  side?: string
  sideWidth?: string
  space?: string
  noStretch?: boolean
  contentMin?: string
  reverse?: boolean
}

export interface FrameProps {
  ratio?: string
}
