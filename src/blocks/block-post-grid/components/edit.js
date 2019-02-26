/**
 * External dependencies
 */

import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import { stringify } from 'querystringify';
import Inspector from './inspector';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { apiFetch } = wp;

const {
	registerStore,
	withSelect,
} = wp.data;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;

class LatestPostsBlock extends Component {
	render() {
		const {
			attributes,
			categoriesList,
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
			excludeSticky,
			align,
			postLayout,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
			width,
			imageCrop,
			readMoreText,
			offset,
			excerptLength,
		} = attributes;

		const isLandscape = imageCrop === 'landscape';
		const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		if ( ! hasPosts ) {
			return (
				<Fragment>
					<Inspector
						{ ...{ setAttributes, ...this.props } }
					/>,
					<Placeholder
						icon="admin-post"
						label={ __( 'Atomic Blocks Post Grid', 'atomic-blocks' ) }
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

		return (
			<Fragment>
				<Inspector
					{ ...{ setAttributes, ...this.props } }
				/>,
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
				<div
					className={ classnames(
						this.props.className,
						'ab-block-post-grid',
					) }
				>
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
									post.featured_image_src && displayPostImage ? 'has-thumb' : 'no-thumb'
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
									{ displayPostTitle &&
										<h2 class="entry-title"><a href={ post.link } target="_blank" rel="bookmark">{ decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)', 'atomic-blocks' ) }</a></h2>
									}

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

									<div class="ab-block-post-grid-excerpt">
										{ displayPostExcerpt && post.excerpt &&
											<div dangerouslySetInnerHTML={ { __html: truncate( post.excerpt.rendered, excerptLength ) } } />
										}

										{ displayPostLink &&
											<p><a class="ab-block-post-grid-link ab-text-link" href={ post.link } target="_blank" rel="bookmark">{ readMoreText }</a></p>
										}
									</div>
								</div>
							</article>
						) }
					</div>
				</div>
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
		sticky: excludeStickyPosts
	}, ( value ) => ! isUndefined( value ) );

	const categoriesListQuery = {
		per_page: 100,
	};

	return {
		latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
		categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesListQuery ),
	};
} )( LatestPostsBlock );

// Truncate excerpt
function truncate(str, no_words) {
	return str.split(" ").splice(0,no_words).join(" ");
}