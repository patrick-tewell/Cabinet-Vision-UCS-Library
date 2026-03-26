//*** Applies to each CAB OBJ_ASSEMBLY ***

// This exists due to a system bug where cabinets meet closet class assemblies (specifically panels)
// Reveals were all set to 1/4" yet being set to 0 in these instances

if (_cab.CLASS === ASM_CLASS_CLOSET) return;

const sideReveal = 0.25;

_cab.SetParameter('REVL', sideReveal);
_cab.SetParameter('REVR', sideReveal);
