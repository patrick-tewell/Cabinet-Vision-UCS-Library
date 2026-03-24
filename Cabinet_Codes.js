//*** Applies to each TO|BO|DE|FS|S_DIV|NA OBJ_PART ***

if (_cab.CLASS == ASM_CLASS_CLOSET) return;

if (_this.NAME == 'NA' && Math.round(_this.DX) == 4) {
	_this.COMMENT = nailerCode;
	return;
}

const cabCodeMap = new Map([
	[12, cabCode2],
	[16, cabCode4],
	[20, cabCode6],
  [24, cabCode8]
]);

const curDepth = Math.round(_cab.DZ);

if (cabCodeMap.has(curDepth)) {
	_this.COMMENT = cabCodeMap.get(curDepth);
}
