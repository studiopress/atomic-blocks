<?php
/**
 * General tab for the settings page.
 *
 * @package AtomicBlocks\Settings
 */

$atomic_blocks_mailchimp_api_key = get_option( 'atomic_blocks_mailchimp_api_key', '' );
?>
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
					$mailchimp_link = sprintf(
						'<p><a href="%1$s" target="_blank">%2$s</a></p>',
						esc_url( 'https://mailchimp.com/help/about-api-keys/' ),
						__( 'Find your Mailchimp API key.', 'atomic-blocks' )
					);
					echo $mailchimp_link;
				?>
			</td>
		</tr>
	</tbody>
</table>
