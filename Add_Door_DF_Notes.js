//*** Applies to each DOR|DWR OBJ_ASSEMBLY ***

const shaker = 245;
const shakerDrawer = 246;
const shakerMidRail = 262;
const shakerGlass = 263;
const shakerGlassMidRail = 264;


if (!(_this.Evaluate('_STYLEID') == shaker 
   || _this.Evaluate('_STYLEID') == shakerDrawer
   || _this.Evaluate('_STYLEID') == shakerMidRail
   || _this.Evaluate('_STYLEID') == shakerGlass
   || _this.Evaluate('_STYLEID') == shakerGlassMidRail)) {
	return;
}

if (_cab.CLASS == ASM_CLASS_CLOSET) {
	if (!_this.COMMENT) {
		_this.COMMENT = 'System';
	}
} else {
	if (!_this.COMMENT) {
		_this.COMMENT = 'Cabinet';
	}
}
