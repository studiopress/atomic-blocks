/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import Edit from './components/edit';
import './styles/style.scss';
import './styles/editor.scss';

registerBlockType( 'atomic-blocks/newsletter', {
	title: __( 'Email newsletter', 'atomic-blocks' ),
	description: __( 'Add an email newsletter sign-up form.', 'atomic-blocks' ),
	category: 'atomic-blocks',
	icon: 'email-alt',
	keywords: [
		__( 'Mailchimp', 'atomic-blocks' ),
		__( 'Subscribe', 'atomic-blocks' ),
		__( 'Newsletter', 'atomic-blocks' ),
	],
	edit: Edit,
	ab_settings_data: {
		ab_newsletter_mailingList: {
			title: __( 'Mailing List', 'atomic-blocks' ),
		},
		ab_newsletter_successMessage: {
			title: __( 'Success Message', 'atomic-blocks' ),
		},
		ab_newsletter_doubleOptIn: {
			title: __( 'Enable Double Opt-In', 'atomic-blocks' ),
		},
		ab_newsletter_containerPadding: {
			title: __( 'Form Padding', 'atomic-blocks' ),
		},
		ab_newsletter_containerMargin: {
			title: __( 'Form Margin', 'atomic-blocks' ),
		},
		ab_newsletter_colorOptions: {
			title: __( 'Color Options', 'atomic-blocks' ),
		},
	},
	save: () => {
		return null;
	},
} );
