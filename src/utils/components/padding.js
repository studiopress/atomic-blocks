/**
 * External dependencies.
 */
import RenderSettingControl from '../../utils/components/settings/renderSettingControl';

const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RangeControl } = wp.components;

export default function Padding( props ) {
	const {

		// Padding props
		padding,
		paddingTitle,
		paddingHelp,
		paddingMin,
		paddingMax,
		paddingEnable,
		onChangePadding = () => {},

		// Padding top props
		paddingTop,
		paddingTopMin,
		paddingTopMax,
		paddingEnableTop,
		onChangePaddingTop = () => {},

		// Padding right props
		paddingRight,
		paddingRightMin,
		paddingRightMax,
		paddingEnableRight,
		onChangePaddingRight = () => {},

		// Padding bottom props
		paddingBottom,
		paddingBottomMin,
		paddingBottomMax,
		paddingEnableBottom,
		onChangePaddingBottom = () => {},

		// Padding left props
		paddingLeft,
		paddingLeftMin,
		paddingLeftMax,
		paddingEnableLeft,
		onChangePaddingLeft = () => {},

		// Padding vertical props
		paddingVertical,
		paddingEnableVertical,
		paddingVerticalMin,
		paddingVerticalMax,
		onChangePaddingVertical = () => {},

		// Padding horizontal props
		paddingHorizontal,
		paddingEnableHorizontal,
		paddingHorizontalMin,
		paddingHorizontalMax,
		onChangePaddingHorizontal = () => {}
	} = props;

	return (
		<Fragment>
			{ paddingEnable && (
				<RenderSettingControl id="ab_padding">
					<RangeControl
						label={ paddingTitle ? paddingTitle : __( 'Padding', 'atomic-blocks' ) }
						help={ paddingHelp ? paddingHelp : null }
						value={ padding }
						min={ paddingMin }
						max={ paddingMax }
						onChange={ onChangePadding }
					/>
				</RenderSettingControl>
			) }
			{ paddingEnableTop && (
				<RenderSettingControl id="ab_paddingTop">
					<RangeControl
						label={ __( 'Padding Top', 'atomic-blocks' ) }
						value={ paddingTop }
						min={ paddingTopMin }
						max={ paddingTopMax }
						onChange={ onChangePaddingTop }
					/>
				</RenderSettingControl>
			) }
			{ paddingEnableRight && (
				<RenderSettingControl id="ab_paddingRight">
					<RangeControl
						label={ __( 'Padding Right', 'atomic-blocks' ) }
						value={ paddingRight }
						min={ paddingRightMin }
						max={ paddingRightMax }
						onChange={ onChangePaddingRight }
					/>
				</RenderSettingControl>
			) }
			{ paddingEnableBottom && (
				<RenderSettingControl id="ab_paddingBottom">
					<RangeControl
						label={ __( 'Padding Bottom', 'atomic-blocks' ) }
						value={ paddingBottom }
						min={ paddingBottomMin }
						max={ paddingBottomMax }
						onChange={ onChangePaddingBottom }
					/>
				</RenderSettingControl>
			) }
			{ paddingEnableLeft && (
				<RenderSettingControl id="ab_paddingLeft">
					<RangeControl
						label={ __( 'Padding Left', 'atomic-blocks' ) }
						value={ paddingLeft }
						min={ paddingLeftMin }
						max={ paddingLeftMax }
						onChange={ onChangePaddingLeft }
					/>
				</RenderSettingControl>
			) }
			{ paddingEnableVertical && (
				<RenderSettingControl id="ab_paddingVertical">
					<RangeControl
						label={ __( 'Padding Vertical', 'atomic-blocks' ) }
						value={ paddingVertical }
						min={ paddingVerticalMin }
						max={ paddingVerticalMax }
						onChange={ onChangePaddingVertical }
					/>
				</RenderSettingControl>
			) }
			{ paddingEnableHorizontal && (
				<RenderSettingControl id="ab_paddingHorizontal">
					<RangeControl
						label={ __( 'Padding Horizontal', 'atomic-blocks' ) }
						value={ paddingHorizontal }
						min={ paddingHorizontalMin }
						max={ paddingHorizontalMax }
						onChange={ onChangePaddingHorizontal }
					/>
				</RenderSettingControl>
			) }
		</Fragment>
	);
}
