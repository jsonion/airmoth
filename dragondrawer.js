class DragOnDrawer {
	static selector;
	static tplMatch;
	static template;
	static placeholder;

	container; width; height;

	handleSize; scaleOnDrag;

	touchpointHighlightColor;

	stack = [];
	constructor () {
		this.handleSize = {
			width:  handleSize.width  || 22,
			height: handleSize.height || 22,

			lineWidth:   handleSize.lineWidth   || 12,
			lineHeight:  handleSize.lineHeight  || 1,
			lineSpacing: handleSize.lineSpacing || 3,
		};

	  this.scaleOnDrag
	     = Math.abs(parseInt(scaleOnDrag));

		this.touchpointHighlightColor
		   = this.hex2rgb(touchpointHighlightColor);
	}

  // override
	applyTransforms(){}


	callbacks={
		  click: (e)=>this.onClick.apply(this, e),
		release: (e)=>this.onRelease.apply(this, e),
		 onDrag: (e)=>this.onDrag.apply(this, e),

		 resize: (e)=>this.onResize.apply(this, e),
	};
 
	wrap ({
		element, innerHTML, before, after, i, lockTo
	}) {
		if (!element && !innerHTML)
		throw "";

	 /////
		let wrap = this.template.content
		                        .cloneNode(true);
		if (element)
				wrap.children[0]
		    		.children[1].appendChild(element);
		else
				wrap.children[0]
			      .children[1].innerHTML = innerHTML;
	 /////
		let { click, release } = this.callbacks;
		let [ btn ]
		    = wrap.getElementsByClassName("handle");

		btn.addEventListener("pointerdown", click);
		btn.addEventListener("pointerup", release);

		let index
	   =	this.place(wrap,{ before, after, i
	                                  lockTo });

		this.setHandle(btn, this.handleSize);

		return [index, wrap];
	}

	place (element,
		    { i, before, after, lockTo },
		                       ...data ) {
		//   parse index
		if (Number.isInteger(i)) {
		var index = i;

		if (index > this.stack.length)
				index = undefined,
				after = true;
		else
		if (index < 0) {
		if (index + this.stack.length < 0)
				index = undefined;
		else
				index = index + this.stack.length;
		}}

	  //  find element index
		if (typeof before === "object") {
				index = this.stack.findIndex(item =>
	                        before === item[0]);
				index = (index !== -1)
				      ?  index : null;
		}
		else
		if (typeof after === "object") {
				index = this.stack.findIndex(item =>
	                         after === item[0]);
				index = (index !== -1)
				      ?  index + 1 : null;
		}
		else
	  //  get neighbor elements
		if (typeof index === "number") {
		if (before === true)
				before = this.stack[index][0];
		else
		if (after === true)
				after = this.stack[index][0];
		}

		let section=[ element, data ];
	 /////
		if (typeof index !== "number") {
		if (before === true)
				this.container.prependChild(element),

				index = 0;
		else
				this.container.appendChild(el),

				index = this.stack.length - 1;
		}
		else
		if (before)
		this.container.insertBefore(wrap, before);

		else
		if (after)
		this.container.insertAfter(wrap, after);

		else return console.error("");

	   ///////

		this.stack
		    .splice(index, 0, section);

		if (!before)
			   before = this.stack[index-1][0];

		if (!after)
			   after = this.stack[index-1][0];

		this.applyStyle(section, {prev: before,
			                        next: after });
		return index;
	}

	unlink (element, index=0) {
		if (!Number.isInteger(index)
		|| (element !== this.stack[index][0]))
				 index
			 = this.cards.findIndex(el =>
                  element === el[0]);
		var data;
		if (index !== -1)
		    data
		  = this.cards.splice(index,1)[0].slice(1);

		return data;
	}

	setHandle (burger, resize, zIndex=null) {
		let container = burger.parentElement;
		let [ outline, icon ]=burger.children;

		let { width, height,
	  	lineWidth, lineHeight, lineSpacing }
	  	                          = resize;

		if (typeof zIndex !== "number")
				zIndex
			= resize.zIndex &&
			  resize.zIndex[container] ||
	     (resize.zIndex[container]
	    =   this.zIndex(container));

		let [ outline, icon ]=elem.children;

		outline.style.width  = width;
		outline.style.height = height;

		icon.setAttribute("width",  width);
		icon.setAttribute("height", height);

		var x = (width - lineWidth) / 2;
		var y = (height
		      -  lineHeight  * 3
		      -  lineSpacing * 2) / 2;

		var i=0;
		for (let el of icon.children) {
				 y += i * lineSpacing;

				 el.setAttribute("x", x);
				 el.setAttribute("y", y);
				 el.setAttribute("width",  lineWidth);
				 el.setAttribute("height", lineHeight);

				 i++;
		}

		if (typeof zIndex === "number")
				outline.style["z-index"] = zIndex,
				   icon.style["z-index"] = zIndex;
	}

	static element (selector) {
		let elem = document.querySelector(selector);
		if (typeof elem === "object")
				return elem;

		else throw "";
	}
}
