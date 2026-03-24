//*** Applies to each BF|BBK OBJ_PART ***

const dxMap = new Map([
	[2.25,   DDCode1],
	[3.5,    DDCode2],
	[4.75,   DDCode3],
    [6,      DDCode4],
    [7.25,   DDCode5],
    [8.5,    DDCode6],
    [9.75,   DDCode7],
    [11,     DDCode8],
    [15.625, DDCode9]
]);

_this.COMMENT = dxMap.get(_this.DX) ?? _this.COMMENT;
