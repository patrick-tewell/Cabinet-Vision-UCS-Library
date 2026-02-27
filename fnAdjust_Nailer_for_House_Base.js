function fnAdjust_Nailer_for_House_Base()
{

// Remove or Expand/Move Nailer
// Deletes Nailer

//*** Applies to each NA OBJ_PART ***

// ========== Guard Clauses ==========
if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.GetParameterValue('ConstID') != _this.Evaluate('AsmConstID(\'Closet - Backs\')')) {
	return;
}

if (_cab.Y > 10) {
	return;
}


var hasDeck = false;
var p = _cab.GetFirstChild().GetFirstChild(); 

while (p) {
	if (p.NAME == 'DE' && p.QTY != 0) {
		hasDeck = true;
		break; 
	}
	p = p.GetNextSibling();
}

// Handle Nailer logic
if (_cab.Evaluate('BBWidth') > 0) {
	_this.QTY = 0;	
}
else { 
	var bbHeight = _cab.Evaluate('BBHeight');
	
	// Determine the Top Position
	var targetTop = 7.28125;
	if (bbHeight > 6.75) {
		targetTop = bbHeight + 0.53125;
	}
	
	_this.SetParameter('Y', targetTop);

	// Determine the Length
	if (hasDeck) {
		_this.SetParameter('DX', targetTop - 3.28125);
	}
	else {
		// stretch nailer to reach floor when no deck
		_this.SetParameter('DX', targetTop);
	}
}















/*
//*** Applies to each NA OBJ_PART ***

// Filter closet systems
if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.GetParameterValue('ConstID') != _this.Evaluate('AsmConstID(\'Closet - Backs\')')) {
	return;
}

// Filter flour-mount systems
if (_cab.Y > 10) {
	return;
}

// Delete nailer if house base exists
if (_cab.Evaluate('BBWidth') > 0) {
	_this.QTY = 0;	
}
else { // BBWidth == 0
	if (_cab.Evaluate('BBHeight') < 6.75) {
		_this.SetParameter('Y', 7.28125);
	}
	else { // BBHeight > 6.75
		_this.SetParameter('DX', _cab.Evaluate('BBHeight') - 3.281);
		_this.SetParameter('Y', _cab.Evaluate('BBHeight') + 0.53125);
	}
}
*/

}