//Modifies Divider

if (_cab.CLASS != ASM_CLASS_CLOSET) {
    return;
}

function findBore(targetName, targetFace) {
    let node = _this.GetFirstChild();
    while (node) {
        if (node.NAME === targetName && node.GetParameterValue('_FACEWP') === targetFace) {
            return node;
        }
        node = node.GetNextSibling();
    }
    return null;
}

function adjustBore(bore) {
    if (!bore) return;

    let rept = bore.GetParameterValue('REPT');
    let y    = bore.GetParameterValue('Y');
    let sp   = bore.GetParameterValue('SPCNG');

    if (typeof rept === 'number') bore.SetParameter('REPT', rept - 2);
    if (typeof y === 'number' && typeof sp === 'number') bore.SetParameter('Y', y + sp);
}

let fl = findBore('LFVBORE', 1); // Front Left
let rl = findBore('LRVBORE', 1); // Rear Left
let fr = findBore('LFVBORE', 2); // Front Right
let rr = findBore('LRVBORE', 2); // Rear Right

adjustBore(fl);
adjustBore(rl);
adjustBore(fr);
adjustBore(rr);
