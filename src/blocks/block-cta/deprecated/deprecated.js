import classnames from 'classnames'
import CallToAction_1_4_22 from './1.4.22/components/cta';
import CallToAction_1_4_21 from './1.4.21/components/cta';

const {
	RichText,
} = wp.editor;

// Version 1_4_22 attributes

export const callToAction_1_4_22_attr = {
	buttonText: {
        type: 'string',
    },
    buttonUrl: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'href',
    },
    buttonAlignment: {
        type: 'string',
        default: 'center'
    },
    buttonBackgroundColor: {
        type: 'string',
        default: '#3373dc'
    },
    buttonTextColor: {
        type: 'string',
        default: '#ffffff'
    },
    buttonSize: {
        type: 'string',
        default: 'ab-button-size-medium'
    },
    buttonShape: {
        type: 'string',
        default: 'ab-button-shape-rounded'
    },
    buttonTarget: {
        type: 'boolean',
        default: false
    },
    ctaTitle: {
        type: 'array',
        selector: '.ab-cta-title',
        source: 'children',
    },
    titleFontSize: {
        type: 'number',
        default: '32',
    },
    ctaTextFontSize: {
        type: 'number',
    },
    ctaText: {
        type: 'array',
        selector: '.ab-cta-text',
        source: 'children',
    },
    ctaWidth: {
        type: 'string',
        default: 'center',
    },
    ctaBackgroundColor: {
        type: 'string',
    },
    ctaTextColor: {
        type: 'string',
        default: '#32373c'
    },
    imgURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
    },
    imgID: {
        type: 'number',
    },
    imgAlt: {
        type: 'string',
        source: 'attribute',
        attribute: 'alt',
        selector: 'img',
    },
    dimRatio: {
        type: 'number',
        default: 50,
    },

    // Deprecated
    ctaTitleFontSize: {
        type: 'string',
        default: '32'
    },
}

// Version 1_4_22 save

export const callToAction_1_4_22_save = props => {
	const {
		callToAction_1_4_22_attr
	} = props.attributes

	return (
		<CallToAction_1_4_22 { ...props }>
            { imgURL && (
                <div class="ab-cta-image-wrap">
                    <img
                        className={ classnames(
                            'ab-cta-image',
                            dimRatioToClass( dimRatio ),
                            {
                                'has-background-dim': dimRatio !== 0,
                            }
                        ) }
                        src={ imgURL }
                        alt={ imgAlt }
                    />
                </div>
            ) }

            <div class="ab-cta-content">
                { ctaTitle && (
                    <RichText.Content
                        tagName="h2"
                        className={ classnames(
                            'ab-cta-title',
                            'ab-font-size-' + ctaTitleFontSize,
                        ) }
                        style={ {
                            color: ctaTextColor,
                        } }
                        value={ ctaTitle }
                    />
                ) }
                { ctaText && (
                    <RichText.Content
                        tagName="div"
                        className={ classnames(
                            'ab-cta-text',
                            'ab-font-size-' + ctaTextFontSize,
                        ) }
                        style={ {
                            color: ctaTextColor,
                        } }
                        value={ ctaText }
                    />
                ) }
            </div>
            { buttonText && (
                <div class="ab-cta-button">
                    <a
                        href={ buttonUrl }
                        target={ buttonTarget ? '_blank' : '_self' }
                        rel={ buttonTarget ? 'noopener noreferrer' : null }
                        className={ classnames(
                            'ab-button',
                            buttonShape,
                            buttonSize,
                        ) }
                        style={ {
                            color: buttonTextColor,
                            backgroundColor: buttonBackgroundColor,
                        } }
                    >
                        <RichText.Content
                            value={ buttonText }
                        />
                    </a>
                </div>
            ) }
        </CallToAction_1_4_22>
	)
}

// Version 1_4_21 attributes

