import React, {useState} from 'react';
import styled, {css} from 'styled-components';

import FormBuilder from '../../utils/FormBuilder';
import {useFormik} from 'formik';

const FormContainer = styled.div`

`;

const StyledForm = styled.form`
  ${props => props.$isSubmitting && css` & {
    div:has(input, textarea) {
      opacity: 0.7;
      pointer-events: none;
    }
    
    button {
      pointer-events: none;
      
      span {
        color: transparent;
      }

      div {
        display: block;
        visibility: visible;
      }
    }
  }`}
`;

const Form = ({
  id,
  key,
  style,
  className,
  layout,
  fields,
  onSubmit
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formBuilder = new FormBuilder();
  const initialValues = {};
  const validators = {};

  // Get initial values for all fields
  fields.forEach((field) => {
    initialValues[field.id] = field.initialValue;

    if (field.required) {
      validators[field.id] = (field.validator ? field.validator : formBuilder.getStandardValidator(field.type));
    }
  })

  // Setup Formik
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validate: formBuilder.validate,
    onSubmit: (values) => {
      setIsSubmitting(true);

      try {
        onSubmit(values);
      } catch (error) {
        console.error(error.toString());
      }

      setTimeout(() => {
        setIsSubmitting(false);
      }, 5000);
    }
  });

  formik.fields = fields;
  formik.validators = validators;
  formBuilder.addFormik(formik);

  return (
    <FormContainer key={key && `form_${key}`}>
      <StyledForm
        id={id}
        style={style}
        className={className}
        onSubmit={formBuilder.handleSubmit}
        noValidate
        $layout={layout}
        $isSubmitting={isSubmitting}
      >
        {fields.map((field, index) => {
          return formBuilder.buildField(field, index);
        })}
      </StyledForm>
    </FormContainer>
  )
}

export default Form;