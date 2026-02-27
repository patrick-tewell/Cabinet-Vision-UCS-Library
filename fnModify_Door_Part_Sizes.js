function fnModify_Door_Part_Sizes()
{

// UCS converted to JS 10-23-25 14:31:35
//Modifies Door Top Rail Length

//*** Applies to each DTR|DBR|DMR|DFP OBJ_PART ***

if (_this.NAME == 'DTR' || _this.NAME == 'DBR' || _this.NAME == 'DMR') {
	_this.SetParameter('EDY', 0);
}
else {    // _this.NAME == 'DFP'
	_this.DX -= 0.125;
	_this.DY -= 0.125;
}
}