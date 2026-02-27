function fnCloset_Backs()
{

// Adjust backs and related parts

//*** Applies to each AS|FS|UB OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET) {
	return;
}

if (_cab.NAME == 'Closet Rod' && _this.NAME == 'UB') {
	_this.QTY = 0;
}

if (_cab.GetParameterValue('ConstID') != _this.Evaluate('AsmConstID(\'Closet - Backs\')')) {
	return;
}

// Remove backs from ROC shelves
if (_cab.NAME == 'ROC') {
	var rocBack = _cab.GetFirstChild().GetFirstChild();
	while (rocBack && rocBack.NAME != 'UB') {
		rocBack = rocBack.GetNextSibling();
	}
	if (rocBack.NAME == 'UB') {
		rocBack.QTY = 0;
	}
}

// Get material thickness of backs for use later
if (_this.NAME == 'UB') {
	var backOffset = _this.DZ;
}
var rafixOffset = 1.4567 + (backOffset * 2);

if (_cab.TYPE == ASM_TYPE_CORNER90) {
	// Handles corner closet systems
	if (_this.NAME == 'UB') {
		if (_this.AY == 0) {  // Right back
			_this.DX += 0.75;
			_this.DY += 4.042;
			_this.X -= 0.375;
			_this.Y -= 3.281;
		}
		else {                // Left Back
			_this.DX += 0.75;
			_this.DY += 4.042;
			_this.Z += 0.375;
			_this.Y -= 3.281;
		}
	}
	
	if (_this.NAME == 'FS') {
		return;
	}	
}
else {
	// Handles standard closet systems
	if (_this.NAME == 'UB') {
		_this.DX += 0.75;
		_this.DY += 4.042;
		_this.X -= 0.375;
		_this.Y -= 3.281;
	}
	// --------------------------------------------------------------------------------------------------
	// No longer needed with earlier logic check. Keeping just in case we have issues and need to revert
	// --------------------------------------------------------------------------------------------------
	// Compensation for 3/4" backs
	/*
	if (_this.NAME == 'UB' && backOffset >= 0.75) {
		_this.Z -= 0.5;
	}
	if (_this.NAME == 'AS' && backOffset >= 0.75) {
		_this.DZ += 0.5;
	}
	*/
	
	
	/*if (_this.NAME == 'AS' || _this.NAME == 'FS') {
		_this.DX += backOffset;
		_this.Z -= backOffset;
		//_this.DX += _cab.GetParameterValue('case.ub.dz');
	}
	
	if (_this.NAME == 'FS') {
		_this.SetParameter('RafixRSB', rafixOffset); //_this.GetParameterValue('RafixRSB') + backOffset
	}
	*/
	// --------------------------------------------------------------------------------------------------
}
}