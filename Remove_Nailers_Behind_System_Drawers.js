//*** Applies to each DWR_OPEN OBJ_PART ***

if (_cab.CLASS != ASM_CLASS_CLOSET && _cab.GetParameterValue('ConstID') != _cab.Evaluate('AsmConstID(\'Closet - Backs\')')) return;

if (_cab.Y > 1 || _this.Y > 5) return;

let node = _cab.GetFirstChild();

while (node) {
    if (node.NAME === 'Case') {
        let nailer = node.GetFirstChild();
        
        while (nailer) {
            if (nailer.NAME === 'NA') {
                nailer.QTY = 0;
                break;
            }
            nailer = nailer.GetNextSibling();
        }
        break; 
    }
    node = node.GetNextSibling();
}
