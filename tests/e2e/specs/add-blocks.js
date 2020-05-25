/**
 * WordPress dependencies
 */
import {
	createNewPost,
	openGlobalBlockInserter,
	pressKeyWithModifier,
	saveDraft,
} from '@wordpress/e2e-test-utils';

/**
 * Inserts a block from the block inserter, mainly copied from Gutenberg.
 *
 * @see https://github.com/WordPress/gutenberg/blob/56f912adc681ebd3a6fb6a17eb4cfcb2c0050f5b/packages/e2e-test-utils/src/insert-block.js
 *
 * @param {string} blockName The block name to insert.
 */
const insertBlock = async ( blockName ) => {
	await openGlobalBlockInserter();
	await page.waitForSelector( '.block-editor-inserter__menu' );
	await page.focus( '[placeholder="Search for a block"]' );
	await pressKeyWithModifier( 'primary', 'a' );
	await page.keyboard.type( blockName );
	const insertButton = (
		await page.$x( `//button//span[contains(text(), '${ blockName }')]` )
	)[ 0 ];
	await insertButton.click();

	const editorSelector = '.edit-post-layout';
	await page.waitForSelector( editorSelector );
	await page.click( editorSelector )
};

describe( 'Blocks', () => {
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

		const ctaTitle = 'This is an example CTA title';
		await insertBlock( 'Call To Action' );
		await page.focus( '.block-editor-block-list__block [role="textbox"]' );
		await page.keyboard.type( ctaTitle );
		await saveDraft();
		await page.reload();

		// The CTA title should have been saved, and should still appear after a reload.
		await expect( page ).toMatch( ctaTitle );
	} );
} );
