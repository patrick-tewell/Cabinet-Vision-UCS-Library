function fnAdd_Extrusion_Edge_to_Adj_Shelf()
{

// UCS converted to JS 08-13-25 08:00:36
//Links 1 1/2 WOOD BANDING to Adjustable Shelf

//*** Applies to each AS OBJ_PART ***

// ========== Guard Clauses ==========
if (!(_cab.GetParameterValue('ConstID') == _this.Evaluate('AsmConstID(\'Garage\')'))) {
	return;
}

var BOARD = _this.CreateChild(OBJ_PART, 'BOARD');

BOARD.DY = ':DY';      //length of the shelf
BOARD.X = ':DX-0.625'; //moves front to back
BOARD.Y = 0;           // moves left and right
BOARD.Z = 0.875;
BOARD.AX = 0;
BOARD.AY = 90;
BOARD.AZ = 0;
BOARD.ReplacePart('Custom Cabinets\\XXX');
BOARD.NAME = 'Extrusion';
BOARD.SetMaterial(2088);

}