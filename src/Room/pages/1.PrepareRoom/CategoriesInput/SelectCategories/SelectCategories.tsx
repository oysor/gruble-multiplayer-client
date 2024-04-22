import React, { FunctionComponent } from 'react'
import { Stack_l } from '../../../../../common/everyLayout'
import {
  ConfirmBox,
  OverLayButton,
  OverLayContainer,
  BulletIcon,
  OverLayTop,
} from './styles'
import { PondrButton } from '../../../../../common/components/buttons'
import AddIcon from '../../../../../assets/svg/add_category.svg'
import AddedIcon from '../../../../../assets/svg/added_category.svg'
import GrayRectangle from '../../../../../assets/svg/gray_rectangle.svg'

type SelectCategoriesProps = {
  categories: string[]
  onClick: (value: boolean) => void
  removeCategory: (value: string) => void
  addCategory: (value: string) => void
}

export const SelectCategories: FunctionComponent<SelectCategoriesProps> = ({
  categories,
  onClick,
  removeCategory,
  addCategory,
}) => {
  const optionList = [
    'Authors',
    'Car brands',
    'Cities',
    'Movies',
    'Music',
    'Science',
    'Geography',
    'Sports',
    'History',
    'Literature',
    'News & celebrities',
    'Toys',
    'TV shows',
  ]

  return (
    <OverLayContainer className="max-w-[30rem]">
      <Stack_l
        space="1rem"
        className="sticky top-0 text-[#035151] items-center font-sofiaSemiBold"
      >
        <OverLayTop>
          <OverLayButton onClick={() => onClick(false)} className="">
            <GrayRectangle />
          </OverLayButton>
          <span>Select categories</span>
        </OverLayTop>
      </Stack_l>
      <Stack_l className="overflow-x-hidden">
        {optionList.map((cat, i) => {
          const exist = categories.some((category) => category === cat)
          return (
            <div key={cat} className="flex items-center">
              <BulletIcon
                key={cat}
                onClick={exist ? () => removeCategory(cat) : () => addCategory(cat)}
                className="pl-[1rem] pr-[1rem]"
              >
                {exist ? <AddedIcon /> : <AddIcon />}
              </BulletIcon>
              <div className="text-[black]">{cat}</div>
            </div>
          )
        })}
      </Stack_l>

      <ConfirmBox className="pb-[2em] w-[100%] items-center sticky bottom-0 ">
        <PondrButton invert onClick={() => onClick(false)}>
          Confirm
        </PondrButton>
      </ConfirmBox>
    </OverLayContainer>
  )
}
