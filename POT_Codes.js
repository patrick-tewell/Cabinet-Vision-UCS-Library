//*** Applies to each ROS|ROBK OBJ_PART ***

// potCode is a public variable found in the editor

if (_cab.CLASS != ASM_CLASS_CLOSET) {
	return;
}

if (_this.NAME == 'ROS' || _this.NAME == 'ROBK') {
	_this.COMMENT = potCode;
}
