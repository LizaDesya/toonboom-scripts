/* 

ToonBoom Harmony script by Liza Desya

Takes a selection of nodes, and plugs them down into the lowest node in the group.
This works best when creating a large amount of drawing nodes and you need to plug them
into a fresh composite. 

However, the script is non-specific to the node it plugs into. You can plug nodes into cutters,
drawings, layer-art dividers, ect. So if there is a node on the other side of the rig that you need
to plug down into, it might be more efficient to select them both and let it auto link, instead of 
dragging across the screen. 

Find more ToonBoom scripts at https://gumroad.com/lizadesya
Contact me through LizaDesya.com
To see more of my work, follow @LizaDesya on Instagram and Twitter

*/

function LIZA_plugDown(){

    var functionName = "LIZA_plugDown"

	var exeDialog = new private_exeDialog();

	// undo and redo
	scene.beginUndoRedoAccum(functionName);

	// main function
	exeDialog.main();
	  
	scene.endUndoRedoAccum(functionName);
	
}

  function private_exeDialog(){
 
	this.main = function(){

		var selNodes = selection.selectedNodes(0);
		var plugNode = "";
		var infNode = false;
		
		// nodesarray: main array that will hold node info
		// order arrays: will hold coordinate that will later be sorted, which the
		// nodes array will reference
		var nodesArray = new Array;
        var nodesXOrder = new Array;
		var nodesYOrder = new Array;

		var infinteNodes = ["COMPOSITE", "MATTE_COMPOSITE", "PointConstraintMulti", "ImageSwitch"]
		var repeats = new Array;
		
		for (var i = 0; i < selNodes.length; i++){
			n = selNodes[i];

			// avoid all the move nodes because they can't plug into composites
		
			var nodeObj = {dir: n, x: node.coordX(n), y: node.coordY(n)}
			nodesArray.push(nodeObj);
            nodesXOrder.push((node.coordX(n)));
           	nodesYOrder.push((node.coordY(n)));
		}
		
		nodesXOrder.sort(function(a, b){return b-a});
		nodesYOrder.sort(function(a, b){return b-a});
		
		// find plug node by referencing the lowest coordinate point
		nodesArray.forEach(function (arrayItem) {
			if (arrayItem.y === nodesYOrder[0]){
				plugNode = arrayItem.dir;

				for (var i = 0; i < infinteNodes.length; i++){
					if (node.type(plugNode) === infinteNodes[i]){
						infNode = true;
					}
				}
			}	
		});

		// count exists so that only succesful indexes plug into the node
		var count = 0;
		for (var i = 0; i < nodesXOrder.length; i++){
			nodesArray.forEach(function (arrayItem) {

				var r = true;

				for (var y = 0; y < repeats.length; y++){
					if (arrayItem === repeats[y]){
						r = false;
					}
				}
				
				// checks if the node fits into the order, and if it isn't the plug node
				// to avoid tangling of connections
				if (arrayItem.x === nodesXOrder[i] && arrayItem.dir !== plugNode && r){

					// composites go by numberOfInputPorts because the number of inputs grows infinetely
					// this wouldnt work with nodes who have a finite number of inputs
					if (infNode){
						node.link(arrayItem.dir, 0, plugNode, (node.numberOfInputPorts(plugNode)));

					}
					 else {
						node.link(arrayItem.dir, 0, plugNode, count);
						count += 1;

					}

						// avoids nodes reiterating and plugging in again
						repeats.push(arrayItem); 
				}	
			});
		}
			// make it easier to organize newly plugged nodes
			selection.removeNodeFromSelection(plugNode);
	}
}



			  



