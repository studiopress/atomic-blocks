/**
 * WordPress dependencies
 */
import {
	createNewPost,
	insertBlock,
	saveDraft,
} from '@wordpress/e2e-test-utils';

describe( 'Add Blocks', () => {
	it( 'inserts blocks with the inserter', async () => {
		await createNewPost();

		await insertBlock( 'Accordion' );
		await insertBlock( 'Advanced Columns' );
		await insertBlock( 'Button' );
		await insertBlock( 'Container' );
		await insertBlock( 'Call To Action' );
		await insertBlock( 'Drop Cap' );
		await insertBlock( 'Email newsletter' );
		await insertBlock( 'Notice' );
		await insertBlock( 'Post and Page Grid' );
		await insertBlock( 'Pricing' );
		await insertBlock( 'Profile Box' );
		await insertBlock( 'Sharing' );
		await insertBlock( 'Spacer' );
		await insertBlock( 'Testimonial' );
		await insertBlock( 'Layouts' );
	} );

	it( 'saves the entered value in the Call To Action block', async () => {
		await createNewPost();

		await insertBlock( 'Call To Action' );
		await page.focus( '.block-editor-block-list__block [role="textbox"]' );
		const ctaTitle = 'This is an example CTA title';
		await page.keyboard.type( ctaTitle );
		await saveDraft();
		await page.reload();

		// The CTA title should have been saved, and should still appear after a reload.
		await expect( page ).toMatch( ctaTitle );
	} );
} );
