import styled, { css } from 'styled-components'
import {
  BoxProps,
  CenterProps,
  ClusterProps,
  CoverProps,
  FrameProps,
  GridProps,
  IconProps,
  ImposterProps,
  ReelProps,
  SidebarProps,
  StackProps,
  SwitcherProps,
} from './props'

/**
 * @module cluster-l
 * @description
 * A custom element for grouping items, with control over the margin between them
 * @property {string} justify=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {string} space=var(--s1) A CSS `gap` value. The minimum space between the clustered child elements.
 */
export const Cluster_l = styled.div<ClusterProps>`
  display: flex;
  flex-wrap: wrap;

  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align || 'center'};
  gap: ${(props) => props.space || '1rem'};

  @supports (gap: 1rem) {
    & > * {
      margin: 0;
    }
  }
`
/**
 * @module center-l
 * @description
 * A custom element for centering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} max=var(--measure) A CSS `max-width` value
 * @property {boolean} andText=false Center align the text too (`text-align: center`)
 * @property {boolean} gutters=0 The minimum space on either side of the content
 * @property {boolean} intrinsic=false Center child elements based on their content width
 */
export const Center_l = styled.div<CenterProps>`
  display: block;
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.max || '100%'};

  padding-left: ${(props) => props.gutters || null};
  padding-right: ${(props) => props.gutters || null};

  ${(props) =>
    props.intrinsic &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `}
`
/**
 * @module cover-l
 * @description
 * A custom element for covering a block-level element horizontally,
 * with a max-width value representing the typographic measure
 * @property {string} centered=h1 A simple selector such an element or class selector, representing the centered (main) element in the cover
 * @property {string} space=var(--s1) The minimum space between and around all of the child elements
 * @property {string} minHeight=100vh The minimum height (block-size) for the **Cover**
 * @property {boolean} noPad=false Whether the spacing is also applied as padding to the container element
 */
export const Cover_l = styled.div<CoverProps>`
  display: flex;
  flex-direction: column;
  min-block-size: 100vh;
  min-height: ${(props) => props.minHeight};
  padding: ${(props) => (!props.noPad ? props.space : '0')};

  & > * {
    margin-block: ${(props) => props.space};
  }

  & > :first-child:not(${(props) => props.centered}) {
    margin-block-start: 0;
  }

  & > :last-child:not(${(props) => props.centered}) {
    margin-block-end: 0;
  }

  & > ${(props) => props.centered} {
    margin-block: auto;
  }
`
/**
 * @module box-l
 * @description
 * A custom element for generic boxes/containers
 * @property {string} padding=var(--s1) A CSS `padding` value
 * @property {string} borderWidth=var(--border-thin) A CSS `border-width` value
 * @property {string} borderColor= A CSS `border-color` value
 * @property {string} borderStyle= A CSS `border-style` value
 * @property {boolean} invert=false Whether to apply an inverted theme. Only recommended for greyscale designs.
 */
export const Box_l = styled.div<BoxProps>`
  display: block;
  padding: ${(props) => props.padding};
  border-width: ${(props) => props.borderWidth};
  outline: 0.125rem solid transparent;
  outline-offset: -0.125rem;

  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  ${(props) =>
    props.borderColor &&
    css`
      border: solid;
      border-color: ${props.borderColor};
      border-width: ${props.borderWidth};
    `}

  ${(props) =>
    props.borderStyle &&
    css`
      border-style: ${props.borderStyle};
   `}

  & * {
    color: ${(props) => props.color};
  }
`
/**
 * @module stack-l
 * @description
 * A custom element for injecting white space (margin) between flow
 * (block) elements along a vertical axis.
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {string} justfiy=flex-start A CSS `justify-content` value
 * @property {string} align=flex-start A CSS `align-items` value
 * @property {boolean} recursive=false Whether the spaces apply recursively (i.e. regardless of nesting level)
 * @property {number} splitAfter=null The element after which to _split_ the stack with an auto margin
 */
export const Stack_l = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || 'flex-start'};
  align-items: ${(props) => props.align ?? props.align};

  & ${(props) => (props.recursive ? '' : '>')} * + * {
    margin-top: ${(props) => props.space};
  }

  ${(props) =>
    props.splitAfter &&
    css`
      & :only-child {
        height: 100%;
      }

      // maybe this is actually correct
      height: 100%;

      & > :nth-child(${props.splitAfter}) {
        margin-top: auto;
      }
    `}
`
/**
 * @module switcher-l
 * @description Switch directly between horizontal and vertical layouts at a given (container width-based) breakpoint or 'threshold'
 * @property {string} threshold=var(--measure) A CSS `width` value (representing the 'container breakpoint')
 * @property {string} space=var(--s1) A CSS `margin` value
 * @property {integer} limit=4 A number representing the maximum number of items permitted for a horizontal layout
 */
