if (typeof module === "object")
           module.exports = {
    isOperatorType, opFactory,
    appendOpCodes,
    objectAssign,
};

var testOpCode = isOperatorType(true);
    console.log(testOpCode);
    console.log(testOpCode.num(2 || 234));
    console.log(appendOpCodes({}));

function appendOpCodes (obj,
         appendSynonyms=true,
             filterKeys=[],
             filterVals=[]) {
const ops={                                   /*
  ``````````````````````````````````````````````
  literal type match condition
  … predicate defines => query match type */
  num:                         [[0b10]], //
  str:                      [[0b11]],   //
  fn:                    [[0b101]],   ///
  cls:                 [[0b110]],    ///
  arr:              [[0b1000]],    ////
  obj:           [[0b1001]],/*   /////

  ``````````````````````````````````````````````
  query function slot: match / modify
  … predicate expects => function in query    */
  slotFn:                       [[-0b101]],   /*

  ``````````````````````````````````````````````
  query slot: match value
  … predicate expects => match str/num value */
  slotAny:               /^\.\*$/,          //
  slotAny:             [[0b1010]],        ///
  slotNonEmpty:       /^\.\+$/,         ////
  slotNonEmpty:     [[0b1011]], /*    /////

  ``````````````````````````````````````````````
  query slot: match value(s) in array
  ( cross-matching value(s) and items in array )
  … predicate expects => value match in query */
  slotEnum:           [[0b1100]],            //
  slotArray:       [[0b1111]],/*           ///

  ``````````````````````````````````````````````
  query modifier slot (on regex match)
  … predicate expects => set str/num conforms */
  setNum:      /[0-9]*[\.]*[0-9]+/,          //
  setRx:          /[\w\[\)\\]/,             //
  setNum:         [[-0b1100]],            ///
  setRx:          [[-0b1101]],   /*     ////

  ``````````````````````````````````````````````
  special operators for numeric values
  … defined in: predicate | modifier | coseq */

//  autoIncrement, increaseOnWrite, gt
    '++': [[-0b1]],

//  decreaseOnWrite, autoDecrement, lt
    '--': [[-0b11]],

//  setIncremental, [/], isEqual
   '===': [[0b1]],

//  [/], [/], isPositive
   '+++': [[0b100]],

//  deleteRowOnZero, [/], isNegative
   '---': [[-0b100]],
                                         /*
  ``````````````````````````````````````````````
  processing sequences
  … in array row, among multiple rows */
//  extract typed sequence from row
    typedSequence:(expectsType = null) =>
    (1<expectsType && expectsType<10)
     ? [[0b10000, expectsType]]
     : [[0b10000]],
};

var synonyms;
if (typeof appendSynonyms === "object")
                 synonyms 
         = appendSynonyms;
else
synonyms = (!appendSynonyms) ? false : {
  num:'number',
  str:'string',
  fn:['fnc','function'],
  cls:'class',
  arr:'array',
  obj:'object',

  slotFn:['slotFnc','slotFunction'/* setFn */],
  slotEnum:['__enum','__oneOf','__any'],
  slotArray:['matchArray','__all'],
  setNum:'setNumber',
  setRx:'setString',

  typedSequence:['typedSeq','extract','seq','sequence'],

 '===':['incremental','oneOff','EQ','isEqual'],
 '+++':['isPositive'],
 '---':['isNegative','deleteOnZero','delZero'],

  '++':[  'autoIncrement',
         'increment','oneUp','countUp',
  'GT', 'isLarger','isGreater','isGreaterThan'],

  '--':['autoDecrement',
        'decrement','oneDown','countDown',
  'LT', 'isSmaller','isLess','isLessThan'],
};

if (typeof obj === "object"
||  typeof obj === "function")
    return objectAssign(obj,
                        ops, synonyms,
                 filterKeys,
                 filterVals, {
                 extractVal: (val) => {
                   if (val instanceof Array
                   &&  val.length === 1
                   &&  val[0] instanceof Array
                   &&  val[0].length === 1)
                   return val[0][0];

                   else
                   return val;
                 }});
}

