import React       from 'react';
import PropTypes   from 'prop-types';
import styles      from "../CreatorDashboard/CreatorDashboard.module.sass";
import { connect } from "react-redux";

const SelectedFilters = props => {
	const {creatorFilter,type,onClickHandler} = props;
	return creatorFilter[type] && creatorFilter[type].split(',').map(value => {
		return (
			<div key={value} className={styles.filter}>
				{type}:{value}
				<i className="fas fa-times" data-value={value}
				   onClick={( target ) => onClickHandler(type, target,true)
				   }/>
			</div>
		)
	})
};

SelectedFilters.propTypes = {
	type:PropTypes.string,
	onClickHandler:PropTypes.func
};

const mapStateToProps = ( state ) => {
	return {...state.contestsList};
};
export default connect(mapStateToProps)(SelectedFilters);