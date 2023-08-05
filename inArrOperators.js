  //////////////////////////////////////////////
 //           exports helper methods
///////////////////////////////////////////////

if (typeof module === "object")
           module.exports = {
           objectAssign,
};

////////////////////////////////////////////////


if (typeof jsonion !== "object")
       var jsonion = {};
           jsonion.inArr = {
    asd: true,
    sdf: true,
};

function queryType (typeName) {
  return new Symbol(typeName);
}

/*
  
    inArrTypes.export(["id", "num", "str"]);

    inArr.flyType("TYPE");
    inArr.flyType("TYPE")(db.id,
                          1
                          key(num,
                          12);

    inArr()

 */

setTimeout(() => {
class CustomType extends inArrayType {
  static determineFnClass() {
    return [1, "CustomType", this.constructorFn,
                             this.validatorFn,
                             undefined || Object];
  }

  static constructorFn(){}
  static validatorFn(){}
}}, 1);


 ///////////////////////////
//  export database types
class inArrayType extends Array {
  static synonymsCustomTypes = new Object({
    
      ///////////////////////
     //  -----------------
    //        . . .

  });

  static synonymsCustomRequirements = new Object({customRequirementTwitterPostBody:
  ['twitterPostLen','twitterPostLength'],
  });

  static synonymsCustomTransformers = new Object({

      ///////////////////////
     //  -----------------
    //        . . .

  });

  static synonymsCustomFlags = new Object({

      ///////////////////////
     //  -----------------
    //        . . .

  });

  static defaultPriorityBoundaryRequirement = 5;
  static defaultPriorityRequirements = 15;
  static defaultPriorityTransformers = 15;

  static customRequirementTwitterPostBody = {
    minLength: 1,
    maxLength: 140,
  };

   //////////////////
  //  flag default
  static __array = true;
  static __allOf = false;
  static __anyOf = false;
  static __oneOf = false;
  static __index = false;

   ////////////////////////////////////////
  //  query modifier slot: boolean
  static formalBooleanSlot
       = /^\/?\^?\(\??\:?(?:(?:true|false)\|?){2}\)\$?\/?$/;

   ///////////////////////////////////////////
  //  query modifier slot: multiline string
  static formalStringSlotMultiline = [
    /^\/?\^?(?:\\s)*\.(\*|\+)(?:\\s)*\$?\/?$/,

    /^\/?\^?\(\??\:?(?:\.\\s|\\s\.)\)(\?|\*|\+|\{[0-9]+\,?[0-9]*})\$?\/?$/,
  ];

   ////////////////////////////////////////
  //  query modifier slot: inline string
  static formalStringSlotInline = [
    /^\/?\^?\.(\?|\*|\+|\{[0-9]+\,?[0-9]*})\$?\/?$/,
  ];

