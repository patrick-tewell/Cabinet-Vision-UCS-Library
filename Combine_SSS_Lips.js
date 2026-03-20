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

let count = 0;
let interior = _cab.GetFirstChild();

while (interior) {
	if (interior.NAME == 'Interior') {
		let node = interior.GetFirstChild();
		
		while (node) {
    		if (node.NAME == 'S_SSLF') {
        		count++;

        		let lip = node.GetFirstChild();
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
