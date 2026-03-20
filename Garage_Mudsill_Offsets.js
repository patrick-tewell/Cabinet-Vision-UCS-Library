//*** Applies to each CAB OBJ_ASSEMBLY ***

const cabName = _cab.NAME;
const cabClass = _cab.CLASS;

const isCountertop = ['Countertop', '1 1/4 Countertop'].includes(cabName);
const isCabinet = (cabClass === ASM_CLASS_BASE || cabClass === ASM_CLASS_TALL);

if (!isCountertop && !isCabinet) return;

if (isCabinet) {
	const garageID = _this.Evaluate('AsmConstID(\'Cabinet - Garage\')');
	
	if (_cab.GetParameterValue('ConstID') !== garageID) return;
}

const mudsillVal = _this.Evaluate('MUDSILL') || 0;

if (mudsillVal < 0) {
	_this.RemoveParameter('Mudsill');
}

if (_cab.GetParameterValue('MUDSILL') == null) {
	_this.SetParameter('Mudsill', 'Room_MUDSILL');
	_this.ModifyParameter('Mudsill', PARMOD_STYLE, PARSTYLE_ATTRIBUTE);
	_this.ModifyParameter('Mudsill', PARMOD_DESC, '_Mudsill Thickness');
}

let currentDZ = _this.DZ;
let lastApplied = _this.Evaluate('_LAST_MUDSILL_APPLIED') || 0;

if (isCountertop) {
    let targetDZ = currentDZ - lastApplied + mudsillVal;

    _this.SetParameter('DZ', targetDZ);
    _this.SetParameter('_LAST_MUDSILL_APPLIED', mudsillVal);
    
    _this.ModifyParameter('_LAST_MUDSILL_APPLIED', PARMOD_STYLE, PARSTYLE_DEFAULT);

} else {
    _this.SetParameter('Z', mudsillVal);
}
