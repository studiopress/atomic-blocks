/**
 * BLOCK: Atomic Blocks Sharing
 */

// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import ShareLinks from './components/sharing';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const { registerBlockType } = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

// Register the block
registerBlockType( 'atomic-blocks/ab-sharing', {
	title: __( 'AB Sharing', 'atomic-blocks' ),
	description: __( 'Add sharing buttons to your posts and pages.', 'atomic-blocks' ),
	icon: 'admin-links',
	category: 'atomic-blocks',
	keywords: [
		__( 'sharing', 'atomic-blocks' ),
		__( 'social', 'atomic-blocks' ),
		__( 'atomic', 'atomic-blocks' ),
	],

	// Render the block components
	edit: props => {

		// Setup the props
		const {
			attributes,
			isSelected,
			editable,
			className,
			setAttributes
		} = props;

		const {
			twitter,
			facebook,
			google,
			linkedin,
			pinterest,
			email,
			reddit,
			shareAlignment,
			shareButtonStyle,
			shareButtonShape,
			shareButtonColor,
		} = props.attributes;

		return [
			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ shareAlignment }
					onChange={ ( value ) => {
						setAttributes( { shareAlignment: value } );
					} }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...props }
			/>,
			// Show the button markup in the editor
			<ShareLinks { ...props }>
				<ul className="ab-share-list">
				{ twitter &&
					<li>
						<a className='ab-share-twitter'>
							<i className="fab fa-twitter"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Twitter', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ facebook &&
					<li>
						<a className='ab-share-facebook'>
							<i className="fab fa-facebook-f"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Facebook', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ google &&
					<li>
						<a className='ab-share-google'>
							<i className="fab fa-google"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Google', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ pinterest &&
					<li>
						<a className='ab-share-pinterest'>
							<i className="fab fa-pinterest-p"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Pinterest', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ linkedin &&
					<li>
						<a className='ab-share-linkedin'>
							<i className="fab fa-linkedin"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on LinkedIn', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ reddit &&
					<li>
						<a className='ab-share-reddit'>
							<i className="fab fa-reddit-alien"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on reddit', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ email &&
					<li>
						<a className='ab-share-email'>
							<i className="fas fa-envelope"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share via Email', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}
				</ul>
			</ShareLinks>
		];
	},

	// Render via PHP
	save() {
		return null;
	},
} );
