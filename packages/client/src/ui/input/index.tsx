import styled from 'styled-components'
import {useState} from 'react'

type OuterProps = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  pattern: string;
  disabled: boolean;
  required: boolean;
}

type styleProps = {
  isValidate: boolean;
}

function InputForm(props: OuterProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState({
    isInputValid: true
  });
  
  const pattern = props.pattern;

  const validateInput = (pattern: string, checkingText: string): { isInputValid: boolean; } => {
    const regExp = new RegExp(pattern);
    
      if(regExp.test(checkingText) === true) {
        return {
          isInputValid: true
        };
      } else {
        return {
          isInputValid: false
        };
      }
  }

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const {value} = (event.target as HTMLInputElement);
    setValue(value);
  }

  const handleInputValidation = (event: React.FormEvent<HTMLInputElement>) => {
    const isInputValid = validateInput(pattern, value);
    setError(isInputValid);
  }

  return (
  <>
    <label htmlFor={props.id}></label>
    <Input 
    id={props.id}
    name={props.name}
    type={props.type}
    placeholder={props.placeholder}
    disabled={props.disabled}
    required={props.required}
    onChange={handleInput}
    onBlur={handleInputValidation}
    isValidate={error.isInputValid}
    ></Input>
  </>
  )
};

const Input = styled.input<styleProps>`
  width: 246px;
  height: 34px;
  display: block;
  box-sizing: border-box;
  background: ${props => props.theme.colors.backgroundInput};
  border: none;
  border-left: 3px solid ${props => props.isValidate ? props.theme.colors.accent : props.theme.colors.error};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0px 15px 15px 0px;
  color: ${props => props.isValidate ? props.theme.text.textInvert : props.theme.text.error};
  caret-color: ${props => props.theme.text.caretColor};
  ::placeholder {
    color: ${props => props.theme.text.placeholder};
    padding-left: 5px;
  }
  :hover, :focus {
    border-left: 5px solid ${props => props.theme.colors.accent};
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

  //delete margin
  margin: 10px;
`

export default InputForm
