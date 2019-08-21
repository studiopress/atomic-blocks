/**
 * Device mockup wrapper
 */

/* Setup the block */
const { Component } = wp.element;

/* Import block dependencies and components */
import classnames from 'classnames';
import BackgroundImageClasses from './../../../utils/components/background-image/classes';
import BackgroundImageStyles from './../../../utils/components/background-image/styles';
import defaultAttributes from './attributes';

/* Create a Device wrapper Component */
export default class Device extends Component {

	componentDidUpdate( prevProps ) {

		if ( this.props.attributes.deviceType !== prevProps.attributes.deviceType ) {
			let deviceDefaultMaxWidth = defaultAttributes.deviceMaxWidth.default;

			if ( 'ab-device-tablet' === this.props.attributes.deviceType ) {
				deviceDefaultMaxWidth = 600;
			}
			this.props.setAttributes({ deviceMaxWidth: deviceDefaultMaxWidth });
		}
	}

	render() {

		const { attributes } = this.props;

		const styles = {
			borderWidth: attributes.deviceBorder ? attributes.deviceBorder + 'em' : null,
			borderRadius: attributes.deviceBorderRadius ? attributes.deviceBorderRadius : null,
			...BackgroundImageStyles( attributes )
		};

		return (
			<div
				className={ classnames(
					this.props.className,
					'ab-device-mockup',
					attributes.deviceAlignment ? 'ab-device-align-' + attributes.deviceAlignment : null
				) }
				style={ attributes.deviceMaxWidth ? { maxWidth: attributes.deviceMaxWidth } : { maxWidth: defaultAttributes.deviceMaxWidth.default } }

			>
				<div
					className={ classnames(
						attributes.deviceType,
						attributes.deviceOrientation,
						false === attributes.deviceShadow ? 'ab-device-no-shadow' : null,
						'ab-device-white' === attributes.deviceColor ? attributes.deviceColor : undefined,
						...BackgroundImageClasses( attributes )
					) }
					style={ Object.assign( styles ) }
					>
				</div>

				{ this.props.children }
			</div>
		);
	}
}
