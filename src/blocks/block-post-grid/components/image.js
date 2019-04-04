/**
 * External dependencies
 */

import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import Inspector from './inspector';

import compact from 'lodash/compact';
import map from 'lodash/map';
import get from 'lodash/get';


const { Component, Fragment } = wp.element;

const {
	withSelect,
} = wp.data;

class GridImageSize extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { url } = this.props;

		return (
			<Fragment>
				<img
					src={ url }
				/>
			</Fragment>
		);
	}
}

export default withSelect( ( select, ownProps ) => {
	const { getMedia } = select( 'core' );
	const { id } = ownProps;

	return {
		image: id ? getMedia( id ) : null,
	};
} )( GridImageSize );
