import styled from 'styled-components'
import React, { ForwardedRef, forwardRef, FC, TextareaHTMLAttributes } from 'react'
import { media } from '../../assets/styles/media'
import { P4 } from '../../assets/styles/texts'

export enum typeStyleTextArea {
  modal = 'modal',
  comment = 'comment',
}

type Props = {
  typeStyle: typeStyleTextArea
  errorOn?: boolean
  errorMessage?: string
  ref?: ForwardedRef<HTMLTextAreaElement>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea: FC<Props> = forwardRef((props, ref) => {
  const { errorOn, errorMessage, typeStyle, ...rest } = props

  const TextAreaStyled = typeStyle === 'modal' ? TextAreaModalStyled : TextAreaCommentStyled

  return (
    <Wrapper>
      <TextAreaStyled errorOn={errorOn} ref={ref} {...rest} />
      {errorOn && <P4>{errorMessage}</P4>}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 80%;
`
const TextAreaCommentStyled = styled.textarea<{ errorOn?: boolean }>`
  width: 100%;
  height: 70px;
  background: ${props => props.theme.colors.backgroundInput};
  border-left: 3px solid ${props => (props.errorOn ? props.theme.colors.error : props.theme.colors.accent)};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0px 15px 15px 0px;
  color: ${props => (props.errorOn ? props.theme.text.error : props.theme.text.textInvert)};
  caret-color: ${props => props.theme.text.caretColor};
  padding-left: 10px;
  margin-bottom: 5px;
  resize: none;

  ${media.middle} {
    max-width: 279px;
  }

  &::placeholder {
    color: ${props => props.theme.text.placeholder};
  }

  &:hover,
  :focus {
    border-left: 5px solid ${props => (props.errorOn ? props.theme.colors.error : props.theme.colors.accent)};
    padding-left: 8px;

    ::placeholder {
      color: ${props => props.theme.text.placeholder};
    }
  }

  &:focus {
    ::placeholder {
      color: ${props => props.theme.text.placeholderFocus};
    }
  }

  &:disabled {
    border-left: 3px solid ${props => props.theme.colors.disabled};
  }

  + p {
    color: ${props => props.theme.text.error};
    text-align: left;
  }
`

const TextAreaModalStyled = styled.textarea<{ errorOn?: boolean }>`
  width: 315px;
  height: 22px;
  border-bottom: 1px solid ${props => props.theme.colors.accent};
  background: ${props => props.theme.colors.secondary};
  color: ${props => (props.errorOn ? props.theme.text.error : props.theme.text.textInvert)};
  caret-color: ${props => props.theme.text.caretColor};
  margin-bottom: 24px;
  resize: none;

  &::placeholder {
    color: ${props => props.theme.text.placeholder};
  }

  &:focus {
    border-bottom: 1px solid ${props => props.theme.colors.accent};

    ::placeholder {
      color: ${props => props.theme.text.placeholderFocus};
    }
  }

  + p {
    color: ${props => props.theme.text.error};
    margin: 0;
    position: absolute;
    top: 28px;
    left: 0;
  }
`

export default TextArea
