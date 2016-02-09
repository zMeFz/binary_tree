'use strict';

class BinaryTree {

	constructor() {
		this.root = null;
	}

	insert(data) {

		var node = {
                data: data,
                left: null,
                right: null
            }, current;

        if (this.root === null){
            this.root = node;
        } else {
            current = this.root;

            while(true){

                if (data < current.data){

                    if (current.left === null){
                        current.left = node;
                        break;
                    } else {
                        current = current.left;
                    }

                } else if (data > current.data){

                    if (current.right === null){
                        current.right = node;
                        break;
                    } else {
                        current = current.right;
                    }       

                } else {
                    break;
                }
            }
        }
	}

	contains(data) {

		var current = this.root

        while(current){
            if (data < current.data){
                current = current.left;

            } else if (data > current.data){
                current = current.right;

            } else {
                return true;
            }
        }

        return false;

	}

	remove(data) {

		var found = false,
            current = this.root,
            parent = this.root,
            last_direction;

        while(!found && current){

            if (data < current.data){
				
				last_direction = "left";            	
            	parent = current;
                current = current.left;

            } else if (data > current.data){
                
				last_direction = "right";
                parent = current;
                current = current.right;

            } else {
                found = true;
            }
        }

        if (found){

        	if ( current == this.root ) {

        		this.root = null;
        		return;
        	
        	} else {

				parent[last_direction] = null;

                var queue = [];

                if ( current.left )
                    queue.push( current.left )
                
                if ( current.right )
                    queue.push( current.right )

                while ( queue.length ) {

                   	current = queue.shift();
                    
                    this.insert( current.data );
                    if ( current.left )
                        queue.push( current.left )
                    
                    if ( current.right )
                        queue.push( current.right )
                
                }

        	}
        }
	}

	size() {

        var length = 0;

        this.traverse(function(node){
            length++;
        });

        return length;
	}

	isEmpty() {
		if (!this.root)
			return true;
		else
			return false;
	}

	traverse(process){

        function inOrder(node){
            if (node){

                if (node.left !== null){
					inOrder(node.left);
                }            

                process.call(this, node);

                if (node.right !== null){
					inOrder(node.right);
                }
            }
        }

        inOrder(this.root);
    }
}
