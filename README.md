# Liza's Toonboom Scripts

## Installation

Follow the instructions in [ToonBoom's Importing Scripts Article](https://learn.toonboom.com/modules/column-scripts-and-key-animation/topic/importing-scripts1) to install these scripts.

## Scripts

### Name Composite After Peg

Use this script to quickly name composites by grabbing related peg names and slightly adjusting syntax.

To use the script, you must select one peg and one composite. If your selection does not fit these rules, the script will fail. By running the script, a slightly altered peg's name will be applied to the composite. If you wish to change the alteration, look at the `addedSyntax` and `removedSyntax` variables under `LIZA_nameCompAfterPeg()`.

### Make All Composites Passthrough

Run the script to search the entire scene and change all composite attributes. Best for changing composites to Passthrough mode. You can edit which node type and attribute it changes in the script.

### Plug Down

Takes a selection of nodes, and plugs them down into the lowest node in the group. This works best when creating a large amount of drawing nodes and you need to plug them into a fresh composite. 

The script is non-specific to the node it plugs into. You can plug nodes into cutters, drawings, layer-art dividers, etc. If there is a node on the other side of the rig that you need to plug down into, it might be more efficient to select them both and let it auto link, instead of dragging across the screen. 
