import React                        from 'react';
import Logo                         from '../../components/Logo';
import RegistrationForm             from '../../components/RegistrationForm/RegistrationForm';
import styles                       from './RegistrationPage.module.sass';
import { Link }                     from 'react-router-dom';
import { connect }                  from 'react-redux';
import { clearErrorSignUpAndLogin } from '../../actions/actionCreator';
import CONSTANTS                    from '../../constants';
import articles                     from './articles.json';
import Article                      from "../../components/Article";


const RegistrationPage = ( props ) => {
	props.clearError();
	return (
		<div className={styles.signUpPage}>
			<div className={styles.signUpContainer}>
				<div className={styles.headerSignUpPage}>
					<Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`}/>
					<div className={styles.linkLoginContainer}>
						<Link to='/login'
							  style={{textDecoration: 'none'}}><span>Login</span></Link>
					</div>
				</div>
				<div className={styles.headerFormContainer}>
					<h2>
						CREATE AN ACCOUNT
					</h2>
					<h4>
						We always keep your name and email address private.
					</h4>
				</div>
				<RegistrationForm/>
			</div>
			<div className={styles.footer}>
				<div className={styles.articlesMainContainer}>
					<div className={styles.ColumnContainer}>
						{
							articles.map(article => <Article header={article.header}
															 articleBody={article.body}
															 articleStyle={styles.article}
															 headerStyles={styles.headerArticle}/>
							)
						}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		clearError: () => dispatch(clearErrorSignUpAndLogin()),
	};
};

export default connect(null, mapDispatchToProps)(RegistrationPage);