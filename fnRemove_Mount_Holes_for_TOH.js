function fnRemove_Mount_Holes_for_TOH()
{

// UCS converted to JS 02-25-26 16:59:01
//Modifies Drawer Front

//*** Applies to each DOR OBJ_PART ***

// Will check for any closet doors that have bottom hinges and delete the hinge plate mounting holes for that door
// This could cause issues if we ever make bottom hinge doors that don't have a hamper and need those holes


if (_cab.CLASS != ASM_CLASS_CLOSET) return;

var opening = _this.GetParent();

if (!opening) return;
if (opening.NAME != 'DOR_OPEN')	return;

if (opening.GetParameterValue('HNG') == 4) {
	var plate = _this.GetNextSibling();
	while (plate) {
		if (plate.NAME == 'S_HNGPLT') {
			var hole = plate.GetFirstChild();
			while (hole) {
				if (hole.NAME == '_HPVBORE') {
					hole.SetParameter('QTY', 0);
				}
				hole = hole.GetNextSibling();
			}
		}
		plate = plate.GetNextSibling();
	}
}


}