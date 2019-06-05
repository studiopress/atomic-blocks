<?php
namespace lsx\blocks\classes;
/**
 * @package   lsx\blocks\classes
 * @author    LightSpeed
 * @license   GPL-3.0+
 * @link
 * @copyright 2019 LightSpeed
 */

/**
 * Setup plugin class.
 *
 * @package lsx\blocks\classes
 * @author  LightSpeed
 */
class Frontend {

	/**
	 * Holds class instance
	 *
	 * @since 1.0.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/**
	 * Initialize the plugin by setting localization, filters, and administration functions.
	 *
	 * @since 1.0.0
	 *
	 * @access private
	 */
	private function __construct() {
		add_action( 'body_class', array( $this, 'banner_class' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
		add_filter( 'lsx_page_banner_disable', array( $this, 'disable_lsx_page_title' ) );
		add_filter( 'lsx_global_header_disable', array( $this, 'disable_lsx_page_title' ) );
		add_filter( 'the_content', array( $this, 'mobile_srcset_tag' ), 10, 1 );
		add_filter( 'wp_get_attachment_image_attributes', array( $this, 'wp_get_attachment_image_attributes' ), 10, 3 );
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0.0
	 *
	 * @return    object \lsx\blocks\classes\Frontend();    A single instance of this class.
	 */
	public static function get_instance() {
		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	/**
	 * Add the class 'has-block-banner' if the banner block is the first thing on the page.
	 */
	public function banner_class( $classes ) {
		$post = get_post();
		if ( function_exists( 'has_blocks' ) && has_blocks( $post->post_content ) ) {
			$blocks = parse_blocks( $post->post_content );

			if ( 'lsx-blocks/lsx-banner-box' === $blocks[0]['blockName'] ) {
				$classes[] = 'has-block-banner';
			}
		}
		return $classes;
	}

	/**
	 * Enques the frontend scripts
	 */
	public function scripts() {
		if ( function_exists( 'has_blocks' ) && has_blocks() ) {
			wp_enqueue_script( 'lsx_blocks_script', LSX_BLOCKS_URL . '/dist/assets/js/frontend.js', array( 'jquery', 'slick' ), LSX_BLOCKS_VER, true );
		}
	}

	/**
	 * Disables the page title banner for LSX
	 * @param $disable boolean
	 *
	 * @return boolean
	 */
	public function disable_lsx_page_title( $disable ) {
		$disable_title = get_post_meta( get_the_ID(), 'lsx_disable_title', true );
		if ( 'yes' === $disable_title ) {
			$disable = true;
		}
		return $disable;
	}

	/**
	 * Overwrites the mobile content and adds in the src tag
	 * @param $content
	 *
	 * @return mixed
	 */
	public function mobile_srcset_tag( $content ) {
		if ( function_exists( 'has_blocks' ) && has_blocks() ) {

			if ( has_block( 'lsx-blocks/lsx-container' ) ) {

				$image_matches = array();
				preg_match_all( '/<div class="lsx-container-image-wrap">(.*?)<\/div>/s', $content, $image_matches );

				if ( ! empty( $image_matches ) && ! empty( $image_matches[1] ) ) {

					foreach ( $image_matches[1] as $image_match ) {
						if ( strpos( $image_match, 'srcset' ) === false ) {
							//Get the iamge URL
							$current_image_url = false;
							$image_urls = array();
							preg_match_all( '@src="([^"]+)"@', $image_match, $image_urls );

							if ( ! empty( $image_urls ) && isset( $image_urls[1] ) && ! empty( $image_urls[1] ) && isset( $image_urls[1][0] ) ) {
								$current_image_url = $image_urls[1][0];
							}

							if ( false !== $current_image_url ) {

								//replace the extension with the mobile size.
								$mobile_image = $current_image_url;
								$mobile_image = str_replace( '.jpg', '-350x350.jpg', $mobile_image );
								$mobile_image = str_replace( '.png', '-350x350.png', $mobile_image );
								$mobile_image = str_replace( '.jpeg', '-350x350.jpeg', $mobile_image );

								$srcset_html = ' srcset="' . $mobile_image . ' 400w,' . $current_image_url . ' 1024w" sizes="(max-width: 400px) 50vw, 100vw" ';

								$new_image_html = str_replace( '<img', '<img ' . $srcset_html, $image_match );
								$content = str_replace( $image_match, $new_image_html, $content );
							}
						}
					}
				}
			}
			if ( has_block( 'lsx-blocks/lsx-post-carousel' ) ) {

				$div_matches = array();
				preg_match_all( '/<div class="lsx-block-post-grid-image">(.*?)<\/div>/s', $content, $div_matches );

				if ( ! empty( $div_matches ) && ! empty( $div_matches[1] ) ) {

					foreach ( $div_matches[1] as $image_match ) {
						if ( strpos( $image_match, 'srcset' ) === false ) {

							//Get the iamge URL
							$current_image_url = false;
							$image_urls = array();
							preg_match_all( '@src="([^"]+)"@', $image_match, $image_urls );

							if ( ! empty( $image_urls ) && isset( $image_urls[1] ) && ! empty( $image_urls[1] ) && isset( $image_urls[1][0] ) ) {
								$current_image_url = $image_urls[1][0];
							}

							if ( false !== $current_image_url ) {

								//replace the extension with the mobile size.
								$mobile_image = $current_image_url;
								$mobile_image = str_replace( '-600x400.jpg', '-350x230.jpg', $mobile_image );
								$mobile_image = str_replace( '-600x400.png', '-350x230.png', $mobile_image );
								$mobile_image = str_replace( '-600x400.jpeg', '-350x230.jpeg', $mobile_image );

								$srcset_html = ' srcset="' . $mobile_image . ' 400w,' . $current_image_url . ' 1024w" sizes="(max-width: 400px) 50vw, 10vw" ';

								$new_image_html = str_replace( '<img', '<img ' . $srcset_html, $image_match );
								$content = str_replace( $image_match, $new_image_html, $content );
							}
						}
					}
				} //die();
			}

			if ( has_block( 'lsx-blocks/lsx-banner-box' ) ) {
				$div_matches = array();
				preg_match_all( '/<source (.*?)>/s', $content, $div_matches );
				if ( ! empty( $div_matches ) && ! empty( $div_matches[1] ) ) {
					foreach ( $div_matches[1] as $counter => $image_match ) {
						//Get the iamge URL
						$current_image_url = false;
						$image_urls = array();
						preg_match_all( '@data-srcset="([^"]+)"@', $image_match, $image_urls );
						if ( ! empty( $image_urls ) && isset( $image_urls[1] ) && ! empty( $image_urls[1] ) && isset( $image_urls[1][0] ) ) {
							$current_image_url = $image_urls[1][0];
						}
						if ( false !== $current_image_url ) {
							$mobile_image = $current_image_url;

							$new_image_match = str_replace( $current_image_url, $mobile_image, $image_match );
							if ( strpos( $mobile_image, 'resize=768' ) !== false ) {
								$new_image_match = str_replace( 'media="(min-width: 30rem)"', 'media="(max-width: 400px)"', $new_image_match );
							}

							$content = str_replace( $image_match, $new_image_match, $content );
						}
					}
				}
			}
		}
		return $content;
	}

	/**
	 * Add custom image sizes attribute to enhance responsive image functionality
	 * for post thumbnails
	 *
	 * @since Twenty Sixteen 1.0
	 *
	 * @param array $attr Attributes for the image markup.
	 * @param int   $attachment Image attachment ID.
	 * @param array $size Registered image size or flat array of height and width dimensions.
	 * @return array The filtered attributes for the image markup.
	 */
	function wp_get_attachment_image_attributes( $attr, $attachment, $size ) {
		if ( 'lsx-block-post-grid-landscape' === $size ) {
			$attr['sizes'] = '(max-width: 400px) 50vw, 10vw';
		}
		return $attr;
	}
}
