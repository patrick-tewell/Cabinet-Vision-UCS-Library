function fnRemove_Nailers_Behind_System_Drawers()
{

// Delete nailer behind system drawers
// Modifies Nailers

//*** Applies to each DWR_OPEN OBJ_PART ***

// Filter closet systems ignoring systesm with backs
if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.GetParameterValue('ConstID') != _cab.Evaluate('AsmConstID(\'Closet - Backs\')')) {
	return;
}

// Filter floor-mount systems
if (_cab.Y > 1) {
	return;
}

// Filter left guide and those in range of nailer
if (_this.Y > 5) {
	return;
}

// Get case reference
var cse = _cab.GetFirstChild();
while (cse && cse.NAME != 'Case') {
	cse = cse.GetNextSibling();
}

// Find and delete nailer behind drawer
var nlr = cse.GetFirstChild();
while (nlr) {
	if (nlr.NAME == 'NA') {
		nlr.QTY = 0;
	}
	nlr = nlr.GetNextSibling();
}

}