   //////////////////////////////////
  //  query modifier slot: numeric
  static formalNumericSlotExcludeRule
       = /\\[\^\$\[\]\{\}\(\(\<\>\:\?\!\*\#\|]/;

  static formalNumericSlot = [
   false, this.formalNumericSlotExcludeRule,

       1, /^\/?\^?(?:\\d|\[0-9\])(\?|\*|\+|\{[0-9]+\,[0-9]*})\$?\/?$/,

          /^\^?(?:\\d|\[([+-\.,\e^](?:\d|0-9)[+-\.,\e^])])\$?\/?$/,
  ];

  static formalNumericSlotDenominated = [
    /^\/?\^?([\S\D])*\s*[0-9]+(?:(?:(?<d>\.)|(?<c>\,)))*\$?\/?$/,
  ]; /// … extract units of measure & currencies

   /////////////////////////////////////////////
  //  query modifier slot: nativeType definition
  static formalNativeTypeSlot = [
    /^\/?\^?\(*([A-Z][a-z]+)\)*\$?\/?$/,
    /^\/?\^?\(\??\:?((?:[A-Z][a-z]+\|?)+)\)\$?\/?$/,
  ];

   //////////
  //  asdf
  static defineNativeTypeSlot () {

  }


   /////////
  //  creating type
  static defineFlagType (name, opCode, bool=null,
                         TYPE_ENUM=17) {
    var TYPE_CLASS;

    if ( typeof name      !== "string"
    ||   typeof opCode    !== "number"
    ||   typeof TYPE_ENUM !== "number")
       { return }

    if (bool === null)

    TYPE_CLASS
  = [TYPE_ENUM, name, opCode, !!bool];

    return function inArrayTypeWrapper (bool=null) {
    return (bool === null)
        ||  TYPE_CLASS.splice(3,1, !!bool)
        &&  TYPE_CLASS;
  }}

   /////////////////////////////////////////////
  //  extract flags from array or schema object
  static matchFlagTypes (schema,
                         rewriteProps=true) {
    let flags=[],
      rewrite=[];

    if (typeof schema !== "object"
    ||         schema.constructor !== Object
    ||         schema.constructor !== Array)
        return;
      ///////////

    const {
      extractDictionaryMatch,
      synonymsCustomFlags,
      synonymsFlags,
    } = inArrayType;

    var index;
    if (replaceProps)
        replaceProps = [];

   /////////////////////////////////////////////
    function rewriteObject (key, val)
   { rewrite.push([key, val]) }

    function matchFlagInObject (cat, val, key, i) {
     rewrite.push([cat, val]);
       flags.push([cat, val]);
      
       schema[cat] = val;

       if  (replaceProps)
       delete schema[key];
    }

    function matchFlagInArray (cat, val) {
       flags.push([cat, val]);

         ///////////////////////
        //  -----------------
       //        . . .

    } //////////////////////////////////////////

    if (schema instanceof Object) {
    extractDictionaryMatch(schema,
                    synonymsFlags, [matchFlag,
                                    rewriteFn]);

    extractDictionaryMatch(schema,
              synonymsCustomFlags, [matchFlag,
                                    rewriteFn]);
    }
    else
    //  expect flags in array header or footer
    if (schema instanceof Array)  {
    if (replaceProps)
        replaceProps = [];

    var step, stop, _case=1;
    do {
    switch (_case) {
      case (1):   index = 0;
      step=( ) => index ++ ;
      stop=(i) => index < schema.length;
        /*/////*/                 break;
      case (2):   index = schema.length;
      step=( ) => index --  ;
      stop=(i) => index >= 0;
    }

    for (index; stop(index); step()) {
     let prop=schema[index];
     if (typeof prop === "object") {
     let every = Object.entries(prop);

        ///////////////////////
       //  -----------------
      //        . . .

     }
     else
     if (typeof prop === "string") {
     let obj={ [prop]: true };

        ///////////////////////
       //  -----------------
      //        . . .

     }
     else
      break;
    }} while ((_case =_case + 1) < 3) }

   /////////////////////////////////////////////

    if (flags.length) {

      ///////////////////////
     //  -----------------
    //        . . .

    if (replaceProps.length) {

      ///////////////////////
     //  -----------------
    //        . . .

    }}
  }

    ////////////////////////////////////////////
   //  export boundaryRequirement type
  /*
   …   fits any value type
       11            isRequired

   …   fits strings and numbers
       12            regexpTerm   &&  11

       13             minLength,  &&  11
                      maxLength

       15            lowerBound,  &&  11
                     upperBound

       14           (indefinite   &&  15
                    target type)

       16:           isRequired,  &&  11
                     regexpTerm,  &&  12
                      minLength,  &&  13
                      maxLength,
                     lowerBound,  &&  15
                     upperBound
  ///                                         */
  static defineBoundaryRequirementType (name="",
                                        prop,
                                      ////////
                                     isRequired,
                                     regexpTerm,
                                     isInverted,
                                        TYPE =
                                        void 1.
                                     || void 2.
                                     || void 3.
                                     || void 4.
                                     || void 5.
                                     ||      0) {
    let { regexTrim,
         isRegexArray } = (this);     /// ///
   /////                              ``` ```
    if (typeof name !== "string")
    name = ("")
            {}
          /*/\*\
  *///  <::>  <::>
    var TYPE_CLASS;
    var hasStrings, isDiscrete,
        hasFloats;

    var setTypesExternally;
    if (typeof arguments[2] === "function") {
        setTypesExternally
             = arguments[2],
               arguments[2]  =  (undefined);
    }
    
       /////////////////////////////////////////
      // -------------------------------------
     //     isRequired and regex term only
    // -------------------------------------
    if (!prop) {
    TYPE_CLASS = defineTypeClass(name,
                              isRequired,
                              regexpTerm);
    }
    else {

       /////////////////////////////////////////
      // ------------------------------------
     //   Boundaries in array (core object)
    // ------------------------------------    
    var bounds = formatBoundariesArray(prop);
    if (bounds) {

    TYPE_CLASS
    = defineTypeClass(name,
      isRequired, regexpTerm,                 /*
     -----------  ------------              */
    {  minLength, maxLength,                /*
     -----------  ------------            */
      lowerBound, upperBound,             /*
     -------- [*,,*] ---------          */
      isInverted, isDiscrete,
       hasFloats, hasStrings }, bounds);

    }
    else  {

       /////////////////////////////////////////
      // ------------------------------------
     //    Dictionary based schema object
    // ------------------------------------
    var requirements = {};
    var fn;

    if ( prop       instanceof Object)
    var every = Object.entries(prop),
           fn = [requirementType];

    else
    if ( prop       instanceof Array
    &&   prop["_length"]       !== 0
    || ( prop[0]    instanceof Array
    &&   typeof
         prop[0]     ===     "string"
    &&   prop[0].length        === 2
    ||   prop[0].length        === 3
    &&   prop[0][2]            === true))
    var every = prop,
           fn = requirementType;

    else return;
 
   /////////////////////////////////////////
    function requirementType (cat, val) {
      switch (cat) {
      //////
       case ("regex"): 
         return requirements.regexpTerm
                                  = val;
       case ("isRequired"): 
       case ("minLength"): 
       case ("maxLength"): 
       case ("lowerBound"): 
       case ("upperBound"): 
       case ("boundaryRequirement"):
         return requirements[cat] = val;

    }} //////////////////////////////////////

    const {
      extractDictionaryMatch,
      synonymsBoundaryRequirements,
    } = inArrayType;

    extractDictionaryMatch(every,
    synonymsBoundaryRequirements, fn);

    if (typeof requirements
                .isRequired === "boolean"
    &&  typeof   isRequired !== "boolean")
           var { isRequired }=requirements;

    if (typeof requirements
                .regexpTerm === "object"
    &&  typeof   regexpTerm !== "object")
           var { regexpTerm }=requirements;

    var {                                     /*
    -----------------------  -------------- */
                 minLength,
                 maxLength,
                lowerBound,
                upperBound,            /*
    -----------------------  ------- */
       boundaryRequirement:  bounds           /*
    -----------------------  -------------- */
    }=(requirements);

    if (bounds instanceof Array)
    formatBoundariesArray(bounds);

    TYPE_CLASS
    = defineTypeClass(name,
      isRequired, regexpTerm,                 /*
     -----------  ------------              */
    {  minLength, maxLength,                /*
     -----------  ------------            */
      lowerBound, upperBound,             /*
     -------- [*,,*] ---------          */
      isInverted, isDiscrete,
       hasFloats, hasStrings }, bounds);

    }} /////////////////////////////////////////

    if (!TYPE_CLASS)
    return;

    let boundaryRequirement
      = function inArrayTypeWrapper (TYPE=0) {
        if ( TYPE_CLASS[0]  === (14))
        return TYPE_CLASS[0] = (15)
          &&   TYPE_CLASS.splice(4,2)
          &&   TYPE_CLASS;

         else
        return TYPE_CLASS;
    }  ////////////////////

    Object.assign(TYPE_CLASS, {
      defaultPriorityBoundaryRequirement
    });

    Object.assign(boundaryRequirement, {
      defaultPriorityBoundaryRequirement
    });

    return boundaryRequirement;

    /*//////////////////////////////////////////
            ________,,
              / \  \/  \\\  °:.*  `|`|`
           ˘˘˘  **
    //////////////////////////////////////////*/

    function formatBoundariesArray (prop) {
     /////
      if (       prop instanceof Array  ) {
      prop = [...prop];

      if (typeof prop.at(0)  ===  "boolean"
      &&         isRequired  ===  (null))
                 isRequired   =   prop.shift();
      if (typeof prop.at(-1) ===  "boolean"
      &&         isInverted  ===  (null))
                 isInverted   =   prop.pop();

     ///////////////////////////////////////////

      if (      !prop.length
      || (typeof prop[0]     !==  "number"
      &&  typeof prop[0]     !==  "string"
      //
      && (      !prop[0] instanceof Array
      || (typeof prop[0][0]  !==  "number"
      &&  typeof prop[0][0]  !==  "string"))))
          return;

     ///////////////////////////////////////////
    /*   Example: http server error codes

      Informational responses (100 – 199)
      Successful responses    (200 – 299)
      Redirection messages    (300 – 399)
      Client error responses  (400 – 499)
      Server error responses  (500 – 599)

     *//*       try    ...    isInverted: 0 || 1
     
          ///////////////////////////////
         //  
        //   \d, ...[[\d,\d], ...], \d

        GREATEST_LOWER_BOUND = -Infinity
        GREATEST_LOWER_BOUND =  100

      ///  Unknown boundaryRequirement target  */
     ///////////////////////////////////////////
      var len=prop.length, bfr,
                          _len;
     /////
      for (var i=0; i<len; i++) {
      let boundary
        = prop[i];

      switch (typeof boundary) {
        case ("string"):
          hasStrings = true;

             ///////////////////////
            //  -----------------
           //        . . .


        case ("number"):
          if (boundary !== parseFloat(boundary))
          hasFloats = true;

             ///////////////////////
            //  -----------------
           //        . . .


        case (boundary instanceof Array
          && "object"):
          if (isRegexArray(boundary)) {

             ///////////////////////
            //  -----------------
           //        . . .

          }
          else
         _len = boundary.length;
          for (var j=0; j<_len; j++) {

             ///////////////////////
            //  -----------------
           //        . . .

          }
          break;

        default: return;
      }}

      return [prop, isRequired, isInverted,
                     hasFloats, hasStrings,

                                isDiscrete,
                                regexpTerm];
    }}

    /*//////////////////////////////////////////
            ________,,
              / \  \/  \\\  °:.*  `|`|`
           ˘˘˘  **
    //////////////////////////////////////////*/

    function defineTypeClass (name,
    isRequired, regexpTerm,                 /*
   -----------  ------------              */
  {  minLength, maxLength,                /*
   -----------  ------------            */
    lowerBound, upperBound,             /*
   -------- [*,,*] ---------          */
    isInverted, isDiscrete,
     hasFloats, hasStrings }, prop=null) {

    var TYPE_CLASS;
   /////////////////////////////////////////////

    if  (isRequired !== undefined)
        {isRequired = !!isRequired}
    if  (isInverted !== undefined)
        {isInverted = !!isInverted}

    if  ( regexpTerm ) {
       !isRegexArray(regexpTerm)
    &&  (            regexpTerm
        = regexTrim( regexpTerm ))}

    if (typeof maxLength === "number"
    &&  typeof minLength !== "number")
               minLength  =  (0);
    else
    if (typeof minLength === "number"
    &&  typeof maxLength !== "number")
               maxLength  =  (undefined);

    if (typeof lowerBound !== "undefined"
    &&  typeof lowerBound !== "number"
    &&  typeof lowerBound !== "string")
               lowerBound  =  (undefined); 

    if (typeof upperBound !== "undefined"
    &&  typeof upperBound !== "number"
    &&  typeof upperBound !== "string")
               upperBound  =  (undefined);

   /////////////////////////////////////////////

    if (!prop) {
    if ((typeof lowerBound === "number"
    ||   typeof lowerBound === "string")
    ||  (typeof upperBound === "number"
    ||   typeof upperBound === "string")
    //
    &&  (typeof  minLength === "number"
    ||   typeof  maxLength === "number"))
    TYPE = (5);

    else
    if ((typeof lowerBound === "number"
    ||   typeof lowerBound === "string")
    &&  (typeof upperBound === "number"
    ||   typeof upperBound === "string"))
    TYPE = (4);

    else
    if (typeof minLength === "number"
    &&  typeof maxLength === "number")
    TYPE = (3);

    else
    if (typeof regexpTerm === "object")
    TYPE = (2);

    else
    if (typeof isRequired ===  "boolean"
    ||  typeof isRequired === "undefined")
    TYPE = (1);

    if (!setTypesExternally)
    switch (TYPE) {
      case (1):
      TYPE_CLASS
    = [11, name, isRequired];
      break;


      case (2):
      TYPE_CLASS
    = [12, name, isRequired, regexpTerm];
      break;


      case (3):
      TYPE_CLASS
    = [13, name, isRequired, regexpTerm,
                             [minLength,
                              maxLength]];
      break;


      case (4):
      TYPE_CLASS
    = [15, name, isRequired, regexpTerm,
                 isInverted, isDiscrete,
                            [lowerBound,
                             upperBound]];
      break;


      case (5):
      TYPE_CLASS
    = [16, name, isRequired, regexpTerm,
                             [minLength,
                              maxLength],
                 isInverted, isDiscrete,
                            [lowerBound,
                             upperBound]];
      default: return;
    }}
    else
    if (prop instanceof Array) {
    if (!isInverted) isInverted = false;
    if (!isDiscrete) isDiscrete = false;
   ////
    if (!setTypesExternally) {
   ////
    if ((isInverted
    &&  !hasFloats && !hasStrings) 
    ||  (hasFloats ||  hasStrings)) {


        TYPE_CLASS
      = [15, name, isRequired, regexpTerm,
                   isInverted, isDiscrete, prop];


    }   else
        TYPE_CLASS
      = [14, name, isRequired, regexpTerm,
                   isInverted, isDiscrete, prop];


    }}

   /////////////////////////////////////////////
    return !setTypesExternally
        &&     (TYPE_CLASS)
        ||  setTypesExternally(TYPE,
                               arguments[1],
                               arguments[2], {

      minLength, maxLength,                /*
    -----------  ------------            */
     lowerBound, upperBound,             /*
    -------- [*,,*] ---------          */
     isInverted, isDiscrete,
      hasFloats, hasStrings }, arguments[4]);
  }}

  static defineRegexSlot (validatorRx,
                           externalFn=null,
    optimize = {
    rxSlotBoolean: null, rxSlotString: null,
    rxSlotNumeric: null, rxSlotNativeType: null,
  }) {
    const {  regexNativeTypeSlot,
  /*/////*/  regexStringSlotType,
             regexNumericSlotType,
             regexBooleanSlotType  }=this;

    if (typeof externalFn !== "function")
               externalFn  =  (undefined);

    if (typeof optimize !== "object")
               optimize  =  (false);

    var {rxSlotBoolean, rxSlotNativeType,
         rxSlotNumeric, rxSlotString}=optimize;

    var enumRx, slotType;
   /////
    switch  (true) {
    case (!!(enumRx = validatorRx)):
      console.time("rxSlot.test");

       /////////////////////////////////////////
      // ------------------------------------
     //    Formal boolean regex query slot
    // ------------------------------------
    case (!!(enumRx = validatorRx) ||
          !!(enumRx = rxSlotBoolean)):
        var slotType
         =  regexBooleanSlotType(enumRx.source);

        if (slotType) {
        if (!externalFn)


        TYPE_CLASS
      = [7, name, null, null, priority];
        break;


        }

       /////////////////////////////////////////
      // ------------------------------------
     //    Formal numeric regex query slot
    // ------------------------------------
    case (!!(enumRx = validatorRx) ||
          !!(enumRx = rxSlotNumeric)):
        var slotType
          = regexNumericSlotType(enumRx.source);

        //  slotAny
        if (slotType === "*") {
        if (!externalFn)


        TYPE_CLASS
      = [8, name, null, "*", priority];
        break;


        }
        else
        //  slotNonEmpty
        if (slotType === "+") {
        if (!externalFn)

        
        TYPE_CLASS
      = [8, name, null, "+", priority];
        break;


        }
        else
        if (slotType instanceof Array) {/*…*/}


       /////////////////////////////////////////
      // ------------------------------------
     //    Formal string regex query slot
    // ------------------------------------
    case (!!(enumRx = validatorRx) ||
          !!(enumRx = rxSlotString)):
        var slotType
         =  regexStringSlotType(enumRx.source);

        //  slotAny
        if (slotType === "*") {
        if (!externalFn)


        TYPE_CLASS
      = [8, name, null, "*", priority];
        break;


        }
        else
        //  slotNonEmpty
        if (slotType === "+") {
        if (!externalFn)


        TYPE_CLASS
      = [8, name, null, "+", priority];
        break;


        }
        else
        //  get length boundary: 1 char
        if (slotType === "?") {
        if (!externalFn)


        TYPE_CLASS
      = [9, name, null, "?", priority];
        break;


        }
        else
        if (slotType instanceof Array) {/*…*/}


       /////////////////////////////////////////
      // ------------------------------------
     //    Formal native type query slot
    // ------------------------------------
    case (!!(enumRx = validatorRx) ||
          !!(enumRx = rxSlotString)):
        var slotType
         =  regexNativeTypeSlot(enumRx.source);

        if (slotType) {
        if (!externalFn)


        TYPE_CLASS
      = [10, name, null, , ];
        break;


    }}

    if (slotType) {
        priority
      = extractDictionaryMatch(enumRx,
                     synonymsPriority);

    if (externalFn)
        externalFn(slotType, enumRx, priority);

    else return (TYPE_CLASS[4] = priority)
             &&  TYPE_CLASS;
  }}

    ////////////////////////////////////////////
   //  enumerate schema definition to export
  /*
       1,2               Type
        3            transformerFn
        4            isRequirement (method)

        5            rxValidatorArray
        6            rxValidator

        9            rxSlotString
        8            rxSlotNumeric
        7            rxSlotBoolean
        10  (to-do)  rxSlotNativeType

        11           isRequired
        12           minLength,
                     maxLength
        13           lowerBound,
                     upperBound
        14           boundaryRequirement
         6           regex (rxValidator)

        17           flag

        18  (to-do)  schema object: inArrayType?

        0            key  

  ///                                         */
  static exportTypeClass (name, externally = {
                                length:(0)
    /*           opCode,  
   /// -----------------  ------------------ ///
          constructorFn,  typeObjNative,

          transformerFn,  getterFn,
            validatorFn,
            validatorRx,  rxValidator,
                          rxValidatorArray:
                            validatorRxArray,

                boundaryRequirement,

           !!isRequired,  rxSlotBoolean,
              minLength,  rxSlotNumeric,
              maxLength,  rxSlotString,
             lowerBound,  rxSlotNativeType,
             upperBound,  
                  regex,  
    /// ---------------   ----------------- ///
               ...flags,  ...schema         */
  },       queryStage=0) {
    if (0>=queryStage)
           queryStage=0;

    if ( typeof name !== "string")
       { return }

    if (!externally instanceof Object
    ||   externally.length === 0)
         externally = (undefined);
    else
    if (externally)
        switch (true) {
      
         case  (externally.TYPE_CLASS
       /*////*/            instanceof Array):
        return  externally.TYPE_CLASS;  

         case  (externally.TYPE_CLASSES
       /*////*/            instanceof Array):
        return  externally.TYPE_CLASSES;

    }

       /////////////////////////////////////////
      // ------------------------------------
     //   schema definition by nomenclature
    // ------------------------------------

    const {isRegexArray, exportDictionaryMatch,
          opcodeTypeMap, synonymsPriority, 
          nativeTypeMap, resolveNativeType}
        = this;

    var typeObjNative;
    var ////////////
    [    Name,  ///
         name,
       __name,   ] = resolveNativeType(name);

    if (!name) {
         name = arguments[0];

    ////////////
       const
        chrx = /(?:([A-Z])|([a-z]))/;

    if (chrx = chrx.exec(Name)) {
    if (chrx[1])
        name = Name[0].toLowerCase()
             + Name.substring(1);
    else
    if (chrx[2])
        name = Name,
        Name = name[0].toUpperCase()
             + name.substring(1);

        else {   return   }
    }}         //////////

    if (!externally)
    var {
               [name]:  prop,
               [Name]:  constructorFn,
       [ `is${Name}`]:  validatorFn,
       [ `rx${Name}`]:  validatorRx,
       [ `${name}Fn`]:  transformerFn,
       [`get${Name}`]:  getterFn  ///  … or flag

    } = (inArrayType); /////////////////////////
    else {
    if   (externally.opCode)
    var  {     opCode,                       /*
    ------------------  -----------------  */
        constructorFn,  typeObjNative,

        transformerFn,  getterFn,
          validatorFn,                      /*
    ------------------  ----------------- */
    } = (externally)  }

   /////////////////////////////////////////////
    var opCode
     = (typeof  prop  === "number") ? prop
     : (typeof opCode !== "number") ? null
     :         opCode;

    if (opCode) {
   ////
    if (typeof constructorFn !== "function")
               constructorFn  =  (undefined);
    else
    if (           constructorFn.TYPE_CLASS  &&
        opCode === constructorFn.TYPE_CLASS[2])
    {   return    (constructorFn.TYPE_CLASS)  }

   ////
    if (typeof transformerFn !== "function")
               transformerFn  =  (undefined);
    else
    if (           transformerFn.TYPE_CLASS  &&
        opCode === transformerFn.TYPE_CLASS[2])
    {   return    (transformerFn.TYPE_CLASS)  }

   ////
    if (typeof validatorFn !== "function")
               validatorFn  =  (undefined);
    else
    if (           validatorFn.TYPE_CLASS  &&
        opCode === validatorFn.TYPE_CLASS[2])
    {   return    (validatorFn.TYPE_CLASS)  }

   ////
    if (typeof getterFn !== "function") {
    if (!externally)
    //  boundaryRequirement, flags (static)
    if (       getterFn instanceof Array)
        return getterFn;
       ////////
         else  getterFn  =  (undefined);
    }
    else
    if (           getterFn.TYPE_CLASS  &&
        opCode === getterFn.TYPE_CLASS[2])
    {   return    (getterFn.TYPE_CLASS) }}
                                              /*
    --------------------------------------- */
    else if (prop)
         switch (true) {
        
          case  (prop.TYPE_CLASS
        /*////*/      instanceof Array):
         return  prop.TYPE_CLASS;

          case  (prop.TYPE_CLASSES
        /*////*/      instanceof Array):
         return  prop.TYPE_CLASSES;

    } /*////////////////////////////////////////


                    •     •     •


   */////   A different static landscape   /////
    if (typeof validatorRxArray)
    if (typeof validatorRx !== "undefined") {
    if (validatorRx instanceof Array
    && isRegexArray(validatorRx)) {
        validatorRxArray
      = validatorRx;
    }
    else
    if (!!validatorRx instanceof Array
    ||   !validatorRx instanceof RegExp) {
          validatorRx = undefined;
          if (Name &&  !externally)
    this[`rx${Name}`] = undefined;

    }}

    if (    !__name /// try global object
    &&  typeof Name === "string")
    try
  { typeObjNative = eval(Name) } catch(e){/*…*/}
   /*///////////////////////////////////////////


                    •     •     •


   *//////////////   JS methods   //////////////
    if (opCode) {

       ////////////////////////////
      // -----------------------
     //     Type definition
    // -----------------------
    if (constructorFn) {
    priority
  = extractDictionaryMatch(constructorFn,
                        synonymsPriority);
    TYPE_CLASS
  = [1, Name, opCode,
       typeObjNative,
      ////////////////
       constructorFn, 
         validatorFn, 
         validatorRx, getterFn,
         () => [/*  types  */],
         () => [/*  reqs   */],
         () => [/* setters */],
         () => [/* getters */],
         () => [/*  flags  */],
                     priority];
    }
    else
    if (typeObjNative) {
    priority
  = this.defaultPriorityNativeType;

    TYPE_CLASS
  = [2, Name, opCode,
       typeObjNative,
      ////////////////
         (undefined),
       transformerFn,
         validatorFn,
         validatorRx, getterFn,
            () => [],
            () => [],
            () => [],
            () => [],
            () => [],
            priority];
    }
    else

       ///////////////////////////////
      // --------------------------
     //   Transformer (setterFn)
    // --------------------------
    if (transformerFn) {
    priority
  = extractDictionaryMatch(transformerFn,
                        synonymsPriority);

    TYPE_CLASS
  = [3, name, opCode, transformerFn, priority];


    }
    else

       /////////////////////////////
      // ------------------------
     //    Requirement method
    // ------------------------
    if (validatorFn) {
    priority
  = extractDictionaryMatch(validatorFn,
                      synonymsPriority);

    TYPE_CLASS
  = [4, name, opCode, validatorFn, priority];


    }}
    else /*/////////////////////////////////////


                    •     •     •


   */////////////   regex methods   ////////////
    if  (!opCode)    {
    if  (externally) {
    var {                                     /*
    ------------------  ------------------  */
          validatorRx,  rxValidator,
                        rxValidatorArray:
                          validatorRxArray,

        rxSlotBoolean,  rxSlotString,
        rxSlotNumeric,  rxSlotNativeType      /*
    ------------------  ------------------  */
    } = externally;

    if (              validatorRxArray
    &&  !isRegexArray(validatorRxArray))
                      validatorRxArray = null;

    if (rxValidator)  validatorRx = rxValidator;
    if (rxSlotBoolean
    ||  rxSlotNativeType      /////////
    ||  rxSlotNumeric
    ||  rxSlotString) validatorRx = false;

    }

       /////////////////////////////////////
      // --------------------------------
     //   Regex rule chain requirement
    // --------------------------------
    if (validatorRxArray) {
    priority
  = extractDictionaryMatch(validatorRxArray,
                           synonymsPriority);

    TYPE_CLASS
  = [5, name, null, validatorRxArray, priority];


    }
    else
    if (validatorRx !== undefined) {

       ////////////////////////////
      // -----------------------
     //    Regex requirement
    // -----------------------
    if (queryStage === 0) {
    priority
  = extractDictionaryMatch(validatorRx,
                      synonymsPriority);

    TYPE_CLASS
  = [6, name, null, validatorRx, priority];


    }
    else
    if (queryStage === 1) {
    const {  defineRegexSlot,
             regexNativeTypeSlot,
             regexStringSlotType,
  /*/////*/  regexNumericSlotType,
             regexBooleanSlotType  }=this;


       /////////////////////////////////////////
      // ------------------------------------
     //    Query slot by regex definition
    // ------------------------------------
    defineRegexSlot(validatorRx, regexSlotType,
                   { externally });
  
    function regexSlotType (slotType, enumRx,
                            priority) {
      if (slotType instanceof Array
      ||  slotType    ===    "?"
      ||  slotType    ===    "*"
      ||  slotType    ===    "+")
      switch (enumRx) {
        case (regexBooleanSlotType):
          TYPE_CLASS
        = [7, name, null, null, priority];
          break;

        case (regexStringSlotType):
        case (regexNumericSlotType):
          TYPE_CLASS
        = [8, name, null, slotType, priority];
          break;

        case (regexNativeTypeSlot):
          TYPE_CLASS
        = [10, name, null, , ];
          break;
      }

      if (slotType instanceof Array) {/*…*/}
      return TYPE_CLASS;

    }}}
    else { /*///////////////////////////////////


                    •     •     •


   *//////////   dictionary synonyms   /////////
    const {
      synonymsRequirements,
      synonymsFlags,
    } = inArrayType;

       /////////////////////////////////////////
      // -------------------------------------
     //   Requirements schema by dictionary
    // -------------------------------------

    if (externally) {
    var every = Object.entries(externally);
    var {                                     /*
                isRequired,  regexpTerm,     /
    -----------------------  -------------- /
                 minLength,
                 maxLength,
                lowerBound,
                upperBound,            /*
    -----------------------  -------- /
       boundaryRequirement:  bounds           /*
    -----------------------  -------------- */
    }  =  (externally)   }
    else
    var every = Object.entries(prop);
        every._length
      = every["length"]; /// optimization

       /////////////////////////////////////////
      // ------------------------------------
     //        Boundary requirement
    // ------------------------------------
    let boundaryRequirement
      = defineBoundaryRequirementType(name, every,
                      requirementTypeClass);

    function requirementTypeClass (TYPE,
        isRequired, regexpTerm,               /*
       -----------  ------------            */
      {  minLength, maxLength,              /*
       -----------  ------------          */
        lowerBound, upperBound,           /*
       -------- [*,,*] ---------        */
        isInverted, isDiscrete,
         hasFloats, hasStrings  }, prop=null) {

      if (!prop)
      switch (TYPE) {
        case (1):
        TYPE_CLASS
      = [11, name, isRequired];
        break;


        case (2):
        TYPE_CLASS
      = [12, name, isRequired, regexpTerm];
        break;


        case (3):
        TYPE_CLASS
      = [13, name, isRequired, regexpTerm,
                               [minLength,
                                maxLength]];
        break;


        case (4):
        TYPE_CLASS
      = [15, name, isRequired, regexpTerm,
                   isInverted, isDiscrete,
                              [lowerBound,
                               upperBound]];
        break;


        case (5):
        TYPE_CLASS
      = [16, name, isRequired, regexpTerm,
                               [minLength,
                                maxLength],
                   isInverted, isDiscrete,
                              [lowerBound,
                               upperBound]];
        default: return;
      }
      else
      if (prop instanceof Array) {
      if ((isInverted
      &&  !hasFloats && !hasStrings) 
      ||  (hasFloats ||  hasStrings)) {


          TYPE_CLASS
        = [15, name, isRequired, regexpTerm,
                     isInverted, isDiscrete, prop];


      }   else
          TYPE_CLASS
        = [14, name, isRequired, regexpTerm,
                     isInverted, isDiscrete, prop];
    }}

       /////////////////////////////////////
      // --------------------------------
     //    Flags schema by dictionary
    // --------------------------------
    var flags = [];

    extractDictionaryMatch(every,
      synonymsCustomFlags, flagTypeClass);

    function flagTypeClass (cat, val) {
      let opCode
        = inArrayType[cat];

      if (typeof opCode === "number") {


          TYPE_CLASS
        = [17, cat, opCode, val];


          flags.push(TYPE_CLASS);
    }}

    if (every._length) {

         ///////////////////////////////////////
        // ----------------------------------
       //   missing in-object schema here?
      // ----------------------------------

    }

   /////////////////////////////////////////////
    var TYPE_CLASSES=[];
    
    switch (true) {
      case (!!flags.length):
        TYPE_CLASSES = flags;

      case (!!boundaryRequirement):
        TYPE_CLASSES.push(boundaryRequirement);
    }

    if (externally) {
    if (TYPE_CLASSES.length === 1) {
    Object.defineProperty(arguments[1], 
                          "TYPE_CLASS",
             { get: () => (TYPE_CLASS[0]) });
                  /*/////////////////////*/

                    return TYPE_CLASS[0];
    }
    else
    if (TYPE_CLASSES.length > 1) {
    Object.defineProperty(arguments[1], 
                         "TYPE_CLASSES",
             { get: () => TYPE_CLASSES });
                  /*////////////////////*/

                    return TYPE_CLASSES;
    }}}}

  //////////////////////////////////////////////

    switch (TYPE_CLASS[0]) {
      case (1):
      case (2):
        Object.assign(TYPE_CLASS[4],
                     {TYPE_CLASS});
        break;

      case (3):
      case (4):
        Object.assign(TYPE_CLASS[3],
                     {TYPE_CLASS});
        break;

      default:
        if (opCode)
        if (getterFn) {}
    }
    
    return TYPE_CLASS;
  //////////////////////////////////////////////
  }

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
    &&   !this.opcodeTypeMap[TYPE_ENUM][opCode])
          this.opcodeTypeMap[TYPE_ENUM][opCode]
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
      = inArrayType.determineTypeClass(Name);

    }
    else

       /////////////////////////////////////////
      // ------------------------------------
     //           class extension
    // ------------------------------------

    //  schema definition extends main class
    if (this.determineTypeClass) {
        TYPE_CLASS
      = this.determineTypeClass(Name);

    }
    else
    //  schema definition by lib nomenclature
    if (this.constructor.determineTypeClass) {
        TYPE_CLASS
      = this.constructor.determineTypeClass(Name);

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

    if (inArrayType.getTypeClass(TYPE_CLASS))
               return super(...TYPE_CLASS);

  }}

