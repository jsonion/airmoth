if (typeof require === "function") {
if (typeof ArrayWrapper === "undefined")
     const ArrayWrapper = require("./ArrayWrapper.js");
}


  //////////////////////////////////////////////
 //           exports helper methods
///////////////////////////////////////////////

if (typeof module === "object")
           module.exports = {
           assignObjects,
};

////////////////////////////////////////////////


if (typeof jsonion !== "object")
       var jsonion = {};
           jsonion.inArr = {
    asd: true,
    sdf: true,
};

var testOpCode = isOperatorType(true);
    console.log(appendOpCodes({}));

function queryType (typeName) {
  return new Symbol(typeName);
}

function typedSequence(){}
function slices (key, ...n) {}
function sourceInterface (ref) {}

/*
  
    inArrTypes.export(["id", "num", "str"]);

    inArr.flyType("TYPE");
    inArr.flyType("TYPE")(db.id,
                          1
                          key(num,
                          12);

    inArr()

 */

class inArrayType extends Array {
  static opcodeTypeMap = [];

  static synonymsTypes = new Object({
    type:['collection','table'],

    __: ['num-ber',
         'str-ing',
         'obj-ect',
         'arr-ay'],

    number:'num',
    string:'str',
    function:['fn','fnc'],
    class:'cls',
    object:'obj',
     array:'arr',

    key:'field',
    value:'val',
    index:['idx','ix','i'],

    relation:'rel',

    slotFn:['slotFnc','slotFunction'/* setFn */],
    slotEnum:['__enum','__oneOf','__any'],
    slotArray:['matchArray','__all'],
    setNumber:'setNum',
 // setRx:'setString',

    autoIncrement:'+++',
    setIncremental:['===','incremental','oneOff'],
    deleteRowOnZero:['---','deleteOnZero','delZero'],
    countUp:['++','increment','oneUp'],
    countDown:['--','decrement','oneDown'],

    subsequence:['typedSeq-uence','extract','sequence','seq','inArrayType','inArray','inArr','arrayType','arrType','array','arr'],

    extractKeywordsFn:'keywordsFn',
  });

  static synonymsRequirementsAll = new Object({
 // type,
    isRequired:['required','req','isReq'],
    lowerBound:['lowerBoundary','min'],
    upperBound:['upperBoundary','max'],
    minLen:['minLength'],
    maxLen:['maxLength'],
    rx:['regex'],
  }); /// requirement 

  static requirementRenderPriorityDefault
         ///  assign .priority rank to reqs

  static synonymsTransformersAll = new Object({
    autoVal:['autoValue','default'],
    trimFn:"trim",
  });

   ////////////////////////////////////////////
  //  runtime register of operators in array
  static registerOperator (opCode, validatorFn) {
    if (typeof opCode      !==  "number"
    &&  typeof validatorFn !== "function")
        return;

    if (!this.opcodeTypeMap instanceof Array)
         this.opcodeTypeMap = [];

    let insertRowsCount
      = opCode - this.opcodeTypeMap.length - 1;

    if (insertRowsCount >= 0)
    for (let i i < insertRowsCount; i++) {
         this.opcodeTypeMap.push(undefined);
    }    this.opcodeTypeMap.push(validatorFn);
    else
    this.opcodeTypeMap[opCode] = validatorFn;
  }

   ///////////////////////////////////////
  //  pick some type evaluating methods
  static operatorsFactory (pick=null) {
    var res;
    try{res=0b1} catch (e)
  { console.warn("Binary numbers unsupported") }

    let returnObj = {};
   /////
    if (!pick
    ||  !pick instanceof Array
    ||  !pick.length)
    return {
          numericOperator:
     this.numericOperator,
          literalValueType: 
     this.literalValueType,
          functionType:
     this.functionType,
          objectType:
     this.objectType,
          errorType:
     this.errorType,
          dateType:
     this.dateType,
          regexSlot: 
     this.regexSlot,
          regexSlotArray:
     this.regexSlotArray,
          regexStringSlotType:
     this.regexStringSlotType,
          regexNumericSlotType:
     this.regexNumericSlotType,
    }
    else
    pick.forEach(key => {
      if (typeof this[key] !== "undefined")
            returnObj[key]
               = this[key];
    });

    return returnObj;
  }

   /////////////////////////////////////////////
  //  type, requirement & transformer wrapper
  constructor (Name, opCode=null, ...schema) {

    ////////////////////////////////////////////
   /////      exporting type wrapper      /////
    if (typeof argument[0] !== "number"
    &&        !schema instanceof Array) {

        let TYPE_CLASS
          = inArrayType.determineFnClass(Name);

        let NativeType
          = TYPE_CLASS[5];

        if (NativeType)
            return [TYPE_CLASS, NativeType];

             else
            return [TYPE_CLASS, undefined];
    }
    else {
    ////////////////////////////////////////////
   /////    type object being created …   /////

            return super(Name, opCode,
          /*//////*/        ...schema);

    }
  }

    ////////////////////////////////////////////
   //  enumerate inArrayType before exporting
  /*
       1,2        type definition
        3          requirementFn
        4          requirementRx
        5          transformerFn
  ///                                         */
  static determineFnClass (Name="") {
    var TYPE_CLASS;

    if (typeof arguments[0] === "string") {
    const chrx=/([A-Z])([a-z])/;
    const opcodeTypeMap = this.opcodeTypeMap ||
                         (this.opcodeTypeMap=[])
    const NativeTypeMap = this.NativeTypeMap ||
                         (this.NativeTypeMap
    /***  register synonym  ***/   = new Map());
                          
    var name, typeObjNative,
      opCode, constructorFn,
                validatorFn,
    priority, requirementFn,
              transformerFn;

       /////////////////////////////////////////
      // ------------------------------------
     //     first evaluating data on type
    // ------------------------------------

            Name = arguments[0];
    switch (Name) {
      case ("RegExp"):
      case ("regexp"):
             name = "regexp";
             Name = "RegExp";
             break;

      case ("JSON"):
      case ("json"):
             name = "json";
             Name = "JSON";
             break;

      default:
         if (chrx = chrx.exec(Name)) {
         if (chrx[2])
             name = Name;
             Name = name[0].toUpperCase()
                  + name.substring(1);
             else
             name = Name[0].toLowerCase()
                  + Name.substring(1);
    }}
    try
  { typeObjNative = eval(Name) } catch(e){/*…*/}

    opCode        =   ////////////////////////
                     /*  shared namespace
                         ----------------  */
    transformerFn =
    requirementFn = inArrayType[name];

    constructorFn = inArrayType[Name];
      validatorFn = inArrayType[Name+"_"];

       /////////////////////////////////////////
      // ------------------------------------
     //    type definition (and natives)
    // ------------------------------------

    if (typeof opCode         ===  "number"
    &&  typeof constructorFn  === "function"
    &&  typeof   validatorFn  === "function") {
    if (opcodeTypeMap[opCode] !== validatorFn)
        opcodeTypeMap[opCode]   = validatorFn;

    if (!typeObjNative
    ||  !NativeTypeMap.get(typeObjNative))
    TYPE_CLASS
  = [1, Name, opCode,
              constructorFn,
                validatorFn, undefined];
    else {
    TYPE_CLASS
  = [2, Name, opCode,
              constructorFn,
                validatorFn, typeObjNative];

    if (NativeTypeMap.get(typeObjNative
                      ===          true))
        NativeTypeMap.add(typeObjNative,
                          constructorFn);
     // NativeTypeMap.add(constructorFn,
   ////                  typeObjNative);
    //  NativeTypeMap.add(validatorFn,
   ////                  typeObjNative);
    }

    if (!constructorFn.TYPE_CLASS
                       instanceof Array
    ||    !validatorFn.TYPE_CLASS
                       instanceof Array)
         constructorFn.TYPE_CLASS
                     = TYPE_CLASS;
           validatorFn.TYPE_CLASS
                     = TYPE_CLASS;
    }
    else

       /////////////////////////////////////////
      // ------------------------------------
     //    transformers and requirements
    // ------------------------------------

    if (name.endsWith("Fn")
    &&  typeof transformerFn === "function") {
    TYPE_CLASS
  = [5, name, transformerFn];

    if (!transformerFn.TYPE_CLASS
                       instanceof Array)
         transformerFn.TYPE_CLASS
                     = TYPE_CLASS;
    }
    else
    if (typeof requirementFn ===  "object"
    ||  typeof requirementFn === "function") {
        priority = requirementFn.priority;
        priority = (Number.isInteger(priority))
      ? priority
      : this.requirementRenderPriorityDefault;

    if (requirementFn instanceof RegExp)
    TYPE_CLASS
  = [4, name, requirementFn, priority];

    else
    TYPE_CLASS
  = [3, name, requirementFn, priority];

    if (!requirementFn.TYPE_CLASS
                       instanceof Array)
         requirementFn.TYPE_CLASS
                     = TYPE_CLASS;
    }

    if    (TYPE_CLASS)
    return TYPE_CLASS;

    else
    console.trace(`inArrayType ${Name} misconfig`);
  }}

