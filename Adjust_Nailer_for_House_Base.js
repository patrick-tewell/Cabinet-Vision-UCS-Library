//*** Applies to each NA OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.GetParameterValue('ConstID') != _this.Evaluate('AsmConstID(\'Closet - Backs\')')) return;

if (_cab.Y > 10) return;

let hasDeck = false;
let deck = _cab.GetFirstChild().GetFirstChild(); 

while (deck) {
	if (deck.NAME == 'DE' && deck.QTY != 0) {
		hasDeck = true;
		break; 
	}
	deck = deck.GetNextSibling();
}

if (_cab.Evaluate('BBWidth') > 0) {
	_this.QTY = 0;	
}
else { 
	const bbHeight = _cab.Evaluate('BBHeight');
	
	let targetTop = 7.28125;
	if (bbHeight > 6.75) {
		targetTop = bbHeight + 0.53125;
	}
	
	_this.SetParameter('Y', targetTop);

	if (hasDeck) {
		_this.SetParameter('DX', targetTop - 3.28125);
	}
	else {
		_this.SetParameter('DX', targetTop);
	}
}
