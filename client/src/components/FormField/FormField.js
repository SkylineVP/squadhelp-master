import React        from 'react';
import classNames   from 'classnames';
import PropTypes    from "prop-types";
import InputWrapper from "../InputWrapper";
import ErrorMessage from "../ErrorMessage";
import FormsInput   from "../InputComponents/FormsInput";

const FormField = ( props) => {

  const { meta: {touched, error,visited},warningStyle,validStyle,invalidStyle,containerStyle,className,...rest} = props;

  const inputClassName = classNames(className, {
    [invalidStyle]: touched && error,
    [validStyle]: visited && !error,
  });

  return (
    <InputWrapper className={ containerStyle }>
      <FormsInput{...rest} className={inputClassName}/>
      <ErrorMessage touched={touched} error={error}  className={warningStyle} />
    </InputWrapper>
  );
};
FormField.propTypes={
  validStyle:PropTypes.string,
  invalidStyle:PropTypes.string,
  className:PropTypes.string.isRequired,
  containerStyle:PropTypes.string.isRequired,
  warningStyle:PropTypes.string.isRequired

};

export default FormField;