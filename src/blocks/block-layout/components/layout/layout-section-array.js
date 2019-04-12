/**
 * Sections
 */

const { __ } = wp.i18n;
const sectionArray = [
	{
		id: 1,
		key: 'ab_layout_service_1',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box --><!-- wp:atomic-blocks/ab-post-grid /-->",
		name: __( 'Services - Two Column', 'atomic-blocks' ),
		category: [ 'header' ],
		keywords: [ 'coffee' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/3n1F2i2s3V2F1n1E3b0k/ab-layout-1.jpg',
	},
	{
		id: 2,
		key: 'ab_layout_service_2',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Services - Full Width', 'atomic-blocks' ),
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/1l0w2Q2U2i3E1G3u1H1C/ab-layout-2.jpg',
	},
	{
		id: 3,
		key: 'ab_layout_media_text',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box --><!-- wp:atomic-blocks/ab-post-grid /-->",
		name: __( 'Media / Text', 'atomic-blocks' ),
		category: [ 'header' ],
		keywords: [ 'coffee' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/1V2S263O2E2H1N092b1I/ab-layout-3.jpg',
	},
	{
		id: 4,
		key: 'ab_layout_header_1',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Video Header', 'atomic-blocks' ),
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/2S2x3A06003l021a1w2w/ab-layout-4.jpg',
	},
	{
		id: 5,
		key: 'ab_layout_team',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Team Members', 'atomic-blocks' ),
		category: [ 'call-to-action' ],
		keywords: [ 'pizza' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/0M160g3I0K2D083g341p/ab-layout-5.jpg',
	},
	{
		id: 6,
		key: 'ab_layout_services_image',
		content: "<!-- wp:atomic-blocks/ab-profile-box --><div style=\"background-color:#f2f2f2;color:#32373c\" class=\"wp-block-atomic-blocks-ab-profile-box square ab-font-size-18 ab-block-profile ab-profile-columns\"><div class=\"ab-profile-column ab-profile-content-wrap\"><h2 class=\"ab-profile-name\" style=\"color:#32373c\">Mike McAlister</h2><p class=\"ab-profile-title\" style=\"color:#32373c\">Developer</p><div class=\"ab-profile-text\"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac purus nec diam laoreet sollicitudin. Fusce ullamcorper imperdiet turpis, non accumsan enim egestas in.</p></div><ul class=\"ab-social-links\"></ul></div></div><!-- /wp:atomic-blocks/ab-profile-box -->",
		name: __( 'Services - Text/Image', 'atomic-blocks' ),
		category: [ 'pizza' ],
		keywords: [ 'pizza' ],
		image: 'https://d1c0hjomoutdrw.cloudfront.net/items/2P1R1H340Y0H3c0L1t01/ab-layout-6.jpg',
	},
];
export default sectionArray;
