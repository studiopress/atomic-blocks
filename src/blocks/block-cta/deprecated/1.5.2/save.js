import CallToAction_1_5_2 from './components/cta';

const {
	RichText,
} = wp.editor;

// Version 1_5_2 save

export const callToAction_1_5_2_save = props => {
	const {
        attributes: {
            buttonText,
            buttonUrl,
            buttonAlignment,
            buttonBackgroundColor,
            buttonTextColor,
            buttonSize,
            buttonShape,
            buttonTarget,
            ctaTitle,
            ctaText,
            ctaTitleFontSize,
            titleFontSize,
            ctaTextFontSize,
            ctaWidth,
            ctaBackgroundColor,
            ctaTextColor,
            imgURL,
            imgID,
            imgAlt,
            dimRatio,
        },
        className,
    } = this.props;

	return (
		<CallToAction_1_5_2 { ...props }>
            { imgURL && !! imgURL.length && (
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
                            'ab-font-size-' + titleFontSize,
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
                            'ab-font-size-' + ctaTitleFontSize,
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
        </CallToAction_1_5_2>
	)
}