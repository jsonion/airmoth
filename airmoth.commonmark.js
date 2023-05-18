const {existsSync, readFileSync, writeFileSync}
    = require && require("fs") || null;

const commonmark
    = require && require("./commonmark@0.30.0")
              || window.commonmark;

const jsonion = new Object({
///  ---------
 terminator: "|",
 rxFromArray,
 encode_unsafe:[ encodeRxSpecialChars, 
                 commonmark.lib.encode_unsafe ],
 log: consoleLog,
 err:{ TYPE: "Type mismatch",
       PATH: "Path not found",
      INPUT: "Invalid input parameter",
      SCOPE: "Value out of scope",
     FORMAT: "Value format invalid",
  MISCONFIG: "Misconfiguration",
   suppress: false,
        log: consoleError,
   makeExec:
  (typeof executableErrorMap === "function" &&
          executableErrorMap)               ||
   function (errorMap) {
   Object.entries(this).forEach(([e,str]) => {
   if (typeof str === "string")
       errorMap[e] = function (...msg) {
       return
       errorMap.push([e,
      (!msg.length) ? str : `${str}:`, ...msg]);
   }})}
}});


jsonion.err.makeExec(jsonion.err);


let time=4;
let timeRx=(str => {
  var res=[];

  if (typeof str === "string"
          && str.length)
  for (let i=time; i>1; i--) {
       res.push(str.repeat(i));
  }

  res.push(str);
  return res;
});

const jstr = new Object({
 ///  ----
  rx: {
    symbols: /[^\w\s[[:cntrl:]]]/g,
    sameChr: /^(?<c>.)\k<c>+$/,
    heading: /h([1-6])/g,
    opStack: [jsonion.encode_unsafe,
   "<=","=>", jsonion.delimiter, "*","^",":",".","&","-",">","@","#",timeRx, "[","]","=","<","!","\"","\'","\`"],
    pick: function (...keys) {
      let res={};
      return keys.every(key => this[key]
                && (res[key] = this[key]))
                && res;
  }},

  ///////////
 // methods
/*
  parseAlias,
  parseModifier,
  parseDefaultValue,

  storeAlias,
  storeModifier,
  storeDefaultValue,
 */

  validateConfig,
  getConfigDefaults: getConfigDefaults__en,
});

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

