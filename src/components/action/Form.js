import React, {useEffect, useState} from 'react';
import styled, {css} from 'styled-components';
import {useFormik} from 'formik';

import Input from './Input';
import Button from './Button';
import FormContext from '../utils/FormContext';

const DEFAULT_VALIDATORS = {
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

const FormError = styled.div`
  h2 {
    margin: 1rem auto;
    font-size: 1em;
    font-weight: 500;
  }
  
  p {
    margin: 2rem auto 2rem;
    font-weight: bold;
    
    span {
      color: var(--error-color);
    }
  }
  
  button {
    font-size: 1rem;
  }
`;

const StyledForm = styled.form`
  min-width: 250px;
  
  ${props => props.$isReadOnly && css`
    label {
      pointer-events: none;

      input, textarea {
        padding-left: 2rem;
        border-color: transparent;
      }

      &:has([type='checkbox']),
      button:not([type='submit']), svg {
        display: none;
        visibility: hidden;
      }
    }
  `}

  ${props => props.$isSubmitting && css`
    input[type='submit'],
    button[type='submit'] {
      span {
        opacity: 0;
      }
      
      div {
        display: block;
        visibility: visible;
      }
    }
  `}
`;

const Form = ({
  id,
  style,
  className,
  children,
  onSubmit,
  isReadOnly,
  resetSignal
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [validators, setValidators] = useState({});
  const initialValues = {};


  /********************************************************************************************************************/
  /*                                                INTERNAL FUNCTIONS                                                */
  /********************************************************************************************************************/


  /**
   * Validates the input value for the specified input ID.
   * Sets error to Formik error object if needed.
   *
   * @param {string} inputId - The ID of the input field to validate.
   * @param {any} inputValue - The value of the input field to validate.
   */
  const validateInput = (inputId, inputValue) => {
    if (formik.validators[inputId]) {
      const error = formik.validators[inputId](inputValue);

      // ! Intentional React state setter avoidance !
      // Formik.onSubmit is triggered before React updates its states (including Formik.errors).
      // The result is a potentially empty Formik.errors array even when the field values are NOT VALID!
      // The errors must be set directly (example below).
      if (error) {
        formik.errors[inputId] = error;
      } else {
        delete formik.errors[inputId];
      }
    }
  }

  const validateAll = () => {
    Object.keys(formik.validators).forEach((inputId) => {
      validateInput(inputId, formik.values[inputId]);
    })
  }

  /**
   * Handles the change event of an input element.
   * Updates Formik values and touched objects.
   *
   * @param {Event} event - The change event object.
   */
  const handleChange = (event) => {
    let inputId = event.target.id;
    let inputValue;

    // Read field value based on field type
    switch (event.target.type) {
      case 'select':
        inputId = event.target.parentNode.parentNode.querySelector('input').id;
        inputValue = event.target.attributes.value.value;
        break;
      case 'checkbox':
        inputValue = event.target.checked;
        break;
      case 'file':
        inputValue = event.target.files;
        break;
      default:
        inputValue = event.target.value;
        break;
    }

    validateInput(inputId, inputValue);
    formik.setFieldValue(inputId ,inputValue);
    formik.setFieldTouched(inputId, true);
  }

  const handleSubmit = async (values) => {
    if (!isReadOnly) {
      setIsSubmitting(true);
    }

    try {
      await onSubmit(values);
      throw new Error('001 Intentional Error');
    } catch (error) {
      setFormError(error.toString());
      console.error(error.toString());
    }

    setIsSubmitting(false);
  }


  /********************************************************************************************************************/
  /*                                            FORMIK AND USE EFFECT HOOK                                            */
  /********************************************************************************************************************/


  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validate: validateAll,
    onSubmit: handleSubmit
  });

  // Add validators to Formik
  formik.validators = validators;

  useEffect(() => {
    const initializeChild = (child) => {
      if (child.type !== Input) {
        if (!child.props?.children) {
          return;
        }

        // Check children
        if (!(child.props.children instanceof Array)) {
          initializeChild(child.props.children);
        } else {
          child.props.children.forEach((grandChild) => {
            initializeChild(grandChild);
          });
        }
      } else {
        // Set initial value
        initialValues[child.props.id] = (child.props.initialValue ? child.props.initialValue : '');

        // Set validator
        if (child.props.required && (child.props.validator || DEFAULT_VALIDATORS[child.props.type])) {
          setValidators(prevState => ({
            ...prevState,
            [child.props.id]: (child.props.validator ? child.props.validator : DEFAULT_VALIDATORS[child.props.type])
          }));
        }
      }
    }

    /****   Actual start of useEffect   ****/
    if (!(children instanceof Array)) {
      initializeChild(children)
    } else {
      children.forEach((child) => {
        initializeChild(child);
      });
    }

    formik.setValues(initialValues);
    formik.setTouched({});
    formik.initialErrors = undefined;
    formik.setErrors({});
    setFormError(null);
  }, [resetSignal]);

  return (
    <FormContext.Provider value={{formik, handleChange}}>
      <StyledForm
        id={id}
        style={style}
        className={className}
        noValidate
        onSubmit={formik.handleSubmit}
        $isReadOnly={isReadOnly}
        $isSubmitting={isSubmitting}
      >
        {formError ? (
          <FormError>
            <h1>Napaka</h1>
            <h2>Med predajo obrazca je prišlo do napake.</h2>
            <p>
              Sporočilo: <span>{formError}</span>
            </p>
            <Button onClick={() => setFormError(null)} layout='center'>
              Poskusi ponovno
            </Button>
          </FormError>
        ) : (
          <>
            {children}
          </>
        )}
      </StyledForm>
    </FormContext.Provider>
  )
}

export default Form;