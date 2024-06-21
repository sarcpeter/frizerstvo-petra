import React, {useContext, useState} from 'react';
import styled, {css} from 'styled-components';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

import Button from './Button';
import FormContext from '../utils/FormContext';

const CL_ITALIC = 'font-style: italic;';

const CL_WHITE = 'color: white;' + CL_ITALIC;
const CL_RED = 'color: Red;'
const CL_BLUE = 'color: DeepSkyBlue;' + CL_ITALIC;
const CL_PURPLE = 'color: Magenta;' + CL_ITALIC;

const inputStyles = css`
  width: 100%;
  padding: 0.8rem 0.5rem 0.4rem;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  resize: none;

  &[type='checkbox'] {
    width: fit-content;
  }
`;

const StyledInput = styled.input(inputStyles);
const TextArea = styled.textarea(inputStyles);

const OptionsWrapper = styled.ul`
  position: absolute;
  top: calc(100% - 3px);
  left: 0;
  right: 0;
  z-index: 1;
  overflow: hidden;

  max-height: 0;
  margin: 0;
  padding: 0;
  transition: all 0.1s ease;
  transition-delay: 0.1s;
`;

const Option = styled.li`
  display: block;
  padding: 0.3rem 0.5rem;
  text-align: left;
  background: var(--field-color);
  cursor: pointer;

  &:hover {
    background: var(--field-hover-color);
  }
`;

const Field = styled.div`
  margin: 0.75rem 0.5rem;
`;

const Label = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  height: fit-content;

  &:has([type='checkbox']) {
    flex-direction: row-reverse;
    
    span {
      margin-left: 0.3rem;
      margin-bottom: 0.1rem;
    }
  }
  
  &:not(:has([type='checkbox'])) {
    
    span {
      position: absolute;
      top: 50%;
      left: 0.5rem;
      width: fit-content;
      padding: 0 0.2rem;
      background: var(--secondary-text-color);
      transform: translateY(-50%);
      transition: all 0.2s ease;

      ${props => props.$value && css`
      top: 0;
      left: 0.3rem;
      font-size: 0.8rem;
    `}
    }

    &:has(input:focus, textarea:focus) {
      span {
        top: 0;
        left: 0.3rem;
        font-size: 0.8rem;
      }

      ul {  // OptionsWrapper
        max-height: 20vh;
        border: 2px solid black;
        border-top: 1px dashed black;
        overflow-y: auto;
        transition: max-height 0.2s ease;
      }
    } 
  }
`;

const EyeIcon = styled(FontAwesomeIcon) `
  position: absolute;
  top: 50%;
  right: 0.85rem;
  font-size: 0.8rem;
  opacity: 0.65;
  cursor: pointer;
  transform: translateY(-50%);
`;

const LoadingIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: none;
  visibility: hidden;
  
  width: 1rem;
  padding: 0.2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--secondary-text-color);
  
  mask: conic-gradient(#0000 10%,#000), linear-gradient(#000 0 0) content-box;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
  
  @keyframes l3 {
    from {transform: translate(-50%, -50%) rotate(0deg)}
    to {transform: translate(-50%, -50%) rotate(360deg)}
  }
`;

const InputMessage = styled.span`
  display: block;
  padding: 0.3rem 0.5rem 0;
  font-weight: bold;
  font-size: 0.8em;
  line-height: 1.2;
  text-align: left;
  color: var(--error-color);
`;

const Input = ({
  id,
  type,
  label,
  options,
  required,
  validator,
  initialValue,
  onClick,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {formik, handleChange} = useContext(FormContext);

  function buildInputType() {
    switch (type) {
      case 'submit':
        return (
          <Button
            id={id}
            name={id}
            type='submit'
            layout='big'
          >
            <span>{label}</span>
            <LoadingIcon/>
          </Button>
        );
      case 'button':
        return (
          <Button
            id={id}
            name={id}
            type='button'
            onClick={onClick}
          >
            {label}
          </Button>
        );
      case 'select':
        return (
          <Label htmlFor={id} $value={formik?.values[id]}>
            {label && <span>{label}</span>}
            <StyledInput
              id={id}
              name={id}
              type='text'
              value={formik?.values[id] ? formik.values[id] : ''}
              readOnly
            />
            {options &&
              <OptionsWrapper>
                {options.map((option, index) => {
                  return (
                    <Option
                      key={`${id}_option_${index}`}
                      type={type}
                      value={option?.value}
                      onClick={handleChange}
                    >
                      {option?.label}
                    </Option>
                  );
                })}
              </OptionsWrapper>
            }
          </Label>
        );
      case 'textarea':
        return (
          <Label htmlFor={id} $value={formik?.values[id]}>
            {label && <span>{label}</span>}
            <TextArea
              id={id}
              name={id}
              type={type}
              value={formik?.values[id] ? formik.values[id] : ''}
              onChange={handleChange}
            />
          </Label>
        );
      case 'password':
        return (
          <Label htmlFor={id} $value={formik?.values[id]}>
            {label && <span>{label}</span>}
            <StyledInput
              id={id}
              name={id}
              type={showPassword ? 'text' : 'password'}
              value={formik?.values[id] ? formik.values[id] : ''}
              onChange={handleChange}
            />
            <EyeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={(event) => setShowPassword(!showPassword)}
            />
          </Label>
        );
      default:
        return (
          <Label htmlFor={id} $value={formik?.values[id]}>
            {label && <span>{label}</span>}
            <StyledInput
              id={id}
              name={id}
              type={type}
              value={(formik?.values[id] ? formik.values[id] : '')}
              onChange={handleChange}
            />
          </Label>
        );
    }
  }

  // Check required properties
  if (!(id && type)) {
    console.error(
      '%cMissing required properties%c\n - Add %cid%c and %ctype%c to your %cInput%c component.',
      CL_RED, '', CL_PURPLE, '', CL_PURPLE, '', CL_BLUE, ''
    );
    return null;
  }

  // Check and refactor select options
  if (options) {
    options = options.map((option) => {
      if (!option.value) {
        console.error(
          '%cMissing required property field%c\n - Field %cvalue%c is missing in one or more option objects in %coptions%c property of %cInput%c %ctype%c %cselect%c.',
          CL_RED, '', CL_PURPLE, '', CL_PURPLE, '', CL_BLUE, '', CL_PURPLE, '', CL_WHITE, ''
        );
        return null;
      }

      if (!option.label) {
        option.label = option.value;
      }

      return option;
    })
  }

  // Refactor id if needed
  if (id.includes(' ') || /A-Z/.test(id)) {
    const refactoredId = id.toLocaleLowerCase().replaceAll(' ', '-');
    console.warn(
      `Invalid %cInput%c property value.\n - Property %cid%c of value %c${id}%c is not valid.\n - %cid%c was refactored to %c${refactoredId}%c.\n - Please do not use spaces and uppercase characters for the %cInput %cid%c property.`,
      CL_BLUE, '', CL_PURPLE, '', CL_WHITE, '', CL_PURPLE, '', CL_WHITE, '', CL_BLUE, CL_PURPLE, ''
    );
    id = refactoredId;
  }

  return (
    <Field>
      {buildInputType()}
      {formik.errors[id] &&
        <InputMessage>
          {formik.errors[id]}
        </InputMessage>
      }
    </Field>
  )
}

export default Input;