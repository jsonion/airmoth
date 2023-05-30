 ///////////////////////////
//  Module: array wrapper
/*      ... array object ready for more contexts

 -  executable array for querying upfront?
   (object with a front-facing function)

 -  one file open in multiple tabs, reactive?
 -  single data view rendered in two interfaces?

 -  relational database abstraction?
    
 */
//  … maintaining object to object equality
//   (while drafting out "aircord-framedrop")

class jsonion {
constructor() {
return Object.assign(jsonion, {
  ///////////
 // config

  osType: "Linux" || "Windows" || "Mac OS X",

  screenSize: {
       width: (typeof window !== "undefined")
                    ? window.innerWidth  : 0,
      height: (typeof window !== "undefined")
                    ? window.innerHeight : 0,
  },

  framerateCapture: 60,
  framerateVideo: 29.975,
  videoSize: {
    w:640, h:480
  },
  padding: {
    activityClip: 500,
    keystrokeMin: 50,
    keystrokeMax: 500,
  },
  captureDelayOffset: 0,

  undoCtl: {
    restoreStateHotkey:["Ctrl","Shift","X"],
    clearHistoryHotkey:["Ctrl","Shift","C"],
    autoCorrectInterval: 5000,
    linesInView: 50,
  },
  appContextDefaults: {
    tabs: {
      fixedOrder: true,
        overflow: true,
    },
    workspaces: 1,
  },

  ///////////
 // runtime

  onLoad: (execFn)=>setTimeout(execFn, 20), /*
   … addEventListener("DOMContentLoaded") */

  ////////////
 // backbone

  pick: function(){ return new Object() },
  prepend: (pre, ...key) => {
    key = (key.length === 1) ? key[0] : key[1];
    key = (pre && prepend &&
           pre !== key)
        ?  pre + key[0].toUpperCase()
               + key.substring(1)
        :  key;
    return key;
  },

  rx: {
      fnName: /(?:(class|function\**) ([^\s\{]+|[^\s\(]+)|\([^\)]*\)\s*=>\s*{)/g,
    classExt: /class (.+) (?:extends (.+) \{|\{)/g,
  },

  log: void function(){},
  err:{ TYPE: "Type mismatch",
        PATH: "Path not found",
       INPUT: "Invalid input parameter",
       SCOPE: "Value out of scope",
      FORMAT: "Value format invalid",
      OUTPUT: "Function output invalid",
   MISCONFIG: "Misconfiguration",
    suppress: false,
         log: void function(){},
   reportArgDepth: 3,
   reportArgValue: false,
   makeExecutable:
  (typeof executableErrorMap === "function" &&
          executableErrorMap)               ||
   function (errorMap) {
   Object.entries(this).forEach(([e,str]) => {
   if (typeof str === "string")
       errorMap[e] = function (...msg) {
       return (
       errorMap.push([e,
      (!msg.length) ? str : `${str}:`, ...msg]))
   }})}
  },

  delimiter: "—",
})}}

new jsonion();
    jsonion.onLoad(() => {
                  /// / //
                 /// / //

jsonion.log = consoleLog;
jsonion.err.log = consoleError;
jsonion.err.makeExecutable 
              = executableErrorMap;
jsonion.err.makeExecutable(jsonion.err);

const recorder
    = ScreenRecorder.video(jsonion);

const recorderApp
    = new AppContext("recorder", 1);

const codeEditor
    = new AppContext(new SublimeText(), {
          hasTabs: true,
          tabsOverflow: true,
          tabsFixedOrder: false,
}, /* 'aircord-framedrop', 'commonmark@0.30.0', 'airmoth.commonmark', 'jsonion-reactive' */);

const browser
    = new AppContext("browser", {
          hasTabs: true,
          tabsOverflow: true,
          tabsFixedOrder: true,
});

recorder.workspaces[0].add(recorderApp,
                            codeEditor, browser);
});

class Recording {
  track = new Array();

  ///////////////////////////////
 //  ... there be methods like 

  addAction(){}
  removeLastAction(){}
  removeActionByIndex(){}
  removeActionsByOffset(){}
}

class ActionKeyframe {
  action = "";
  appCtx = [];

  framedrops = new Array();
  startState = {};
 /// … pointer_x, pointer_y, num_of_inserted_chars, offset_L, offset_R, offset_up, offset_down, t0, t1, ...
    endState = {};
       track = [];

  metadata = {
 /// … framerate, framerateMs, countFrames, countFramesStretched, countFramesSlicedOut
  };

 ///////////////////////////////////////////////
  isDeleted = false;

  constructor (actionLabel, appContext,
                 framerate, params = {}) {
    if (typeof actionLabel !== "string"
    ||  typeof framerate   !== "number"
    ||         !appContext instanceof Array
    ||             !params instanceof Object)
    jsonion.cur = this,
    jsonion.err.INPUT(false,
             [ "appContext",[appContext] ],
             ["actionLabel",[actionLabel]],
             [  "framerate",[framerate]  ],
             [     "params",[params]     ]);

    if (params instanceof Object) {
    let args
     =  Object.entries(params);
    ///
    for (let [key,val] of args) {
     if (typeof this[key] === "undefined"
             && this[key] !==  undefined)
      jsonion.cur = [this, "params", key],
      jsonion.err.INPUT(val);
    }}

    Object.assign(this, {
       action: actionLabel,
       appCtx: appContext,
       framerate: framerate,
       framerateMs: 1000 / Math.abs(framerate),
    }, params);
  }

  dropOffset(){}
}

class ScreenRecorder {
      Screen;
    listener;

  frameIndex = -1;
  recordingStartedAt = -1;

  static video (jsonion) {
    let cfg = jsonion.pick
      ("osType",
       "videoSize",
       "screenSize",
       "framerateVideo",
       "framerateCapture",
       "captureDelayOffset",
       "ffmpegStreamWriter",
      {"padding":[ "activityClip",
                   "keystrokeMin", 
                   "keystrokeMax" ]});

    let Screen = new Workspaces(1);
    let listener = new InputActivity(Screen);

     /////////////////////////
    //  Screen(sublimeText);

    return new ScreenRecorder({ Screen, ...cfg,
                                   listener });
  }

  constructor (cfg) {
    if (!cfg instanceof Object)
    return;

    Object.entries(cfg).forEach(([key,val]) => {
      if (this.hasOwnProperty(key))
          this[key] = val;
      else
          jsonion.cur = this;
          jsonion.err.INPUT([key,[val]]);
    });
    
    Object.assign(this.listener, {
      pointerMotionFilter: new MotionFilter(),
        wheelMotionFilter: new MotionFilter(),
         zoomMotionFilter: new MotionFilter(),
    });
}}

class InputActivity {
  listenerFns = [];

  workspaces;
  appContext;
  curWindowTab;

  pointerMotionFilter;
  scrollMotionFilter;
  zoomMotionFilter;

  static activeTime;

  static activeKeys=0;
  static keydown;
  static keyup;

  static CAPSLOCK = false;
  static INSERT = false;
  static SHIFT = false;
  static CTRL = false;
  static ALT = false;
  static OS = false;

  static pointermove;
  static pointerdown;
  static pointerup;
  static leftclick;
  static wheel;
  static drag;

  static pointerX;
  static pointerY;

  static SWITCH_WORKSPACE_COUNT = 0;
  static ALT_TAB_COUNT = 0;
  static CTRL_TAB_COUNT = 0;

  static tryAltTab = undefined;
  static tryCtrlTab = undefined;
  static tryWorkspace = undefined;
  static tryAt = -1;

  static clipboard = null;

  static pointerMotionFilter = null;
  static   wheelMotionFilter = null;

  constructor (workspaces) {
    Object.assign(InputActivity, jsonion.pick
                               ("dblClickInt"));

    Object.assign(UndoCtl, jsonion.pick
  ({ undoCtl:{ autoCorrectInterval:true,
                restoreStateHotkey:true,
                clearHistoryHotkey:true,
                       linesInView:true }}));

    if (!workspaces instanceof cursorArray)
    jsonion.cur = this,
    jsonion.err.INPUT(false,["workspaces",
                            [ workspaces ]]);

    let [ appContext, curWindowTab ]
        = workspaces.extract();
          workspaces
         .subscribe(this.onAppContextChange);

    console.log(appContext, curWindowTab);

    Object.assign(this, {
            workspaces,
            appContext,
          curWindowTab,
    });
  }

  start(){}
  stop(){}

  onAppContextChange(){}

  onPointerMoved (e) {}
  onPointerPressed (e) {}
  onPointerReleased (e) {}
  onPointerWheel (e) {}
  onPointerDragStart (e) {}
  onPointerDragRelease (e) {}
  onZoom (val, timestamp) {}
  onPan (val, timestamp) {}

  onKeyTyped (e) {}
  onKeyReleased (e) {}
  onAltTab (timestamp) {}
  onAltTabReleased (key="Alt") {}

  onSwitchWorkspace(){}
  onSwitchApp(){}
  onSwitchTab(appContext, n=1) {}
  onCloseApp(){}
}

class UndoCtl {}

class MotionFilter { // ext
      track=[];
     points=[];
  framerate=1000 / 29.975;

  activityT=-1;
  actionInt=1000;

  visualize=null;
  subscribedFnList=[];

  captureDelayOffset=jsonion
 .captureDelayOffset;

  constructor (fps=25, actionInterval=5000,
                            visualize=null) {}
  subscribe (fn) {}
  unsubscribe (fn) {}
  onPointerMoved (x,y,t) {}
  onNextFrame (frameIndex, t0, t1) {}
  setTimeout (frameIndex) {}
  evaluateAction() {}
}

class SublimeText extends InputActivity {}

    ////////////////
class ArrayWrapper {
  constructor (array, returnExecFn=null,
                     classOverride=true,
                     attachIndexes=true,
                      inheritProps=[]) {
    if (array instanceof ArrayWrapper) {
    //  check for equal configuration in case
    if (array.returnExecFn  === returnExecFn
    &&  array.classOverride === classOverride
    &&  array.attachIndexes === attachIndexes
    && (
       (!array.inheritProps instanceof Array
    &&   array.inheritProps === inheritProps)
    ||  (array.inheritProps instanceof Array
    &&   array.inheritProps.every((val,i) =>
               inheritProps[i] === val))))
         return array;

         else 
         array = array.instance;
    }

    this.classOverride = classOverride;
   //////
    this.instance = (array instanceof Array
                                   && array)
     ||             (array = new Array());

   /////
    if (inheritProps instanceof Array)
    this.inheritProps = inheritProps;

    else
    if (array.inheritProps instanceof Array
    &&  array.inheritProps.length)
    this.inheritProps = array.inheritProps;

    this.attachIndexes
       = typeof attachIndexes === "boolean"
             && attachIndexes
             || true;

    if (typeof returnExecFn === "function"
            && returnExecFn.prototype)
          this.returnExecFn = returnExecFn;
   /////
    if (typeof this.returnExecFn === "function"
    &&         this.returnExecFn.prototype) {
         ////
               this.returnExecFn.bind(arr);
        return ArrayWrapper
              .bind(this.instance,
                    this.returnExecFn,
                    this.inheritProps,
                    this.classOverride,
                    this.attachIndexes);
    }
    else {
    ArrayWrapper.bind(this.instance,
                      this,
                      this.inheritProps,
                      this.classOverride,
                      this.attachIndexes);
    if (Object
       .hasOwnProperty(this, "returnExecFn"))
                       this.returnExecFn
                             = undefined;
    }
  }

         bind(){/*  ...  try  ...  */}
  static bind (object, wrapper, inheritProps,
                                classOverride,
                                attachIndexes) {
    if (!object
    ||  !wrapper
    ||  typeof object  !== "object"
    || (typeof wrapper !== "object"
    &&  typeof wrapper !== "function")) {
    if (!jsonion.err.TYPE.length)
        jsonion.cur = [ArrayWrapper, "bind"],
        jsonion.err
       .TYPE(["array",  [object]],
             ["wrapper",[wrapper]],
             ["inheritProps", [inheritProps]],
             ["classOverride",[classOverride]],
             ["attachIndexes",[attachIndexes]]);
    else
        jsonion.err.log
       (jsonion.err.TYPE +
        `: Class not found: `, classObj);
    
        return;
    }

    if (!wrapper.instance === object)
          wrapper.instance = object;

    inheritProps = inheritProps instanceof Array
                && inheritProps.filter(prop =>
                   typeof prop === "string");

    var wrapperProps=[], keys, missingProps=[],
                                ignoreProps=["length", "push", "unshift", "concat", "splice", "shift", "pop", "copyWithin"];

  { /// resolve property lists to apply ////////

    try {
    let wrapperCls = ArrayWrapper
       .getClassExtensions(wrapper);

    let objectCls = ArrayWrapper
       .getClassExtensions(object);

    if (!inheritProps.length
    &&  (inheritProps = [])) {
    //  get props for all class extensions
    if (objectCls.propertyNames)
        inheritProps
      = objectCls.propertyNames;
    else {
    for (let cls of objectCls) {
        keys = Object.getOwnPropertyNames(cls);
        inheritProps.concat(keys);

        keys = Object.getOwnPropertyNames(cls
                                   .prototype);
        inheritProps.concat(keys);
      //////////////////////////////
    }   objectCls.propertyNames = inheritProps
       .filter((val, index, self) =>
                self.indexOf(val) === index)  }}

  //////

    if (classOverride) {
    //  get props for all class extensions
    if (wrapperCls.propertyNames)
        wrapperProps
      = wrapperCls.propertyNames;
    else {
    for (let cls of wrapperCls) {
        keys = Object.getOwnPropertyNames(cls);
        wrapperProps.concat(keys);

        keys = Object.getOwnPropertyNames(cls
                                   .prototype);
        wrapperProps.concat(keys);
      //////////////////////////////
    }   wrapperCls.propertyNames = wrapperProps
       .filter((val, index, self) =>
                self.indexOf(val) === index)  }}

       ///////////////
    }   catch (e) {}    }
       
     //
    //  assign to wrapper
   //

    var bfr, testVal=Math.random();
   /////
    for (let prop of inheritProps) {
     if (ignoreProps.indexOf(prop) !== -1)
         continue;

     if (!classOverride
     ||  wrapperProps.indexOf(prop) === -1) {
     //  inherit object's method at wrapper
     if (typeof object[prop] === "function")
    ////
         wrapper[prop] = object[prop],
         wrapper[prop].bind(object);
     else {
     bfr = object[prop];
     if ((object[prop] =  testVal)
                      === testVal)
          object[prop] = bfr,
          bindSetter(prop);
     else
          bindGetter(prop);
    }}}

    let prototype
      = eval(object.constructor.name).prototype;
   /////
    if (attachIndexes) modifiesLength();

    if (object[Symbol.iterator])
    wrapper[Symbol.iterator] = function* () {
      for (let val of object) {
         yield val;
    }};
    else
    if (attachIndexes)
    wrapper[Symbol.iterator] = function* () {
      for (let entry of Object.entries(object)) {
       if (parseInt(key) != key)
         yield entry;
    }};
    else
    wrapper[Symbol.iterator] = function* () {
      for (let entry of Object.entries(object)) {
         yield entry;
    }};

    return wrapper;
  ///////////////////

    function bindGetter (propName) {
      Object.defineProperty(wrapper, propName, {
        get: () => object[propName],
      });
    }

    function bindSetter (propName) {
      Object.defineProperty(wrapper, propName, {
        get: () => object[propName],
        set: (val) => (object[propName] = val),
      });
    }

    function appendNewIndexes (n) {
      for (var i=object.length;
               i<object.length + n; i++) {
        if (!object.hasOwnProperty(i))
             Object.defineProperty(wrapper, i, {
               get: () => object[i],
               set: (val) => (object[i] = val),
        }),  Object.defineProperty(wrapper,
                                  -(i + 1), {
               get: () =>
                 object[object.length-i],
               set: (val) => (
                 object[object.length-i] = val
               ),
        });
      }
    }

    function modifiesLength() {
    if (object.hasOwnProperty("length"))
        Object.defineProperty(wrapper, "length", {
          get: () => object.length,
          set: (len) => (object.length = len),
    });

    if (prototype.hasOwnProperty("push"))
    wrapper.push = function (...vals) {
      appendNewIndexes(vals.length);
      return object.push(...vals);
    };

    if (prototype.hasOwnProperty("unshift"))
    wrapper.unshift = function (...vals) {
      appendNewIndexes(vals.length);
      return object.unshift(...vals);
    };

    if (prototype.hasOwnProperty("concat"))
    wrapper.concat = function (...arrays) {
      var n=0;
      arrays.forEach(arr => (n+=arr.length));

      if (n>0) appendNewIndexes(i);

      return object.concat(...arrays);
    };

    if (prototype.hasOwnProperty("splice"))
    wrapper.splice = function (i, del, ...vals) {
      var n = vals.length;

      if (i < object.length
      &&  del > 0)
          n -= object.length - 1 - i - del;

      if (n>0) appendNewIndexes(i);

      return object.splice(i, del, ...vals);
    }}
  }

  static getClassExtensions = (classObj) => {
     //  to run after class is constituted
     let bfr
   = new ArrayWrapper([],
    (classObj) => {
      jsonion.cur = [ArrayWrapper,
                    "getClassExtensions"];

      //  resolve class object
      try {
      switch (typeof classObj) {
        case "string":
          classObj
        = eval(classObj);
          break;

        case "object":
          classObj
        = eval(classObj.constructor.name);
          break;

        case "function":
          try {
          if (typeof classObj
                    .arguments === "object")
              return [Function];
          } catch (e) {}
      }}    catch (e) { jsonion.err
                       .MISCONFIG(classObj) }

      if (typeof classObj !== "function") {
      if (!jsonion.err.MISCONFIG.length)
           jsonion.cur = [ArrayWrapper,
                         "getClassExtensions"],
           jsonion.err.MISCONFIG
         ("Class not found:", classObj);

      else
           jsonion.err.log
          (jsonion.err.MISCONFIG +
          `: Class not found: `, classObj);
          return;
      }

      //  match existing cache entry
      let entryExists = this.find(row => 
                     classObj === row[0]);
      if (entryExists) return entryExists;

      //  create cache for class object
      var rowEntries=[[classObj]],
             bfr, rx=jsonion.rx.classExt;
      do {
      if (!(bfr = `${classObj}`.match(rx))
      ||  !(bfr[2]))
          break;

          classObj = eval(bfr[2]);
          rowEntries
            .forEach(row => row.push(classObj));

      if (bfr = this.find((row) =>
                           row[0] === classObj)) {
          rowEntries.every(row =>
                           row.concat(bfr));
          break;
      }}  while (true)

      this.concat(rowEntries);

    }, false, false, ["push","concat","find"]);

    return (ArrayWrapper
           .getClassExtensions = bfr)(classObj);
  }
}

class reactiveArray extends Array {
  subscribers=[]; // autopilot below

  // override for reactive class extensions
  reactiveRefresh (i=-1, newElementsCount=0,
                         delElementsCount=0,
                                      res=null) {
    try {
    this.subscribers.forEach(fn =>
                             fn(arguments[0],
                                arguments[1],
                                arguments[2],
                                arguments[3]));
    } catch (e) {
      jsonion.cur = [this, "reactiveRefresh"],
      jsonion.err(false,
      ["i",[i]], ["res",[res]],
      ["newElementsCount",[newElementsCount]],
      ["delElementsCount",[delElementsCount]]);
    }
    return;

     //////////////////////////////////////////
    //  example subscriber method disposition
    if (i === -1
    ||  typeof i !== "number") {}
    else
    if (i >= 0) {
             if (newElementsCount === 0) {}
        else if (newElementsCount > 0) {}
        else if (delElementsCount === 0) {}
        else if (delElementsCount > 0) {}
    };
  }

  subscribe (fn) {
    if (typeof fn !== "function") {
        jsonion.cur = [this, "subscribe"],
        jsonion.err.INPUT(fn);
        return false;
    }

    this.subscribers.push(fn);
    return (this.subscribers.length - 1);
  }

  unsubscribe (fn) {
    if (typeof fn !== "function") {
        jsonion.cur = [this, "unsubscribe"],
        jsonion.err.INPUT(fn);
        return false;
    }

    this.subscribers.filter(sub => sub !== fn);
  }

  reactiveCallback (i=-1,
      newElementsCount=0,
      delElementsCount=0, res) {
   /////
    if (!this.reactiveRefresh
    ||  typeof i   !== "number"
    ||  typeof newElementsCount !== "number"
    ||  typeof delElementsCount !== "number"
    ||  Number.parseInt(i) != i
    ||  Number.parseInt(newElementsCount)
                     != newElementsCount
    ||  Number.parseInt(delElementsCount)
                     != delElementsCount
    ||  typeof res === "undefined") {
        jsonion.cur = [this,"reactiveCallback"],
        jsonion.err.INPUT(false,
       ["i",[i]], ["res",[res]],
       ["newElementsCount",[newElementsCount]],
       ["delElementsCount",[delElementsCount]]);
        return;
    }

    return (
    this.updateSubs = Object.assign(function(){
      try {
        this.reactiveRefresh(arguments[0],
                             arguments[1],
                             arguments[2],
                             arguments[3]);
      } catch (e) {
        jsonion.cur=[this, "reactiveRefresh"];
        jsonion.err.MISCONFIG(false, e,
                          arguments);
    }},{
      // ... at destructuring assignment syntax
      [Symbol.iterator]: function* () {
        yield res;
      },
      0: res,
    }));
  }

  constructor (...values) {
    if (values.length)
        super(values);

    this._unshift = this.unshift;
    this._concat = this.concat;
    this._splice = this.splice;
    this._shift = this.shift;
    this._push = this.push;
    this._pop = this.pop;

    Object.assign(this, {
    push: function (...vals) {
      if (!vals.length)
      return;

      let i = (this.length - 1);
      let res = (vals.length > 1)
              ? this._splice(-1,0,...vals)
              : this._push(vals[0]);

      return this.reactiveCallback(i,
                         vals.length, 0, res);
    },
    unshift: function (...vals) {
      if (!vals.length)
      return;

      let res = (vals.length > 1)
              ?  this._splice(0, 0, ...vals)
              :  this._unshift(vals[0]);

      return this.reactiveCallback(0,
                         vals.length, 0, res);
    },
    concat: function (arr) {
      if (!arr.length)
      return this;

      let i = this.length;
      let res = this._concat(arr);

      return this.reactiveCallback(i,
                          arr.length, 0, res);
    },
    splice: function (i, del, ...vals) {
      if (del         === 0
      &&  vals.length === 0)
      return;

      if (i >= this.length)
          i = i % this.length;
      else
      if (i < 0)
          i = (this.length + i) % this.length;

      let res = this._splice(i, del, ...vals);
      let refresh = [i,
           vals.length, del, res]

      return this.reactiveCallback(i,
                         vals.length, del, res);
    },
    shift: function (n=1) {
      if (!this.length)
      return 0;

      if (n > this.length)
          n = this.length;

      var res, refresh;
      if (n === 1) {
          res = this._shift();
      if (typeof res !== "undefined")
          refresh = [0, 0, 1];
      }
      else
      if (n > 1) {
      if (n > this.length)
          n = this.length;
        res = this._splice(0, n);
      if (res.length)
          refresh = [0, 0, res.length];
      }

      if(refresh)
      return this.reactiveCallback(...refresh,
                                          res);
    },
    pop: function (n=1) {
      if (!this.length)
      return 0;

      var res, refresh;
      if (n === 1) {
          res = this._pop();
      if (typeof res !== "undefined")
          refresh = [this.length-1, 0, 1];
      }
      else
      if (n > 1) {
      if (n > this.length)
          n = this.length;
        res = this._splice(this.length-n-1,
                                         n);
      if (res.length)
          refresh
       = [this.length - res.length, 0,
                        res.length];
      }

      if (refresh)
      return this.reactiveCallback(...refresh,
                                          res);
    }});

    var execFn = this.returnExecFn  ||
                 this.constructorFn ||
                 this.executableObj ||
                 this.execFn;

    if (typeof execFn === "function"
    &&        (execFn  =    execFn())
    &&  typeof execFn === "function"
    &&  Object
         .keys(execFn))
        return execFn;
      //////////////////
  }
}

class cursorArray extends reactiveArray {
  curIndex    = 0;
  maxLength   = 0;
  hasOverflow = true;

  subscribers = [];
  parentArray = [];

  arrayWrapper = null; // … hm, hm ...

  constructor (...values) {
    super(values);

    let wrapArray;
    if (wrapArray)
        wrapArray  /*
      \           /
       \         /
        \       /
         \     /
          \  */
  }

  reactiveRefresh (i=-1,
     newElementsCount=0,
     delElementsCount=0, cursorArrayPath=null) {
    let parentNode = this.parentArray;

    if (cursor_changed) {}
    else
    if (offset_removed) {}

    if (!cursorArrayPath)
         cursorArrayPath = [this.get()];
    else cursorArrayPath.unshift(this());

    if (parentNode instanceof cursorArray
    ||  parentNode instanceof reactiveArray)
        parentNode
       .reactiveRefresh(arguments[0],
                        arguments[1],
                        arguments[2],
                        arguments[3]);
    else
    this.subscribers.forEach(fn =>
                             fn(arguments[0],
                                arguments[1],
                                arguments[2]));
  }

  get() {
    return this[this.curIndex];
  }

  next (i=1) {
    return this.set(this.curIndex+i);
  }

  prev (i=1) {
    return this.set(this.curIndex-i);
  }

  set (i=1) {
    if (typeof i !== "number")
        jsonion.cur = [this, "set"],
        jsonion.err.INPUT(false,["i",[i]]);

    i = parseInt(i);
    
    if (!this.hasOverflow) {
    if (i > this.length - 1)
        i = this.length - 1;
    }
    else
    if (i >= this.length)
        i = i % this.length;
    else
    if (i < 0)
        i = (this.length + i) % this.length;

    return [i, this.reactiveCallback(i)]; // …
  }

  append (...params) {
    return this.insert(this.length - 1,
                             ...params);
  }

  insert (index, ...params) {
    return this.splice(index, -1, ...params);
  }

  remove (index, count=1) {
    if (typeof count === "number")
         count=Math.trunc(count);
    else
    jsonion.cur = [this, "remove"],
    jsonion.err.INPUT(false, ["count",[count]]);

    var res = this.splice(index, count);

    if (this.curIndex > index)
        this.curIndex -= count;

    return res;
  }

  extract (...vals) {
    var obj=this, i;
    var val, bfr, result, res;

   ////////////////////////////////////////////

    if ((vals.length))
    i = (vals[0].length === 2               &&
         vals[0][0] instanceof cursorArray  &&
         Number.isInteger(vals[0][1])       &&
         Number.parseFloat(vals[0][1])
      == Number.parseInt(vals[0][1]))
    ||  (vals.find(i =>
                   i.length === 2
               &&  i[0] instanceof cursorArray
               && (!isNaN(i[1]))
               &&   parseInt(i[1]) == i[1]))
    ||  [this, 0];

    if (!vals.length)
    result = [];

    else
    result = Object.assign(new Object, {  
    [Symbol.iterator]: function* () {
     let keys=Object.keys(obj).sort((a,b)=>a>b);
     for (let i=0; i<=keys.at(-1); i++) {
      if (typeof obj[i] !== "undefined")
           yield obj[i];
      
      else yield undefined;
    }}});

   ////////////////////////////////////////////

    if ((vals.length))
    for (let val of vals) {
    ///  immediate array query
         bfr
       = obj.find(el =>  el === val
                     || (el.label &&
                         el.label == val))  ||
    ///  in cursorArray fractal
         obj.find(el => {
         if (el instanceof cursorArray) {
             res = el
                  .extract(vals.slice(i[0]),i);
         if (res) {
             result.push([val, res]);
             i[0] = vals.length;
             return true;
         }}});

         if (i[0] === vals.length)
         break;

         //
         if ((i[0] = i[0] + 1) !== (vals.length)
         &&  (typeof bfr       === "undefined"
         ||         !bfr instanceof cursorArray))
         break;

         if (bfr) obj=bfr,
         result[i[0]]=bfr;
    }
    else
    do {
         if (obj instanceof cursorArray)
             result.push(obj = obj.get());
         else
         if (typeof obj !== "undefined")
             result.push(obj), 
                         obj=undefined;
       else break;
    } while (true)

    if (!vals.length && result.length)
    return result;

    if (vals.length
    &&  Object.keys(result).length)
    return result;
  }

  subscribe (fn) {
    if (typeof fn !== "function") {
        jsonion.cur = [this, "subscribe"],
        jsonion.err.INPUT(fn);
        return false;
    }

    let parentArray = this.parentArray;

    if (parentArray instanceof cursorArray ///
    ||  parentArray instanceof reactiveArray)
    return parentArray.subscribe(fn);

    else
    this.subscribers.push(fn);

    return (this.subscribers.length - 1);
  }

  unsubscribe (fn) {
    if (typeof fn !== "function") {
        jsonion.cur = [this, "unsubscribe"],
        jsonion.err.INPUT(fn);
        return false;
    }

    let parentArray = this.parentArray;

    if (parentArray instanceof cursorArray
    ||  parentArray instanceof reactiveArray)
    return parentArray.unsubscribe(fn);

    else
    this.subscribers.filter(sub => sub !== fn);
  }

  toString() {
    jsonion.cur = [this, "toString"];

    var result = [];
    var res = this.extract()
                  .forEach(obj => {
        if (typeof obj === "string")
        return result.push(obj);

        if (typeof obj === "number")
        return result.push(`${obj}`);

        if (obj instanceof cursorArray)
        return (obj.label)
              ? result.push(obj.label)
              : result.push(obj.curIndex);
        else
        jsonion.err.TYPE(false, obj);
    });

    if (res.length)
    return res.join(jsonion.delimiter || "-");
  }
}

class AppContext extends cursorArray {
    label = "";

  hasTabs = false;
  maxTabs = 1;

  tabsOverflow;
  tabsFixedOrder;

  constructor (...params) {
    var label="", maxTabs, cfg={};

    if (typeof params[0] === "string")
        label = params.shift();

    if (typeof params[0] === "number"
    &&         params[0] > 0)
        maxTabs = Math.trunc(params.shift());

    if (params[0] instanceof Object)
        cfg = params.shift();

           ///////////////////

            super(...params);
    Object.assign(this, jsonion.pick
 ({ textDefaults:{ tabs: true }}), cfg);

    if ((label))
    this.label = label;

    if (this.hasTabs === false)
    this.maxLength = this.maxTabs = 1;
    else
    this.maxLength = (maxTabs)
                   ?  maxTabs : this.maxTabs;
  }

  next (i=1) {
    i = this.set(this.curIndex+i);
    if (this.hasFixedOrder)
    return i;
    return this.setAhead(i);
  }

  prev (i=1) {
    i = this.set(this.curIndex-i);
    if (this.hasFixedOrder)
    return this[i];
    return this.setAhead(i);
  }

  setAhead (i) {
    this.curIndex=0,
    this.splice(0,0,
      this.splice(i,1));

    return this[0];
  }
}

class Workspaces extends AppContext {
  constructor (n, cfg=null) {
    if (typeof n !== "number")
    jsonion.cur = this,
    jsonion.err.INPUT(false, ["n",[n]]);

    if (typeof cfg !== "object")
        cfg = null;

    super({
      hasTabs: (n > 1),
      maxTabs: (n > 0) ? n : -1,
      tabsOverflow: true,
      tabsFixedOrder: true, ...cfg,
    });

   /////
    for (let i=0; i<n; i++) {
         let index = new AppContext(1);
             index.label = i;
        ///
         this.push(index);
    }
  }
}

/*////////////////////////////////////////////*

    jsonion.err
  … iterable log, with executable error types

   (array with functions at subkeys)
 
 *////////////////////////////////////////////*/

   class executableArray extends ArrayWrapper {}
function executableErrorMap (errorMap) {
  if (typeof errorMap !== "object")
  return;

 /// Object.getOwnPropertyNames(errorMap);

  var self, depth=1, throws;
  if (errorMap === this) {
      errorMap = new executableArray();
      var self = this;
  }
  else
  if (!errorMap instanceof executableArray)
       errorMap =
            new executableArray(errorMap);

  console.log(errorMap instanceof Array);
  console.log(errorMap instanceof ArrayWrapper);
  console.log(errorMap instanceof executableArray);

  console.log(Object.getOwnPropertyNames(errorMap));

  Object.entries(this).forEach(([key,str]) => {
  if (typeof str === "string") {
  //  set up executable error message types
      errorMap[key]=function (...msg) {
      depth=0;

      if (msg[0] === false) throws=true,
          msg[0].shift();

      for (var i=0; i<msg.length; i++) {
        if (typeof msg[i] !== "string") {
            msg[i] = [evalArg(msg[i])];

        // "entry" [key,[value]] pair 
        if (msg[i].length === 1
        &&  msg[i][0] instanceof Array)
            msg[i]
          = msg[i][0];
      }}

      errorMap.push([key,
     (!msg.length) ? str : `${str}:`, ...msg]);

           /////////////

          if (throws)
              errorMap.unshift(false);

          if (errorMap.cur)
              errorMap.at(-1)
     .unshift(errorMap.cur);

     else if (jsonion.cur)
              errorMap.at(-1)
     .unshift(jsonion.cur);

          if (errorMap.log)
      return (errorMap.log(errorMap.at(-1)));

     else if (throws)
              throw errorMap.at(-1).shift()
                 && errorMap.at(-1);
  }}
  else
  if (self)
      errorMap[key]=str || (!"function");
  });

  if (self)
  jsonion.err = errorMap;
  
  var propertyOf = errorMap;
  do {
    Object.defineProperty(propertyOf, "cur", {
      get: () => errorMap.__cur
              && errorMap.__cur[0],
      set: (fn) => {
      switch (typeof fn) {
        case ("string"):
          if (fn.length)
              errorMap.__cur = [fn];
          break;

        case ("object"):
          var res, fnName, objPath=[];

          if (fn instanceof Array) {
          if (typeof fn[0] === "function")
              fnName=fn.shift();
          if (fn.every(str => {
          if ((typeof (str) == "string"))
               return (str  ||  false) // len
          }))
               objPath
             = fn;
          }
          else
          fnName=fn;

          if (typeof fnName === "function"
          && (fnName = jsonion.rx.fnName(fn)))
          res=[ fnName[1], ...objPath ];

          else
          if (objPath.length)
          res=objPath;

          if (res)
          errorMap.__cur = [res.join(".")];
          break;

        default:
          errorMap.__cur = undefined;
    }}});

    if (propertyOf === jsonion.err)
         propertyOf = jsonion;

    else break;
  } while (-1)

  return true;
 //////////////

  function evalArg (obj, key=null) {
    depth++;

    if (obj === null)
        return null;

    //  value may be omitted in error reports
    if (jsonion.err.reportArgValue
    && (typeof obj === "string"
    ||  typeof obj === "number"
    ||  typeof obj === "boolean"))
        return obj;

    if (typeof obj === "function") {
    if (!obj.prototype)
        return ["function (arrow)"];

    let fnName = jsonion.rx.fnName.exec(obj);
    if (fnName) {
    if (fnName[2])
        return [fnName[1], fnName[2]];
    else
    if (jsonion.err.reportArgVAlue)
        return [`${obj}`];
    else
        return ["function"];
    }}

    var res;
    if (typeof obj !== "object") {
    if (typeof obj.length !== "undefined"
    ||         obj.length === 0)
        res = [typeof obj, obj.length];
    else
        res = [typeof obj];
    if (key)
        res.splice(1,0,key);
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
    if (depth <= jsonion.err.reportArgDepth)
    for (let val of obj) {
         res.push(evalArg(val));
    }}
    else
    if (Object.entries(obj).length)
    for (let [key,val] of Object.entries(obj)) {
         if (depth < jsonion.err.reportArgDepth)
         res.push(evalArg(val,key));

         else
         res.push(key);
    }}

    depth--;
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

try {
  navigator.permissions.query
     ({name:'clipboard-read'});
} catch (e) {}

function classFactory (className, ...args) {
  if (!args.length)
  return eval(className);

  let instance = eval(className)(...args);
  return instance;
}
