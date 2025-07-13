/* 

ToonBoom Harmony script by Liza Desya

Simply run the script, and it will search throughout the entire scene and change all composite attributes.
Best for changing composites to Passthrough mode.
You can edit which node type and attribute it changes down below.

Find more ToonBoom scripts at https://github.com/LizaDesya/toonboom-scripts
Contact me through LizaDesya.com
To see more of my work, follow @LizaDesya on Instagram

*/

function makeAllCompositesPassthrough(){
    // "Top" is the encompasing group of the scene. You can change this a specific group in the scene
   //  by writing the group name in the quotation marks instead of "Top"
    var startGroup = "Top";
   // This is the node that needs to be changed. Right now it's composite, but it can be changed to
   // "PEG" or "READ" (drawing node) for other needs.
    var changeNode = "COMPOSITE";
   // This is the attribute that needs to be changed. 
    var changeAttribute = "compositeMode";
   // This is the attribute that the nodes needs to carry.
    var changeAttributeTo = "compositePassthrough";


    var num = node.numberOfSubNodes(startGroup);
	
	MessageLog.trace("Changing "+changeNode+" nodes to "+changeAttributeTo)
	scene.beginUndoRedoAccum("private_traverseNodes")
        private_traverseNodes(startGroup, changeNode, num, changeAttribute, changeAttributeTo);
	MessageLog.trace("Node change finished.")
	scene.endUndoRedoAccum("private_traverseNodes")

	

}

function private_traverseNodes(groupName, changeNode, num, changeAttribute, changeAttributeTo){
    for (var  i = 0; i < num; i++){
      var subNode = node.subNode( groupName, i);
       if (node.type(subNode) == "GROUP"){
            var groupNum = node.numberOfSubNodes(subNode);
            private_traverseNodes(subNode, changeNode, groupNum, changeAttribute, changeAttributeTo);
        }

        if (node.type(subNode) == changeNode){
            private_setCompType(subNode, changeAttribute, changeAttributeTo);
        }
    }
}

function private_setCompType(n, changeAttribute, changeAttributeTo){
    node.setTextAttr(n, changeAttribute, frame.current(), changeAttributeTo);
}

