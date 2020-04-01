import classnames from 'classnames';
import Container_1_4_23 from './1.4.23/components/container';
import Container_2_3_0 from './2.3.0/components/container';

const { InnerBlocks } = wp.blockEditor;

// Version 2_3_0 attributes

export const Container_2_3_0_attr = {
	containerPaddingTop: {
		type: 'number',
	},
	containerPaddingRight: {
		type: 'number',
	},
	containerPaddingBottom: {
		type: 'number',
	},
	containerPaddingLeft: {
		type: 'number',
	},
	containerMarginTop: {
		type: 'number',
	},
	containerMarginBottom: {
		type: 'number',
	},
	containerWidth: {
		type: 'string',
	},
	containerMaxWidth: {
		type: 'number',
		default: 1600,
	},
	containerBackgroundColor: {
		type: 'string',
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	containerDimRatio: {
		type: 'number',
		default: 50,
	},
};

// Version 1_4_22 attributes

export const Container_1_4_23_attr = {
	containerPaddingTop: {
		type: 'number',
		default: 0,
	},
	containerPaddingRight: {
		type: 'number',
		default: 0,
	},
	containerPaddingBottom: {
		type: 'number',
		default: 0,
	},
	containerPaddingLeft: {
		type: 'number',
		default: 0,
	},
	containerMarginTop: {
		type: 'number',
		default: 0,
	},
	containerMarginBottom: {
		type: 'number',
		default: 0,
	},
	containerWidth: {
		type: 'string',
		default: 'center',
	},
	containerMaxWidth: {
		type: 'number',
		default: 1600,
	},
	containerBackgroundColor: {
		type: 'string',
		default: '#fff',
	},
	containerImgURL: {
		type: 'string',
		source: 'attribute',
		attribute: 'src',
		selector: 'img',
	},
	containerImgID: {
		type: 'number',
	},
	containerImgAlt: {
		type: 'string',
		source: 'attribute',
		attribute: 'alt',
		selector: 'img',
	},
	containerDimRatio: {
		type: 'number',
		default: 50,
	},
};

// Version 2_3_0 save

export const Container_2_3_0_save = ( props ) => {
	return (
		<Container_2_3_0 { ...props }>
			<InnerBlocks.Content />
		</Container_2_3_0>
	);
};

// Version 1_4_22 save

export const Container_1_4_23_save = ( props ) => {
	const {
		containerMaxWidth,
		containerImgURL,
		containerImgAlt,
		containerDimRatio,
	} = props.attributes;

	return (
		<Container_1_4_23 { ...props }>
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
					<InnerBlocks.Content />
				</div>
			</div>
		</Container_1_4_23>
	);
};

function dimRatioToClass( ratio ) {
	return 0 === ratio || 50 === ratio
		? null
		: 'has-background-dim-' + 10 * Math.round( ratio / 10 );
}

// Build deprecated list

const deprecated = [
	// Version 2_3_0
	{
		attributes: Container_2_3_0_attr,
		save: Container_2_3_0_save,
	},

	// Version 1_4_23
	{
		attributes: Container_1_4_23_attr,
		save: Container_1_4_23_save,
	},
];

export default deprecated;
