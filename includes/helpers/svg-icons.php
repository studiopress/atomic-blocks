<?php
/**
 * SVG Icon helper functions
 *
 * @package AtomicBlocks
 */

if ( ! function_exists( 'atomic_blocks_svg' ) ) {
	/**
	 * Output and Get Theme SVG.
	 * Output and get the SVG markup for an icon in the atomic_blocks_SVG_Icons class.
	 *
	 * @param string $svg_name The name of the icon.
	 * @param string $group The group the icon belongs to.
	 * @param string $color Color code.
	 */
	function atomic_blocks_svg( $svg_name, $group = 'ui', $color = '' ) {
		echo atomic_blocks_get_svg( $svg_name, $group, $color ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped in atomic_blocks_get_svg();.
	}
}

if ( ! function_exists( 'atomic_blocks_get_svg' ) ) {

	/**
	 * Get information about the SVG icon.
	 *
	 * @param string $svg_name The name of the icon.
	 * @param string $group The group the icon belongs to.
	 * @param string $color Color code.
	 */
	function atomic_blocks_get_svg( $svg_name, $group = 'ui', $color = '' ) {

		// Make sure that only our allowed tags and attributes are included.
		$svg = wp_kses(
			AtomicBlocks_SVG_Icons::get_svg( $svg_name, $group, $color ),
			array(
				'svg'     => array(
					'class'       => true,
					'xmlns'       => true,
					'width'       => true,
					'height'      => true,
					'viewbox'     => true,
					'aria-hidden' => true,
					'role'        => true,
					'focusable'   => true,
				),
				'path'    => array(
					'fill'      => true,
					'fill-rule' => true,
					'd'         => true,
					'transform' => true,
				),
				'polygon' => array(
					'fill'      => true,
					'fill-rule' => true,
					'points'    => true,
					'transform' => true,
					'focusable' => true,
				),
			)
		);

		if ( ! $svg ) {
			return false;
		}
		return $svg;
	}
}
