<?php
/**
 * General tab for the settings page.
 *
 * @package AtomicBlocks\Settings
 */

$atomic_blocks_mailchimp_api_key = get_option( 'atomic_blocks_mailchimp_api_key', '' );
?>
<div class="atomic-blocks-settings-general tab-content">
	<table class="form-table">
		<tbody>
			<tr>
				<th>
					<label for="atomic-blocks-settings[mailchimp-api-key]">
						<?php esc_html_e( 'Mailchimp API Key', 'atomic-blocks' ); ?>
					</label>
				</th>
				<td>
					<input type="text" id="atomic-blocks-settings[mailchimp-api-key]" name="atomic-blocks-settings[mailchimp-api-key]" size="40" value="<?php echo esc_attr( $atomic_blocks_mailchimp_api_key ); ?>" />
					<?php
						$atomic_blocks_mailchimp_api_key_link = sprintf(
							'<p class="atomic-blocks-settings-description"><a href="%1$s" target="_blank" rel="noreferrer noopener">%2$s</a></p>',
							'https://mailchimp.com/help/about-api-keys/',
							esc_html__( 'Find your Mailchimp API key.', 'atomic-blocks' )
						);
						echo wp_kses_post( $atomic_blocks_mailchimp_api_key_link );
						?>
				</td>
			</tr>
		</tbody>
	</table>
</div>
