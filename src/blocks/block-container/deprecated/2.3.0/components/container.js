/**
 * Container wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Button wrapper Component
 */
export default class Container_2_3_0 extends Component {
	constructor( props ) {
		super( ...arguments );
	}

	render() {
		// Setup the attributes
		const {
			attributes: {
				containerBackgroundColor,
				containerAlignment,
				containerPaddingTop,
				containerPaddingRight,
				containerPaddingBottom,
				containerPaddingLeft,
				containerMarginTop,
				containerMarginBottom,
				containerWidth,
				containerMaxWidth,
				containerImgURL,
				containerImgAlt,
				containerDimRatio,
			},
		} = this.props;

		const styles = {
			backgroundColor: containerBackgroundColor
				? containerBackgroundColor
				: undefined,
			textAlign: containerAlignment ? containerAlignment : undefined,
			paddingLeft: containerPaddingLeft
				? `${ containerPaddingLeft }%`
				: undefined,
			paddingRight: containerPaddingRight
				? `${ containerPaddingRight }%`
				: undefined,
			paddingBottom: containerPaddingBottom
				? `${ containerPaddingBottom }%`
				: undefined,
			paddingTop: containerPaddingTop
				? `${ containerPaddingTop }%`
				: undefined,
			marginTop: containerMarginTop
				? `${ containerMarginTop }%`
				: undefined,
			marginBottom: containerMarginBottom
				? `${ containerMarginBottom }%`
				: undefined,
		};

		const className = classnames(
			[ this.props.className, 'ab-block-container' ],
			{
				[ 'align' + containerWidth ]: containerWidth,
			}
		);

		return (
			<div
				style={ styles }
				className={ className ? className : undefined }
			>
				<div className="ab-container-inside">
					{ containerImgURL && !! containerImgURL.length && (
						<div className="ab-container-image-wrap">
							<img
								className={ classnames(
									'ab-container-image',
									dimRatioToClass( containerDimRatio ),
									{
										'has-background-dim':
											0 !== containerDimRatio,
									}
								) }
								src={ containerImgURL }
								alt={ containerImgAlt }
							/>
						</div>
					) }

					<div
						className="ab-container-content"
						style={ {
							maxWidth: `${ containerMaxWidth }px`,
						} }
					>
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
}

function dimRatioToClass( ratio ) {
	return 0 === ratio || 50 === ratio
		? null
		: 'has-background-dim-' + 10 * Math.round( ratio / 10 );
}
