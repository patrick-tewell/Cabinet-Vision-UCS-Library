function fnPOT_Codes()
{

// UCS converted to JS 02-26-26 10:26:10
//Modifies Top

//*** Applies to each ROS|ROBK OBJ_PART ***


// D&D spacing: 0.5" - 2"
var potCode = 'CV0500';



if (_cab.CLASS != ASM_CLASS_CLOSET) {
	return;
}

if (_this.NAME == 'ROS' || _this.NAME == 'ROBK') {
	_this.COMMENT = potCode;
}
}