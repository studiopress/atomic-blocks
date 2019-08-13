/**
 * Device mockup wrapper
 */

/* Setup the block */
const { Component } = wp.element;

/* Import block dependencies and components */
import classnames from 'classnames';
import BackgroundImageClasses from './../../../utils/components/background-image/classes';
import BackgroundImageStyles from './../../../utils/components/background-image/styles';

/* Create a profile box wrapper Component */
export default class Device extends Component {

	render() {

		const { attributes } = this.props;

		const styles = { ...BackgroundImageStyles( attributes ) };

		return (
			<div
			className={ classnames(
				this.props.className,
				'ab-device-mockup',
			) }>
				<div
					className={ classnames(
						attributes.deviceType,
						attributes.deviceOrientation,
						attributes.deviceShadow === false ? 'ab-device-no-shadow' : null,
						...BackgroundImageClasses( attributes ),
						attributes.deviceAlignment ? 'ab-device-align-' + attributes.deviceAlignment : null
					) }
					style={ Object.assign( styles ) }
					>
				</div>
			</div>
		);
	}
}
