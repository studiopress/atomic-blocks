/**
 * External dependencies
 */

import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import Inspector from './inspector';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const {
	withSelect,
} = wp.data;

const {
	Placeholder,
	Spinner,
	Toolbar,
} = wp.components;

const {
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;

class LatestPostsBlock extends Component {
	render() {
		const {
			attributes,
			setAttributes,
			latestPosts
		} = this.props;

		const {
			displayPostDate,
			displayPostExcerpt,
			displayPostAuthor,
			displayPostImage,
			displayPostLink,
			displayPostTitle,
			align,
			postLayout,
			columns,
			postsToShow,
			imageCrop,
			readMoreText,
			excerptLength,
			postType,
			sectionTag,
			sectionTitle,
			sectionTitleTag,
			postTitleTag,
		} = attributes;

		// Check the image orientation
		const isLandscape = imageCrop === 'landscape';

		// Check if there are posts
		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		// Check the post type
		const isPost = postType === 'post';

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector
						{ ...{ setAttributes, ...this.props } }
					/>
					<Placeholder
						icon="admin-post"
						label={ __( 'Atomic Blocks Post and Page Grid', 'atomic-blocks' ) }
					>
						{ ! Array.isArray( latestPosts ) ?
							<Spinner /> :
							__( 'No posts found.', 'atomic-blocks' )
						}
					</Placeholder>
				</Fragment>
			);
		}

		// Removing posts from display should be instant.
		const displayPosts = latestPosts.length > postsToShow ?
			latestPosts.slice( 0, postsToShow ) :
			latestPosts;

		// Add toolbar controls to change layout
		const layoutControls = [
			{
				icon: 'grid-view',
				title: __( 'Grid View', 'atomic-blocks' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
			{
				icon: 'list-view',
				title: __( 'List View', 'atomic-blocks' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
		];

		// Get the section tag
		const SectionTag = sectionTag ? sectionTag : "section"

		// Get the section title tag
		const SectionTitleTag = sectionTitleTag ? sectionTitleTag : "h2"

		// Get the post title tag
		const PostTag = postTitleTag ? postTitleTag : "h3"

		return (
			<Fragment>
				<Inspector
					{ ...{ setAttributes, ...this.props } }
				/>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => {
							setAttributes( { align: value } );
						} }
						controls={ [ 'center', 'wide' ] }
					/>
					<Toolbar controls={ layoutControls } />
				</BlockControls>
				<SectionTag
					className={ classnames(
						this.props.className,
						'ab-block-post-grid',
					) }
				>
					{ sectionTitle &&
						<SectionTitleTag class="ab-post-grid-section-title">{ sectionTitle }</SectionTitleTag>
					}

					<div
						className={ classnames( {
							'is-grid': postLayout === 'grid',
							'is-list': postLayout === 'list',
							[ `columns-${ columns }` ]: postLayout === 'grid',
							'ab-post-grid-items' : 'ab-post-grid-items'
						} ) }
					>
						{ displayPosts.map( ( post, i ) =>
							<article
								key={ i }
								id={ 'post-' + post.id }
								className={ classnames(
									'post-' + post.id,
									post.featured_image_src && displayPostImage ? 'has-post-thumbnail' : null
								) }
							>
								{
									displayPostImage && post.featured_image_src !== undefined && post.featured_image_src ? (
										<div class="ab-block-post-grid-image">
											<a href={ post.link } target="_blank" rel="bookmark">
												<img
													src={ isLandscape ? post.featured_image_src : post.featured_image_src_square }
													alt={ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)', 'atomic-blocks' ) }
												/>
											</a>
										</div>
									) : (
										null
									)
								}

								<div class="ab-block-post-grid-text">
									<header class="ab-block-post-grid-header">
										{ displayPostTitle &&
											<PostTag class="ab-block-post-grid-title"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)', 'atomic-blocks' ) }</a></PostTag>
										}

										{ isPost &&
											<div class="ab-block-post-grid-byline">
												{ displayPostAuthor && post.author_info.display_name &&
													<div class="ab-block-post-grid-author"><a class="ab-text-link" target="_blank" href={ post.author_info.author_link }>{ post.author_info.display_name }</a></div>
												}

												{ displayPostDate && post.date_gmt &&
													<time dateTime={ moment( post.date_gmt ).utc().format() } className={ 'ab-block-post-grid-date' }>
														{ moment( post.date_gmt ).local().format( 'MMMM DD, Y', 'atomic-blocks' ) }
													</time>
												}
											</div>
										}
									</header>

									<div class="ab-block-post-grid-excerpt">
										{ displayPostExcerpt && post.excerpt &&
											<div dangerouslySetInnerHTML={ { __html: truncate( post.excerpt.rendered, excerptLength ) } } />
										}

										{ displayPostLink &&
											<p><a class="ab-block-post-grid-more-link ab-text-link" href={ post.link } target="_blank" rel="bookmark">{ readMoreText }</a></p>
										}
									</div>
								</div>
							</article>
						) }
					</div>
				</SectionTag>
			</Fragment>
		);
	}
}

export default withSelect( ( select, props ) => {
	const {
		postsToShow,
		order,
		orderBy,
		categories,
		offset,
		excludeSticky,
		postType,
	} = props.attributes;

	// Exclude the sticky posts
	const excludeStickyPosts = excludeSticky ? false : undefined;

	const { getEntityRecords } = select( 'core', 'atomic-blocks' );

	const latestPostsQuery = pickBy( {
		categories,
		order,
		orderby: orderBy,
		per_page: postsToShow,
		offset: offset,
		sticky: excludeStickyPosts,
	}, ( value ) => ! isUndefined( value ) );

	const categoriesListQuery = {
		per_page: 100,
	};

	return {
		latestPosts: getEntityRecords( 'postType', postType, latestPostsQuery ),
		categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesListQuery ),
	};
} )( LatestPostsBlock );

// Truncate excerpt
function truncate(str, no_words) {
	return str.split(" ").splice(0,no_words).join(" ");
}