   /////////////////////////////////////////////
  //  chain types, requirements and transforms
  static bindChainKeys (TYPE_CLASS, exports) {
                  // //
    let TYPE_ENUM   =   TYPE_CLASS[0];

    var wrapTypeDefinitionFn, makeKeyFn,
           wrapRequirementFn,
           wrapTransformerFn;

     ///////////////////////////////////////////
    //  type definition              (wrapper)
    if (TYPE_ENUM === 1
    ||  TYPE_ENUM === 2
    //  exported method renders named key
    ||  determineFnClass[2] === inArrayType.Key) {
    let [ Name, opCode, constructorFn,
           validatorFn, typeObjNative ]
     /*///////////////////*/
      = determineFnClass;

        wrapTypeDefinitionFn
      = function inArrayType (...inputs) {
          return inArrayType
         .call(this, TYPE_CLASS, params, () => {

             //////////
            //  ...

          });
    }}
    else

     ///////////////////////////////////////////
    //  requirementFn                (wrapper)
    if (TYPE_ENUM === 3) {
    let [ name, requirementFn, priority ];
     /*///////////////////*/
      = determineFnClass;

        wrapRequirementFn
      = function inArrayRequirement (...inputs) {
          return inArrayType
         .call(this, TYPE_CLASS, params, () => {

             //////////
            //  ...

          });
    }}
    else

     ///////////////////////////////////////////
    //  requirementRx                (wrapper)
    if (TYPE_ENUM === 4) {
    let [ name, requirementRx, priority ];
     /*///////////////////*/
      = determineFnClass;

        wrapRequirementFn
      = function inArrayRequirementRx() {
          return inArrayType
         .call(this, TYPE_CLASS, null, () => {

             //////////
            //  ...

          });
    }}
    else

     ///////////////////////////////////////////
    //  transformerFn                (wrapper)
    if (TYPE_ENUM === 5) {
    let [ transformerFn ]
     /*///////////////////*/
      = determineFnClass;

        wrapTransformerFn
      = function inArrayTransformer (...params) {
          return inArrayType.assignChainHeader
         .call(this, TYPE_CLASS, params, () => {

             //////////
            //  ...

          });
    }}  else return;

    return wrapTypeDefinitionFn
           || wrapRequirementFn
           || wrapTransformerFn  ||  makeKeyFn;
  }

