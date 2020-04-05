import React                                from 'react';
import { connect }                          from 'react-redux';
import { createAuthLoginAction, clearAuth } from "../../actions/actionCreator";
import PropTypes                            from 'prop-types';
import styles                               from './LoginForm.module.sass';
import { Field, reduxForm } from 'redux-form';
import FormField            from '../FormField/FormField';
import customValidator      from '../../validators/validator';
import Schems                               from '../../validators/validationSchems';
import Error                                from '../../components/Error/Error';


class LoginForm extends React.Component {

	componentWillUnmount() {
		this.props.authClear();
	}

	formSubmit = ( values ) => {
		this.props.loginRequest(values);
	};

	render() {
		const {error, isFetching} = this.props.auth;
		const {handleSubmit, submitting, authClear} = this.props;

		const formInputClasses = {
			containerStyle: styles.inputContainer,
			className: styles.input,
			warningStyle: styles.fieldWarning,
			invalidStyle: styles.notValid,
			validStyle: styles.valid,
		};

		return (
			<div className={styles.loginForm}>
				{error && <Error data={error.data} status={error.status}
								 clearError={authClear}/>}
				<form onSubmit={handleSubmit(this.formSubmit)}>
					<Field
						name='email'
						{...formInputClasses}
						component={FormField}
						type='text'
						label='Email Address'
					/>
					<Field
						name='password'
						{...formInputClasses}
						component={FormField}
						type='password'
						label='password'
					/>
					<button type='submit' disabled={submitting}
							className={styles.submitContainer}>
                        <span className={styles.inscription}>{isFetching
												  ? 'Submitting...'
												  : 'LOGIN'}</span>
					</button>
				</form>
			</div>
		);
	}
}

const mapStateToProps = ( state ) => {
	const {auth} = state;
	return {auth};
};

const mapDispatchToProps = ( dispatch ) => (
	{
		loginRequest: ( data ) => dispatch(createAuthLoginAction(data)),
		authClear: () => dispatch(clearAuth())
	}
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'login',
	validate: customValidator(Schems.LoginSchem)
})(LoginForm));