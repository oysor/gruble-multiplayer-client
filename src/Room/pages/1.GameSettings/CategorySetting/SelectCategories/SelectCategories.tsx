import React, { FunctionComponent, useState } from 'react'
import {
  ConfirmBox,
  OverLayButton,
  OverLayContainer,
  BulletIcon,
  OverLayTop,
} from './styles'
import AddIcon from '../../../../../assets/svg/add_category.svg'
import AddedIcon from '../../../../../assets/svg/added_category.svg'
import GrayRectangle from '../../../../../assets/svg/gray_rectangle.svg'
import { Cluster_l, Stack_l } from '../../../../../common/everyLayout'
import { PondrButton } from '../../../../../common/components/buttons'
import { css, styled } from 'styled-components'

type SelectCategoriesProps = {
  categories: string[]
  onClick: (value: boolean) => void
  removeCategory: (value: string) => void
  addCategory: (value: string) => void
}

interface PondrButtonProps {
  valid?: boolean
  invert?: boolean
  color?: string
  background?: string
  width?: string
  transparent?: boolean
  fontSize?: string
  blurred?: boolean
}

type TransparentInputProps = {
  categories: string[]
  onClick: (value: boolean) => void
  removeCategory: (value: string) => void
  addCategory: (value: string) => void
}

export const TransparentInput = styled.input`
  display: inline-block;
  font-size: 1em;
  text-align: left;
  text-decoration: none;
  /* padding: 0.5em 0.75em; */
  margin: 0;
  padding-bottom: 0.3rem;
  /* border: 0; */
  outline: none;
  border: none;
  color: #035151;
  background-color: transparent;
  border-bottom: 1.5px solid #035151;
  font-family: var(--font-regular);
  /* opacity: 0.5; */
  /* 
  &:focus {
    opacity: 1;
  } */
`

interface SmartInputProps {
  onChange: (stringValue: string) => void
  onBlur?: (stringValue: string) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
  placeholder?: string
  value?: string
  disabled?: boolean
  className?: string
}

export const PondrInput: FunctionComponent<SmartInputProps> = ({
  onChange,
  onBlur,
  placeholder = '...',
  value,
  disabled = false,
  className = '',
}) => {
  return (
    <TransparentInput
      disabled={disabled}
      className={className}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(ev: React.ChangeEvent<HTMLInputElement>) => onChange(ev.target.value)}
      onBlur={(ev: React.ChangeEvent<HTMLInputElement>) =>
        onBlur && onBlur(ev.target.value)
      }
    />
  )
}

export const AddCategoryButton = styled.button<PondrButtonProps>`
  position: relative;
  display: inline-block;
  font-size: 0.6rem;
  padding: 0.5rem;
  border: 0.1em solid white;
  border-radius: var(--main-radius, 2em);
  font-family: var(--font-bold);
  /* font-size: ${(props) => props.fontSize || '1em'};
  line-height: 1.2em;
  width: ${(props) => props.width && props.width}; */

  color: var(--main-color, '#035151');
  color: white;
  background-color: #035151;

  ${(props) =>
    props.blurred &&
    css`
      opacity: 0.5;
    `}
`

export const SelectListHeading = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  font-family: var(--font-regular);
  font-size: 0.8rem;
  color: #035151;
`

export const SelectCategories: FunctionComponent<SelectCategoriesProps> = ({
  categories,
  onClick,
  removeCategory,
  addCategory,
}) => {
  const [optionList, addToOptionList] = useState([
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
  ])

  const [name, setName] = useState('')

  const clearList = () => {
    // const newList = optionList.filter((cat) => categories.includes(cat))
    return addToOptionList(categories)
  }

  const setValidName = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
  }

  const validCategory = () => {
    const newCategory = setValidName(name)

    return newCategory === '' || optionList.includes(newCategory)
  }

  const onAddCategory = () => {
    const newCategory = setValidName(name)

    if (newCategory === '' || optionList.includes(newCategory)) return

    addToOptionList([newCategory, ...optionList])
    addCategory(newCategory)
    setName('')
  }

  return (
    <OverLayContainer className="max-w-[30rem]">
      <Stack_l className="h-[100%]">
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
        <Stack_l className="overflow-x-hidden pl-[0.5rem]">
          <Stack_l className="mb-[2rem] pl-[10px]">
            <SelectListHeading>ADD YOUR OWN CATEGORIES</SelectListHeading>
            <Cluster_l space="0.4rem" className="mt-[1rem]">
              <PondrInput
                value={name}
                onChange={setName}
                placeholder={'Custom category'}
                className="w-[10em] bg-[green]-500"
              />
              <AddCategoryButton
                blurred={validCategory()}
                onClick={() => onAddCategory()}
              >
                Add
              </AddCategoryButton>
              <AddCategoryButton
                blurred={optionList.length < 1}
                onClick={() => clearList()}
              >
                Clear list
              </AddCategoryButton>
            </Cluster_l>
          </Stack_l>

          <Stack_l>
            <Cluster_l>
              <SelectListHeading className="pl-[10px]">
                OR SELECT FROM LIST
              </SelectListHeading>
            </Cluster_l>
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
        </Stack_l>
      </Stack_l>
      <ConfirmBox className="pb-[2em] w-[100%] items-center sticky bottom-0 ">
        <PondrButton invert onClick={() => onClick(false)}>
          Confirm
        </PondrButton>
      </ConfirmBox>
    </OverLayContainer>
  )
}
