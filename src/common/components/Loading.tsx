import React, { FunctionComponent } from 'react'
import {
  Center_l,
  Cluster_l,
  Cover_l,
  Stack_l,
} from '../everyLayout'
import { styled } from 'styled-components'

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
        <Stack_l space="1rem" className="items-center">
          <Maskot width="200" height="200" />
          <Cluster_l align="center" justify="center"></Cluster_l>
        </Stack_l>
      </Center_l> */}
      </StyledLoading>
    </Cover_l>
  )
}

export default LoadingPage
