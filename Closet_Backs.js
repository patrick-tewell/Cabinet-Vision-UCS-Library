//*** Applies to each AS|FS|UB OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET) {
	return;
}

if (_cab.GetParameterValue('ConstID') != _this.Evaluate('AsmConstID(\'Closet - Backs\')')) {
	return;
}

if (_cab.NAME == 'Closet Rod' && _this.NAME == 'UB') {
	_this.QTY = 0;
}

// Remove backs from ROC shelves
if (_cab.NAME == 'ROC') {
	let rocBack = _cab.GetFirstChild().GetFirstChild();
	while (rocBack && rocBack.NAME != 'UB') {
		rocBack = rocBack.GetNextSibling();
	}
	if (rocBack.NAME == 'UB') {
		rocBack.QTY = 0;
	}
}

if (_cab.TYPE == ASM_TYPE_CORNER90) {
	// Corner closet systems
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
	// Standard closet systems
	if (_this.NAME == 'UB') {
		_this.DX += 0.75;
		_this.DY += 4.042;
		_this.X -= 0.375;
		_this.Y -= 3.281;
	}
}
