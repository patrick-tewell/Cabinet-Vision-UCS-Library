function fnRemove_Nailers_Behind_System_Drawers()
{

// Delete nailer behind system drawers
// Modifies Nailers

//*** Applies to each DWR_OPEN OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.GetParameterValue('ConstID') != _cab.Evaluate('AsmConstID(\'Closet - Backs\')')) return;
if (_cab.Y > 1) return;
if (_this.Y > 5) return;

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