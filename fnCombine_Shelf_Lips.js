function fnCombine_Shelf_Lips()
{

// UCS converted to JS 12-09-25 12:57:54
//Modifies Shelf Lip

//*** Applies to each Cab OBJ_ASSEMBLY ***

if (_cab.CLASS !== ASM_CLASS_CLOSET) {
    return;
}

if (_cab.NAME == 'Corner System Left' ||
    _cab.NAME == 'Corner System Right' ||
    _cab.NAME == 'Tall Panel' ||
    _cab.NAME == 'LH Bridge' ||
    _cab.NAME == 'RH Bridge') {
    return;
}

var count = 0;

interior = _cab.GetFirstChild();
while (interior) {
	if (interior.NAME == 'Interior') {
		var node = interior.GetFirstChild();
		
		while (node) {
    		if (node.NAME == 'S_SSLF') {
        		count++;

        		var lip = node.GetFirstChild();
        		while (lip && lip.NAME != 'S_SLFLIP') {
	            	lip = lip.GetNextSibling();
    	    	}

        		if (lip) {
            		if (count % 2 == 0) {
                		lip.QTY = 0;
            		} else {
	        	        lip.DX = 3.125;
    		        }
	    	        lip.VISIBLE = 0;
        		}
	    	}

    		node = node.GetNextSibling();
		}
	} else if (interior.NAME == 'Spice Shelf') {
		count++;
		
		if (count % 2 == 0) {
			interior.DY = 1.5;
		} else {
			interior.DY = 3.125;
		}
	}
	interior = interior.GetNextSibling();
}

/*
// Get cab interior where shelf is housed
var interior = _cab.GetFirstChild();
while (interior) {
	if (interior.NAME == 'Spice Shelf') {
		count++;
		
		if (count % 2 == 0) {
			interior.DY = 1.5;
		} else {
			interior.DY = 3.125;
		}
	}
    interior = interior.GetNextSibling();
}
if (!interior) {
    // No Interior found; nothing to do
    return;
}

// Go through children
var node = interior.GetFirstChild();
while (node) {
    // Process shelves named S_SSLF only
    if (node.NAME == 'S_SSLF') {
        count++;

        // Find the shelf lip child
        var lip = node.GetFirstChild();
        while (lip && lip.NAME != 'S_SLFLIP') {
            lip = lip.GetNextSibling();
        }

        if (lip) {
            // Alternate: even-indexed shelves remove lip; odd shift DX
            if (count % 2 == 0) {
                lip.QTY = 0;          // remove on even
            } else {
                lip.DX = 3.125;       // adjust on odd (inches if your UCS is imperial)
            }
            lip.VISIBLE = 0;
        }
    }

    // Advance to next sibling under Interior
    node = node.GetNextSibling();
}
*/
}