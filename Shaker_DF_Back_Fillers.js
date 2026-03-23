//*** Applies to each DWR OBJ_ASSEMBLY ***

const slabH = _this.Evaluate("DoorStyleID('Slab - H')");
const slabV = _this.Evaluate("DoorStyleID('Slab - V')");
const currentStyle = _this.Evaluate('_StyleID');

if (currentStyle === slabH || currentStyle === slabV) {
    return;
}

var DBF = _this.CreateChild(OBJ_PART, 'DBF');

DBF.VISIBLE = false;
DBF.DX = 'DWR.DY-3.5625';
DBF.DY = 'DWR.DX-4.5625';
DBF.DZ = '_M:DZ';
DBF.X = 0;
DBF.Y = 0;
DBF.Z = 0;
DBF.AX = 0;
DBF.AY = 0;
DBF.AZ = 0;
