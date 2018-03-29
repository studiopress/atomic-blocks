/**
 * Social Media Icons
 */
const { __ } = wp.i18n;
const { Component } = wp.element;

/**
 * Create an SocialIcons wrapper Component
 */
export default class SocialIcons extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {
		return (
			<ul class="ab-social-links">
				{ this.props.attributes.website && (
					<li >
						<a href={ this.props.attributes.website } target="_blank">{ __( 'Website' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fas fa-link"></i></a>
					</li>
				) }

				{ this.props.attributes.twitter && (
					<li>
						<a href={ this.props.attributes.twitter } target="_blank">{ __( 'Twitter' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-twitter"></i></a>
					</li>
				) }

				{ this.props.attributes.facebook && (
					<li>
						<a href={ this.props.attributes.facebook } target="_blank">{ __( 'Facebook' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-facebook-f"></i></a>
					</li>
				) }

				{ this.props.attributes.instagram && (
					<li>
						<a href={ this.props.attributes.instagram } target="_blank">{ __( 'Instagram' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-instagram"></i></a>
					</li>
				) }

				{ this.props.attributes.pinterest && (
					<li>
						<a href={ this.props.attributes.pinterest } target="_blank">{ __( 'Pinterest' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-pinterest"></i></a>
					</li>
				) }

				{ this.props.attributes.google && (
					<li>
						<a href={ this.props.attributes.google } target="_blank">{ __( 'Google' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-google"></i></a>
					</li>
				) }

				{ this.props.attributes.youtube && (
					<li>
						<a href={ this.props.attributes.youtube } target="_blank">{ __( 'YouTube' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-youtube"></i></a>
					</li>
				) }

				{ this.props.attributes.github && (
					<li>
						<a href={ this.props.attributes.github } target="_blank">{ __( 'Github' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="fab fa-github"></i></a>
					</li>
				) }

				{ this.props.attributes.email && (
					<li>
						<a href={ this.props.attributes.email } target="_blank">{ __( 'Email' ) } <i style={ { backgroundColor:this.props.attributes.blockLinkColor } } class="far fa-envelope"></i></a>
					</li>
				) }
			</ul>
		);
	}
}
