if (typeof require === "function") {
if (typeof ArrayWrapper === "undefined")
       var ArrayWrapper = require("./ArrayWrapper.js");
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


class CustomType extends inArrayType {
  static determineFnClass() {
    return [1, "CustomType", this.constructorFn,
                             this.validatorFn,
                             undefined || Object];
  }

  static constructorFn(){}
  static validatorFn(){}

}


 ///////////////////////////////////////////////
// type, requirement, transformer, flag, getter
class inArrayType extends Array {
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
      /// assign .priority rank to reqs

  static synonymsTransformersAll = new Object({
    autoVal:['autoValue','default'],
     trimFn:['trim'],
  });

  static transformerRenderPriorityDefault
      /// assign .priority rank to transforms

  static synonymsFlags = new Object({
  __array:['fullMatch','matchArray',
           'staticArrayOrder',
            'fixedArrayOrder'],

  __allOf:['matchAll',
   'allOf'],

  __anyOf:['partialMatch','match','matchAny',
   'anyOf','pick','__pick'],

  __oneOf:['matchType','firstArrayMatch',
   'oneOf','find','__find'],

  __index:['makeIndex','indexKey',
   'index','makeIndexEntry'],
  });

   ////////////////////////////////
  // flag: opcode | default (orly?)
  static __array; __array = true;
  static __allOf; __allOf = false;
  static __anyOf; __anyOf = false;
  static __oneOf; __oneOf = false;
  static __index; __index = false;

   ////////////////////////////////////////////
  //  runtime register of operators in array
  static registerOperator (TYPE_CLASS) {
    if (TYPE_CLASS instanceof Array) {
    var opCode    = TYPE_CLASS[1];
    var TYPE_ENUM = TYPE_CLASS[0];

    if (typeof TYPE_ENUM === "number"
    &&         TYPE_ENUM  >=  1
    &&         TYPE_ENUM  <=  7
    &&  typeof opCode === "number"
    &&  !opcodeTypeMap[TYPE_ENUM][opCode])
         opcodeTypeMap[TYPE_ENUM][opCode]
                            = TYPE_CLASS;
    }
  }

  static opcodeTypeMap = {
 //////////////////////// 
    1: {}, 2: {},     // - type definition
    3: {}, 4: {},    //  - requirement
    5: {},          //   - transformer
    6: {},         //    - flag
    7: {},        //     - getter
  };             /* … TYPE_ENUM categories */

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
          flagOperator:
     this.flagOperator,
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

    ////////////////////////////////////
   //  top-level inArrayType endpoint
  /*

   1)  export uniform TYPE_CLASS wrapper
   2)  construct schema definition in array

  ///                                      */
  constructor() {
    var Name, TYPE_CLASS;

    ////////////////////////////////////////////
   /////   exporting schema definition    /////
    if (typeof arguments[0] === "string") {
    var Name = arguments[0];
   /////
    var TYPE_CLASS,
        NativeType;

       /////////////////////////////////////////
      // ------------------------------------
     //       main inArrayType library
    // ------------------------------------

    if (this.constructor === inArrayType) {
        TYPE_CLASS
      = inArrayType.determineFnClass(Name);

    }
    else

       /////////////////////////////////////////
      // ------------------------------------
     //           class extension
    // ------------------------------------

    //  schema definition extends main class
    if (this.determineFnClass) {
        TYPE_CLASS
      = this.determineFnClass(Name);

    }
    else
    //  schema definition by lib nomenclature
    if (this.constructor.determineFnClass) {
        TYPE_CLASS
      = this.constructor.determineFnClass(Name);

    }{
        let NativeType
         =  TYPE_CLASS[5];

        if (NativeType)
            return [ TYPE_CLASS, NativeType ];

             else
            return [ TYPE_CLASS, undefined  ];
    }} /*///////////////////////////////////////


                    •     •     •


   *////////////////////////////////////////////
   /////    invoking schema definition    /////
    if (typeof arguments[0] === "object"
    &&         arguments[0] instanceof Array) {
    TYPE_CLASS=arguments[0];

    if (inArrayType.getFnClass(TYPE_CLASS))
               return super(...TYPE_CLASS);

  }}

    ////////////////////////////////////////////
   //  enumerate schema definition to export
  /*
       1,2               Type
        3            requirement
        4            requirementRx
        5            transformerFn
        6                flag
        7              GetterFn
  ///                                         */
  static determineFnClass (Name="", CLS=this) {
    var TYPE_CLASS;

    if (typeof arguments[0] === "string") {
    const chrx=/(?:([A-Z])|([a-z])|(_))/;
    const opcodeTypeMap = this.opcodeTypeMap ||
                         (this.opcodeTypeMap={})
    const NativeTypeMap = this.NativeTypeMap ||
                         (this.NativeTypeMap
    /***  register synonym  ***/   = new Map());
   ////////////////////////////

    var name, typeObjNative, __name,
      opCode, constructorFn, __function1__,
                validatorFn,

              requirementRx,
    priority, requirementFn, __function2__,
              transformerFn;

       /////////////////////////////////////////
      // ------------------------------------
     //   schema definition by nomenclature
    // ------------------------------------

       [ Name,
         name,
       __name ]=inArrayType
               .resolveNativeType(arguments[0]);

    if (!Name) {
         Name = arguments[0];

    if (chrx = chrx.exec(Name)) {
    //  function type 1
    if (chrx[1])
        name = Name[0].toLowerCase()
             + Name.substring(1);
    else
    //  function type 2
    if (chrx[2])
        name = Name,
        Name = name[0].toUpperCase()
             + name.substring(1);
    else
    if (chrx[3])
        name = Name,
        Name = undefined;

        else {   return   }
    }}          ////////
    try
  { typeObjNative = eval(Name) } catch(e){/*…*/}

    __function1__ = CLS[ Name ];
    __function2__ = CLS[ name ];
                                            ////
    ///--/// fast track //////////////////////
       if (__function1__.TYPE_CLASS
                         instanceof Array)
    return __function1__.TYPE_CLASS;
       if (__function2__.TYPE_CLASS
                         instanceof Array)
    return __function2__.TYPE_CLASS;

       if (__function2__ === true
       ||  __function2__ === false
       && (__function2__  =  CLS[ `${name}_` ])
             instanceof Array)
    return __function2__; /////////////////////
    ///////////////////////                 ////

    constructorFn = __function1__   &&
     (validatorFn = CLS[ `${name}_` ]);

           opCode =   /////////////////////////
                     /*  shared namespaces
                         -----------------  */
    transformerFn =
    requirementFn =
    requirementRx =

             flag = __function2__;

         getterFn = __function1__;

    /*//////////////////////////////////////////


                    •     •     •


      */////////////////////////////////////////
      // ------------------------------------
     //    type definition (and natives)
    // ------------------------------------

    if (typeof opCode         ===  "number"
    &&  typeof constructorFn  === "function"
    &&  typeof   validatorFn  === "function") {
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
                             TYPE_CLASS);
    }

    if (!constructorFn.TYPE_CLASS
                       instanceof Array
    ||    !validatorFn.TYPE_CLASS
                       instanceof Array)
         constructorFn.TYPE_CLASS
                     = TYPE_CLASS,
           validatorFn.TYPE_CLASS
                     = TYPE_CLASS;
    }
    else
    if (!__function1__) {

       /////////////////////////////////////////
      // ------------------------------------
     //     transformerFn and priority
    // ------------------------------------

    if (name.endsWith("Fn")
    &&  typeof transformerFn === "function") {
        priority = transformerFn.priority;
        priority = (Number.isInteger(priority))
    &&  priority
    ||  this.transformerRenderPriorityDefault
    || -1;

    TYPE_CLASS
  = [5, name, transformerFn, priority];

    if (!transformerFn.TYPE_CLASS
                       instanceof Array)
         transformerFn.TYPE_CLASS
                     = TYPE_CLASS;
    }
    else

       /////////////////////////////////////////
      // ------------------------------------
     //    requirement validator method
    // ------------------------------------

    if (typeof requirementFn === "function"
    || (typeof requirementRx === "object"
    &&         requirementRx instanceof RegExp)) {
    let requirement
     =  requirementFn || requirementRx;

        priority = requirement.priority;
        priority = (Number.isInteger(priority))
    &&  priority
    ||  this.requirementRenderPriorityDefault
    || -2;

    TYPE_CLASS
  = [3, name, requirement, priority];

    if (!requirement.TYPE_CLASS
                     instanceof Array)
         requirement.TYPE_CLASS
                   = TYPE_CLASS;
    }
    else

       /////////////////////////////////////////
      // ------------------------------------
     //      flags to query interpreter
    // ------------------------------------

    if (typeof flag === "boolean"
    ||  typeof flag === "number") {

    TYPE_CLASS
  = [6, name, (flag)];

    if (!this[ `${name}_` ] instanceof Array)
         this[ `${name}_` ] = TYPE_CLASS;
    }}
    else

       /////////////////////////////////////////
      // ------------------------------------
     //           GetterFn
    // ------------------------------------

    if (typeof getterFn === "function") {

    TYPE_CLASS
  = [7, Name, (getterFn)];

    } /*////////////////////////////////////////
  

                    •     •     •


    *///////////////////////////////////////////
    //  fast-track TYPE_CLASS for runtime 
    if (typeof opCode === "number"
    &&  !opcodeTypeMap[TYPE_CLASS[0]][opCode])
         opcodeTypeMap[TYPE_CLASS[0]][opCode]
                     = TYPE_CLASS;

    if    (TYPE_CLASS)
    return TYPE_CLASS;
        /*/////////////*/

    else
    console.trace(`inArrayType ${
                    arguments[0]} misconfig`);
  }}

   /////////////////////////////////////////////
  //  single type schema with fn input params
  static bindExports (TYPE_CLASS, exports) {
                 /* ˇ */
    let TYPE_ENUM   =   TYPE_CLASS[0];
   /////
    if (!Number.isInteger(TYPE_ENUM))
    return;

     ///////////////////////////////////////////
    //  type, requirement            (wrapper)
    if (TYPE_ENUM >= (1) && (3) >= TYPE_CLASS)
    bindSchemaDefinition
  = function inArrayTypeWrapper (...params) {
      return inArrayType
            .categorizeSchemaInputs(TYPE_CLASS,
                                        params);
    }
    else

     ///////////////////////////////////////////
    //  requirement, transform, flag (wrapper)
    if (TYPE_ENUM >= (4) && (6) >= TYPE_CLASS)
    bindSchemaDefinition
  = function inArrayTypeWrapper (...params) {
      return inArrayType
            .categorizeSchemaInputs(TYPE_CLASS,
                                        params);
    }

    return bindSchemaDefinition;
  }

    ///////////////////////////////////////////
   // fn chain predicate schema augmentation
  /*  
      flow description
      ----------------

      inArrayType.export(...typesAndSynonyms)
   1) exporting a schema definition:
      inArrayTypeWrapper method is returned to
      accept "exports" object as bound context
   …  every method in exports object is to be
      assigned as subkey to each every other fn
  
      exports[type](...inputs)
   2) triggering a schema definition:
      inArrayTypeWrapper method calls to update
      chain header (categorizing inputs by type)

   …) processing schema inputs (independently):
      inArrayTypeResults method to call each
      type constructor in chain, supplying
      all requirementFns, requirementRxs
      and transformerFns, categorized
      TypeMap object is used to resolve aliases

  ///                                         */
  static bindChainKeys (TYPE_CLASS, exports) {
                 /* ˇ */
    let TYPE_ENUM   =   TYPE_CLASS[0];
   /////
    if (!Number.isInteger(TYPE_ENUM))
    return;

    var schemaDefinitionBind;
  { let wrapTypeDefinitionFn, makeKeyFn,
           wrapRequirementFn,
           wrapTransformerFn; }
         /// symbolic blanks

     ///////////////////////////////////////////
    //  type, requirement            (wrapper)
    if (TYPE_ENUM >= (1) && (3) >= TYPE_CLASS
    ||  TYPE_CLASS.at(2) === inArrayType.Key)
    schemaDefinitionBind
  = function inArrayTypeWrapper (...params) {
      return inArrayType.makeChainedContext
            .call(exports, TYPE_CLASS, params,
                  function inArrayTypeResults() {
                    return this /* … draft */;
    })}
    else

     ///////////////////////////////////////////
    //  requirement, transform, flag (wrapper)
    if (TYPE_ENUM >= (3) && (6) >= TYPE_CLASS)
    schemaDefinitionBind
  = function inArrayTypeWrapper (...params) {
      return inArrayType.makeChainedContext
            .call(exports, TYPE_CLASS, params);
    }

    return schemaDefinitionBind
        || wrapTypeDefinitionFn
        ||    wrapRequirementFn
        ||    wrapTransformerFn  ||  makeKeyFn;
  }

    ////////////////////////////////////////////
   // chain exports (clone all types by all types)
  /*
   -  first callee fn's context comes externally
   -  external exports are cloned upon first use
   -  following types go to updateChainHeader
  
   …  must invoke with .call or .apply and
      set "this" context to exports object
  ///                                         */
  static makeChainedContext (TYPE_CLASS,
                                 params,
                                 wrapFn,
                                 exports=(this)) {
    var test
      = true;

    var chainHead;
   /////
    var Types, requirements, transformers;
    var TypeMap; /// get fn keys after alias

    //   test for chain header format
    if  (!this instanceof Array
    ||   !this.length === 4)
          test = false;
    else [Types, requirements,
                 transformers, TypeMap]
        = this;

    if  (!Types instanceof Array
    ||   !requirements instanceof Array
    ||   !transformers instanceof Array
    ||   !TypeMap instanceof Map)
          test = false;

    //   first method in chain
    if  (test === false) {
    //  attach inputs to header
    chainHead = inArrayType
   .categorizeSchemaInputs.call(this,
                          TYPE_CLASS, params);  

    //  assign exports to chain header
    for (let [TYPE_1, fn_1] of Object
                              .entries(exports)) {
    if  (fn_1 instanceof Function) {
    chainHead[TYPE_1]=fn_1.bind(chainHead);
    for (let [TYPE_2, fn_2] of Object
                              .entries(exports)) {
    if  (fn_2 instanceof Function
    &&   fn_1 !== fn_2)
         chainHead[TYPE_1][TYPE_2]
                = fn_2.bind(chainHead);
    }}}}
    else
    chainHead = inArrayType
   .updateChainHeader.call(this,
                     TYPE_CLASS, params);

 /*////////////////////*/
    return chainHead;
  }

    ////////////////////////////////////////////
   // properties to apply to chained methods
  /*
   -  first callee fn sets chain header
   -  chain header aggregates all chained params
   …  query parser invokes chained types

  ///                                         */
  static updateChainHeader (TYPE_CLASS,
                                params,
                              ///////////
                                header = (this)) {
    let TYPE_ENUM
     =  TYPE_CLASS[0];

    //  process schema params 
    let [Types_, requirements_, transformers_]
     =  inArrayType
       .categorizeSchemaInputs.call(this,
                              TYPE_CLASS,
                                  params);

    //  test for chain header format
    if  (!header instanceof Array
    ||   !header.length === 4)
          header = new Array(4);
    else [Types, requirements,
                 transformers, TypeMap]
        = header;

    //  set chain header variables
    header[0]
  = Types.concat(Types_);

    header[1]
  = requirements.concat(requirements_);

    header[2]
  = transformers.concat(transformers_);

 /*////////////////*/
    return header;
  }

    ////////////////////////////////////////////
   // map requirements and transforms to types
  /*
   -  expect requirements as fns, or in Object
   -  interpret Objects as schema key mappings 
  ///                                         */
  static categorizeSchemaInputs (TYPE_CLASS,
                                     params) {
    var Types=[];
    var requirements=[];
    var transformers=[];

    for (let term of params) {
    switch (typeof term) {
      case ("string"):
      case ("object"):
      case ("boolean"):
      case ("function"):
    }}

    if (       Types.length
    ||  requirements.length
    ||  transformers.length)
    return [Types, requirements,
                   transformers];
  }

   ////////////////////////////////////////////
  //  recognize query types & extract config
  static inspectQueryObjectSchema (object,
                                  _models,
                             staticArrayOrder,
                              firstArrayMatch) {
    if (!object instanceof Object
    ||   !staticArrayOrder instanceof Array
    ||    !firstArrayMatch instanceof Array)
    return;

    var iterator_;
    var iterator = Object
                  .entries(object);
   /////
    var staticOrderRule, staticArrayOrder_;
    var  matchFirstRule,  firstArrayMatch_;

    //  match static array order rule key
    if (typeof staticArrayOrder[0] == "boolean")
               staticArrayOrder_   =
               staticArrayOrder.slice(1);
         else  staticArrayOrder_   =
               inArrayType.synonymsFlags.__array;

    //  match oneOf array enum rule key
    if (typeof firstArrayMatch[0] === "boolean")
               firstArrayMatch_    =
               firstArrayMatch.slice(1);
         else  firstArrayMatch_    =
               inArrayType.synonymsFlags.oneOf;

  /*////////////////////////////////////////////

    static synonymsFlags = new Object({
    __array:['fullMatch','matchArray',
             'staticArrayOrder',
              'fixedArrayOrder'],

    __allOf:['matchAll',
     'allOf'],

    __anyOf:['partialMatch','match','matchAny',
     'anyOf','pick','__pick'],

    __oneOf:['matchType','firstArrayMatch',
     'oneOf','find','__find'],

    __index:['makeIndex','indexKey',
     'index','makeIndexEntry'],
    });

   *////////////////////////////////////////////
  }

   /////////////////////////////////////////////
  //  recognize query types & extract config
  static inspectQueryArraySchema (array,
                                _models,
                              fullMatchOrder,
                             firstMatchOrder,
                            staticMatchOrder) {}

   //////////////////////////////
  //  export type constructors
  static export (...assignTo) {
    var exports={}, makeChainedMethods
                                = true;
    assignTo
  = assignTo.filter(obj =>
             typeof obj === "object"   ||
             typeof obj === "function" ||
            (typeof obj === "boolean"
            (makeChainedMethods = obj) &&
                                false));
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
                                    exports, makeChainedMethods);

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
  static set;                         

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

  /*           ---------------
                 annotations              */
  static highlights
  static annotations

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
  static isQueryTerm;
  static isMultiType;

  static isPredicate;
  static isModifier:

