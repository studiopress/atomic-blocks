/**
 * Post grid categories component.
 */
const { Component } = wp.element;
const { __ } = wp.i18n;
const { addQueryArgs } = wp.url;
const { apiFetch } = wp;

export default class Categories extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = { categoriesList: [] };
	}

	componentDidMount() {
		this.stillMounted = true;
		this.fetchRequest = apiFetch({
			path: addQueryArgs( '/wp/v2/categories?post=' + this.props.postId, { per_page: -1 })
		}).then(
			( categoriesList ) => {
				if ( this.stillMounted ) {
					this.setState({ categoriesList });
				}
			}
		).catch(
			() => {
				if ( this.stillMounted ) {
					this.setState({ categoriesList: [] });
				}
			}
		);
	}

	componentWillUnmount() {
		this.stillMounted = false;
	}

	render() {
		const Categories = this.state.categoriesList.map( category => {
			return <a className="ab-block-post-grid-categories" key={category.id} href={category.link}>&nbsp;{category.name}</a>;
		});

		return (
			<div className="ab-block-post-grid-categories">
				<p>
					{
						( 1 === this.state.categoriesList.length ) &&
						__( 'Category:', 'atomic-blocks' ) ||
						__( 'Categories:', 'atomic-blocks' )
					}
					{
						this.state.categoriesList.map( category => {
							let separator = ( 1 < this.state.categoriesList.length && this.state.categoriesList[this.state.categoriesList.length - 1].id !== category.id ) && ', ' || ' ';
							return <a className="ab-block-post-grid-categories" key={category.id} href={category.link}>{category.name}{separator}</a>;
						})
					}
				</p>
			</div>
		);
	}
}
