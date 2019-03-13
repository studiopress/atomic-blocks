/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const {
	Component,
	Fragment,
} = wp.element;

// Import block components
const {
  InspectorControls,
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
		this.toggleDisplaySectionTitle = this.toggleDisplaySectionTitle.bind( this );
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

	toggleDisplaySectionTitle() {
		const { displaySectionTitle } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displaySectionTitle: ! displaySectionTitle } );
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
			displaySectionTitle,
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
			postType,
			sectionTag,
			sectionTitle,
			sectionTitleTag,
			postTitleTag,
		} = attributes;

		// Thumbnail options
		const imageCropOptions = [
			{ value: 'landscape', label: __( 'Landscape', 'atomic-blocks' ) },
			{ value: 'square', label: __( 'Square', 'atomic-blocks' ) },
        ];

        // Post type options
		const postTypeOptions = [
			{ value: 'post', label: __( 'Post', 'atomic-blocks' ) },
			{ value: 'page', label: __( 'Page', 'atomic-blocks' ) },
		];

		// Section title tags
		const sectionTags = [
			{ value: 'div', label: __( 'div', 'atomic-blocks' ) },
			{ value: 'header', label: __( 'header', 'atomic-blocks' ) },
			{ value: 'section', label: __( 'section', 'atomic-blocks' ) },
			{ value: 'article', label: __( 'article', 'atomic-blocks' ) },
			{ value: 'main', label: __( 'main', 'atomic-blocks' ) },
			{ value: 'aside', label: __( 'aside', 'atomic-blocks' ) },
			{ value: 'footer', label: __( 'footer', 'atomic-blocks' ) },
        ];

		// Section title tags
		const sectionTitleTags = [
			{ value: 'h1', label: __( 'H1', 'atomic-blocks' ) },
			{ value: 'h2', label: __( 'H2', 'atomic-blocks' ) },
			{ value: 'h3', label: __( 'H3', 'atomic-blocks' ) },
			{ value: 'h4', label: __( 'H4', 'atomic-blocks' ) },
			{ value: 'h5', label: __( 'H5', 'atomic-blocks' ) },
			{ value: 'h6', label: __( 'H6', 'atomic-blocks' ) },
        ];

        // Check for posts
        const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

        // Check the post type
		const isPost = postType === 'post';

		return (
            <InspectorControls>
                <PanelBody
                    title={ __( 'Post and Page Grid Settings', 'atomic-blocks' ) }
                    className={ isPost ? null : 'atomic-blocks-hide-query' }
                >
                    <SelectControl
                        label={ __( 'Content Type', 'atomic-blocks' ) }
                        options={ postTypeOptions }
                        value={ postType }
                        onChange={ ( value ) => this.props.setAttributes( { postType: value } ) }
                    />
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
                    { isPost &&
                        <ToggleControl
                            label={ __( 'Exclude Sticky Posts', 'atomic-blocks' ) }
                            checked={ excludeSticky }
                            onChange={ this.toggleExcludeSticky }
                        />
                    }
                </PanelBody>
                <PanelBody
                    title={ __( 'Post and Page Grid Content', 'atomic-blocks' ) }
                    initialOpen={ false }
                >
					<ToggleControl
						label={ __( 'Display Section Title', 'atomic-blocks' ) }
						checked={ displaySectionTitle }
						onChange={ this.toggleDisplaySectionTitle }
					/>
					{ displaySectionTitle &&
						<TextControl
							label={ __( 'Section Title', 'atomic-blocks' ) }
							type="text"
							value={ sectionTitle }
							onChange={ ( value ) => this.props.setAttributes( { sectionTitle: value } ) }
						/>
					}
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
                        label={ __( 'Display Title', 'atomic-blocks' ) }
                        checked={ displayPostTitle }
                        onChange={ this.toggleDisplayPostTitle }
                    />
                    { isPost &&
                        <ToggleControl
                            label={ __( 'Display Author', 'atomic-blocks' ) }
                            checked={ displayPostAuthor }
                            onChange={ this.toggleDisplayPostAuthor }
                        />
                    }
                    { isPost &&
                        <ToggleControl
                            label={ __( 'Display Date', 'atomic-blocks' ) }
                            checked={ displayPostDate }
                            onChange={ this.toggleDisplayPostDate }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Excerpt', 'atomic-blocks' ) }
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
                            label={ __( 'Customize Continue Reading Text', 'atomic-blocks' ) }
                            type="text"
                            value={ readMoreText }
                            onChange={ ( value ) => this.props.setAttributes( { readMoreText: value } ) }
                        />
                    }
                </PanelBody>
				<PanelBody
                    title={ __( 'Post and Page Grid Markup', 'atomic-blocks' ) }
					initialOpen={ false }
					className="ab-block-post-grid-markup-settings"
                >
					<SelectControl
						label={ __( 'Post Grid Section Tag', 'atomic-blocks' ) }
						options={ sectionTags }
						value={ sectionTag }
						onChange={ ( value ) => this.props.setAttributes( { sectionTag: value } ) }
						help={ __( 'Change the post grid section tag to match your content hierarchy.', 'atomic-blocks' ) }
					/>
					{ sectionTitle &&
						<SelectControl
							label={ __( 'Section Title Heading Tag', 'atomic-blocks' ) }
							options={ sectionTitleTags }
							value={ sectionTitleTag }
							onChange={ ( value ) => this.props.setAttributes( { sectionTitleTag: value } ) }
							help={ __( 'Change the post/page section title tag to match your content hierarchy.', 'atomic-blocks' ) }
						/>
                    }
					{ displayPostTitle &&
                        <SelectControl
                            label={ __( 'Post Title Heading Tag', 'atomic-blocks' ) }
                            options={ sectionTitleTags }
                            value={ postTitleTag }
							onChange={ ( value ) => this.props.setAttributes( { postTitleTag: value } ) }
							help={ __( 'Change the post/page title tag to match your content hierarchy.', 'atomic-blocks' ) }
                        />
					}
				</PanelBody>
            </InspectorControls>
		);
	}
}
