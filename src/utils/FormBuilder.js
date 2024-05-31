import React from 'react';
import styled, {css} from 'styled-components';

import Button from '../components/action/Button';

const CL_WHITE = 'color: white;';
const CL_BLUE = 'color: CornflowerBlue;';
const CL_ORANGE = 'color: orange;';
const CL_GRAY = 'color: darkGray;'

const CL_ITALIC = 'font-style: italic;';
const CL_BOLD = 'font-weight: bold;';

/*********************************************/
/*             Styled Components             */
/*********************************************/

const FieldContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0.3rem 0.5rem;
  text-align: start;
  
  label {
    ${props => props.$value && css` & {
      top: 0.3rem;
      left: 0.8rem;
      font-size: 0.8rem;
    }`}
    
    ${props => props.$type === 'submit' && css` & {
      display: none;
      visibility: hidden;
    }`}

    ${props => props.$type === 'checkbox' && css` & {
      top: calc(8px + 0.3rem);
      left: 1.9rem;
      font-size: 1rem;
    }`}
  }
  
  ${props => props.$type === 'select' && css` & {
    ul {
      position: absolute;
      top: 2.7rem;
      left: 0.5rem;
      right: 0.5rem;
      z-index: 1;
      overflow: hidden;
      
      max-height: 0;
      margin: 0;
      padding: 0;
      transition: all 0.1s ease;
      transition-delay: 0.1s;
      
      li {
        display: block;
        padding: 0.3rem 0.5rem;
        background: var(--field-color);
        cursor: pointer;
        
        &:hover {
          background: var(--field-hover-color);
        }
      }
    }
    
    &:has(input:focus) {
      input {
        border-width: 2px;
        transition: all;
        transition-delay: 0.2s;
      }
      
      ul {
        max-height: 20vh;
        border: 2px solid black;
        border-top: 1px dashed black;
        overflow-y: auto;
        transition: max-height 0.2s ease;
      }
    }
  }`}
  
  &:has(
    textarea:focus,
    input:not([type='checkbox']):focus 
  ) {
    label {
      top: 0.3rem;
      left: 0.8rem;
      font-size: 0.8rem;
    }
  }
`;

const FieldTitle = styled.span`

`;

const FieldLabel = styled.label`
  position: absolute;
  top: 1.6rem;
  left: 1rem;
  width: fit-content;
  padding: 0 0.2rem;
  background: var(--secondary-text-color);
  transform: translateY(-50%);
  transition: all 0.2s ease;
`;

const FieldMessage = styled.span`
  padding: 0.3rem 0.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  line-height: 1.2;
  color: var(--error-color);
`;

const OptionsWrapper = styled.ul`

`;

const Option = styled.li`

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

/* TODO: Figure something out for autofill styling... */
const inputStyles = css`
  padding: 0.8rem 0.5rem 0.4rem;
  font-family: 'Lato', sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  resize: none;

  &[type='checkbox'] {
    width: fit-content;
  }
`;

const Input = styled.input(inputStyles);
const TextArea = styled.textarea(inputStyles);

/*********************************************/
/*                  Classes                  */
/*********************************************/

export class OptionData {
  constructor(value, label = null, isSelected = false) {
    this.value = value;
    this.label = (label ? label : value);
    this.isSelected = isSelected;
  }
}

export class FieldData {
  constructor(
    id,
    type,
    label = null,
    required = false,
    options = null,
    validator = null,
    initialValue = '',
    title = null,
    subtitle = null,
    className = null,
  ) {
    this.id = id;
    this.type = type;
    this.label = label;
    this.required = required;
    this.options = options;
    this.validator = validator;
    this.initialValue = initialValue;
    this.title = title;
    this.subtitle = subtitle;
    this.className = className;
  }
}

