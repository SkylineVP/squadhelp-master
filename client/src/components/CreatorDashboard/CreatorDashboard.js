import React                from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect }          from 'react-redux';
import {
	getContestsForCreative,
	clearContestList,
	setNewCreatorFilter,
	getDataForContest
}                           from '../../actions/actionCreator';
import ContestsContainer    from '../../components/ContestsContainer/ContestsContainer';
import ContestBox           from "../ContestBox/ContestBox";
import styles               from './CreatorDashboard.module.sass';
import queryString          from 'query-string';
import classNames           from 'classnames';
import isEqual              from 'lodash/isEqual';
import TryAgain             from '../../components/TryAgain/TryAgain';
import LinkButton           from "../LinkButton";
import _                    from 'lodash'
import { valueMock }        from "redux-form/lib/util/eventMocks";


const types = ['name', 'tagline', 'logo'];


class CreatorDashboard extends React.Component {

	onSelectHandler = ( type, target, isBadge ) => {

		const {creatorFilter} = this.props;
		const prevFilter = _.clone(creatorFilter);
		const filter = prevFilter[type].split(',');
		_.remove(filter, function ( n ) {
			return n === ''
		});
        debugger;
		if (!isBadge) {
			if (!filter.includes(target.target.value)) {
				filter.push(target.target.value);
			} else {
				_.remove(filter, function ( n ) {
					return n === target.target.value
				})
			}
		} else {
			if (!filter.includes(target.target.dataset.value)) {
				filter.push(target.target.dataset.value);
			} else {
				_.remove(filter, function ( n ) {
					return n === target.target.dataset.value
				})
			}
		}
		this.changePredicate({
			name: type,
			value: filter.join(',')
		})
	};

	renderFilters = ( typeFilter ) => {
		const {creatorFilter} = this.props;
		return creatorFilter[typeFilter] && creatorFilter[typeFilter].split(',').map(value => {
			return (
				<div key={value} className={styles.filter}>
					{typeFilter}:{value}
					<i className="fas fa-times" data-value={value}
					   onClick={( target ) => this.onSelectHandler(typeFilter, target,true)
					   }/>
				</div>
			)
		})
	};

	renderSelectType = ( type ) => {
		const array = [];
		switch (type) {
			case 'type': {
				types.forEach(( el, i ) => array.push(<option key={i} value={el}>{el}</option>));
				break;
			}
			case 'industry': {
				const {industry} = this.props.dataForContest.data;
				industry.forEach(( industry, i ) => array.push(<option key={i + 1}
																	   value={industry}>{industry}</option>));
				break;
			}
		}
		const {creatorFilter} = this.props;
		return (
			<select multiple  onClick={( target ) => this.onSelectHandler(type, target,false)}
					className={styles.multiinput}>
				{array}
			</select>
		);
	};

	componentWillReceiveProps( nextProps, nextContext ) {
		if (nextProps.location.search !== this.props.location.search) {
			this.parseUrlForParams(nextProps.location.search);
		}
	}


	componentDidMount() {
		this.props.getDataForContest();
		if (this.parseUrlForParams(this.props.location.search) && !this.props.contests.length) {
			this.getContests(this.props.creatorFilter);
		}
	}

	getContests = ( filter ) => {
		this.props.getContests(Object.assign({}, {
			limit: 8,
			offset: 0
		}, filter));
	};

	changePredicate = ( {name, value} ) => {
		const {creatorFilter} = this.props;
		this.props.newFilter({[name]: value});
		this.parseParamsToUrl({...creatorFilter, [name]: value});
	};


	parseParamsToUrl = ( creatorFilter ) => {
		const obj = {};
		Object.keys(creatorFilter).forEach(el => {
			if (creatorFilter[el]) {
				obj[el] = creatorFilter[el];
			}
		});
		this.props.history.push('/Dashboard?' + queryString.stringify(obj));
	};

