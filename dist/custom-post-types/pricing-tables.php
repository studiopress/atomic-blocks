<?php
/**
 * Register the Pricing Tables custom post type
 */

/* Exit if accessed directly */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* Register the Pricing Tables CPT */
function atomic_blocks_pricing_tables_register() {

	register_post_type(
		'atomic-pricing',
		array(
			'description' => '',
			'public' => true,
			'publicly_queryable' => true,
			'show_in_nav_menus' => false,
			'show_in_admin_bar' => true,
			'exclude_from_search' => false,
			'show_ui' => true,
			'show_in_menu' => true,
			'menu_position' => null,
			'menu_icon' => 'dashicons-cart',
			'can_export' => true,
			'delete_with_user' => false,
			'hierarchical' => false,
			'has_archive' => 'pricing-tables',
			'query_var' => 'pricing',
			'show_in_rest' => true,
			'rest_base' => 'pricing',
			'rest_controller_class' => 'WP_REST_Posts_Controller',

			// The rewrite handles the URL structure
			'rewrite' => array(
				'slug' => 'pricing-tables',
				'with_front' => false,
				'pages' => true,
				'feeds' => true,
				'ep_mask' => EP_PERMALINK,
			),

			// What features the post type supports
			'supports' => array(
				'title',
				'editor',
				'author',
				'thumbnail'
			),

			// Labels used when displaying the posts
			'labels' => array(
				'name' => __( 'Pricing Tables', 'atomic-blocks' ),
				'singular_name' => __( 'Pricing Table', 'atomic-blocks' ),
				'menu_name' => __( 'Pricing Tables', 'atomic-blocks' ),
				'name_admin_bar' => __( 'Pricing', 'atomic-blocks' ),
				'add_new' => __( 'Add New', 'atomic-blocks' ),
				'add_new_item' => __( 'Add New Pricing Table', 'atomic-blocks' ),
				'edit_item' => __( 'Edit Pricing Table', 'atomic-blocks' ),
				'new_item' => __( 'New Pricing Table', 'atomic-blocks' ),
				'view_item' => __( 'View Pricing Table', 'atomic-blocks' ),
				'search_items' => __( 'Search Pricing Tables', 'atomic-blocks' ),
				'not_found' => __( 'No pricing tables found', 'atomic-blocks' ),
				'not_found_in_trash' => __( 'No pricing tables found in trash', 'atomic-blocks' ),
				'all_items' => __( 'Pricing Tables', 'atomic-blocks' ),
			)
		)
	);
}
add_action( 'init', 'atomic_blocks_pricing_tables_register' );


/* Register the Pricing Tables Category taxonomy */
function atomic_blocks_pricing_tables_tax() {
	register_taxonomy(
		'pricing_table_category',
		array( 'pricing-table' ),
		array(
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud' => true,
			'show_admin_column' => true,
			'hierarchical' => true,
			'query_var' => 'pricing_table_category',

			// The rewrite handles the URL structure.
			'rewrite' => array(
				'slug' => 'pricing-tables/category',
				'with_front' => false,
				'hierarchical' => true,
				'ep_mask' => EP_NONE
			),

			// Labels used when displaying taxonomy and terms.
			'labels' => array(
				'name' => __( 'Pricing Tables Categories', 'atomic-blocks' ),
				'singular_name' => __( 'Pricing Table Category', 'atomic-blocks' ),
				'menu_name' => __( 'Categories', 'atomic-blocks' ),
				'name_admin_bar' => __( 'Category', 'atomic-blocks' ),
				'search_items' => __( 'Search Categories', 'atomic-blocks' ),
				'popular_items' => __( 'Popular Categories', 'atomic-blocks' ),
				'all_items' => __( 'All Categories', 'atomic-blocks' ),
				'edit_item' => __( 'Edit Category', 'atomic-blocks' ),
				'view_item' => __( 'View Category', 'atomic-blocks' ),
				'update_item' => __( 'Update Category', 'atomic-blocks' ),
				'add_new_item' => __( 'Add New Category', 'atomic-blocks' ),
				'new_item_name' => __( 'New Category Name', 'atomic-blocks' ),
				'parent_item' => __( 'Parent Category', 'atomic-blocks' ),
				'parent_item_colon' => __( 'Parent Category:', 'atomic-blocks' ),
				'separate_items_with_commas' => null,
				'add_or_remove_items' => null,
				'choose_from_most_used' => null,
				'not_found' => null,
			)
		)
	);
}
add_action( 'init', 'atomic_blocks_pricing_tables_tax' );