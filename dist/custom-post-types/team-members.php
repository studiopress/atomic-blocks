<?php
/**
 * Register the Team Members custom post type
 */

/* Exit if accessed directly */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* Register the Team Members CPT */
function atomic_blocks_team_register() {

	register_post_type(
		'atomic-team',
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
			'menu_icon' => 'dashicons-groups',
			'can_export' => true,
			'delete_with_user' => false,
			'hierarchical' => false,
			'has_archive' => 'team-members',
			'query_var' => 'team',
			'show_in_rest' => true,
			'rest_base' => 'team-members',
			'rest_controller_class' => 'WP_REST_Posts_Controller',

			// The rewrite handles the URL structure
			'rewrite' => array(
				'slug' => 'team-members',
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
				'name' => __( 'Team Members', 'atomic-blocks' ),
				'singular_name' => __( 'Team Member', 'atomic-blocks' ),
				'menu_name' => __( 'Team Members', 'atomic-blocks' ),
				'name_admin_bar' => __( 'Team Members', 'atomic-blocks' ),
				'add_new' => __( 'Add New', 'atomic-blocks' ),
				'add_new_item' => __( 'Add New Team Member', 'atomic-blocks' ),
				'edit_item' => __( 'Edit Team Member', 'atomic-blocks' ),
				'new_item' => __( 'New Team Member', 'atomic-blocks' ),
				'view_item' => __( 'View Team Member', 'atomic-blocks' ),
				'search_items' => __( 'Search Team Members', 'atomic-blocks' ),
				'not_found' => __( 'No team members found', 'atomic-blocks' ),
				'not_found_in_trash' => __( 'No team members found in trash', 'atomic-blocks' ),
				'all_items' => __( 'Team Members', 'atomic-blocks' ),
			)
		)
	);
}
add_action( 'init', 'atomic_blocks_team_register' );


/* Register the Team Members Category taxonomy */
function atomic_blocks_team_tax() {
	register_taxonomy(
		'team_category',
		array( 'team-member' ),
		array(
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud' => true,
			'show_admin_column' => true,
			'hierarchical' => true,
			'query_var' => 'team_category',

			// The rewrite handles the URL structure
			'rewrite' => array(
				'slug' => 'team/category',
				'with_front' => false,
				'hierarchical' => true,
				'ep_mask' => EP_NONE
			),

			// Labels used when displaying taxonomy and terms
			'labels' => array(
				'name' => __( 'Team Member Categories', 'atomic-blocks' ),
				'singular_name' => __( 'Team Member Category', 'atomic-blocks' ),
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
add_action( 'init', 'atomic_blocks_team_tax' );