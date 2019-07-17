/**
 * Internal dependencies
 */
import Inspector from './inspector';
import ShareLinks from './sharing';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	AlignmentToolbar,
	BlockControls
} = wp.editor;

export default class Edit extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {

		return [

			// Show the alignment toolbar on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ this.props.attributes.shareAlignment }
					onChange={ ( value ) => this.props.setAttributes({ shareAlignment: value }) }
				/>
			</BlockControls>,

			// Show the block controls on focus
			<Inspector { ...this.props }/>,

			// Show the button markup in the editor
			<ShareLinks { ...this.props }>
				<ul className="ab-share-list">
				{ this.props.attributes.twitter &&
					<li>
						<a className='ab-share-twitter'>
							<i className="fab fa-twitter"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Twitter', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ this.props.attributes.facebook &&
					<li>
						<a className='ab-share-facebook'>
							<i className="fab fa-facebook-f"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Facebook', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ this.props.attributes.pinterest &&
					<li>
						<a className='ab-share-pinterest'>
							<i className="fab fa-pinterest-p"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on Pinterest', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ this.props.attributes.linkedin &&
					<li>
						<a className='ab-share-linkedin'>
							<i className="fab fa-linkedin"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on LinkedIn', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ this.props.attributes.reddit &&
					<li>
						<a className='ab-share-reddit'>
							<i className="fab fa-reddit-alien"></i>
							<span className={ 'ab-social-text' }>
								{ __( 'Share on reddit', 'atomic-blocks' ) }
							</span>
						</a>
					</li>
				}

				{ this.props.attributes.email &&
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
	}
}
