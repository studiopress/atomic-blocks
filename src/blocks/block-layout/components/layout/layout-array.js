/**
 * Layouts
 */

const { __ } = wp.i18n;
const layoutArray = [
	{
		id: 1,
		key: 'ab_layout_post_grid',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box --><!-- wp:atomic-blocks/ab-post-grid /-->",
		name: __( 'Post/Page Grid' ),
		category: [ 'header' ],
		keywords: [ 'coffee' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/3n1F2i2s3V2F1n1E3b0k/ab-layout-1.jpg',
		favorite: true,
	},
	{
		id: 2,
		key: 'ab_layout_cta',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Call To Action' ),
		background: 'light',
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/1l0w2Q2U2i3E1G3u1H1C/ab-layout-2.jpg',
		favorite: false,
	},
	{
		id: 3,
		key: 'ab_layout_three',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box --><!-- wp:atomic-blocks/ab-post-grid /-->",
		name: __( 'Post/Page Grid' ),
		category: [ 'header' ],
		keywords: [ 'coffee' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/1V2S263O2E2H1N092b1I/ab-layout-3.jpg',
	},
	{
		id: 4,
		key: 'ab_layout_four',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Call To Action' ),
		background: 'light',
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://arraythemes.com/wp-content/uploads/edd/2016/04/baseline-home-1.jpg',
	}
];
export default layoutArray;
