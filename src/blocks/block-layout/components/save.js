// Import block dependencies and components
import classnames from 'classnames';
import Layout from './layout';

// Register editor components
const {
	Component,
} = wp.element;

const {
	InnerBlocks,
} = wp.editor;


export default class Save extends Component {

	render() {

		// Setup the attributes
		const {
			columnsGap,
			layoutClass,
		} = this.props.attributes;

		// Setup the classes
		const className = classnames( [
			'ab-layout-column-wrap',
			'ab-block-layout-column-gap-' + columnsGap,
			layoutClass,
		])

		// Save the block markup for the front end
		return (
			<Layout { ...this.props }>
				<div
					className={ className ? className : undefined }
				>
					<InnerBlocks.Content />
				</div>
			</Layout>
		);
	}
}