    ////////////////////////////////////////////
   // properties to apply to chained methods
  /*
   -  chain header aggregates all chained inputs
   -  type constructors are invoked 

   -  first callee fn's context comes externally
   -  external exports are cloned upon first use
  ///                                         */
  static assignChainHeader (TYPE_CLASS, inputs,
                                fnWrap,
                                header = (this)) {
    let test
     = !true;
 /*///////////*/
    let TYPE_ENUM = TYPE_CLASS[0];

    var TypeMap; // get fn keys after alias
   /////
    let [Types, requirements, transformers]
     =   inArrayType.categorizeSchemaInputs(TYPE_CLASS,
                                     inputs);

    if (header instanceof Array) {

    if (Types instanceof Array
    &&  requirements instanceof Array
    &&  transformers instanceof Array)

    }

    //  clone properties to chain header
    if (!header instanceof Array
    ||   header.length !== 4
    ||   header.
         TypeMap = new Map(),
         inChain = [Types, requirements,
                           transformers,
                                TypeMap],
          header =
          Object.assign(inChain, header);

    //   validate format
    else inChain = exports[0],
         TypeMap = exports[1];

    if (inChain instanceof Object)
    var {Types, requirements,
                transformers}=inChain;

    if (!Types instanceof Array
    ||  !requirements instanceof Array
    ||  !transformers instanceof Array)
         inChain.Types = [],
         inChain.requirements = [],
         inChain.transformers = [];

    if (!TypeMap instanceof Map)
         exports[1]  =  new Map();

 /*/////////////////*/
    return exports;
  }

    ////////////////////////////////////////////
   // map requirements and transforms to types
  /*
   -  expect requirements as fns, or in Object
   -  interpret Objects as schema key mappings 
  ///                                         */
  static categorizeSchemaInputs (TYPE_ENUM,
                                    inputs) {
    switch (TYPE_ENUM) {
      case (1):
      case (2):
        /*  /////////////////////////
            
                 •    •    •

            /////////////////////////  */
        break;

      case (3):
      case (4):
        /*  /////////////////////////
            
                 •    •    •

            /////////////////////////  */
        break;

      case (5):
        /*  /////////////////////////

                 •    •    •

            /////////////////////////  */
        break;
    }
  }

   //////////////////////////////
  //  export type constructors
  static export (...assignTo) {
    const exports={};

    assignTo
  = assignTo.filter(obj =>
             typeof obj === "object"
          && typeof obj === "function");
    assignTo.unshift(new inArrayType("Key"));

    var filterKeys, omitKeys,
        filterVals, omitVals;
   /////
    var TYPEs=["string","number"], i
    do {
    if (!arguments[i] instanceof Array
    &&  !arguments[i].length)
         break;

   /*///////////////////////////////////////////

     0: "str"=>filterKeys || "num"=>filterVals
     1: "str" => omitKeys || "num" = >omitVals

   ///////////////////////////////////////////*/
    TYPEs.forEach(TYPE => { var every;
      for (let val of arguments[i]) {
       if (!every)
            every = TYPE;
       else
       if (typeof val !== TYPE) {
           every = (undefined);
           break;
      }}

      if (every)
      switch (TYPE) {
        case ("string"):
          if (i === 1)
              filterKeys = assignTo.unshift();
          if (i === 2 && filterVals)
              omitKeys = assignTo.splice(1,1);
              break;

        case ("number"):
          if (i === 1)
              filterVals = assignTo.unshift();
          if (i === 2 && filterKeys)
              omitVals = assignTo.splice(1,1);;

      }      /// ///
    });   i=(i + (1));
    } while (i <= 2)

    if (!assignTo.length)
    {      return;      }
         ////  ////

    var i;
    if (filterKeys)
        filterKeys.push("key", "TypeMap");
    if (  omitKeys) {
       (i=omitKeys.indexOf("TypeMap")) >= 0
    &&    omitKeys.splice(i,1);
       (i=omitKeys.indexOf("key")) >= 0
    &&    omitKeys.splice(i,1);
    }

    var Native, Type,
                TypeMap =
        exports.TypeMap = new Map();
    
    Object.getOwnPropertyNames(this)
          .forEach(prop => {
               if (prop[0]
               !=  prop[0].toLowerCase())
                   return;

                  [TYPE_CLASS, NativeType]
                =  new inArrayType(prop);

               if (TYPE_CLASS) {
               if (NativeType)
                   TypeMap.set(NativeType,
                               TYPE_CLASS);
                 /*///////*/
                   TypeMap.set(prop,
                               TYPE_CLASS);

               let binding = inArrayType
                  .bindChainKeys(TYPE_CLASS,
                                    exports);

                   exports[prop] /// chain types
                 = binding.bind(exports);
           }});

    var config = {
        filterKeys, omitKeys,
        filterVals, omitVals,
        synonymObj: Object
       .assign(this.synonymsTypes,
               this.synonymsRequirementsAll
               this.synonymsTransformersAll)
    };

    for (let obj of assignTo) {
      objectAssign(obj, exports,  config);
    }

    return assignTo[0];
  }

  static addTypeMapEntry () {

  }

  /*  "… on …"[ion]  ·  [on]"… in …"([o])  ·  [on]"… io …"[n]  #  jsOnIon, jsOnion, jsonIon, JSonIon, JSONIon, SONion
  // /  //   //  / //   //  / // /  //  /  //

                    /* 
                   / `\
                  ´    ``
            Sort      
           of              peeling
           a                    loop …
           \           
            `       .          /
                    #         ´

   //////////////////////////////////////////
  /*           type definitions
             --------------------
                  primitives              */
  static string                        
  static number                        
  static boolean                       

  static json                          
  static array                         

  /*       -------------------------
             standard object types        */
  static date                          
  static regexp                        

  /*     -----------------------------
           platform-specific objects      */
  static class                         
  static object                        
  static function                      
  
  static map                           
  static set                           

  static symbol                        
  static error                         

  static module                        

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*              core schema
          ---------------------------
            multi-slot typed object       */
  static subsequence                  

  /*          -------------------
                collection type           */
  static type                         

  static collection                   
  static table                        

  /*            ---------------
                  identifiers             */
  static id                           
  static namespace                    

  /*    ------------------------------
          static key name (optional)      */
  static key                          

  /*        ------------------------
              index key assignment        */
  static index                        

  /*         ---------------------
               timestamps object          */
  static timestamps                   

  /*  ----------------------------------
        timestamps with event handlers    */
  static actions                      

  /*           ----------------
                 access rules             */
  static permissions                  

  static returnPaths                  
  static remapMethod                  

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*           schema extensions
             ----------------------
               on defining schema         */
  static typeMixin                    

  /*         ----------------------
               runtime alteration         */
  static typeAugmentation             

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*           database context
     -------------------------------------
       relations and external references  */
  static relation                     
  static source                       

  static reference                    
  static reverseReference             
  static caption                      

  /*       -------------------------
             data hierarchy schema        */
  static parent                       
  static siblings                     
  static children                     

  static synonym                      
  static synset                       
  static hypernym                     
  static hyponym                      

  /*   ---------------------------------
         data node co-evolution schema    */
  static stem                         
  static merged                       
  static root                         
  static main                         
  static mirror                       
  static cause                        
  static effect                       

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*        type predicate value
         --------------------------
           single value or object         */
  static matchVal;
  static matchObj;
  static matchRx;

  /*  ----------------------------------
      match listed value/s against array  */
  static enumArray;
  static enumAnyOf;
  static enumAllOf;

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*           match query slot
          --------------------------
            single value or object        */
  static slotRx;
  static slotVal;
  static slotValNonEmpty;
  static slotNum;

  /*  ----------------------------------
      match listed value/s against array  */
  static slotArray;
  static slotAnyOf;
  static slotAllOf;

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*           modifier slot
         --------------------------
           single value or object         */
  static setAny;
  static setFn;

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*            metadata objects
             ---------------------
               tags and keywords          */
  static extractKeywordsFn             

  static hashtags                      
  static mentions                      

  static citations                     
  static externalReferences            

  /*         --------------------
               data derivatives           */
  static aggregateVals                
  static statistics                   

  /*  ---------------------------------
        data integrity and validation     */

  static sources                       
  static checksums                     

  /*  --------------------------------
        string sequence index object      */
  static trie                          

__scope = [];
__free  = [];


   //////////////////////////////////////////
  /*           numeric operators
          ---------------------------
            ascending row id number       */
  static autoIncrement                 

  /*        ----------------------
              setup counter keys          */
  static setIncremental                
  static deleteRowOnZero               

  /*        -----------------------
              triggering counters         */
  static countUp                       
  static countDown                     

__scope = [];
__free  = [];

   //////////////////////////////////////////
  /*              query system
              --------------------
                query validation          */
  static isQueryTerm                 = -0b0;
  static isMultiType;

  static isPredicate;
  static isModifier:

__scope = [];
__free  = [];


  static Id (...inputs) {
    var keys  = [];
    var Types = [],
      exports = this;

    var used;
   /////    ///////////////////////////
    if  (inArrayType.curQueryUsedKeys)
    used=inArrayType.curQueryUsedKeys;
   ////////////////////////////////////

    for (let obj of inputs) {
    switch (typeof obj) {
      case ("string"):
        keys.push(obj);
        break;

      case ("object"):
        if (obj === String
        ||  obj === Number
        ||  obj === BigInt) {
        let shorthand
            = exports.__typeMap.get(obj);

        if (shorthand)
            types.push(shorthand);
        }
        break;
    }}

    if (!types.length)
         Types = [];
  }

  static Namespace = function (...inputs) {

  }  

  static Key = function (...names) {
    var keys = [];
    var Type,
     exports = this;

    for (let key of names) {
     if (typeof key !== "string")
         continue;

     //  check if key name matches type def
     if (!Type
     &&   typeof exports[key] === "function")
          Type = exports[key];

          keys.push(key);
    }
  }

  static Value = function (...val) {
    var vals = [];
    switch (val) {
      let res = inArrayType.evalType();
    }
  }

  static extractObjectSchemaProps (obj, pre) {
    for (let [key,val] of Object.entries(obj)) {
     if () {}
    }
  }

  static String (...schema) {
    var rx;
    var rxArray;

    var isRequired = false;

    for (let obj of schema) {
    if (typeof obj === "object")
    switch (obj.constructor.name) {
      case ("RegExp"):
        rx = obj;
        continue;

      case ("Array"):
        if (res = this.regexSlotArray(obj)) 
             rx = res;
        if ()

      case ("Object"):
        if 

      case ("object"):
        if (obj.constructor.name === "Array") {
        if (res = this.regexSlotArray(obj)) 
             rx = res;

        if (
        &&  obj.length % 2 === 0)
        }
    }
    else
    if (typeof obj === "boolean")
        isRequired = obj;
    }
  }

  static trimFn (str) {
    return str.trim();
  }

  static JSON () {

  }


  static extractInputs (inputs) {
    var rx;
    var rxArray;

    var numericArray1;
    var numericArray2;
  }

  static numericArray (enumLiteral) {
    try {
      return enumLiteral.every(num =>
                        typeof num == "number");
    } catch (e) { throw e }
  }

  static regexSlotArray (enumLiteral) {
    try {
     if (enumLiteral.every(elem =>
                    typeof elem === "boolean"
                 || typeof elem === "object"
                 &&        elem.constructor.name
                                === "RegExp"))
         return [void -0b01, ...enumLiteral];
    } catch (e) { throw e }
  }


  [
    void function numOpcode(){},
    lowerBound, [max, min, ...], upperBound,
    rx, fn, ![], !![],
    autoVal
  ];

  [
    void function strOpcode(){},
    minLen, maxLen,
    rx, fn, ![], !![],
    autoVal
  ];

  [
    void function boolean(){},
    !!bool, autoVal,
  ];

  static enumValueType (lit, 
            queryStage=0 || // parse query type
                  void 1 || // query live data
                       0) {
    var res;
    //  test for timestamp in string
    if (typeof lit === "string")  {
    if (res = this.dateType(lit)) {
        return void -0b01;
    }
    else
    //  test for number operator
    if (lit.length === 2
    ||  lit.length === 3
    &&  res === this.numberOperator(lit,
                             queryStage))
        return res;
    }

    //  check literal for value type
    if (typeof lit !==   "object"
    &&  typeof lit !== "function") {
       (res = this.literalValueType(lit))
        return res;
    }

    //  determine function type 
    if (typeof lit === "function") {
       (res = this.functionType(lit))
        return res;
    }

    //  regex defined string/numeric slots
    if (lit.constructor.name === "RegExp"
    &&  res = this.regexStringSlotType(literal)
    ||  res = this.regexNumericSlotType(literal)
    ||  res = this.regexSlot(literal)) {
    //  reduce slot type by parsing source regex
        return res;
    }

    if ( typeof lit[0] !== "undefined") {
    if ((typeof lit[0]           === "object"
    //  !typeof lit[0]           === "number"
    &&   lit[0].constructor.name === "RegExp")
    ||  (typeof lit[1]           === "object"
    //  !typeof lit[0]           === "boolean"
    &&   lit[1].constructor.name === "RegExp")
    ||  (typeof lit[2]           === "object"
    &&   lit[2].constructor.name === "RegExp")
    &&   res = this.regexSlotArray(lit))
    //   match regex slot array
         return res;
    }
   
    //  determine object type 
    if (res = this.dateType(lit,   crossOrigin)
    ||  res = this.errorType(lit,  crossOrigin)
    ||  res = this.objectType(lit, crossOrigin))
        return res;
  }

   ////////////////////////////////
  //  evaluate numeric operators
  static numericOperator (enumLiteral,
                           queryStage) {
    //  parse query type
    if (queryStage === 0)
    switch (enumLiteral) {

        ////////////////////////////////
       // ---------------------------
      //   ascending row id number
     // ---------------------------

      case ("+++"):
        //  autoIncrement
            return [this.autoIncrement];

        ////////////////////////////////
       // ---------------------------
      //     setup counter slots
     // ---------------------------

      case ("==="):
        //  setIncremental
            return [this.setIncremental];

      case ("---"):
        //  deleteRowOnZero (setIncremental)
            return [this.deleteRowOnZero];
    }
    else
    //  query live data
    if (queryStage === 1)
    switch (enumLiteral) {

        ////////////////////////////////
       // ---------------------------
      //     triggering counters 
     // ---------------------------

      case ("++"):
        //  increaseByOne
            return [this.countUp];

      case ("--"):
        //  decreaseByOne
            return [this.countDown];
    }
  }

  static literalValueType (enumLiteral) {
    switch (typeof enumLiteral) {

        /////////////////////////////////////
       // --------------------------------
      //   determine literal value type
     // --------------------------------

      case ("string"):
            return [this.string];

      case ("number"):
            return [this.number];

      case ("boolean"):
            return [this.boolean];

      case ("symbol"):
            return [this.symbol];
    }
  }

  static functionType (enumLiteral) {
    try {

      ///////////////////////////////
     // --------------------------
    //    function
   // --------------------------

    let proto
      = enumLiteral.prototype;

    if (typeof proto !== "object")
    switch (proto.constructor.name) {
      case ("Function"):
        return [
          this.function, enumLiteral
                        .constructor.name,
        ];

      case ("Object"):
        return [this.json];

      case ("Array"):
        return [this.array];

      case ("String"):
        return [this.string];

      case ("Number"):
        return [this.number];

      case ("Symbol"):
        return [this.symbol];

      case ("Error"):
        return [this.error];

      case ("Map"):
      case ("WeakMap"):
        return [
          this.map, proto.constructor.name,
        ];

      case ("Set"):
      case ("WeakSet"):
        return [
          this.set, proto.constructor.name,
        ];

      default:
        let clsName
            = proto.constructor.name;

        if (clsName.includes("Date")
        ||  clsName.includes("date"))
        //  date class
        return [
          this.date, clsName,
        ];

        if (clsName.includes("Error")
        ||  clsName.includes("error"))
        return [
          this.error, clsName,
        ];

        //  class module/component
        return [
          this.class, proto.constructor.name,
        ];
    }
    else
    if (typeof enumLiteral === "function")
    //  arrow fn
        return [
          this.function, enumLiteral
                        .constructor.name,
        ];

    } catch (e) { throw e }
  }

  static objectType (enumLiteral) {

      ///////////////////////////////
     // --------------------------
    //    object
   // --------------------------

  }

  static dateType (enumLiteral) {

      ///////////////////////////////
     // --------------------------
    //      date time object
   // --------------------------

    switch (typeof enumLiteral) {
      case ("object"):
        //  missing i18n modules data
        let clsName = enumLiteral
                     .constructor.name;
        if (clsName === "Date"
        ||  clsName.includes("Date")
        ||  clsName.includes("date"))
            return [enumLiteral;

      case ("string"):
        //  missing format data
        let date = new Date(enumLiteral);
        if (date)
            return date;

      case ("number"):
        //  missing epoch data
        let date = new Date(enumLiteral);
        if (date)
            return date;
    }

   /// missing signals: timezone and DST
  }

  static errorType (enumLiteral) {
    try {
    let clsName = enumLiteral
                 .constructor.name;
    if (clsName === "Error"
    ||  clsName.includes("Error")
    ||  clsName.includes("error"))
        return enumLiteral;

    } catch (e) { throw e }
  }

  static regexSlot (rx) {
    if (typeof rx === "object"
    &&         rx.constructor.name === "RegExp")
        return;
  }

  static regexStringSlotType (enumRx) {
    try {              enumRx=enumRx.source;

      //////////////////////////////////////////
     // -------------------------------------
    //   reduce regular expression to type
   // -------------------------------------
    var matchType, bfr;

     ///////////////////////////
    //  string slot multiline
    const formalStringSlot = [
          /^\^?(?:\\s)*\.(\*|\+)(?:\\s)*$/,
          /^\^?\(\??\:?(?:\.\\s|\\s\.)\)(\?|\*|\+|\{[0-9]+\,?[0-9]*})$/,
    ];

    for (let re of formalStringSlot) {
         matchType = re.exec(enumRx);
     if (matchType === null)
         continue;

     switch (matchType[1]) {
       case ("*"):
         //  slotAny multiline
             return;

       case ("+"):
         //  slotNonEmpty multiline
             return;

       case ("?"):
         //  get length boundary: 1 char
             return [, 1, 1];

       default:
         //  get length boundary
         bfr=match[1].split(",");
         if (bfr.length === 1)
             return [, bfr[0], bfr[0]];

             else
             return [, bfr[0], bfr[1]];
    }}

     ////////////////////////
    //  string slot inline
    const formalStringSlotInline = [
          /^\^?\.(\?|\*|\+|\{[0-9]+\,?[0-9]*})\$$/,
    ];

    for (let re of formalStringSlotInline) {
         matchType = re.exec(enumRx);
     if (matchType === null)
         continue;

     switch (matchType[1]) {
       case ("*"):
         //  slotAny inline
             return;

       case ("+"):
         //  slotNonEmpty inline
             return;

       case ("?"):
         //  get length boundary: 1 char
             return [, 1, 1];

       default:
         //  get length boundary
         bfr=match[1].split(",");
         if (bfr.length === 1)
             return [, bfr[0], bfr[0]];

             else
             return [, bfr[0], bfr[1]];
      }
    }} catch (e) { throw e }
  }

  static regexNumericSlotType (enumRx) {
    try {               enumRx=enumRx.source;

      //////////////////////////////////////////
     // -------------------------------------
    //   reduce regular expression to type
   // -------------------------------------
    var matchType, bfr;

    const formalNumericSlotExcludeRule
        = /\\[\^\$\[\]\{\}\(\(\<\>\:\?\!\*\#\|]/;

     ///////////////////////////
    //  numeric slot (formal)
    const formalNumericSlot = [
          /^\^?(?:\\d|\[0-9\])(\?|\*|\+|\{[0-9]+\,[0-9]*})\$?$/,
          /^\^?(?:\\d|\[([+-\.,\e^](?:\d|0-9)[+-\.,\e^])])\$?$/,
    ];

    for (let [i, re] of formalStringSlot.entries()) {
             matchType = re.exec(enumRx);
         if (matchType === null) continue;
         if (formalStringSlotExcludeRule
            .test(enumRx))       continue;

     switch (matchType) {
       case (null):
             continue;

       case ("*"):
         //  slotAny inline
             return;

       case ("+"):
         //  slotNonEmpty inline
             return;
    }}

      ////////////////////////////////////
     // numeric slot with denomination
    /*  extract metric units or currency */
    const formalNumericSlotDenominated = [
          /^\^?([\S\D])*[0-9]+(?:(?:(?<d>\.)|(?<c>\,)))*\$?$/,
    ];

     //
    // ...

    } catch (e) { throw e }
  }

  static regexSlotArray (enumLiteral) {
    if (typeof enumLiteral !== "object"
    ||         enumLiteral
              .constructor.name !== "Array")
        return;

    if (enumLiteral.every(elem =>
                   typeof elem === "boolean"
                || typeof elem === "object"
                &&        elem.constructor.name
                               === "RegExp"))
        return [void -0b01, ...enumLiteral];
  }

  static evalRegexArray (val, array,
                         positiveMatchAll=false) {
    var boolSign=true;
   /////
    let returnOnFirstMatch
     = !positiveMatchAll;

    if (typeof val !== "string") {
    if (typeof val === "number") 
               val = `${val}`;
         else
        return;
    }

    var res, term, bfr, i=0, len=array.length;
   /////
    for (let term of array) {
    switch (typeof term) {
      case ("boolean"):
        boolSign = term;
        break;

      case ("object"):
        if (term.constructor.name !== "RegExp")
        continue;

        if (!boolSign) {
        if (val.match(term))
            return;
          //////////
        }

        if ((bfr = val.match(term)) === null) {
        if  (returnOnFirstMatch
        ||   positiveMatchAll && (i === len))
             return;
        }
        else res=bfr;
    } (i=i+1) }
  ///////////////
    return res;
  }


  // ------------------------------------------
 //
/*     Shorthand bindings for built-in types
                                              
 */// -----------------------------------------
  static NativeTypeMap = new Map([
 [Object,  [inArrayType.JSON]],
 [Array,    true],
 [Date,     true],
 [Number,   true],
 [String,   true],
 [RegExp,   true],
 [Boolean,  true],
 [Function, true]]);

    ////////////////////////////////////////////
   //  get exported inArrayType wrapper enum
  /*
       1,2        type definition
        3          requirementFn
        4          requirementRx
        5          transformerFn
  ///                                         */
  static getFnClass (constructorFn,
                     requirementFn,
                     transformerFn) {
    if (typeof arguments[0] !== "function"
    &&  typeof arguments[0] !==  "object")
    return;

    var TYPE_ENUM;
    let TYPE_CLASS
      =  arguments[0] instanceof Array &&
         arguments[0]     ||
         arguments[0].TYPE_CLASS;

       /////////////////////////////////////////
      // ------------------------------------
     //    dense disposition: wrapper enum
    // ------------------------------------

    if (typeof TYPE_CLASS !== "object")   {
    if (typeof constructorFn === "function") {
        typeObjNative
      = NativeTypeMap.get(constructorFn);

    if (typeObjNative === true
    ||  typeObjNative === undefined)
        return 1;

         else
        return 2;
    }
    else
    if (typeof transformerFn === "function")
        return 5;

    if (typeof requirementFn === "function")
        return 3;

    if (typeof requirementFn === "object"
    &&         requirementFn instanceof RegExp
    ||  typeof arguments[0]  === "object"
    &&         arguments[0]  instanceof RegExp)
        return 4;
    }
    else
    if (TYPE_CLASS instanceof Array) {
        TYPE_ENUM
      = TYPE_CLASS[0];

       /////////////////////////////////////////
      // ------------------------------------
     //   type class stored at each object
    // ------------------------------------

    switch (TYPE_ENUM) {
      case (1):
      case (2):
        //  type definition
       let {2:opCode,5:typeObjNative}=TYPE_CLASS
        if (typeof TYPE_CLASS[1] === "string"
        &&  typeof        opCode === "number"
        &&  typeof TYPE_CLASS[3] === "function"
        &&  typeof TYPE_CLASS[4] === "function") {
       ////
        if (2 === (TYPE_ENUM)
        &&  typeof typeObjNative === "function")
            return opcodeTypeMap.at((opCode))
                && NativeTypeMap.get(typeObjNative)
                && TYPE_CLASS;

             else
            return TYPE_CLASS;
        }
        break;

      case (3):
      case (5):
        //  requirementFn
        //  transformerFn
        if (typeof TYPE_CLASS[1] === "string"
        &&  typeof TYPE_CLASS[3] === "function"
        &&        !TYPE_CLASS[4]) {
            return TYPE_CLASS;
        }
        break;

      case (4):
        //  requirementRx
        if (typeof TYPE_CLASS[1] === "string"
        &&  typeof TYPE_CLASS[3] === "object"
        &&        !TYPE_CLASS[4]) {
            return TYPE_CLASS;
        }
        break;
    }}}
  }

 /////////////////////////////////////////////
/* Example: pick() to query subtrees & types

   const pick.ownPropertyList = {
         traverseQueryArray,
         traverseQueryObject,
         traverseQueryFunction,
        ///
         inspectQueryObjectSchema,
         inspectQueryArraySchema,
        ///
         reduceQueryObjectType,
         reduceObjectPrimitive,
         makePathUpdateFn,
        ///
         resolvePath,
         filterByClassObject,
         filterByClassInstance,
         filterByValueType,
        ///
         parseEntries,
         traverseIn,
        ///
         getConfig, err,
         wrapRemapMethod
   };

   Think: schema definition is array predicate
          -----------------    ---------------
                            
                            STATIC_ARRAY_ORDER
                            ONE_OF, MULTI_TYPE
                             CONDITION_STRUCTS
  
    Multiple types (on array index)
    { 0: [String, Number, Array] }

    Multiple types, cross-origin
    { c: [["String"], ["Array"]] }

    One type, cross-origin
    { c: ["ArrayWrapper"] }

    Pick objects of given class, if ...
    { c: ["Object", [] || {} || ()=>{}] }
      …   "Object": key or constructor name?

    Compare arrays (static array order flag)
    { a: [ String, Number, Array,
            STATIC_ARRAY_ORDER ] }

 …  when is there absolutely no good reason
    { o: ["key1", []] }
    { b: ["key2", {}] }

    { path: ["key1", ]}

 */
}

class sourceInterface {
  static interfaces=[];

  constructor (ref) {
    var exists;

     ////////////////////////
    //  in-memory document
    if (typeof ref === "object") {
    if (exists
     =  sourceInterface.interfaces.find(src =>
                                ref === src[0]))
        return exists;
      //////////////////

    if (ref instanceof Object
    ||  ref instanceof Array) {
        this.TYPE = "JSON";
        this.ref  = (ref);

        return this;
      ////////////////
    }

    if (ref instanceof Element
    ||  ref instanceof Document) {
    if (ref.querySelector)
    this.TYPE = "XML",
    this.ref  = (ref);

    else
    if (ref.content instanceof DocumentFragment)
    this.TYPE = "XML",
    this.ref  = (ref.content);

    else
    if (ref.contentDocument instanceof Document)
    this.TYPE = "XML",
    this.ref  = (ref.contentDocument);

      ///////////////
    }   return this   }
      
     /////////////////////
    //  remote resource
    if (typeof ref === "string"
    && (       ref.substring(0,2) === "./"
    ||         ref.indexOf("://"))) {
    if (exists
     =  sourceInterface.interfaces.find(src =>
                                ref === src[0]))
        return exists;
      //////////////////

    let ext
      = ref.substring(ref.length-5);

    switch (ext) {
      case ("json"):
        this.URI  = ref,
        this.TYPE = "JSON";
        break;

      case ("html"):
        this.URI  = ref,
        this.TYPE = "XML";
        break;

      case (".xml"):
      case (".svg"):
        this.URI  = ref,
        this.TYPE = "XML";
        break;

      default:
        this.apiEndpoint = ref;
        this.call = callAPI.bind(ref);

    }   return this   }
      ///////////////
   else return undefined;
  }
   
   //////////////////////////////////////////
  //  appl. programming interface endpoint
  static callAPI (URI=this, callbackFn) {
  /*
     endpoint URL
     request: get, post, put, delete, ...
     route: query name, cat, pagination
     params: auth, id, cat/tags, pagination
     + cookies & JWT
   */////////////////////////////////////////
   try {
    if (typeof callbackFn !== "function")
        return;

    fetch(URI).then(data => {
    if (typeof data !== "string"
    ||        !data.length)
        return callbackFn(undefined);
    });
    } catch (err) { throw err }
  }

   ////////////////////////////////////
  //  load html or svg image utility
  static loadImage = jsonion &&
                     jsonion.loadImage;

   /////////////////////////////////
  //  load xml and json documents
  static loadRemoteResource (URI, callbackFn,
                             path=null, offset,
                                        length) {
   try {
    if (typeof callbackFn !== "function")
        return;

    fetch(URI).then(doc => {
    if (typeof doc !== "string"
    ||        !doc.length)
        return callbackFn(undefined);

    switch (doc[0]) {
      case ("<"):
        //  XML
        let parser = new DOMParser();
        doc=parser.parseFromString(str,
                  "application/xml");
        let result
          = this.getPathXML(doc, path, offset,
                                       length);
            return callbackFn(result);

      case ("{"):
      case ("["):
        //  JSON
        doc=JSON.parse(doc);

        let result
          = this.getPathJSON(doc, path, offset,
                                        length);
            return callbackFn(result);
    }});
    } catch (err) { throw err }
  }

   ///////////////////////////////////////
  //  retrieve path or offset from json
  static getPathJSON (obj, path=null, offset,
                                      length) {
    if (typeof obj !== "object")
        throw new Error(`Type mismatch: ${typeof obj}`);

    if (typeof offset !== "number")
               offset 
    if (typeof length !== "number")
               length 

    if (!path
    ||  !path.length)
        return obj;

    switch (obj.constructor.name) {
      case ("Object"):
        return traverseObject.call(obj,
                                   path);
      case ("Array"):
        return traverseArray.call(obj,
                               offset, length);
      default:
        throw new Error(`Type mismatch: ${obj.constructor.name}`);
    }

  /////

    function traverseObject (path) {
      let key = path.shift();
      let obj = this[key];

      if (typeof obj !== "object")
          throw new Error(`Type mismatch: ${typeof obj}`);

      else
      if (!path.length)
          return obj;

      else
      switch (obj.constructor.name) {
        case ("Object"):
          return traverseObject.call(obj,
                                     path);
        case ("Array"):
          return traverseArray.call(obj,
                                 offset, length);
        default:
          throw new Error(`Type mismatch: ${obj.constructor.name}`);
      }
    }

    function traverseArray (offset, length) {
      var result=[];

      if (path.length > 0)
          throw new Error(`Path mismatch: ${path}`);
      
      else {
      if (length == -1)
          length = this.length - offset;

      for (let i=offset; i<length; i++) {
           let val = this[i];

       if (typeof val === "undefined"
       &&         val !==  undefined) break;
            else
           result.push(val);
      }}

      return resut;
    }
  }

   //////////////////////////////////////
  //  retrieve path or offset from xml
  static getPathXML (doc, path=null, offset,
                                     length) {
    if (typeof doc !== "object")
         throw new Error(`Type mismatch: ${typeof doc}`);
    if (!doc instanceof Document
    ||  !doc instanceof Element)
         throw new Error(`Type mismatch: ${doc.constructor.name}`);

    if (path === false
    || (typeof offset !== "number"
    &&  typeof length !== "number"))
        return doc;
   /////////////////////////////////////////////

    if (typeof path === "string"
    &&         path.length) {
    if (typeof doc.querySelector === "function")
               doc
             = doc.querySelector(path);
    else
    try {  let el=document.createElement("tag");
               el.appendChild(doc);
               el.children[0]
                 .querySelector(path);
    } catch (e) { throw e }}

   /////////////////////////////////////////////
    if (doc.children.length === 0)
        return undefined;

    if (typeof offset !== "number")
               offset 
         else  offset = Math.trunc(offset);
    if (typeof length !== "number"
    ||         length === -1) {
               length = doc.children.length
                      - offset;
    }

    var result = [];
   /////
    for (let i=offset; i<length; i++) {
     if (typeof doc[i] === "object")
         result.push(doc);

          else
         return result;
       //////////////////
    }    return result;
  }
}

class typedSequence extends ArrayWrapper {
  sourceInterfaces;
  schema;

  constructor (schema,
            ...values) {
         super(values);
       //////////////////

    this.schema
       = schema;

    this.sourceInterfaces
       = sourceInterfaces;

    this[Symbol.iterator]
       = typedSequence
         .varSpreadSyntax
    ||   typedSequence
         .varSpreadSyntaxRemote;
  }

  updatePointers () {}

  setPropertyKey (key, ref, index) {
    if (typeof ref       !== "object"
    || (typeof key       !== "string"
    &&  typeof key       !== "number")
    ||  typeof this[key] !== "undefined") {
        return;
    }

    Object.defineProperty(this, key, {
    get: () => {
      if (typeof this["_"+key] !== "undefined")
          return this["_"+key];

           else
          return ref[index];
    },
    set: () => {

    }});
  }

  static async * varSpreadSyntax(){}
  static async * varSpreadSyntaxRemote(){}

  scope__opcodes=[];
}


  //////////////////////////////////////////////
 //               class exports
///////////////////////////////////////////////

if (typeof module === "object")
           module.exports = {
    inArrayType,
    typedSequence,
    sourceInterface,
};

////////////////////////////////////////////////

function objectAssign (obj, ...assignObjects) {
  var cfg = assignObjects.pop();

  if (typeof cfg === "object")
  var test = Object.keys(cfg), 
    schema = Object.keys({
    synonymObj: null,

    extractVal: null,  filterKeys: null,
       wrapVal: null,  filterVals: null,
      mergeVal: null,    omitKeys: null,
     unlinkVal: null,    omitVals: null,
                       deleteKeys: null,
                       deleteVals: null,
     overwrite: true,
         merge: false,
         clone: false,
  });

  if (typeof cfg     !== "object"
  ||  typeof test[0] !== "string"
  || (typeof test[1] === "string" &&
      schema.indexOf(test[1]) === -1)
  ||  schema.indexOf(test[0]) === -1) {
     ////////
      assignObjects.push(cfg),
      cfg={ overwrite: true };
  }

  if (typeof obj !== "object"
  ||  assignObjects.length === 0) {
      return;
  }

  if (cfg.clone) obj={...obj};

 ///// /////////////////////////////////////////

  let NEW_SCOPE = {
          key_min:
      obj.NEW_KEY_SCOPE_MIN || undefined,

          key_max:
      obj.NEW_KEY_SCOPE_MAX || undefined,

          val_min:
      obj.NEW_VAL_SCOPE_MIN || undefined,

          val_max:
      obj.NEW_VAL_SCOPE_MAX || undefined,
  }, _scopeOf = [["key","val"], ["min","max"]];

 ///// /////////////////////////////////////////

  var synonymObj;
 /////
  if (       cfg.synonymObj
  &&  typeof cfg.synonymObj === "object"
  &&  Object
       .keys(cfg.synonymObj).length) {
                 synonymObj = 
             cfg.synonymObj;
  }

 ///// /////////////////////////////////////////

  var overwrite,
          merge;
 /////
  if (typeof cfg.overwrite !== "boolean")
             var overwrite = true;

  if (typeof cfg.merge !== "boolean")
             var merge = false;

  var extractVal,
         wrapVal,
        mergeVal,
       unlinkVal;
 /////
  if (typeof cfg.extractVal !== "function")
             var extractVal = null;
  
  if (typeof cfg.wrapVal !== "function")
             var wrapVal = null;

  if (typeof cfg.mergeVal !== "function")
             var mergeVal = null;

  if (typeof cfg.unlinkVal !== "function")
             var unlinkVal = null;

 ///// /////////////////////////////////////////

  var filterKeys, omitKeys, deleteKeys,
      filterVals, omitVals, deleteVals;

 /////
  if (cfg.filterKeys instanceof Array)
          filterKeys =
      cfg.filterKeys.filter(str =>
                     typeof str === "string");

      if (filterKeys && !filterKeys.length) 
          filterKeys = undefined;

 /////
  if (cfg.omitKeys instanceof Array)
          omitKeys =
      cfg.omitKeys.filter(str =>   
                   typeof str === "string");

      if (omitKeys && !omitKeys.length)
          omitKeys = undefined;

 /////
  if (cfg.deleteKeys instanceof Array)
          deleteKeys =
      cfg.deleteKeys.filter(str =>
                     typeof str === "string");

      if (deleteKeys && !deleteKeys.length)
          deleteKeys = undefined;

 /////
  if (cfg.filterVals instanceof Array)
          filterVals =
      cfg.filterVals;

      if (filterVals && !filterVals.length)
          filterVals = undefined;

 /////
  if (cfg.omitVals instanceof Array)
          omitVals =
      cfg.omitVals;

      if (omitVals && !omitVals.length)
          omitVals = undefined;

 /////
  if (cfg.deleteVals instanceof Array)
          deleteVals =
      cfg.deleteVals;

      if (deleteVals && !deleteVals.length)
          deleteVals = undefined;

 ///// /////////////////////////////////////////

  if (synonymObj
  &&  synonymObj.__ !== true) {
  const rxDash = /(?<!\\|-)-(?!-)/;   ///   <<<
  for (let [key, obj] of Object
                        .entries(synonymObj)) {
   var strings;
   switch (typeof obj) {
  ////////
    case ("string"):
          strings = obj.split(rxDash);
      if (strings.length >= 2)
          updateSynonymObj(key, strings, null);
          break;

    case ("object"):
      if (!obj instanceof Array) continue;
      var _len,
           len = (obj).length;
           
      for (let i i<len; i++) {
           let val = obj[i];

       if (typeof val === "string")
           strings = val.split(rxDash);
       if (strings.length >= 2)
      _len=updateSynonymObj(key, strings, i+1);
                                     /// syntax
       if (_len)
            len += _len,
              i += _len - 1;
      }

     /////////////////////
  }}  synonymObj.__=true;  }

  function updateSynonymObj (key, strings, i) {
    var bfr=[strings.shift()];
    for (let str of strings) {
         bfr.unshift(bfr[0] + str);
    }
                       /////////////////////////
    if (key === "__") // extract for mix. cat.
      { key = bfr.shift(), i=null }
    
    if  (typeof synonymObj[key] === "string"
    ||   typeof synonymObj[key] === "undefined")
                synonymObj[key]
              = bfr.concat([synonymObj[key]]);
    else
    if (typeof synonymObj[key] === "object"
    &&         synonymObj instanceof Array) {
    if (!i)     synonymObj
              = synonymObj[key].concat(bfr);

    else return synonymObj.splice(i-1,1,...bfr)
             && bfr.length - 1;
  }}

 ///// /////////////////////////////////////////

  if (!synonymObj
 ////
  &&   overwrite
  &&  !merge
 ////
  &&  !extractVal
  &&  !wrapVal
  &&  !mergeVal
  &&  !unlinkVal
 ////
  &&  !filterKeys
  &&  !filterVals
  &&  !omitKeys
  &&  !omitVals
  &&  !deleteKeys
  &&  !deleteVals)
       Object.assign(obj, ...assignObjects);

 ////// ////////////////////////////////////////
  else {

  if (deleteKeys) {
  if (!omitKeys)
       omitKeys = deleteKeys;
  else omitKeys = 
       omitKeys.concat(deleteKeys);
  }

  if (deleteVals) {
  if (!omitVals)
       omitVals = deleteKeys;
  else omitVals =
       omitVals.concat(deleteVals);
  }

  for (let assignObj of assignObjects) {
 ///// /////////////////////////////////////////
  for (var [key, val] of Object
                        .entries(assignObj)) {
   if (extractVal)
   val=extractVal(val);
      ////////////

   if (filterVals
   &&  filterVals.indexOf(val) === -1) {
       continue;
   }  /////////// //////////////////////////////

   if (omitVals
   &&  omitVals.indexOf(val) !== -1) {
       continue;
   }  /////////// //////////////////////////////

   setValue(obj, key, val);

   var synset=synonymObj[key],
       synonym;
  /////
   if (typeof synset !== "undefined") {
   if (synset instanceof Array)
   for (synonym of synset) {
    if (filterKeys
    &&  filterKeys.indexOf(synonym) === -1) {
        continue;
    }  /////////// /////////////////////////////

    if (omitKeys
    &&  omitKeys.indexOf(synonym) !== -1) {
        continue;
    }  /////////// /////////////////////////////

    setValue(obj, synonym, val);
   }
   else
   if (typeof synset === "string") {
      synonym=synset;

   if (filterKeys
   &&  filterKeys.indexOf(synonym) === -1) {
       continue;
   }  /////////// //////////////////////////////

   if (omitKeys
   &&  omitKeys.indexOf(synonym) !== -1) {
       continue;
   }  /////////// //////////////////////////////

   setValue(obj, synonym, val);
  }}}}

  function setValue (obj, key, val) {
    var res;
    if (mergeVal)
    res=mergeVal(obj, key, val);
     
    else if (overwrite
         ||  typeof obj[key] === "undefined"
         ||         obj[key] === null)
     switch (!!wrapVal) {
       case (true):
         if ((res = wrapVal(val)) !== undefined
         ||               ((val)) === undefined)
                /////
              res = true;
                   break;

       case (false):
         obj[key] = val,
                /////
              res = true;
                   break;
    }
    else if (merge) {
         if (obj[key] instanceof Array)
             obj[key].push(val);

             else
             obj[key] = [obj[key], val];
                    /////
                  res = true;
    }

    //  optionally, get added value scope
    if (res === true && NEW_SCOPE)
    for (let varName of _scopeOf[0]) {
     if (typeof eval(varName) !== "string"
     &&  typeof eval(varName) !== "number")
         continue;

    for (let minMax of _scopeOf[1]) {
     if (undefined
     === NEW_SCOPE[`${varName}_${minMax}`]) {
         NEW_SCOPE[`${varName}_${minMax}`]=val;
     }
     else {
     if (typeof val === "string"
     &&  typeof val !== typeof
         NEW_SCOPE[`${varName}_${minMax}`])
         NEW_SCOPE[`${varName}_${minMax}`] =
      `${NEW_SCOPE[`${varName}_${minMax}`]}`;

     else
     switch (minMax) {
       case ("min"):
         if (NEW_SCOPE[`${varName}_min`] > val)
             NEW_SCOPE[`${varName}_min`] = val;
             break;

       case ("max"):
         if (NEW_SCOPE[`${varName}_max`] < val)
             NEW_SCOPE[`${varName}_max`] = val;
             break;
    }}}}
  }

 ///// /////////////////////////////////////////

  if (deleteVals)
  for (let [key, val] of Object
                        .entries(obj)) {
   if (deleteKeys
   &&  deleteKeys.indexOf(key) !== -1) {
       delete obj[key];
       continue;
   }

   if (unlinkVal
   &&  unlinkVal(obj, key, val)) {
       continue;
   }

   switch (val instanceof Array) {
     case (true):
      for (let i=val.length-1; i> i--) {
       if (deleteVals.indexOf(val[i]) !== -1)
        val.splice(i, 1);
      }

     case (false):
       if (deleteVals.indexOf(val) !== -1)
           delete obj[key];
  }}

 ///// /////////////////////////////////////////

  else
  if (deleteKeys)
  for (let key of deleteKeys) {
   if (typeof obj[key] !== "undefined")
       delete obj[key];
  }}

 ///// /////////////////////////////////////////

  if (typeof NEW_SCOPE.key_min !== "undefined"
  &&  typeof NEW_SCOPE.val_min !== "undefined") {
         obj.KEY_SCOPE_MIN = NEW_SCOPE.key_min;
         obj.KEY_SCOPE_MAX = NEW_SCOPE.key_max;
         obj.VAL_SCOPE_MIN = NEW_SCOPE.val_min;
         obj.VAL_SCOPE_MAX = NEW_SCOPE.val_max;
  }
 
 /////////////
  return obj;
}
