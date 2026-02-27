function fnRafix_Hardware_Position()
{

// UCS converted to JS 12-19-25 11:16:06
//Modifies hardware connector  ** Version 23.3 **

//*** Applies to each S_HDWCON OBJ_PART ***

//========================================================================================
if (_this.Evaluate('Catalog_Save_Mode')) {
	return;
}//  (  Catalog_Save_Mode  )  -- Line: 6

if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.CLASS != ASM_CLASS_CLOSETBASE && _cab.CLASS != ASM_CLASS_CLOSETUPPER) {
	return;
}//  (  Cab.Class != ASM_CLASS_CLOSET and Cab.Class != ASM_CLASS_CLOSETBASE and Cab.Class != ASM_CLASS_CLOSETUPPER  )  -- Line: 10

if (_this.GetParent().NAME == 'S_DIV') {
	return;
}

if (_this.Evaluate(':NAME') == 'FT') {
	return;
}
//========================================================================================

if (_this.Evaluate('_FACEWP') == 3) {
	_this.SetParameter('EDGLEN', _this.Evaluate(':DX'));
	_this.SetParameter('EDGAZ', -90, VAL_DEGREES);
	_this.SetParameter('EDGWP', -3, VAL_INTEGER);
	_this.SetParameter('EdgeID', _this.FormatText('F{_FACEWP}'), VAL_TEXT);
}//  (  _FACEWP = 3  )  -- Line: 16

if (_this.Evaluate('_FACEWP') == 4) {
	_this.SetParameter('EDGLEN', _this.Evaluate(':DY'));
	_this.SetParameter('EDGAZ', 0, VAL_DEGREES);
	_this.SetParameter('EDGWP', 2, VAL_INTEGER);
	_this.SetParameter('EdgeID', _this.FormatText('F{_FACEWP}'), VAL_TEXT);
}//  (  _FACEWP = 4  )  -- Line: 23

if (_this.Evaluate('_FACEWP') == 5) {
	_this.SetParameter('EDGLEN', _this.Evaluate(':DX'));
	_this.SetParameter('EDGAZ', 90, VAL_DEGREES);
	_this.SetParameter('EDGWP', -5, VAL_INTEGER);
	_this.SetParameter('EdgeID', _this.FormatText('F{_FACEWP}'), VAL_TEXT);
}//  (  _FACEWP = 5  )  -- Line: 30

if (_this.Evaluate('_FACEWP') == 6) {
	_this.SetParameter('EDGLEN', _this.Evaluate(':DY'));
	_this.SetParameter('EDGAZ', 180, VAL_DEGREES);
	_this.SetParameter('EDGWP', -6, VAL_INTEGER);
	_this.SetParameter('EdgeID', _this.FormatText('F{_FACEWP}'), VAL_TEXT);
}//  (  _FACEWP = 6  )  -- Line: 37

if (_this._EDGWP != null) {
	_this.SetParameter('EDGLEN', _this.Evaluate(_this.FormatText('_EDG{_EDGWP}DY')));
	_this.SetParameter('EDGAZ', _this.Evaluate(_this.FormatText('_EDG{_EDGWP}AZ')), VAL_DEGREES);
	_this.SetParameter('EDGWP', _this._EDGWP, VAL_INTEGER);
	_this.SetParameter('EdgeID', _this.FormatText('E{_EDGWP}'), VAL_TEXT);
}//  (  _EDGWP != Null  )  -- Line: 44

_this.SetParameter('EDGAZ', _this.Evaluate('RPREC(EDGAZ)'), VAL_DEGREES);

//========================================================================================
if (_this.Evaluate('Aux_Hole_On')) {
	if (_this.GetParameterValue('_M:MATID') != _cab.GetParameterValue('Rafix2._M:MATID')) {
		_this.SetMaterial(_cab.GetParameterValue('RAFIX2._M:MATID'));
	}//  (  this._M:MATID != cab.Rafix2._M:MATID  )  -- Line: 55
}
else {// Not (  Aux_Hole_On  )  -- Line 54
	if (_this.GetParameterValue('_M:MATID') != _cab.GetParameterValue('Rafix._M:MATID')) {
		if (_this.Evaluate('::::NAME') != 'GROUP') {
			_this.SetMaterial(_cab.GetParameterValue('RAFIX._M:MATID'));
		}
	}//  (  this._M:MATID != cab.Rafix._M:MATID  )  -- Line: 59
}//  (  Aux_Hole_On  )  -- Line: 54

