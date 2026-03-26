//*** Applies to each AS OBJ_PART ***

// Currently no way to change the gap between adjustable shelves and the case of cabinets
// System set this gap to 1/4" which is too large for business requirement
// This sets it to 1/16" and recenters the shelf

if (_cab.CLASS == ASM_CLASS_CLOSET) return;

if (_cab.TYPE == ASM_TYPE_CORNER45 || _cab.TYPE == ASM_TYPE_CORNER90) return;

const stdGap = 0.25;

_this.X -= shelfGap * 1.5;
_this.DY += stdGap - shelfGap;