function isOperatorType (op, which="") {
       var attachUnwrap;
if (typeof arguments[0] === "boolean") {
           attachUnwrap
         = arguments[0];
}
else {
  if (op instanceof Array
  &&  op.length === 1) {
      if  (op[0] instanceof Array
      &&   op[0].length === 1)
           op = op[0][0];
      else op = op[0];
  }

  if (typeof op !== "number")
  op=(Number.isNaN(parseInt(op))) ?
       undefined : parseInt(op);
}

var enums = opFactory;
var enumObj = new Object({    ///    n=34
//  literal match type
num:     (op) =>  op == 2  ||  2 == enums(op),
str:     (op) =>  op == 3  ||  3 == enums(op),
fn:      (op) =>  op == 5  ||  5 == enums(op),
arr:     (op) =>  op == 8  ||  8 == enums(op),
obj:     (op) =>  op == 9  ||  9 == enums(op),
cls:     (op) =>  op == 6  ||  6 == enums(op),
null:        (op) => op === null,
bool:        (op) => typeof op === "boolean",
undefined:   (op) => typeof op === "undefined",

//  slot match
slotAny:   (op) => op == 10 || 10 == enums(op),
slot:      (op) => op == 11 || 11 == enums(op),

//  slot match array
slotEnum:  (op) => op == 12 || 12 == enums(op),
slotMatch: (op) => op == 15 || 15 == enums(op),
slotFn:    (op) => op == -5 ||  5 ==
                            Math.abs(enums(op)),
//  slot set value
setNum:    (op) => op == -12 ||-12 == enums(op),
setRx:     (op) => op == -13 ||-13 == enums(op),
setFn:     (op) => op ==  -5 ||  5 ==
                            Math.abs(enums(op)),
//  extract typed sequence
seq:       (op) => op == +16 || 16 == enums(op),

//  incrementing and decrementing counters
oneUp:     (op) => op == -1  || -1 == enums(op),
oneDown:   (op) => op == -4  || -4 == enums(op),
delZero:   (op) => op == -2  || -2 == enums(op),
setIncremental:   (op) => op === 1 ||
                    enums(op) == 1,

//  comparing numbers
gt:        (op) => op == -1  || -1 == enums(op),
lt:        (op) => op == -4  || -4 == enums(op),
eq:        (op) => op ==  1  ||  1 == enums(op),
positive:  (op) => op ==  4  ||  4 == enums(op),
negative:  (op) => op == -2  || -2 == enums(op),

//  query system
isQueryTerm: (op) => op == -0b0,
isMultiType: (op) => op == -0b111,

//  categories
literal:     (op) => [...[7], 2, 3, 5, 8, 9, 6]
                                   .indexOf(op)
 ||  op === null  ||  typeof op === "boolean"
                  ||  typeof op === "undefined",
querySlot:   (op) => [ 13,   10,11,12,15, 5,-5]
                                   .indexOf(op),
setSlot:     (op) => [-13,      -12,-13, -5, 5]
                                   .indexOf(op),
incremental: (op) => [-14,        -1,-4, -2, 1]
                                   .indexOf(op),
compareNums: (op) => [ 14,      -1,-4, 1, 4,-2]
                                   .indexOf(op),
});

let unwrap = (fn) => {
return function (op) {
if (op instanceof Array
&&  op.length === 1) {
    if  (op[0] instanceof Array
    &&   op[0].length === 1)
         op = op[0][0];
    else op = op[0];
} return fn(op) }};

if (op
    && which
    && typeof enumObj[which] !== "undefined")
       return enumObj[which](op);
  else return attachUnwrap
           && Object.entries(enumObj)
                    .forEach(([term, fn]) =>
                       enumObj[term]
                       = unwrap(fn))
           || enumObj;
}