//========================================================================================
//Removes rafix on thin materials
if (_this.Evaluate(':DZ') < _this.Evaluate('_M:Min_Mat_DZ')) {
	_this.SetParameter('Remove', 1, VAL_BOOL);
	_this.NAME = 'Rafix ramoved because of material thickness';
}//  (  :DZ < _M:Min_Mat_DZ  )  -- Line: 66

//========================================================================================

_this.SetParameter('i', 1, VAL_INTEGER);
_this.SetParameter('HWOrder', 0, VAL_INTEGER);
while (_this.Evaluate(_this.FormatText(':.S_HDWCON@{i}.DX')) != null) {
	if (_this.Evaluate('EdgeID') == _this.Evaluate(_this.FormatText(':.S_HDWCON@{i}.EdgeID'))) {
		_this.SetParameter('HWOrder', _this.Evaluate('HWOrder+(1)'), VAL_INTEGER);
	}//  (  EdgeID =  :.S_HDWCON@{i}.EdgeID  )  -- Line: 76
	_this.SetParameter('i', _this.Evaluate('i+(1)'), VAL_INTEGER);
}//  ( :.S_HDWCON@{i}.DX != null do )  -- Line 75
_this.RemoveParameter('i');

//========================================================================================
//Removes Extra Rafix connectors
if (_this.Evaluate(':Name') == 'UB' || _this.Evaluate(':Name') == 'FB') {
	if (_this.Evaluate('EDGLEN') >= _this.Evaluate('AAubLargeDY')) {
		_this.SetParameter('RafixCount', 4, VAL_INTEGER);
		if (_this.Evaluate('HWOrder') > 4) {
			_this.SetParameter('Remove', 1, VAL_BOOL);
			_this.NAME = 'Rafix Removed - Too Many per edge';
		}//  (  HWOrder > 4  )  -- Line: 88
	}
	else {// Not (  EDGLEN >= AAubLargeDY  )  -- Line 86
		if (_this.Evaluate('EDGLEN') >= _this.Evaluate('AAubMediumDY')) {
			_this.SetParameter('RafixCount', 3, VAL_INTEGER);
			if (_this.Evaluate('HWOrder') > 3) {
				_this.SetParameter('Remove', 1, VAL_BOOL);
				_this.NAME = 'Rafix Removed - Too Many per edge';
			}//  (  HWOrder > 3  )  -- Line: 95
		}
		else {// Not (  EDGLEN >= AAubMediumDY  )  -- Line 93
			_this.SetParameter('RafixCount', 2, VAL_INTEGER);
			if (_this.Evaluate('HWOrder') > 2) {
				_this.SetParameter('Remove', 1, VAL_BOOL);
				_this.NAME = 'Rafix Removed - Too Many per edge';
			}//  (  HWOrder > 2  )  -- Line: 101
		}//  (  EDGLEN >= AAubMediumDY  )  -- Line: 93
	}//  (  EDGLEN >= AAubLargeDY  )  -- Line: 86
}
else {// Not (  :Name = 'UB' or :Name = 'FB'  )  -- Line 85
	if (_this.Evaluate('HWOrder') > 3) {
		_this.SetParameter('Remove', 1, VAL_BOOL);
		_this.NAME = 'Rafix Removed - Too Many per edge';
	}//  (  HWOrder > 3  )  -- Line: 108
}//  (  :Name = 'UB' or :Name = 'FB'  )  -- Line: 85

