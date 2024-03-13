import React, { FunctionComponent } from 'react'
import { styled } from 'styled-components'

import maskotImage from '../../assets/images/loading.png'

export const SVGContainer = styled.div`
  position: relative;
  width: 135px;
  height: 100px;
`

export const TextAboveSvg = styled.div`
  top: 39px;
  left: 18px;
  font-size: 1.2rem;
  color: black;
`

export const LoaderImage: FunctionComponent = () => {
  return (
    <SVGContainer className="relative">
      <img src={maskotImage} width={'100%'} height={'100%'} />
      <TextAboveSvg className="absolute">Loading..</TextAboveSvg>
    </SVGContainer>
  )
}

export default LoaderImage
