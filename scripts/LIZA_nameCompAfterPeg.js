/* 

ToonBoom Harmony script by Liza Desya

Use this script to quickly name composites by grabbing related peg names and slightly adjusting syntax.

To use the script, you must select one peg and one composite. If your selection does not fit these rules,
the script will fail. By running the script, a slightly altered peg's name will be applied to the composite.
If you wish to change the alteration, look at the "addedSyntax" and "removedSyntax" variables under
LIZA_nameCompAfterPeg(). 

Find more ToonBoom scripts at https://github.com/LizaDesya/toonboom-scripts
Contact me through LizaDesya.com
To see more of my work, follow @LizaDesya on Instagram

*/


function LIZA_nameCompAfterPeg(){
	// Insert naming structure that you want to apply to the
	// new composite name. 
	var addedSyntax = "-C";
	var removedSyntax = "-P";


	var exeDialog = new private_exeDialog();

	scene.beginUndoRedoAccum("LIZA_nameCompAfterPeg");

	exeDialog.main(addedSyntax, removedSyntax);
	  
	scene.endUndoRedoAccum("LIZA_nameCompAfterPeg");
	
  }

function private_exeDialog(){
 
	this.main = function(addedSyntax, removedSyntax){

		// Make sure only two nodes are selected
		if(selection.numberOfNodesSelected() == 2)
	 	{
			var  selectionNodes = selection.selectedNodes(0);
			var nodeArray = new Array()

			// expected array orders
			var ExpectedPattern = ["COMPOSITE", "PEG"]
			
			// array of the nodes, sorted into the expected order (if correct nodes are selected)
			nodeArray.push(node.type(selectionNodes[0]), node.type(selectionNodes[1]));
			nodeArray.sort();
			MessageLog.trace(nodeArray);

			// check if node array and expected array are the same
			if (this.isEqual(nodeArray, ExpectedPattern) === true){
				// find the composie and peg in the original selected nodes array
				for (var i = 0; i < selectionNodes.length; ++i){
					if (node.type(selectionNodes[i]) === "COMPOSITE"){
						var comp = selectionNodes[i];
					} else {
						var peg = selectionNodes[i];
					}
				  }
			} else {
				MessageLog.trace("Please select one peg and one composite.")
				return;
			}

			this.rename(comp, peg, addedSyntax, removedSyntax);

		} else{
			MessageLog.trace("Please select one peg and one composite.")
				return;
		}	
	}

	this.isEqual = function(nodeArray, ExpectedPattern){
		for (var i = 0; i < nodeArray.length; ++i) {
			if (nodeArray[i] !== ExpectedPattern[i]) return false;
		  }
		  return true;
	}


	this.concatenate = function(pegName, synAdd, synRemove){
		if (pegName.search(synRemove) === -1){
			compName = pegName + synAdd;
		}

		else{
			var compName = pegName.replace(synRemove, synAdd);
		}
		return compName
	}


	this.rename = function(comp, peg, addedSyntax, removedSyntax){
		var pegName = node.getName(peg);
		var compName = this.concatenate(pegName, addedSyntax, removedSyntax);
				
		if( node.rename(comp, compName) == false ){
			var compName = compName + "_";
			var suffixIndex = 1;
			for( ;suffixIndex  < 100;  suffixIndex++ )
				{
				var compName = compName + suffixIndex;
				if (node.rename(comp,  compName) == true )
				{
					break;
				}
					var compName = compName.replace(suffixIndex, "");
				}  
			}
		}
	}


