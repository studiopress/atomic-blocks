<?php
/**
 * Register the Testimonial custom post type
 */

/* Exit if accessed directly */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* Register the Testimonial CPT */
function atomic_testimonials_register() {

	register_post_type(
		'atomic-testimonial',
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
			'menu_icon' => 'dashicons-testimonial',
			'can_export' => true,
			'delete_with_user' => false,
			'hierarchical' => false,
			'has_archive' => 'testimonials',
			'query_var' => 'testimonial',
			'show_in_rest' => true,
			'rest_base' => 'testimonial',
			'rest_controller_class' => 'WP_REST_Posts_Controller',

			// The rewrite handles the URL structure
			'rewrite' => array(
				'slug' => 'testimonials',
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
				'name' => __( 'Testimonials',                   'array-toolkit' ),
				'singular_name' => __( 'Testimonial',                    'array-toolkit' ),
				'menu_name' => __( 'Testimonials',                   'array-toolkit' ),
				'name_admin_bar' => __( 'Testimonial',                    'array-toolkit' ),
				'add_new' => __( 'Add New',                        'array-toolkit' ),
				'add_new_item' => __( 'Add New Testimonial',            'array-toolkit' ),
				'edit_item' => __( 'Edit Testimonial',               'array-toolkit' ),
				'new_item' => __( 'New Testimonial',                'array-toolkit' ),
				'view_item' => __( 'View Testimonial',               'array-toolkit' ),
				'search_items' => __( 'Search Testimonials',            'array-toolkit' ),
				'not_found' => __( 'No testimonials found',          'array-toolkit' ),
				'not_found_in_trash' => __( 'No testimonials found in trash', 'array-toolkit' ),
				'all_items' => __( 'Testimonials',                   'array-toolkit' ),
			)
		)
	);
}
add_action( 'init', 'atomic_testimonials_register' );


/* Register the Testimonial Category taxonomy */
function atomic_testimonials_register_taxonomies() {
	register_taxonomy(
		'testimonial_category',
		array( 'testimonial' ),
		array(
			'public' => true,
			'show_ui' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud' => true,
			'show_admin_column' => true,
			'hierarchical' => true,
			'query_var' => 'testimonial_category',

			// The rewrite handles the URL structure.
			'rewrite' => array(
				'slug' => 'testimonials/category',
				'with_front' => false,
				'hierarchical' => true,
				'ep_mask' => EP_NONE
			),

			// Labels used when displaying taxonomy and terms.
			'labels' => array(
				'name' => __( 'Testimonial Categories', 'example-textdomain' ),
				'singular_name' => __( 'Testimonial Category',   'example-textdomain' ),
				'menu_name' => __( 'Categories',             'example-textdomain' ),
				'name_admin_bar' => __( 'Category',               'example-textdomain' ),
				'search_items' => __( 'Search Categories',      'example-textdomain' ),
				'popular_items' => __( 'Popular Categories',     'example-textdomain' ),
				'all_items' => __( 'All Categories',         'example-textdomain' ),
				'edit_item' => __( 'Edit Category',          'example-textdomain' ),
				'view_item' => __( 'View Category',          'example-textdomain' ),
				'update_item' => __( 'Update Category',        'example-textdomain' ),
				'add_new_item' => __( 'Add New Category',       'example-textdomain' ),
				'new_item_name' => __( 'New Category Name',      'example-textdomain' ),
				'parent_item' => __( 'Parent Category',        'example-textdomain' ),
				'parent_item_colon' => __( 'Parent Category:',       'example-textdomain' ),
				'separate_items_with_commas' => null,
				'add_or_remove_items' => null,
				'choose_from_most_used' => null,
				'not_found' => null,
			)
		)
	);
}
add_action( 'init', 'atomic_testimonials_register_taxonomies' );