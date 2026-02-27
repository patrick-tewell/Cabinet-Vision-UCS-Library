function fnAdd_Door_DF_Notes()
{

// UCS converted to JS 12-30-25 16:46:19
//Modifies Door

//*** Applies to each DOR|DWR OBJ_ASSEMBLY ***

var shaker = 245;
var shakerDrawer = 246;
var shakerMidRail = 262;
var shakerGlass = 263;
var shakerGlassMidRail = 264;


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

}