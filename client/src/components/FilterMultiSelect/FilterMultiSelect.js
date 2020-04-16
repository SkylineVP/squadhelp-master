import React       from 'react';
import PropTypes   from 'prop-types';

const FilterMultiSelect = props => {
	const {options:{type,dataTypes},className,onClickHandler}=props;
	const enderSelectType = [];
	dataTypes.forEach(( el, i ) => enderSelectType.push(<option key={i} value={el}>{el}</option>));
	return (
		<select multiple onClick={( target ) => onClickHandler(type, target, false)}
				className={className}>
			{enderSelectType}
		</select>
	);
};

FilterMultiSelect.propTypes = {
	options: PropTypes.shape({
		type: PropTypes.string,
		dataTypes: PropTypes.array
	}),
	className: PropTypes.string,
	onClickHandler: PropTypes.func
};

export default FilterMultiSelect;