function fnCut_To_Fit_to_Parts()
{

/***Do not modify script below***/

// public variables
const CTFvalue = 4;

/***Do not modify script above***/

// UCS converted to JS 02-25-26 09:54:40
//Modifies 1in WIDE SOLID

//*** Applies to each FILLER|NA|TO|BO|DE|FS|SH|AS|UB|FB|FT|BT|_HRROD|S_CLOSETROD|S_HDWCON|S_SSLF|S_SLFLIP OBJ_PART ***


// ==========  CHANGES MADE FOR CBD  -PATRICK   ===========
// 09/14/25 - Added NA to main condition to include base trim
// 09/17/25 - Added check for LH/RH Bridge cabinets to make them 18" total
// 09/24/25 - Closet rods not being modified by default UCS - Added this logic
// 09/25/25 - Added comment to CTF assemblies
// 10/14/25 - Include fillers in CTF
// 10/21/25 - Added guard clause for corner cabinets
// 10/30/25 - Updated CTF Comment for left, right, and none(reset)

if (_this.Evaluate('Catalog_Save_Mode')) {
	return;
}//  (  Catalog_Save_Mode  )  -- Line: 6

if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.CLASS != ASM_CLASS_CLOSETBASE && _cab.CLASS != ASM_CLASS_CLOSETUPPER && _cab.TYPE != ASM_TYPE_FILLER) {
	return;
}//  (  Cab.Class != ASM_CLASS_CLOSET and Cab.Class != ASM_CLASS_CLOSETBASE and Cab.Class != ASM_CLASS_CLOSETUPPER  )  -- Line: 9

if (_this.Evaluate(':Name') == 'PT' || _this.Evaluate(':Name') == 'S_DIV') {
	return;
}//  (  :Name = 'PT' or :Name = 'S_DIV'  )  -- Line: 12

// Seperate UCS for corner systems
if (_cab.NAME == 'Corner System Left' || _cab.NAME == 'Corner System Right') {
	return;
}

// Public valueCTF = 4
_this.SetParameter('CTFvalue', CTFvalue);//Add to Length

// Sets bridge shelves to 18" per CBD standard (rather than 16")
if (_cab.NAME == 'LH Bridge' || _cab.NAME == 'RH Bridge') {
	_this.SetParameter('CTFvalue', 6);
}

// Forces CTF value onto closet rods
if (_this.Evaluate('CTF') != 0 && _this.NAME == '_HRROD') {
	_this.DZ += CTFvalue;
}

// Create/remove CTF comments
if (_this.Evaluate('CTF') != 0) {
	if (_this.Evaluate('CTF') < 0) {
		_cab.COMMENT = 'CTF-L';
	}
	else {
		_cab.COMMENT = 'CTF-R';
	}
}
else if (_this.Evaluate('CTF') == 0 && (_cab.COMMENT == 'CTF-L' || _cab.COMMENT == 'CTF-R')) {  
	_cab.COMMENT = '';
}

// Unique value for fillers to make them 3.125" total
if (_cab.TYPE == ASM_TYPE_FILLER) {
	_this.SetParameter('CTFvalue', 3.125 - _this.Evaluate('DX'));
}

