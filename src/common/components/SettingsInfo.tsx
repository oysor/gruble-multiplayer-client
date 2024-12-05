import React, { FunctionComponent } from 'react'
import { Cluster_l } from '../everyLayout'
import timer_logo from '../../assets/images/timer_klokke.png'
import { styled } from 'styled-components'
import { BoardSettings } from '../constants'

export const InfoText1 = styled.div`
  font-family: var(--font-regular);
  font-size: 1em;
`
interface SettingsInfoProps {
  timeLimit: number
  boardSettings: BoardSettings
}

export const SettingsInfo: FunctionComponent<SettingsInfoProps> = ({
  timeLimit,
  boardSettings,
}) => {
  const { categories } = boardSettings
  const timeIsSet = timeLimit > 0
  const categoriesIsSet = categories.length > 0 && categories[0] != ''
  const timeLimitInMinutes = timeLimit / 60

  return (
    <div className="flex justify-center">
      <Cluster_l space="1rem" align="flex-start">
        {timeIsSet && (
          <InfoText1>
            <img
              src={timer_logo}
              alt="Timer Logo"
              height="20px"
              className="mr-[0.5rem]"
            />
            {timeLimitInMinutes + ' minutes'}
          </InfoText1>
        )}
        {categoriesIsSet && (
          <div className="flex flex-row">
            <img
              src={timer_logo}
              alt="Timer Logo"
              height="20px"
              className="mr-[0.5rem]"
            />
            <InfoText1>
              <ul className="list-none">
                {categories.map((category, key) => {
                  return (
                    <li className="mb-[0.2rem]" key={key}>
                      {category}
                    </li>
                  )
                })}
              </ul>
            </InfoText1>
          </div>
        )}
      </Cluster_l>
    </div>
  )
}
