function fnCorner_CTF()
{

// UCS converted to JS 11-19-25 12:31:27
//Modifies corner system parts for cut-to-fit

//*** Applies to each NA|TO|BO|DE|FS|SH|AS|UB|FB|FT|BT|S_HDWCON OBJ_PART ***

// Corner-only CTF handler
if (_this.Evaluate('Catalog_Save_Mode')) {
	return;
}

// Escape if non-corner system
if (!(_cab.NAME == 'Corner System Left' || _cab.NAME == 'Corner System Right')) {
	return;
}

// Skip panel types that should not get CTF changes
if (_this.Evaluate(':Name') == 'PT' || _this.Evaluate(':Name') == 'S_DIV') {
	return;
}

// Default CTFvalue
//_this.SetParameter('CTFvalue', 4);
var ctfVal = _this.Evaluate('CTFvalue');

// Create/remove CTF comments on the system
if (_this.Evaluate('CTF') != 0) {
	if (_this.Evaluate('CTF') < 0) {
		_cab.COMMENT = 'CTF-L';
	} else {
		_cab.COMMENT = 'CTF-R';
	}
} else if (_this.Evaluate('CTF') == 0 && (_cab.COMMENT == 'CTF-L' || _cab.COMMENT == 'CTF-R')) {
	_cab.COMMENT = '';
}

// Apply CTF to top, deck, fixed shelf, and adj. shelf
if (_this.NAME == 'TO' || _this.NAME == 'DE' || _this.NAME == 'FS' || _this.NAME == 'AS') {
	// CTF extension - LEFT
	if (_this.Evaluate('CTF') == -1) {
		if (_this.NAME != 'DE') {
			_this.SetParameter('_EDGREXT', ctfVal);
		} else {
			_this.SetParameter('_EDGLEXT', ctfVal);
		}
	}
	// CTF extension - RIGHT
	if (_this.Evaluate('CTF') == 1) {
		if (_this.NAME != 'UB' && _this.NAME != 'FB' && _this.NAME != 'FILLER') {
			_this.SetParameter('_EDGTEXT', ctfVal);
		} else {
			if (_this.AZ < 0 && _this.AZ > -180) {
				_this.SetParameter('_EDGTEXT', ctfVal);
			} else {
				_this.SetParameter('_EDGREXT', ctfVal);
			}
		}
	}
}

// Apply CTF to Nailer
if (_this.NAME == 'NA') {
	if (_this.Evaluate('CTF') == -1 && _this.Z == _cab.DZ) { // LEFT
		_this.SetParameter('_EDGBEXT', ctfVal);
	} else if (_this.Evaluate('CTF') == 1 && _this.AX == 0) { // RIGHT
		_this.SetParameter('_EDGBEXT', ctfVal);
	}
}

// Remove hardware on CTF parts
if (_this.NAME == 'S_HDWCON') {
	var parentName = _this.GetParent().NAME;
	var hwCTF = _cab.Evaluate('CTF');
	
	// Top - Deck - Fixed Shelf
	if (parentName == 'TO' || parentName == 'DE' || parentName == 'FS') {
		// Remove hardware on CTF parts - LEFT
		if (hwCTF == -1) {
    		if (_this._EDGWP == 2 && parentName != 'DE') {
        		_this.QTY = 0;
    		} else if ((_this._EDGWP == 9 || _this._EDGWP == 4) && parentName == 'DE') {
    			_this.QTY = 0;
    		}
		// Remove hardware on CTF parts - RIGHT
		} else if (hwCTF == 1) {
    		if (_this._EDGWP == 5 || _this._EDGWP == 6) {
        		_this.QTY = 0;
    		}
		}		
	}
}

// Remove hardware and apply CTF to Toe Kick
if (_this.NAME == 'FT') {
	if (_this.Evaluate('CTF') == -1 && _this.Z == _cab.DZ) { // Left TK
		_this.GetFirstChild().QTY = 0; // First child is always the left rafix on left tk
		_this.SetParameter('_EDGBEXT', ctfVal);
	} else if (_this.Evaluate('CTF') == 1 && _this.Z != _cab.DZ) { // Right TK
		_this.GetFirstChild().GetNextSibling().QTY = 0; // First child is always the right rafix on right tk so we get sibling
		_this.SetParameter('_EDGTEXT', ctfVal);
	}
}

}