	parseUrlForParams = ( search ) => {
		const obj = queryString.parse(search);

		const filter = {
			type: obj.type || '',
			contestId: obj.contestId ? obj.contestId : '',
			industry: obj.industry ? obj.industry : '',
			awardSort: obj.awardSort || 'asc',
			ownEntries: typeof obj.ownEntries === "undefined" ? false : obj.ownEntries
		};
		if (!isEqual(filter, this.props.creatorFilter)) {

			this.props.newFilter(filter);
			this.props.clearContestsList();
			this.getContests(filter);
			return false;
		}
		else {
			return true;
		}
	};

	getPredicateOfRequest = () => {
		const obj = {};
		const {creatorFilter} = this.props;
		Object.keys(creatorFilter).forEach(( el ) => {
			if (creatorFilter[el]) {
				obj[el] = creatorFilter[el];
			}
		});
		obj.ownEntries = creatorFilter.ownEntries;
		return obj;
	};

	loadMore = ( startFrom ) => {
		this.props.getContests(Object.assign({}, {
			limit: 8,
			offset: startFrom
		}, this.getPredicateOfRequest()));
	};

	setContestList = () => {
		const array = [];
		const {contests} = this.props;
		for (let i = 0; i < contests.length; i++) {
			array.push(<ContestBox data={contests[i]} key={contests[i].id}
								   goToExtended={this.goToExtended}/>)
		}
		return array;
	};

	goToExtended = ( contestId ) => {
		this.props.history.push('/contest/' + contestId);
	};

	tryLoadAgain = () => {
		this.props.clearContestsList();
		this.props.getContests({limit: 8, offset: 0, ...this.getPredicateOfRequest()});
	};


	render() {
		const {error, haveMore, creatorFilter} = this.props;
		const {isFetching} = this.props.dataForContest;
		return (
			<div className={styles.mainContainer}>
				<div className={styles.filterContainer}>
					<span className={styles.headerFilter}>Filter Results</span>
					<div className={styles.inputsContainer}>
						<div
							onClick={() => this.changePredicate({name: 'ownEntries', value: !creatorFilter.ownEntries})}
							className={classNames(styles.myEntries, {[styles.activeMyEntries]: creatorFilter.ownEntries})}>My
							Entries
						</div>
						<div className={styles.inputContainer}>
							<span>By contest type</span>
							{this.renderSelectType('type')}
						</div>
						<div className={styles.inputContainer}>
							<span>By contest ID</span>
							<input type="text" onChange={( {target} ) => this.changePredicate({
								name: 'contestId',
								value: target.value
							})} name='contestId'
								   value={creatorFilter.contestId} className={styles.input}/>
						</div>
						{!isFetching && <div className={styles.inputContainer}>
							<span>By industry</span>
							{this.renderSelectType('industry')}
						</div>}
						<div className={styles.inputContainer}>
							<span>By amount award</span>
							<select onChange={( {target} ) => this.changePredicate({
								name: 'awardSort',
								value: target.value
							})} value={creatorFilter.awardSort} className={styles.input}>
								<option value='desc'>Descending</option>
								<option value='asc'>Ascending</option>
							</select>
						</div>
					</div>
					<LinkButton link={'/transactions'}>
						Your Transaction
					</LinkButton>
				</div>
				<div>
					<div className={styles.filters}>
						{this.renderFilters('type')}
						{this.renderFilters('industry')}
					</div>

					{
						error ?
						<div className={styles.messageContainer}>
							<TryAgain getData={this.tryLoadAgain}/>
						</div>
							  :
						<ContestsContainer isFetching={this.props.isFetching}
										   loadMore={this.loadMore}
										   history={this.props.history} haveMore={haveMore}>
							{this.setContestList()}
						</ContestsContainer>
					}
				</div>


			</div>
		)
	}
}


const mapStateToProps = ( state ) => {
	const {contestsList, dataForContest} = state;
	return {...contestsList, dataForContest};
};

const mapDispatchToProps = ( dispatch ) => {
	return {
		getContests: ( data ) => dispatch(getContestsForCreative(data)),
		clearContestsList: () => dispatch(clearContestList()),
		newFilter: ( filter ) => dispatch(setNewCreatorFilter(filter)),
		getDataForContest: () => dispatch(getDataForContest())
	}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard));