function fnRemove_Lbore_from_Dividers()
{

//Modifies Divider

// Only closets
if (_cab.CLASS != ASM_CLASS_CLOSET) {
    return;
}

// Helper - find first child with matching NAME and _FACEWP
function findBore(targetName, targetFace) {
    var node = _this.GetFirstChild();
    while (node) {
        if (node.NAME === targetName && node.GetParameterValue('_FACEWP') === targetFace) {
            return node;
        }
        node = node.GetNextSibling();
    }
    return null;
}

// Adjust vbore function with guards
function adjustBore(bore) {
    if (!bore) return;

    var rept = bore.GetParameterValue('REPT');
    var y    = bore.GetParameterValue('Y');
    var sp   = bore.GetParameterValue('SPCNG');

    if (typeof rept === 'number') bore.SetParameter('REPT', rept - 2);
    if (typeof y === 'number' && typeof sp === 'number') bore.SetParameter('Y', y + sp);
}

var fl = findBore('LFVBORE', 1); // Front Left
var rl = findBore('LRVBORE', 1); // Rear Left
var fr = findBore('LFVBORE', 2); // Front Right
var rr = findBore('LRVBORE', 2); // Rear Right

adjustBore(fl); // Front Left
adjustBore(rl); // Rear Left
adjustBore(fr); // Front Right
adjustBore(rr); // Rear Right
}