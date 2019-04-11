/**
 * Sections
 */

const { __ } = wp.i18n;
const sectionArray = [
	{
		id: 7,
		key: 'ab_section_block_test',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box --><!-- wp:atomic-blocks/ab-post-grid /-->",
		name: __( 'Section One' ),
		category: [ 'header' ],
		keywords: [ 'coffee' ],
		image: 'https://arraythemes.com/wp-content/uploads/edd/2017/06/meteor-desktop.jpg',
		favorite: true,
	},
	{
		id: 8,
		key: 'ab_section_block_test_two',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Section Two' ),
		background: 'light',
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://arraythemes.com/wp-content/uploads/edd/2018/04/array-ab-theme.jpg',
		favorite: false,
	},
	{
		id: 9,
		key: 'ab_layout_three',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box --><!-- wp:atomic-blocks/ab-post-grid /-->",
		name: __( 'Post/Page Grid' ),
		category: [ 'header' ],
		keywords: [ 'coffee' ],
		image: 'https://arraythemes.com/wp-content/uploads/edd/2017/03/atomic-home.jpg',
	},
	{
		id: 10,
		key: 'ab_layout_four',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Call To Action' ),
		background: 'light',
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://arraythemes.com/wp-content/uploads/edd/2016/04/baseline-home-1.jpg',
	}
];
export default sectionArray;
