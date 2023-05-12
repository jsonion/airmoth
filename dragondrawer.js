class DragonDrawer {
  static template; template;
  static selector;
  static tplMatch=":scope > hr + div.container + div.gradient + div.handle + hr";
  static placeholder;

  container; width; height;

  handleSize; scaleOnDrag;

  touchpointHighlightColor;

  stack = [];
  constructor ({

  }) {
    if (container instanceof HTMLElement)
    this.container = container;

    else throw "";

    this.template = eval(this.constructor.name)
        .template;

    this.handleSize = {
      width:  handleSize.width  || 22,
      height: handleSize.height || 22,

      lineWidth:   handleSize.lineWidth   || 12,
      lineHeight:  handleSize.lineHeight  || 1,
      lineSpacing: handleSize.lineSpacing || 3,
    };

    if ((scaleOnDrag))
    this.scaleOnDrag
       = Math.abs(parseInt(scaleOnDrag));

    if ((touchpointHighlightColor))
    this.touchpointHighlightColor
       = this.hex2rgb(touchpointHighlightColor);

    if (typeof animatingClass === "string")
    this.animatingClass = animatingClass;
  }

  //  override
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
     =  this.place(wrap,{ before, after, i
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
    //  get next and prev items
    if (typeof index === "number") {
    if (before === true)
        before = this.stack[index][0];
    else
    if (after === true)
        after = this.stack[index][0];
    }

    let section=[ element, data ]; i=0;
   /////
    if (typeof index === "number") {
    if (before)
    this.container.insertBefore(element, before);

    else
    if (after)
    this.container.insertAfter(element, after);

    }
    else
    //  append before or after all contents
    if (before === true)
        this.container.prependChild(element),

        index = 0;
    else
    if (after === true)
        this.container.appendChild(element),

        index = this.stack.length - 1;
    else
    //  match siblings in class and container
    if (typeof before === "object")
    for (let el of this.container.children) {
      if (el === this.stack[i]) i++;
      else
      if (el === before) {
          index = i;
          before = null;
          break;
      }
    }
    else
    if (typeof after === "object")
    for (let el of this.container.children) {
      if (el === this.stack[i]) i++;
      else
      if (el === after) {
          index = i;
          after = null;
          break;
      }
    }

    else return console.error("");

     ///////

    this.stack
        .splice(index, 0, section);

    if (!before)
         before = this.stack[index-1][0];

    if (!after)
         after = this.stack[index+1][0];

    return [i, [wrap, before, after]];
  }

  unlink (element, index=0) {
    if (!Number.isInteger(index)
    || (element !== this.stack[index][0]))
         index
       = this.stack.findIndex(el =>
                              el[0]===element);
    var data;
    if (index !== -1)
        data
      = this.stack.splice(index,1)[0].slice(1);

    return data;
  }

  setHandle (burger, resize, zIndex=null) {
    let [ outline, icon ]=burger.children;
    let container = burger.parentElement;

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

  chainStyle (element,
        args={ i:null, prev:null, next:null }) {

    var isSingleRow, 
      { i,prev,next }=args;
   /////
    if (i === null) {
        i = this.stack.findIndex(obj =>
                     element === obj[0]);
    if (i > 0
    &&  prev === null)
        prev = this.stack[i-1][0];

    if (next === null
    &&     i < this.stack.length - 1)
        next = this.stack[i+1][0];

        isSingleRow = true;
    }

    let spacers
      = element.getElementsByTagName("hr"),
   _1 = spacers.length - 1;

        spacers[0].className="";
        spacers[_1].className="";

    //  block start
    if (element === this.container.children[0])
        spacers[0].classList.add("block-start");
    else
    if (i === 0)
        spacers[0].classList.add("block-start", "divider-before");

    //  ... in block body
    if (prev) {
    let prev_ = prev.getElementsByTagName("hr");

        prev_[prev_.length-1].className="";

    if (prev !== section.previousElementSibling)
        prev_[prev_.length-1]
            .classList.add("divider-after"),

        spacers[0]
            .classList.add("divider-before");
    }

    //  ... next section, called outside of loop
    if (next) {
    let next_ = prev.getElementsByTagName("hr");

        next_[0].className="";

    if (next !== section.nextElementSibling)
        next_[0]
            .classList.add("divider-before"),

        spacers[spacers.length-1]
            .classList.add("divider-after");
    }

    //  block closing, better called once
    if (
        i === this.stack.length - 1) {
    if (element.nextElementSibling)
        spacers[_1].classList.add("block-end", "divider-after");
    else
        spacers[_1].classList.add("block-end");
    }
  }

  onComponentWillUnmount() {
    if (this.refreshOnResize)
      window.removeEventListener("resize",
        this.callbacks.resize);

    let burgerCls = this.
                   .template
                   .children[1].className;

    let q = `:scope > .${burgerCls}`;
    let subset
      = this.container.querySelectorAll(q);

    for (let handle of subset) {
      handle.remove();
    }
  }

  static element (selector) {
    let elem = document.querySelector(selector);
    if (typeof elem === "object")
        return elem;

    else throw "";
  }

 /////////////
//  imports
    zIndex = jsonion.zIndexBounds;
}

function zIndexBounds (container) {
  var zIndex=0;

  if (container.style
  &&  container.style.zIndex)
      zIndex = container.style.zIndex;

  if (container.children
  &&  container.children.length)
  for (let elem of container.children) {
   if (elem.style.zIndex > zIndex)
       zIndexMin = elem.style.zIndex;
  }

  return zIndex;
}

function getBackgroundColor (elem) {
  let result={};

  let props=["background-color"], mod=[],
  len=props.length;

  do {
    let styles=window.getComputedStyle(elem);

    mod.length=0;
    for (var [i, prop] of props.entries()) {
         let val=styles.getPropertyValue(prop);

         if (val && val !== "none")
         prop
       = prop.replace(/^./,  str =>
                             str.toUpperCase())
             .replace(/-./g, str =>
                             str.substring(1)
                                .toUpperCase()),
         result[prop] = val,
            mod.unshift(i);
    }

    if (mod.length
    &&  mod.length < props.length)
        mod.forEach(i => props.splice(i,1));

    else
    if (element.parentElement)
        element = element.parentElement;

    else break;
  } while (true)

  if (len !== props.length)
  return result;
}
