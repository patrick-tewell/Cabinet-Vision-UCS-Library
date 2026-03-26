//*** Applies to each DE|TO OBJ_PART ***

if (_cab.NAME != 'ROC') return;

if (minGap <=0 || dadoWidth <=0) return;

if (createDados == 'false') {
	if (_this.NAME == 'DE') createBottomNotches(_this);
	return;
}

function createBottomNotches(object) {
	// Dado on bottom for shelf pin - LEFT
	let GROOVE = object.CreateChild(OBJ_DEPDADO, 'DADO');
	
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
	GROOVE = object.CreateChild(OBJ_DEPDADO, 'DADO');
	
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

function createGrooves(object, dyOffset, xOffset, i) {
	let GROOVE = object.CreateChild(OBJ_DEPDADO, 'DADO');
	
	GROOVE.VISIBLE = true;
	GROOVE.SetParameter('_FACEWP', 1);
	GROOVE.DX = dadoWidth;
	GROOVE.DY = _cab.DZ - dyOffset;
	GROOVE.DZ = dadoWidth;
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
let numDados = Math.floor(_cab.DX / minGap) - 1;
let openArea = (_cab.DX - (numDados * dadoWidth));
let edgeOpening = (openArea - ((numDados - 1) * minGap)) / 2;	

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
		createGrooves(_this, 0.761, 0, i);
	}
	createBottomNotches(_this);		
} else if (_this.NAME == 'TO') {
	for (let i = 0; i < numDados; i++) {
		createGrooves(_this, 0.5, 0.5, i);
	}
}
