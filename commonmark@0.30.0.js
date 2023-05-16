/* commonmark 0.30.0 https://github.com/commonmark/commonmark.js @license BSD3 */
(function (global, factory) {

    (typeof exports === 'object' &&
     typeof module !== 'undefined')
  ?  factory(exports)
  : (typeof define === 'function' && define.amd)
  ?  define(['exports'], factory)
  : (global = global || self,
     factory(global.commonmark = {}));

}(this, (function (exports) { 'use strict';
const {createModuleCommonJS,
       getExport, unwrapExports, importDefault}
                            = factoryCommonJS();

// ---------------------------------------------

var CODE_INDENT
 = (typeof exports.codeIndent === "number")
         ? exports.codeIndent : 4;

function isContainer (node) {
    switch (node._type) {
      case "document":
      case "block_quote":
      case "list":
      case "item":
      case "paragraph":
      case "heading":
      case "emph":
      case "strong":
      case "link":
      case "image":
      case "custom_inline":
      case "custom_block":
            return true;
      default:
            return false;
    }
}

var Node = function (nodeType, sourcepos) {
    this._type = nodeType;
    this._parent = null;
    this._firstChild = null;
    this._lastChild = null;
    this._prev = null;
    this._next = null;
    this._sourcepos = sourcepos;
    this._lastLineBlank = false;
    this._lastLineChecked = false;
    this._open = true;
    this._string_content = null;
    this._literal = null;
    this._listData = {};
    this._info = null;
    this._destination = null;
    this._title = null;
    this._isFenced = false;
    this._fenceChar = null;
    this._fenceLength = 0;
    this._fenceOffset = null;
    this._level = null;
    this._onEnter = null;
    this._onExit = null;
};


  // -------------------------------------------
 //     A few touchpoints to keep an eye on
// ---------------------------------------------

 ///////////////////////////////////////////
//  html tag attributes renderer function 
function attrs (node) {
    var att = [];
    if (this.options.sourcepos) {
        var pos = node.sourcepos;
        if (pos) {
            att.push([
                "data-sourcepos",
                String(pos[0][0]) +
                    ":" +
                    String(pos[0][1]) +
                    "-" +
                    String(pos[1][0]) +
                    ":" +
                    String(pos[1][1])
            ]);
        }
    }
    return att;
}


 //////////////////////////
//  text parser function
var text = function (s) {
    var node = new Node("text");
    node._literal = s;
    return node;
};

 /////////////////////////////////////////////
//  normalize a reference in reference link 
/*  parse string content in block
 -  remove []s,
 -  trim,
 -  collapse internal space,
 -  unicode case fold
 … see commonmark/commonmark.js#168
...                                        */
var normalizeReference = function (string) {
    return string
        .slice(1, string.length - 1)
        .trim()
        .replace(/[ \t\r\n]+/, " ")
        .toLowerCase()
        .toUpperCase();
};

////////////////////////////////////////////////

var { entities, legacy, xml, code_points,

      encode_unsafe: encodeUnsafe,
      encode,
      decode,
      decodeHTML,

      unescapeChar,
      unescapeString,
      normalizeURI,
      replaceUnsafeChar,
      escapeXml,

      polyfills } = exportLib();

var fromCodePoint = polyfills.fromCodePoint;
                    polyfills.stringRepeat();

var unescapeChar = function (s) {
    if (s.charCodeAt(0) === C_BACKSLASH)
        return s.charAt(1);
    else
        return lib.decodeHTML(s);
};

var unescapeString = function (s) {
    if (!rx.backslashOrAmp.test(s))
        return s;
    else
        return s.replace(rx.entityOrEscapedChar, unescapeChar);
};

var normalizeURI = function(uri) {
    try {
        return encodeUnsafe(uri);
    } catch (err) {
        return uri;
    }
};

var replaceUnsafeChar = function(s) {
    switch (s) {
        case "&":
            return "&amp;";
        case "<":
            return "&lt;";
        case ">":
            return "&gt;";
        case '"':
            return "&quot;";
        default:
            return s;
    }
};

var escapeXml = function (s) {
    if (!rx.xmlSpecial.test(s))
        return s;
    else
        return s.replace(rx.xmlSpecial, replaceUnsafeChar);
};

Object.defineProperty(exports, '__esModule',
                              { value: true });
exports.Node = Node;
exports.Parser = Parser;
exports.Renderer = Renderer;
exports.XmlRenderer = XmlRenderer;
exports.HtmlRenderer = HtmlRenderer;

exports.lib = createModuleCommonJS(exportLib);

////////////////////////////////////////////////

var NodeWalker = function (root) {
  return { current: root,
           root: root,
           entering: true,
           next: next,
           resumeAt: resumeAt };

  function resumeAt (node, entering) {
    this.current = node;
    this.entering = entering === true;
  }

  function next() {
    var cur = this.current;
    var entering = this.entering;

    if (cur === null)
        return null;

    var container = isContainer(cur);
    if (container && entering) {
        if (cur._firstChild)
            this.current = cur._firstChild,
            this.entering = true;
        else
        // stay on node but exit
        this.entering = false;
    }
    else
    if (cur === this.root)
        this.current = null;

    else
    if (cur._next === null)
        this.current = cur._parent,
        this.entering = false;

    else
    this.current = cur._next,
    this.entering = true;

    return { entering: entering, node: cur };
}};

(function walkingTree() {
  let proto = Node.prototype;

  const appendChild = function (node) {
        node.unlink();
        node._parent = this;

    if (this._lastChild)
        this._lastChild._next = node,
        node._prev = this._lastChild,
        this._lastChild = node;
    else
        this._lastChild  =
        this._firstChild = node;
  };

  const prependChild = function (node) {
        node.unlink();
        node._parent = this;

    if (this._firstChild)
        this._firstChild._prev = node,
        node._next = this._firstChild,
        this._firstChild = node;
    else
        this._lastChild  =
        this._firstChild = node;
  };

  const unlink = function() {
    if (this._prev)
        this._prev._next= this._next;
    else
    if (this._parent)
        this._parent._firstChild = this._next;

    if (this._next)
        this._next._prev = this._prev;
    else
    if (this._parent)
        this._parent._lastChild = this._prev;

        this._next   =
        this._prev   =
        this._parent = null;
  };

  const insertAfter = function (node) {
        node.unlink();
        node._next = this._next;

    if (node._next)
        node._next._prev = node;

        node._prev = this,
        this._next = node,
        node._parent = this._parent;

    if (!node._next)
         node._parent._lastChild = node;
  };

  const insertBefore = function (node) {
        node.unlink();
        node._prev = this._prev;

    if (node._prev)
        node._prev._next = node;

        node._next = this,
        this._prev = node,
        node._parent = this._parent;

    if (!node._prev)
         node._parent._firstChild = node;
  };

  Node.prototype.appendChild  = appendChild,
  Node.prototype.prependChild = prependChild,
  Node.prototype.unlink       = unlink,
  Node.prototype.insertAfter  = insertAfter,
  Node.prototype.insertBefore = insertBefore;

  let ENUM = { GET: 0, GET_SET: 1 },
      propGetterSetter = {
            type: ENUM.GET,

      firstChild: ENUM.GET,
       lastChild: ENUM.GET,

            next: ENUM.GET,
            prev: ENUM.GET,
  
          parent: ENUM.GET,
       sourcepos: ENUM.GET,
         literal: ENUM.GET_SET,
     destination: ENUM.GET_SET,
           title: ENUM.GET_SET,
            info: ENUM.GET_SET,
           level: ENUM.GET_SET,

        listType: ["_listData","type"],
       listTight: ["_listData","tight"],
       listStart: ["_listData","start"],
   listDelimiter: ["_listData","delimiter"],

         onEnter: ENUM.GET_SET,
          onExit: ENUM.GET_SET,

     isContainer: function() {
     return isContainer(this);
  }};

  Object.entries(propGetterSetter)
        .forEach(([key,prop]) => {
   ////
    if (prop === ENUM.GET_SET)
    Object.defineProperty(proto, key,{ get,
                                       set });
    else
    if (typeof prop === "number")
    Object.defineProperty(proto, key,{ get });

    function get() {
      return this["_"+key];
    }

    function set (s) {
      this["_"+key] = s;
    }

   ////
    if (typeof prop === "object")
    Object.defineProperty(proto, key,{
      get: getLevel2,
      set: setLevel2,
    });

    function getLevel2() {
      return this[prop[0]][prop[1]];
    }

    function setLevel2(s) {
      this[prop[0]][prop[1]] = s;
    }

   ////
    if (typeof prop === "function")
    Object.defineProperty(proto, key, prop);
  });
}());

Node.prototype.walker = function() {
    var walker = new NodeWalker(this);
    return walker;
};
/*  ///////////////////////////////////////  ///

          Example of use of walker:
        var event, walker = w.walker();

        while (event = walker.next())
        event.entering, event.node.type

///  /////////////////////////////////////  //*/

var C_NEWLINE = 10;
var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_BACKTICK = 96;
var C_OPEN_BRACKET = 91;
var C_CLOSE_BRACKET = 93;
var C_LESSTHAN = 60;
var C_BANG = 33;
var C_BACKSLASH = 92;
var C_AMPERSAND = 38;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var C_COLON = 58;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;

var CODE_INDENT = 4;

var C_TAB = 9;
var C_NEWLINE = 10;
var C_GREATERTHAN = 62;
var C_LESSTHAN = 60;
var C_SPACE = 32;
var C_OPEN_BRACKET = 91;

const rx = (function regularExpressions() {
  let { htmlTag, backslashOrAmp, entityOrEscapedChar, xmlSpecial, linkDestination, escapable, entityHere, ticks, ticksHere, ellipses, dash, emailAutolink, autolink, linkTitle, linkLabel, whitespaceChar, unicodeWhitespaceChar, finalSpace, initialSpace, spaceAtEndOfLine, spnl, nonSpace, punctuation, decodeHtml, xmlTag, main, num, nonAscii, htmlBlockOpen, htmlBlockClose, thematicBreak, orderedListMarker, bulletListMarker, ATXHeadingMarker, codeFence, closingCodeFence, setextHeadingLine, lineEnding, unsafeProtocol, safeDataProtocol, maybeSpecial, debugOffset, __debugOffset }
    = getRegularExpressions();

 //////////////////////////////
  const rx = {        htmlTag,
               backslashOrAmp,
          entityOrEscapedChar,
                   xmlSpecial,
              linkDestination,
                    escapable,
                   entityHere,
                        ticks,
                    ticksHere,
                     ellipses,
                         dash,
                emailAutolink,
                     autolink,
                    linkTitle,
                    linkLabel,

               whitespaceChar,
        unicodeWhitespaceChar,
                   finalSpace,
                 initialSpace,
             spaceAtEndOfLine,
                         spnl,
                     nonSpace,
                  punctuation,

                   decodeHtml,
                       xmlTag,
                         main,

                         num,
                    nonAscii,

                htmlBlockOpen,
               htmlBlockClose,
                thematicBreak,
                 maybeSpecial,
            orderedListMarker,
             bulletListMarker,
             ATXHeadingMarker,
                    codeFence,
             closingCodeFence,
            setextHeadingLine,
                   lineEnding,

               unsafeProtocol,
             safeDataProtocol,
   ////////////////////////////
    pick: function (...objKeys) {
        let allKeys = Object.keys(this);

        var result = {};
        for (let key of objKeys) {
         if (allKeys.indexOf(key) !== -1)
             result[key] = this[key];
        }

        return result;
    },
    debugOffset,
  __debugOffset,
  };

  Object.entries(rx).forEach(([key,regexp]) => {
    if (key !== "debugOffset"
    &&  key !== "__debugOffset")
    Object.defineProperty(rx, key,  {
      match: function (str) {
        let res = regexp.match(str);

        if (res
        &&  rx.debugOffset
        &&  rx.debugOffset[0] > rx.i
        &&  rx.debugOffset[1] < rx.i) {
            rx.debugOffset[2] = 
            rx.debugOffset[2] + 1,
            console.trace(`rx.${key}.match(${str})`);
        }

        return regexp.match(str);
      },
      get: function(){
        if (rx.debugOffset
        &&  rx.debugOffset[0] > rx.i
        &&  rx.debugOffset[1] < rx.i) {
            rx.debugOffset[2] = 
            rx.debugOffset[2] + 1,
            console.trace(`rx.${key}`);
        }

        return regexp;
      },
    }),
    rx["_"+key] = regexp;
  });

  Object.defineProperty(rx, "debugOffset", {
    set: function (indexArr) {
      if (indexArr instanceof Array
      &&  indexArr.length === 3
      &&  indexArr.every(n =>
                  typeof n === "number"
                      && n === parseInt(n))
      &&  indexArr[0] <= indexArr[1])
      rx.__debugOffset = indexArr;
    },
    get: function(){
      return rx.__debugOffset;
    },
  });

  return rx;
}())


  // -------------------------------------------
 //
/*          The main parsing function
        … returns a parsed document AST
                                              
 */// ------------------------------------------

var parse = function(input) {
    this.doc = new Document();
    this.tip = this.doc;
    this.refmap = {};
    this.lineNumber = 0;
    this.lastLineLength = 0;
    this.offset = 0;
    this.column = 0;
    this.lastMatchedContainer = this.doc;
    this.currentLine = "";

    if (this.options.time)
        console.time("preparing input");

    var lines = input.split(reLineEnding);
    /// 0b01
    var len = lines.length;

    if (input.charCodeAt(input.length - 1)
                          === C_NEWLINE$1) {
    //  ignore last blank line
        len -= 1;
    }

    if (this.options.time)
        console.timeEnd("preparing input");
    if (this.options.time)
        console.time("block parsing");

    for (var i = 0; i < len; i++) {
        this.incorporateLine(lines[i]);
    }
    while (this.tip) {
        this.finalize(this.tip, len);
    }

    if (this.options.time)
        console.timeEnd("block parsing");
    if (this.options.time)
        console.time("inline parsing");

    this.processInlines(this.doc);

    if (this.options.time)
        console.timeEnd("inline parsing");

    return this.doc;
};


  // -------------------------------------------
 //
/*      InlineParser methods defined below 
     parsers try find match at current offset
   … on match: return inline, advance subject  
                                              
 */// ------------------------------------------

//  --------------------------------------------
//      InlineParser keeps track of position
//          in subject string to parse
//  --------------------------------------------
let inlineParser = void function index () {
    return { 
    subject, pos,
    match, peek,
    delimiters, brackets, spnl,
    scanDelims, handleDelim,
    refmap,
    parseBackticks,
    parseBackslash,
    parseAutolink,
    parseHtmlTag,
    parseLinkTitle,
    parseLinkDestination,
    parseLinkLabel,
    parseOpenBracket,
    parseBang,
    parseCloseBracket,
    addBracket,
    removeBracket,
    parseEntity,
    parseString,
    parseNewline,
    parseReference,
    parseInline,
    processEmphasis,
    removeDelimiter,
    options,
    parseInlines
}};

/*  advance position in subject, return match
///                                         */
var match = function (re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null)
        return null;
    else
        this.pos += m.index + m[0].length;
        return m[0];
};

/*  character code at current position, or -1
///                                         */
var peek = function() {
    if (this.pos < this.subject.length)
    return this.subject.charCodeAt(this.pos);

    else return -1;
};

/*  parse zero or more space characters
    … including at most one newline  
///                               */
var spnl = function() {
    this.match(rx.spnl);
    return true;
};


 ////////////////////////////////////////////
//  parse backticks (code span or literal)
var parseBackticks = function (block) {
var ticks = this.match(rx.ticksHere);
if (ticks === null)
    return false;

var posAfter = this.pos;
var matched;
var node;
var contents;

while (matched = this.match(rx.ticks)) {
   if (matched !== ticks) continue;

    node = new Node("code");
    contents
  = this.subject
        .slice(posAfter, this.pos-ticks.length)
        .replace(/\n/gm, " ");

    if (contents.length > 0
    &&  contents.match(/[^ ]/)
    &&  contents[0] == " "
    &&  contents[contents.length - 1] === " ")
        node._literal
      = contents.slice(1, contents.length - 1);

    else
    node._literal = contents;
    
    block.appendChild(node);
    return true;
}

//  unmatched closing backtick sequence
    this.pos = afterOpenTicks;
    block.appendChild(text(ticks));
    return true;
};


  //////////////////////////////////////////////
 // parse backslash-escaped special character
//  … escaped character literal or hard break
var parseBackslash = function (block) {
var subj = this.subject,
    node;
    this.pos += 1;
if (this.peek() === C_NEWLINE) {
    this.pos += 1;
    node = new Node("linebreak");
    block.appendChild(node);
}
else
if (rx.escapable
   .test(subj.charAt(this.pos))) {
    block
   .appendChild(text(subj.charAt(this.pos)));

    this.pos += 1;
}
else
    block.appendChild(text("\\"));

    return true;
};


 ///////////////////////////////////
//  parse autolink (URL or email)
var parseAutolink = function (block) {
var m,
    dest,
    node;
if ((m = this.match(rx.emailAutolink))) {
    dest = m.slice(1, m.length - 1);
    node = new Node("link");
    node._title = "";
    node._destination = normalizeURI("mailto:"
                                      + dest);
    node.appendChild(text(dest));
    block.appendChild(node);
    return true;
}
else
if ((m = this.match(rx.autolink))) {
    dest = m.slice(1, m.length - 1);
    node = new Node("link");
    node._title = "";
    node._destination = normalizeURI(dest);
    node.appendChild(text(dest));
    block.appendChild(node);
    return true;
}
else
    return false;
};


 ////////////////////////
//  parse raw HTML tag
var parseHtmlTag = function (block) {
    var m = this.match(rx.htmlTag);
    if (m === null)
        return false;

    var node = new Node("html_inline");
    node._literal = m;
    block.appendChild(node);
    return true;
};


 //////////////////////////////////////////////
//  utility function for strong/emph parsing
var scanDelims = function (cc) {
var numdelims = 0,
    char_before, char_after, cc_after;
var startpos = this.pos;
var left_flanking, right_flanking,
    can_open, can_close;
var after_is_whitespace,
    after_is_punctuation,
    before_is_whitespace,
    before_is_punctuation;

if (cc === C_SINGLEQUOTE
||  cc === C_DOUBLEQUOTE)
    numdelims++,
    this.pos++;
else
while (this.peek() === cc) {
    numdelims++;
    this.pos++;
}

if (numdelims === 0)
    return null;

    char_before = (startpos === 0)
    ? "\n" : this.subject.charAt(startpos - 1);

    cc_after = this.peek();
if (cc_after === -1)
    char_after = "\n";
else
    char_after = fromCodePoint(cc_after);

    after_is_whitespace
  = rx.unicodeWhitespaceChar.test(char_after);

    after_is_punctuation
  = rx.punctuation.test(char_after);
    before_is_whitespace
  = rx.unicodeWhitespaceChar.test(char_before);

    before_is_punctuation
  = rx.punctuation.test(char_before);

    left_flanking = !after_is_whitespace  &&
                   (!after_is_punctuation ||
                    before_is_punctuation ||
                    before_is_whitespace);// …

    right_flanking = !before_is_whitespace  &&
                    (!before_is_punctuation ||
                       after_is_punctuation ||
                       after_is_whitespace);

    switch (cc) {
      case C_UNDERSCORE:
      can_open = (before_is_punctuation  ||
                        !right_flanking) &&
                          left_flanking,
      can_close = (after_is_punctuation  ||
                         !left_flanking) &&
                         right_flanking;

      case C_SINGLEQUOTE:
      case C_DOUBLEQUOTE:
      can_close = right_flanking;
      can_open = left_flanking && !right_flanking;

      default:
      can_open = left_flanking;
      can_close = right_flanking;
    }

    this.pos = startpos;
    return { numdelims: numdelims, can_open: can_open, can_close: can_close };
};


 //////////////////////////////////////////////
//  handle delimiter for emphasis or a quote
var handleDelim = function (cc, block) {
var res = this.scanDelims(cc);
if (!res) {
    return false;
}
var numdelims = res.numdelims,
    startpos = this.pos,
    contents;

    this.pos += numdelims;
if (cc === C_SINGLEQUOTE)
    contents = "\u2019";
else if (cc === C_DOUBLEQUOTE)
    contents = "\u201C";
else
    contents = this.subject.slice(startpos, this.pos);

var node = text(contents);
    block.appendChild(node);

//  add entry to delimiter stack for opener
if ((res.can_open || res.can_close)
&&  (this.options.smart
||  (cc !== C_SINGLEQUOTE
&&   cc !== C_DOUBLEQUOTE))) {
     this.delimiters = {
        cc: cc,
        numdelims: numdelims,
        origdelims: numdelims,
        node: node,
        previous: this.delimiters,
        next: null,
        can_open: res.can_open,
        can_close: res.can_close
     };
     if (this.delimiters.previous !== null)
         this.delimiters.previous.next
       = this.delimiters;
}
    return true;
};


 //////////////////////
//  remove delimiters
var removeDelimiter = function (delim) {
    if (delim.previous !== null)
        delim.previous.next = delim.next;

    //  top of stack
    if (delim.next === null)
        this.delimiters = delim.previous;
    else
        delim.next.previous = delim.previous;
};

var removeDelimitersBetween = function(bottom, top) {
    if (bottom.next !== top) {
        bottom.next = top;
        top.previous = bottom;
    }
};


 /////////////////////////////
//  process emph and strong
var processEmphasis = function (stack_bottom) {
var opener, closer, old_closer,
    opener_inl, closer_inl,
    tempstack,
    use_delims,
    tmp, next,
    opener_found,
    openers_bottom = [],
    openers_bottom_index,
    odd_match = false;

for (var i = 0; i < 8; i++) {
    openers_bottom[i] = stack_bottom;
}

//     find first closer above stack_bottom
       closer = this.delimiters;
while (closer !== null
   &&  closer.previous !== stack_bottom) {
       closer = closer.previous;
}

//     move forward, looking for closers
while (closer !== null) {
  var closercc = closer.cc;

  if (!closer.can_close) {
      closer = closer.next;
      continue;
  }

  //  found emphasis closer, find first opener
  opener = closer.previous;
  opener_found = false;

  switch (closercc) {
     case C_SINGLEQUOTE:
       openers_bottom_index = 0;

     case C_DOUBLEQUOTE:
       openers_bottom_index = 1;

     case C_UNDERSCORE:
       openers_bottom_index = 2;

     case C_ASTERISK:
       openers_bottom_index
     = 3 + (closer.can_open ? 3 : 0)
         + (closer.origdelims % 3);
  }

  while (opener !== null
     &&  opener !== stack_bottom
     &&  opener !==
         openers_bottom[openers_bottom_index]) {
     odd_match
   = (closer.can_open || opener.can_close)  &&
      closer.origdelims % 3 !== 0           &&
     (opener.origdelims + closer.origdelims) 
                        % 3 === 0;
     if (!odd_match
     &&  opener.can_open
     &&  opener.cc === closer.cc) {
         opener_found = true;
         break;
     }

     opener = opener.previous;
  }  old_closer = closer;

 ////
  if (closercc === C_SINGLEQUOTE) {
  if (opener_found)
      opener.node._literal = "\u2018";
      // …
      closer.node._literal = "\u2019";
      closer = closer.next;
  }
  else
 ////
  if (closercc === C_DOUBLEQUOTE) {
  if (opener_found)
      opener.node.literal = "\u201C";

      closer.node._literal = "\u201D";
      closer = closer.next;
  }
  else
 ////
  if (closercc === C_ASTERISK
  ||  closercc === C_UNDERSCORE) {
  if (!opener_found)
      closer = closer.next;

  else {
  //  calculate number of delimiters used
  use_delims = closer.numdelims >= 2
            && opener.numdelims >= 2 ? 2 : 1;

  opener_inl = opener.node;
  closer_inl = closer.node;

  //  remove used delimiters
  opener.numdelims -= use_delims;
  closer.numdelims -= use_delims;

  opener_inl._literal
= opener_inl._literal.slice(
      0, opener_inl._literal.length-use_delims
  );

  closer_inl._literal
= closer_inl._literal.slice(
      0, closer_inl._literal.length-use_delims
  );

  //  build contents for new emph element
  var emph = new Node(use_delims === 1 ?
                      "emph" : "strong");

  tmp = opener_inl._next;
  while (tmp && tmp !== closer_inl) {
      next = tmp._next;
      tmp.unlink();
      emph.appendChild(tmp);
      tmp = next;
  }

  opener_inl.insertAfter(emph);

  // remove elts between opener and closer
  removeDelimitersBetween(opener, closer);

  //  remove if opener has 0 delimiters
  if (opener.numdelims === 0)
      opener_inl.unlink(),
      this.removeDelimiter(opener);

  //  remove if closer has 0 delimiters
  if (closer.numdelims === 0)
      closer_inl.unlink(),
      tempstack = closer.next,
      this.removeDelimiter(closer),
      closer = tempstack;
  }}
 
 ////
  if (!opener_found) {
  //  set lower bound for next loop
      openers_bottom[openers_bottom_index]
         = old_closer.previous;

      if (!old_closer.can_open)
      //  remove closer that can't be opener
          this.removeDelimiter(old_closer);
  }}

  // remove all delimiters
  while (this.delimiters !== null
     &&  this.delimiters !== stack_bottom) {
         this.removeDelimiter(this.delimiters);
  }
};


 ////////////////////////////////////
//  parse link title (sans quotes)
var parseLinkTitle = function () {
    var title = this.match(rx.linkTitle);
    if (title === null)
        return null;
    else
    //  chop off quotes from title, unescape
        return unescapeString(title.substring(1, title.length - 2));
};


 ////////////////////////////
//  parse link destination
var parseLinkDestination = function() {
var res = this.match(rx.linkDestination);
if (res !== null)
//  chop off surrounding <..>:
    return normalizeURI(unescapeString(res.substr(1, res.length - 2)));

if (this.peek() === C_LESSTHAN)
    return null;

var savepos = this.pos; // …
var openparens = 0;
var c = true;

while ((c = this.peek()) !== -1) {
if (c === C_BACKSLASH) {
if (rx.escapable.test(this.subject
                          .charAt(this.pos+1)))
    this.peek();
}
else
if (c === C_OPEN_PAREN)
    openparens += 1;

else
if (c === C_CLOSE_PAREN) {
if (openparens >= 1)
    openparens -= 1;
else
    break;
}
else
if (rx
   .whitespaceChar
   .exec(fromCodePoint(c)) !== null)
    break;

    this.pos += 1;
}

if (this.pos == savepos && c != C_CLOSE_PAREN)
    return null;

if (openparens > 0)
    return null;

    res = this.subject.substring(savepos, this.pos);

    return normalizeURI(unescapeString(res)) || null;
};

/*  parse link label
    … returning string length
///                             */
var parseLinkLabel = function() {
    var m = this.match(rx.linkLabel);
    if (m === null || m.length > 1001) {
        return 0;
    } else {
        return m.length;
    }
};


  //////////////////////////
 // parse bracket openers
/*  
    add text node to block's children
    add open bracket to delimiter stack
///                                     */
var parseOpenBracket = function (block) {
var startpos = this.pos;
    this.pos += 1;

var node = text("[");
    block.appendChild(node);

    //  add entry to stack for this opener
    this.addBracket(node, startpos, false);
    return true;
};

/*  IF next character is [, and ! delimiter
///                                       */
var parseBang = function (block) {
var startpos = this.pos;
    this.pos += 1;
if (this.peek() === C_OPEN_BRACKET) {
    this.pos += 1;

    var node = text("![");
    block.appendChild(node);

    //  add entry to stack for this opener
    this.addBracket(node, startpos + 1, true);
}
else
    block.appendChild(text("!"));

    return true;
};


  ////////////////////////
 // parse close bracket
/*  match close bracket against an opener
    add link or image, or [ char to block
    on match: remove delimiter from stack
///                                       */
var parseCloseBracket = function(block) {
var startpos;
var is_img;
var dest;
var title;
var matched = false;
var reflabel;
var opener;

    this.pos += 1;
    startpos = this.pos;

//  get last [ or ![
    opener = this.brackets;

if (opener === null) {
//  no matched opener, just return a literal
    block.appendChild(text("]"));
    return true;
}

if (!opener.active) {
//  no matched opener, just return a literal
    block.appendChild(text("]"));
//  take opener off brackets stack
    this.removeBracket();
    return true;
}

 //  check to see if we have a link/image
//                            ------------
    is_img = opener.image; // may be opener
var savepos = this.pos;

//  inline link?
if (this.peek() === C_OPEN_PAREN) {
    this.pos++;
if (this.spnl()
&& (dest = this.parseLinkDestination())
&&  this.spnl()
//  make sure there's a space before title
&& ((rx.whitespaceChar
       .test(this.subject
                 .charAt(this.pos - 1)) &&
       (title = this.parseLinkTitle())) ||
                                  true)
&&  this.spnl()
&&  this.peek() === C_CLOSE_PAREN)
    matched = true,
    this.pos += 1;
else
    this.pos = savepos;
}
 
 //  next, see if there's a link label
//                         ------------
if (!matched) {
var beforelabel = this.pos;
var n = this.parseLinkLabel();
if (n > 2)
    reflabel = this.subject.slice(beforelabel,
                              n + beforelabel); // …
else
if (!opener.bracketAfter)
//  use first label as reference (!2nd label)
//  reference must not contain a bracket …
    reflabel = this.subject.slice(opener.index,
                                      startpos);
if (n === 0)
//  rewind if shortcut reference link
    this.pos = savepos;

if (reflabel) {
//  lookup rawlabel in refmap
var link = this.refmap[normalizeReference(reflabel)];
if (link)
    dest    = link.destination,
    title   = link.title,
    matched = true;
}}

if (matched) {
var node = new Node(is_img ? "image":"link");
    node._destination = dest;
    node._title = title || "";

var tmp, next;
    tmp = opener.node._next;

while (tmp) {
    next = tmp._next;
    tmp.unlink();
    node.appendChild(tmp);
    tmp = next;
}

 // remove this bracket and later delimiters
//             ---------         ------------
    block.appendChild(node);
    this.processEmphasis(opener
                        .previousDelimiter);

    this.removeBracket();
    opener.node.unlink();

 //  deactivate earlier link openers if link
//                     --------------
if (!is_img) {
       opener = this.brackets;
while (opener !== null) {
   if (!opener.image) {
        opener.active = false;
   }    opener = opener.previous    }}
       //////////////////////////
             return true;
}
else
//  no match
    this.removeBracket(); // remove opener …
    this.pos = startpos;
    block.appendChild(text("]"));

    return true;
};


 /////////////////
//  add bracket
var addBracket = function(node, index, image) {
    if (this.brackets !== null) {
        this.brackets.bracketAfter = true;
    }
    this.brackets = {
        node: node,
        previous: this.brackets,
        previousDelimiter: this.delimiters,
        index: index,
        image: image,
        active: true
    };
};


 ////////////////////
//  remove bracket
var removeBracket = function() {
    this.brackets = this.brackets.previous;
};


 ////////////////////////////////
//  attempt to parse an entity
var parseEntity = function (block) {
var m;
if (!(m = this.match(rx.entityHere)))
    return false;

    block.appendChild(text(decodeHTML(m)));
    return true;
};


 ///////////////////////////////////////
//  parse string or one markdown char
var parseString = function (block) {
var m;
if (m = this.match(rx.main)) {
if (this.options.smart)
    block.appendChild(
     text(m
     .replace(rx.ellipses, "\u2026")
     .replace(rx.dash, function(chars) {
        var enCount = 0;
        var emCount = 0;
        if (chars.length % 3 === 0)
        //  use all em dashes
            emCount = chars.length / 3;
        else
        if (chars.length % 2 === 0)
        //  use all en dashes
            enCount = chars.length / 2;
        else
        if (chars.length % 3 === 2)
        //  en dash for last 2
        //  em dashes for rest
            enCount = 1,
            emCount = (chars.length - 2) / 3;
        else
        //  en dashes for last 4 hyphens
        //  em dashes for rest
            enCount = 2,
            emCount = (chars.length - 4) / 3;

        return ("\u2014".repeat(emCount) +
                "\u2013".repeat(enCount));
        })
    ));
else 
    block.appendChild(text(m));
    return true;
}
else
    return false;
};


 ////////////////////////////////////////////
//  parse newline: soft or hard line break
var parseNewline = function (block) {
    this.pos += 1; // assume we're at a \n

//  check previous node for trailing spaces
var lastc = block._lastChild;
if (lastc
&&  lastc.type === "text"
&&  lastc._literal
   [lastc._literal.length - 1] === " ") {

var hardbreak = lastc._literal
               [lastc._literal.length - 2]  === " ";

    lastc._literal
  = lastc._literal.replace(rx.finalSpace, "");
    block.appendChild(new Node(hardbreak  ?
                              "linebreak" : 
                              "softbreak"));
}
else
    block.appendChild(new Node("softbreak"));

    this.match(rx.initialSpace); // gobble leading spaces in next line
    return true;
};


 ////////////////////////////////////////////
//  parse link reference, modifying refmap
var parseReference = function (s, refmap) {
    this.subject = s;
    this.pos = 0;

var rawlabel;
var dest;
var title;
var matchChars;
var startpos = this.pos;

//  label
    matchChars = this.parseLinkLabel();
if (matchChars === 0)
    return 0;
else {
    rawlabel = this.subject.substr(0, matchChars);
}

//  colon
if (this.peek() === C_COLON)
    this.pos++;
else {
    this.pos = startpos;
    return 0;
}

//  link url
    this.spnl();

    dest = this.parseLinkDestination();
if (dest === null) {
    this.pos = startpos;
    return 0;
}

var beforetitle = this.pos;
    this.spnl();
if (this.pos !== beforetitle)
    title = this.parseLinkTitle();
if (title === null) {
    title = "";
//  rewind before spaces
    this.pos = beforetitle;
}

//  … make sure we're at line end
var atLineEnd = true;
if (!this.match(rx.spaceAtEndOfLine)) {
if (title === "")
    atLineEnd = false;
else {
//  potential title found is not at line end
//  … discard the titlecan still be a legal link reference if we
//  discard the title
    title = "";
    // rewind before spaces
    this.pos = beforetitle;
    // and instead check if the link URL is at the line end
    atLineEnd = this.match(rx.spaceAtEndOfLine);
}}

if (!atLineEnd) {
    this.pos = startpos;
    return 0;
}

var normlabel = normalizeReference(rawlabel);
if (normlabel === "") {
    // label must contain non-whitespace characters
    this.pos = startpos;
    return 0;
}

if (!refmap[normlabel])
     refmap[normlabel] = { destination: dest, title: title };

    return this.pos - startpos;
};


  //////////////////////////////
 // parse next inline element
/*  on match: return true, add result to block
                    … advance subject position
    else: return false
///                                          */
var parseInline = function(block) {
    var res = false;
    var c = this.peek();
    if (c === -1)
        return false;

    switch (c) {
        case C_NEWLINE:
            res = this.parseNewline(block);
            break;
        case C_BACKSLASH:
            res = this.parseBackslash(block);
            break;
        case C_BACKTICK:
            res = this.parseBackticks(block);
            break;
        case C_ASTERISK:
        case C_UNDERSCORE:
            res = this.handleDelim(c, block);
            break;
        case C_SINGLEQUOTE:
        case C_DOUBLEQUOTE:
            res = this.options.smart &&
                  this.handleDelim(c, block);
            break;
        case C_OPEN_BRACKET:
            res = this.parseOpenBracket(block);
            break;
        case C_BANG:
            res = this.parseBang(block);
            break;
        case C_CLOSE_BRACKET:
            res = this.parseCloseBracket(block);
            break;
        case C_LESSTHAN:
            res = this.parseAutolink(block) ||
                  this.parseHtmlTag(block);
            break;
        case C_AMPERSAND:
            res = this.parseEntity(block);
            break;
        default:
            res = this.parseString(block);
            break;
    }

    if (!res) {
        this.pos += 1;
        block.appendChild(text(fromCodePoint(c)));
    }

    return true;
};

/*  parse string content in block
    generate inline children nodes
    … using refmap to resolve references
///                                    */
var parseInlines = function(block) {
    this.subject = block._string_content.trim();
    this.pos = 0;
    this.delimiters = null;
    this.brackets = null;
    while (this.parseInline(block)) {}
    block._string_content = null; // allow raw string to be garbage collected
    this.processEmphasis(null);
};


  // ------------------------------
 //       InlineParser object    
// --------------------------------

function InlineParser(options) {
    return {
        subject: "",
        delimiters: null, // used by handleDelim method
        brackets: null,
        pos: 0,
        refmap: {},
        match: match,
        peek: peek,
        spnl: spnl,
        parseBackticks: parseBackticks,
        parseBackslash: parseBackslash,
        parseAutolink: parseAutolink,
        parseHtmlTag: parseHtmlTag,
        scanDelims: scanDelims,
        handleDelim: handleDelim,
        parseLinkTitle: parseLinkTitle,
        parseLinkDestination: parseLinkDestination,
        parseLinkLabel: parseLinkLabel,
        parseOpenBracket: parseOpenBracket,
        parseBang: parseBang,
        parseCloseBracket: parseCloseBracket,
        addBracket: addBracket,
        removeBracket: removeBracket,
        parseEntity: parseEntity,
        parseString: parseString,
        parseNewline: parseNewline,
        parseReference: parseReference,
        parseInline: parseInline,
        processEmphasis: processEmphasis,
        removeDelimiter: removeDelimiter,
        options: options || {},
        parse: parseInlines
    };
}

var C_NEWLINE$1 = 10;
var C_OPEN_BRACKET$1 = 91;



var reLineEnding = /\r\n|\n|\r/;
var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;
var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;


//  true if string contains only space characters
var isBlank = function (s) {
    return !rx.nonSpace.test(s);
};

var isSpaceOrTab = function (c) {
    return c === C_SPACE || c === C_TAB;
};

var peek$1 = function (ln, pos) {
    if (pos < ln.length)
        return ln.charCodeAt(pos);
    else
        return -1;
};


  // -------------------------------------------
 //
/*               Document parser  
      … Parser object methods defined below 
                                              
 */// ------------------------------------------

let parser = void function index () {
    return {
    doc, blocks,
    blockStarts,
    offset, column,
    blank,
    lineNumber, lastLineLength, currentLine,
    lastMatchedContainer, tip, oldtip,
    nextNonspace, nextNonspaceColumn,
    indent, indented, partiallyConsumedTab,
    findNextNonspace,
    advanceOffset, advanceNextNonspace,
    addLine, addChild,
    incorporateLine, finalize, processInlines,
    closeUnmatchedBlocks, allClosed,
    inlineParser, options, refmap,
}};

//  returns true if block ends with blank line
//  … if descending into lists and sublists
var endsWithBlankLine = function (block) {
    while (block) {
       if (block._lastLineBlank)
           return true;

       let t = block.type;
       if (!block._lastLineChecked
       && (t === "list" || t === "item"))
           block._lastLineChecked = true,
           block = block._lastChild;
       else {
           block._lastLineChecked = true;
           break;
       }
    }
    return false;
};

//  add line to block at the tip
var addLine = function() {
    var charsToTab;
    if (this.partiallyConsumedTab) {
        charsToTab = 4 - (this.column % 4),
        //  add space characters
        //  skip over tab
        this.offset += 1;
        this.tip._string_content += " ".repeat(charsToTab);
    }
    this.tip._string_content += this.currentLine.slice(this.offset) + "\n";
};

//  add new block as child of this block tip
//  … finalizing block tips upwards until done
var addChild = function(tag, offset) {
    let {lineNumber, tip, blocks} = this;

    while (!blocks[this.tip.type].canContain(tag)) {
        this.finalize(tip, lineNumber - 1);
    }

    var column_number = offset + 1;
    /// … offset 0 = column 1
    var newBlock = new Node(tag, [
        [this.lineNumber, column_number],
        [0, 0]
    ]);
    newBlock._string_content = "";

         tip.appendChild(newBlock);
    this.tip = newBlock;

    return newBlock;
};

  //////////////////////
 // parse list marker
/*  return data || null
    type, start, delimiter, bullet char, padding
///                                           */
var parseListMarker = function (parser,
                                container) {

var rest = parser.currentLine.slice(parser.nextNonspace);
var match;
var nextc;
var spacesStartCol;
var spacesStartOffset;
var data = {
    type: null,
    tight: true, // lists are tight by default
    bulletChar: null,
    start: null,
    delimiter: null,
    padding: null,
    markerOffset: parser.indent
};

if (parser.indent >= 4)
    return null;

if ((match = rest.match(rx.bulletListMarker)))
     data.type = "bullet",
     data.bulletChar = match[0][0];
else
if ((match = rest.match(rx.orderedListMarker))
&&  (match[1] === 1
||   container.type !== "paragraph"))
     data.type = "ordered",
     data.start = parseInt(match[1]),
     data.delimiter = match[2];
else return null;

//  make sure we have spaces after
    nextc = peek$1(parser.currentLine,
                   parser.nextNonspace + match[0].length);

if (nextc !== -1
&&  nextc !== C_TAB
&&  nextc !== C_SPACE)
    return null;

//  paragraph, make sure first line isn't blank
if (container.type === "paragraph"
&& !parser
   .currentLine
   .slice(parser.nextNonspace + match[0].length)
   .match(rx.nonSpace))
    return null;

//  advance offset and calculate padding
    parser.advanceNextNonspace();
//  to start of marker
//  to end of marker
    parser.advanceOffset(match[0].length, true);

    spacesStartCol = parser.column;
    spacesStartOffset = parser.offset;

do {
    parser.advanceOffset(1, true);
    nextc = peek$1(parser.currentLine,
                  parser.offset);
} while (isSpaceOrTab(nextc) &&
         parser.column - spacesStartCol < 5);

var spaces_after_marker = parser.column
                        - spacesStartCol;
var blank_item = peek$1(parser.currentLine,
                        parser.offset) === -1;

if (blank_item
||  spaces_after_marker >= 5
||  spaces_after_marker < 1) {

    data.padding = match[0].length + 1;
    parser.column = spacesStartCol;
    parser.offset = spacesStartOffset;

if (isSpaceOrTab(peek$1(parser.currentLine,
                        parser.offset)))
    parser.advanceOffset(1, true);
}
else
    data.padding = match[0].length + spaces_after_marker;

    return data;
};

//  compares two list items for equality:
//  type, delimiter and bullet character  
//  … used in agglomerating list items
var listsMatch = (list, item) => (
    list.type       === item.type      &&
    list.delimiter  === item.delimiter &&
    list.bulletChar === item.bulletChar
);


 ////////////////////////////
//  close unmatched blocks
var closeUnmatchedBlocks = function() {
if (!this.allClosed) {
//  finalize and close any unmatched blocks
    while (this.oldtip     !==
           this.lastMatchedContainer) {
       var parent = this.oldtip._parent;
           this.finalize(this.oldtip,
                         this.lineNumber - 1);
           this.oldtip = parent;
    }
    this.allClosed = true;
}};


//  'finalize' is run when block is closed
//  'continue' is run to check if continuing
//  returns: 0 matched, 1 not matched, 2 next
var blocks = void {
        document: null,
            list: null,
     block_quote: null,
            item: null,
         heading: null,
  thematic_break: null,
      code_block: null,
      html_block: null,
       paragraph: null,
} || {
  document: {
    acceptsLines: false,
    canContain: (t) => t !== "item",
    continue: function() {
      return 0;
    },
    finalize: function() {
      return;
    },
  },
  list: {
    acceptsLines: false,
    canContain: (t) => t === "item",
    continue: function() {
      return 0;
    },
    finalize: function (parser, block) {
      var item = block._firstChild;
      while (item) {
         //  non-final list item and blank line
         if (item._next
         &&  endsWithBlankLine(item)) {
             block._listData.tight = false;
             break;
         }
        
         //  recurse into children of list item,
         //  to check spaces between any of them
         var subitem = item._firstChild;
         while (subitem) {
            if (endsWithBlankLine(subitem)
            && (item._next || subitem._next)) {
                block._listData.tight = false;
                break;
            }
            subitem = subitem._next;
         }     item = item._next;
      }
  }},
  block_quote: {
    acceptsLines: false,
    canContain: (t) => t !== "item",
    finalize: function() {
      return;
    },
    continue: function (parser) {
      var ln = parser.currentLine;
      if (!parser.indented
      &&  peek$1(ln, parser.nextNonspace)
                     === C_GREATERTHAN) {
          parser.advanceNextNonspace();
          parser.advanceOffset(1, false);
      if (isSpaceOrTab(peek$1(ln, parser.offset)))
          parser.advanceOffset(1, true);

      } else return 1;

      return 0;
  }},
  item: {
    acceptsLines: false,
    canContain: (t) => t !== "item",
    finalize: function() {
      return;
    },
    continue: function (parser, container) {
      if (parser.blank) {
      //  blank line after empty list item
      if (container._firstChild === null)
          return 1;
      else
          parser.advanceNextNonspace();
      }
      else
      if (parser.indent >=
          container._listData.padding +
          container._listData.markerOffset) {
          parser.advanceOffset(
              container._listData.padding +
              container._listData.markerOffset,
              true
          );
      
      } else return 1;

      return 0;
  }},
  heading: {
    acceptsLines: false,
    canContain: () => false,
    continue: function() {
        //  a heading can't contain >1 line
        return 1;
    },
    finalize: function() {
      return;
    },
  },
  thematic_break: {
    acceptsLines: false,
    canContain: () => false,
    continue: function() {
      //  thematic break can't contain >1 line
      return 1;
    },
    finalize: function() {
       return;
    },
  },
  code_block: {
    acceptsLines: true,
    canContain: () => false,
    continue: function (parser, container) {
      let {currentLine:ln, indent, nextNonspace}
                                       = parser;
      //  indented
      if (!container._isFenced) {
      if (indent >= CODE_INDENT)
        parser.advanceOffset(CODE_INDENT, true);
      else if (parser.blank)
        parser.advanceNextNonspace();
      else
        return 1;
      }
      else
      //  fenced
      if (container._isFenced) {
      let match
       = (indent <= 3
       && ln.charAt(nextNonspace) === container
                                    ._fenceChar)
       ?  ln.slice(nextNonspace)
            .match(rx.closingCodeFence) : false;

      //  closing fence at end of line
      if (match && match[0].length >=
                   container._fenceLength) {
          parser.lastLineLength
        = parser.offset + match[0].length
                        + indent;
          
          parser.finalize(container,
                  parser.lineNumber)
          return 2;
      }
      else {
      //  skip optional spaces of fence offset
      var i = container._fenceOffset;
      while (i > 0) {
      if (!isSpaceOrTab(peek$1(ln,parser.offset)))
          break;
          
          parser.advanceOffset(1, true);
          i--;
      }}}

      return 0;
    },
    finalize: function (parser, block) {
      if (block._isFenced) {
      //  fenced
      //  first line becomes info string
      var content = block._string_content;
      var newlinePos = content.indexOf("\n");
      var firstLine = content.slice(0, newlinePos);
      var rest = content.slice(newlinePos + 1);
          block._literal = rest;
          block.info = unescapeString(firstLine.trim());
      }
      else {
      //  indented
          block._literal =
          block._string_content.replace(
              /(\n *)+$/,
              "\n"
          );
      }
      block._string_content = null; // allow GC
    },
  },
  html_block: {
    acceptsLines: true,
    canContain: () => false,
    continue: function (parser, container) {
      return parser.blank &&
            (container._htmlBlockType === 6 ||
             container._htmlBlockType === 7)
             ? 1 : 0;
    },
    finalize: function (parser, block) {
      block._string_content = null; // allow GC
      block._literal = block._string_content.replace(/(\n *)+$/, "");
    },
  },
  paragraph: {
    acceptsLines: true,
    canContain: () => false,
    continue: function (parser) {
      return parser.blank ? 1 : 0;
    },
    finalize: function (parser, block) {
      var pos;
      var hasReferenceDefs = false;

      //  parse the beginning as link ref defs
      while (peek$1(block._string_content, 0)
                          === C_OPEN_BRACKET
         && (pos 
           = parser.inlineParser.parseReference(
               block._string_content,
               parser.refmap
      ))) {
          block._string_content 
        = block._string_content.slice(pos);
          hasReferenceDefs = true;
      }

      if (hasReferenceDefs
      &&  isBlank(block._string_content))
          block.unlink();
    },
  }
};


//  block start functions, return values:
//  0 = no match
//  1 = matched container, keep going
//  2 = matched leaf, no more block starts
var blockStarts = void [
    function block_quote(){},
    function heading(){},
    function code_block(){},
    function html_block(){},
    function setext_heading(){},
    function thematic_break(){},
    function list_item(){},
    function paragraph(){},
] || [
   /////////////////
  //  block quote
  function (parser) {
  if (!parser.indented
  &&  C_GREATERTHAN  ===
               peek$1(parser.currentLine,
                      parser.nextNonspace)) {
      parser.advanceNextNonspace();
      parser.advanceOffset(1, false);

      // optional following space
  if (isSpaceOrTab(peek$1(parser.currentLine,
                          parser.offset)))
      parser.advanceOffset(1, true);

      parser.closeUnmatchedBlocks();
      parser.addChild("block_quote",
                       parser.nextNonspace);
      return 1;
  }
  else
      return 0;
  },

   /////////////////
  //  atx heading
  function (parser) {
  var match;
  if (!parser.indented
  && (match = parser.currentLine
             .slice(parser.nextNonspace)
             .match(rx.ATXHeadingMarker))) {
      parser.advanceNextNonspace();
      parser.advanceOffset(match[0].length,
                                     false);
      parser.closeUnmatchedBlocks();

  var container = parser.addChild("heading",
                       parser.nextNonspace);

      Object.assign(container, {
        level: match[0].trim().length,
       // ^ number of #s
       // … remove trailing ###s
       _string_content:
        parser.currentLine
              .slice(parser.offset)
              .replace(/^[ \t]*#+[ \t]*$/, "")
              .replace(/[ \t]+#+[ \t]*$/, "")
      });

      parser.advanceOffset(
          parser.currentLine.length
        - parser.offset
      );

      return 2;
  }
  else
      return 0;
  },

   ///////////////////////
  //  fenced code block
  function (parser) {
  var match;
  if (!parser.indented
  && (match = parser.currentLine
             .slice(parser.nextNonspace)
             .match(rx.codeFence))) {
  var fenceLength = match[0].length;
      parser.closeUnmatchedBlocks();

  var container = parser.addChild("code_block",
                          parser.nextNonspace);

      Object.assign(container, {
        _isFenced: true,
        _fenceLength: fenceLength,
        _fenceChar: match[0][0],
        _fenceOffset: parser.indent,
      });

      parser.advanceNextNonspace();
      parser.advanceOffset(fenceLength,
                                 false);
      return 2;
  }
  else
      return 0;
  },

   ////////////////
  //  html block
  function (parser, container) {
  if (parser.indented
  ||  C_LESSTHAN  !==
          peek$1(parser.currentLine, 
                 parser.nextNonspace))
      return 0;

  var s = parser.currentLine.slice(parser.nextNonspace);
  var type;

  for (type = 1; type <= 7; type++) {
    //  maybe lazy
    if (rx.htmlBlockOpen[type].test(s)
    && (type < 7 
    || (container.type  !== "paragraph"
    &&  parser.tip.type !== "paragraph"
    &&  parser.allClosed && parser.blank))) {
        parser.closeUnmatchedBlocks();
        
    //  ... don't trim parser.offset
    var b = parser.addChild("html_block",
                             parser.offset);
        b._htmlBlockType = type;

        return 2;
  }}},

   ////////////////////
  //  setext heading
  function (parser, container) {
  var match;
  if (parser.indented
  ||  container.type !== "paragraph"
  || !(match = parser.currentLine
              .slice(parser.nextNonspace)
              .match(rx.setextHeadingLine)))
      return 0;

  //  resolve reference link definitions
      parser.closeUnmatchedBlocks();
  var pos;
  while (peek$1(container._string_content, 0) 
                          === C_OPEN_BRACKET$1
     && (pos
       = parser.inlineParser.parseReference(
           container._string_content,
           parser.refmap
  ))) {
      container._string_content
    = container._string_content.slice(pos);
  }

  if (container._string_content.length > 0) {
  var heading = new Node("heading", container.sourcepos);

      Object.assign(heading, {
        level: match[0][0] === "=" ? 1 : 2,
       _string_content:
        container._string_content,
      });

      container.insertAfter(heading);
      container.unlink();

      parser.tip = heading;
      parser.advanceOffset(
          parser.currentLine.length - parser.offset,
          false
      );

      return 2;
  }
  else
      return 0;
  },

   ////////////////////
  //  thematic break
  function (parser) {
  if (parser.indented
  || !rx.thematicBreak
        .test(parser.currentLine
                    .slice(parser.nextNonspace)))
      return 0;

      parser.closeUnmatchedBlocks();
      parser.addChild("thematic_break",
                       parser.nextNonspace);

      parser.advanceOffset(
          parser.currentLine.length
        - parser.offset,
        false
      );

      return 2
  },

   ///////////////
  //  list item
  function (parser, container) {
  var data;
  if ((parser.indented 
  &&   container.type === "list")
  || !(data = parseListMarker(parser,
                             container)))
      return 0;

      parser.closeUnmatchedBlocks();

  //  add the list if needed
  if (parser.tip.type !== "list"
  || !listsMatch(container._listData, data)) {
      container = parser.addChild("list",
                  parser.nextNonspace),
      container._listData = data;
  }

  //  add the list item
      container = parser.addChild("item",
                  parser.nextNonspace);
      container._listData = data;
      return 1;
  },

   /////////////////////////
  //  indented code block
  function (parser) {
    if (parser.indented
    &&  parser.tip.type !== "paragraph"
    && !parser.blank) {
        // indented code
        parser.advanceOffset(CODE_INDENT, true);
        parser.closeUnmatchedBlocks();
        parser.addChild("code_block", parser.offset);
        return 2;
    }
    else
        return 0;
  }
];


 ////////////////////
//  advance offset
var advanceOffset = function (count, columns) {
  var currentLine = this.currentLine,
      charsToTab, charsToAdvance, c;
  while (count > 0
     && (c = currentLine[this.offset])) {
     if (c === "\t") {
         charsToTab = CODE_INDENT -
                     (this.column % CODE_INDENT); // ... tab spaces setting

     if (columns) {
     let condition = count < charsToTab;
         charsToAdvance = (condition)
                        ?  charsToTab : count;

         Object.assign(this, {
          partiallyConsumedTab: condition,
          column: this.column + charsToAdvance,
          offset: this.offset + (condition)
                              ?   0  :  1
         });

         count -= charsToAdvance;
         continue;
     }
     else
         Object.assign(this, {
          partiallyConsumedTab: false,
          column: this.column + charsToTab,
          offset: this.offset + 1,
         });
     }

     if (c !== "\t") {
         Object.assign(this, {
          partiallyConsumedTab: false,
          offset: this.offset + 1,
          column: this.column + 1,
          // assume ascii with block starts
         });
     }

     count -= 1;
}};

var advanceNextNonspace = function() {
    Object.assign(this, {
     partiallyConsumedTab: false,
     offset: this.nextNonspace,
     column: this.nextNonspaceColumn
    });
};

var findNextNonspace = function() {
    var currentLine = this.currentLine;
    var i = this.offset;
    var cols = this.column;
    var c;

    while (c = currentLine.charAt(i)) {
       if (c === " ")
           i++, cols++;

       else
       if (c === "\t")
           i++, cols += CODE_INDENT -
                (cols % CODE_INDENT);
       else
           break;
    }

    let indent = this.nextNonspaceColumn
               - this.column;

    Object.assign(this, {
     blank: c == "\n" || c == "\r" || c == "",
     nextNonspace: i,
     nextNonspaceColumn: cols,
     indent: indent,
     indented: indent >= CODE_INDENT,
    });
};


  /////////////////////
 // incorporate line
/*  analyze a line of text and update document
    … called on each input line of markdown doc
///                                          */
var incorporateLine = function (ln) {
    var all_matched = true;
    var t;
    var container = this.doc;

    Object.assign(this, {
     oldtip: this.tip,
     offset: 0,
     column: 0,
     blank: false,
     partiallyConsumedTab: false,
     lineNumber: this.lineNumber + 1,
    });

    //  replace NUL characters for security
    if (ln.indexOf("\u0000") !== -1) {
        ln = ln.replace(/\0/g, "\uFFFD");
    }

    this.currentLine = ln;

    //  parse line start each containing block
    //  … incomplete match: all_matched=false
    //  … on failure: previous matching block
    var lastChild;
    while ((lastChild = container._lastChild)
       &&   lastChild._open) {
       container = lastChild;

       this.findNextNonspace();

       switch (this
              .blocks[container.type]
              .continue(this, container)) {
         case 0: // keep going on match …
           break;

         case 1: // failed to match a block
           all_matched = false;
           break;

         case 2: // end of line at fenced code
            return;
         
         default:
            throw "continue returned illegal value, must be 0, 1, or 2";
       }

       //  back up to last matching block
       if (!all_matched) {
           container = container._parent;
           break;
       }
    }

    this.allClosed = container === this.oldtip;
    this.lastMatchedContainer = container;

    var matchedLeaf =
        container.type !== "paragraph"
     && blocks[container.type].acceptsLines;

    let starts = this.blockStarts,
        startsLen = starts.length;

    //  new container start (!code_block)
    //  … adding children to matched container
    while (!matchedLeaf) {
      this.findNextNonspace();

        // a little performance optimization
      if (!this.indented
      &&  !rx
          .maybeSpecial
          .test(ln.slice(this.nextNonspace))) {
          this.advanceNextNonspace();
          break;
      }

      var i = 0;
      while (i < startsLen) {
          var res = starts[i](this, container);
          if (res === 1) {
              container = this.tip;
              break;
          }
          else
          if (res === 2) {
              container = this.tip;
              matchedLeaf = true;
              break;
          }
          else i++;
      }

      if (i === startsLen) {
      //  nothing matched
          this.advanceNextNonspace();
          break;
      }
    }

    /*  a text line remains at the offset
        … add text to appropriate container  */

    //  check for lazy paragraph continuation
    if (!this.allClosed
    &&  !this.blank
    &&   this.tip.type === "paragraph")
         this.addLine();
    else {
    //  not a lazy continuation
    //  … finalize any blocks not matched
    this.closeUnmatchedBlocks();

    if (this.blank && container.lastChild)
        container.lastChild._lastLineBlank
                                    = true;

    t = container.type;

    //  don't set _lastLineBlank
    //  … on list item empty, fenced block
    /* 
     -  block quote lines are never blank
     -  blanks in fenced code are uncounted
        … for tight/loose lists, breaking out */
    var lastLineBlank = this.blank &&
       !(t === "block_quote"       ||
        (t === "code_block"
     && container._isFenced)       ||
        (t === "item"
     && !container._firstChild
     &&  container.sourcepos[0][0]
               === this.lineNumber));

    //  propagate lastLineBlank upwards
    var cont = container;
    while (cont) {
      cont._lastLineBlank = lastLineBlank;
      cont = cont._parent;
    }

    //  write to ast
    //  … append line type
    if (this.blocks[t].acceptsLines) {
        this.addLine();

    //  if html block, check for end condition
    if (t === "html_block"
    &&  container._htmlBlockType >= 1
    &&  container._htmlBlockType <= 5) {
    let reHtmlBlockClose = rx.htmlBlockClose
                  [container._htmlBlockType];

    if (reHtmlBlockClose
       .test(this.currentLine
                 .slice(this.offset)))
    {
        this.lastLineLength = ln.length,
        this.finalize(container,
                      this.lineNumber);
    }}}
    else
    //  … create paragraph container for line
    if (!this.blank
    &&   this.offset < ln.length)
         container
       = this.addChild("paragraph",
                       this.offset),

         this.advanceNextNonspace(),
         this.addLine();
    }
    this.lastLineLength = ln.length;
};


  /////////////
 // finalize
/*  close and postprocess a block
    … reset tip to parent of the closed block

    e.g. string_content from strings,
    'tight', 'loose' status of a list,
    parsing the beginnings of paragraphs  
///                                        */
var finalize = function (block, lineNumber) {
    var above = block._parent;
    block._open = false;
    block.sourcepos[1] = [lineNumber,
                          this.lastLineLength];

    this.blocks[block.type].finalize(this,
                                     block);
    this.tip = above;
};

//  parsing string content into inline content
var processInlines = function (block) {
    var node, event, t;
    var walker = block.walker();

    this.inlineParser.refmap = this.refmap;
    this.inlineParser.options = this.options;

    while (event = walker.next()) {
    node = event.node;
       t = node.type;

       if (!event.entering
       && (t === "paragraph"
       ||  t === "heading"))
           this.inlineParser.parse(node);
    }
};

var Document = function() {
    var doc = new Node("document", [
        [1, 1],
        [0, 0]
    ]);
    return doc;
};


  // ------------------------------
 //         Parser object    
// --------------------------------

function Parser(options) {
  return {
    doc: new Document(),
    blocks: blocks,
    blockStarts: blockStarts,
    tip: this.doc,
    oldtip: this.doc,
    currentLine: "",
    lineNumber: 0,
    offset: 0,
    column: 0,
    nextNonspace: 0,
    nextNonspaceColumn: 0,
    indent: 0,
    indented: false,
    blank: false,
    partiallyConsumedTab: false,
    allClosed: true,
    lastMatchedContainer: this.doc,
    refmap: {},
    lastLineLength: 0,
    inlineParser: new InlineParser(options),
    findNextNonspace: findNextNonspace,
    advanceOffset: advanceOffset,
    advanceNextNonspace: advanceNextNonspace,
    addLine: addLine,
    addChild: addChild,
    incorporateLine: incorporateLine,
    finalize: finalize,
    processInlines: processInlines,
    closeUnmatchedBlocks: closeUnmatchedBlocks,
    parse: parse,
    options: options || {}
  };
}


  // -------------------------------------------
 //
/*       Renderer methods defined below
           Lorem ipsum dolor sit amet,
         … consectetur adipiscing elit

 */// ------------------------------------------

function Renderer() {}

/**
 *  Walks the AST and calls member methods for each Node type.
 *
 *  @param ast {Node} The root of the abstract syntax tree.
 */
function render (ast) {
    var walker = ast.walker(),
        event,
        type;

    this.buffer = "";
    this.lastOut = "\n";

    while ((event = walker.next())) {
        type = event.node.type;

        if (this[type])
            this[type](event.node, event.entering);
    }
    return this.buffer;
}

/**
 *  Concatenate a literal string to the buffer.
 *
 *  @param str {String} The string to concatenate.
 */
function lit (str) {
    this.buffer += str;
    this.lastOut = str;
}

/**
 *  Output a newline to the buffer.
 */
function cr() {
  if (this.lastOut !== "\n")
      this.lit("\n");
}

/**
 *  Concatenate a string to the buffer possibly escaping the content.
 *
 *  Concrete renderer implementations should override this method.
 *
 *  @param str {String} The string to concatenate.
 */
function out (str) {
    this.lit(str);
}

/**
 *  Escape a string for the target renderer.
 *
 *  Abstract function that should be implemented by concrete
 *  renderer implementations.
 *
 *  @param str {String} The string to escape.
 */
function esc (str) {
    return str;
}

Renderer.prototype.render = render;
Renderer.prototype.out = out;
Renderer.prototype.lit = lit;
Renderer.prototype.cr = cr;
Renderer.prototype.esc = esc;

var potentiallyUnsafe = function(url) {
    return !rx.safeDataProtocol.test(url)
        &&  rx.unsafeProtocol.test(url);
};

// helper function to produce an html tag
function tag (name, attrs, selfclosing) {
    if (this.disableTags > 0)
        return;
    
    this.buffer += "<" + name;
    if (attrs && attrs.length > 0)
    for (let attrib of attrs) {
        this.buffer += " " + attrib[0] 
                    + '="' + attrib[1] + '"';
    }
  
    this.lastOut = ">";
    this.buffer += (selfclosing) ? " />" : ">";
}


  // -------------------------------------------
 //
/*      HtmlRenderer methods defined below
          Lorem ipsum dolor sit amet,
        … consectetur adipiscing elit
                                              
 */// ------------------------------------------

function HtmlRenderer (options) {
  options = options || {};

  //  soft breaks render as newlines in HTML
  //  set to "<br />" to make them hard breaks
  //  set to " " to ignore line wrapping
  options.softbreak
= options.softbreak || "\n";

  //  escape html with a custom function
  this.esc = options.esc || escapeXml;

  this.disableTags = 0;
  this.lastOut = "\n";
  this.options = options;
}

  //  ------------------------------------------
 //                 Node methods
//  --------------------------------------------

function text$1 (node) {
    this.out(node.literal);
}

function softbreak() {
    this.lit(this.options.softbreak);
}

function linebreak() {
    this.tag("br", [], true);
    this.cr();
}

function link (node, entering) {
var attrs = this.attrs(node);
if (entering) {
    if (!this.options.safe
    &&  !potentiallyUnsafe(node.destination)) {
        attrs.push(["href", this.esc(node.destination)]);
    }
    if (node.title) {
        attrs.push(["title", this.esc(node.title)]);
    }
    this.tag("a", attrs);
}
else
    this.tag("/a");
}

function image$1 (node, entering) {
if (entering) {
    if (this.disableTags === 0) {
    if (this.options.safe
    &&  potentiallyUnsafe(node.destination))
        this.lit('<img src="" alt="');
    else
        this.lit('<img src="' + this.esc(node.destination) + '" alt="');
    }
    this.disableTags += 1;
}
else
if (!entering) {
    this.disableTags -= 1;
if (this.disableTags === 0) {
    if (node.title) {
        this.lit('" title="' + this.esc(node.title));
    }
    this.lit('" />');
}}}

function emph (node, entering) {
    this.tag(entering ? "em" : "/em");
}

function strong (node, entering) {
    this.tag(entering ? "strong" : "/strong");
}

function paragraph (node, entering) {
    var grandparent = node.parent.parent,
        attrs = this.attrs(node);

    if (grandparent !== null
    &&  grandparent.type === "list") {
    if (grandparent.listTight)
        return;
    }

    if (entering)
        this.cr(),
        this.tag("p", attrs);
    else
        this.tag("/p");
        this.cr();
}

function heading (node, entering) {
    var tagname = "h" + node.level,
        attrs = this.attrs(node);

    if (entering)
        this.cr(),
        this.tag(tagname, attrs);
    else
        this.tag("/" + tagname),
        this.cr();
}

function code (node) {
    this.tag("code");
    this.out(node.literal);
    this.tag("/code");
}

function code_block (node) {
    var attrs = this.attrs(node),
        info_words = (node.info)
                   ?  node.info.split(/\s+/) : [];

    if (info_words.length > 0
    &&  info_words[0].length > 0) {
        attrs.push(["class", "language-" + this.esc(info_words[0])]);
    }

    this.cr();
    this.tag("pre");
    this.tag("code", attrs);
    this.out(node.literal);
    this.tag("/code");
    this.tag("/pre");
    this.cr();
}

function thematic_break (node) {
    var attrs = this.attrs(node);
    this.cr();
    this.tag("hr", attrs, true);
    this.cr();
}

function block_quote (node, entering) {
  var attrs = this.attrs(node);
  if (entering)
      this.cr(),
      this.tag("blockquote", attrs),
      this.cr();
  else
      this.cr();
      this.tag("/blockquote");
      this.cr();
}

function list (node, entering) {
    var attrs = this.attrs(node),
        tagname = node.listType === "bullet"
                              ?  "ul" : "ol";
    if (entering) {
    var start = node.listStart;
    if (start !== null && start !== 1)
        attrs.push(["start", start.toString()]);

        this.cr();
        this.tag(tagname, attrs);
        this.cr();
    }
    else
        this.cr(),
        this.tag("/" + tagname),
        this.cr();
}

function item (node, entering) {
    var attrs = this.attrs(node);
    if (entering)
        this.tag("li", attrs);
    else
        this.tag("/li"),
        this.cr();
}

function html_inline (node) {
    if (this.options.safe)
        this.lit("<!-- raw HTML omitted -->");
    else
        this.lit(node.literal);
}

function html_block (node) {
    this.cr();

    if (this.options.safe)
        this.lit("<!-- raw HTML omitted -->");
    else
        this.lit(node.literal);

    this.cr();
}

function custom_inline (node, entering) {
    if (entering && node.onEnter)
        this.lit(node.onEnter);
    else if (!entering && node.onExit)
        this.lit(node.onExit);
}

function custom_block (node, entering) {
    this.cr();

    if (entering && node.onEnter)
        this.lit(node.onEnter);
    else if (!entering && node.onExit)
        this.lit(node.onExit);

    this.cr();
}

  //  ------------------------------------------
 //                Helper methods
//  --------------------------------------------

function out$1 (s) {
    this.lit(this.esc(s));
}

var attrs$1 = attrs;

// quick browser-compatible inheritance
HtmlRenderer.prototype = Object.create(Renderer.prototype);

HtmlRenderer.prototype.text = text$1;
HtmlRenderer.prototype.html_inline = html_inline;
HtmlRenderer.prototype.html_block = html_block;
HtmlRenderer.prototype.softbreak = softbreak;
HtmlRenderer.prototype.linebreak = linebreak;
HtmlRenderer.prototype.link = link;
HtmlRenderer.prototype.image = image$1;
HtmlRenderer.prototype.emph = emph;
HtmlRenderer.prototype.strong = strong;
HtmlRenderer.prototype.paragraph = paragraph;
HtmlRenderer.prototype.heading = heading;
HtmlRenderer.prototype.code = code;
HtmlRenderer.prototype.code_block = code_block;
HtmlRenderer.prototype.thematic_break = thematic_break;
HtmlRenderer.prototype.block_quote = block_quote;
HtmlRenderer.prototype.list = list;
HtmlRenderer.prototype.item = item;
HtmlRenderer.prototype.custom_inline = custom_inline;
HtmlRenderer.prototype.custom_block = custom_block;

HtmlRenderer.prototype.esc = escapeXml;

HtmlRenderer.prototype.out = out$1;
HtmlRenderer.prototype.tag = tag;
HtmlRenderer.prototype.attrs = attrs;
                             

  // -------------------------------------------
 //
/*     XmlRenderer methods defined below
          Lorem ipsum dolor sit amet,
        … consectetur adipiscing elit
                                              
 */// ------------------------------------------

var reXMLTag = /\<[^>]*\>/;

function toTagName (s) {
    return s.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function XmlRenderer(options) {
    options = options || {};

    this.disableTags = 0;
    this.lastOut = "\n";

    this.indentLevel = 0;
    this.indent = "  ";
    
    this.esc = options.esc || escapeXml;
    // escape html with a custom function
    // else use escapeXml

    this.options = options;
}

function render$1 (ast) {
    this.buffer = "";

var attrs=[];
var tagname;
var walker = ast.walker();
var event, node, entering;
var container;
var selfClosing;
var nodetype;

var options = this.options;

if (options.time)
    console.time("rendering");

    this.buffer += '<?xml version="1.0" encoding="UTF-8"?>\n';
    this.buffer += '<!DOCTYPE document SYSTEM "CommonMark.dtd">\n';

while (event = walker.next()) {
    entering = event.entering;
    node     = event.node;
    nodetype = node.type;
    pos = node.sourcepos;

    container = node.isContainer;

    selfClosing =
       nodetype === "linebreak"    ||
       nodetype === "softbreak"    ||
       nodetype === "thematic_break";

    tagname = toTagName(nodetype);

if (entering) {
switch (nodetype) {
  case "document":
    attrs.push(["xmlns", "http://commonmark.org/xml/1.0"]);

  case "list":
    if (node.listType !== null) {
        attrs.push(["type", node.listType.toLowerCase()]);
    }
    if (node.listStart !== null) {
        attrs.push(["start", String(node.listStart)]);
    }
    if (node.listTight !== null) {
        attrs.push([
          "tight",
          node.listTight ? "true" : "false"
        ]);
    }
    var delim = node.listDelimiter;
    if (delim !== null) {
        var delimword = "";
        if (delim === ".") {
            delimword = "period";
        } else {
            delimword = "paren";
        }
        attrs.push(["delimiter", delimword]);
    }

  case "code_block":
    if (node.info) {
        attrs.push(["info", node.info]);
    }

  case "heading":
    attrs.push(["level", String(node.level)]);

  case "link":
  case "image":
    attrs.push(["title", node.title]);
    attrs.push(["destination", node.destination]);

  case "custom_inline":
  case "custom_block":
    attrs.push(["on_enter", node.onEnter]);
    attrs.push(["on_exit", node.onExit]);
}

if (options.sourcepoS && pos)
    attrs.push([
        "sourcepos",
        String(pos[0][0]) +
            ":" +
            String(pos[0][1]) +
            "-" +
            String(pos[1][0]) +
            ":" +
            String(pos[1][1])
    ]);

    this.cr();
    this.out(this.tag(tagname, attrs, selfClosing));

    if (container)
        this.indentLevel += 1;
    else
    if (!container && !selfClosing) {
        var lit = node.literal;
        if (lit) {
            this.out(this.esc(lit));
        }
        this.out(this.tag("/" + tagname));
    }
}
else
if (!entering)
    this.indentLevel -= 1,
    this.cr(),
    this.out(this.tag("/" + tagname));
}

if (options.time)
    console.timeEnd("rendering");

    this.buffer += "\n";
    return this.buffer;
}

function out$2 (s) {
    if (this.disableTags > 0)
        this.buffer += s.replace(reXMLTag, "");
    else
        this.buffer += s;

    this.lastOut = s;
}

function cr$1() {
    if (this.lastOut !== "\n") {
        this.buffer += "\n";
        this.lastOut = "\n";
        for (var i = this.indentLevel; i > 0; i--) {
            this.buffer += this.indent;
        }
    }
}

//  Helper function to produce an XML tag.
function tag$1 (name, attrs, selfclosing) {
    var result = "<" + name;
    if (attrs && attrs.length > 0) {
        var i = 0;
        var attrib;
        while ((attrib = attrs[i]) !== undefined) {
            result += " " + attrib[0] + '="' + this.esc(attrib[1]) + '"';
            i++;
        }
    }

    if (selfclosing)
        result += " /";

    result += ">";
    return result;
}

// quick browser-compatible inheritance
XmlRenderer.prototype = Object.create(Renderer.prototype);

XmlRenderer.prototype.render = render$1;
XmlRenderer.prototype.out = out$2;
XmlRenderer.prototype.cr = cr$1;
XmlRenderer.prototype.tag = tag$1;
XmlRenderer.prototype.esc = escapeXml;


  return exports;
 /////////////////


function factoryCommonJS() {
  var globalCommonJS
    = typeof globalThis !== 'undefined'
    ?        globalThis
    : typeof window !== 'undefined'
    ?        window
    : typeof global !== 'undefined'
    ?        global
    : typeof self   !== 'undefined'
    ?        self : {};

  return {
    createModuleCommonJS: (fn, module={}) =>
      (module.exports           ||
      (module={ exports:{} }))  &&
    fn(module, module.exports),

    getExport: (n) =>
      n && n['default'] || n,

    importDefault:
     (globalCommonJS &&
      globalCommonJS.importDefault) ?
      globalCommonJS.importDefault  :
     (module) => (module && module.__esModule)
   ?  module : { "default": module },

    unwrapExports: (x) => x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x,
}}

function exportLib (exports={}) {
  exports.__esModule = true;

  exports.encode             = void null;
  exports.decode             = void null;
  exports.decodeStrict       = void null;

  exports.decodeXML          = void null;
  exports.decodeHTML         = void null;
  exports.decodeHTMLStrict   = void null;

  exports.decode_codepoint   = void null;

  exports.escape             = void null;
  exports.encodeXML          = void null;
  exports.encodeHTML         = void null;

  exports.encode_unsafe      = void null;

  exports.entities           = void null;
  exports.legacy             = void null;
  exports.xml                = void null;
  exports.codePoints         = void null;

  exports.rx                 = void null;

  const rx = Object.freeze({
   ...getRegularExpressions(),
      'default': getRegularExpressions(),
      __proto__: null,
  });

  const entities = Object.freeze({
   ...getEntitiesList(),
      'default': getEntitiesList(),
      __proto__: null,
  });

  const subset = Object.freeze({
   ...getLegacyEntitiesList(),
      'default': getLegacyEntitiesList(),
      __proto__: null,
  });

  let amp = "&";
  let apos = "'";
  let gt = ">";
  let lt = "<";
  let quot = "\"";
  let xml$1 = {
      amp, apos, gt, lt, quot,
  };

  const xml = Object.freeze({
      amp: amp,
      apos: apos,
      gt: gt,
      lt: lt,
      quot: quot,
      'default': xml$1,
      __proto__: null,
  });

  const codePoints = Object.freeze({
     ...getCodePointsList(),
        'default': getCodePointsList(),
        __proto__: null,
  });

  exports.entities = entities;
  exports.legacy = subset;
  exports.xml = xml;
  exports.codePoints = codePoints;

  exports.rx = rx;


  /**
   * Decodes a string with entities.
   *
   * @param data String to decode.
   * @param level Optional level to decode at:
   *         0 = XML, 1 = HTML. Default is 0
   */
  function decode (data, level) {
    return (!level || level <= 0 
            ? decoder.decodeXML
            : decoder.decodeHTML)(data);
  }

  /**
   * Decodes a string with entities. Does not allow missing trailing semicolons for entities.
   *
   * @param data String to decode.
   * @param level Optional level to decode at:
   *         0 = XML, 1 = HTML. Default is 0.
   */
  function decodeStrict (data, level) {
    return (!level || level <= 0
            ? decoder.decodeXML 
            : decoder.decodeHTMLStrict)(data);
  }

  /**
   * Encodes a string with entities.
   *
   * @param data String to encode.
   * @param level Optional level to encode at. 0 = XML, 1 = HTML. Default is 0.
   */
  function encode (data, level) {
    return (!level || level <= 0
            ? encoder.encodeXML
            : encoder.encodeHTML)(data);
  }

  exports.encode = encode;
  exports.decode = decode;
  exports.decodeStrict = decodeStrict;

 ///////////////////////////////////////////////
  function strictDecoder (map) {
    var replace = replacer(map);
    var keys = Object.keys(map).join("|");

    keys += "|#[xX][\\da-fA-F]+|#\\d+";

    var re = new RegExp("&(?:"+keys+");","g");
    return function (str) { return String(str).replace(re, replace) };
  }

  function replacer (map) {
    return function replace (str) {
        if (str.charAt(1) === "#") {
            var secondChar = str.charAt(2);
        if (secondChar === "X"
        ||  secondChar === "x")
            return decodeCodePoint(parseInt(str.substr(3), 16));
        else
            return decodeCodePoint(parseInt(str.substr(2), 10));
        }
        else
            return map[str.slice(1, -1)];
    };
  }

  function decoderHTML() {
    let legacy = Object.keys(subset.default);
    let keys = Object.keys(entities.default);

    for (let i=0, j=0; i<keys.length; i++) {
      if (legacy[j] === keys[i])
          keys[i] += ";?",
          j++;
      else
      keys[i] += ";";
    }

    var replacerFn = replacer(entities.default);
    let re = new RegExp(rx.decodeHtml[0] + keys.join("|") + rx.decodeHtml[1], "g");

    var replacerFn = function (str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replacerFn(str);
    }
    
    return function (str) {
      return String(str).replace(re,replacer);
    }; // … create a merged map?
  }

  function decodeCodePoint (codePoint) {
    if (codePoint > 0x10ffff
    || (codePoint >= 0xd800
    &&  codePoint <= 0xdfff))
        return "\uFFFD";

    if (codePoint in codePoints.default)
        codePoint
      = codePoints.default[codePoint];

    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }

    output += String.fromCharCode(codePoint);
    return output;
  }

  exports.decodeXML = strictDecoder(xml.default);
  exports.decodeHTML       = decoderHTML;
  exports.decodeHTMLStrict = strictDecoder(entities.default);

  exports.decode_codepoint = decodeCodePoint;


 ///////////////////////////////////////////////
  let reNonASCII = rx.nonAscii;
  let reXmlChars
    = getInverseReplacer(getInverseObj(xml.default));

  function encoder (obj) {
    let inverse = getInverseObj(obj);
    let rx = getInverseReplacer(inverse);
    return (data) =>
      data
     .replace(rx, (name)=>inverse[name])
     .replace(reNonASCII, singleCharReplacer);
  }

  function escape (data) {
    return data
   .replace(reXmlChars, singleCharReplacer)
   .replace(reNonASCII, singleCharReplacer);
  }

  function getInverseObj(obj) {
    return Object.keys(obj)
      .sort()
      .reduce((inverse, name) => {
       return (inverse[obj[name]]=`&${name};`)
           &&  inverse;
    }, {});
  }

  function getInverseReplacer (inverse) {
    var single   = [];
    var multiple = [];

    for (let key of Object.keys(inverse)) {
      //  add value to single array
      if (key.length === 1)
          single.push("\\" + key);
      
      else 
      //  add value to multiple array
          multiple.push(key);
    }

    //  add ranges to single characters
    single.sort();
    for (let i=0; i < single.length; i++) {
      var end = i;
      while (end < single.length - 1
         &&  single[end].charCodeAt(1) + 1
         ==  single[end + 1].charCodeAt(1)) {
             end += 1;
      }

      let count = 1 + end - i;
      if (count < 3)
          continue;
 
      single.splice(i, count,
      single[i]+"-"+single[end]);
    }

    multiple.unshift("["+single.join("")+"]");
    return new RegExp(multiple.join("|"),"g");
  }

  function singleCharReplacer (c) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return "&#x" + c.codePointAt(0).toString(16).toUpperCase() + ";";
  }

  exports.escape = escape;
  exports.encodeXML  = encoder(xml);
  exports.encodeHTML = encoder(entities);


  //////////////////////////////////////////////
 // Encode unsafe chars with percent-encoding,
//  skipping already encoded sequences
/*
 -  string       - string to encode
 -  keepEscaped  - don't encode escaped
 -  exclude      - list of chars to ignore
                  (in addition to a-zA-Z0-9)
///                                         */
  function encodeUnsafeChar (str, exclude,
                              keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  //  encode(string, keepEscaped)
  if (typeof exclude !== 'string')
      keepEscaped = exclude,
      exclude = encodeUnsafe.defaultChars;

  if (typeof keepEscaped === 'undefined')
      keepEscaped = true;

      cache = getEncodeCache(exclude);

  for (i = 0, l = str.length; i < l; i++) {
      code = str.charCodeAt(i);

  //  %
  if (keepEscaped
  &&  code === 0x25 && i+2 < l) {
  if (rx.num.test(str.slice(i+1,i+3))) {
      result += str.slice(i, i+3);
      i += 2;
      continue;
  }}

  if (code < 128) {
      result += cache[code];
      continue;
  }

  if (code >= 0xD800 && 0xDFFF >= code) {
  if (i + 1 < l) {
      nextCode = string.charCodeAt(i+1);
  if (nextCode >= 0xDC00
  &&  nextCode <= 0xDFFF) {
      result += encodeURIComponent(str[i]
                                 + str[i+1]);
      i++;
      continue;
  }}  result += '%EF%BF%BD';
                   continue;  }

      result += encodeURIComponent(str[i]);
  }

      return result;
     ////////////////
  } Object.assign(encodeUnsafeChar, {
      defaultChars: ";/?:@&=+$,-_.!~*'()#",
    componentChars: "-_.!~*'()",
  });

  //
  //  Lookup array in `chars` string
  //  except: characters and alphanumberic chars
  //

  function getEncodeCache(exclude) {
    var i, ch, cache = encodeCache[exclude];
    if (cache) { return cache }
        cache
      = encodeCache[exclude] = [];

    for (i = 0; i < 128; i++) {
      ch = String.fromCharCode(i);

      //  always allow unencoded alphanumerics
      if (rx.num.test(ch))
      cache.push(ch);

      else
      cache.push('%'
              + ('0'+i.toString(16)
                      .toUpperCase())
                      .slice(-2));
    }

    for (i = 0; i < exclude.length; i++) {
      cache[exclude.charCodeAt(i)] = exclude[i];
    }

    return cache;
  }

  var encodeCache = {};

  exports.encode_unsafe = encodeUnsafeChar;
    
  //  polyfills
  exports.polyfills = {};
  exports.polyfills.stringRepeat  = stringRepeatPolyfill;
  exports.polyfills.fromCodePoint = fromCodePointPolyfill;

  //  legacy aliases
  exports.encodeHTML4 = exports.encodeHTML;
  exports.encodeHTML5 = exports.encodeHTML;
  exports.decodeHTML4 = exports.decodeHTML;
  exports.decodeHTML5 = exports.decodeHTML;
  exports.decodeHTML4Strict = exports.decodeHTMLStrict;
  exports.decodeHTML5Strict = exports.decodeHTMLStrict;
  exports.decodeXMLStrict = exports.decodeXML;

  return exports;
 /////////////////
}

function getRegularExpressions() {
  var reNum = /^[0-9a-z]$/i;
  var reNonASCII = /(?:[\x80-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g;

  var ENTITY = "&(?:#x[a-f0-9]{1,6}|#[0-9]{1,7}|[a-z][a-z0-9]{1,31});";

  var TAGNAME = "[A-Za-z][A-Za-z0-9-]*";
  var ATTRIBUTENAME = "[a-zA-Z_:][a-zA-Z0-9:._-]*";
  var UNQUOTEDVALUE = "[^\"'=<>`\\x00-\\x20]+";
  var SINGLEQUOTEDVALUE = "'[^']*'";
  var DOUBLEQUOTEDVALUE = '"[^"]*"';
  var ATTRIBUTEVALUE =
      "(?:" +
      UNQUOTEDVALUE +
      "|" +
      SINGLEQUOTEDVALUE +
      "|" +
      DOUBLEQUOTEDVALUE +
      ")";
  var ATTRIBUTEVALUESPEC = "(?:" + "\\s*=" + "\\s*" + ATTRIBUTEVALUE + ")";
  var ATTRIBUTE = "(?:" + "\\s+" + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + "?)";
  var OPENTAG = "<" + TAGNAME + ATTRIBUTE + "*" + "\\s*/?>";
  var CLOSETAG = "</" + TAGNAME + "\\s*[>]";
  var HTMLCOMMENT = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
  var PROCESSINGINSTRUCTION = "[<][?][\\s\\S]*?[?][>]";
  var DECLARATION = "<![A-Z]+" + "\\s+[^>]*>";
  var CDATA = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
  var HTMLTAG =
      "(?:" +
      OPENTAG +
      "|" +
      CLOSETAG +
      "|" +
      HTMLCOMMENT +
      "|" +
      PROCESSINGINSTRUCTION +
      "|" +
      DECLARATION +
      "|" +
      CDATA +
      ")";

  var ESCAPABLE = "[!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]";

  var XMLSPECIAL = '[&<>"]';

  var ESCAPED_CHAR = "\\\\" + ESCAPABLE;

    ///

  var reHtmlTag = new RegExp("^" + HTMLTAG);

  var reBackslashOrAmp = /[\\&]/;

  var reEntityOrEscapedChar = new RegExp("\\\\" + ESCAPABLE + "|" + ENTITY, "gi");

  var reXmlSpecial = new RegExp(XMLSPECIAL, "g");

  var rePunctuation = new RegExp(
      /^[!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/
  );

  var reLinkTitle = new RegExp(
      '^(?:"(' +
          ESCAPED_CHAR +
          '|[^"\\x00])*"' +
          "|" +
          "'(" +
          ESCAPED_CHAR +
          "|[^'\\x00])*'" +
          "|" +
          "\\((" +
          ESCAPED_CHAR +
          "|[^()\\x00])*\\))"
  );

  var reLinkDestinationBraces = /^(?:<(?:[^<>\n\\\x00]|\\.)*>)/;

  var reEscapable = new RegExp("^" + ESCAPABLE);

  var reEntityHere = new RegExp("^" + ENTITY, "i");

  var reTicks = /`+/;

  var reTicksHere = /^`+/;

  var reEllipses = /\.\.\./g;

  var reDash = /--+/g;

  var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;

  var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;

  var reSpnl = /^ *(?:\n *)?/;

  var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;

  var reUnicodeWhitespaceChar = /^\s/;

  var reFinalSpace = / *$/;

  var reInitialSpace = /^ */;

  var reSpaceAtEndOfLine = /^ *(?:\n|$)/;

  var reLinkLabel = /^\[(?:[^\\\[\]]|\\.){0,1000}\]/s;

    ///

  var reHtmlBlockOpen = [
      /./, // dummy for 0
      /^<(?:script|pre|textarea|style)(?:\s|>|$)/i,
      /^<!--/,
      /^<[?]/,
      /^<![A-Z]/,
      /^<!\[CDATA\[/,
      /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
      new RegExp("^(?:" + OPENTAG + "|" + CLOSETAG + ")\\s*$", "i")
  ];

  var reHtmlBlockClose = [
      /./, // dummy for 0
      /<\/(?:script|pre|textarea|style)>/i,
      /-->/,
      /\?>/,
      />/,
      /\]\]>/
  ];

  var reThematicBreak = /^(?:\*[ \t]*){3,}$|^(?:_[ \t]*){3,}$|^(?:-[ \t]*){3,}$/;

  var reMaybeSpecial = /^[#`~*+_=<>0-9-]/;

  var reNonSpace = /[^ \t\f\v\r\n]/;

  var reBulletListMarker = /^[*+-]/;

  var reOrderedListMarker = /^(\d{1,9})([.)])/;

  var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;

  var reCodeFence = /^`{3,}(?!.*`)|^~{3,}/;

  var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;

  var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;

  var reLineEnding = /\r\n|\n|\r/;

  // Matches a string of non-special characters.
  var reMain = /^[^\n`\[\]\\!<&*_'"]+/m;

  var reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;
  var reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;

  var decodeHtml = ["&(?:", "|#[xX][\\da-fA-F]+;?|#\\d+;?)"];

  var reXMLTag = /\<[^>]*\>/;

  return {
                htmlTag: reHtmlTag,
         backslashOrAmp: reBackslashOrAmp,
    entityOrEscapedChar: reEntityOrEscapedChar,
             xmlSpecial: reXmlSpecial,
        linkDestination: reLinkDestinationBraces,
              escapable: reEscapable,
             entityHere: reEntityHere,
                  ticks: reTicks,
              ticksHere: reTicksHere,
               ellipses: reEllipses,
                   dash: reDash,
          emailAutolink: reEmailAutolink,
               autolink: reAutolink,
              linkTitle: reLinkTitle,
              linkLabel: reLinkLabel,

         whitespaceChar: reWhitespaceChar,
  unicodeWhitespaceChar: reUnicodeWhitespaceChar,
             finalSpace: reFinalSpace,
           initialSpace: reInitialSpace,
       spaceAtEndOfLine: reSpaceAtEndOfLine,
                   spnl: reSpnl,
               nonSpace: reNonSpace,
            punctuation: rePunctuation,

             decodeHtml,
                 xmlTag: reXMLTag,
                   main: reMain,
                    num: reNum,
               nonAscii: reNonASCII,

          htmlBlockOpen: reHtmlBlockOpen,
         htmlBlockClose: reHtmlBlockClose,
          thematicBreak: reThematicBreak,
           maybeSpecial: reMaybeSpecial, // …
      orderedListMarker: reOrderedListMarker,
       bulletListMarker: reBulletListMarker,
       ATXHeadingMarker: reATXHeadingMarker,
              codeFence: reCodeFence,
       closingCodeFence: reClosingCodeFence,
      setextHeadingLine: reSetextHeadingLine,
             lineEnding: reLineEnding, // …

         unsafeProtocol: reUnsafeProtocol,
       safeDataProtocol: reSafeDataProtocol,

            debugOffset: null,
          __debugOffset: [0,0,0],
  };
}

function getCodePointsList() {
  return {
    "0": 65533,
    "128": 8364,
    "130": 8218,
    "131": 402,
    "132": 8222,
    "133": 8230,
    "134": 8224,
    "135": 8225,
    "136": 710,
    "137": 8240,
    "138": 352,
    "139": 8249,
    "140": 338,
    "142": 381,
    "145": 8216,
    "146": 8217,
    "147": 8220,
    "148": 8221,
    "149": 8226,
    "150": 8211,
    "151": 8212,
    "152": 732,
    "153": 8482,
    "154": 353,
    "155": 8250,
    "156": 339,
    "158": 382,
    "159": 376
}}

function getLegacyEntitiesList() {
  return {
    Aacute: "Á",
    aacute: "á",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    AElig: "Æ",
    aelig: "æ",
    Agrave: "À",
    agrave: "à",
    amp: "&",
    AMP: "&",
    Aring: "Å",
    aring: "å",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    brvbar: "¦",
    Ccedil: "Ç",
    ccedil: "ç",
    cedil: "¸",
    cent: "¢",
    copy: "©",
    COPY: "©",
    curren: "¤",
    deg: "°",
    divide: "÷",
    Eacute: "É",
    eacute: "é",
    Ecirc: "Ê",
    ecirc: "ê",
    Egrave: "È",
    egrave: "è",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    frac12: "½",
    frac14: "¼",
    frac34: "¾",
    gt: ">",
    GT: ">",
    Iacute: "Í",
    iacute: "í",
    Icirc: "Î",
    icirc: "î",
    iexcl: "¡",
    Igrave: "Ì",
    igrave: "ì",
    iquest: "¿",
    Iuml: "Ï",
    iuml: "ï",
    laquo: "«",
    lt: "<",
    LT: "<",
    macr: "¯",
    micro: "µ",
    middot: "·",
    nbsp: " ",
    not: "¬",
    Ntilde: "Ñ",
    ntilde: "ñ",
    Oacute: "Ó",
    oacute: "ó",
    Ocirc: "Ô",
    ocirc: "ô",
    Ograve: "Ò",
    ograve: "ò",
    ordf: "ª",
    ordm: "º",
    Oslash: "Ø",
    oslash: "ø",
    Otilde: "Õ",
    otilde: "õ",
    Ouml: "Ö",
    ouml: "ö",
    para: "¶",
    plusmn: "±",
    pound: "£",
    quot: "\"",
    QUOT: "\"",
    raquo: "»",
    reg: "®",
    REG: "®",
    sect: "§",
    shy: "­",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    szlig: "ß",
    THORN: "Þ",
    thorn: "þ",
    times: "×",
    Uacute: "Ú",
    uacute: "ú",
    Ucirc: "Û",
    ucirc: "û",
    Ugrave: "Ù",
    ugrave: "ù",
    uml: "¨",
    Uuml: "Ü",
    uuml: "ü",
    Yacute: "Ý",
    yacute: "ý",
    yen: "¥",
    yuml: "ÿ",
}}

function getEntitiesList() {
  return {
    Aacute: "Á",
    aacute: "á",
    Abreve: "Ă",
    abreve: "ă",
    ac: "∾",
    acd: "∿",
    acE: "∾̳",
    Acirc: "Â",
    acirc: "â",
    acute: "´",
    Acy: "А",
    acy: "а",
    AElig: "Æ",
    aelig: "æ",
    af: "⁡",
    Afr: "𝔄",
    afr: "𝔞",
    Agrave: "À",
    agrave: "à",
    alefsym: "ℵ",
    aleph: "ℵ",
    Alpha: "Α",
    alpha: "α",
    Amacr: "Ā",
    amacr: "ā",
    amalg: "⨿",
    amp: "&",
    AMP: "&",
    andand: "⩕",
    And: "⩓",
    and: "∧",
    andd: "⩜",
    andslope: "⩘",
    andv: "⩚",
    ang: "∠",
    ange: "⦤",
    angle: "∠",
    angmsdaa: "⦨",
    angmsdab: "⦩",
    angmsdac: "⦪",
    angmsdad: "⦫",
    angmsdae: "⦬",
    angmsdaf: "⦭",
    angmsdag: "⦮",
    angmsdah: "⦯",
    angmsd: "∡",
    angrt: "∟",
    angrtvb: "⊾",
    angrtvbd: "⦝",
    angsph: "∢",
    angst: "Å",
    angzarr: "⍼",
    Aogon: "Ą",
    aogon: "ą",
    Aopf: "𝔸",
    aopf: "𝕒",
    apacir: "⩯",
    ap: "≈",
    apE: "⩰",
    ape: "≊",
    apid: "≋",
    apos: "'",
    ApplyFunction: "⁡",
    approx: "≈",
    approxeq: "≊",
    Aring: "Å",
    aring: "å",
    Ascr: "𝒜",
    ascr: "𝒶",
    Assign: "≔",
    ast: "*",
    asymp: "≈",
    asympeq: "≍",
    Atilde: "Ã",
    atilde: "ã",
    Auml: "Ä",
    auml: "ä",
    awconint: "∳",
    awint: "⨑",
    backcong: "≌",
    backepsilon: "϶",
    backprime: "‵",
    backsim: "∽",
    backsimeq: "⋍",
    Backslash: "∖",
    Barv: "⫧",
    barvee: "⊽",
    barwed: "⌅",
    Barwed: "⌆",
    barwedge: "⌅",
    bbrk: "⎵",
    bbrktbrk: "⎶",
    bcong: "≌",
    Bcy: "Б",
    bcy: "б",
    bdquo: "„",
    becaus: "∵",
    because: "∵",
    Because: "∵",
    bemptyv: "⦰",
    bepsi: "϶",
    bernou: "ℬ",
    Bernoullis: "ℬ",
    Beta: "Β",
    beta: "β",
    beth: "ℶ",
    between: "≬",
    Bfr: "𝔅",
    bfr: "𝔟",
    bigcap: "⋂",
    bigcirc: "◯",
    bigcup: "⋃",
    bigodot: "⨀",
    bigoplus: "⨁",
    bigotimes: "⨂",
    bigsqcup: "⨆",
    bigstar: "★",
    bigtriangledown: "▽",
    bigtriangleup: "△",
    biguplus: "⨄",
    bigvee: "⋁",
    bigwedge: "⋀",
    bkarow: "⤍",
    blacklozenge: "⧫",
    blacksquare: "▪",
    blacktriangle: "▴",
    blacktriangledown: "▾",
    blacktriangleleft: "◂",
    blacktriangleright: "▸",
    blank: "␣",
    blk12: "▒",
    blk14: "░",
    blk34: "▓",
    block: "█",
    bne: "=⃥",
    bnequiv: "≡⃥",
    bNot: "⫭",
    bnot: "⌐",
    Bopf: "𝔹",
    bopf: "𝕓",
    bot: "⊥",
    bottom: "⊥",
    bowtie: "⋈",
    boxbox: "⧉",
    boxdl: "┐",
    boxdL: "╕",
    boxDl: "╖",
    boxDL: "╗",
    boxdr: "┌",
    boxdR: "╒",
    boxDr: "╓",
    boxDR: "╔",
    boxh: "─",
    boxH: "═",
    boxhd: "┬",
    boxHd: "╤",
    boxhD: "╥",
    boxHD: "╦",
    boxhu: "┴",
    boxHu: "╧",
    boxhU: "╨",
    boxHU: "╩",
    boxminus: "⊟",
    boxplus: "⊞",
    boxtimes: "⊠",
    boxul: "┘",
    boxuL: "╛",
    boxUl: "╜",
    boxUL: "╝",
    boxur: "└",
    boxuR: "╘",
    boxUr: "╙",
    boxUR: "╚",
    boxv: "│",
    boxV: "║",
    boxvh: "┼",
    boxvH: "╪",
    boxVh: "╫",
    boxVH: "╬",
    boxvl: "┤",
    boxvL: "╡",
    boxVl: "╢",
    boxVL: "╣",
    boxvr: "├",
    boxvR: "╞",
    boxVr: "╟",
    boxVR: "╠",
    bprime: "‵",
    breve: "˘",
    Breve: "˘",
    brvbar: "¦",
    bscr: "𝒷",
    Bscr: "ℬ",
    bsemi: "⁏",
    bsim: "∽",
    bsime: "⋍",
    bsolb: "⧅",
    bsol: "\\",
    bsolhsub: "⟈",
    bull: "•",
    bullet: "•",
    bump: "≎",
    bumpE: "⪮",
    bumpe: "≏",
    Bumpeq: "≎",
    bumpeq: "≏",
    Cacute: "Ć",
    cacute: "ć",
    capand: "⩄",
    capbrcup: "⩉",
    capcap: "⩋",
    cap: "∩",
    Cap: "⋒",
    capcup: "⩇",
    capdot: "⩀",
    CapitalDifferentialD: "ⅅ",
    caps: "∩︀",
    caret: "⁁",
    caron: "ˇ",
    Cayleys: "ℭ",
    ccaps: "⩍",
    Ccaron: "Č",
    ccaron: "č",
    Ccedil: "Ç",
    ccedil: "ç",
    Ccirc: "Ĉ",
    ccirc: "ĉ",
    Cconint: "∰",
    ccups: "⩌",
    ccupssm: "⩐",
    Cdot: "Ċ",
    cdot: "ċ",
    cedil: "¸",
    Cedilla: "¸",
    cemptyv: "⦲",
    cent: "¢",
    centerdot: "·",
    CenterDot: "·",
    cfr: "𝔠",
    Cfr: "ℭ",
    CHcy: "Ч",
    chcy: "ч",
    check: "✓",
    checkmark: "✓",
    Chi: "Χ",
    chi: "χ",
    circ: "ˆ",
    circeq: "≗",
    circlearrowleft: "↺",
    circlearrowright: "↻",
    circledast: "⊛",
    circledcirc: "⊚",
    circleddash: "⊝",
    CircleDot: "⊙",
    circledR: "®",
    circledS: "Ⓢ",
    CircleMinus: "⊖",
    CirclePlus: "⊕",
    CircleTimes: "⊗",
    cir: "○",
    cirE: "⧃",
    cire: "≗",
    cirfnint: "⨐",
    cirmid: "⫯",
    cirscir: "⧂",
    ClockwiseContourIntegral: "∲",
    CloseCurlyDoubleQuote: "”",
    CloseCurlyQuote: "’",
    clubs: "♣",
    clubsuit: "♣",
    colon: ":",
    Colon: "∷",
    Colone: "⩴",
    colone: "≔",
    coloneq: "≔",
    comma: ",",
    commat: "@",
    comp: "∁",
    compfn: "∘",
    complement: "∁",
    complexes: "ℂ",
    cong: "≅",
    congdot: "⩭",
    Congruent: "≡",
    conint: "∮",
    Conint: "∯",
    ContourIntegral: "∮",
    copf: "𝕔",
    Copf: "ℂ",
    coprod: "∐",
    Coproduct: "∐",
    copy: "©",
    COPY: "©",
    copysr: "℗",
    CounterClockwiseContourIntegral: "∳",
    crarr: "↵",
    cross: "✗",
    Cross: "⨯",
    Cscr: "𝒞",
    cscr: "𝒸",
    csub: "⫏",
    csube: "⫑",
    csup: "⫐",
    csupe: "⫒",
    ctdot: "⋯",
    cudarrl: "⤸",
    cudarrr: "⤵",
    cuepr: "⋞",
    cuesc: "⋟",
    cularr: "↶",
    cularrp: "⤽",
    cupbrcap: "⩈",
    cupcap: "⩆",
    CupCap: "≍",
    cup: "∪",
    Cup: "⋓",
    cupcup: "⩊",
    cupdot: "⊍",
    cupor: "⩅",
    cups: "∪︀",
    curarr: "↷",
    curarrm: "⤼",
    curlyeqprec: "⋞",
    curlyeqsucc: "⋟",
    curlyvee: "⋎",
    curlywedge: "⋏",
    curren: "¤",
    curvearrowleft: "↶",
    curvearrowright: "↷",
    cuvee: "⋎",
    cuwed: "⋏",
    cwconint: "∲",
    cwint: "∱",
    cylcty: "⌭",
    dagger: "†",
    Dagger: "‡",
    daleth: "ℸ",
    darr: "↓",
    Darr: "↡",
    dArr: "⇓",
    dash: "‐",
    Dashv: "⫤",
    dashv: "⊣",
    dbkarow: "⤏",
    dblac: "˝",
    Dcaron: "Ď",
    dcaron: "ď",
    Dcy: "Д",
    dcy: "д",
    ddagger: "‡",
    ddarr: "⇊",
    DD: "ⅅ",
    dd: "ⅆ",
    DDotrahd: "⤑",
    ddotseq: "⩷",
    deg: "°",
    Del: "∇",
    Delta: "Δ",
    delta: "δ",
    demptyv: "⦱",
    dfisht: "⥿",
    Dfr: "𝔇",
    dfr: "𝔡",
    dHar: "⥥",
    dharl: "⇃",
    dharr: "⇂",
    DiacriticalAcute: "´",
    DiacriticalDot: "˙",
    DiacriticalDoubleAcute: "˝",
    DiacriticalGrave: "`",
    DiacriticalTilde: "˜",
    diam: "⋄",
    diamond: "⋄",
    Diamond: "⋄",
    diamondsuit: "♦",
    diams: "♦",
    die: "¨",
    DifferentialD: "ⅆ",
    digamma: "ϝ",
    disin: "⋲",
    div: "÷",
    divide: "÷",
    divideontimes: "⋇",
    divonx: "⋇",
    DJcy: "Ђ",
    djcy: "ђ",
    dlcorn: "⌞",
    dlcrop: "⌍",
    dollar: "$",
    Dopf: "𝔻",
    dopf: "𝕕",
    Dot: "¨",
    dot: "˙",
    DotDot: "⃜",
    doteq: "≐",
    doteqdot: "≑",
    DotEqual: "≐",
    dotminus: "∸",
    dotplus: "∔",
    dotsquare: "⊡",
    doublebarwedge: "⌆",
    DoubleContourIntegral: "∯",
    DoubleDot: "¨",
    DoubleDownArrow: "⇓",
    DoubleLeftArrow: "⇐",
    DoubleLeftRightArrow: "⇔",
    DoubleLeftTee: "⫤",
    DoubleLongLeftArrow: "⟸",
    DoubleLongLeftRightArrow: "⟺",
    DoubleLongRightArrow: "⟹",
    DoubleRightArrow: "⇒",
    DoubleRightTee: "⊨",
    DoubleUpArrow: "⇑",
    DoubleUpDownArrow: "⇕",
    DoubleVerticalBar: "∥",
    DownArrowBar: "⤓",
    downarrow: "↓",
    DownArrow: "↓",
    Downarrow: "⇓",
    DownArrowUpArrow: "⇵",
    DownBreve: "̑",
    downdownarrows: "⇊",
    downharpoonleft: "⇃",
    downharpoonright: "⇂",
    DownLeftRightVector: "⥐",
    DownLeftTeeVector: "⥞",
    DownLeftVectorBar: "⥖",
    DownLeftVector: "↽",
    DownRightTeeVector: "⥟",
    DownRightVectorBar: "⥗",
    DownRightVector: "⇁",
    DownTeeArrow: "↧",
    DownTee: "⊤",
    drbkarow: "⤐",
    drcorn: "⌟",
    drcrop: "⌌",
    Dscr: "𝒟",
    dscr: "𝒹",
    DScy: "Ѕ",
    dscy: "ѕ",
    dsol: "⧶",
    Dstrok: "Đ",
    dstrok: "đ",
    dtdot: "⋱",
    dtri: "▿",
    dtrif: "▾",
    duarr: "⇵",
    duhar: "⥯",
    dwangle: "⦦",
    DZcy: "Џ",
    dzcy: "џ",
    dzigrarr: "⟿",
    Eacute: "É",
    eacute: "é",
    easter: "⩮",
    Ecaron: "Ě",
    ecaron: "ě",
    Ecirc: "Ê",
    ecirc: "ê",
    ecir: "≖",
    ecolon: "≕",
    Ecy: "Э",
    ecy: "э",
    eDDot: "⩷",
    Edot: "Ė",
    edot: "ė",
    eDot: "≑",
    ee: "ⅇ",
    efDot: "≒",
    Efr: "𝔈",
    efr: "𝔢",
    eg: "⪚",
    Egrave: "È",
    egrave: "è",
    egs: "⪖",
    egsdot: "⪘",
    el: "⪙",
    Element: "∈",
    elinters: "⏧",
    ell: "ℓ",
    els: "⪕",
    elsdot: "⪗",
    Emacr: "Ē",
    emacr: "ē",
    empty: "∅",
    emptyset: "∅",
    EmptySmallSquare: "◻",
    emptyv: "∅",
    EmptyVerySmallSquare: "▫",
    emsp13: " ",
    emsp14: " ",
    emsp: " ",
    ENG: "Ŋ",
    eng: "ŋ",
    ensp: " ",
    Eogon: "Ę",
    eogon: "ę",
    Eopf: "𝔼",
    eopf: "𝕖",
    epar: "⋕",
    eparsl: "⧣",
    eplus: "⩱",
    epsi: "ε",
    Epsilon: "Ε",
    epsilon: "ε",
    epsiv: "ϵ",
    eqcirc: "≖",
    eqcolon: "≕",
    eqsim: "≂",
    eqslantgtr: "⪖",
    eqslantless: "⪕",
    Equal: "⩵",
    equals: "=",
    EqualTilde: "≂",
    equest: "≟",
    Equilibrium: "⇌",
    equiv: "≡",
    equivDD: "⩸",
    eqvparsl: "⧥",
    erarr: "⥱",
    erDot: "≓",
    escr: "ℯ",
    Escr: "ℰ",
    esdot: "≐",
    Esim: "⩳",
    esim: "≂",
    Eta: "Η",
    eta: "η",
    ETH: "Ð",
    eth: "ð",
    Euml: "Ë",
    euml: "ë",
    euro: "€",
    excl: "!",
    exist: "∃",
    Exists: "∃",
    expectation: "ℰ",
    exponentiale: "ⅇ",
    ExponentialE: "ⅇ",
    fallingdotseq: "≒",
    Fcy: "Ф",
    fcy: "ф",
    female: "♀",
    ffilig: "ﬃ",
    fflig: "ﬀ",
    ffllig: "ﬄ",
    Ffr: "𝔉",
    ffr: "𝔣",
    filig: "ﬁ",
    FilledSmallSquare: "◼",
    FilledVerySmallSquare: "▪",
    fjlig: "fj",
    flat: "♭",
    fllig: "ﬂ",
    fltns: "▱",
    fnof: "ƒ",
    Fopf: "𝔽",
    fopf: "𝕗",
    forall: "∀",
    ForAll: "∀",
    fork: "⋔",
    forkv: "⫙",
    Fouriertrf: "ℱ",
    fpartint: "⨍",
    frac12: "½",
    frac13: "⅓",
    frac14: "¼",
    frac15: "⅕",
    frac16: "⅙",
    frac18: "⅛",
    frac23: "⅔",
    frac25: "⅖",
    frac34: "¾",
    frac35: "⅗",
    frac38: "⅜",
    frac45: "⅘",
    frac56: "⅚",
    frac58: "⅝",
    frac78: "⅞",
    frasl: "⁄",
    frown: "⌢",
    fscr: "𝒻",
    Fscr: "ℱ",
    gacute: "ǵ",
    Gamma: "Γ",
    gamma: "γ",
    Gammad: "Ϝ",
    gammad: "ϝ",
    gap: "⪆",
    Gbreve: "Ğ",
    gbreve: "ğ",
    Gcedil: "Ģ",
    Gcirc: "Ĝ",
    gcirc: "ĝ",
    Gcy: "Г",
    gcy: "г",
    Gdot: "Ġ",
    gdot: "ġ",
    ge: "≥",
    gE: "≧",
    gEl: "⪌",
    gel: "⋛",
    geq: "≥",
    geqq: "≧",
    geqslant: "⩾",
    gescc: "⪩",
    ges: "⩾",
    gesdot: "⪀",
    gesdoto: "⪂",
    gesdotol: "⪄",
    gesl: "⋛︀",
    gesles: "⪔",
    Gfr: "𝔊",
    gfr: "𝔤",
    gg: "≫",
    Gg: "⋙",
    ggg: "⋙",
    gimel: "ℷ",
    GJcy: "Ѓ",
    gjcy: "ѓ",
    gla: "⪥",
    gl: "≷",
    glE: "⪒",
    glj: "⪤",
    gnap: "⪊",
    gnapprox: "⪊",
    gne: "⪈",
    gnE: "≩",
    gneq: "⪈",
    gneqq: "≩",
    gnsim: "⋧",
    Gopf: "𝔾",
    gopf: "𝕘",
    grave: "`",
    GreaterEqual: "≥",
    GreaterEqualLess: "⋛",
    GreaterFullEqual: "≧",
    GreaterGreater: "⪢",
    GreaterLess: "≷",
    GreaterSlantEqual: "⩾",
    GreaterTilde: "≳",
    Gscr: "𝒢",
    gscr: "ℊ",
    gsim: "≳",
    gsime: "⪎",
    gsiml: "⪐",
    gtcc: "⪧",
    gtcir: "⩺",
    gt: ">",
    GT: ">",
    Gt: "≫",
    gtdot: "⋗",
    gtlPar: "⦕",
    gtquest: "⩼",
    gtrapprox: "⪆",
    gtrarr: "⥸",
    gtrdot: "⋗",
    gtreqless: "⋛",
    gtreqqless: "⪌",
    gtrless: "≷",
    gtrsim: "≳",
    gvertneqq: "≩︀",
    gvnE: "≩︀",
    Hacek: "ˇ",
    hairsp: " ",
    half: "½",
    hamilt: "ℋ",
    HARDcy: "Ъ",
    hardcy: "ъ",
    harrcir: "⥈",
    harr: "↔",
    hArr: "⇔",
    harrw: "↭",
    Hat: "^",
    hbar: "ℏ",
    Hcirc: "Ĥ",
    hcirc: "ĥ",
    hearts: "♥",
    heartsuit: "♥",
    hellip: "…",
    hercon: "⊹",
    hfr: "𝔥",
    Hfr: "ℌ",
    HilbertSpace: "ℋ",
    hksearow: "⤥",
    hkswarow: "⤦",
    hoarr: "⇿",
    homtht: "∻",
    hookleftarrow: "↩",
    hookrightarrow: "↪",
    hopf: "𝕙",
    Hopf: "ℍ",
    horbar: "―",
    HorizontalLine: "─",
    hscr: "𝒽",
    Hscr: "ℋ",
    hslash: "ℏ",
    Hstrok: "Ħ",
    hstrok: "ħ",
    HumpDownHump: "≎",
    HumpEqual: "≏",
    hybull: "⁃",
    hyphen: "‐",
    Iacute: "Í",
    iacute: "í",
    ic: "⁣",
    Icirc: "Î",
    icirc: "î",
    Icy: "И",
    icy: "и",
    Idot: "İ",
    IEcy: "Е",
    iecy: "е",
    iexcl: "¡",
    iff: "⇔",
    ifr: "𝔦",
    Ifr: "ℑ",
    Igrave: "Ì",
    igrave: "ì",
    ii: "ⅈ",
    iiiint: "⨌",
    iiint: "∭",
    iinfin: "⧜",
    iiota: "℩",
    IJlig: "Ĳ",
    ijlig: "ĳ",
    Imacr: "Ī",
    imacr: "ī",
    image: "ℑ",
    ImaginaryI: "ⅈ",
    imagline: "ℐ",
    imagpart: "ℑ",
    imath: "ı",
    Im: "ℑ",
    imof: "⊷",
    imped: "Ƶ",
    Implies: "⇒",
    incare: "℅",
    infin: "∞",
    infintie: "⧝",
    inodot: "ı",
    intcal: "⊺",
    int: "∫",
    Int: "∬",
    integers: "ℤ",
    Integral: "∫",
    intercal: "⊺",
    Intersection: "⋂",
    intlarhk: "⨗",
    intprod: "⨼",
    InvisibleComma: "⁣",
    InvisibleTimes: "⁢",
    IOcy: "Ё",
    iocy: "ё",
    Iogon: "Į",
    iogon: "į",
    Iopf: "𝕀",
    iopf: "𝕚",
    Iota: "Ι",
    iota: "ι",
    iprod: "⨼",
    iquest: "¿",
    iscr: "𝒾",
    Iscr: "ℐ",
    isin: "∈",
    isindot: "⋵",
    isinE: "⋹",
    isins: "⋴",
    isinsv: "⋳",
    isinv: "∈",
    it: "⁢",
    Itilde: "Ĩ",
    itilde: "ĩ",
    Iukcy: "І",
    iukcy: "і",
    Iuml: "Ï",
    iuml: "ï",
    Jcirc: "Ĵ",
    jcirc: "ĵ",
    Jcy: "Й",
    jcy: "й",
    Jfr: "𝔍",
    jfr: "𝔧",
    jmath: "ȷ",
    Jopf: "𝕁",
    jopf: "𝕛",
    Jscr: "𝒥",
    jscr: "𝒿",
    Jsercy: "Ј",
    jsercy: "ј",
    Jukcy: "Є",
    jukcy: "є",
    Kappa: "Κ",
    kappa: "κ",
    kappav: "ϰ",
    Kcedil: "Ķ",
    kcedil: "ķ",
    Kcy: "К",
    kcy: "к",
    Kfr: "𝔎",
    kfr: "𝔨",
    kgreen: "ĸ",
    KHcy: "Х",
    khcy: "х",
    KJcy: "Ќ",
    kjcy: "ќ",
    Kopf: "𝕂",
    kopf: "𝕜",
    Kscr: "𝒦",
    kscr: "𝓀",
    lAarr: "⇚",
    Lacute: "Ĺ",
    lacute: "ĺ",
    laemptyv: "⦴",
    lagran: "ℒ",
    Lambda: "Λ",
    lambda: "λ",
    lang: "⟨",
    Lang: "⟪",
    langd: "⦑",
    langle: "⟨",
    lap: "⪅",
    Laplacetrf: "ℒ",
    laquo: "«",
    larrb: "⇤",
    larrbfs: "⤟",
    larr: "←",
    Larr: "↞",
    lArr: "⇐",
    larrfs: "⤝",
    larrhk: "↩",
    larrlp: "↫",
    larrpl: "⤹",
    larrsim: "⥳",
    larrtl: "↢",
    latail: "⤙",
    lAtail: "⤛",
    lat: "⪫",
    late: "⪭",
    lates: "⪭︀",
    lbarr: "⤌",
    lBarr: "⤎",
    lbbrk: "❲",
    lbrace: "{",
    lbrack: "[",
    lbrke: "⦋",
    lbrksld: "⦏",
    lbrkslu: "⦍",
    Lcaron: "Ľ",
    lcaron: "ľ",
    Lcedil: "Ļ",
    lcedil: "ļ",
    lceil: "⌈",
    lcub: "{",
    Lcy: "Л",
    lcy: "л",
    ldca: "⤶",
    ldquo: "“",
    ldquor: "„",
    ldrdhar: "⥧",
    ldrushar: "⥋",
    ldsh: "↲",
    le: "≤",
    lE: "≦",
    LeftAngleBracket: "⟨",
    LeftArrowBar: "⇤",
    leftarrow: "←",
    LeftArrow: "←",
    Leftarrow: "⇐",
    LeftArrowRightArrow: "⇆",
    leftarrowtail: "↢",
    LeftCeiling: "⌈",
    LeftDoubleBracket: "⟦",
    LeftDownTeeVector: "⥡",
    LeftDownVectorBar: "⥙",
    LeftDownVector: "⇃",
    LeftFloor: "⌊",
    leftharpoondown: "↽",
    leftharpoonup: "↼",
    leftleftarrows: "⇇",
    leftrightarrow: "↔",
    LeftRightArrow: "↔",
    Leftrightarrow: "⇔",
    leftrightarrows: "⇆",
    leftrightharpoons: "⇋",
    leftrightsquigarrow: "↭",
    LeftRightVector: "⥎",
    LeftTeeArrow: "↤",
    LeftTee: "⊣",
    LeftTeeVector: "⥚",
    leftthreetimes: "⋋",
    LeftTriangleBar: "⧏",
    LeftTriangle: "⊲",
    LeftTriangleEqual: "⊴",
    LeftUpDownVector: "⥑",
    LeftUpTeeVector: "⥠",
    LeftUpVectorBar: "⥘",
    LeftUpVector: "↿",
    LeftVectorBar: "⥒",
    LeftVector: "↼",
    lEg: "⪋",
    leg: "⋚",
    leq: "≤",
    leqq: "≦",
    leqslant: "⩽",
    lescc: "⪨",
    les: "⩽",
    lesdot: "⩿",
    lesdoto: "⪁",
    lesdotor: "⪃",
    lesg: "⋚︀",
    lesges: "⪓",
    lessapprox: "⪅",
    lessdot: "⋖",
    lesseqgtr: "⋚",
    lesseqqgtr: "⪋",
    LessEqualGreater: "⋚",
    LessFullEqual: "≦",
    LessGreater: "≶",
    lessgtr: "≶",
    LessLess: "⪡",
    lesssim: "≲",
    LessSlantEqual: "⩽",
    LessTilde: "≲",
    lfisht: "⥼",
    lfloor: "⌊",
    Lfr: "𝔏",
    lfr: "𝔩",
    lg: "≶",
    lgE: "⪑",
    lHar: "⥢",
    lhard: "↽",
    lharu: "↼",
    lharul: "⥪",
    lhblk: "▄",
    LJcy: "Љ",
    ljcy: "љ",
    llarr: "⇇",
    ll: "≪",
    Ll: "⋘",
    llcorner: "⌞",
    Lleftarrow: "⇚",
    llhard: "⥫",
    lltri: "◺",
    Lmidot: "Ŀ",
    lmidot: "ŀ",
    lmoustache: "⎰",
    lmoust: "⎰",
    lnap: "⪉",
    lnapprox: "⪉",
    lne: "⪇",
    lnE: "≨",
    lneq: "⪇",
    lneqq: "≨",
    lnsim: "⋦",
    loang: "⟬",
    loarr: "⇽",
    lobrk: "⟦",
    longleftarrow: "⟵",
    LongLeftArrow: "⟵",
    Longleftarrow: "⟸",
    longleftrightarrow: "⟷",
    LongLeftRightArrow: "⟷",
    Longleftrightarrow: "⟺",
    longmapsto: "⟼",
    longrightarrow: "⟶",
    LongRightArrow: "⟶",
    Longrightarrow: "⟹",
    looparrowleft: "↫",
    looparrowright: "↬",
    lopar: "⦅",
    Lopf: "𝕃",
    lopf: "𝕝",
    loplus: "⨭",
    lotimes: "⨴",
    lowast: "∗",
    lowbar: "_",
    LowerLeftArrow: "↙",
    LowerRightArrow: "↘",
    loz: "◊",
    lozenge: "◊",
    lozf: "⧫",
    lpar: "(",
    lparlt: "⦓",
    lrarr: "⇆",
    lrcorner: "⌟",
    lrhar: "⇋",
    lrhard: "⥭",
    lrm: "‎",
    lrtri: "⊿",
    lsaquo: "‹",
    lscr: "𝓁",
    Lscr: "ℒ",
    lsh: "↰",
    Lsh: "↰",
    lsim: "≲",
    lsime: "⪍",
    lsimg: "⪏",
    lsqb: "[",
    lsquo: "‘",
    lsquor: "‚",
    Lstrok: "Ł",
    lstrok: "ł",
    ltcc: "⪦",
    ltcir: "⩹",
    lt: "<",
    LT: "<",
    Lt: "≪",
    ltdot: "⋖",
    lthree: "⋋",
    ltimes: "⋉",
    ltlarr: "⥶",
    ltquest: "⩻",
    ltri: "◃",
    ltrie: "⊴",
    ltrif: "◂",
    ltrPar: "⦖",
    lurdshar: "⥊",
    luruhar: "⥦",
    lvertneqq: "≨︀",
    lvnE: "≨︀",
    macr: "¯",
    male: "♂",
    malt: "✠",
    maltese: "✠",
    map: "↦",
    mapsto: "↦",
    mapstodown: "↧",
    mapstoleft: "↤",
    mapstoup: "↥",
    marker: "▮",
    mcomma: "⨩",
    Mcy: "М",
    mcy: "м",
    mdash: "—",
    mDDot: "∺",
    measuredangle: "∡",
    MediumSpace: " ",
    Mellintrf: "ℳ",
    Mfr: "𝔐",
    mfr: "𝔪",
    mho: "℧",
    micro: "µ",
    midast: "*",
    midcir: "⫰",
    mid: "∣",
    middot: "·",
    minusb: "⊟",
    minus: "−",
    minusd: "∸",
    minusdu: "⨪",
    MinusPlus: "∓",
    mlcp: "⫛",
    mldr: "…",
    mnplus: "∓",
    models: "⊧",
    Mopf: "𝕄",
    mopf: "𝕞",
    mp: "∓",
    mscr: "𝓂",
    Mscr: "ℳ",
    mstpos: "∾",
    Mu: "Μ",
    mu: "μ",
    multimap: "⊸",
    mumap: "⊸",
    nabla: "∇",
    Nacute: "Ń",
    nacute: "ń",
    nang: "∠⃒",
    nap: "≉",
    napE: "⩰̸",
    napid: "≋̸",
    napos: "ŉ",
    napprox: "≉",
    natural: "♮",
    naturals: "ℕ",
    natur: "♮",
    nbsp: " ",
    nbump: "≎̸",
    nbumpe: "≏̸",
    ncap: "⩃",
    Ncaron: "Ň",
    ncaron: "ň",
    Ncedil: "Ņ",
    ncedil: "ņ",
    ncong: "≇",
    ncongdot: "⩭̸",
    ncup: "⩂",
    Ncy: "Н",
    ncy: "н",
    ndash: "–",
    nearhk: "⤤",
    nearr: "↗",
    neArr: "⇗",
    nearrow: "↗",
    ne: "≠",
    nedot: "≐̸",
    NegativeMediumSpace: "​",
    NegativeThickSpace: "​",
    NegativeThinSpace: "​",
    NegativeVeryThinSpace: "​",
    nequiv: "≢",
    nesear: "⤨",
    nesim: "≂̸",
    NestedGreaterGreater: "≫",
    NestedLessLess: "≪",
    NewLine: "\n",
    nexist: "∄",
    nexists: "∄",
    Nfr: "𝔑",
    nfr: "𝔫",
    ngE: "≧̸",
    nge: "≱",
    ngeq: "≱",
    ngeqq: "≧̸",
    ngeqslant: "⩾̸",
    nges: "⩾̸",
    nGg: "⋙̸",
    ngsim: "≵",
    nGt: "≫⃒",
    ngt: "≯",
    ngtr: "≯",
    nGtv: "≫̸",
    nharr: "↮",
    nhArr: "⇎",
    nhpar: "⫲",
    ni: "∋",
    nis: "⋼",
    nisd: "⋺",
    niv: "∋",
    NJcy: "Њ",
    njcy: "њ",
    nlarr: "↚",
    nlArr: "⇍",
    nldr: "‥",
    nlE: "≦̸",
    nle: "≰",
    nleftarrow: "↚",
    nLeftarrow: "⇍",
    nleftrightarrow: "↮",
    nLeftrightarrow: "⇎",
    nleq: "≰",
    nleqq: "≦̸",
    nleqslant: "⩽̸",
    nles: "⩽̸",
    nless: "≮",
    nLl: "⋘̸",
    nlsim: "≴",
    nLt: "≪⃒",
    nlt: "≮",
    nltri: "⋪",
    nltrie: "⋬",
    nLtv: "≪̸",
    nmid: "∤",
    NoBreak: "⁠",
    NonBreakingSpace: " ",
    nopf: "𝕟",
    Nopf: "ℕ",
    Not: "⫬",
    not: "¬",
    NotCongruent: "≢",
    NotCupCap: "≭",
    NotDoubleVerticalBar: "∦",
    NotElement: "∉",
    NotEqual: "≠",
    NotEqualTilde: "≂̸",
    NotExists: "∄",
    NotGreater: "≯",
    NotGreaterEqual: "≱",
    NotGreaterFullEqual: "≧̸",
    NotGreaterGreater: "≫̸",
    NotGreaterLess: "≹",
    NotGreaterSlantEqual: "⩾̸",
    NotGreaterTilde: "≵",
    NotHumpDownHump: "≎̸",
    NotHumpEqual: "≏̸",
    notin: "∉",
    notindot: "⋵̸",
    notinE: "⋹̸",
    notinva: "∉",
    notinvb: "⋷",
    notinvc: "⋶",
    NotLeftTriangleBar: "⧏̸",
    NotLeftTriangle: "⋪",
    NotLeftTriangleEqual: "⋬",
    NotLess: "≮",
    NotLessEqual: "≰",
    NotLessGreater: "≸",
    NotLessLess: "≪̸",
    NotLessSlantEqual: "⩽̸",
    NotLessTilde: "≴",
    NotNestedGreaterGreater: "⪢̸",
    NotNestedLessLess: "⪡̸",
    notni: "∌",
    notniva: "∌",
    notnivb: "⋾",
    notnivc: "⋽",
    NotPrecedes: "⊀",
    NotPrecedesEqual: "⪯̸",
    NotPrecedesSlantEqual: "⋠",
    NotReverseElement: "∌",
    NotRightTriangleBar: "⧐̸",
    NotRightTriangle: "⋫",
    NotRightTriangleEqual: "⋭",
    NotSquareSubset: "⊏̸",
    NotSquareSubsetEqual: "⋢",
    NotSquareSuperset: "⊐̸",
    NotSquareSupersetEqual: "⋣",
    NotSubset: "⊂⃒",
    NotSubsetEqual: "⊈",
    NotSucceeds: "⊁",
    NotSucceedsEqual: "⪰̸",
    NotSucceedsSlantEqual: "⋡",
    NotSucceedsTilde: "≿̸",
    NotSuperset: "⊃⃒",
    NotSupersetEqual: "⊉",
    NotTilde: "≁",
    NotTildeEqual: "≄",
    NotTildeFullEqual: "≇",
    NotTildeTilde: "≉",
    NotVerticalBar: "∤",
    nparallel: "∦",
    npar: "∦",
    nparsl: "⫽⃥",
    npart: "∂̸",
    npolint: "⨔",
    npr: "⊀",
    nprcue: "⋠",
    nprec: "⊀",
    npreceq: "⪯̸",
    npre: "⪯̸",
    nrarrc: "⤳̸",
    nrarr: "↛",
    nrArr: "⇏",
    nrarrw: "↝̸",
    nrightarrow: "↛",
    nRightarrow: "⇏",
    nrtri: "⋫",
    nrtrie: "⋭",
    nsc: "⊁",
    nsccue: "⋡",
    nsce: "⪰̸",
    Nscr: "𝒩",
    nscr: "𝓃",
    nshortmid: "∤",
    nshortparallel: "∦",
    nsim: "≁",
    nsime: "≄",
    nsimeq: "≄",
    nsmid: "∤",
    nspar: "∦",
    nsqsube: "⋢",
    nsqsupe: "⋣",
    nsub: "⊄",
    nsubE: "⫅̸",
    nsube: "⊈",
    nsubset: "⊂⃒",
    nsubseteq: "⊈",
    nsubseteqq: "⫅̸",
    nsucc: "⊁",
    nsucceq: "⪰̸",
    nsup: "⊅",
    nsupE: "⫆̸",
    nsupe: "⊉",
    nsupset: "⊃⃒",
    nsupseteq: "⊉",
    nsupseteqq: "⫆̸",
    ntgl: "≹",
    Ntilde: "Ñ",
    ntilde: "ñ",
    ntlg: "≸",
    ntriangleleft: "⋪",
    ntrianglelefteq: "⋬",
    ntriangleright: "⋫",
    ntrianglerighteq: "⋭",
    Nu: "Ν",
    nu: "ν",
    num: "#",
    numero: "№",
    numsp: " ",
    nvap: "≍⃒",
    nvdash: "⊬",
    nvDash: "⊭",
    nVdash: "⊮",
    nVDash: "⊯",
    nvge: "≥⃒",
    nvgt: ">⃒",
    nvHarr: "⤄",
    nvinfin: "⧞",
    nvlArr: "⤂",
    nvle: "≤⃒",
    nvlt: "<⃒",
    nvltrie: "⊴⃒",
    nvrArr: "⤃",
    nvrtrie: "⊵⃒",
    nvsim: "∼⃒",
    nwarhk: "⤣",
    nwarr: "↖",
    nwArr: "⇖",
    nwarrow: "↖",
    nwnear: "⤧",
    Oacute: "Ó",
    oacute: "ó",
    oast: "⊛",
    Ocirc: "Ô",
    ocirc: "ô",
    ocir: "⊚",
    Ocy: "О",
    ocy: "о",
    odash: "⊝",
    Odblac: "Ő",
    odblac: "ő",
    odiv: "⨸",
    odot: "⊙",
    odsold: "⦼",
    OElig: "Œ",
    oelig: "œ",
    ofcir: "⦿",
    Ofr: "𝔒",
    ofr: "𝔬",
    ogon: "˛",
    Ograve: "Ò",
    ograve: "ò",
    ogt: "⧁",
    ohbar: "⦵",
    ohm: "Ω",
    oint: "∮",
    olarr: "↺",
    olcir: "⦾",
    olcross: "⦻",
    oline: "‾",
    olt: "⧀",
    Omacr: "Ō",
    omacr: "ō",
    Omega: "Ω",
    omega: "ω",
    Omicron: "Ο",
    omicron: "ο",
    omid: "⦶",
    ominus: "⊖",
    Oopf: "𝕆",
    oopf: "𝕠",
    opar: "⦷",
    OpenCurlyDoubleQuote: "“",
    OpenCurlyQuote: "‘",
    operp: "⦹",
    oplus: "⊕",
    orarr: "↻",
    Or: "⩔",
    or: "∨",
    ord: "⩝",
    order: "ℴ",
    orderof: "ℴ",
    ordf: "ª",
    ordm: "º",
    origof: "⊶",
    oror: "⩖",
    orslope: "⩗",
    orv: "⩛",
    oS: "Ⓢ",
    Oscr: "𝒪",
    oscr: "ℴ",
    Oslash: "Ø",
    oslash: "ø",
    osol: "⊘",
    Otilde: "Õ",
    otilde: "õ",
    otimesas: "⨶",
    Otimes: "⨷",
    otimes: "⊗",
    Ouml: "Ö",
    ouml: "ö",
    ovbar: "⌽",
    OverBar: "‾",
    OverBrace: "⏞",
    OverBracket: "⎴",
    OverParenthesis: "⏜",
    para: "¶",
    parallel: "∥",
    par: "∥",
    parsim: "⫳",
    parsl: "⫽",
    part: "∂",
    PartialD: "∂",
    Pcy: "П",
    pcy: "п",
    percnt: "%",
    period: ".",
    permil: "‰",
    perp: "⊥",
    pertenk: "‱",
    Pfr: "𝔓",
    pfr: "𝔭",
    Phi: "Φ",
    phi: "φ",
    phiv: "ϕ",
    phmmat: "ℳ",
    phone: "☎",
    Pi: "Π",
    pi: "π",
    pitchfork: "⋔",
    piv: "ϖ",
    planck: "ℏ",
    planckh: "ℎ",
    plankv: "ℏ",
    plusacir: "⨣",
    plusb: "⊞",
    pluscir: "⨢",
    plus: "+",
    plusdo: "∔",
    plusdu: "⨥",
    pluse: "⩲",
    PlusMinus: "±",
    plusmn: "±",
    plussim: "⨦",
    plustwo: "⨧",
    pm: "±",
    Poincareplane: "ℌ",
    pointint: "⨕",
    popf: "𝕡",
    Popf: "ℙ",
    pound: "£",
    prap: "⪷",
    Pr: "⪻",
    pr: "≺",
    prcue: "≼",
    precapprox: "⪷",
    prec: "≺",
    preccurlyeq: "≼",
    Precedes: "≺",
    PrecedesEqual: "⪯",
    PrecedesSlantEqual: "≼",
    PrecedesTilde: "≾",
    preceq: "⪯",
    precnapprox: "⪹",
    precneqq: "⪵",
    precnsim: "⋨",
    pre: "⪯",
    prE: "⪳",
    precsim: "≾",
    prime: "′",
    Prime: "″",
    primes: "ℙ",
    prnap: "⪹",
    prnE: "⪵",
    prnsim: "⋨",
    prod: "∏",
    Product: "∏",
    profalar: "⌮",
    profline: "⌒",
    profsurf: "⌓",
    prop: "∝",
    Proportional: "∝",
    Proportion: "∷",
    propto: "∝",
    prsim: "≾",
    prurel: "⊰",
    Pscr: "𝒫",
    pscr: "𝓅",
    Psi: "Ψ",
    psi: "ψ",
    puncsp: " ",
    Qfr: "𝔔",
    qfr: "𝔮",
    qint: "⨌",
    qopf: "𝕢",
    Qopf: "ℚ",
    qprime: "⁗",
    Qscr: "𝒬",
    qscr: "𝓆",
    quaternions: "ℍ",
    quatint: "⨖",
    quest: "?",
    questeq: "≟",
    quot: "\"",
    QUOT: "\"",
    rAarr: "⇛",
    race: "∽̱",
    Racute: "Ŕ",
    racute: "ŕ",
    radic: "√",
    raemptyv: "⦳",
    rang: "⟩",
    Rang: "⟫",
    rangd: "⦒",
    range: "⦥",
    rangle: "⟩",
    raquo: "»",
    rarrap: "⥵",
    rarrb: "⇥",
    rarrbfs: "⤠",
    rarrc: "⤳",
    rarr: "→",
    Rarr: "↠",
    rArr: "⇒",
    rarrfs: "⤞",
    rarrhk: "↪",
    rarrlp: "↬",
    rarrpl: "⥅",
    rarrsim: "⥴",
    Rarrtl: "⤖",
    rarrtl: "↣",
    rarrw: "↝",
    ratail: "⤚",
    rAtail: "⤜",
    ratio: "∶",
    rationals: "ℚ",
    rbarr: "⤍",
    rBarr: "⤏",
    RBarr: "⤐",
    rbbrk: "❳",
    rbrace: "}",
    rbrack: "]",
    rbrke: "⦌",
    rbrksld: "⦎",
    rbrkslu: "⦐",
    Rcaron: "Ř",
    rcaron: "ř",
    Rcedil: "Ŗ",
    rcedil: "ŗ",
    rceil: "⌉",
    rcub: "}",
    Rcy: "Р",
    rcy: "р",
    rdca: "⤷",
    rdldhar: "⥩",
    rdquo: "”",
    rdquor: "”",
    rdsh: "↳",
    real: "ℜ",
    realine: "ℛ",
    realpart: "ℜ",
    reals: "ℝ",
    Re: "ℜ",
    rect: "▭",
    reg: "®",
    REG: "®",
    ReverseElement: "∋",
    ReverseEquilibrium: "⇋",
    ReverseUpEquilibrium: "⥯",
    rfisht: "⥽",
    rfloor: "⌋",
    rfr: "𝔯",
    Rfr: "ℜ",
    rHar: "⥤",
    rhard: "⇁",
    rharu: "⇀",
    rharul: "⥬",
    Rho: "Ρ",
    rho: "ρ",
    rhov: "ϱ",
    RightAngleBracket: "⟩",
    RightArrowBar: "⇥",
    rightarrow: "→",
    RightArrow: "→",
    Rightarrow: "⇒",
    RightArrowLeftArrow: "⇄",
    rightarrowtail: "↣",
    RightCeiling: "⌉",
    RightDoubleBracket: "⟧",
    RightDownTeeVector: "⥝",
    RightDownVectorBar: "⥕",
    RightDownVector: "⇂",
    RightFloor: "⌋",
    rightharpoondown: "⇁",
    rightharpoonup: "⇀",
    rightleftarrows: "⇄",
    rightleftharpoons: "⇌",
    rightrightarrows: "⇉",
    rightsquigarrow: "↝",
    RightTeeArrow: "↦",
    RightTee: "⊢",
    RightTeeVector: "⥛",
    rightthreetimes: "⋌",
    RightTriangleBar: "⧐",
    RightTriangle: "⊳",
    RightTriangleEqual: "⊵",
    RightUpDownVector: "⥏",
    RightUpTeeVector: "⥜",
    RightUpVectorBar: "⥔",
    RightUpVector: "↾",
    RightVectorBar: "⥓",
    RightVector: "⇀",
    ring: "˚",
    risingdotseq: "≓",
    rlarr: "⇄",
    rlhar: "⇌",
    rlm: "‏",
    rmoustache: "⎱",
    rmoust: "⎱",
    rnmid: "⫮",
    roang: "⟭",
    roarr: "⇾",
    robrk: "⟧",
    ropar: "⦆",
    ropf: "𝕣",
    Ropf: "ℝ",
    roplus: "⨮",
    rotimes: "⨵",
    RoundImplies: "⥰",
    rpar: ")",
    rpargt: "⦔",
    rppolint: "⨒",
    rrarr: "⇉",
    Rrightarrow: "⇛",
    rsaquo: "›",
    rscr: "𝓇",
    Rscr: "ℛ",
    rsh: "↱",
    Rsh: "↱",
    rsqb: "]",
    rsquo: "’",
    rsquor: "’",
    rthree: "⋌",
    rtimes: "⋊",
    rtri: "▹",
    rtrie: "⊵",
    rtrif: "▸",
    rtriltri: "⧎",
    RuleDelayed: "⧴",
    ruluhar: "⥨",
    rx: "℞",
    Sacute: "Ś",
    sacute: "ś",
    sbquo: "‚",
    scap: "⪸",
    Scaron: "Š",
    scaron: "š",
    Sc: "⪼",
    sc: "≻",
    sccue: "≽",
    sce: "⪰",
    scE: "⪴",
    Scedil: "Ş",
    scedil: "ş",
    Scirc: "Ŝ",
    scirc: "ŝ",
    scnap: "⪺",
    scnE: "⪶",
    scnsim: "⋩",
    scpolint: "⨓",
    scsim: "≿",
    Scy: "С",
    scy: "с",
    sdotb: "⊡",
    sdot: "⋅",
    sdote: "⩦",
    searhk: "⤥",
    searr: "↘",
    seArr: "⇘",
    searrow: "↘",
    sect: "§",
    semi: ";",
    seswar: "⤩",
    setminus: "∖",
    setmn: "∖",
    sext: "✶",
    Sfr: "𝔖",
    sfr: "𝔰",
    sfrown: "⌢",
    sharp: "♯",
    SHCHcy: "Щ",
    shchcy: "щ",
    SHcy: "Ш",
    shcy: "ш",
    ShortDownArrow: "↓",
    ShortLeftArrow: "←",
    shortmid: "∣",
    shortparallel: "∥",
    ShortRightArrow: "→",
    ShortUpArrow: "↑",
    shy: "­",
    Sigma: "Σ",
    sigma: "σ",
    sigmaf: "ς",
    sigmav: "ς",
    sim: "∼",
    simdot: "⩪",
    sime: "≃",
    simeq: "≃",
    simg: "⪞",
    simgE: "⪠",
    siml: "⪝",
    simlE: "⪟",
    simne: "≆",
    simplus: "⨤",
    simrarr: "⥲",
    slarr: "←",
    SmallCircle: "∘",
    smallsetminus: "∖",
    smashp: "⨳",
    smeparsl: "⧤",
    smid: "∣",
    smile: "⌣",
    smt: "⪪",
    smte: "⪬",
    smtes: "⪬︀",
    SOFTcy: "Ь",
    softcy: "ь",
    solbar: "⌿",
    solb: "⧄",
    sol: "/",
    Sopf: "𝕊",
    sopf: "𝕤",
    spades: "♠",
    spadesuit: "♠",
    spar: "∥",
    sqcap: "⊓",
    sqcaps: "⊓︀",
    sqcup: "⊔",
    sqcups: "⊔︀",
    Sqrt: "√",
    sqsub: "⊏",
    sqsube: "⊑",
    sqsubset: "⊏",
    sqsubseteq: "⊑",
    sqsup: "⊐",
    sqsupe: "⊒",
    sqsupset: "⊐",
    sqsupseteq: "⊒",
    square: "□",
    Square: "□",
    SquareIntersection: "⊓",
    SquareSubset: "⊏",
    SquareSubsetEqual: "⊑",
    SquareSuperset: "⊐",
    SquareSupersetEqual: "⊒",
    SquareUnion: "⊔",
    squarf: "▪",
    squ: "□",
    squf: "▪",
    srarr: "→",
    Sscr: "𝒮",
    sscr: "𝓈",
    ssetmn: "∖",
    ssmile: "⌣",
    sstarf: "⋆",
    Star: "⋆",
    star: "☆",
    starf: "★",
    straightepsilon: "ϵ",
    straightphi: "ϕ",
    strns: "¯",
    sub: "⊂",
    Sub: "⋐",
    subdot: "⪽",
    subE: "⫅",
    sube: "⊆",
    subedot: "⫃",
    submult: "⫁",
    subnE: "⫋",
    subne: "⊊",
    subplus: "⪿",
    subrarr: "⥹",
    subset: "⊂",
    Subset: "⋐",
    subseteq: "⊆",
    subseteqq: "⫅",
    SubsetEqual: "⊆",
    subsetneq: "⊊",
    subsetneqq: "⫋",
    subsim: "⫇",
    subsub: "⫕",
    subsup: "⫓",
    succapprox: "⪸",
    succ: "≻",
    succcurlyeq: "≽",
    Succeeds: "≻",
    SucceedsEqual: "⪰",
    SucceedsSlantEqual: "≽",
    SucceedsTilde: "≿",
    succeq: "⪰",
    succnapprox: "⪺",
    succneqq: "⪶",
    succnsim: "⋩",
    succsim: "≿",
    SuchThat: "∋",
    sum: "∑",
    Sum: "∑",
    sung: "♪",
    sup1: "¹",
    sup2: "²",
    sup3: "³",
    sup: "⊃",
    Sup: "⋑",
    supdot: "⪾",
    supdsub: "⫘",
    supE: "⫆",
    supe: "⊇",
    supedot: "⫄",
    Superset: "⊃",
    SupersetEqual: "⊇",
    suphsol: "⟉",
    suphsub: "⫗",
    suplarr: "⥻",
    supmult: "⫂",
    supnE: "⫌",
    supne: "⊋",
    supplus: "⫀",
    supset: "⊃",
    Supset: "⋑",
    supseteq: "⊇",
    supseteqq: "⫆",
    supsetneq: "⊋",
    supsetneqq: "⫌",
    supsim: "⫈",
    supsub: "⫔",
    supsup: "⫖",
    swarhk: "⤦",
    swarr: "↙",
    swArr: "⇙",
    swarrow: "↙",
    swnwar: "⤪",
    szlig: "ß",
    Tab: "\t",
    target: "⌖",
    Tau: "Τ",
    tau: "τ",
    tbrk: "⎴",
    Tcaron: "Ť",
    tcaron: "ť",
    Tcedil: "Ţ",
    tcedil: "ţ",
    Tcy: "Т",
    tcy: "т",
    tdot: "⃛",
    telrec: "⌕",
    Tfr: "𝔗",
    tfr: "𝔱",
    there4: "∴",
    therefore: "∴",
    Therefore: "∴",
    Theta: "Θ",
    theta: "θ",
    thetasym: "ϑ",
    thetav: "ϑ",
    thickapprox: "≈",
    thicksim: "∼",
    ThickSpace: "  ",
    ThinSpace: " ",
    thinsp: " ",
    thkap: "≈",
    thksim: "∼",
    THORN: "Þ",
    thorn: "þ",
    tilde: "˜",
    Tilde: "∼",
    TildeEqual: "≃",
    TildeFullEqual: "≅",
    TildeTilde: "≈",
    timesbar: "⨱",
    timesb: "⊠",
    times: "×",
    timesd: "⨰",
    tint: "∭",
    toea: "⤨",
    topbot: "⌶",
    topcir: "⫱",
    top: "⊤",
    Topf: "𝕋",
    topf: "𝕥",
    topfork: "⫚",
    tosa: "⤩",
    tprime: "‴",
    trade: "™",
    TRADE: "™",
    triangle: "▵",
    triangledown: "▿",
    triangleleft: "◃",
    trianglelefteq: "⊴",
    triangleq: "≜",
    triangleright: "▹",
    trianglerighteq: "⊵",
    tridot: "◬",
    trie: "≜",
    triminus: "⨺",
    TripleDot: "⃛",
    triplus: "⨹",
    trisb: "⧍",
    tritime: "⨻",
    trpezium: "⏢",
    Tscr: "𝒯",
    tscr: "𝓉",
    TScy: "Ц",
    tscy: "ц",
    TSHcy: "Ћ",
    tshcy: "ћ",
    Tstrok: "Ŧ",
    tstrok: "ŧ",
    twixt: "≬",
    twoheadleftarrow: "↞",
    twoheadrightarrow: "↠",
    Uacute: "Ú",
    uacute: "ú",
    uarr: "↑",
    Uarr: "↟",
    uArr: "⇑",
    Uarrocir: "⥉",
    Ubrcy: "Ў",
    ubrcy: "ў",
    Ubreve: "Ŭ",
    ubreve: "ŭ",
    Ucirc: "Û",
    ucirc: "û",
    Ucy: "У",
    ucy: "у",
    udarr: "⇅",
    Udblac: "Ű",
    udblac: "ű",
    udhar: "⥮",
    ufisht: "⥾",
    Ufr: "𝔘",
    ufr: "𝔲",
    Ugrave: "Ù",
    ugrave: "ù",
    uHar: "⥣",
    uharl: "↿",
    uharr: "↾",
    uhblk: "▀",
    ulcorn: "⌜",
    ulcorner: "⌜",
    ulcrop: "⌏",
    ultri: "◸",
    Umacr: "Ū",
    umacr: "ū",
    uml: "¨",
    UnderBar: "_",
    UnderBrace: "⏟",
    UnderBracket: "⎵",
    UnderParenthesis: "⏝",
    Union: "⋃",
    UnionPlus: "⊎",
    Uogon: "Ų",
    uogon: "ų",
    Uopf: "𝕌",
    uopf: "𝕦",
    UpArrowBar: "⤒",
    uparrow: "↑",
    UpArrow: "↑",
    Uparrow: "⇑",
    UpArrowDownArrow: "⇅",
    updownarrow: "↕",
    UpDownArrow: "↕",
    Updownarrow: "⇕",
    UpEquilibrium: "⥮",
    upharpoonleft: "↿",
    upharpoonright: "↾",
    uplus: "⊎",
    UpperLeftArrow: "↖",
    UpperRightArrow: "↗",
    upsi: "υ",
    Upsi: "ϒ",
    upsih: "ϒ",
    Upsilon: "Υ",
    upsilon: "υ",
    UpTeeArrow: "↥",
    UpTee: "⊥",
    upuparrows: "⇈",
    urcorn: "⌝",
    urcorner: "⌝",
    urcrop: "⌎",
    Uring: "Ů",
    uring: "ů",
    urtri: "◹",
    Uscr: "𝒰",
    uscr: "𝓊",
    utdot: "⋰",
    Utilde: "Ũ",
    utilde: "ũ",
    utri: "▵",
    utrif: "▴",
    uuarr: "⇈",
    Uuml: "Ü",
    uuml: "ü",
    uwangle: "⦧",
    vangrt: "⦜",
    varepsilon: "ϵ",
    varkappa: "ϰ",
    varnothing: "∅",
    varphi: "ϕ",
    varpi: "ϖ",
    varpropto: "∝",
    varr: "↕",
    vArr: "⇕",
    varrho: "ϱ",
    varsigma: "ς",
    varsubsetneq: "⊊︀",
    varsubsetneqq: "⫋︀",
    varsupsetneq: "⊋︀",
    varsupsetneqq: "⫌︀",
    vartheta: "ϑ",
    vartriangleleft: "⊲",
    vartriangleright: "⊳",
    vBar: "⫨",
    Vbar: "⫫",
    vBarv: "⫩",
    Vcy: "В",
    vcy: "в",
    vdash: "⊢",
    vDash: "⊨",
    Vdash: "⊩",
    VDash: "⊫",
    Vdashl: "⫦",
    veebar: "⊻",
    vee: "∨",
    Vee: "⋁",
    veeeq: "≚",
    vellip: "⋮",
    verbar: "|",
    Verbar: "‖",
    vert: "|",
    Vert: "‖",
    VerticalBar: "∣",
    VerticalLine: "|",
    VerticalSeparator: "❘",
    VerticalTilde: "≀",
    VeryThinSpace: " ",
    Vfr: "𝔙",
    vfr: "𝔳",
    vltri: "⊲",
    vnsub: "⊂⃒",
    vnsup: "⊃⃒",
    Vopf: "𝕍",
    vopf: "𝕧",
    vprop: "∝",
    vrtri: "⊳",
    Vscr: "𝒱",
    vscr: "𝓋",
    vsubnE: "⫋︀",
    vsubne: "⊊︀",
    vsupnE: "⫌︀",
    vsupne: "⊋︀",
    Vvdash: "⊪",
    vzigzag: "⦚",
    Wcirc: "Ŵ",
    wcirc: "ŵ",
    wedbar: "⩟",
    wedge: "∧",
    Wedge: "⋀",
    wedgeq: "≙",
    weierp: "℘",
    Wfr: "𝔚",
    wfr: "𝔴",
    Wopf: "𝕎",
    wopf: "𝕨",
    wp: "℘",
    wr: "≀",
    wreath: "≀",
    Wscr: "𝒲",
    wscr: "𝓌",
    xcap: "⋂",
    xcirc: "◯",
    xcup: "⋃",
    xdtri: "▽",
    Xfr: "𝔛",
    xfr: "𝔵",
    xharr: "⟷",
    xhArr: "⟺",
    Xi: "Ξ",
    xi: "ξ",
    xlarr: "⟵",
    xlArr: "⟸",
    xmap: "⟼",
    xnis: "⋻",
    xodot: "⨀",
    Xopf: "𝕏",
    xopf: "𝕩",
    xoplus: "⨁",
    xotime: "⨂",
    xrarr: "⟶",
    xrArr: "⟹",
    Xscr: "𝒳",
    xscr: "𝓍",
    xsqcup: "⨆",
    xuplus: "⨄",
    xutri: "△",
    xvee: "⋁",
    xwedge: "⋀",
    Yacute: "Ý",
    yacute: "ý",
    YAcy: "Я",
    yacy: "я",
    Ycirc: "Ŷ",
    ycirc: "ŷ",
    Ycy: "Ы",
    ycy: "ы",
    yen: "¥",
    Yfr: "𝔜",
    yfr: "𝔶",
    YIcy: "Ї",
    yicy: "ї",
    Yopf: "𝕐",
    yopf: "𝕪",
    Yscr: "𝒴",
    yscr: "𝓎",
    YUcy: "Ю",
    yucy: "ю",
    yuml: "ÿ",
    Yuml: "Ÿ",
    Zacute: "Ź",
    zacute: "ź",
    Zcaron: "Ž",
    zcaron: "ž",
    Zcy: "З",
    zcy: "з",
    Zdot: "Ż",
    zdot: "ż",
    zeetrf: "ℨ",
    ZeroWidthSpace: "​",
    Zeta: "Ζ",
    zeta: "ζ",
    zfr: "𝔷",
    Zfr: "ℨ",
    ZHcy: "Ж",
    zhcy: "ж",
    zigrarr: "⇝",
    zopf: "𝕫",
    Zopf: "ℤ",
    Zscr: "𝒵",
    zscr: "𝓏",
    zwj: "‍",
    zwnj: "‌",
}}

function stringRepeatPolyfill() {
/*! http://mths.be/repeat v0.2.0 by @mathias */
if (!String.prototype.repeat)
(function() {
  var defineProperty = (function() {
    // IE 8 only supports `Object.defineProperty` on DOM elements
    try {
      var obj = {};
      var $defineProperty = Object.defineProperty;
      var result = $defineProperty(obj, obj, obj) && $defineProperty;
    } catch(error) {}
    return result;
  }());
  var repeat = function(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    // `ToInteger`
    var n = count ? Number(count) : 0;
    if (n != n) { // better `isNaN`
      n = 0;
    }
    // Account for out-of-bounds indices
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    var result = '';
    while (n) {
      if (n % 2 == 1) {
        result += string;
      }
      if (n > 1) {
        string += string;
      }
      n >>= 1;
    }
    return result;
  };
  if (defineProperty) {
    defineProperty(String.prototype, 'repeat', {
      'value': repeat,
      'configurable': true,
      'writable': true
    });
  } else {
    String.prototype.repeat = repeat;
  }
}());
}

function fromCodePointPolyfill (...args) {
/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
    if (!arguments.length)
        return "";

    try {
        return String.fromCodePoint(...args);
    } catch (e) {
        if (e instanceof RangeError)
        return String.fromCharCode(0xfffd);
    }

    var codeUnits = [];
    var highSurrogate,
        lowSurrogate;

    var i;
    let MAX_SIZE = 0x4000;

    var result = "";
    while (++i < args.length) {
      var codePoint = Number(arguments[i]);

      if (!isFinite(codePoint)
      ||  codePoint < 0
      ||  codePoint > 0x10ffff
      ||  floor(codePoint) !== codePoint)
          return String.fromCharCode(0xfffd);

      //  bmp code point
      if (codePoint <= 0xffff)
          codeUnits.push(codePoint);
      else
      //  astral code point (surrogate halves)
      //  … surrogate formulae, js encoding 
      codePoint <= 0xffff,
      codePoint -= 0x10000,
      highSurrogate = (codePoint>>10)+0xd800,
      lowSurrogate = (codePoint%0x400)+0xdc00,

      codeUnits
     .push(highSurrogate, lowSurrogate);

      if (i + 1 === args.length
      ||  codeUnits.length > MAX_SIZE)
          codeUnits.length = 0,
          result += stringFromCharCode.apply(null, codeUnits);
    }

    return result;
}

})));