//Apply for cut to fit parts ============================================================================
if (_this.Evaluate('_SHPEDGCNT') < 5 && _this.NAME != 'S_HDWCON' && _this.NAME != '_HRROD' && _this.NAME != 'S_CLOSETROD') {
//----------------------------------------------
	if (_this.Evaluate('CTF') ==  - 1) {//left
		if (_this.NAME != 'UB' && _this.NAME != 'FB' && _this.NAME != 'FILLER') {
			_this.SetParameter('_EDGBEXT', _this.Evaluate('CTFvalue'));
		}
		else {// Not (  Name != 'UB' and Name != 'FB'  )  -- Line 22
			if (_this.AZ < 0 && _this.AZ >  - 180) {//Horizontal Grain
				_this.SetParameter('_EDGBEXT', _this.Evaluate('CTFvalue'));
			}
			else {// Not (  AZ < 0 & AZ > -180  )  -- Line 25
				_this.SetParameter('_EDGLEXT', _this.Evaluate('CTFvalue'));
			}//  (  AZ < 0 & AZ > -180  )  -- Line: 25
		}//  (  Name != 'UB' and Name != 'FB'  )  -- Line: 22
	}//  (  CTF = -1  )  -- Line: 21
//----------------------------------------------
	if (_this.Evaluate('CTF') == 1) {//Right
		if (_this.NAME != 'UB' && _this.NAME != 'FB' && _this.NAME != 'FILLER') {
			_this.SetParameter('_EDGTEXT', _this.Evaluate('CTFvalue'));
		}
		else {// Not (  Name != 'UB' and Name != 'FB'  )  -- Line 34
			if (_this.AZ < 0 && _this.AZ >  - 180) {//Horizontal Grain
				_this.SetParameter('_EDGTEXT', _this.Evaluate('CTFvalue'));
			}
			else {// Not (  AZ < 0 & AZ > -180  )  -- Line 37
				_this.SetParameter('_EDGREXT', _this.Evaluate('CTFvalue'));
			}//  (  AZ < 0 & AZ > -180  )  -- Line: 37
		}//  (  Name != 'UB' and Name != 'FB'  )  -- Line: 34
	}//  (  CTF = 1  )  -- Line: 33
//----------------------------------------------
}//  (  _SHPEDGCNT < 5 & Name != 'S_HDWCON'  )  -- Line: 19
//Remove Boring for cut to fit parts ===================================================================
if (_this.Evaluate('_SHPEDGCNT') < 5) {
	//remove left operations ===========================================================================
	if (_this.Evaluate('CTF') ==  - 1) {
		if (_this.NAME == 'S_HDWCON' && _this._EDGWP == 1) {
			_this.SetParameter('REMOVE', 2, VAL_INTEGER);
		}//  (  Name = 'S_HDWCON' and _EDGWP = 1  )  -- Line: 50
		if (_this.Evaluate(':Name') == 'UB' || _this.Evaluate(':Name') == 'FB') {
			if (_this.Evaluate(':AZ') < 0 && _this.Evaluate(':AZ') >  - 180) {//Horizontal Grain
				if (_this.Evaluate(':AX') == 0 && _this._EDGWP == 1) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX = 0 & _EDGWP = 1  )  -- Line: 55
				if (_this.Evaluate(':AX') != 0 && _this._EDGWP == 3) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX != 0 & _EDGWP = 3  )  -- Line: 58
			}
			else {// Not (  :AZ < 0 & :AZ > -180  )  -- Line 54
				if (_this.Evaluate(':AX') == 0 && _this._EDGWP == 4) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX = 0 & _EDGWP = 4  )  -- Line: 62
				if (_this.Evaluate(':AX') != 0 && _this._EDGWP == 2) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX != 0 & _EDGWP = 2  )  -- Line: 65
			}//  (  :AZ < 0 & :AZ > -180  )  -- Line: 54
		}//  (  :Name = 'UB' or :Name = 'FB'  )  -- Line: 53
	}//  (  CTF = -1  )  -- Line: 49
//remove right operation ===============================================================================
	if (_this.Evaluate('CTF') == 1) {
		if (_this.NAME == 'S_HDWCON' && _this._EDGWP == 3) {
			_this.SetParameter('REMOVE', 2, VAL_INTEGER);
		}//  (  Name = 'S_HDWCON' and _EDGWP = 3  )  -- Line: 73
		if (_this.Evaluate(':Name') == 'UB' || _this.Evaluate(':Name') == 'FB') {
			if (_this.Evaluate(':AZ') < 0 && _this.Evaluate(':AZ') >  - 180) {//Horizontal Grain
				if (_this.Evaluate(':AX') == 0 && _this._EDGWP == 3) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX = 0 & _EDGWP = 3  )  -- Line: 78
				if (_this.Evaluate(':AX') != 0 && _this._EDGWP == 1) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX != 0 & _EDGWP = 1  )  -- Line: 81
			}
			else {// Not (  :AZ < 0 & :AZ > -180  )  -- Line 77
				if (_this.Evaluate(':AX') == 0 && _this._EDGWP == 2) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX = 0 & _EDGWP = 2  )  -- Line: 85
				if (_this.Evaluate(':AX') != 0 && _this._EDGWP == 4) {
					_this.SetParameter('REMOVE', 2, VAL_INTEGER);
				}//  (  :AX != 0 & _EDGWP = 4  )  -- Line: 88
			}//  (  :AZ < 0 & :AZ > -180  )  -- Line: 77
		}//  (  :Name = 'UB' or :Name = 'FB'  )  -- Line: 76
	}//  (  CTF = 1  )  -- Line: 72
}//  (  _SHPEDGCNT < 5  )  -- Line: 47
//Delete valueCTF


//*********************************************************************************************************************
//************************************************ Revision History ***************************************************
//BY - Modified _FACEWP to corresponding _EDGWP values



}