export const callToAction_1_4_21_attr = {
	buttonText: {
        type: 'string',
    },
    buttonUrl: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'href',
    },
    buttonAlignment: {
        type: 'string',
        default: 'center'
    },
    buttonBackgroundColor: {
        type: 'string',
        default: '#3373dc'
    },
    buttonTextColor: {
        type: 'string',
        default: '#ffffff'
    },
    buttonSize: {
        type: 'string',
        default: 'ab-button-size-medium'
    },
    buttonShape: {
        type: 'string',
        default: 'ab-button-shape-rounded'
    },
    buttonTarget: {
        type: 'boolean',
        default: false
    },
    ctaTitle: {
        type: 'array',
        selector: '.ab-cta-title',
        source: 'children',
    },
    ctaTitleFontSize: {
        type: 'string',
        default: '32'
    },
    ctaTextFontSize: {
        type: 'string',
        default: '20'
    },
    ctaText: {
        type: 'array',
        selector: '.ab-cta-text',
        source: 'children',
    },
    ctaWidth: {
        type: 'string',
        default: 'center',
    },
    ctaBackgroundColor: {
        type: 'string',
        default: '#f2f2f2'
    },
    ctaTextColor: {
        type: 'string',
        default: '#32373c'
    },
    imgURL: {
        type: 'string',
        source: 'attribute',
        attribute: 'src',
        selector: 'img',
    },
    imgID: {
        type: 'number',
    },
    imgAlt: {
        type: 'string',
        source: 'attribute',
        attribute: 'alt',
        selector: 'img',
    },
    dimRatio: {
        type: 'number',
        default: 50,
    },
}

// Version 1_4_21 save

export const callToAction_1_4_21_save = props => {
	const {
		callToAction_1_4_21_attr
	} = props.attributes

	return (
		<CallToAction_1_4_21 { ...props }>
            { props.attributes.imgURL && (
                <div class="ab-cta-image-wrap">
                    <img
                        className={ classnames(
                            'ab-cta-image',
                            dimRatioToClass( props.attributes.dimRatio ),
                            {
                                'has-background-dim': props.attributes.dimRatio !== 0,
                            }
                        ) }
                        src={ props.attributes.imgURL }
                        alt={ props.attributes.imgAlt }
                    />
                </div>
            ) }

            <div class="ab-cta-content">
                { props.attributes.ctaTitle && (
                    <RichText.Content
                        tagName="h2"
                        className={ classnames(
                            'ab-cta-title',
                            'ab-font-size-' + props.attributes.ctaTitleFontSize,
                        ) }
                        style={ {
                            color: props.attributes.ctaTextColor,
                        } }
                        value={ props.attributes.ctaTitle }
                    />
                ) }
                { props.attributes.ctaText && (
                    <RichText.Content
                        tagName="div"
                        className={ classnames(
                            'ab-cta-text',
                            'ab-font-size-' + props.attributes.ctaTextFontSize,
                        ) }
                        style={ {
                            color: props.attributes.ctaTextColor,
                        } }
                        value={ props.attributes.ctaText }
                    />
                ) }
            </div>
            { props.attributes.buttonText && (
                <div class="ab-cta-button">
                    <a
                        href={ props.attributes.buttonUrl }
                        target={ props.attributes.buttonTarget ? '_blank' : '_self' }
                        className={ classnames(
                            'ab-button',
                            props.attributes.buttonShape,
                            props.attributes.buttonSize,
                        ) }
                        style={ {
                            color: props.attributes.buttonTextColor,
                            backgroundColor: props.attributes.buttonBackgroundColor,
                        } }
                    >
                        <RichText.Content
                            value={ props.attributes.buttonText }
                        />
                    </a>
                </div>
            ) }
        </CallToAction_1_4_21>
	)
}

// Build deprecated list

const deprecated = [
    // Version 1_4_22
	{
		attributes: callToAction_1_4_22_attr,
        save: callToAction_1_4_22_save,
    },
    // Version 1_4_21
	{
		attributes: callToAction_1_4_21_attr,
        save: callToAction_1_4_21_save,
        migrate: attributes => {
            return {
                titleFontSize: attributes.ctaTitleFontSize,
                ...attributes,
            }
        },
	},
]

export default deprecated
