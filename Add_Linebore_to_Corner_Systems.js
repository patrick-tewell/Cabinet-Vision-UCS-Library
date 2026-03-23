//*** Applies to each LU|RU OBJ_PART ***

if (_cab.CLASS !== ASM_CLASS_CLOSET || _cab.TYPE !== ASM_TYPE_CORNER90 || _this.DESC !== 'Partition') {
    return;
}

const sys37 = Imperial(37);
const repCount = (_cab.DY / Imperial(32)) + 1;

const updateBore = (bore, xVal) => {
    if (!bore) return;
    if (xVal !== undefined) bore.X = xVal;
    bore.Y = 0.375;
    bore.REPT = repCount;
};

let child = _this.GetFirstChild();
while (child) {
    if (child.NAME === 'LFVBORE') {
        let x = (_this.NAME === 'RU') ? (_this.DX - sys37) : child.X;
        updateBore(child, x);
    } 
    else if (child.NAME === 'LRVBORE') {
        let x = (_this.NAME === 'RU') ? sys37 : child.X;
        updateBore(child, x);
    }
    child = child.GetNextSibling();
}
