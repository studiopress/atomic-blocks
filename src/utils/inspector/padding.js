const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { RangeControl } = wp.components;

export default function Padding( props ) {
    const {
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        paddingTopMin,
        paddingRightMin,
        paddingBottomMin,
        paddingLeftMin,
        paddingTopMax,
        paddingRightMax,
        paddingBottomMax,
        paddingLeftMax,
        paddingEnableTop,
        onChangePadTop = () => {},
        onChangePadRight = () => {},
        onChangePadBottom = () => {},
        onChangePadLeft = () => {}
    } = props;

    return (
        <Fragment>
            { paddingEnableTop && (
            <RangeControl
                label={ __( 'Padding Top', 'atomic-blocks' ) }
                value={ paddingTop }
                min={ paddingTopMin }
                max={ paddingTopMax }
                onChange={ onChangePadTop }
            />
            ) }
            <RangeControl
                label={ __( 'Padding Right', 'atomic-blocks' ) }
                value={ paddingRight }
                min={ paddingRightMin }
                max={ paddingRightMax }
                onChange={ onChangePadRight }
            />
            <RangeControl
                label={ __( 'Padding Bottom', 'atomic-blocks' ) }
                value={ paddingBottom }
                min={ paddingBottomMin }
                max={ paddingBottomMax }
                onChange={ onChangePadBottom }
            />
            <RangeControl
                label={ __( 'Padding Left', 'atomic-blocks' ) }
                value={ paddingLeft }
                min={ paddingLeftMin }
                max={ paddingLeftMax }
                onChange={ onChangePadLeft }
            />
        </Fragment>
    );
}