## Sequence types
  \`@one-off\`, \`#continuous\`

## Sequence modifiers
  \`:variation\`
  \`.modifier\`
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

let cfg = require
 && existsSync("./snowplants.cfg.json")
 && readFileSync("./snowplants.cfg.json");

let yGestAirmoth = { render, plugin };
yGestAirmoth.cfg = (cfg                 &&
                    jstr.validateConfig &&
                    jstr.validateConfig(cfg))
           ? cfg : (jstr.getConfigDefaults)  ?
                    jstr.getConfigDefaults() : null;

 ///////////////////////////////////////////////

var subsections={ },
     hContainer=[0],
     hContents,
     prev = [];

function renderTextLiteral (str) {
  //  get operator sign if encoded
  if (str[0] === "&")

  var pre, op, bfr;
 /////
  if (prev) {
  if ((bfr = prev.lastIndexOf(" ")) >= 0)
       pre = prev.substring(bfr);
  }

  if ((bfr = str.indexOf(" ")) >= 0)
        op = str.substring(0, bfr);

  var match = jstr.rx.opStack.match(op);
  if (match)
  switch (match[0]) {
    case "": 
  }
}

 ///////////////////////////////////////////////

var reader = new commonmark.Parser();
    reader.inlineParser.match = function (re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null)
        return null;
    else
        this.pos += m.index + m[0].length;
        return m[0];

    console.log(re.source);
},  commonmark.lib.rx.debugOffset=[0,0,0];

console.log(typeof reader.inlineParser.match);
console.log(typeof commonmark.lib.rx.debugOffset,
                   commonmark.lib.rx.debugOffset);

var writer = new commonmark.HtmlRenderer({ sourcepos: false });
Object.assign(writer, yGestAirmoth);

var parsed = reader.parse(configDoc);
var result = writer.render(parsed);
console.log(parsed);
console.log(result);

 ///////////////////////////////////////////////
// fs.writeFileSync('./.cache/snowplants.cfg.json', JSON.stringify(customer, null, 2));

function plugin (event) {
  let { node, entering }=event;
  var pos = node.sourcepos;
  var str = node._string_content;
  var lit = node._literal;
  var lvl = node.level;

  if (prev.length
  &&  node.type === "text")
  var [
  type, pos, str, lit, lvl, entering_ ]=prev;

  switch (type) {
    case "heading":
   /////
    if (!hContainer[0]
    ||   hContainer[0] === lvl) {

         hContainer.splice(1,2,),
         hContents = null;

    }
    else
    if (!hContents)
         hContents = hLevel;
  }

  if (type)
  console.log(type, lvl, str, lit, entering);

  if (pos)
  console.log(String(pos[0||1][0||1]))

  prev = node;
}

function getConfigDefaults__en () {
  let moveSequences = [];

  let sections = [
  ["h1", "keyboardProfile", "Keyboard profile"],
  ["h1", "sequences", "Move sequences"],
  ["h1", "syntax", "Syntax"],
  ["h2", "addSequence", "[Add new sequence](javascript:newSequence)"],
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

  return [moveSequences, sections, mappings];
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

function validateConfig (cfg, ast=null) {
  let [moveSequences, sections, mappings]
    = jstr.getConfigDefaults();

  let err=[], sectionErr=[];
  jsonion.err.makeExecutable(err);
  jsonion.err.makeExecutable(sectionErr);

  if (!ast instanceof Object
  &&  !cfg instanceof Object)
  err.INPUT("ast, cfg");

  else if (!ast instanceof Object)
  err.INPUT("ast");

  else if (!cfg instanceof Object)
  err.INPUT("cfg");

  let rx = jstr.rx.pick("heading",
                        "sameChr",
                        "symbols");


  /////////////////////////////////////////
 //   validate move sequence definitions
  var asd;
 /////
  if (!".moveSequences" in cfg)
  err.PATH("cfg.moveSequences");

  else if (!cfg.moveSequences instanceof Array)
  err.TYPE("cfg.moveSequences !Array");

  else {}


  /////////////////////////////////////////
 //   validate config document structure
  var subsections={}, hContainer=[0], hContents;
 /////
  if (!"sections" in cfg)
  err.PATH("cfg.sections");

  else if (!cfg.sections instanceof Array)
  err.TYPE("cfg.sections !Array");
  
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
  err.PATH("cfg.mappings");

  else if (!cfg.mappings instanceof Object)
  err.TYPE("cfg.mappings", "!Object");
  
  else
  Object.entries(cfg.mappings)
        .forEach(([category, object]) => {
    let compare = mappings[category];

    if (typeof compare === "undefined")
    return err.MISCONFIG(`cfg.mapping.${category}`);

    Object.entries(object)
          .forEach(([key,val]) => {
      let compareVal = compare[key];

      if (typeof compareVal === "undefined")
      return err.MISCONFIG(`cfg.mappings.${category}.${key}`);

      mappingEntry(key, val, compareVal,
                   category, object);

      delete compare[key];
    });
  }),
  Object.entries(mappings).forEach(([c,obj]) =>
  Object.keys(obj).forEach(key =>
    (key[0] === "_" || optional.find(key))
     ? false
     : err.PATH(`cfg.mappings.${c}.${key}`)
  ));


  /////////////////////////////////
 //   validate alias definitions
  var asd;
 /////
  if ("alias" in cfg) {
  if (!cfg.alias instanceof Object)
  err.TYPE("cfg.alias", "!Object");
  else {

  }}

 // --------------------------------------------

  err = err.length                         &&
        err.unshift("jstr.validateConfig") && {
      [ err[0] ]: err,
  };

  return (!err) ? true : err;

 ///////////////////////////////////////////////

  function sectionEntry (row, check=false, i=-1) {
    let [ heading, mapping, val ]=row;
    
    if (check) {
        sectionErr.length=0;
   /////
    if (typeof heading !== "string")
    sectionErr.TYPE(`cfg.sections[${i}][0]:`,
                    "!String");
    else
    if (!heading.test(rx.heading))
    sectionErr.FORMAT(`cfg.sections[${i}][0]:`,
             `"${heading}".match(${rx.heading.source})`, "<heading>");

    if (typeof mapping !== "string"
    ||  typeof val     !== "string"
    ||  !mapping.length || !val.length)
    sectionErr.TYPE(`cfg.sections[${i}][1]:`,
                    "!String", "<mapping>");

    if (sectionErr.length)
        return err.concat(sectionErr);
    }

   // ------------------------------------------

    let hLevel=heading[1];
   /////
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
    err.SCOPE(`cfg.sections[${i}]:`,
              `h${heading}`, "<heading>");
    }}

   // ------------------------------------------

    let section
      = hContainer[1];

    if (!check)
    return subsections[section].push(row);

   // ------------------------------------------
    var j;

    if (hContainer[0] === hLevel
    && !subsections[section])
    err.SCOPE(`cfg.sections[${i}]:`, section);
    
    else
    if (hContainer[0] !== hLevel
    &&  0 > (j=subsections[section]
              .findIndex((compare,i,self) => {
                      if (compare[1]===mapping) {
                          self.splice(i,1);
                          return true;
             }})
    ))
    err.SCOPE(`cfg.sections[${section}][${i}]:`,
                                     mapping);
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

    err.PATH("cfg.sections[]:", section,
                                mapping);
  }

  function mappingEntry (key, val, compare,
                         category, catObj) {
    if (!val instanceof Array)
    return err.TYPE(`cfg.mappings.${category}.${key}`, "!Array");

    if (typeof val[0] !== "string")
    err.TYPE(`cfg.mappings.${category}.${key}[0]`, "!String");

    switch (category) {
      case ("sequenceTypes"):
      case ("modifiers"):
      case ("phases"):
        if (typeof val[1] !== "string")
        err.TYPE(`cfg.mappings.${category}.${key}[1]`, "!String");

        var bfr;
       /////
        if (category === "phases"
        && (key === "start"
        ||  key === "mid"
        ||  key === "end")) {
        if (key === "start" && val.length !== 1)
            err.SCOPE(`cfg.mappings.${category}.${key}[0]`, `"${val}".length!==1`);

        if (key === "mid"   && val.length !== 2)
            err.SCOPE(`cfg.mappings.${category}.${key}[0]`, `"${val}".length!==2`);

        if (key === "end"   && val.length !== 3)
            err.SCOPE(`cfg.mappings.${category}.${key}[0]`, `"${val}".length!==3`);

        if (!val.match(rx.sameChr))
             err.SCOPE(`cfg.mappings.${category}.${key}[0]`, `!"${val}".match(${rx.sameChr.source}`);

        if (key !== "start")
            bfr = catObj["start"]    &&
                  catObj["start"][0] &&
                  catObj["start"][0][0];
        if (bfr
        &&  bfr !== val[0][0])
            err.SCOPE(`cfg.mappings.${category}.${key}[0]`, `"${val[0]}"!=="${bfr}"`);
        }
        else
        if (val[0].match(rx.symbols))
            err.SCOPE(`cfg.mappings.${category}.${key}[0]`, `!"${val}".match(${rx.symbols.source}`);

      default:
        if (typeof val[0] !== "string")
        err.TYPE(`cfg.mappings.${category}.${key}[0]`, "!String");
    }

    let index=val.slice(-2);
   /////
    if (typeof index[0] !== "number")
        err.TYPE(`cfg.mappings.${category}.${key}[-2]`, "!Number", "<offset_index>");
    else
    if (index[0] < 0)
        err.SCOPE(`cfg.mappings.${category}.${key}[-2]`, `${index[0]}<0`, "<offset_index>");

    if (typeof index[1] !== "number")
        err.TYPE(`cfg.mappings.${category}.${key}[-1]`, "!Number", "<offset_index>");
    else
    if (index[1] < 0)
        err.SCOPE(`cfg.mappings.${category}.${key}[-1]`, `${index[0]}<0`, "<offset_index>");
 
    return;
  }

  function mapAliasEntry() {}
}

////////////////////////////////////////////////

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

////////////////////////////////////////////////

function rxFromArray (rxStack, errorMap=null) {
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

      reportError("TYPE", expr);
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
           reportError("TYPE", "Function output invalid", expr, bfr);
       }

       if (typeof rxStack[i+1] === "function")
           expr = rxStack[(i=i+1)];
       else break;
       ///////
      } while (-0b01) }
        catch (error) { reportError("MISCONFIG", error) }

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

        throw bfr;

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
      reportError("FORMAT", str, e);
    }
  }

  function reportError (ERR_TYPE, ...msg) {
    if (errorMap
    &&  typeof errorMap[ERR_TYPE] == "function")
        return errorMap[ERR_TYPE](...msg);

    if (jsonion
    &&  jsonion.err
    &&  jsonion.err[ERR_TYPE]
    &&  jsonion.err.log)
        jsonion.err.log(
        jsonion.err[ERR_TYPE]+":", ...msg);
    else
        console.error(...msg);
  }
}

////////////////////////////////////////////////

function executableErrorMap (errorMap) {
  if (!errorMap instanceof Array)
  return;

  var self, depth=1;
  if (errorMap === this) {
      errorMap = new Array();
      var self = this;
  }

  Object.entries(this).forEach(([key,str]) => {
  if (typeof str === "string") {
      errorMap[key]=function (...msg) {
      depth=1;

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

      errorMap.push([key,
     (!msg.length) ? str : `${str}:`, ...msg]);

          if (jsonion.err.log)
      return (jsonion.err.log(errorMap.at(-1)));
  }}
  else
  if (self)
      errorMap[key]=str || (!"function");
  });

  if (self)
  jsonion.err = errorMap;

 ///////////

  function evalArg (obj) {
    if (obj === null)
        return null;
    if (jsonion.err.reportArgVAlue
    && (typeof obj === "string"
    ||  typeof obj === "number"
    ||  typeof obj === "boolean"))
        return obj;

    var res;
    if (typeof obj !== "object") {
    if (obj.length
    ||  obj.length === 0)
        res = [typeof obj, obj.length];
    else
        res = typeof obj;
    }
    else
    if (typeof obj === "object") {
        res = [obj.constructor.name, obj.length];
    if (!!obj[Symbol.iterator]
    && `${obj[Symbol.iterator]}`.substring(9,15)
                                   === "values") {  
    if (depth <= jsonion.err.reportArgDepth)
    for (let val of obj) {
         res.push(evalArg(val));
    }}
    else
    if (Object.entries(obj).length)
    for (let [key,val] of Object.entries(obj)) {
         if (depth < jsonion.err.reportArgDepth)
         res.push([key].concat(evalArg(val)));

         else
         res.push(key);
    }}
    return res;
  }
}

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
  if (typeof jsonion      === "undefined"
  || (typeof jsonion.mode === "undefined"
  ||         jsonion.mode !== "production")
  && (!jsonion.err
  ||  !jsonion.err.suppress))
  console.error(...params);

  return params;
}

function encodeRxSpecialChars (arrayOfStrings) {
  if (!arrayOfStrings instanceof Array)
  return;

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

console.log(jstr.rx.opStack)
