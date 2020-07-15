/**
 * External dependencies
 */

import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import Inspector from './inspector';
import PostGridImage from './image';

const { compose } = wp.compose;

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { withSelect } = wp.data;

const { Placeholder, Spinner, Toolbar } = wp.components;

const { BlockAlignmentToolbar, BlockControls } = wp.blockEditor;

class LatestPostsBlock extends Component {
	render() {
		const { attributes, setAttributes, latestPosts } = this.props;

		// Check if there are posts
		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		// Check the post type
		const isPost = 'post' === attributes.postType;

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector { ...{ setAttributes, ...this.props } } />
					<Placeholder
						icon="admin-post"
						label={ __(
							'Atomic Blocks Post and Page Grid',
							'atomic-blocks'
						) }
					>
						{ ! Array.isArray( latestPosts ) ? (
							<Spinner />
						) : (
							__( 'No posts found.', 'atomic-blocks' )
						) }
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPosts =
			( latestPosts.length > attributes.postsToShow ) && attributes.postType === 'post'
				? latestPosts.slice( 0, attributes.postsToShow )
				: latestPosts;

		// Add toolbar controls to change layout
		const layoutControls = [
			{
				icon: 'grid-view',
				title: __( 'Grid View', 'atomic-blocks' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: 'grid' === attributes.postLayout,
			},
			{
				icon: 'list-view',
				title: __( 'List View', 'atomic-blocks' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: 'list' === attributes.postLayout,
			},
		];

		// Get the section tag
		const SectionTag = attributes.sectionTag
			? attributes.sectionTag
			: 'section';

		// Get the section title tag
		const SectionTitleTag = attributes.sectionTitleTag
			? attributes.sectionTitleTag
			: 'h2';

		// Get the post title tag
		const PostTag = attributes.postTitleTag
			? attributes.postTitleTag
			: 'h3';

		return (
			<Fragment>
				<Inspector { ...{ setAttributes, ...this.props } } />
				<BlockControls>
					<BlockAlignmentToolbar
						value={ attributes.align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
						controls={ [ 'center', 'wide', 'full' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>
				<SectionTag
					className={ classnames(
						this.props.className,
						'ab-block-post-grid'
					) }
				>
					{ attributes.displaySectionTitle &&
						attributes.sectionTitle && (
							<SectionTitleTag className="ab-post-grid-section-title">
								{ attributes.sectionTitle }
							</SectionTitleTag>
						) }

					<div
						className={ classnames( {
							'is-grid': 'grid' === attributes.postLayout,
							'is-list': 'list' === attributes.postLayout,
							[ `columns-${ attributes.columns }` ]:
								'grid' === attributes.postLayout,
							'ab-post-grid-items': 'ab-post-grid-items',
						} ) }
					>
						{ displayPosts.map( ( post, i ) => (
							<article
								key={ i }
								id={ 'post-' + post.id }
								className={ classnames(
									'post-' + post.id,
									post.featured_image_src &&
										attributes.displayPostImage
										? 'has-post-thumbnail'
										: null
								) }
							>
								{ attributes.displayPostImage &&
								post.featured_media ? (
									<PostGridImage
										{ ...this.props }
										imgAlt={
											decodeEntities(
												post.title.rendered.trim()
											) ||
											__( '(Untitled)', 'atomic-blocks' )
										}
										imgClass={ `wp-image-${ post.featured_media.toString() }` }
										imgID={ post.featured_media.toString() }
										imgSize={ attributes.imageSize }
										imgSizeLandscape={
											post.featured_image_src
										}
										imgSizeSquare={
											post.featured_image_src_square
										}
										imgLink={ post.link }
									/>
								) : null }

								<div className="ab-block-post-grid-text">
									<header className="ab-block-post-grid-header">
										{ attributes.displayPostTitle && (
											<PostTag className="ab-block-post-grid-title">
												<a
													href={ post.link }
													target="_blank"
													rel="bookmark noopener noreferrer"
												>
													{ decodeEntities(
														post.title.rendered.trim()
													) ||
														__(
															'(Untitled)',
															'atomic-blocks'
														) }
												</a>
											</PostTag>
										) }

										{ isPost && (
											<div className="ab-block-post-grid-byline">
												{ attributes.displayPostAuthor &&
													post.author_info
														.display_name && (
														<div className="ab-block-post-grid-author">
															<a
																className="ab-text-link"
																target="_blank"
																rel="noopener noreferrer"
																href={
																	post
																		.author_info
																		.author_link
																}
															>
																{
																	post
																		.author_info
																		.display_name
																}
															</a>
														</div>
													) }

												{ attributes.displayPostDate &&
													post.date_gmt && (
														<time
															dateTime={ moment(
																post.date_gmt
															)
																.utc()
																.format() }
															className={
																'ab-block-post-grid-date'
															}
														>
															{ moment(
																post.date_gmt
															)
																.local()
																.format(
																	'MMMM DD, Y',
																	'atomic-blocks'
																) }
														</time>
													) }
											</div>
										) }
									</header>

									<div className="ab-block-post-grid-excerpt">
										{ attributes.displayPostExcerpt &&
											post.excerpt && (
												<div
													dangerouslySetInnerHTML={ {
														__html: truncate(
															post.excerpt
																.rendered,
															attributes.excerptLength
														),
													} }
												/>
											) }

										{ attributes.displayPostLink && (
											<p>
												<a
													className="ab-block-post-grid-more-link ab-text-link"
													href={ post.link }
													target="_blank"
													rel="bookmark noopener noreferrer"
												>
													{ attributes.readMoreText }
												</a>
											</p>
										) }
									</div>
								</div>
							</article>
						) ) }
					</div>
				</SectionTag>
			</Fragment>
		);
	}
}

export default compose( [
	withSelect( ( select, props ) => {
		const { order, categories } = props.attributes;

		const { getEntityRecords } = select( 'core' );

		const latestPostsQuery = pickBy(
			{
				categories,
				order,
				orderby: props.attributes.orderBy,
				per_page: props.attributes.postsToShow,
				offset: props.attributes.offset,
				exclude: [ wp.data.select( 'core/editor' ).getCurrentPostId() ],
			},
			( value ) => ! isUndefined( value )
		);

		// Grab the page IDs from the array
		const pageIDs = props.attributes.selectedPages && props.attributes.selectedPages.length > 0 ? props.attributes.selectedPages.map(obj => obj.value) : null;

		// Query for pages
		const pageQuery = pickBy(
			{
				include: pageIDs ? pageIDs : null,
				orderby: pageIDs ? 'include' : null,
				per_page: props.attributes.selectedPages.length
			},
			( value ) => ! isUndefined( value )
		);

		// Return the post or page query
		return {
			latestPosts: getEntityRecords(
				'postType',
				props.attributes.postType,
				'page' === props.attributes.postType && pageIDs
				? pageQuery
				: latestPostsQuery
			)
		};
	} ),
] )( LatestPostsBlock );

// Truncate excerpt
function truncate( str, no_words ) {
	return str
		.split( ' ' )
		.splice( 0, no_words )
		.join( ' ' );
}