function opFactory (enumLiteral,
                    operation=0) {
var __;
try
{  __  = -(0b01)  }
catch (e)
{  console.warn("Binary numbers unsupported")  }

if (typeof enumLiteral === "string")
switch (enumLiteral) {

     //////////////////////////
    // ---------------------
   //   numeric operators
  // ---------------------

  case ("++"):
  case ("GT"):
  case ("gt"):
    //  increaseOnWrite
    //  autoIncrement
    //  greaterThan
        return -1;

  case ("--"):
  case ("LT"):
  case ("lt"):
    //  decreaseOnWrite
    //  autoDecrement
    //  lessThan
        return -3;

  case ("==="):
  case ("EQ"):
  case ("eq"):
    //  setIncremental
    //  isEqual
        return 1;

  case ("+++"):
    //  isPositive
        return 4;

  case ("---"):
    //  deleteRowOnZero
    //  isNegative
        return -4;
}


   ///////////////////////
  // ------------------
 //   literal values
// ------------------

if (typeof enumLiteral === "number") {
//  numeric literal
    return 2;
}

if (typeof enumLiteral === "string") {
//  string literal
    return 3;
}


   //////////////////////////////
  // -------------------------
 //    regular expressions 
// -------------------------

if (enumLiteral instanceof RegExp) {
//  a formality (results may vary)
    enumLiteral
 = (enumLiteral.source);

let rx = {
    slotAny: [
      /^\^*\.\*\s?\$?$/,
      /^\^*\[(\\n|\\r|\\s|\\t)\.(|\\n|\\r|\\s|\\t)]\*\s?\$?$/,
      /^\^*\((?:\?\:)*(?:(?:\\n|\\r|\\s|\\t)\|)*\.\*(?:\|(?:\\n|\\r|\\s|\\t))*\)\s?\$?$/,
    ],
    slotNonEmpty: [
      /^\^*\.\+\s?\$?$/,
      /^\^*\[(\\n|\\r|\\s|\\t)\.(|\\n|\\r|\\s|\\t)]\+\s?\$?$/,
      /^\^*\((?:\?\:)*(?:(?:\\n|\\r|\\s|\\t)\|)*\.\+(?:\|(?:\\n|\\r|\\s|\\t))*\)\s?\$?$/,
    ],
    slotNum: [
      /\\[\^\$\[\]\{\}\(\(\<\>\:\?\!\*\#\|]/,
      /(?:\d|\\d)/,
    ],
};

if (rx.slotAny[0].test(enumLiteral)
//  multiline
||  rx.slotAny[1].test(enumLiteral)
||  rx.slotAny[2].test(enumLiteral))
//  formal query slot
    return;

if (rx.slotNonEmpty[0].test(enumLiteral)
//  multiline
||  rx.slotNonEmpty[1].test(enumLiteral)
||  rx.slotNonEmpty[2].test(enumLiteral))
//  formal non-empty query slot
    return;

if (!rx.slotNum[0].test(enumLiteral)
&&   rx.slotNum[1].test(enumLiteral))
//  setNum query modifier slot
    return;

else
//  setRx query modifier slot
    return;
}


   ///////////////////////////////
  // --------------------------
 //    objects & functions
// --------------------------

if (typeof enumLiteral === "object")
switch (enumLiteral.constructor.name) {
  case ("Array"):
    //  array struct
        return 8;

  case ("Object"):
    //  path struct
        return 9;

  default:
    //  class instance
        return 6;
}

if (typeof enumLiteral === "function") {
if (enumLiteral.prototype
&&  enumLiteral.prototype
               .constructor.name !== "Function")
//   class object
     return 6;

else
//   native function (predicate || modifier)
     return 5;
}}

function objectAssign (obj, appendObj,
  synoynmObj=null, keys=[], values=[],
  cfg={
  overwrite: true,
      clone: false,
             filter: false, extractVal: null,
               omit: false,    wrapVal: null,
}){
  if (typeof obj !== "object"
  ||  typeof appendObj !== "object")
      return false;

  if (typeof synonymObj !== "object"
  || (       synonymObj
  && !Object
       .keys(synonymObj).length)) {
             synonymObj = false;
  }

 ///// /////////////////////////////////////////

  if (typeof cfg !== "object")
  cfg={};

  if (cfg.clone)
  obj={...obj};

  if (typeof cfg.overwrite !== "boolean")
  cfg.overwrite = false;

  if (typeof cfg.extractVal !== "function")
  cfg.extractVal = null;
  
  if (typeof cfg.wrapVal !== "function")
  cfg.wrapVal = null;

 /////
  if (!keys instanceof Array)
       keys = false;
  else keys =  keys;
  if (!keys.length)
       keys = false;

 /////
  if (!values instanceof Array)
       values = false;
  else values = values;
  if (!values.length)
       values = false;

  var filterKeys,
      filterVals;
 /////
  if (cfg.filter) {
  if (keys.length)   filterKeys = keys;
  if (values.length) filterVals = values;
  }

  var omitKeys,
      omitVals;
 /////
  if (cfg.omit) {
  if (keys.length)   omitKeys = keys;
  if (values.length) omitVals = values;
  }

 ///// /////////////////////////////////////////

  for (var [key, val] of Object
                        .entries(appendObj)) {
   if (cfg.extractVal)
       val = cfg.extractVal(val);

   if (filterVals
   &&  filterVals.indexOf(val) === -1) {
       continue;
   } ///////////////////////////////////////////

   if (omitVals
   &&  omitVals.indexOf(val) !== -1) {
       continue;
   } ///////////////////////////////////////////

   if (cfg.overwrite
   ||  typeof obj[key] === "undefined")
   obj[key] = val;

   if (typeof synonymObj[key] !== "undefined") {
   let newKey=synonymObj[key];
      ////////
   if (newKey instanceof Array)
   for (let newKey_ of newKey) {
    if (filterKeys
    &&  filterKeys.indexOf(newKey_) === -1)
        continue;

    if (omitKeys
    &&  omitKeys.indexOf(newKey_) !== -1)
        continue;

    if (cfg.overwrite
    ||  typeof obj[newKey_] === "undefined")
               obj[newKey_] = wrapVal      &&
                              wrapVal(val) ||
                                      val;
   }
   else
   if (typeof newKey === "string") {
   if (filterKeys
   &&  filterKeys.indexOf(newKey) === -1)
       continue;

   if (omitKeys
   &&  omitKeys.indexOf(newKey) !== -1)
       continue;

   if (cfg.overwrite
   ||  typeof obj[newKey] === "undefined")
              obj[newKey] = wrapVal      &&
                            wrapVal(val) ||
                                    val;
  }}}

  return obj;
}
