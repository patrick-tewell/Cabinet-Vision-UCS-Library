function fnAdd_Vbore_to_Corner_Systems()
{

// UCS converted to JS 12-08-25 11:14:39
//Modifies Partition

//*** Applies to each LU|RU OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET) {
	return;
}

if (_cab.TYPE != ASM_TYPE_CORNER90) {
	return;
}

if (_this.DESC != 'Partition') {
	return;
}

var rep = (_cab.DY / ToImp(32)) + 1;

if (_this.NAME == 'LU') {	
	var lbore = _this.GetFirstChild();
	
	// Handles front line boring
	while (lbore && lbore.NAME != 'LFVBORE') {
		lbore = lbore.GetNextSibling();
	}
	
	if (lbore.NAME == 'LFVBORE') {
		lbore.Y = 0.375;
		lbore.REPT = rep;
	}
	
	// Handles rear line boring
	while (lbore && lbore.NAME != 'LRVBORE') {
		lbore = lbore.GetNextSibling();
	}
	
	if (lbore.NAME == 'LRVBORE') {
		lbore.Y = 0.375;
		lbore.REPT = rep;
	}	
}
else if (_this.NAME == 'RU') {
	var lbore = _this.GetFirstChild();
	
	// Handles front line boring
	while (lbore && lbore.NAME != 'LFVBORE') {
		lbore = lbore.GetNextSibling();
	}
	
	if (lbore.NAME == 'LFVBORE') {
		lbore.X = _this.DX - ToImp(37);
		lbore.Y = 0.375;
		lbore.REPT = rep;
	}
	
	// Handles rear line boring
	while (lbore && lbore.NAME != 'LRVBORE') {
		lbore = lbore.GetNextSibling();
	}
	
	if (lbore.NAME == 'LRVBORE') {
		lbore.X = ToImp(37);
		lbore.Y = 0.375;
		lbore.REPT = rep;
	}
}

function ToImp(num) {
	return num / 25.4;
}
}