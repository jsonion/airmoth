<html>
<head>
<script type="text/javascript" src="./commonmark@0.30.0.js"></script>
<script type="text/javascript">

Array.prototype._concat = function (...arrays) {
  consoleLog("concat", this.concat(...arrays));
};

Array.prototype._splice = function (i=0, del=0, ...vals) {
  let item = [...this];
  this.splice(i, del, ...vals);

  consoleLog("splice", i, del, item, this);
};

Array.prototype._push = function (...vals) {
  consoleLog("push", ...vals);
  this.push(...vals);
}

Array.prototype._pop = function (n=1) {
  consoleLog("pop", n, this.pop());
}

Array.prototype._findLastIndex = function (fn) {
  let res = this.findLastIndex(fn);
  consoleLog("findLastIndex", res, this[res]);
}

for (let i=0; i<=8; i++) {
  Object.defineProperty(Array.prototype, `_${i}`, {
     get: function () {
          return this[i];
     },
     set: function (val) {
          consoleLog("set", i, this[i], val);
          this[i] = val;
     },
  });
}

const {existsSync, readFileSync, writeFileSync}
    = typeof require !== "undefined" && require("fs") || {};

const commonmark
    = typeof require !== "undefined" && require("./commonmark@0.30.0")
      || window.commonmark;

