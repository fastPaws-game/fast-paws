import styled from 'styled-components';
import React, { ForwardedRef, forwardRef, FC, InputHTMLAttributes } from 'react';

type Props = {
  id: string;
  errorOn?: boolean;
  errorMessage?: string;
}

const InputForm: FC<Props & InputHTMLAttributes<HTMLInputElement>> = forwardRef(
  (props, ref?: ForwardedRef<HTMLInputElement>) => {
    const {
      id,
      errorOn,
      errorMessage,
      ...rest
    } = props;

    return (
      <div>
        <label htmlFor={id}></label>
        <Input
          id={id}
          ref={ref}
          {...rest}
        />
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    );
  }
);

const Input = styled.input<{errorOn?: boolean}>`
  width: 246px;
  height: 34px;
  box-sizing: border-box;
  background: ${props => props.theme.colors.backgroundInput};
  border: none;
  border-left: 3px solid ${props => !props.errorOn ? props.theme.colors.accent : props.theme.colors.error};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0px 15px 15px 0px;
  color: ${props => !props.errorOn ? props.theme.colors.textInvert : props.theme.colors.error};
  caret-color: ${props => props.theme.text.caretColor};
  ::placeholder {
    color: ${props => props.theme.text.placeholder};
    padding-left: 5px;
  }
  :hover, :focus {
    border-left: 5px solid ${props => !props.errorOn ? props.theme.colors.accent : props.theme.colors.error};
    ::placeholder {
    color: ${props => props.theme.text.placeholder};
    }
  }
  :focus {
    ::placeholder {
    color: ${props => props.theme.text.placeholderFocus};
    }
  }
  :disabled {
    border-left: 3px solid ${props => props.theme.colors.disabled};
  }
  +p {
    font-size: ${props => props.theme.vars.fontSize.xxs};
    color: ${props => props.theme.text.error};
    margin: 0;
  }
`

export default InputForm;