  static determineTypeClass (Name="", CLS=this) {
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

      //////////////////////////////////////////
     // type, requirementFn          (wrapper)
    //  requirementRx, transformer, flag
    if (TYPE_ENUM >= (1) && (7) >= TYPE_CLASS)
    bindSchemaDefinition
  = function inArrayTypeWrapper (...params) {
      return inArrayType
            .addSchemaDefinition(TYPE_CLASS,
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
    if (TYPE_ENUM >= (4) && (7) >= TYPE_CLASS)
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
   .addSchemaDefinition(TYPE_CLASS, params);

    //  assign exports to chain header
    for (let [TYPE_1, fn_1] of Object
                              .entries(exports)) {
    if  (typeof fn_1 === "function") {
    chainHead[TYPE_1]=fn_1.bind(chainHead);
    for (let [TYPE_2, fn_2] of Object
                              .entries(exports)) {
    if  (typeof fn_2 === "function"
    &&   TYPE_2 != TYPE_1)
         chainHead[TYPE_1][TYPE_2]
                = fn_2.bind(chainHead);
    }}
    else
    if  (TYPE_1 === "TypeMap")
         chainHead.TypeMap = (fn_1);
    }}
    else chainHead = inArrayType
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

    var Types,        flags,
        requirements, getters,
        transformers, other;

    //  process schema params 
    let [Types_,
         requirements_, 
         transformers_, flags_, getters_, other_]
     =   inArrayType.addSchemaDefinition
                    .call(this, TYPE_CLASS,
                                    params);

    //  test for chain header format
    if  (!header instanceof Array
    ||   !header.length === (5))
          header = new Array([],[],[],[],[],[]);
    else [Types, requirements,
                 transformers,
          flags, getters, other]
        = header;

    //  set chain header variables

    if (Types_) header[0]
     =  Types.concat(Types_);

    if (requirements_) header[1]
     =  requirements.concat(requirements_);

    if (transformers_) header[2]
     =  transformers.concat(transformers_);

    if (flags_) header[3]
     =  flags.concat(flags_);

    if (getters_) header[4]
     =  getters.concat(flags_);

 /*////////////////*/
    return header;
  }

    ///////////////////////////////////////
   // generate map of schema definitions
  /*
   -  expect requirements as fns, or in Object
   -  interpret Objects as schema key mappings 
  ///                                         */
  static addSchemaDefinition (TYPE_CLASS,
 /*//////////////////////*/       params) {
    var        Types=[];
    var requirements=[];
    var transformers=[];
    var      getters=[];
    var        flags=[];
    var        other=[];

    var { numericOperator, 
           synonymsFlags,
           opcodeTypeMap  } = inArrayType;
           opcodeTypeMap 
         = opcodeTypeMap[7];

    var params
      = params.values(), term, bfr, every;
   /////
    do {
    term = params.next().value;

    switch (typeof term) {
      case (term instanceof inArrayType
        &&  "object"):

      case ("number"):
        //  min-max value bounds or length
            continue;

      case (term instanceof Array
        &&  "object"):
            continue;

      case (term instanceof inArrayType
        &&  "object"):
            continue;
    }

   ////////////////////////////////////
               requirements.push(bfr),
                      every=undefined,
                        bfr=undefined;
    if (!term) break;
   ////////////////////////////////////

    switch (typeof term) {
      case ("boolean"):
        requirements.push(term);
        break;

      case ("string"):
        //  match string literal operators
        if (bfr = numericOperator(term)) {
            flags.push(opcodeTypeMap[bfr]);
            break;
        }

      case ("string"):
        //  test for flag or flag alias
        for (let flags of Object
                         .values(synonymsFlags)) {
         if (flags.indexOf(term) >= 0) {
         if (bfr = inArrayType[flags.at(-1)])
             flags.push(opcodeTypeMap[bfr]);
                       (bfr=undefined);
             break;
        }}   break;

      case (term instanceof RegExp
        &&  "object"):
            requirements.push(term);
            break;

      case ("function"):
            continue;

    }} while (true)

    return [ Types.length && Types,
      requirements.length && requirements,
      transformers.length && transformers,
             flags.length && flags,
           getters.length && getters,
             other.length && other ];
  }
 
   ////////////////////////////////
  //  match numeric operators
  static resolveNumericOperator (evalLiteral) {
    //  parse query type
    switch (enumLiteral) {

        ////////////////////////////////
       // ---------------------------
      //   ascending row id number
     // ---------------------------

      case ("+++"):
        //  autoIncrement
            return inArrayType.autoIncrement;

        ////////////////////////////////
       // ---------------------------
      //     setup counter slots
     // ---------------------------

      case ("==="):
        //  setIncremental
            return inArrayType.setIncremental;

      case ("---"):
        //  deleteRowOnZero (setIncremental)
            return inArrayType.deleteRowOnZero;
    }

    //  query live data
    switch (enumLiteral) {

        ////////////////////////////////
       // ---------------------------
      //     triggering counters 
     // ---------------------------

      case ("++"):
        //  increaseByOne
            return inArrayType.countUp;

      case ("--"):
        //  decreaseByOne
            return inArrayType.countDown;
    }
  }

  static resolveOperatorType (evalLiteral,
                                  exports
                                   = this) {
    var TYPE_CLASS;
    if (typeof evalLiteral === "string")
    switch (typeof evalLiteral) {

        /////////////////////////////////////
       // --------------------------------
      //   determine literal value type
     // --------------------------------

      case ("string"):
        TYPE_CLASS = this.opcodeTypeMap
                    [inArrayType.string];
        break;

      case ("number"):
        TYPE_CLASS = this.opcodeTypeMap
                    [inArrayType.number];
        break;

      case ("boolean"):
        TYPE_CLASS = this.opcodeTypeMap
                    [inArrayType.boolean];
        break;

      case ("symbol"):
        TYPE_CLASS = this.opcodeTypeMap
                    [inArrayType.symbol];
        break;
    }

    if (!TYPE_CLASS)
    console.trace("Unrecognized type");

     else
    return TYPE_CLASS;
  }

   ////////////////////////////////////////////
  //  recognize query types & extract config
  static inspectQueryObjectSchema (object,
                                  _models,
                             staticArrayOrder,
                              firstArrayMatch) {
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
                               = (true);
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
    var TYPEs=["string","number"], i=0;
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
                                    exports,
                   makeChainedMethods);

                   exports[prop] /// chain types
                 = binding.bind(exports);
           }});

    var config = {
        filterKeys, omitKeys,
        filterVals, omitVals,
        synonymObj: Object
       .assign(this.synonymsTypes,
               this.synonymsRequirementsAll,
               this.synonymsTransformersAll,
               this.synonymsFlags)
    };

    for (let obj of assignTo) {
      objectAssign(obj, exports, config);
    }

    let [test] = Object
                  .keys(this.synonymsFlags);
   /////
    if (!this.synonymsFlags[test].indexOf(test))
        Object.entries(this.synonymsFlags)
              .forEach(([normalKey, alias]) => {
                   alias.push(normalKey);
              });

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