__scope = [];
__free  = [];


  static Id (...params) {
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
      case ("object"):
    }}
  }

  static Namespace = function(){}  

  static Key = function(){}

  static Value = function(){}

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
             continue;

      case ("Object"):
        if () {}
           break;
    }
    else
    if (typeof obj === "boolean")
        isRequired = obj;
    }
  }

  static trimFn (str) {
    return str.trim();
  }

  static JSON(){}

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
    //  test for numeric operator
    if (lit.length === 2
    ||  lit.length === 3
    && (res = this.numericOperator(lit,
                            queryStage))) {
        return res;
    }
    else
    //  test for flag operator
    if (res = this.flagOperator(lit)) 
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
  //  match flag operators
  static flagOperator (enumLiteral) {
    const oneOf;
  }

   ////////////////////////////////
  //  match numeric operators
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

    if (typeof TYPE_CLASS !== "object") {
    if (typeof constructorFn === "function") {
    let typeObjNative
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
    }}
  }

  // ------------------------------------------
 //
/*     Shorthand bindings for built-in types
                                              
 */// -----------------------------------------
  static NativeTypeMap = new Map([
 [Object,   true],
 [Array,    true],
 [Date,     true],
 [Map,      true],
 [Set,      true],
 [WeakMap,  true],
 [WeakSet,  true],
 [Number,   true],
 [String,   true],
 [RegExp,   true],
 [Boolean,  true],
 [Function, true]]);

  static resolveNativeType (name) {
    var Name,
      __name;

    switch (name) {
      case ("RegExp"):
      case ("regexp"):
             name = "regexp";
             Name = "RegExp";
           __name =["RegExp"];
             break;

      case ("regex"):
      case ("Regex"):
             name = "regex";
             Name = "Regex";
           __name =["RegExp"];

      case ("JSON"):
      case ("json"):
             Name = "JSON";
             name = "json";
           __name =["JSON"];
             break;

      case ("Object"):
      case ("object"):
             Name = "Object";
             name = "object";
           __name =["JSON"];
             break;

      case ("WeakSet"):
      case ("weakSet"):
             Name = "WeakSet";
             name = "weakSet";
           __name =["WeakSet","Set"];
             break;

      case ("Weakset"):
      case ("weakset"):
             Name = "Weakset";
             name = "weakset";
           __name =["WeakSet","Set"];
             break;

      case ("WeakMap"):
      case ("weakMap"):
             Name = "WeakMap";
             name = "weakMap";
           __name =["WeakMap","Map"];
             break;

      case ("Weakmap"):
      case ("weakmap"):
             Name = "Weakmap";
             name = "weakmap";
           __name =["WeakMap","Map"];
             break;

      case ("DateTime"):
      case ("dateTime"):
             Name = "DateTime";
             name = "dateTime";
           __name =["Date"];
             break;

      case ("Timestamp"):
      case ("timestamp"):
             Name = "Timestamp";
             name = "timestamp";
           __name =["Date"];
             break;
    }

    if (__name)
    return [Name, name, __name];
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