/*if (_this.Evaluate('EdgLen') <= _this.Evaluate('MinLBDX') && _this.Evaluate(':Name') != 'NA' && _this.Evaluate(':Name') != 'SN') {
	if (_this.Evaluate('HWOrder') >= 2) {
		_this.SetParameter('Remove', 1, VAL_BOOL);
		_this.NAME = 'Rafix Removed - EdgeLen < MinLBDX';
	}//  (  HWOrder >= 2  )  -- Line: 115
}//  (  EdgLen <= MinLBDX and :Name != 'NA' and :Name != 'SN'  )  -- Line: 114
*/
//========================================================================================
//Flip rafix to opposite face
if (_this.Evaluate('Rafix_Flip')) {
	_this.AZ *= -1;
	if (_this.X == 0) {
		_this.X = ':DZ';
	}
	else {// Not (  X = 0  )  -- Line 125
		_this.X = 0;
	}//  (  X = 0  )  -- Line: 125
}//  (  Rafix_Flip  )  -- Line: 123

//========================================================================================
//Position of Rafix on Backs

if (_this.Evaluate(':Name') == 'UB' || _this.Evaluate(':Name') == 'FB') {

	if (_this.Evaluate('HWOrder') == 1) {
		_this.Y = '_CV:448';
	}//  (  HWOrder = 1  )  -- Line: 137

	if (_this.Evaluate('HWOrder') == 2) {
		if (_this.Evaluate('RafixCount') == 2) {
			_this.Y = 'EDGLEN-cab._CV:448';
		}//  (  RafixCount = 2  )  -- Line: 142
		if (_this.Evaluate('RafixCount') == 3) {
			_this.Y = 'EDGLEN/2';
		}//  (  RafixCount = 3  )  -- Line: 145
		if (_this.Evaluate('RafixCount') == 4) {
			_this.Y = '(EDGLEN-2*cab._CV:448)/3+cab._CV:448';
		}//  (  RafixCount = 4  )  -- Line: 148
	}//  (  HWOrder = 2  )  -- Line: 141

	if (_this.Evaluate('HWOrder') == 3) {
		if (_this.Evaluate('RafixCount') == 3) {
			_this.Y = 'EDGLEN-cab._CV:448';
		}//  (  RafixCount = 3  )  -- Line: 154
		if (_this.Evaluate('RafixCount') == 4) {
			_this.Y = '2*(EDGLEN-2*cab._CV:448)/3+cab._CV:448';
		}//  (  RafixCount = 4  )  -- Line: 157
	}//  (  HWOrder = 3  )  -- Line: 153

	if (_this.Evaluate('HWOrder') == 4) {
		_this.Y = 'EDGLEN-cab._CV:448';
	}//  (  HWOrder = 4  )  -- Line: 162

	if (_this.GetParameterValue('Remove')) {
		_this.QTY = 0;
		_this.X = -999;
		_this.Y = -999;
		_this.Z = -999;
	}//  (  This.Remove  )  -- Line: 166

	return;//Don't align to lineboring

}//  (  :Name = 'UB' or :Name = 'FB'  )  -- Line: 135

//========================================================================================
// Remove Rafix if SB = 0

if (_this.Evaluate('HWOrder') == 1) {
	_this.NAME = _this.FormatText('Front {desc}');
	if (_this.Evaluate('RafixFSB') == 0) {
		_this.SetParameter('Remove', 1, VAL_BOOL);
		_this.NAME = 'Rafix - Manual Removed FSB';
	}//  (  RafixFSB = 0  )  -- Line: 182
}//  (  HWOrder = 1  )  -- Line: 180
if (_this.Evaluate('HWOrder') == 2) {
	_this.NAME = _this.FormatText('Rear {desc}');
	if (_this.Evaluate('RafixRSB') == 0) {
		_this.SetParameter('Remove', 1, VAL_BOOL);
		_this.NAME = 'Rafix - Manual Removed RSB';
	}//  (  RafixRSB = 0  )  -- Line: 189
}//  (  HWOrder = 2  )  -- Line: 187
if (_this.Evaluate('HWOrder') == 3) {
	_this.NAME = _this.FormatText('Middle {desc}');
	if (_this.Evaluate('RafixMSB') == 0) {
		_this.SetParameter('Remove', 1, VAL_BOOL);
		_this.NAME = 'Rafix - Manual Removed MSB';
	}//  (  RafixMSB = 0  )  -- Line: 196
}//  (  HWOrder = 3  )  -- Line: 194

