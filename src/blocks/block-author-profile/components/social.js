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
				{ this.props.attributes.website && !! this.props.attributes.website.length && (
					<li>
						<a href={ this.props.attributes.website } target="_blank">{ __( 'Website', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fas fa-link"></i></a>
					</li>
				) }

				{ this.props.attributes.twitter && !! this.props.attributes.twitter.length && (
					<li>
						<a href={ this.props.attributes.twitter } target="_blank">{ __( 'Twitter', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-twitter"></i></a>
					</li>
				) }

				{ this.props.attributes.facebook && !! this.props.attributes.facebook.length && (
					<li>
						<a href={ this.props.attributes.facebook } target="_blank">{ __( 'Facebook', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-facebook-f"></i></a>
					</li>
				) }

				{ this.props.attributes.instagram && !! this.props.attributes.instagram.length && (
					<li>
						<a href={ this.props.attributes.instagram } target="_blank">{ __( 'Instagram', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-instagram"></i></a>
					</li>
				) }

				{ this.props.attributes.pinterest && !! this.props.attributes.pinterest.length && (
					<li>
						<a href={ this.props.attributes.pinterest } target="_blank">{ __( 'Pinterest', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-pinterest"></i></a>
					</li>
				) }

				{ this.props.attributes.google && !! this.props.attributes.google.length && (
					<li>
						<a href={ this.props.attributes.google } target="_blank">{ __( 'Google', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-google"></i></a>
					</li>
				) }

				{ this.props.attributes.youtube && !! this.props.attributes.youtube.length && (
					<li>
						<a href={ this.props.attributes.youtube } target="_blank">{ __( 'YouTube', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-youtube"></i></a>
					</li>
				) }

				{ this.props.attributes.linkedin && !! this.props.attributes.linkedin.length && (
					<li>
						<a href={ this.props.attributes.linkedin } target="_blank">{ __( 'LinkedIn', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-linkedin"></i></a>
					</li>
				) }

				{ this.props.attributes.github && !! this.props.attributes.github.length && (
					<li>
						<a href={ this.props.attributes.github } target="_blank">{ __( 'Github', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="fab fa-github"></i></a>
					</li>
				) }

				{ this.props.attributes.email && !! this.props.attributes.email.length && (
					<li>
						<a href={ this.props.attributes.email } target="_blank">{ __( 'Email', 'atomic-blocks' ) } <i style={ { backgroundColor:this.props.attributes.profileLinkColor } } class="far fa-envelope"></i></a>
					</li>
				) }
			</ul>
		);
	}
}
