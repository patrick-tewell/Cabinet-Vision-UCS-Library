//*** Applies to each HBASE OBJ_PART ***

function createBorePair(centerX, centerY, curIndex) {
	const VBORE1 = _this.CreateChild(OBJ_LINEBORE, 'VBORE' + curIndex + 'R');
	
	VBORE1.DX = Imperial(5);
	VBORE1.DY = Imperial(5);
	VBORE1.DZ = holeDepth;
	VBORE1.X = centerX;
	VBORE1.Y = centerY + (holeDist / 2);
	VBORE1.Z = '_M:DZ';
	
	const VBORE2 = _this.CreateChild(OBJ_LINEBORE, 'VBORE' + curIndex + 'L');
	
	VBORE2.DX = Imperial(5);
	VBORE2.DY = Imperial(5);
	VBORE2.DZ = holeDepth;
	VBORE2.X = centerX;
	VBORE2.Y = centerY - (holeDist / 2);
	VBORE2.Z = '_M:DZ';
}

const requestedHooks = _this.Evaluate('numHooks');
const numHooks = (requestedHooks > _cab.DX / 4) ? Math.ceil(_cab.DX / 4) : requestedHooks;
const centerLine = _this.DX / 2;

for (let i = 0; i < numHooks; i++) {
	let yPos = (_this.DY / numHooks) * (i + 0.5);

	createBorePair(centerLine, yPos, i);
}
