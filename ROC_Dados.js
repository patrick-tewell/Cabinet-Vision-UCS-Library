//*** Applies to each DE|TO OBJ_PART ***

if (_cab.NAME != 'ROC') {
	return;
}

if (minGap <=0 || dadoWidth <=0) {
	return;
}

if (createDados == 'false') {
	if (_this.NAME == 'DE') createBottomNotches(_this);
	return;
}

function createBottomNotches(object) {
	// Dado on bottom for shelf pin - LEFT
	var GROOVE = object.CreateChild(OBJ_DEPDADO, 'DADO');
	
	GROOVE.VISIBLE = true;
	GROOVE.DX = 0.375;
	GROOVE.DY = 0.75;
	GROOVE.DZ = 0.375;
	GROOVE.X = 1.1875;
	GROOVE.Y = 0;
	GROOVE.Z = 0;
	GROOVE.AX = 0;
	GROOVE.AY = 0;
	GROOVE.AZ = 0;
	
	// Dado on bottom for shelf pin - RIGHT
	var GROOVE = object.CreateChild(OBJ_DEPDADO, 'DADO');
	
	GROOVE.VISIBLE = true;
	GROOVE.DX = 0.375;
	GROOVE.DY = 0.75;
	GROOVE.DZ = 0.25;
	GROOVE.X = 1.1875;
	GROOVE.Y = _cab.DX - 0.75;
	GROOVE.Z = 0;
	GROOVE.AX = 0;
	GROOVE.AY = 0;
	GROOVE.AZ = 0;
}

function createGrooves(object, dyOffset, xOffset) {
	var GROOVE = _this.CreateChild(OBJ_DEPDADO, 'DADO');
	
	GROOVE.VISIBLE = true;
	GROOVE.SetParameter('_FACEWP', 1);
	GROOVE.DX = dadoWidth;
	GROOVE.DY = _cab.DZ - dyOffset;
	GROOVE.X = xOffset;
	
	// Apply edge gap to first and last dado
	if (i == 0) {
		GROOVE.Y = edgeOpening;
	} else if (i > 0 && i < numDados - 1) {
		GROOVE.Y = edgeOpening + (i * (dadoWidth + minGap));
	} else {
		GROOVE.Y = (_cab.DX - edgeOpening) - dadoWidth;
	}
	
	GROOVE.Z = 0;
	GROOVE.AX = 0;
	GROOVE.AY = 180;
	GROOVE.AZ = -90;
}

// For logic only - DO NOT MODIFY
var numDados = Math.floor(_cab.DX / minGap) - 1;
var openArea = (_cab.DX - (numDados * dadoWidth));
var edgeOpening = (openArea - ((numDados - 1) * minGap)) / 2;	

// Check if edge is smaller than minimum and adjust variables
// -1/8" so standard 24" ROC remains the same as it has been
if (edgeOpening < minGap - 0.125) {
	numDados--;
	openArea = (_cab.DX - (numDados * dadoWidth));
	edgeOpening = (openArea - ((numDados - 1) * minGap)) / 2;
}

// Dados for dividers
if (_this.NAME == 'DE') {
	for (let i = 0; i < numDados; i++) {	
		var GROOVE = _this.CreateChild(OBJ_DEPDADO, 'DADO');
	
		GROOVE.VISIBLE = true;
		GROOVE.SetParameter('_FACEWP', 1);
		GROOVE.DX = dadoWidth;
		GROOVE.DY = _cab.DZ - 0.761;
		GROOVE.DZ = dadoWidth;
		GROOVE.X = 0;
		GROOVE.Z = 0;
		
		// Apply edge gap to first and last dado
		if (i == 0) {
			GROOVE.Y = edgeOpening;
		} else if (i > 0 && i < numDados - 1) {
			GROOVE.Y = edgeOpening + (i * (dadoWidth + minGap));
		} else {
			GROOVE.Y = (_cab.DX - edgeOpening) - dadoWidth;
		}
						
		GROOVE.AX = 0;
		GROOVE.AY = 180;
		GROOVE.AZ = -90;
	}
	
	// Use helper to create bottom shelf pin notches
	createBottomNotches(_this);
	
} else if (_this.NAME == 'TO') {
	for (let i = 0; i < numDados; i++) {
		var GROOVE = _this.CreateChild(OBJ_DEPDADO, 'DADO');
	
		GROOVE.VISIBLE = true;
		GROOVE.SetParameter('_FACEWP', 1);
		GROOVE.DX = dadoWidth;
		GROOVE.DY = _cab.DY - 0.5;
		GROOVE.DZ = dadoWidth;
		GROOVE.X = 0.5;
		GROOVE.Z = 0;
		
		// Apply edge gap to first and last dado
		if (i == 0) {
			GROOVE.Y = edgeOpening;
		}
		else if (i > 0 && i < numDados - 1) {
			GROOVE.Y = edgeOpening + (i * (dadoWidth + minGap));
		}
		else {
			GROOVE.Y = (_cab.DX - edgeOpening) - dadoWidth;
		}
				
		GROOVE.AX = 0;
		GROOVE.AY = 180;
		GROOVE.AZ = -90;
	}
}