export default class FormBuilder {
  standardValidators = {
    text: (value, field) => {
      if (!value || value === '') {
        return 'Polje je obvezno';
      } else {
        return undefined;
      }
    },
    textarea: (value, field) => {
      if (!value || value === '') {
        return 'Polje je obvezno';
      } else {
        return undefined;
      }
    },
    email: (value, field) => {
      if (!value || value === '') {
        return'Polje je obvezno';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return'Elektronski naslov ni veljaven';
      } else {
        return undefined;
      }
    },
    password: (value, field) => {
      if (!value || value === '') {
        return'Polje je obvezno';
      } else if (value.length < 8) {
        return'Geslo mora imeti vsaj 8 znakov';
      } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
        return'Geslo mora vsebovati vsaj eno malo črko, eno veliko črko in eno številko';
      } else {
        return undefined;
      }
    },
    tel: (value, field) => {
      if (!value || value === '') {
        return'Polje je obvezno';
      } else if (!/^[0-9+/ -]+$/g.test(value)) {
        return 'Telefonska številka ni veljavna';
      } else {
        return undefined;
      }
    },
    checkbox: (value, field) => {
      if (!value) {
        return'Polje je obvezno';
      } else {
        return undefined;
      }
    },
    select: (value, field) => {
      if (!value || value === '') {
        return'Polje je obvezno';
      } else {
        return undefined;
      }
    },
    file: (value, field) => {
      if (!value || value.length === 0) {
        return'Polje je obvezno';
      } else if (field.accept) {
        // Check all files
        for (let i = 0; i < value.length; i++) {
          const file = value[i];

          // Check if file exists (input reading was successful)
          if (!file) {
            console.log('Error in files value validation');
          } else {
            // Check file extension
            const fileType = file.name.substring(file.name.lastIndexOf('.') + 1);

            if (!field.accept.includes(`/${fileType}`)) {
              return `Format datoteke .${fileType} ni veljaven`;
            }
          }
        }
      }

      return undefined;
    }
  }
  constructor(formik = null) {
    this.formik = formik;
    this.handleSubmit = (formik ? formik.handleSubmit : null);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);

    // Additional check
    setTimeout(() => {
      if (!this.formik) {
        console.error(
          '%c[%cFormBuilder%c] Formik was left %cundefined%c.\n' +
          ' Proved a Formik instance in the %cconstructor%c or use %caddFormik(%c...%c)%c.',
          CL_WHITE, CL_BLUE + CL_BOLD, CL_WHITE, CL_ORANGE + CL_ITALIC, CL_WHITE,
          CL_ORANGE, CL_WHITE, CL_BLUE, CL_GRAY, CL_BLUE, CL_WHITE
        );
      }
    }, 500);
  }

  addFormik(formik) {
    this.formik = formik;
    this.handleSubmit = formik.handleSubmit;
  }

  getStandardValidator(type) {
    return this.standardValidators[type];
  }

  validateField(fieldId, fieldValue) {
    this.formik.setFieldTouched(fieldId, true);

    if (this.formik.validators[fieldId]) {
      const error = this.formik.validators[fieldId](fieldValue);

      // ! Intentional React state setter avoidance !
      // Formik.onSubmit is triggered before React updates its states (including Formik.errors).
      // The result is a potentially empty Formik.errors array even when the field values are NOT VALID!
      // The errors must be set directly (example below).
      if (error) {
        this.formik.errors[fieldId] = error;
      } else {
        delete this.formik.errors[fieldId];
      }

      return error;
    }
  }

  handleChange(event) {
    let fieldId = event.target.id;
    let fieldValue;

    // Read field value based on field type
    switch (event.target.type) {
      case 'select':
        fieldId = event.target.parentNode.parentNode.querySelector('input').id;
        fieldValue = event.target.attributes.value.value;
        break;
      case 'checkbox':
        fieldValue = event.target.checked;
        break;
      case 'file':
        fieldValue = event.target.files;
        break;
      default:
        fieldValue = event.target.value;
        break;
    }

    this.validateField(fieldId, fieldValue);
    this.formik.setFieldValue(fieldId ,fieldValue);
  }

  validate(values) {
    this.formik.fields.forEach((field) => {
      this.validateField(field.id, values[field.id]);
    });
  }

  buildLabel(field) {
    return (
      <FieldLabel
        htmlFor={field.id}
      >
        {field.label}
      </FieldLabel>
    );
  }

  buildFieldType(field) {
    switch (field.type) {
      case 'select':
        return (
          <Input
            id={field.id}
            name={field.id}
            type='text'
            value={this.formik.values[field.id]}
            readOnly
          />
        )
      case 'textarea':
        return (
          <TextArea
            id={field.id}
            name={field.id}
            type={field.type}
            value={this.formik.values[field.id]}
            onChange={this.handleChange}
          />
        )
      case 'submit':
        return (
          <Button
            id={field.id}
            type='submit'
            layout='big'
          >
            <span>{field.label}</span>
            <LoadingIcon/>
          </Button>
        );
      default:
        return (
          <Input
            id={field.id}
            name={field.id}
            type={field.type}
            value={this.formik.values[field.id]}
            onChange={this.handleChange}
          />
        );
    }
  }

  buildOptions(field) {
    if (!field.options) {
      return null;
    }

    return (
      <OptionsWrapper>
        {field.options.map((option, index) => {
          return (
            <Option
              key={`${field.id}_option_${index}`}
              type={field.type}
              value={option.value}
              onClick={this.handleChange}
            >
              {option.label}
            </Option>
          );
        })}
      </OptionsWrapper>
    )
  }

  buildMessage(field) {
    return (
      <FieldMessage>
        {this.formik.errors[field.id]}
      </FieldMessage>
    );
  }

  buildField(field, key) {
    return (
      <FieldContainer
        key={`field_${key}`}
        $type={field.type}
        $value={!!this.formik.values[field.id]}
      >
        {field.title && <FieldTitle>{field.title}</FieldTitle>}
        {this.buildLabel(field)}
        {this.buildFieldType(field)}
        {this.buildOptions(field)}
        {this.buildMessage(field)}
      </FieldContainer>
    )
  }
}