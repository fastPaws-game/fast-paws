import styled from 'styled-components'
import {useState} from 'react'

type IInput = {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  disabled: boolean;
  required: boolean;
}

const Input = styled.input`
  width: 246px;
  height: 34px;
  display: block;
  box-sizing: border-box;
  background: ${props => props.theme.colors.backgroundInput};
  border: none;
  border-left: 3px solid ${props => props => props.isValidate ? props.theme.colors.accent : props.theme.colors.error};
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
function InputForm(props: IInput) {
  const [value, setValue] = useState('')
  const [error, setError] = useState({
    isInputValid: true
  })
  const pattern = props.pattern;

  const validateInput = (pattern: string, checkingText: string): Record<string, boolean> => {
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

  const handleInput = (event) => {
    const {value} = event.target;
    setValue(value);
  }

  const handleInputValidation = (event) => {
    const isInputValid = validateInput(pattern, value)
    setError(isInputValid)
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

export default InputForm
