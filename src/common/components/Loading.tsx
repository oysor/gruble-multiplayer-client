import React, { FunctionComponent } from 'react'
import { Cover_l } from '../everyLayout'
import { styled } from 'styled-components'
// import LoadingSVG from './LoaderImage'

// import Maskot from '../../svg/maskot.svg'

export const StyledLoading = styled.div`
  background-color: #03484f;
  width: 100%;
  height: 100%;
`

export const LoadingPage: FunctionComponent = () => {
  return (
    <Cover_l centered="div">
      <StyledLoading>
        {/* <Center_l intrinsic>
          <LoadingSVG />
        </Center_l> */}
      </StyledLoading>
    </Cover_l>
  )
}

export default LoadingPage
