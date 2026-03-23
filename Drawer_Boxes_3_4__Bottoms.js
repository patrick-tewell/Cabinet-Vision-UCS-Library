//*** Applies to each DBOX OBJ_ASSEMBLY ***
const drawerBottomID = 52;

if (_this.DX < 30 || _this.DY < 4) {
	return;
}

let bottom = _this.GetFirstChild();
while (bottom) {
	if (bottom.NAME == 'BBT') {
		bottom.SetMaterial('3/4 White');
		break;
	}
	bottom = bottom.GetNextSibling();
}