//========================================================================================
if (_this.Evaluate('!cab.BOR_BREF') && _this.Evaluate(':Name') != 'NA' && _this.Evaluate(':Name') != 'SN') {
	_this.SetParameter('RafixRSB', 'EDGLEN-:RafixRSB');
}//  (  !cab.BOR_BREF  )  -- Line: 203

if (_this.Evaluate('!cab.BOR_FREF') && _this.Evaluate(':Name') != 'NA' && _this.Evaluate(':Name') != 'SN') {
	_this.SetParameter('RafixFSB', 'EDGLEN-:RafixFSB');
}//  (  !cab.BOR_FREF  )  -- Line: 207

//========================================================================================
if (_this.Evaluate('Rafix_Orientation') == 1) {
	if (_this.Evaluate('EDGAZ') < 0 && _this.Evaluate('EDGAZ') >=  - 180) {
		if (_this.Evaluate('HWOrder') == 1) {//Left Front
			_this.Y = 'RafixFSB-Part_FrontSB';
			if (_this.Evaluate('RafixFSB') - _this.Evaluate('Part_FrontSB') < 0) {
				_this.Y = 'RafixFSB';
			}//  (  RafixFSB - Part_FrontSB < 0  )  -- Line: 216
		}//  (  HWOrder = 1  )  -- Line: 214
		if (_this.Evaluate('HWOrder') == 2) {//Left Back
			_this.Y = 'EDGLEN+Part_RearSB-RafixRSB';
			if (_this.Evaluate('EDGLEN') + _this.Evaluate('Part_RearSB') - _this.Evaluate('RafixRSB') > _this.Evaluate('Edglen')) {
				_this.Y = 'EDGLEN-RafixRSB';
			}//  (  EDGLEN + Part_RearSB  - RafixRSB > Edglen  )  -- Line: 222
		}//  (  HWOrder = 2  )  -- Line: 220
		if (_this.Evaluate('HWOrder') == 3) {//Left Mid
			_this.Y = 'EDGLEN+Part_RearSB-RafixMSB';
			if (_this.Evaluate('EDGLEN') + _this.Evaluate('Part_RearSB') - _this.Evaluate('RafixMSB') > _this.Evaluate('Edglen')) {
				_this.Y = 'EDGLEN-RafixMSB';
			}//  (  EDGLEN + Part_RearSB - RafixMSB > Edglen  )  -- Line: 228
		}//  (  HWOrder = 3  )  -- Line: 226
	}
	else {// Not (  EDGAZ < 0  & EDGAZ >= -180  )  -- Line 213
		if (_this.Evaluate('HWOrder') == 1) {//Right Front
			_this.Y = 'EDGLEN+Part_FrontSB-RafixFSB';
			if (_this.Evaluate('EDGLEN') + _this.Evaluate('Part_FrontSB') - _this.Evaluate('RafixFSB') > _this.Evaluate('EDGLEN')) {
				_this.Y = 'EDGLEN-RafixFSB';
			}//  (  EDGLEN + Part_FrontSB - RafixFSB > EDGLEN  )  -- Line: 235
		}//  (  HWOrder = 1  )  -- Line: 233
		if (_this.Evaluate('HWOrder') == 2) {//Right Back
			_this.Y = 'RafixRSB-Part_RearSB';
			if (_this.Evaluate('RafixRSB') - _this.Evaluate('Part_RearSB') < 0) {
				_this.Y = 'RafixRSB';
			}//  (  RafixRSB - Part_RearSB < 0  )  -- Line: 241
		}//  (  HWOrder = 2  )  -- Line: 239
		if (_this.Evaluate('HWOrder') == 3) {//Right Mid
			_this.Y = 'RafixMSB-Part_RearSB';
			if (_this.Evaluate('RafixMSB') - _this.Evaluate('Part_RearSB') < 0) {
				_this.Y = 'RafixMSB';
			}//  (  RafixMSB - Part_RearSB < 0  )  -- Line: 247
		}//  (  HWOrder = 3  )  -- Line: 245
	}//  (  EDGAZ < 0  & EDGAZ >= -180  )  -- Line: 213
}
else {// Not (  Rafix_Orientation = 1  )  -- Line 212
	if (_this.Evaluate('EDGAZ') <= 0 && _this.Evaluate('EDGAZ') >  - 180) {
		if (_this.Evaluate('HWOrder') == 1) {//Left Front
			_this.Y = 'EDGLEN+Part_FrontSB-RafixFSB';
			if (_this.Evaluate('EDGLEN') + _this.Evaluate('Part_FrontSB') - _this.Evaluate('RafixFSB') > _this.Evaluate('EDGLEN')) {
				_this.Y = 'EDGLEN-RafixFSB';
			}//  (  EDGLEN + Part_FrontSB - RafixFSB > EDGLEN  )  -- Line: 256
		}//  (  HWOrder = 1  )  -- Line: 254
		if (_this.Evaluate('HWOrder') == 2) {//Left Back
			_this.Y = 'RafixRSB-Part_RearSB';
			if (_this.Evaluate('RafixRSB') - _this.Evaluate('Part_RearSB') < 0) {
				_this.Y = 'RafixRSB';
			}//  (  RafixRSB - Part_RearSB  < 0  )  -- Line: 262
		}//  (  HWOrder = 2  )  -- Line: 260
		if (_this.Evaluate('HWOrder') == 3) {//Left Mid
			_this.Y = 'RafixMSB-Part_RearSB';
			if (_this.Evaluate('RafixMSB') - _this.Evaluate('Part_RearSB') < 0) {
				_this.Y = 'RafixMSB';
			}//  (  RafixMSB - Part_RearSB < 0  )  -- Line: 268
		}//  (  HWOrder = 3  )  -- Line: 266
	}
	else {// Not (  EDGAZ <= 0  & EDGAZ > -180  )  -- Line 253
		if (_this.Evaluate('HWOrder') == 1) {//Right Front
			_this.Y = 'RafixFSB-Part_FrontSB';
			if (_this.Evaluate('RafixFSB') - _this.Evaluate('Part_FrontSB') < 0) {
				_this.Y = 'RafixFSB';
			}//  (  RafixFSB - Part_FrontSB < 0  )  -- Line: 275

		}//  (  HWOrder = 1  )  -- Line: 273
		if (_this.Evaluate('HWOrder') == 2) {//Right Back
			_this.Y = 'EDGLEN-RafixRSB+Part_RearSB';
			if (_this.Evaluate('EDGLEN') - _this.Evaluate('RafixRSB') + _this.Evaluate('Part_RearSB') > _this.Evaluate('EdgLen')) {
				_this.Y = 'EDGLEN-RafixRSB';
			}//  (  EDGLEN - RafixRSB + Part_RearSB  > EdgLen  )  -- Line: 282
		}//  (  HWOrder = 2  )  -- Line: 280
		if (_this.Evaluate('HWOrder') == 3) {//Right Mid
			_this.Y = 'EDGLEN-RafixMSB+Part_RearSB';
			if (_this.Evaluate('EDGLEN') - _this.Evaluate('RafixMSB') + _this.Evaluate('Part_RearSB') > _this.Evaluate('EdgLen')) {
				_this.Y = 'EDGLEN-RafixMSB';
			}//  (  EDGLEN - RafixMSB + Part_RearSB > EdgLen  )  -- Line: 288
		}//  (  HWOrder = 3  )  -- Line: 286
	}//  (  EDGAZ <= 0  & EDGAZ > -180  )  -- Line: 253
}//  (  Rafix_Orientation = 1  )  -- Line: 212


//==================================================================================
if (_this.GetParameterValue('Remove')) {
	_this.QTY = 0;
	_this.X = -999;
	_this.Y = -999;
	_this.Z = -999;
}//  (  this.Remove  )  -- Line: 297
//==================================================================================


}