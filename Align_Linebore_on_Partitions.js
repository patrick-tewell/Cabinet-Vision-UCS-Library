// *** Applies to each Cab OBJ_ASSEMBLY ***

const panelThickness = 0.761;

if (_cab.CLASS != ASM_CLASS_CLOSET || _cab.TYPE != ASM_TYPE_CLOSET_VERT) return;

function getAx(v) {
    let a = (v.GetParameterValue('AX') * 1) % 360;
    if (a < 0) a += 360;
    return a;
}
function nearlyEqual(a, b, tol) { return Math.abs((a * 1) - (b * 1)) <= (tol || 0.25); }

let interior = _cab.GetFirstChild();
while (interior && interior.NAME != 'Interior') { interior = interior.GetNextSibling(); }
if (!interior) return;

let pt = interior.GetFirstChild();
while (pt) {
    if (pt.NAME === 'PT') {
        let vbores = [];
        let n = pt.GetFirstChild();

        while (n) {
            if (n.NAME.indexOf('VBORE') !== -1) {
                let qty = n.GetParameterValue('QTY') * 1;
                let currentDepth = n.GetParameterValue('DZ') * 1;

                // Only process holes that are not already through-holes and have not been deleted
                if (qty > 0 && currentDepth < panelThickness) {
                    vbores.push(n);
                }
            }
            n = n.GetNextSibling();
        }

        // Process pairs
        for (let i = 0; i < vbores.length; i++) {
            let v1 = vbores[i];

            for (let j = i + 1; j < vbores.length; j++) {
                let v2 = vbores[j];

                let x1 = v1.GetParameterValue('X') * 1;
                let x2 = v2.GetParameterValue('X') * 1;
                let ax1 = getAx(v1);
                let ax2 = getAx(v2);

                // Match columns and ensure they are on opposite faces
                if (nearlyEqual(x1, x2, 0.2) && !nearlyEqual(ax1, ax2, 10)) {
                    
                    let y1 = v1.GetParameterValue('Y') * 1;
                    let r1 = Math.round(v1.GetParameterValue('REPT') * 1);
                    let y2 = v2.GetParameterValue('Y') * 1;
                    let r2 = Math.round(v2.GetParameterValue('REPT') * 1);
                    let spc = v1.GetParameterValue('SPCNG') * 1;

                    let top1 = y1;
                    let bot1 = y1 - ((r1 - 1) * spc);
                    let top2 = y2;
                    let bot2 = y2 - ((r2 - 1) * spc);

                    let overlapTop = Math.min(top1, top2);
                    let overlapBot = Math.max(bot1, bot2);

                    // Ensure there is a enough overlap
                    if (overlapTop > overlapBot + 0.01) {
                        let overlapCount = Math.round((overlapTop - overlapBot) / spc) + 1;

                        // Set V2 as the through-hole
                        v2.SetParameter('Y', overlapTop);
                        v2.SetParameter('REPT', overlapCount);
                        v2.SetParameter('DZ', panelThickness);
                        
                        // Mirror to keep work plane consistent
                        v2.SetParameter('AX', v2.GetParameterValue('AX') - 180);
                        if (v2.GetParameterValue('AX') < -180) v2.SetParameter('AX', 0);
                        v2.SetParameter('AZ', v2.GetParameterValue('AZ') - 180);
                        if (v2.GetParameterValue('AZ') < -180) v2.SetParameter('AZ', 0);
                        
                        v2.SetParameter('Z', v2.GetParameterValue('Z') - panelThickness);
                        if (v2.GetParameterValue('Z') < 0) v2.SetParameter('Z', panelThickness);

                        // Adjust V1 (remnant)
                        if (top1 > overlapTop + 0.1) {
                            // Remnant is above the new through-hole
                            v1.SetParameter('Y', top1);
                            v1.SetParameter('REPT', Math.round((top1 - overlapTop) / spc));
                            v1.SetParameter('DZ', 0.5);
                            v1.SetParameter('USER_Processed', 1);
                        } else if (bot1 < overlapBot - 0.1) {
                            // Remnant is below the new through-hole
                            v1.SetParameter('Y', overlapBot - spc);
                            v1.SetParameter('REPT', Math.round((overlapBot - bot1) / spc));
                            v1.SetParameter('DZ', 0.5);
                            v1.SetParameter('USER_Processed', 1);
                        } else {
                            // No remnant remains
                            v1.SetParameter('QTY', 0);
                            v1.SetParameter('USER_Processed', 1);
                        }
                        
                        // V1 is now handled.
                        break; 
                    }
                }
            }
        }
    }
    pt = pt.GetNextSibling();
}
