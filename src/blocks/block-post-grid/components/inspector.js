/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
  ColorPalette,
  PanelColorSettings,
  MediaUpload,
} = wp.editor;

// Import Inspector components
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

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

    constructor( props ) {
		super( ...arguments );

		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
		this.toggleDisplayPostExcerpt = this.toggleDisplayPostExcerpt.bind( this );
		this.toggleDisplayPostAuthor = this.toggleDisplayPostAuthor.bind( this );
		this.toggleDisplayPostImage = this.toggleDisplayPostImage.bind( this );
		this.toggleDisplayPostLink = this.toggleDisplayPostLink.bind( this );
		this.toggleDisplayPostTitle = this.toggleDisplayPostTitle.bind( this );
		this.toggleExcludeSticky = this.toggleExcludeSticky.bind( this );
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}

	toggleDisplayPostExcerpt() {
		const { displayPostExcerpt } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostExcerpt: ! displayPostExcerpt } );
	}

	toggleDisplayPostAuthor() {
		const { displayPostAuthor } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostAuthor: ! displayPostAuthor } );
	}

	toggleDisplayPostImage() {
		const { displayPostImage } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostImage: ! displayPostImage } );
	}

	toggleDisplayPostLink() {
		const { displayPostLink } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostLink: ! displayPostLink } );
	}

	toggleDisplayPostTitle() {
		const { displayPostTitle } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostTitle: ! displayPostTitle } );
	}

	toggleExcludeSticky() {
		const { excludeSticky } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { excludeSticky: ! excludeSticky } );
	}

	render() {

		// Setup the attributes
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
			postLayout,
			columns,
			order,
			orderBy,
			categories,
			postsToShow,
			imageCrop,
			readMoreText,
			offset,
			excerptLength,
		} = attributes;

		// Thumbnail options
		const imageCropOptions = [
			{ value: 'landscape', label: __( 'Landscape', 'atomic-blocks' ) },
			{ value: 'square', label: __( 'Square', 'atomic-blocks' ) },
        ];

        // Check for posts
        const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

		return (
            <InspectorControls>
                <PanelBody title={ __( 'Post Grid Settings', 'atomic-blocks' ) }>
                    <QueryControls
                        { ...{ order, orderBy } }
                        numberOfItems={ postsToShow }
                        categoriesList={ categoriesList }
                        selectedCategoryId={ categories }
                        onOrderChange={ ( value ) => setAttributes( { order: value } ) }
                        onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
                        onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
                        onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
                    />
                    <RangeControl
                        label={ __( 'Number of items to offset', 'atomic-blocks' ) }
                        value={ offset }
                        onChange={ ( value ) => setAttributes( { offset: value } ) }
                        min={ 0 }
                        max={ 20 }
                    />
                    { postLayout === 'grid' &&
                        <RangeControl
                            label={ __( 'Columns', 'atomic-blocks' ) }
                            value={ columns }
                            onChange={ ( value ) => setAttributes( { columns: value } ) }
                            min={ 2 }
                            max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, latestPosts.length ) }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Exclude Sticky Posts', 'atomic-blocks' ) }
                        checked={ excludeSticky }
                        onChange={ this.toggleExcludeSticky }
                    />
                </PanelBody>
                <PanelBody
                    title={ __( 'Post Grid Content', 'atomic-blocks' ) }
                    initialOpen={ false }
                >
                    <ToggleControl
                        label={ __( 'Display Featured Image', 'atomic-blocks' ) }
                        checked={ displayPostImage }
                        onChange={ this.toggleDisplayPostImage }
                    />
                    { displayPostImage &&
                        <SelectControl
                            label={ __( 'Featured Image Style', 'atomic-blocks' ) }
                            options={ imageCropOptions }
                            value={ imageCrop }
                            onChange={ ( value ) => this.props.setAttributes( { imageCrop: value } ) }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Post Title', 'atomic-blocks' ) }
                        checked={ displayPostTitle }
                        onChange={ this.toggleDisplayPostTitle }
                    />
                    <ToggleControl
                        label={ __( 'Display Post Author', 'atomic-blocks' ) }
                        checked={ displayPostAuthor }
                        onChange={ this.toggleDisplayPostAuthor }
                    />
                    <ToggleControl
                        label={ __( 'Display Post Date', 'atomic-blocks' ) }
                        checked={ displayPostDate }
                        onChange={ this.toggleDisplayPostDate }
                    />
                    <ToggleControl
                        label={ __( 'Display Post Excerpt', 'atomic-blocks' ) }
                        checked={ displayPostExcerpt }
                        onChange={ this.toggleDisplayPostExcerpt }
                    />
                    { displayPostExcerpt &&
                        <RangeControl
                            label={ __( 'Excerpt Length', 'atomic-blocks' ) }
                            value={ excerptLength }
                            onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
                            min={ 0 }
                            max={ 150 }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Continue Reading Link', 'atomic-blocks' ) }
                        checked={ displayPostLink }
                        onChange={ this.toggleDisplayPostLink }
                    />
                    { displayPostLink &&
                        <TextControl
                            label={ __( 'Customize Read More Link', 'atomic-blocks' ) }
                            type="text"
                            value={ readMoreText }
                            onChange={ ( value ) => this.props.setAttributes( { readMoreText: value } ) }
                        />
                    }
                </PanelBody>
            </InspectorControls>
		);
	}
}
