// Layouts available for each column option

import icons from './icons';

const { __ } = wp.i18n;

const layoutColumns = {
	// 1 column layout
	1 : [
		{
			name: __( '1 Column', 'atomic-blocks' ),
			key: 'one-equal',
			col: 1,
			icon: icons.oneEqual
		},
	],
	// 2 column layouts
	2 : [
		{
			name: __( '2 Columns - 50/50', 'atomic-blocks' ),
			key: 'two-equal',
			col: 2,
			icon: icons.twoEqual
		},
		{
			name: __( '2 Columns - 75/25', 'atomic-blocks' ),
			key: 'two-left',
			col: 2,
			icon: icons.twoLeftWide
		},
		{
			name: __( '2 Columns - 25/75', 'atomic-blocks' ),
			key: 'two-right',
			col: 2,
			icon: icons.twoRightWide
		},
	],
	// 3 column layouts
	3 : [
		{
			name: __( '3 Columns - 33/33/33', 'atomic-blocks' ),
			key: 'three-equal',
			col: 3,
			icon: icons.threeEqual,
		},
		{
			name: __( '3 Columns - 25/50/25', 'atomic-blocks' ),
			key: 'three-widecenter',
			col: 3,
			icon: icons.threeWideCenter,
		},
		{
			name: __( '3 Columns - 50/25/25', 'atomic-blocks' ),
			key: 'three-wideleft',
			col: 3,
			icon: icons.threeWideLeft,
		},
		{
			name: __( '3 Columns - 25/25/50', 'atomic-blocks' ),
			key: 'three-wideright',
			col: 3,
			icon: icons.threeWideRight,
		},
	],
	// 4 column layouts
	4 : [
		{
			name: __( '4 Columns - 25/25/25/25', 'atomic-blocks' ),
			key: 'four-equal',
			col: 4,
			icon: icons.fourEqual,
		},
		{
			name: __( '4 Columns - 25/50/25', 'atomic-blocks' ),
			key: 'four-wideleft',
			col: 4,
			icon: icons.fourLeft,
		},
		{
			name: __( '4 Columns - 50/25/25', 'atomic-blocks' ),
			key: 'four-wideright',
			col: 4,
			icon: icons.fourRight,
		},
	],
	// 5 column layout
	5 : [
		{
			name: __( '5 Columns', 'atomic-blocks' ),
			key: 'five-equal',
			col: 5,
			icon: icons.fiveEqual
		},
	],
	// 6 column layout
	6 : [
		{
			name: __( '6 Columns', 'atomic-blocks' ),
			key: 'six-equal',
			col: 6,
			icon: icons.sixEqual
		},
	],
}

export default layoutColumns
