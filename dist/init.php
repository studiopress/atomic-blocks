<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package Atomic Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue assets for frontend and backend
 *
 * @since 1.0.0
 */
function atomic_blocks_block_assets() {
	
	// Load the compiled styles
	wp_enqueue_style(
		'atomic-blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.style.build.css' )
	);

	// Load the FontAwesome icon library
	wp_enqueue_style(
		'atomic-blocks-fontawesome',
		plugins_url( 'dist/assets/fontawesome/css/all.css', dirname( __FILE__ ) ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/fontawesome/css/all.css' )
	);
} 
add_action( 'enqueue_block_assets', 'atomic_blocks_block_assets' );


/**
 * Enqueue assets for backend editor
 *
 * @since 1.0.0
 */
function atomic_blocks_editor_assets() {

	// Load the compiled blocks into the editor
	wp_enqueue_script(
		'atomic-blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.build.js' )
	);

	// Load the compiled styles into the editor
	wp_enqueue_style(
		'atomic-blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), 
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'blocks.editor.build.css' )
	);

	// Pass in REST URL
	wp_localize_script(
		'atomic-blocks-block-js',
		'atomic_globals',
		array( 
			'rest_url' => esc_url( rest_url() )
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'atomic_blocks_editor_assets' );


/**
 * Enqueue assets for frontend
 *
 * @since 1.0.0
 */
function atomic_blocks_frontend_assets() {
	// Load the dismissable notice js
	wp_enqueue_script(
		'atomic-blocks-dismiss-js',
		plugins_url( '/dist/assets/js/dismiss.js', dirname( __FILE__ ) ),
		array( 'jquery' ),
		filemtime( plugin_dir_path( __FILE__ ) . '/assets/js/dismiss.js' )
	);
}
add_action( 'wp_enqueue_scripts', 'atomic_blocks_frontend_assets' );


// Add custom block category
add_filter( 'block_categories', function( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'atomic-blocks',
				'title' => __( 'Atomic Blocks', 'atomic-blocks' ),
			),
		)
	);
}, 10, 2 );


// Add template to testimonial post type
function atomic_blocks_testimonial_templates( $args, $post_type ) {

	if ( 'atomic-testimonial' == $post_type ) {
		// Lock the template
		$args['template_lock'] = true;
		
		// Setup the template
		$args['template'] = array(
            array(
                'atomic/atomic-testimonial'
            )
        );
	}
	return $args;
}
//add_filter( 'register_post_type_args', 'atomic_blocks_testimonial_templates', 20, 2 );


// Render the testimonial posts for the frontend
function atomic_blocks_testimonial_list_render( $attributes ) {

    $posts = (array) wp_get_recent_posts( array(
        'numberposts' => 5,
        'post_status' => 'publish',
    ) );

    if ( count( $posts ) === 0 ) {
        return __( 'No posts', 'atomic-blocks' );
    }

    $markup = '<ul>';
    foreach( $posts as $post ) {

	$markup .= sprintf(
		'<li><a class="atomic-blocks-latest-post" href="%1$s">%2$s</a></li>',
		esc_url( get_permalink( $post['ID'] ) ),
		esc_html( get_the_title( $post['ID'] ) )
	);

    }

    return $markup;
}


// Hook the post rendering to the block
if ( function_exists( 'register_block_type' ) ) :
	// Hook a render function to the testimonial block
	register_block_type( 'atomic/atomic-testimonial-list', array(
		'render_callback' => 'atomic_blocks_testimonial_list_render',
	) );
endif;