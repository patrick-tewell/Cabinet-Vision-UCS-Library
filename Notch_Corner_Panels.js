//*** Applies to each LU|RU OBJ_PART ***

// This needs to set a parameter on the assembly after chaning the pDepth
// and use that to determine if the 1/8" should be added
// Currently will break if panel depth is not a whole number

if (_cab.NAME != 'Corner System Left' && _cab.NAME != 'Corner System Right') {
	return;
}

const panelDepth = _cab.Evaluate('Panel_Depth');

if (panelDepth % 1 == 0) {
	_cab.SetParameter('Panel_Depth', panelDepth + 0.125);
}