const jsonion = new Object({
///  ---------
 rxDelimiter:"|",

 rx: {
   fnName: /(?:(class|function\**) ([^\s\{]+|[^\s\(]+)|\([^\)]*\)\s*=>\s*{)/g,
 },
 rxFromArray,
 encodeRxSpecialChars,
 encode_unsafe:[ encodeRxSpecialChars, 
                 commonmark.lib.encode_unsafe ],
 log: consoleLog,
 err:{ TYPE: "Type mismatch",
       PATH: "Path not found",
      INPUT: "Invalid input parameter",
      SCOPE: "Value out of scope",
     FORMAT: "Value format invalid",
     OUTPUT: "Function output invalid",
  MISCONFIG: "Misconfiguration",
   suppress: false,
       emit: consoleTrace,
   reportArgDepth: 10,
   reportArgValue: true,
   makeExecutable:
  (typeof makeExecutableErrorMap === "function"
       && makeExecutableErrorMap) ||
   function (errorTypes = this) {
   var errorMap = [];
   if (errorTypes === this)
       jsonion.err = errorMap;

   Object.entries(errorTypes)
         .forEach(([type,err]) => {
   if (typeof str === "string")
       errorMap[err] = function (...msg) {
       errorMap.push([err,
      (!msg.length) ? err : `${err}:`, ...msg]);
   }})}
}});  

const jstr = new Object({
 ///  ----
  mdParser: void null,
  time: [2,4],

  rx: {
    symbols: /[^\w\s[[:cntrl:]]]/g,
    sameChr: /^(?<c>.)\k<c>+$/,
    heading: /h([1-6])/g,
    opStack: ["\\s+", "<=","=>", "*","^",":",".","&","-",">","@","#", "[","]","=","<","!","\"","\'","\`"],
      space: / +/g,
    pick: function (...keys) {
      if (!keys.length)
           keys=Object.keys(this);
      
      let res=new Array();
      return keys.every(key => this[key]
             && res.push([key, this[key]]))
             && res;
  }},
  timeRxReplacer: (str) => {
    var res=[];
    if (typeof str === "string"
            && str.length)
    for (let i=time; i>1; i--) {
         res.push(str.repeat(i));
    }

    res.push(str);
    return res;
  },

   ////////////////
  //  methods ...
  validateConfig,
  getConfigDefaults: getConfigDefaults__en,
});

var configDoc = `
# Keyboard profile
[directional]: w, a, s, d
[A]: space
[B]: ctrl
[select]: backspace
[return]: enter

# Move sequences
... default: \`#shift-vibe\`

## shift-vibe &&&& ^^^^
( .velocity-boost, .height, .freeze, .twitch )
... default: \`#tap\`

- "Just vibing"
  [A:shift-vibe] => \`:tap\`
  [B] => \`:bounce\`
  [back] => \`:3-step\` 

- "Any other time"

- "Just taking notes"

## [Add new sequence](javascript:new) … && ^^ @#
( . . . )
  default: \` # @ … \`

  "Can describe"

- "New move" \` && !&!& !^^^ # @ … \`
  [directional, A, B] => \` * . : &&&& -- >  … \`

# Syntax
... each new \`time\`
    when \`move\` runs out
    and \`inputs\` are forfeit,
    transition back to last \`default\`

## Direction subsets
... expression: [directional]
 - general: \`w, a, s, d\`
 - precise: \`wa, as, sd, dw\`
 - front-back: \`w, s\`
 - sideways: \`a, d\`
 - back: \`s\`
 - forth: \`w\`
 - split-frontal: \`ws\`
 - split-sideways: \`ad\`

## [Sequence types](http:bunch.jstr.co)
  \`@one-off\`, \`#continuous\`

## Sequence modifiers
- \`:variation\`
- \`.modifier\`
  \`&insert\`
  \`-transition\`
  \`>reposition\`

## Phases (modifer)
  \`*trigger\`
  \`&start\`
  \`&&mid\`
  \`&&&end\`
  \`^repetition\`

## Hype (modifer)
 \`.velocity\`
 \`.spring\`
 \`.freeze\`
 \`.twitch\`

## Turns (modifier)
 \`.frontside\`
 \`.backside\`

## Sides (modifer)
 \`.front\`
 \`.back\`
 \`.left\`
 \`.right\`

## Expression aliases
  default <= default
  inverse <= !

  frontside <= fs
  backside  <= bs

  front <= f, fs
  back  <= b, bs
  left  <= l
  right <= r

  high <= hi
  low  <= lo
  mid  <= m
  medium <= m
`;

setTimeout(() => {
  var cfg = typeof require !== "undefined"
   && existsSync("./snowplants.cfg.json")
   && readFileSync("./snowplants.cfg.json");

  jsonion.err = new ErrorMap(jsonion.err);
  jsonion.log
        = (...args) => jsonion.err.push(args)
                    && jsonion.err.log(...args);
  jstr.rx.opStack
        = void jsonion.rxFromArray ||
           new RegExp(jsonion.encodeRxSpecialChars(jstr.rx.opStack));

  let jstrAirmoth
    = new jstrParseMd(commonmark, cfg);

      jstrAirmoth.run(configDoc);
}, 10);

class jstrParseMd {
static validateConfig=jstr.validateConfig;
static getConfigDefaults=jstr.getConfigDefaults;

  //___________________________         *//*
 /*                          */    pos=[0,0];
    curSection=[                      // … //
          0,"",[],[],            //_____- -_____
          0,"",[],[], ""];
    containers=[];                 literal=[ , ]
    outOfScope=0;                  literal_
                            = this.literal;
/// expr=[];  __________________________________
   ahead=[];
  walker;

  constructor (commonmark, cfg) {
    jsonion.cur = this;

    if (typeof commonmark !== "object")
        jsonion.err.INPUT(false,["commonmark",
                                [ commonmark ]]);
    if (cfg) {
    if (!jstrParseMd.validateConfig(cfg))
         jsonion.err.MISCONFIG(false,
                              ["cfg",[cfg]]);
         else
         this.cfg = cfg;
    }
    else
    this.cfg = jstrParseMd.getConfigDefaults();

    jstr.rx.pick()
           .forEach(([key,rx]) => {
         if (rx instanceof RegExp)
             this["re" + key[0].toUpperCase()
                       + key.substring(1)] = rx;
    });
    this.rx = this.reOpStack;

    let reader = new commonmark.Parser();
    let writer = new commonmark
       .HtmlRenderer({ sourcepos: false });

    this.reader = reader;
    this.writer = writer;
    this.writer.render
         = this.replaceRenderFn();

    //  setup cache
    this.ahead[0] = new Array();
    this.ahead[1] = new Object();

    return this;
  ////////////////

    reader.inlineParser.match = function (re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null)
        return null;
    else
        this.pos += m.index + m[0].length;
        return m[0];

        consoleLog(re.source);
    },  commonmark.lib.rx.debugOffset=[0,0,0];

/*  consoleLog(reader.inlineParser.match,
        typeof reader.inlineParser.match);
    consoleLog(commonmark.lib.rx.debugOffset,
        typeof commonmark.lib.rx.debugOffset);
///                                           */
  }

  run (text) {
    jsonion.cur = [this, "run"];

    let parsed  = this.reader.parse(text);
    this.result = this.writer.render(parsed);

    return this.result;
  }

  isContainer (type) {
    switch (type) {
      case "heading":
      case "paragraph":
      case "list": 
      case "item":
      case "emph":
      case "strong":
  /// case "document":
  /// case "link":
           return true;

      case "block_quote":
      case "image":
      case "custom_inline":
      case "custom_block":
           return true;

      default:
           return false;
  }}

  replaceRenderFn() {
  let instance = this;
  return function (ast) {
      var walker = ast.walker(),
          event,
          type;

      instance.walker
             = walker;

      this.buffer  = "";
      this.lastOut = "\n";

      while (event = walker.next()) {
        type=event.node.type;

        if (this[type])
            this[type](event.node,
                       event.entering);

        instance.main.call(instance, event);
      }

      return this.buffer;
  }}

  main (event) {
    let { node, entering }=event;
    let  type = node.type;

    //  in matter
    if (this.curSection[8]
    &&  this.outOfScope === 0) {
    let [key, alias]
      = this.cfg[0][curSection[8]];

    switch (type) {
      case ("text"):
      case ("code"):
        this.rx.lastIndex=0;
        this[section]
            (type, node.literal, key, alias);

        return;

      case ("link"):
        if (!entering)
        break;
                  /// node.destination
        var literal = node.title;
              event = this.next();

        this.rx.lastIndex=0;
        this[section]
            (type, literal, key, alias);

        this.writer[type](event.node,
                          event.entering);
        return;

      case ("linebreak"):
      case ("softbreak"):
        this.main(this.next());
        return;
    }}

     ///////////
    //  debug
    if (jsonion.mode === "development"
    || !jsonion.err.suppress) {
    if (this.isContainer(type)) {
    if (entering) {
    if (type === "heading")
        consoleLog(`<heading.${node.level}>`, node.sourcepos);

        else
        consoleLog("<"+node.type+">", node.sourcepos);

    }
    else
    if (!entering)
        consoleLog("</"+node.type+">");
    }
    else
    if (node._literal)
        consoleLog("<"+node.type+">", node._literal);

        else
        consoleLog("<"+node.type+">");
    } //////////////////////////////////

    if (type === "document"
    || !this.isContainer(type))
   /////////
    return;

    //  resolve container data
    if (this.outOfScope === 0) {
    if (entering)
        this.setContainerData(event);

        else
        this.finalizeContainerData(type);
    }

    //  skip (text within is unprocessed)
    if (type === "image"
    ||  type === "block_quote"
    ||  type === "custom_block"
    ||  type === "custom_inline") {
    if (entering)
        this.outOfScope++;

        else
        this.outOfScope--;

        return;
    }
    else
    if (this.outOfScope)
    //  headings and lists beyond 2nd level
    switch (entering) {
      case (true):
        if (type === "heading"
        ||  type === "list")
            this.outOfScope ++;

        return;

      case (false):
        if (type === "heading")
            this.containers._splice(-2,2);

            else
            this.containers._pop();

        if (type === "heading"
        ||  type === "list")
            this.outOfScope --;

        return;
    }
  }

  setContainerData (event, type="") {
    jsonion.cur = [this, "setContainerData"];

    let { level, sourcepos } = event.node;
    let { curSection, containers } = this;

    if (!type)  //  optimization
         type = event.node.type;

    switch (type) {
      case "heading":
        //  open new section heading
        let [h1_level, h1_key] = curSection;
        let [h2_level, h2_key] = curSection
                                   .slice(4,6);

        if (!h1_level
        ||   h1_level === level)
             curSection[0] = level,
             curSection[2] = sourcepos[0];

        else
        if (!h2_level
        ||   h2_level === level)
             curSection[4] = level,
             curSection[6] = sourcepos[0];

        else
        this.outOfScope ++;

        var closePrevHeading;
       /////
        if (!this.outOfScope) {
            closePrevHeading
          = containers._findLastIndex((lvl,
                                       idx) => {
            if (typeof lvl === "number"
            &&  lvl == level
            &&  idx != 1)
                return true;
            });

        if (closePrevHeading >= 0)
            containers
           ._splice(closePrevHeading-1, 2,
                                  type, level);
        else
            containers
           ._concat([type, level]);
        }

        break;

      case "paragraph":
      case "list":
      case "item":
        if (type === "list"
        &&  containers.indexOf(type)
        !=  containers.lastIndexOf(type))
            this.outOfScope ++;

        else
        containers._push(type);

        break;

      case "strong":
      case "emph":
        if (type === "strong")
            this.literal_.push(["*"]);

            else
            this.literal_.push(["**"]);

        this.literal_
      = this.literal_[0];

        containers._push(type);
        break;

      default:
       return;
    }

    if (sourcepos) {
    if (curSection[0])
        curSection[3] = sourcepos[1];

    if (curSection[4])
        curSection[7] = sourcepos[1];
    }
  }

  finalizeContainerData (type) {
    jsonion.cur=[this, "finalizeContainerData"];
    let { containers, curSection }
                           = this;

    if (type !== "heading")
    switch (type) {
      case "paragraph":
      case "list":
      case "item":
        containers._pop();
        break;

      case "strong":
      case "emph":
        if (type === "strong")
            this.literal_.push("*");

            else
            this.literal_.push("**");

        resolveDeepContainer(markupNestedText);
        break;

      default:
       return;
    }
    else
    if (type === "heading") {
    let h1 = curSection[0];
    let h2 = curSection[4];
    let level
     =  containers[containers.length-1];

    let title
     =  this.literal.join(" ");
   /////
    var sectionKey;

    if (title)
    switch (level) {
      case (h1):
            sectionKey
          = this.cfg[2].find(section =>
                    "h1" === section[0] &&
                   title === section[2])[1];

        if (sectionKey) {
            curSection[1] = sectionKey;

        if (sectionKey   ===  "moveSequences")
            curSection[8] = "parseMoveSequence";

            else
            curSection[8] = sectionKey;
        }
        else
            curSection[8] = "";

        break;

      case (h2):
            sectionKey
          = this.cfg[2].find(section =>
                    "h2" === section[0] &&
                   title === section[2])[1];

        if (!sectionKey) {
            curSection[8] = "";
            break;
        }

        switch (curSection[1]) {
          case ("moveSequences"):
            curSection[8] =
              (sectionKey === "addMoveSequence")
                          ?   "addMoveSequence"
                          : "parseMoveSequence";
            break;

          case ("syntax"):
            curSection[8] = "parseSyntaxSection";
            break;

          default:
            curSection[8] = sectionKey;
        }   curSection[5] = sectionKey;

        break;
    }}

     ///////////
    //  debug
    if (sectionKey) {
    if (level === curSection[0])
        consoleLog("#".repeat(curSection[0])+" "+curSection[1]);
    else
    if (level === curSection[4])
        consoleLog("#".repeat(curSection[4])+" "+curSection[5]);
    }

    if (this.literal_)
        this.literal_=null
      //////////////////////
             return;

    function resolveDeepContainer (fn, ...args)
   { fn.call(this, ...args) }
    function markupNestedText (literal_ = null) {
    if (!literal_)
       { literal_ = this.literal }

    for (let i=0; i<literal_.length; i++) {
         let strObjXOR = literal_[i];

         if (typeof strObjXOR === "object") {
         if (       strObjXOR === this.literal_) {
         if (this.literal_.length < 3) {
                  literal_[i]
           = this.literal_.join("");
         }
         else
         if (this.literal.length > 2) {
             literal_[i]
           = this.literal.at(0)
           + this.literal.slice(1,
                     this.literal.length-1)
                                 .join(" ")
           + this.literal.at(-1);
           ////////////////////////////
         }   this.literal_ = literal_   }
         else
         markupNestedText(literal_);
    }}
  }}

  keyboardProfile (type=null, term,
                         key, alias) {
    var op;

    //  left field
    if (term === "[") // opt.
    [type, term] = this.next();

    else
    [term, op] = this.ahead();

    if (typeof alias[term] === "string")
    var field = alias[term];

    if (op === ":")
       [term, op] = this.ahead();

    else {
    ////
         [type, term] = this.next();
      if (term === "]")
      [type, term] = this.next(),
      [term, op]   = this.ahead();

      if (op === ":")
      [term, op] = this.ahead();
       term =
       term.trim();
    }

    switch (field) {
      case ("directional"):
        var array, i=0;
        if (term.length)
            array = term.split(",");
        
        do {
        if (!array)
           [type, term] = this.next();

            else
            term = array[i], i++;
        if (term) {

            //
           //
          // ...
         //

        } else break;
        } while (true)
        break;

      case ("A"):
      case ("B"):
      case ("select"):
      case ("return"):
        break;
    }
  }

  parseMoveSequence (type=null, term,
                           key, alias) {}

  addMoveSequence (type=null, term,
                         key, alias) {}

  syntaxDirectionSubsets (type=null, term,
                                key, alias) {

  }
  
  syntaxSequenceTypes (type=null, term,
                             key, alias) {
    switch (alias[op]) {
      case ("oneOff"):
        break;

      case ("continuous"):
        break;
    }
  }

  syntaxModifiers (type=null, term,
                         key, alias) {
    switch (alias[op]) {
      case ("variation"):
        break;

      case ("modifer"):
        break;

      case ("insert"):
        break;

      case ("transition"):
        break;

      case ("reposition"):
        break;
    }
  }
  
  syntaxPhases (type=null, term,
                      key, alias) {
    switch (alias[op]) {
      case ("trigger"):
        break;

      case ("start"):
        break;

      case ("mid"):
        break;

      case ("end"):
        break;

      case ("repetition"):
        break;
    }
  }

  syntaxHype (type=null, term,
                    key, alias) {
    switch (alias[term]) {
      case ("velocity"):
        break;

      case ("spring"):
        break;

      case ("freeze"):
        break;
    }
  }

  syntaxTurns (type=null, term,
                     key, alias) {
    switch (alias[term]) {
      case ("frontside"):
        break;

      case ("backside"):
        break;
    }
  }

  syntaxSides (type=null, term,
                     key, alias) {
    switch (alias[term]) {
      case ("front"):
        break;

      case ("back"):
        break;

      case ("left"):
        break;

      case ("right"):
        break;
    }
  }

  syntaxAliases (type=null, term,
                       key, alias) {
    // how to do this first
  }

  switchRx (rx) {
         rx.lastIndex = this.rx.lastIndex;
    this.rx.lastIndex = 0;
    this.rx = rx;
  }

  next() {
    let resume = this.walker.current; 
    let  event = this.walker.next();
    if (!event) return;
    let  type  =
         event && event.node && event.node.type;

    this.writer[type](event.node,
                      event.entering);

    switch (type) {
      case ("text"):
      case ("code"):
        this.rx.lastIndex=0;
        return [type, event.node.literal];

      case ("linebreak"):
      case ("softbreak"):
        return [type];

      case ("link"):
        if (!entering)
        break;

        this.rx.lastIndex=0;
        var literal = node.title;
                  /// node.destination
      
              event = this.next();
        this.writer[type](event.node,
                          event.entering);

        return [type, event.node.literal];

      case ("heading"):
        this.walker.resumeAt(resume);
        return;

      default:
       return;
    }
  }

  ahead = function (param=true, param2=false) {

   //   sets cache array at index 0
   //   sets cache object at index 1
   //
   //   adds strings and numbers to cache array
   //   assigns objects to cache object
   //
   //   skips matched ops on param.length>0
   //                       && str.length=0
   //
   //   clears the cache                (true)
   //   clears the cache, doesn't step (false)

    var skip, {ahead, rx}=this;
   /////
    if (param !== true)
    switch (typeof param) {
      case ("boolean"):
        //  clears the cache, doesn't step
        if (param === false)
            ahead[0].length=0,
            ahead[1] = {};

        if (typeof param2 === "object"
        &&        !param2.length) 
            Object.assign(ahead[1], param2);
        return;
        break;

      case ("object"):
        //  clears the cache
        if (param === null)
            ahead[0].length=0,
            ahead[1] = {};

        else
        //  assigns objects to cache object
        if (param.constructor.name === "Object")
            Object.assign(ahead[1], param);

        //  skips certain ops when str.length=0
        else
        if (param.length > 0)
            ahead.skip = skip = param;
        break;

      case ("string"):
      case ("number"):
        //  add strings and numbers to cache
        if (!param2)
             ahead[0].push(param);
        else
        if (typeof param2 === "string"
        ||  typeof param2 === "number")
            ahead[0].splice(-1,0,param,param2);
        else
        if (typeof param2 === "object") {
            ahead[0].push(param);
            Object.assign(ahead[1], param);
        }
        break;

      default:
        if (ahead.skip)
            skip = ahead.skip;
    }

    if ((match = rx(str)) === null)
    return this.next();

    [op] = match;
    term = str.substring(match.index,
                     (index=rx.lastIndex));

    // decodeEntity();

    if (!skip) {
   ////
    if (typeof param2 !== "undefined") {
    if (typeof param2 === "object"
    &&         param2.length)
        skip = ahead.skip = param2;
    else
    if (typeof arguments[2] === "object"
    &&         arguments[2].length)
        skip = ahead.skip = arguments[2];
    }}

    if (skip 
    &&  skip.indexOf(op) !== -1) {
   ////
    if ((match = rx.exec(xml)) === null)
    return null;

    // decodeEntity();

    if (str.length > 0
    && (rx.lastIndex - match[0].length) > 0)
        rx.lastIndex = index;
    else {
      [op] = match;
      term = str.substring(match.index,
                       (index=rx.lastIndex));
    }}

    //  clears the cache, doesn't step
    if (param === false) {
        ahead[0].length=0,
        ahead[1] = {};

        return [term,op];
    }
    else
    if (param)
    Object.assign(ahead[0], param);

    return [type, term, op];
  }
}

function getConfigDefaults__en () {
  let preparsedObj = [];
  let moveSequences = [];

  let sections = [ 
  ["h1", "keyboardProfile", "Keyboard profile"],
  ["h1", "sequences", "Move sequences"],
  ["h2", "addSequence", "[Add new sequence](javascript:newSequence)"],
  ["h1", "syntax", "Syntax"],
  ["h2", "directionSubsets", "Direction subsets"],
  ["h2", "sequenceTypes", "Sequence types"],
  ["h2", "modifiers", "Sequence modifiers"],
  ["h2", "phases",  "Phases (modifer)"],
  ["h2", "hype", "Hype (modifer)"],
  ["h2", "turns", "Turns (modifier)"],
  ["h2", "sides", "Sides (modifer)"],
  ["h2", "aliases", "Expression aliases"],
  ];

  let mappings={
      keyboardProfile: {
        directional: "directional",
        A: "A",
        B: "B",
        select: "select",
        return: "return",
      },
      moveSequences: {
        default: "default",
      },
      directionSubsets: {
        expression: "expression",
      },
      sequenceTypes: {
            oneOff: ["@", "one-off"],
        continuous: ["#", "continuous"],
      },
      modifiers: {
         variation: [":", "variation"],
           modifer: [".", "modifer"],
            insert: ["&", "insert"],
        transition: ["-", "transition"],
        reposition: [">", "r position"],
      },
      phases: {
           trigger: ["*", "trigger"],
             start: ["&", "start"],
               mid: ["&&",  "mid"],
               end: ["&&&", "end"],
        repetition: ["^", "repetition"],
      },
      hype: {
        velocity: "velocity",
        spring: "spring",
        freeze: "freeze",
      },
      turns: {
        frontside: "frontside",
        backside: "backside",
      },
      sides: {
        front: "front",
        back: "back",
        left: "left",
        right: "right",
      },
    __optional: ["default","expression"],
  };

  return [preparsedObj,
         moveSequences, sections, mappings];

//  # CommonMark extension syntax directives
//    … status of implementation might differ
//
//    inline => :name[content]{key=val}
//    leaf block => :: name [content] {key=val}
//
//    container block
//    container block =>
//    ::: name [inline-content] {key=val}
//        ... contents ...
//    :::
//    { #id .class key1=value key2=value }
//
//    extension =>
//    @setContent-Type[](code/ScalaResult.scala)
//
//    extension block =>
//    @@@python[ Prog ]( SciPy ){ preview=yes }
//    # More python code for scientist here
//    @@@
//
//    Read more:
//  - https://talk.commonmark.org/t/generic-directives-plugins-syntax/444
//  - https://github.com/commonmark/commonmark-spec/wiki/Generic-Directive-Extension-List

}

////////////////////////////////////////////////

function preparseConfigObj (cfg) {
  jsonion.cur = "preparseConfigObj";

  var result={}, _result;
 /////
  for (var [cat,obj] of Object.entries(cfg)) {
    if (cat[0] === "_")
    continue;

    result[cat] = [{/* flatten */},
                   {/* invert */}],
   _result = result[cat];

    for (let [key,alias] of Object.entries(obj)) {
      if (cat === "sequenceTypes"
      ||  cat === "modifiers"
      ||  cat === "phases")  {
      if (typeof alias === "string") {
          jsonion.err.TYPE(false,
                       cat, key, alias);
          continue;
      }}
      else
      if (!alias instanceof Array) {
          jsonion.err.TYPE(false,
                       cat, key, alias);
          continue;
      }

      flatten(key, alias);
       invert(alias, key);
    }
  }

  return result;
 ///////////////////////////////

  function flatten (key, alias) {
  if (typeof alias === "string")
     _result[0][key] = alias;
  else
  if (typeof alias[0] === "string")
     _result[0][key] = alias[0];
  }

  function invert (alias, key) {
  if (typeof alias === "string")
     _result[1][alias] = key;
  else
  if (typeof alias[0] === "string")
     _result[1][alias[0]] = key;
  }
}

////////////////////////////////////////////////

function diff (text, mod) {
  var offset=[[-1,-1],[-1,-1]];
  var i=0;

  var res = getOffset(0, text.length-1);
  if (res === null)
      return false;
  else
      offset[0] = res;

  if (i === text1.length - 1)
  return false;

  for (var j = 1; j <= (text.length - i); j++) {
   if (text[text.length-j] != mod[mod.length-j])
       break;
  }

  if (j === 1)
      return offset;
  else
  if (j === text.length - i) {
      offset[1] = offset[0];
      return offset;
  }

  var res = getOffset(i, text.length - j + 1);
  offset[1] = res;

  return offset;
 ////////

  function getOffset (start, lt) {
    var line=0, col=0;

    for (i; i<lt; i++) {
      if (start === 0
      &&  text[i] !== mod[i]) {
          return [line, col];
      }

      if (text[i] === "\n"
      ||  text[i] === "\r") {
          line++,
           col=1;
      if (text[i]   === "\r"
      &&  text[i+1] === "\n")
          i++;
      }
      else
          col++;
    }

    if (start === 0) return null;
                else return [line, col];
  }
}

////////////////////////////////////////////////

function validateConfig (cfg) {
  let [__, sections, mappings, moveSequences]
    = jstr.getConfigDefaults();

  var err = jsonion.err;
  var errCount = err.length;
// jsonion.cur = "validateConfig"; 

  if (typeof cfg !== "object") {
      err.INPUT(false, "cfg");
      return false;
  }

  let rx = jstr.rx.pick("heading",
                        "sameChr",
                        "symbols");

  /////////////////////////////////////////
 //   validate move sequence definitions
  var asd;
 /////
  if (!".moveSequences" in cfg)
  err.PATH(false, "cfg.moveSequences");

  else if (!cfg.moveSequences instanceof Array)
  err.TYPE(false, "cfg.moveSequences", "!Array");

  else {}


  /////////////////////////////////////////
 //   validate config document structure
  var subsections={}, hContainer=[0], hContents;
 /////
  if (!"sections" in cfg)
  err.PATH(false, "cfg.sections");

  else if (!cfg.sections instanceof Array)
  err.TYPE(false, "cfg.sections", "!Array");
  
  else
  sections
 .entries().forEach(row => sectionEntry(row)),
                              hContainer[0]=0,
  cfg.sections
 .entries().forEach((row,i) =>
        sectionEntry(row,i)),
                              hContainer[0]=0;

  if (sections.length > 0)
  sections.entries()
          .forEach(row => missingSection(row));


  ////////////////////////
 //   validate mappings
  var optional=mappings.__optional;
        delete mappings.__optional;
 /////
  if (!"mappings" in cfg)
  err.PATH(false, "cfg.mappings");

  else if (!cfg.mappings instanceof Object)
  err.TYPE(false, "cfg.mappings", "!Object");
  
  else
  Object.entries(cfg.mappings)
        .forEach(([category, object]) => {
    let compare = cfg.mappings[category]; // ....

    if (typeof compare === "undefined")
        err.MISCONFIG(false, `cfg.mapping.${category}`);

    Object.entries(object)
          .forEach(([key,val]) => {
      let compareVal = compare[key];

      if (typeof compareVal === "undefined") {
          err.MISCONFIG(false, `cfg.mappings.${category}.${key}`);
          return;
      } /// .. ///

      mappingEntry(key, val, compareVal,
                   category, object);

      delete compare[key];
    });
  }),
  Object.entries(mappings).forEach(([c,obj]) =>
  Object.keys(obj).forEach(key =>
    (key[0] === "_" || optional.find(key))
     ? false
     : err.PATH(false, `cfg.mappings.${c}.${key}`)
  ));


  /////////////////////////////////
 //   validate alias definitions
  var asd;
 /////
  if ("alias" in cfg) {
  if (!cfg.alias instanceof Object)
      err.TYPE(false, "cfg.alias", "!Object");
  else {

  }}

  return (err.length > errCount) ? false : cfg;
 ///////////////////////////////////////////////

  function sectionEntry (row, check=false, i=-1) {
    let [ heading, mapping, val ]=row;
    
    if (check) {
    var sectionErrCount = err.length;
   /////
    if (typeof heading !== "string")
        err.TYPE(false, `cfg.sections[${i}][0]:`, "!String");
    else
    if (!heading.test(rx.heading))
        err.FORMAT(false, `cfg.sections[${i}][0]:`, `"${heading}".match(${rx.heading.source})`, "<heading>");

    if (typeof mapping !== "string"
    ||  typeof val     !== "string"
    ||  !mapping.length || !val.length)
        err.TYPE(false, `cfg.sections[${i}][1]:`, "!String", "<mapping>");

    if (err.length > sectionErrCount)
        return;
    }

    let hLevel=heading[1];
   ////////////////////////
    if (!hContainer[0]
    ||   hContainer[0] === hLevel)
         hContainer.splice(1,2,...row.slice(1));

    if (check) {
   /////
    if (hContainer !== hLevel) {
    if (!hContents)
         hContents = hLevel;
    else
    if (hContents !== hLevel)
        err.SCOPE(false, `cfg.sections[${i}]:`, `h${heading}`, "<heading>");
    }}

    let section
      = hContainer[1];

    if (!check)
    return subsections[section].push(row);

    var j;
   //////////////////////////////
    if (hContainer[0] === hLevel
    && !subsections[section]) {
        err.SCOPE(false, `cfg.sections[${i}]:`, section);
    }
    else
    if (hContainer[0] !== hLevel
    &&  0 > (j=subsections[section]
              .findIndex((compare,i,self) => {
                      if (compare[1]===mapping) {
                          self.splice(i,1);
                          return true;
             }})
    )) err.SCOPE(false, `cfg.sections[${section}][${i}]:`, mapping);
  }

  function missingSection (row) {
    let [ heading, mapping, val ]=row;

    let hLevel =
        heading[1];
   /////
    if (!hContainer[0]
    ||   hContainer[0] === hLevel)
         hContainer.splice(1,2,...row.slice(1));

    let section
      = hContainer[1];

    err.PATH(false, "cfg.sections[]:", section, mapping);
  }

  function mappingEntry (key, val, compare,
                         category, catObj) {
    if (!val instanceof Array)
        err.TYPE(false, `cfg.mappings.${category}.${key}`, "!Array");

    if (typeof val[0] !== "string")
        err.TYPE(false, `cfg.mappings.${category}.${key}[0]`, "!String");

    switch (category) {
      case ("sequenceTypes"):
      case ("modifiers"):
      case ("phases"):
        if (typeof val[1] !== "string")
            err.TYPE(false, `cfg.mappings.${category}.${key}[1]`, "!String");

        var bfr;
       /////
        if (category === "phases"
        && (key === "start"
        ||  key === "mid"
        ||  key === "end")) {
        if (key === "start" && val.length !== 1)
            err.SCOPE(false, `cfg.mappings.${category}.${key}[0]`, `"${val}".length!==1`);

        if (key === "mid"   && val.length !== 2)
            err.SCOPE(false, `cfg.mappings.${category}.${key}[0]`, `"${val}".length!==2`);

        if (key === "end"   && val.length !== 3)
            err.SCOPE(false, `cfg.mappings.${category}.${key}[0]`, `"${val}".length!==3`);

        if (!val.match(rx.sameChr))
            err.SCOPE(false, `cfg.mappings.${category}.${key}[0]`, `!"${val}".match(${rx.sameChr.source}`);

        if (key !== "start")
            bfr = catObj["start"]    &&
                  catObj["start"][0] &&
                  catObj["start"][0][0];
        if (bfr
        &&  bfr !== val[0][0])
            err.SCOPE(false, `cfg.mappings.${category}.${key}[0]`, `"${val[0]}"!=="${bfr}"`);
        }
        else
        if (val[0].match(rx.symbols))
            err.SCOPE(false, `cfg.mappings.${category}.${key}[0]`, `!"${val}".match(${rx.symbols.source}`);

      default:
        if (typeof val[0] !== "string")
              err.TYPE(false, `cfg.mappings.${category}.${key}[0]`, "!String");
    }

    let index=val.slice(-2);
   /////
    if (typeof index[0] !== "number")
        err.TYPE(false, `cfg.mappings.${category}.${key}[-2]`, "!Number", "<offset_index>");
    else
    if (index[0] < 0)
        err.SCOPE(false, `cfg.mappings.${category}.${key}[-2]`, `${index[0]}<0`, "<offset_index>");

    if (typeof index[1] !== "number")
        err.TYPE(false, `cfg.mappings.${category}.${key}[-1]`, "!Number", "<offset_index>");
    else
    if (index[1] < 0)
        err.SCOPE(false, `cfg.mappings.${category}.${key}[-1]`, `${index[0]}<0`, "<offset_index>");
 
    return;
  }

  function mapAliasEntry() {}
}

 ///////////////////////////////////////////////
// to-do: syntax improvement (recurring chars)
function rxFromArray (rxStack,
                      errorMap = jsonion.err) {
  jsonion.cur = "rxFromArray";

  if (rxStack instanceof RegExp)
  return rxStack;

  var prev=[];
  if (typeof rxStack === "string") {
  if (rxStack[0] === "/"
  ||  rxStack[0] === "^")
      return factoryRegExp(rxStack);
  else
  if (rxStack.every(chr =>
      (prev.indexOf(chr) === -1
  &&  (prev.push("\\"+chr)))))
      return new RegExp(`[${rxStack}]`,"g");
  }

  if (!rxStack instanceof Array)
  return false;
                        prev.length=0;
  var res=[], postProcessFn, bfr, len;
 /////
  for (let [i,expr] of rxStack.entries()) {
  switch (typeof expr) {
    case ("string"):
      if (expr.length
      &&  expr !== jsonion.terminator) {
          res.push(expr);
         prev.push(expr);
      }
      else
      prev.length=0;
      break;

    case ("object"):
      if (expr instanceof Array)
      if (i === 0
      &&  expr.every((fn) =>
               typeof fn === "function")) {
          postProcessFn = expr;
          continue;
      }

      if (expr instanceof Array) {
      if (expr.every((str) =>
               typeof str === "string"))
      for (let str of expr) {
           res.push(str);
          prev.push(str);
      }   continue   }

      errorMap.TYPE(expr);
      break;

    case ("function"):
      if (i === 0) {
          postProcessFn = expr;
          continue;
      }

      if (i === rxStack.length
      && !postProcessFn) {
          postProcessFn = expr;
          continue;
      }

      if (!prev.length)
          continue;

      len=prev.length, bfr=prev;
      try {
       do {
           bfr = expr(...bfr);
       if (bfr) {
       if (typeof bfr === "string")
           prev = bfr;
       else
       if (bfr instanceof Array
       &&  bfr.every((str) =>
               typeof str === "string"))
           prev = bfr;
       else
           jsonion.err.OUTPUT(false, expr, bfr);
       }

       if (typeof rxStack[i+1] === "function")
           expr = rxStack[(i=i+1)];
       else break;
       ///////
      } while (0b1) }
        catch (err) { jsonion.err.MISCONFIG(err) }

      if (typeof prev === "string")
          res.splice(i-len, len, prev),
                                 prev=[];
      else
       res.splice(i-len, len, ...prev),
     ////////////////
      prev.length=0;
  }}

  var bfr; prev.length=0;
 /////
  if (postProcessFn)
  do {
  if (postProcessFn instanceof Array)
      bfr = (!prev)
          ?  postProcessFn[0](res)
          :  postProcessFn[0](...res);
  else
      bfr = (!prev)
          ?  postProcessFn(res)
          :  postProcessFn(...res);

   if (typeof bfr === "string")
       return factoryRegExp(bfr);

   if (typeof bfr === "object")
   switch (bfr.constructor.name) {
     case ("RegExp"):
       return bfr;

     case ("Array"):
       if (bfr.every((str) =>
               typeof str === "string"))
       return factoryRegExp(bfr);
   }

   if (postProcessFn instanceof Array) {
   if (postProcessFn.length === 1) {
   if (prev)
       break;
   else
       prev=true;
       continue;
   }
   else
   if (postProcessFn.length > 1) {
   if (prev)
       postProcessFn.shift(),
       prev=false;
   else
       prev=true;
       continue;
   }}
   else
   if (!postProcessFn instanceof Array)
   if (!prev) {
        prev = true;
        continue;
   }
   else break;

  } while (-1)

  return factoryRegExp(...res);

  function factoryRegExp (...str) {
    try {
      return new RegExp(`(?:${str.join("|")})`,"g");
    } catch (e) {
      new jsonion.err.FORMAT(str);
    }
  }
}

function encodeRxSpecialChars (arrayOfStrings) {
  if (!arrayOfStrings instanceof Array)
  return;
  
  let rxSet = /(?:\[|\]|\.|\*)/g; // ...
  let replacer
    = Object.fromEntries(
       rxSet.source
            .substring(3, rxSet.source.length-1)
            .split("|")
            .map(chr => [chr[1],chr]));

  var str, match, replace, testRxCompiles;
  try {
  for (var i=0,j; i<arrayOfStrings.length; i++) {
    str = replace = arrayOfStrings[i];
      j = 0;

    if (typeof str !== "string")
        continue;

    do {
    if ((match = rxSet.exec(str)) === null)
        break;

        replace
      = replace.substring(0, match.index+j)
      + replacer[ str[ match.index ]]
      + replace.substring(match.index+j+1);

    } while (-1)

    if (replace)
        arrayOfStrings.splice(i, 1, replace),
        testRxCompiles = new RegExp(replace);
    else
        testRxCompiles = new RegExp(str); // ...

  }} catch (e) { throw e }

  return arrayOfStrings;
}

function transformOpStack() {
Object.defineProperty(jstr.rx, "opStack", {
  get: (() => {
    var opStack = jstr.rx.opStack;

    if (opStack instanceof Array)
        opStack = jsonion.rxFromArray(opStack);

    return function(){
      if (jstr.rx.__opStack instanceof RegExp)
      return jstr.rx.__opStack;

      if (opStack instanceof RegExp)
      return opStack;
    };
  })(),
  set: function (rxStack) {
    rxStack = jsonion.rxFromArray(rxStack);

    if (rxStack instanceof RegExp)
    jstr.rx.__opStack = rxStack;

    return rxStack;
  },
});
}

 //////////////////////////////
//  submitting error reports
class ErrorMap extends Array {
callstack = new Array();
constructor (errorTypes,
                   args={reportArgValue:null,
                         reportArgDepth:null},
                               errorMap=null) {
 /////
  if (errorMap instanceof ErrorMap) {
      super(...errorMap);
  if (errorMap.callstack instanceof Array)
      this.callstack.concat(errorMap.callstack),
      this.callstack.filter((row, idx, self) =>
      idx === self.findIndex(compare =>
              compare.every((str,i) =>
                      str == row[i])));
  }
  else
  if (errorMap instanceof Array)
      super(...errorMap);

      else
      super();

  if (!errorTypes instanceof Object)
  return;

  if (args instanceof Object === false)
      args = {};

  let _cfg =
     (typeof jsonion === "object"
          && jsonion.err)  ||  {};

  this.reportArgValue
   =  (typeof args.reportArgValue === "boolean")
   ?          args.reportArgValue
   :  (typeof _cfg.reportArgValue === "boolean")
   ?          _cfg.reportArgValue
   :  false;

  this.reportArgDepth
   =  (typeof args.reportArgDepth === "number")
   ?          args.reportArgDepth
   :  (typeof _cfg.reportArgDepth === "number")
   ?          _cfg.reportArgDepth
   :  -1;

  var jsonionCfg;
 /////
  if (errorTypes === _cfg)
       jsonionCfg = this;
  else jsonionCfg = null;

   /////////////////////////////////////////////
  //  transform error messages to functions
  var label, throws, depth=1;
 ///////
  const TYPES
      = ErrorMap.evalConsoleMsgTypes(false);

  Object.entries(errorTypes)
        .forEach(([key,str]) => {
  if (typeof str === "string") {
  this[key]=function executableErrorType(...msg) {
      depth=0;
      label=0;

       /////////////////////////////////////////
      //  clear console method and throw
      var consoleMethod;
     /////
      if (msg[0] === false) {
          msg.shift();

          consoleMethod = "error";
          throws = true;
      }
      else
      if (TYPES.indexOf(msg[0]) !== -1) {
          consoleMethod = msg.shift();
      if (consoleMethod[0] !== consoleMethod[0]
                              .toLowerCase())
          consoleMethod
        = consoleMethod.toLowerCase();
      } 
      else
      consoleMethod = "error";

       /////////////////////////////////////////
      //  eval arg format
      for (var j,i=0; i<msg.length; i++) {
        if (j
        || (typeof msg[i] !== "string"
        && (j = 1))) {
            msg[i] = [evalArg(msg[i])];
        if (msg[i].length === 1
        &&  msg[i][0] instanceof Array)
            msg[i]
          = msg[i][0];
      }}

       /////////////////////////////////////////
      //  add to error map
      this.push([key,
     (!msg.length) ? str : `${str}:`, ...msg]);

       /////////////////////////////////////////
      //  current callstack map entry
      if (this.callstack.length)
          label = ErrorMap
         .processCallstackEntry(this.callstack);

       /////////////////////////////////////////
      //  resolve throw and emit message
      if (throws)
          this.at(-1).unshift(false);

          ErrorMap.consoleMsg(this.at(-1),
                   consoleMethod, label);

       /////////////////////////////////////////
      //  append callstack entry to errorMap
      if (label)
          this.at(-1).unshift(label);
  }}
  else
  if (jsonionCfg)
      this[key]=(!"function" && !"boolean")
                || str;
  });

  if (jsonionCfg)
      jsonion.err = this;

  var instance = this,
      rxFnName = jsonion.rx.fnName;
  do {
  //  current class method / function
    instance._cur = new Array();
    ErrorMap.defineCallstack(instance,
                        this.callstack);

    if (             jsonionCfg &&
        instance === jsonion.err)
         instance = jsonion;

    else break;
  } while (-1)

  function evalArg (obj, key=null) {
    depth++;

    if (obj === null)
        return null;

    //  value may be omitted in error reports
    if (this.reportArgValue
    && (typeof obj === "string"
    ||  typeof obj === "number"
    ||  typeof obj === "boolean"))
        return obj;

    //  returns anonymous function source code 
    if (typeof obj === "function") {
    let fnc = `${obj}`;

    if (!obj.prototype) {
    if (this.reportArgValue)
        return ["function (arrow)", fnc];
    else
        return ["function (arrow)"];
    }

    let fnCode = `${fnc}`;
    let fnName = rxFnName.exec(fnCode);
                 rxFnName.lastIndex=0;
    if (fnName) {
    if (fnName[2])
        return [fnName[1], fnName[2]];
    else
    if (this.reportArgValue)
        return ["function", fnCode];
    else
        return ["function"];
    }}

    var res;
    //  anonymous thing
    if (typeof obj !== "object") {
    if (typeof obj.length !== "undefined"
    ||         obj.length === 0)
        res = [typeof obj, obj.length];
    else
        res = [typeof obj];
    if (key)
        res.splice(1,0, key);
    }
    else
    //  key-value object entry, [value] as array
    if (depth === 1
    &&  obj    instanceof Array
    &&  obj[1] instanceof Array
    &&  obj.length    === 2
    &&  obj[1].length === 1
    && (typeof obj[0] === "string"
    ||  typeof obj[0] === "number")) {
        res = evalArg(obj[1][0], obj[0]);
    if (res[2] instanceof Array)
        res.shift();
    }
    else
    //  handle error reporting on objects
    if (typeof obj === "object") {
        res = [obj.constructor.name];
    if (key)
        res.splice(1,0,key);
    if (obj.length)
        res.push(obj.length);
    if (!!obj[Symbol.iterator]
    && `${obj[Symbol.iterator]}`.substring(9,15)
                                   === "values") {
    if (depth <= this.reportArgDepth)
    for (let val of obj) {
         res.push(evalArg(val));
    }}
    else
    if (Object.entries(obj).length)
    for (let [key,val] of Object.entries(obj)) {
         if (depth < this.reportArgDepth)
         res.push(evalArg(val,key));

         else
         res.push(key);
    }}

    depth--;
    return res;
  }}

  static defineCallstack (instance, callstack) {
    if (typeof instance === "object"
    &&         callstack instanceof Array) {
               instance._cur = [];
   ////

    Object.defineProperty(instance, "cur", {
      get: () => instance._cur
              && instance._cur[0],
      set: (fn) => {
      var fnName;
      let curMethod = instance._cur;
          curMethod
            .length = 0;

      switch (typeof fn) {
        case ("string"):
          if (fn.length)
              curMethod.push(fn);
          break;

        case ("function"):
          if (fnName=rxFnName.exec(`${fn}`))
              curMethod.push(fnName[2]),
               rxFnName.lastIndex=0;
          break;

        case ("object"):
          var objPath;

          if (fn instanceof Array) {
          if (typeof fn[0] === "object"
          ||  typeof fn[0] === "function")
              fnName=fn.shift();
          if (fn.length
          &&  fn.every(str => {
          if ((typeof (str) == "string"))
               return (str  ||  false)
          }))
               var objPath
                 = fn;
          }
          else fnName
                 = fn;

          if (typeof fnName === "object")
              curMethod.push(fnName.constructor
                                   .name);
          else
          if (typeof   fnName === "function"
          &&       !(rxFnName.lastIndex=0)
          && (fnName=rxFnName.exec(`${fn}`)))
              curMethod.push(fnName[2]);

          if (objPath)
              curMethod.concat(objPath);
          break;

        default:
          instance._cur.length=0;
      }

      if (curMethod.length) {
          ErrorMap.updateCallstack(curMethod,
                                   callstack);
      }

      if (curMethod.length >= 1) {
          curMethod.splice(0,
            curMethod.length,
            curMethod.join("."));
      }
      else (instance._cur.length=0);
    }});
    }
  }

  static updateCallstack (curMethod,
                          callstack) {
    if (!callstack instanceof Array)
    return;

    let index
      = callstack.length &&
        callstack
       .findIndex((row) =>
                   row.every((str,i) =>
             curMethod[i] === str));

    if (index !== false
    &&  index !== -1)
        callstack.push(callstack
                       .splice(index,1));
        else
        callstack.push([...curMethod]);
  }

  static processCallstackEntry (callstack) {
    if (typeof callstack !== "object"
    ||        !callstack instanceof Array)
    return;

    var result = "";
    var stack
      = new Error().stack.trim()
                         .split("\n")
                         .reverse();
        stack.splice(-2,2);  // omit this fnc


    var bfr, clsFnXOR, scriptIdx, scriptSrc="",
                               newScriptSrc;
    let drops = {
        _: ["console", "executableErrorType"],
        1: ["window.onload", "setTimeout"],
        2: ["EventListener"],
    };  drops[1].includes = includes;
        drops[2].includes = includes;
         drops._.includes = includes;

    //  drop first row
    if (stack.length
    &&  drops[1].includes(stack[0])) {
        stack.shift();
    }

    //  drop second row
    if (stack.length
    &&  drops[2].includes(stack[0])) {
        stack.shift();
    }

     ///////////////////////////////////////////
    /*  [to-do] consider drop row rules
  
     -  two consequtive rows in callstack match
     -  cur variable at ErrorMap.defineCallstack

     */// --------------------------------------

    var call;
   /////
    for (let i=0; i<stack.length; i++) {
        call=stack[i];
         bfr=call.indexOf("@");

         clsFnXOR
       = call.substring(0,bfr);

     if (clsFnXOR
        .substring(clsFnXOR.length-2) === "/<")
         clsFnXOR
       = clsFnXOR
        .substring(0, clsFnXOR.length-2);

         call 
       = call.substring(bfr+1);

         bfr
       = call.split(":");

         scriptIdx = bfr.splice(-2,2).join(":");
      newScriptSrc = bfr.join(":");

         if (scriptSrc !== newScriptSrc)
             scriptSrc = newScriptSrc,
             result += newScriptSrc + "\n";

         //  drop on empty call value
         if (clsFnXOR.length === 0) {
             continue;
         }
         else
         //  drop on match
         if (drops["_"].includes(clsFnXOR)) {
             continue;
         }
         else
         //  drop if not found in callstackMap
         if (callstack.length
         && !callstack.find(row =>
                   row.find(str =>
               clsFnXOR === str))) {
             continue;
         }

         result += clsFnXOR+":"+scriptIdx+"\n";
    }

    if (result === newScriptSrc.length+2)
        result += clsFnXOR+":"+scriptIdx;

    return [
      result.trim(),
        this.superscriptInt(scriptIdx
                           .split(":")[0])
    ];

    function includes (str) {
      if (!str.length)
      return;

      for (let compareRule of this) {
       if (str.indexOf(compareRule) === 0)
           return true;
      }
    }
  }

  static consoleMsg (params, type="log", 
                            label=false) {
    if (type[0] !== type[0].toLowerCase()) {
        type
      = type.toLowerCase();
    }

    var cfg, suppressThrow, throws;
   /////
    if (typeof jsonion !== "undefined")
  { let {throws, suppress}=jsonion.err;
    cfg={throws, suppress}
    cfg.mode=jsonion.mode; } else cfg={};
    
    var superscriptIndex;
   /////
    switch (typeof label) {
      case ("string"):
        if (label.length)
        console.groupEnd(), 
        console.group(label);
        break;

      case ("number"):
        superscriptIndex
      = ErrorMap.superscriptInt(label);
        break;

      case ("object"):
        if (label instanceof Array
        &&  label.length === 2)
        superscriptIndex = label[1],
        console.groupEnd(),
        console.group(label[0]);
        break;

      case ("boolean"):
        if (label === false)
        console.groupEnd();
        break;
    }

    switch (type) {
      case ("assert"):
      case ("debug"):
      case ("dir"):
      case ("dirxml"):
      case ("info"):
      case ("log"):
      case ("table"):
      case ("timeLog"):
      case ("timestamp"):
      case ("warn"):
      case ("trace"):
        if (cfg.mode !== "production"
        && !cfg.suppress
        ||  cfg.suppress instanceof Array
        &&  cfg.suppress.indexOf(type) === -1) {
        if (superscriptIndex)
            console[type](superscriptIndex,
                                 ...params);
            else
            console[type](...params);
        }
        break;

      case ("error"):
        suppressThrow =
           (cfg.throws === false)
        || (cfg.suppress instanceof Array 
        &&  cfg.suppress.indexOf("throw") >= 0);

        if (params[0] === false)
            throws
         = !params.shift();

        if (!suppressThrow
        &&   throws) throw params;
        else {
        if (superscriptIndex)
            console.error(superscriptIndex,
                                 ...params);
            else
            console.error(...params);
        }
        break;
    }
  }

  static _GLOBAL = 
  (typeof window === "object") ? window :
  (typeof global === "object") ? global :
  (typeof  self  === "object") ?  self  : null;

  static evalConsoleMsgTypes(assign=true) {
    const _SCOPE = this._GLOBAL;
    const methodTypes = [
         "assert",
         "debug",
         "dir",
         "dirxml",
         "info",
         "log",
         "table",
         "timeLog",
         "timestamp",
         "warn",
         "trace"
    ];

    var TYPE, fnName, i;
    for (i=methodTypes.length-1; i>=0; i--) {
    fnName=methodTypes[i];
           methodTypes.push
     (TYPE=fnName.toUpperCase());

      if (assign) {
      if (typeof _SCOPE[TYPE] === "undefined")
                 _SCOPE[TYPE] = fnName;
          else
          console.warn(`Cannot assign ${TYPE} to global scope:`, this._GLOBAL);
      }
    }

    return methodTypes;
  }

  static superscriptInt (number) {
        number = parseInt(number);
    if (!Number.isInteger(number))
    return;

    var result="";
   /////
    for (let chr of `${number}`) {
      switch (chr) {
        case ("1"): result += "¹"; break;
        case ("2"): result += "²"; break;
        case ("3"): result += "³"; break;
        case ("4"): result += "⁴"; break;
        case ("5"): result += "⁵"; break;
        case ("6"): result += "⁶"; break;
        case ("7"): result += "⁷"; break;
        case ("8"): result += "⁸"; break;
        case ("9"): result += "⁹"; break;
        case ("0"): result += "⁰"; break;
        case ("-"): result += "ᐨ"; break;
      }
    }

    return result;
  }
}

function makeExecutableErrorMap (errorTypes,
                  args={reportArgValue:null,
                        reportArgDepth:null},
                              errorMap=null) {
     let instance =
     new ErrorMap(arguments[0],
                  arguments[1],
                  arguments[2]);
  return instance;
}

function consoleLog (...params) {
  let stack = new Error().stack.trim().split("\n");
      stack.shift();
  if (stack[0].indexOf("Array.prototype") === 0)
      stack.shift();
  return console.log(ErrorMap.superscriptInt(stack[0].split(":").slice(-2)[0]), ...params);

  ErrorMap.superscriptInt()
  ErrorMap.consoleMsg(params, "log",
    ErrorMap.processCallstackEntry(jsonion.err.callstack));
}

function consoleTrace (...params) {
  let stack = new Error().stack.trim().split("\n");
      stack.shift();
  if (stack[0].indexOf("Array.prototype") === 0)
      stack.shift();
  return console.log(ErrorMap.superscriptInt(stack[0].split(":").slice(-2)[0]), ...params);

  ErrorMap.consoleMsg(params, "trace",
    ErrorMap.processCallstackEntry(jsonion.err.callstack));
}

function consoleWarn (...params) {
  ErrorMap.consoleMsg(params, "warn",
    ErrorMap.processCallstackEntry(jsonion.err.callstack));
}

function consoleError (...params) {
  ErrorMap.consoleMsg(params , "error",
    ErrorMap.processCallstackEntry(jsonion.err.callstack));
}

</script>
</head>
</html>
