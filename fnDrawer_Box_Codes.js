function fnDrawer_Box_Codes()
{

// UCS converted to JS 12-03-25 09:18:17
//Modifies Drawer Box Sub Front

//*** Applies to each BF|BBK OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET) {
	return;
}

// Full list of dowel codes. Add to this list.
const dxMap = {
	2.25: 'CV0375',
	3.5:  'CV0500',
	4.75: 'CV0625',
    6:    'CV0750',
    7.25: 'CV0875',
    8.5:  'CV1000',
    9.75: 'CV1125',
    11:   'CV1250'
};

// Original list
/*
const dxMap = {
	2.25: 'CV225',
	3.5: 'CV350',
	4.75: 'CV475',
    6: 'CV600',
    7.25: 'CV725',
    8.5: 'CV850',
    9.75: 'CV975',
    11: 'CV1100'
};
*/


if (dxMap[_this.DX]) {
    _this.COMMENT = dxMap[_this.DX];
}

}