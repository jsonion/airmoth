let jsonion = new Object({
  rx: {
    fnName: /(?:(class|function\**) ([^\s\{]+|[^\s\(]+)|\([^\)]*\)\s*=>\s*{)/g,
    qSelector: /[#\.\[\]\s:="']/g,
    elemIdent: /<(.+?)\s.*(\s*(?:id|class)=(?<b>[\"\']).*?\k<b>)\s.*(\s*(?:id|class)=(?<s>[\"\']).*?\k<s>)+/g,
     elemType: /(HTML|SVG|A-Z+)([A-Z][a-z]+)Element/,
  },
  pick,
  err:{ TYPE: "Type mismatch",
        PATH: "Path not found",
       INPUT: "Invalid input parameter",
       SCOPE: "Value out of scope",
      FORMAT: "Value format invalid",
      OUTPUT: "Function output invalid",
   MISCONFIG: "Misconfiguration",
   makeExecutable:
   function (errorTypes = this) {
   var errorMap = [];
   if (errorTypes === this)
       jsonion.err = errorMap;

   Object.entries(errorTypes)
         .forEach(([type,err]) => {
   if (typeof err !== "string")
       errorMap[type] = err; 
   else
   if (typeof err === "string")
       errorMap[err] = function (...msg) {
   var throws;
   if (msg[0] === false
   &&  jsonion.err.throws !== false)
       throws  = !msg.shift();

       errorMap.push([type, err,
      (!msg.length) ? err : `${err}:`, ...msg]);

   var cur, fnName;
   switch (typeof jsonion.cur) {
     case ("string"):
       if (jsonion.cur.length)
           errorMap
          .at(-1).unshift(jsonion.cur),
                                  cur=true;
           break;

     case ("function"):
           fnName = getFnName(jsonion.cur);
       if (fnName)
           errorMap
          .at(-1).unshift(fnName), cur=true;
           break;

     case ("object"):
       if (jsonion.cur instanceof Array) {
           errorMap
          .at(-1).unshift(jsonion.cur.map(obj => {
           if (typeof obj === "string")
           return obj;

           if (typeof obj === "object")
           return obj.constructor.name;

           if (typeof obj === "function")
               return fnName(obj);
           })
          .filter(str =>
           typeof str === "string"
               && str.length)
          .join("."));

       if (errorMap.at(-1)[0].length)
           cur=true;

   }}  if (throws)
           throw cur
                  && errorMap.at(-1).slice(1)
                  || errorMap.at(-1);
      ////////////                  ////////////
       return cur && errorMap.at(-1).slice(1)
                  || errorMap.at(-1)       }});

   function getFnName (fn) {
       fnName = jsonion.rx.fnName(`${obj}`);
   if (fnName[2])
       return fnName[2];
   }
}}});

jsonion.pick("osType",
             "videoSize",
             "screenSize",
             "framerateVideo",
             "framerateCapture",
             "captureDelayOffset",
             "ffmpegStreamWriter",
            {"padding":{ "activityClip": true,
                         "keystrokeMin": true,
                         "keystrokeMax": true,
     ///     boolean=true on path struct leaf:
    /*    a) direct key-value pair returns
          b) prefixed key-value pair returns

       else  key get through or fall off    */
}});

 //////////////////////////////////////////////
//  clone jsonion cfg props to class objects
function pick (...pathsObj) {
  var prepend, path;
 /////
  var   entries=[,]; // results in flat object
  var resultObj={ }; /* … remap simultaneously?
                           (perfect perfect)  */
         var err;
  if (typeof jsonion === "undefined")
         var jsonion = {}; //////
             jsonion.cur = "pick";
    /// --------------
         getConfig();

  //  may supply a prefix in array at fn input
  if (arguments[0] instanceof Array
  &&  arguments[0].every(str =>
                  typeof str === "string"))
      path=pathsObj.shift();

      else path=[,];

  const exportListOfProperties = {
        traverseArray,
        traverseObject,
        resolveType,
        resolvePath,
        resolveBoolean,
        filterByClassObject,
        filterByClassInstance,
        filterByValueType,
        parseEntries,
       ///
        getConfig, err,
  };

 ///////////////////////////////////////////////
  
  if (pathsObj.length) {
  if (pathsObj.length !== 1
  &&  pathsObj[0] instanceof Object)
      traverseObject(pathsObj[0]);

      else
      traverseArray(pathsObj);

      return [resultObj, entries, parseEntries];
      /////
  }   else   { return exportListOfProperties };

   ///////////////////////////
  //  array in query struct
  function traverseArray (array) {
    for (var [index, struct] of array.entries()) {
         path.push(index);

         resolvePath(struct);

         path.pop();
    }
  }

   ////////////////////////////
  //  object in query struct
  function traverseObject (pathsObj) {
    if ((pathsObj=Object.entries(pathsObj))
    &&   pathsObj.length)
    for (let [key, struct] of pathsObj) {
         path.push(key);

         resolvePath.call(this[key], struct);

         path.pop();
    }
  }

   /////////////////////////////////////////
  //  arrow function at query struct leaf
  function traverseFunction (fn) {  
       let path_ = [...path];
       let bfr = fn.call(this, path_, entries,
                    listOfProperties);

       if (bfr instanceof Array
       &&  bfr.length === 2
       &&  bfr[0] instanceof Array
       &&  bfr[0].every((obj, i) =>
                         obj === pre_[i]))
           return bfr;
          ////////
  }

   ///////////////////////////////////////////
  //  get path type and adds to path/prefix
  function resolveType (obj, key="") {
     if (typeof obj === "string"
     && !Number.isNaN(parseFloat(obj))) {
                                 obj
                    = parseFloat(obj);
    }

     var typeObj, i;
     switch (typeof obj) {
    ////////
      case (obj === null
        && "object"):
        return [undefined];

      case ("object"):
        //  path struct
        if (obj.constructor.name === "Object")
        typeObj = ["obj", obj,
          () => path.push(Object) && 
          (i = (path.length - 1)) &&
         (() => path.splice(i,1))
        ];
        else
        if (obj.constructor.name === "Array")
        typeObj = ["arr", obj,
          () => path.push(Array)  &&
          (i = (path.length - 1)) &&
         (() => path.splice(i,1))
        ];

        if (typeObj)
        break;

      case ("object"):
        //  pick specific class instance
        typeObj = ["cls", obj.constructor.name,
          () => path.push(obj.constructor)  &&
          (i = (path.length - 1))           &&
         (() => path.splice(i,1))
        ];
        break;

      case ("function"):
        //  pick specific class object
        if (obj.prototype)
        typeObj = ["cls", obj.prototype
                             .constructor.name,
          () => path.push(obj.prototype)    &&
          (i = (path.length - 1))           &&
         (() => path.splice(i,1))
        ];
        else
        //  traverse object with function
        if (!obj.prototype)
        typeObj = ["fnc", obj,
          () => path.push(obj)    &&
          (i = (path.length - 1)) &&
         (() => path.splice(i,1))
        ];
        break;

         ////////////////////////////
        // -----------------------
       //   at path struct leaf
      // -----------------------

      case ("string"):
        typeObj = ["str", String,
          () => path.push(String) &&
          (i = (path.length - 1)) &&
         (() => path.splice(i,1))
        ];
        break;

      case ("number"):
        typeObj = ["num", Number,
          () => path.push(Number) &&
          (i = (path.length - 1)) &&
         (() => path.splice(i,1))
        ];
        break;

      case (true):
      case (false):
        typeObj = [(obj), Boolean,
          () => path.concat([key, obj]) &&
          (i = (path.length - 2))       &&
         (() => path.splice(i,2))
        ];
        break;

      default:
        return [undefined];
     }

     return typeObj;
  }

    ////////////////////////////
   // resolve path controller
  /*  if path does not exist
   …  util fn returns paths for ease of use
   …  error doesn't throw
  ///                                     */
  function resolvePath (pathObj) {
    var [ TYPE, obj, updatePath, onNextEntry ]
       = resolveType(pathObj);

    if (TYPE === undefined)
    return err.INPUT(path.concat([obj])
              .filter(str =>
               typeof str === "string")
              .join("."))
        &&   ((undefined));

    //  undefined at query leaf need not return
    if (typeof this === "undefined"
    && (       TYPE === "str"
    ||         TYPE === "num"
    ||         TYPE === "cls"
    ||  typeof TYPE === "boolean"))
    return err.PATH(path.concat([obj])
              .filter(str =>
               typeof str === "string")
              .join("."))
        &&   ((undefined));

    if (typeof TYPE === "string")
    switch (TYPE) {

         ////////////////////////////
        // -----------------------
       //    inside path struct 
      // -----------------------

      case ("obj"):
        //  traverse paths deeper in
            traverseObject(path, pathObj);
            return;

      case ("arr"):
        //  loop through paths or keys at leaf
            traverseArray(path, pathObj);
            break;

         ////////////////////////////
        // -----------------------
       //    custom resolver
      // -----------------------

      case ("fnc"):
            traverseFunction(obj);
            break;

         ////////////////////////////
        // -----------------------
       //   at path struct leaf
      // -----------------------

      case ("str"):
      case ("num"):
        //  fetch value or object at path leaf
            entries.push([
               path.concat([pathObj]),
                       this[pathObj]
            ]);
            break;

      case (typeof pathObj === "object"
        &&  "cls"):
        //  filter values by class instance
            filterByClassInstance(obj.name);
        break;

      case (typeof pathObj === "function"
        &&  "cls"):
        //  filter values by class objects
        if (typeObj === Object) {
            filterByClassInstance("Object"),
            filterByClassObject("Object");
        }
        else
        if (typeObj === Array) {
            filterByClassInstance("Array"),
            filterByClassObject("Array");
        }
        else
        //  class object
        if (typeObj.constructor) {
            filterByClassObject(typeObj
                               .prototype
                               .constructor
                               .name);
        }
        break;
    }
    else
    if (typeof TYPE === "boolean") {
        resolveBoolean(path);
    }

    if (updatePath)
        updatePath();
  }

  function filterByClassInstance (className,
                                  path=path,
                               entries=entries) {
    if (typeof this      !== "object"
    ||  typeof className !== "string")
    return;

    if (this instanceof Array)
    for (let [idx,val] of Object.entries(this)) {
     if (typeof val === "object"
     &&         val.constructor.name
                    ===    className)
     entries.push([
        path.concat([Array, idx,
                 val.constructor]),
        val,
     ]);
    }
    else
    for (let [key,val] of Object.entries(this)) {
     if (typeof val === "object"
     &&         val.constructor.name
                    ===    className)
     entries.push([
        path.concat([this.constructor, key,
                      val.constructor]),
        val,
     ]);
    }
  }

  function filterByClassObject (className,
                                path=path,
                             entries=entries) {
    if (typeof this      !== "function"
    || (typeof className !== "string"
    &&  typeof className !== "object"))
        return;

    //  non-object types, special case
    if (typeof className === "object")
    switch (className) {
      case (String):
        return filterByType(String);

      case (Number):
        return filterByType(Number);

      case (Boolean):
        return filterByType(Boolean);
    }

    var classObj;
   /////
    if (!this instanceof Array)
    switch (typeof this) {
      case ("object"):
        classObj = this.constructor;
        break;

      case ("function"):
        classObj = this;
        break;

      default: // k, type mismatch
       return;
    }

    if (this instanceof Array)
    for (let [idx,val] of Object.entries(this)) {
     if (typeof val === "function"
     &&         val.prototype.constructor.name
                    ===              className)
     entries.push([
        path.concat([Array, idx]), val,
     ]);
    }
    else
    for (let [key,val] of Object.entries(this)) {
     if (typeof val === "function"
     &&         val.prototype.constructor.name
                    ===              className)
     entries.push([
        path.concat([classObj, key]), val,
     ]);
    }
  }

  function filterByValueType (TYPE, path=path,
                              entries=entries) {
    var curObjectClass;
   /////
    if (!this instanceof Array)
    switch (typeof this) {
      case ("object"):
        curObjectClass = this.constructor;
        break;

      case ("function"):
        curObjectClass = this;
        break;

      default: // k, type mismatch
       return;
    }

    var classObj;
   /////
    switch (TYPE) {
      case (String):
            TYPE="string";
        classObj=(String);
        break;

      case (Number):
            TYPE="number";
        classObj=(Number);
        break;

      case (Boolean):
            TYPE="boolean";
        classObj=(Boolean);
        break;

      case ("string"):
        classObj=String;
        break;

      case ("number"):
        classObj=Number;
        break;

      case ("boolean"):
        classObj=Boolean;
        break;

      default:
       return;
    }

    if (this instanceof Array)
    for (let [idx,val] of Object.entries(this)) {
     if (typeof val === TYPE)
     entries.push([
        path.concat([Array, idx, classObj]), val,
     ]);
    }
    else
    for (let [key,val] of Object.entries(this)) {
     if (typeof val === TYPE)
     entries.push([
        path.concat([curObjectClass, key,
                              classObj]), val,
     ]);
    }
  }

  function resolveBoolean (key, bool,
                            entries
                          = entries) {
    if (typeof this[key] === "undefined")
    return jsonion.err.PATH(pre.concat([key])
                  .filter(str =>
                   typeof str === "string")
                  .join("."))
           &&    ((undefined));

    //  unknown struct entails deeper in
    if (this[key] instanceof Object
    && !pre.find(obj =>
          typeof obj === "function" &&
                 obj !== Array      &&
                 obj !== Object     &&
                 obj !== String     &&
                 obj !== Number))
    switch (bool) {
      case (true):
        //  queried key get through
            return [[
              pre.concat([bool, key]),
            ]];

      case (false):
        //  queried key fall off
            return [[
              [key], this[key]
            ]];
    }
    else
    //  query path is value or is in class obj
    switch (bool) {
      case (true):
        //  direct key-value pair returns
            return [[
              [key], this[key]
            ]];

      case (false):
        //  prefixed key-value pair returns
            return [[
              pre.concat([bool, key]), this[key]
            ]];
    }

    //
    // to consider … is this configuration ok?  
    //
  }

 ///////////////////////////////////////////////
  
  function parseEntries (entries=entries) {
    if (this === jsonion) {
    let result = new Object();

    if (prepend === false)
    for (let entryObj of entries) {
         mergeIn(result, entryObj
                        .filter(key =>
                         typeof key === "string")
    )}
    else {
    let prefix
     = (typeof prepend === "function")
     ?         prepend
     :        (jsonion.prepend =
               flattenCamelCase);

    for (let entryObj of entries) {
         mergeIn(result, prefix(entryObj));

    }}   return result;   }
    else
    if (!entries.length)
         return undefined;
        
    else return entries;
        /////////////////
  }

  function mergeIn (result, entry) {
    if (!entry instanceof Array
    ||  !entry.length === 2
    ||  (typeof entry[0] !== "string"
    &&  (typeof entry[0] !== "object"
    ||         !entry[0] instanceof Array
    ||         !entry[0].every(str =>
                        typeof str === "string"
                            && str.length)))) {
    jsonion.cur = ["jsonion", "prepend"],
    jsonion.err.MISCONFIG(["entry", [entry]]);
                                       return;
    }

    recursive(result, entry);
  }

  function recursive (subtree, entryObj) {
    let path
      = entryObj[0].shift();

    if (entryObj[0].length) {
    if (typeof subtree[path] !== "object")
               subtree[path] = {};
               recursive(subtree[path],
                         entryObj);

    }     else subtree[path] = entryObj[1];
  }

  function flattenCamelCase ([pathObj, val]) {
    if (pathObj.length === 2)
    return pathObj.shift() && arguments[0];

    var key;
    let iterator = pathObj.values(),
               n = pathObj.length/2;

    for (let i=0; i<n; i++) {
         let bfr   = iterator.next().value,
             isArr = (bfr === Array && true);

         let type  = (bfr !== Array && bfr) ||
                     iterator.next().value;
         let path  = iterator.next().value;

         if (i === 0)
             key = path;

             else
             key = key + path[0].toUpperCase()
                       + path.substring(1);
    }

    return [[key], val];
  }

 //////////////////////////////////////////////-

  function getConfig () {
    //  config
    if (typeof jsonion === "object") {
        jsonion.cur=["jsonion","pick"];
    err=jsonion.err;
    if (jsonion.prepend) var pick=jsonion.pick;
                    else var{pick,prepend}
                                 =jsonion;
    }
    else
    if (typeof pick === "function")
    var { err, prepend }=pick;
    else throw "jsonion baby cry, byting";

    if (typeof err !== "object")
               err = new Object();

    if (typeof err.PATH !== "function")
               err.PATH = (...msg) =>
    console.error("PATH",  ...msg);

    if (typeof err.INPUT !== "function")
               err.INPUT = (...msg) =>
    console.error("INPUT",  ...msg);

    if (typeof err.MISCONFIG !== "function")
               err.MISCONFIG = (...msg) =>
    console.error("MISCONFIG",  ...msg);
  }
}
