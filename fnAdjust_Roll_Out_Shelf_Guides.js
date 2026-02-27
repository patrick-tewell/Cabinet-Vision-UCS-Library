function fnAdjust_Roll_Out_Shelf_Guides()
{

// Adjust Roll Out Shelf parts

//*** Applies to each ROSG OBJ_GUIDE ***

_this.Z += 0.239;

var parentShelf = _this.GetParent();

parentShelf.BAND = 'NENN';
}