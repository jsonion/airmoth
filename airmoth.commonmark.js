const {existsSync, readFileSync, writeFileSync}
    = require && require("fs") || null;

const commonmark
    = require && require("./commonmark@0.30.0")
              || window.commonmark;

console.log(commonmark);

const jsonion = new Object({
///  ---------
 rxDelimiter:"|",

 rx: {
   fnName: /(?:(class|function\**) ([^\s\{]+|[^\s\(]+)|\([^\)]*\)\s*=>\s*{)/g,
 },
 rxFromArray,
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
        log: consoleError,
   makeExec:
  (typeof executableErrorMap === "function" &&
          executableErrorMap)               ||
   function (errorMap = this) {
   Object.entries(this).forEach(([e,str]) => {
   if (typeof str === "string")
       errorMap[e] = function (...msg) {
       return
       errorMap.push([e,
      (!msg.length) ? str : `${str}:`, ...msg]);
   }})}
}}); jsonion.err.makeExec();

const jstr = new Object({
 ///  ----
  mdParser: void null,
  time: [2,4],

  rx: {
    symbols: /[^\w\s[[:cntrl:]]]/g,
    sameChr: /^(?<c>.)\k<c>+$/,
    heading: /h([1-6])/g,
    opStack: ["\\s", "<=","=>", "*","^",":",".","&","-",">","@","#", "[","]","=","<","!","\"","\'","\`"],
      space: / +/g,
    pick: function (...keys) {
      let res={};
      return keys.every(key => this[key]
                && (res[key] = this[key]))
                && res;
  }},
  timeRxReplacer: (str => {
    var res=[];
    if (typeof str === "string"
            && str.length)
    for (let i=time; i>1; i--) {
         res.push(str.repeat(i));
    }

    res.push(str);
    return res;
  }),

  //////////////////////
 // method names draft
/*
  parseAlias,
  parseModifier,
  parseDefaultValue,

  storeAlias,
  storeModifier,
  storeDefaultValue,
 */

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

class jstrParseMd {

  static    validateConfig = validateConfig;
  static getConfigDefaults = getConfigDefaults__en;

  //___________________________         *//*
 /*                          */    pos=[0,0];
      sections=[];                    // … //
    curSection=[0,"",[],[],      //_____- -_____
                0,"",[],[]];
  containers=[];                   literal=[ , ]
  outOfScope=true;                 literal_
                            = this.literal;
  /// ------------------------------------------

           renderPlugin = renderMdPlugin;
     setContainerHeader = setContainerHeader;
  finalizeContainerData = finalizeContainerData;
       parseTextLiteral = parseTextLiteral;

                          resolveDeepContainer
                        = resolveDeepContainer;

  constructor (renderer, assign=undefined) {
  if (typeof assign === "object")
  Object.entries(assign).forEach(([key,obj]) => {
      renderer[key] = obj;
  });
 /////
  Object.entries(jstr.rx).forEach(([key,rx]) => {
      if (typeof expr !== "function")
             this["re"
                 + key[0].toUpperCase()
                 + key.substring(1)] = rx;
  }),
  Object.defineProperty(this, "esc", {
      get: () => {
        if (this.__esc) return this.__esc
                   else return renderer.esc;
      },
      set: (escFn) =>
      typeof escFn === "function" &&
     (this.__esc = escFn)
  });
  }
}

var cfg = require
 && existsSync("./snowplants.cfg.json")
 && readFileSync("./snowplants.cfg.json");

let yGestAirmoth
  = { render, plugin: new jstrParseMd };

if (!cfg)
    yGestAirmoth.cfg
    = cfg
    = jstrParseMd.getConfigDefaults(cfg);
else {
if (jstrParseMd.validateConfig 
&&  jstrParseMd.validateConfig(cfg))
    yGestAirmoth.cfg = cfg;
else
    jsonion.err.MISCONFIG(false, cfg);
}

let writer
  = jstrParseMd(commonmark.HtmlRenderer(
                    { sourcepos: false }),
                    { ...yGestAirmoth  });

let reader = new commonmark.Parser();
    reader.inlineParser.match = function (re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null)
        return null;
    else
        this.pos += m.index + m[0].length;
        return m[0];

    console.log(re.source);
},  commonmark.lib.rx.debugOffset=[0,0,0];
/*  console.log(reader.inlineParser.match,
         typeof reader.inlineParser.match);
    console.log(commonmark.lib.rx.debugOffset,
         typeof commonmark.lib.rx.debugOffset);
///                                           */
var parsed = reader.parse(configDoc);
var result = writer.render(parsed);

 ///////////////////////////////////////////////
//  fs.writeFileSync('./.cache/snowplants.cfg.json', JSON.stringify(customer, null, 2));

function renderMdPlugin (event) {
  let { node, entering }=event;
  let  type = node.type;
  let containers = this.containers;

  console.log((entering && "" || "/")+node.type, node.sourcepos); // ...
  
  //  container
  if (entering) {
  if (type === "heading")
      containers.splice(-1,0, node.type,
                              node.level);
      else
      containers.push(node.type);
  }

  //   skip: image custom_inline custom_block
  //   ... text within is left unparsed
  if (type === "image"
  ||  type === "block_quote"
  ||  type === "custom_inline"
  ||  type === "custom_block") {
  if (entering)
      this.outOfScope ++;

      else
      this.outOfScope --;

      return;
  }

  //  … skip headings and lists beyond 2nd level
  if (this.outOfScope)
  switch (entering) {
    case (true):
      if (type === "heading"
      ||  type === "list")
          this.outOfScope ++;

      return;

    case (false):
      if (node.type === "heading")
          containers.splice(-2,2);
      else
          containers.pop();

      if (type === "heading"
      ||  type === "list")
          this.outOfScope --;

      return;
  }

  if (this.outOfScope)
  return;
  
  switch (node.type) {
    case ("text"):
      this.renderTextLiteral(node._literal);
      break;

    case ("link"):
      if (entering)
      this.setContainerHeader(event),
      this.literal_.push(this.esc(node.title));
                         // node.destination
      else
      this.finalizeContainerData(node.type);
      
      break;

    default:
      if (entering)
      this.setContainerHeader(event);

      else
      this.finalizeContainerData(node.type);
  }
}
 
function setContainerHeader (event, type="") {
  let { level, sourcepos } = event.node;
  let { curSection, containers } = this;

  if (!type)
       type = node.type;

  switch (type) {
    case "heading":
      let [h1_level, h1_key] = curSection;
      let [h2_level, h2_key] = curSection
                                 .slice(4,6);
      if (!h1_level
      ||   h1_level === level)
           curSection.splice(0,2,level,""),
           curSection[2] = sourcepos[0]; 

      else
      if (!h2_level
      ||   h2_level === level)
           curSection.splice(3,2,level,""),
           curSection[6] = sourcepos[0];

      else
      this.outOfScope ++;

      break;

    case "paragraph":
    case "list":
    case "item":
      if (type === "list"
      &&  containers.indexOf(type) !== -1)
          this.outOfScope ++;

      break;

    case "strong":
    case "emph":
      if (type === "strong")
          this.literal_.push(["*"]);

          else
          this.literal_.push(["**"]);
      }

      this.literal_
    = this.literal_[0]; 

      break;
  }

  if (sourcepos) {
  if (curSection[0])
      curSection[3] = sourcepos[1];

  if (curSection[4])
      curSection[7] = sourcepos[1];
  }
}

function finalizeContainerData (type) {
  let containers = this.containers;

  switch (type) {
    case "heading":
      let level = containers.at(-1);

      //  compare with sections index and cfg
      //  ...

      // </heading>
      break;

    case "list":
    case "item":
      break;

    case "strong":
    case "emph":
      let inline
        = resolveDeepContainer(nestedText);
      break;
  }

  if (this.literal_)
      this.literal_ = null;
    ////////////////////////
            return;

  function nestedText (literal_=null) {
    var inline = "";

    if (!literal_)
       { literal_=this.literal;
         var root=true }

    for (let str of literal_) {
     if (typeof str === "object")
         inline += nestedText(str);

         else
         inline += " " + str.trim();
    }

    return inline;
  }
}

function resolveDeepContainer (fn) {
  fn.call(this);
}

function parseTextLiteral (str) {
  let [key, alias] = this.cfg.slice(3);
  let {opStack, space} = this;
  
  console.log(str);
  str = str.trim(); // ... what's the difference

  var literal = this.literal_ ||
                this.literal;

  switch (containers.at(-1)) {
    case "heading":
      this.literal.push()
      if (!this.curSection[4])

      break;

    case "list":
    case "item":
      break;

    default:
      break;
  }

     var match;
  while (match = this.reOpStack.exec(str)) {
    let [op] = match;
    let term = str.substring(match.index,
                  this.reSpace.lastIndex);

     ///////////////////////////////////////////
    //  word term (preceeding opcodes symbols)
    if (alias[term])
    for (let aliasTerm of alias[term]) {
    switch (aliasTerm[0]) {
      case ("directional"):
        if (this.hContainer === "")
        break;

      case ("default"):
        break;

      case ("expression"):
        break;

      //    hype (modifier)
      case ("velocity"):
        break;

      case ("spring"):
        break;

      case ("freeze"):
        break;

      //    turns
      case ("frontside"):
        break;

      case ("backside"):
        break;

      //    sides
      case ("front"):
        break;

      case ("back"):
        break;

      case ("left"):
        break;

      case ("right"):
        break;

    }   this.reOpStack.lastIndex
      = this.reSpace.lastIndex;
       //////////////////////////
        this.reSpace.lastIndex=0   }

     //////////////////////////
    //  matched opcode symbol
    switch (alias[op]) {
      //    keyboard profile
      case (key.A):
        break;

      case (key.B):
        break;

      case (key.select):
        break;

      case (key.return):
        break;

      //    syntax
      case (key.default):
        break;

      case (key.expression):
        break;

      //    sequence types
      case (key.oneOff):
        break;

      case (key.continuous):
        break;

      //    modifiers
      case (key.variation):
        break;

      case (key.modifer):
        break;

      case (key.insert):
        break;

      case (key.transition):
        break;

      case (key.reposition):
        break;

      //    phases
      case (key.trigger):
        break;

      case (key.start):
        break;

      case (key.mid):
        break;

      case (key.mid):
        break;

      case (key.repetition):
        break;
    }
  }   this.reOpStack.lastIndex=0;  // ...
   /////////////////////////////////
  //  this.out(node.literal);
}

function render (ast) {
  var walker = ast.walker(),
      event,
      type;

  this.buffer = "";
  this.lastOut = "\n";

  while (event = walker.next()) {
      type = event.node.type;

      this.plugin(event);

      if (this[type])
          this[type](event.node,
                     event.entering);
  }

  return this.buffer;
}

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

function getConfigDefaults__en () {
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
        reposition: [">", "reposition"],
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

  let [ inverted, flattened ]
        = preparseConfigObj(mappings);

  return [moveSequences, sections, mappings,
                                   inverted,
                                  flattened];

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

function preparseConfigObj (cfg) {
  let inverted={}, flattened={};

  for (var [cat,obj] of Object.entries(cfg)) {
    if (cat[0] === "_")
    continue;

    for (var [key,alias] of Object.entries(obj)) {
      if (cat === "sequenceTypes"
      &&  cat === "modifiers"
      &&  cat === "phases")  {
      if (typeof alias === "string") {
          err.TYPE(false, cat, key, alias);
          continue;
      }}
      else
      if (!alias instanceof Array) {
          err.TYPE(false, cat, key, alias);
          continue;
      }

      flatten(cat, obj); // ... //
      invert(cat, obj);
    }
  }

  return [inverted, flattened];
 ///////////////////////////////

  function flatten () {
    if (typeof alias === "string") {
    if (flattened[key])
        flattened[key].push([ cat, alias ]);
    else
        flattened[key] = [[ cat, alias ]];
    }
    else
    if (typeof alias[0] === "string") {
    if (flattened[key])
        flattened[key].push([ cat, alias[0] ]);
    else
        flattened[key] = [[ cat, alias[0] ]];
    }
  }

  function invert () {
    if (typeof alias === "string") {
    if (inverted[alias])
        inverted[alias].push([ alias, cat ]);
    else
        inverted[alias] = [[ key, cat ]];
    }
    else
    if (typeof alias[0] === "string") {
    if (inverted[alias[0]])
        inverted[alias[0]].push([ key, cat ]);
    else
        inverted[alias[0]] = [[ key, cat ]];
    }
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
  let [sections, mappings, moveSequences]
    = jstr.getConfigDefaults();

  var err = jsonion.err;
  var errCount = err.length;
   jsonion.cur = "validateConfig"; 

  if (typeof cfg !== "object") {
      err.INPUT(false, "cfg");

      console.log(err);
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
  errorMap.cur = "rxFromArray";

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

      new errorMap.TYPE(expr);
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
           errorMap.OUTPUT(false, expr, bfr);
       }

       if (typeof rxStack[i+1] === "function")
           expr = rxStack[(i=i+1)];
       else break;
       ///////
      } while (0b1) }
        catch (err) { errorMap.MISCONFIG(err) }

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
      new errorMap.FORMAT(str);
    }
  }
}

function encodeRxSpecialChars (arrayOfStrings) {
  if (!arrayOfStrings instanceof Array)
  return;
  
  console.log(arrayOfStrings);
  let rxSet = /(?:\[|\]|\.)/g; // ...
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

 ///////////////////////////////////////////////
// function executableErrorMap (errorTypes) {}

function consoleLog (...params) {
  if (typeof jsonion      === "undefined"
  || (typeof jsonion.mode === "undefined"
  ||         jsonion.mode !== "production")
  && (!jsonion.err
  ||  !jsonion.err.suppress))
  console.log(...params);

  return params;
}

function consoleError (...params) {
  var throws;
  if (params[0] === false)
      throws = !params.shift();

  if (typeof jsonion      === "undefined"
  || (typeof jsonion.mode === "undefined"
  ||         jsonion.mode !== "production")
  && (!jsonion.err
  ||  !jsonion.err.suppress))
  console.trace(...params);

  if (throws) throw ".";
  return params;
}