export const Switcher_l = styled.div<SwitcherProps>`
  display: flex;
  flex-wrap: wrap;

  gap: ${(props) => props.space};

  & > * {
    flex-basis: calc((${(props) => props.threshold} - 100%) * 999);
    flex-grow: 1;
  }

  & > :nth-last-child(n + ${(props) => parseInt(props.limit ?? '0') + 1}),
  & > :nth-last-child(n + ${(props) => parseInt(props.limit ?? '0') + 1}) ~ * {
    flex-basis: 100%;
  }
`
/**
 * @module sidebar-l
 * @description
 * A custom element for placing two elements side-by-side. If space permits, the sidebar element has a set width, and the companion takes up the rest of the available horizontal space. If not, the elements are collapsed into a single column, each taking up 100% of the horizontal space.
 * @property {string} side=left Which element to treat as the sidebar (all values but "left" are considered "right")
 * @property {string} sideWidth Represents the width of the sidebar _when_ adjacent. If not set (`null`) it defaults to the sidebar's content width
 * @property {string} contentMin=50% A CSS **percentage** value. The minimum width of the content element in the horizontal configuration
 * @property {string} space=var(--s1) A CSS margin value representing the space between the two elements
 * @property {boolean} noStretch=false Make the adjacent elements adopt their natural height
 */
export const Sidebar_l = styled.div<SidebarProps>`
  display: flex;
  flex-wrap: wrap;

  align-items: ${(props) => (props.noStretch ? 'flex-start' : 'strecth')};
  gap: ${(props) => props.space};

  & > * {
    ${(props) => (props.sideWidth ? 'flex-basis: ' + props.sideWidth : '')}
  }

  & > * {
    flex-grow: 1;
  }

  & > ${(props) => (props.side !== 'left' ? ':first-child' : ':last-child')} {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: ${(props) => props.contentMin};
  }

  ${(props) =>
    props.reverse &&
    css`
      flex-wrap: wrap-reverse;
    `}
`
/**
 * @module icon-l
 * @description
 * A custom element for inline icon insertion
 * @property {string} space=null The space between the text and the icon. If null, natural word spacing is preserved
 * @property {string} label=null Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
export const Icon_l = styled.div<IconProps>`
  display: inline-flex;
  align-items: baseline;

  & > svg {
    height: 0.75em;
    height: 1cap;
    width: 0.75em;
    width: 1cap;
    margin-inline-end: ${(props) => props.space};
  }
`
/**
 * @module frame-l
 * @description
 * A custom element for augmenting image ratios
 * @property {string} ratio=16:9 The element's aspect ratio
 */
export const Frame_l = styled.div<FrameProps>`
  aspect-ratio: 16 / 9;

  ${(props) =>
    props.ratio &&
    css`
      aspect-ratio: ${props.ratio.split(':')[0] + ' / ' + props.ratio.split(':')[1]};
    `}

  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  & > video,
  & > image {
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
  }
`

/**
 * @module reel-l
 * @description
 * A custom element for creating a responsive grid using the CSS Grid module
 * @property {string} itemWidth=auto The width of each item (child element) in the Reel
 * @property {string} space=var(--s0) The space between Reel items (child elements)
 * @property {string} height=auto The height of the Reel itself
 * @property {boolean} noBar=false Whether to display the scrollbar
 */
export const Reel_l = styled.div<ReelProps>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  height: ${(props) => props.height};

  scroll-snap-type: x mandatory;

  & > * {
    flex: 0 0 ${(props) => props.itemWidth || 'var(--item-width)'};
    scroll-snap-align: start;
  }

  & > img {
    height: 100%;
    flex-basis: auto;
    width: auto;
  }

  & > * + * {
    margin-inline-start: ${(props) => props.space};
  }

  //  padding-bottom: ${(props) => !props.noBar && props.space};

  // &.overflowing {
  //   padding-bottom: 1rem;
  // }

  ${(props) =>
    props.noBar &&
    css`
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    `}

  &::-webkit-scrollbar {
    block-size: 1rem;
  }

  &::-webkit-scrollbar-track {
    background-color: var(--color-dark);
  }

  scrollbar-color: var(--main-background-color) var(--color-dark);

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-dark);
    background-image: linear-gradient(
      var(--color-dark) 0,
      var(--color-dark) 0.25rem,
      var(--color-light) 0.25rem,
      var(--color-light) 0.75rem,
      var(--color-dark) 0.75rem
    );
  }
`

/**
 * @module imposter-l
 * @description
 * A custom element to be positioned absolutely over any element
 * @property {boolean} breakout=false Whether the element is allowed to break out of the container over which it is positioned
 * @property {string} margin=0 The minimum space between the element and the inside edges of the positioning container over which it is placed (where `breakout` is not applied)
 * @property {boolean} fixed=false Whether to position the element relative to the viewport
 */
export const Imposter_l = styled.div<ImposterProps>`
  position: absolute;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  transform: translate(-50%, -50%);

  ${(props) =>
    !props.breakout &&
    css`
      max-inline-size: ${'calc(100% - (' + (props.margin || '0rem') + ' * 2))'};
      max-block-size: ${'calc(100% - (' + (props.margin || '0rem') + ' * 2))'};
      overflow: auto;
    `}

  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
    `}
`

/**
 * @module grid-l
 * @description
 * A custom element for creating a responsive grid using the CSS Grid module
 * @property {string} min=250px A CSS length value representing x in `minmax(min(x, 100%), 1fr)`
 * @property {string} space=var(--s1) The space between grid cells
 */
export const Grid_l = styled.div<GridProps>`
  display: grid;
  grid-gap: ${(props) => props.space};
  align-content: start;
  grid-template-columns: 100%;

  @supports (width: min(${(props) => props.min}, 100%)) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(${(props) => props.min}, 100%), 1fr)
    );
  }
`
