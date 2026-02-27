function fnRealigns_PT_Linebore()
{

// UCS converted to JS 12-30-25 08:39:02
//Adjust Partitions Length and Height to 32mm ** Version 23.3 **
//There is nothing to modify in this UCS
//*** Applies to each L?VBORE OBJ_PART ***

//==================================================================================
if (_this.Evaluate('Catalog_Save_Mode')) {
	return;
}//  (  Catalog_Save_Mode  )  -- Line: 6

if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.CLASS != ASM_CLASS_CLOSETBASE && _cab.CLASS != ASM_CLASS_CLOSETUPPER) {
	return;
}//  (  Cab.Class != ASM_CLASS_CLOSET and Cab.Class != ASM_CLASS_CLOSETBASE and Cab.Class != ASM_CLASS_CLOSETUPPER  )  -- Line: 10

//==================================================================================

if (_cab.TYPE != ASM_TYPE_CLOSET_VERT) {

	if (_this.Evaluate(':Name') == 'PT'/* || _this.Evaluate(':Name') == 'S_DIV'*/) {
		if (_this.Evaluate('OrigYb') && _this.Evaluate('NewYb')) {
			_this.Y += _this.Evaluate('OrigYb-NewYb');
		}//  (  OrigYb and NewYb  )  -- Line: 19

		if (_this.Evaluate(':AY') < 0) {
			_this.SetParameter('Part_FrontSB', _cab.Evaluate('dz-:DX-:PABSZ'));
			_this.SetParameter('Part_RearSB', _this.Evaluate(':PABSZ'));
			if (_this.Evaluate('_FACEWP') == 1) {
				if (_this.Evaluate('_LBORE') == 2 || _this.Evaluate('_LBORE') == 4) {
					_this.QTY = 0;
				}//  (  _LBORE = 2 or _LBORE = 4  )  -- Line: 27
			}
			else {// Not (  _FACEWP = 1  )  -- Line 26
				if (_this.Evaluate('_LBORE') == 1 || _this.Evaluate('_LBORE') == 4) {
					_this.QTY = 0;
				}//  (  _LBORE = 1 or _LBORE = 4  )  -- Line: 31
			}//  (  _FACEWP = 1  )  -- Line: 26
		}
		else {// Not (  :AY < 0  )  -- Line 23
			_this.SetParameter('Part_FrontSB', _cab.Evaluate('dz-:PABSZ'));
			_this.SetParameter('Part_RearSB', _this.Evaluate(':PABSZ-:DX'));
		}//  (  :AY < 0  )  -- Line: 23

		_this.Y += _this.Evaluate('ADJ');

		if (_this.NAME == 'LFVBORE') {
			if (_this.Evaluate('_FACEWP') == 1) {
				_this.X += _this.Evaluate('Part_FrontSB');
				if (_this.Evaluate('BOR_CENTER')) {
					var CENTERLB = _this.CreateChild(OBJ_LINEBORE, 'CENTERLB');
					CENTERLB.NAME = 'Center Linebore';
					CENTERLB.DX = _this.DX;
					CENTERLB.DY = _this.DY;
					CENTERLB.DZ = _this.DZ;
					CENTERLB.X = 'BOR_CENTER-Part_RearSB';
					CENTERLB.Y = _this.Y;
					CENTERLB.Z = _this.Z;
					CENTERLB.AX = _this.AX;
					CENTERLB.AY = _this.AY;
					CENTERLB.AZ = _this.AZ;
					CENTERLB.SPCNG = _this.SPCNG;
					CENTERLB.REPT = _this.REPT;
					CENTERLB.SetParameter('_FACEWP', 1, VAL_INTEGER);
					if (_this.Evaluate(':AY') == 90) {
						CENTERLB.X = ':DX-(BOR_CENTER-Part_RearSB)';
					}//  (  :AY = 90  )  -- Line: 60
var 					findAsm = _this.FindAssembly('OWNER');
					if ( findAsm != null )
						CENTERLB.SetParent(findAsm);
				}//  (  BOR_CENTER  )  -- Line: 45
			}
			else {// Not (  _FACEWP = 1  )  -- Line 43
				_this.X -= _this.Evaluate('Part_FrontSB');
				if (_this.Evaluate('BOR_CENTER')) {
					var CENTERLB = _this.CreateChild(OBJ_LINEBORE, 'CENTERLB');
					CENTERLB.NAME = 'Center Linebore';
					CENTERLB.DX = _this.DX;
					CENTERLB.DY = _this.DY;
					CENTERLB.DZ = _this.DZ;
					CENTERLB.X = ':DX-(BOR_CENTER-Part_RearSB)';
					CENTERLB.Y = _this.Y;
					CENTERLB.Z = _this.Z;
					CENTERLB.AX = _this.AX;
					CENTERLB.AY = _this.AY;
					CENTERLB.AZ = _this.AZ;
					CENTERLB.SPCNG = _this.SPCNG;
					CENTERLB.REPT = _this.REPT;
					CENTERLB.SetParameter('_FACEWP', 2, VAL_INTEGER);
					findAsm = _this.FindAssembly('OWNER');
					if ( findAsm != null )
						CENTERLB.SetParent(findAsm);
				}//  (  BOR_CENTER  )  -- Line: 67
			}//  (  _FACEWP = 1  )  -- Line: 43
		}//  (  Name = 'LFVBORE'  )  -- Line: 42
	}
	else {// Not (  :Name = 'PT' or :Name = 'S_DIV'  )  -- Line 18
		if (_this.Evaluate(':DX') <= _this.Evaluate('MinLBDX')) {
			if (_this.NAME == '?RVBORE') {
				_this.QTY = 0;
				_this.NAME = 'Linebore Removed because of part width';
			}//  (  Name = '?RVBORE'  )  -- Line: 88
		}//  (  :DX <= MinLBDX  )  -- Line: 87
	}//  (  :Name = 'PT' or :Name = 'S_DIV'  )  -- Line: 18

}
else {// Not (  Cab.Type != ASM_TYPE_CLOSET_VERT  )  -- Line 16

	_this.QTY = 0;
	_this.NAME = 'Linebore Removed to allow UCS operation';

}//  (  Cab.Type != ASM_TYPE_CLOSET_VERT  )  -- Line: 16
//==================================================================================

}