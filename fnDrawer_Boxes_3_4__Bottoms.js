function fnDrawer_Boxes_3_4__Bottoms()
{

// UCS converted to JS 01-07-26 13:29:22
//Modifies Door

//*** Applies to each DBOX OBJ_ASSEMBLY ***
var drawerBottomID = 52;

if (_this.DX < 30) {
	return;
}

var bottom = _this.GetFirstChild();
while (bottom) {
	if (bottom.NAME == 'BBT') {
		bottom.SetMaterial('3/4 White');
		break;
	}
	bottom = bottom.GetNextSibling();
}

/*
var part = _this.GetFirstChild();
var bore;
while (part) {
	if (part.NAME == 'BBK') {
		bore = part.GetFirstChild();
		while (bore) {
			if (bore.NAME == '_BORECONN') {
				bore.SetParameter('_CONNID', drawerBottomID);
			}
			bore = bore.GetNextSibling();
		}
	} else if (part.NAME == 'BF') {
		bore = part.GetFirstChild();
		while (bore) {
			if (bore.NAME == '_BORECONN') {
				bore.SetParameter('_CONNID', drawerBottomID);
			}
			bore = bore.GetNextSibling();
		}
	}
	part = part.GetNextSibling();
} 
*/
}