//  static isPredicate;
//  static isModifier:

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

  static numericArray (enumLiteral) {
    try {
      return enumLiteral.every(num =>
                        typeof num == "number");
    } catch (e) { throw e }
  }

  static enumValueType (lit, 
            queryStage=0 || // parse query type
                  void 1 || // query live data
                       0)  {
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
    && (res = this.regexStringSlotType(literal))
    || (res = this.regexNumericSlotType(literal))
    || (res = this.regexSlot(literal))) {
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
    &&  (res = this.regexSlotArray(lit)))
    //   match regex slot array
         return res;
    }
   
    //  determine object type 
    if ((res = this.dateType(lit,   crossOrigin))
    ||  (res = this.errorType(lit,  crossOrigin))
    ||  (res = this.objectType(lit, crossOrigin)))
        return res;
  }

   //////////////////////////
  //  match flag operators
  static flagOperator (enumLiteral) {

  }

  static getTypeClass (enumTypeClass) {
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
            return [enumLiteral];

      case ("string"):
        //  missing format data
        var date = new Date(enumLiteral);
        if (date)
            return date;

      case ("number"):
        //  missing epoch data
        var date = new Date(enumLiteral);
        if (date)
            return date;
    }

   /// missing signals: timezone and DST
  }

  static isErrorType (enumLiteral) {
    try {
    let clsName = enumLiteral
                 .constructor.name;
    if (clsName === "Error"
    ||  clsName.includes("Error")
    ||  clsName.includes("error"))
        return enumLiteral;

    } catch (e) { throw e }
  }

   //////////////////////////
  //  string slot (formal)
  static regexStringSlotType (enumRx) {
    try {              enumRx=enumRx.source;

      //////////////////////////////////////////
     // -------------------------------------
    //   reduce regular expression to type
   // -------------------------------------
    var matchType, m, s;

    const { evalRegexArray:
            rxArray,

            rxFormalStringSlotMultiline:
            rxMultiline,

            rxFormalStringSlotInline:
            rxInline
          } = inArrayType;

    do {
    if (!m) m = true,
    matchType = rxArray(enumRx, rxMultiline);

    else
    if (!s) s = true,
    matchType = rxArray(enumRx, rxInline);

    switch (matchType) {
      case ("*"):
        //  slotAny
            return "*";

      case ("+"):
        //  slotNonEmpty
            return "+";

      case ("?"):
        //  get length boundary: 1 char
            return "?";

      default:
        //  get length boundary
        let bfr=matchType[1].split(",");
        if (bfr.length === 1)
            return [bfr[0], bfr[0]];

             else
            return [bfr[0], bfr[1]];

    }} while (!m || !s)
    }  catch (e) { throw e }
  }

   ///////////////////////////
  //  numeric slot (formal)
  static regexNumericSlotType (enumRx) {
    try {               enumRx=enumRx.source;

      //////////////////////////////////////////
     // -------------------------------------
    //   reduce regular expression to type
   // -------------------------------------

    let matchType
      = this.evalRegexArray(enumRx,
                       this.formalNumericSlot);

    switch (matchType) {
      case ("*"):
        //  slotAny inline
            return "*";

      case ("+"):
        //  slotNonEmpty inline
            return "+";
    }

     //
    // ...

    } catch (e) { throw e }
  }

  static regexBooleanSlot (enumRx) {
    try {           enumRx=enumRx.source;

      //////////////////////////////////////////
     // -------------------------------------
    //   reduce regular expression to type
   // -------------------------------------

    let matchType
      = this.evalRegexArray(enumRx,
                       this.formalBooleanSlot);

    if (matchType)
        return true;

    } catch (e) { throw e }
  }

  static regexNativeTypeSlot (enumRx) {
    try {              enumRx=enumRx.source;

      //////////////////////////////////////////
     // -------------------------------------
    //   reduce regular expression to type
   // -------------------------------------

    let matchType
      = this.evalRegexArray(enumRx,
                 this.formalNativeTypeSlot);

    if (matchType)
        return matchType[1].split("|");

    } catch (e) { throw e }
  }

  static isRegexArray (array, strReplace="") {
    if (typeof array !== "object"
    ||         array.constructor !== Array
    ||        !array.length) {
        return false;
    }

   /////////////////////////////////////////////

    if  (!strReplace) {
    if  (array
        .every((elem) =>
        (typeof elem === "boolean"
    ||  (typeof elem === "number"
    &&          elem !== 0
    &&          elem === parseInt(elem))
    ||  (typeof elem === "object"
    &&          elem.constructor.name
                     === "RegExp")
    ||  (typeof elem === "string"
    &&   this.regexTrim(elem)))))
         return true;

          else
         return false;
    }

   /////////////////////////////////////////////
    array=[...array];

    var regex_flag = ("");
    if (typeof strReplace === "string") {
           var regex_flag =
               strReplace;
    }

    var len=array.length;
   /////
    for (var i=0; i<len; i++) {
    let elem
     =  array[i];

    if (typeof elem === "string") {
    let bfr
     =  this.regexTrim(elem, regex_flag);
    if (bfr)
        array[i] = bfr;

        else
       return false;
    }
    else
    if (typeof elem !== "boolean"
    && (typeof elem !== "number"
    ||         elem !== parseInt(elem)
    ||         elem === 0)
    && (typeof elem !== "object"
    ||         elem.constructor !== "RegExp"))
        return false;
    }

    return true;
  }

  static evalRegexArray (val, array,
                         regexFlags="") {
    var evalSign
     =  true;
   /////
    if (typeof val !== "string") {
    if (typeof val === "number")
               val = `${val}`;
         else
        return;
    }

    var res, term, match, i=0, len=array.length;
   /////
    for (var term of array) {

    //  convert regex rules contained in string
    if (typeof term     === "string"
    &&  typeof evalSign === "boolean"
    ||         evalSign > 0) {
        term = this.regexTrim(term, regexFlags);
    }

    switch (typeof term) {
      case ("boolean"):
      case ("number"):
        //  return undefined on exclude rule
        if (typeof evalSign === "number"
        &&         evalSign > 0) {
            return;
          ///////////
        }
        
        if (typeof term === "number")
        evalSign = parseInt(term);

        else
        evalSign = term;
        break;

      case ("object"):
        if (term.constructor.name === "RegExp") {
        if (evalSign === 0) {
        //  ignore rx rules after positive zero
            continue
          ////////////
        }
        else match =
         val.match(term);
          
        if (!match) {
        if (typeof evalSign === true)
        //  return undefined on unmatched rule
            return;
          ///////////
        }
        else {
        if (match.length > 1
        &&  evalSign === true || evalSign > 0) {
        //  first regex capturing group returns
        if (!res)
             res=match;
           //////////////
        }

        if (typeof evalSign === "number") {
        if (       evalSign > 0
        &&       !(evalSign = evalSign - 1)) {
        if (i === (len - 1))
            continue
          ////////////
        }
        else
        if (       evalSign < 0
        &&       !(evalSign = evalSign + 1)) {
            return;
          ///////////
        }}
        else
        if (evalSign === false)
            return;
          ///////////
        }    break    }

      default:
        throw `Invalid input type: ${term}`;

    } (i=i+1) }
  ///////////////
    if (typeof evalSign === "boolean"
    ||         evalSign <= 0)
  ///////////////
    return res;
  }

  static regexTrim (term, applyFlags="") {
    if (typeof applyFlags !== "string"
    || (typeof term !== "string"
    &&        !term instanceof RegExp)) {
        return console.trace("Invalid input type");
    }

    if (typeof term === "object")
        return term;

    if (term[0] === "/") {

    const
    REGEX_FLAGS = /\/([gmixsuXUAJ]+)$/;

    let flags
  = REGEX_FLAGS.exec(term);

    if (flags) applyFlags
      = flags[1];

        term
      = term.substring(1, term.length -
                         flags.length - 1);
    }

    try
  { term = new RegExp(term, applyFlags) }
    catch (e) { return console.trace(e) }

    return term;
  }

  static extractDictionaryMatch (schemaProp = 0,
                                 synonymObj, fn,
                                 checkTypes
                                  = (false)) {
    if ( typeof schemaProp !== "object"
    &&   typeof schemaProp !== "string"
    ||   typeof synonymObj !== "object")
    ////////////////
       { return {loopSynonymCategory,
                     matchExactValue,
    /*//// DIY ////*/  assertUpdated} }

    var entries, inArray,
     modEntries;
   /////
    if ( schemaProp       instanceof Object)
    //  one-off microservice
        entries = Object.entries(schemaProp);

    else
    //  optimization for multipass
    if ( schemaProp       instanceof Array
    &&   schemaProp["_length"]       >=  0
    || ( schemaProp[0]    instanceof Array
    &&   schemaProp[0].length        === 2
    || ( schemaProp[0].length        === 3
    &&   schemaProp[0][2]            === true))) {
    if ( typeof
         schemaProp[0][0]   ===   "string") {
        entries = (schemaProp);
     modEntries = assertUpdated.bind(entries);
    }
    else
    if ( typeof
         schemaProp[0][0]   ===   "number") {
         inArray = true;
                    checkTypes=false,
         entries = (schemaProp); 
      modEntries = assertUpdated.bind(entries);

    }}
    else
    if ( schemaProp instanceof Array)
    //  one-off microservice
        inArray = (schemaProp),
                   checkTypes=false;

   /////////////////////////////////////////////

    var returnProps=false,
       rewriteProps=false, rewriteFn;
   /////
    if ( typeof (fn)       === "function") {
    if (!inArray && modEntries) {
        rewriteFn = (...entry) => 
        rewriteProps.push( entry );
                   /////
        rewriteProps = new Array();
    }}
    else
    if ( typeof fn         === "object"
    &&   typeof fn[0]      === "function") {
    if ( typeof fn[1]      === "function")
    //  supplied results parser and rewrite fns
    [fn, rewriteFn] = fn;
    
          else { fn = fn[0] }
    }
    else {
    if ( typeof fn         === "undefined"
    &&   typeof schemaProp !==    "string") {
    //  just return results in simplest use-case
    fn = (cat, val) =>
          returnProps.push([cat, val]);
    }
    else
    if ( typeof fn         === "boolean"
    &&   typeof schemaProp === "object"
    &&          synonymObj instanceof Object) {
    //  built-in object rewriting capacity
    switch (fn) {
      case (fn === true && !modEntries
                        && !inArray):
        //  rewrite object and return results
        fn = (cat, val, key, i) =>
              returnProps.push([cat, val,
                                key, i]),

        rewriteFn = (...entry) => 
              rewriteProps.push( entry ),


        rewriteProps = new Array();
        break;

      case (fn === true && inArray):
        //  rewrite array and return results
        fn = (cat, val, i) =>
              returnProps.push([cat, val, i]);

        rewriteProps = true;
        break;

      default:
        //  return results only
        fn = (cat, val) =>
              returnProps.push([cat, val]);
    }}
    else
    if ( typeof schemaProp === "string") {
       { return }
   ////////////////////
  }   returnProps=[]   }
   ////////////////////


    /*//////////////////////////////////////////
            ________,,
              / \  \/  \\\  °:.*  `|`|`
           ˘˘˘  **
    //////////////////////////////////////////*/

    if (modEntries)
        modEntries();

    if (synonymObj instanceof Object)
    switch (typeof schemaProp === "string") {
      case (true):
       for (var [cat, synonyms]
             of Object.entries(synonymObj)) {
        var cat
          = matchDictionaryRow(schemaProp, true,
                          cat, synonyms);
        if (cat)
        return fn(cat, val);
      } return;

      default:
      for (let [cat, synonyms]
           of Object.entries(synonymObj)) {
           loopSynonymCategory(cat, synonyms,
                                   { entries,
                                     inArray });
      }
    }
    else
    if (synonymObj instanceof Array)
    switch (typeof schemaProp === "string") {
      case (true):
        let res
          = matchDictionaryRow(schemaProp, true,
                       (null), synonymObj);
        if (!res)
             return
        else return fn(true);
      /////////////////////////

      default:
      loopSynonymCategory((null), synonymObj,
                                   { entries,
                                     inArray });
    }

    if (modEntries)
        modEntries();

     ///////////////////////////////////////////
    //  modify supplied objects directly
    if (inArray && rewriteProps
                &&  returnProps.length) {
    if (entries)
    for (let entry of returnProps) {
         let [cat, val, i]=(entry);
                            entry.pop();
              entries[i]
                = cat;
    }
    else
    for (let entry of returnProps) {
         let [cat, val, i]=(entry);
                            entry.pop();
              inArray[i]
                = cat;
    }}
    else

     ///////////////////////////////////////////
    //  guarantee fixed key order (JS specific)
    if ( returnProps.length
    &&  rewriteProps.length) {
             entries.forEach(([key]) =>
 /*/////*/   delete schemaProp[key]);

    var returnLoop = returnProps.entries(),
       rewriteLoop = rewriteProps.entries();

    var  returnRes = returnLoop.next();
         returnRes = returnRes.value;
    var rewriteRes = rewriteLoop.next();
        rewriteRes = rewriteRes.value;

    var key, val;
    do {
    //  compare indexes
    if  (!returnRes
    ||    rewriteRes[3] < returnRes[3]) {
    key = rewriteRes[3];
    val = rewriteRes[1];

          rewriteRes = rewriteLoop.next();
          rewriteRes = rewriteRes.value;
    }
    else
    if  (!rewriteRes
    ||    returnRes[3] < rewriteRes[3]) {
    key = returnRes[3];
    val = returnRes[1];

          returnRes = returnLoop.next();
          returnRes = returnRes.value;
    }

   ///    rewrite object (one by one)
          schemaProp[key] = val;

    }  while (rewriteRes
            && returnRes) }
    
   /////////////////////////////////////////////
    if (returnProps.length) {
    if ( synonymObj.length === 1)
        return returnProps[0][1];

         else
        return returnProps;
    } //////////////////////////////////////////

    function loopSynonymCategory (cat, synset, {
                 entries = (entries),
                 inArray = (isArray),
              callbackFn = (fn),
               rewriteFn = (rewriteFn),
              modEntries = (modEntries),
      matchDictionaryRow = (matchExactValue)
    }) {
      var i=(-1);
      try {
      if (entries)
      for (let entryObj of entries) { i ++;
           let [key, val, done] = entryObj;
            if (done) continue;

            cat
          = matchDictionaryRow(key, val,
                               cat, synset);
       if (!cat) {
       if (rewriteFn)
           rewriteFn(key, val, null, i);
       }
       else {
         callbackFn(cat, val, key, i);

      /*///////////////////////////////*/

         if (modEntries)
             modEntries(entryObj);
      }}
      else
      if (inArray)
      for (let [i, item] of inArray.entries()) {
            cat
          = matchDictionaryRow(item, true,
                                cat, synset);
       if (cat) {
         callbackFn(cat, true, i, i);

      //////////////////////////////

         if (modEntries)
             modEntries(entryObj);
      }}
      }
      catch(e)
    { throw e }
    }

    function matchExactValue (key, val,
                              cat, synset,
                checkTypes = (checkTypes)) {
      var _i;
     /////
      try {
      for (let alias of synset) {
       if (typeof alias !== "string")
           return false;

       if (key === alias) {
       if (!checkTypes
       ||  typeof synset.at(-1) === "string")
           return (cat || true);
         /////////////////////////

             else {      ///     type?
               _i = synset.length - 1;
                                break;
      }}}

    //////////////////////
          if (!_i)
      return false;
    //////////////////////

      var Type = synset[_i];
      while (typeof Type === "function") {
             Type = Type.prototype
                        .constructor;

         if (typeof val === "object"
         &&         val.constructor === Type)
             return cat || true;
           ///////////////////////

         if (typeof val === "function"
         &&         val.prototype
                       .constructor === Type)
             return cat || true;
           ///////////////////////

         if (typeof val === Type.name
                                .toLowerCase())
             return cat || true;
           ///////////////////////

             Type = synset[(_i =_i - 1)];
      }}
      catch(e)
    { throw e }

      return false;
    }

    /*//////////////////////////////////////////
            ________,,
           / \  \/  \\\ :::: `|`|` //////
           ˘˘˘  **
    //////////////////////////////////////////*/

    function assertUpdated (entryObj=false)  {
      if (typeof this._length === "number") {
      if (entryObj) {
      if (entryObj.length === 2)
          entryObj.push(true);
        //////////////////////////
              this._length --;
      }
      else
      if  (this._length < 0)
           this._length = 0;
      }
      else this._length =
           this["length"];
    }
  }

    ////////////////////////////////////////////
   //  get exported inArrayType wrapper enum
  /*
       1,2        type definition
        3          requirementFn
        4          requirementRx
        5          transformerFn
  ///                                         */
  static enumTypeClass ({
    constructorFn,  requirementLen,
      validatorFn,  requirementScopeArray,

    transformerFn,  requirementFn,

         setterFn,  requirementRx,
         getterFn,  requirementRxArray,

             flag,  

       stringSlot,
       numberSlot,
  }) {
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

  static synonymsTypes = {
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
  };

  static synonymsTransformers = {
    autoVal:['autoValue','default'],
     trimFn:['trim'],
  };

  static synonymsBoundaryRequirements = {
 // type,
    isRequired:['required','req','isReq',
   'isRequired','nonEmpty',     Boolean],
    lowerBound:['min',
   'lowerBound','lowerBoundary', Number],
    upperBound:['max',
   'upperBound','upperBoundary', Number],
    minLength:[
   'minLength','minLen',         Number],
    maxLength:['length',
   'maxLength','maxLen','len',   Number],
    regex:['rx',
   'regex','regexp','RegExp',    String,
                                 RegExp],
    boundaryRequirement:['boundaries',
   'boundaryRequirement','boundary',
   'bounds']
  };

  static synonymsFlags = {
  __array:['fullMatch','matchArray',
 '__array','staticArrayOrder',
            'fixedArrayOrder'],

  __allOf:['matchAll',
 '__allOf','allOf'],

  __anyOf:['partialMatch','match','matchAny',
 '__anyOf','anyOf','pick','__pick'],

  __oneOf:['matchType','firstArrayMatch',
 '__oneOf','oneOf','find','__find'],

  __index:['index','makeIndex','indexKey',
 '__index','makeIndexEntry'],
  };

  static synonymsPriority = {
  __priority:['priority',
 '__priority']
  };
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
        var parser = new DOMParser();
        doc=parser.parseFromString(str,
                  "application/xml");
        var result
          = this.getPathXML(doc, path, offset,
                                       length);
            return callbackFn(result);

      case ("{"):
      case ("["):
        //  JSON
        doc=JSON.parse(doc);

        var result
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

class typedSequence {
  sourceInterfaces;
  schema;

  constructor (schema,
            ...values) {
      // super(values);
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
           
      for (let i; i<len; i++) {
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
      for (let i=val.length-1; i>=0; i--) {
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
