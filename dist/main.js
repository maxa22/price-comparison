// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cYEQv":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "c26ef22bf71e6048";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8VGZO":[function(require,module,exports) {
var _resetPassword = require("./pages/reset_password");
var _forgottenPassword = require("./pages/forgotten_password");
var _login = require("./pages/login");
var _products = require("./pages/products");
var _eventObserver = require("./classes/EventObserver");
var _product = require("./pages/product");
var _cart = require("./classes/Cart");
var _cart1 = require("./pages/cart");
(0, _products.productsPage)();
(0, _product.productPage)();
(0, _cart1.cartPage)();
(0, _login.login)();
(0, _forgottenPassword.forgottenPasswordPage)();
(0, _resetPassword.resetPasswordPage)();
window.addEventListener("scroll", (0, _eventObserver.eventObserver).notify);
window.addEventListener("click", (0, _eventObserver.eventObserver).notify);
window.addEventListener("input", (0, _eventObserver.eventObserver).notify);
window.addEventListener("popstate", (0, _eventObserver.eventObserver).notify);
(0, _eventObserver.eventObserver).subscribeToClickEvent((0, _cart.cart).updateCart);

},{"./pages/reset_password":"isELX","./pages/forgotten_password":"1ZbPG","./pages/login":"h8igk","./pages/products":"8ABQa","./classes/EventObserver":"7rlZS","./pages/product":"b4rX1","./classes/Cart":"hZDMD","./pages/cart":"7WYfd"}],"isELX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "resetPasswordPage", ()=>resetPasswordPage);
var _toastrMessage = require("../classes/ToastrMessage");
var _fetch = require("../helpers/fetch");
var _validate = require("../helpers/validate");
function resetPasswordPage() {
    if (window.location.href.indexOf("/reset_password") === -1) return;
    const password = document.querySelector(".new_password");
    const confirmPassword = document.querySelector(".repeat_new_password");
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const token = url.searchParams.get("token");
    const form = document.querySelector("form");
    const container = document.querySelector(".form-container");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        //if (!isValid(form)) return; Ovo ovdje je pravilo grešku!
        const toastr = new (0, _toastrMessage.ToastrMessage)();
        if (password.value !== confirmPassword.value) return toastr.showErrorMessage("Passwords must match."); // prettier-ignore
        const formData = new FormData(form);
        formData.append("id", id);
        formData.append("token", token);
        try {
            const response = await (0, _fetch.fetchData)("include/reset_forgotten_password.inc.php", formData);
            container.innerHTML = "";
            const message = document.createElement("p");
            Object.assign(message, {
                className: "input-container text-center",
                textContent: "Your password has been successfully changed. You can now sign in with new password. "
            });
            const goBack = document.createElement("a");
            Object.assign(goBack, {
                className: "btn btn-primary w-100 mt-m text-center",
                href: "./login",
                textContent: "OK"
            });
            container.append(message);
            container.append(goBack);
        } catch (e) {
            toastr.showErrorMessage("Something went wrong");
        }
    });
//   password.addEventListener("focus", removeErrorMessage);
//   confirmPassword.addEventListener("focus", removeErrorMessage);
}

},{"../classes/ToastrMessage":"kfa4H","../helpers/fetch":"9lkvx","../helpers/validate":"eM26N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kfa4H":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ToastrMessage", ()=>ToastrMessage);
class ToastrMessage {
    constructor(timeout = 2000){
        this.timeout = timeout;
        this.element = document.createElement("p");
        this.element.setAttribute("role", "alert"); // For accessibility
        this.timeoutRef = null; // Store timeout reference
    }
    showSuccessMessage = (message)=>{
        this.prepareToast();
        this.show("toastr-success-message", message);
    };
    showErrorMessage = (message)=>{
        this.prepareToast();
        this.show("toastr-error-message", message);
    };
    prepareToast = ()=>{
        if (document.body.contains(this.element)) this.element.remove();
        this.element.className = ""; // Reset classes
        if (this.timeoutRef) clearTimeout(this.timeoutRef); // Clear existing timeout
    };
    show = (className, message)=>{
        document.body.append(this.element);
        this.element.classList.add(className);
        this.element.textContent = message;
        this.timeoutRef = setTimeout(()=>{
            // Set and store the new timeout
            this.hideMessage();
        }, this.timeout);
    };
    hideMessage = ()=>{
        this.element.classList.remove("toastr-success-message", "toastr-error-message");
        this.element.remove();
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"9lkvx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fetchData", ()=>fetchData);
parcelHelpers.export(exports, "getData", ()=>getData);
async function fetchData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        body: data
    });
    const result = await response.json();
    return result; // parses JSON response into native JavaScript object
}
async function getData(url) {
    const response = await fetch(url, {
        method: "GET"
    });
    return response.json(); // parses JSON response into native JavaScript object
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eM26N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isValid", ()=>isValid);
const errorMessage = {
    empty: "Polje ne smije biti prazno",
    notNumber: "Dozvoljeni samo brojevi",
    alphanumeric: "Dozvoljeni samo slova, brojevi i razmak"
};
const generateError = (input, key)=>{
    input.style.borderColor = "#a94442";
    input.classList.remove("h-100");
    input.parentElement.querySelector(".registration-form__error").innerHTML = errorMessage[key];
};
const isInputEmpty = (input)=>{
    if (input.value !== "" || input.getAttribute("disabled") === "true") return true;
    generateError(input, "empty");
    return false;
};
const isNumeric = (input)=>{
    let isNumber = !isNaN(input.value);
    if (isNumber || input.getAttribute("disabled") === "true") return true;
    generateError(input, "notNumber");
    return false;
};
const isAlphanumeric = (input)=>{
    const validChars = /^[a-zA-Z\p{L}0-9\s]+$/;
    if (validChars.test(input.value)) return true;
    generateError(input, "alphanumeric");
    return false;
};
const isValidInput = (validation_type, input)=>{
    let valid;
    switch(validation_type){
        case "not-empty":
            valid = isInputEmpty(input);
            break;
        case "number":
            valid = isNumeric(input);
            break;
        case "alphanumeric":
            valid = isAlphanumeric(input);
            break;
        default:
            valid = true;
    }
    return valid;
};
const isValid = (form)=>{
    const inputs = form.querySelectorAll("input, select, textarea");
    let valid = true;
    for (const input of inputs){
        const input_validation_array = input.getAttribute("data-validation")?.split(" ") || [];
        for (const validation_type of input_validation_array){
            if (isValidInput(validation_type, input)) continue;
            valid = false;
            break;
        }
    }
    return valid;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1ZbPG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "forgottenPasswordPage", ()=>forgottenPasswordPage);
var _fetch = require("../helpers/fetch");
var _toastrMessage = require("../classes/ToastrMessage");
function forgottenPasswordPage() {
    if (window.location.href.indexOf("/forgotten_password") === -1) return;
    const form = document.querySelector("form");
    form.addEventListener("submit", async (e)=>{
        e.preventDefault();
        // if (email.value === "") return showErrorMessage('Field can\'t be empty.'); // prettier-ignore
        document.querySelector(".loader").classList.add("active");
        const formData = new FormData(form);
        try {
            const response = await (0, _fetch.fetchData)("include/forgotten_password.inc.php", formData);
            form.innerHTML = "";
            const message = document.createElement("p");
            Object.assign(message, {
                className: "input-form text-center",
                textContent: "Thank you for reaching out! We have sent you an e-mail with the password reset link. "
            });
            const goBack = document.createElement("a");
            Object.assign(goBack, {
                className: "btn btn-primary w-100 mt-m text-center",
                href: "./",
                textContent: "OK"
            });
            form.append(message);
            form.append(goBack);
        } catch (e) {
            const toastr = new (0, _toastrMessage.ToastrMessage)();
            toastr.showErrorMessage("Something went wrong");
        }
        document.querySelector(".loader").classList.remove("active");
    });
}

},{"../helpers/fetch":"9lkvx","../classes/ToastrMessage":"kfa4H","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h8igk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "login", ()=>login);
var _errorHandler = require("../helpers/error_handler");
var _validate = require("../helpers/validate");
var _fetch = require("../helpers/fetch");
var _resetInput = require("../helpers/reset_input");
function login() {
    if (!document.querySelector("#login-button")) return;
    document.addEventListener("input", (0, _resetInput.removeErrorMessagesOnInput));
    const registrationForm = document.querySelector("form");
    registrationForm.addEventListener("submit", async (e)=>{
        e.preventDefault();
        if (!(0, _validate.isValid)(registrationForm)) return;
        let formData = new FormData(registrationForm);
        formData.append("submit", "");
        const result = await (0, _fetch.fetchData)("include/login.inc.php", formData);
        if (!result) return location.href = "projects";
        (0, _errorHandler.handleErrorsFromServer)(result);
    });
}

},{"../helpers/error_handler":"htD7R","../helpers/validate":"eM26N","../helpers/fetch":"9lkvx","../helpers/reset_input":"eozJQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"htD7R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "handleErrorsFromServer", ()=>handleErrorsFromServer);
parcelHelpers.export(exports, "isEmpty", ()=>isEmpty);
var _resetInput = require("./reset_input");
function handleErrorsFromServer(result, container = document.body) {
    (0, _resetInput.hideErrorMessagesFromInputs)(container);
    (0, _resetInput.setInputsBorderColor)(container, "ced4da");
    showErrorMessages(result, container);
}
function isEmpty(inputs) {
    let errorArray = [];
    for (let input of inputs){
        if (input.id === "default-firm") continue;
        if (input.value == "") {
            input.style.borderColor = "#a94442";
            input.classList.remove("h-100");
            input.parentElement.querySelector(".registration-form__error").innerHTML = "Polje ne smije biti prazno";
            errorArray.push("error");
            continue;
        }
        let body = document.querySelector("body");
        let backgroundColor = window.getComputedStyle(body, null).getPropertyValue("background-color");
        input.style.borderColor = backgroundColor == "rgb(255, 255, 255)" ? "rgba(51, 51, 51, 0.5)" : "rgba(238, 238, 238, 0.5)";
        input.parentElement.querySelector(".registration-form__error").innerHTML = "";
    }
    return errorArray;
}
function showErrorMessages(result, container = document.body) {
    for (const [key, value] of Object.entries(result)){
        let field = container.querySelector(`input[name="${key}"]`) ? container.querySelector(`input[name="${key}"]`) : container.querySelector(`select[name="${key}"]`) ? container.querySelector(`select[name="${key}"]`) : container.querySelector(`textarea[name="${key}"]`) ? container.querySelector(`textarea[name="${key}"]`) : container.querySelector(`[name="${key}"]`);
        field.style.borderColor = "#a94442";
        field.parentElement.querySelector(".registration-form__error").innerHTML = value;
    }
}

},{"./reset_input":"eozJQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eozJQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setInputsBorderColor", ()=>setInputsBorderColor);
parcelHelpers.export(exports, "hideErrorMessagesFromInputs", ()=>hideErrorMessagesFromInputs);
parcelHelpers.export(exports, "removeInputValues", ()=>removeInputValues);
parcelHelpers.export(exports, "disableInputFields", ()=>disableInputFields);
parcelHelpers.export(exports, "getInputValues", ()=>getInputValues);
parcelHelpers.export(exports, "returnInitialValueToInputFields", ()=>returnInitialValueToInputFields);
parcelHelpers.export(exports, "removeErrorMessagesOnInput", ()=>removeErrorMessagesOnInput);
function hideErrorMessagesFromInputs(container) {
    let errorMessages = container.querySelectorAll(".registration-form__error");
    for (let errorMessage of errorMessages)errorMessage.innerHTML = "";
}
function setInputsBorderColor(container, color) {
    let inputs = container.querySelectorAll("input, textarea");
    for (let input of inputs)input.style.borderColor = color;
}
function removeInputValues(container = document.body) {
    let inputs = container.querySelectorAll("input, textarea");
    for (let input of inputs)input.value = "";
}
function disableInputFields(container) {
    let inputs = container.querySelectorAll("input, textarea");
    inputs.forEach((input)=>input.setAttribute("disabled", "true"));
}
function getInputValues(inputFieldsArray) {
    let inputValuesArray = [];
    for (let input of inputFieldsArray){
        const value = input.getAttribute("value");
        inputValuesArray.push(value);
    }
    return inputValuesArray;
}
function returnInitialValueToInputFields(inputFieldsArray, inputValueArray) {
    for(let i = 0; i < inputFieldsArray.length; i++)inputFieldsArray[i].value = inputValueArray[i];
}
function removeErrorMessagesOnInput(e) {
    const container = e.target.parentElement;
    if (!container || container.querySelector(".registration-form__error").innerHTML === "") return;
    container.querySelector(".registration-form__error").innerHTML = "";
    e.target.style.borderColor = window.getComputedStyle(document.body, null).getPropertyValue("background-color") == "rgb(255, 255, 255)" ? "rgba(51, 51, 51, 0.5)" : "rgba(238, 238, 238, 0.5)";
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8ABQa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "productsPage", ()=>productsPage);
var _cart = require("../classes/Cart");
var _category = require("../classes/Category");
var _eventObserver = require("../classes/EventObserver");
var _productList = require("../classes/ProductList");
var _search = require("../classes/Search");
var _debounce = require("../helpers/debounce");
async function productsPage() {
    if (window.location.href.indexOf("/products") === -1) return;
    const products = new (0, _productList.ProductList)();
    products.loadProducts();
    const categories = new (0, _category.Category)();
    categories.loadCategories();
    (0, _search.search).setSearch();
    (0, _eventObserver.eventObserver).subscribeToScrollEvent(products.loadNextProducts);
    (0, _eventObserver.eventObserver).subscribeToClickEvent(categories.handleClick);
    (0, _eventObserver.eventObserver).subscribeToInputEvent((0, _debounce.debounce)((0, _search.search).productSearch, 200));
    (0, _eventObserver.eventObserver).subscribeToUrlUpdateEvent(products.updateProductByCategoryAndName); // prettier-ignore
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../classes/Category":"c3gki","../classes/EventObserver":"7rlZS","../classes/Search":"2W86W","../classes/ProductList":"bueJF","../helpers/debounce":"kYYSQ","../classes/Cart":"hZDMD"}],"c3gki":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Category", ()=>Category);
var _fetch = require("../helpers/fetch");
class Category {
    constructor(){
        this.categories;
        this.container = document.querySelector(".sidebar-list");
        this.activeCategory = this.getActiveCategory();
    }
    displayCategories = ()=>{
        this.container.innerHTML += `
    <li class="sidebar-item">
       <a href="" data-category="" class="sidebar-link"> All </a>
    </li>`;
        for (const category of this.categories)this.container.innerHTML += `
    <li class="sidebar-item">
       <a href="" data-category="${category.id}" class="sidebar-link"> ${category.name} </a>
    </li>`;
        this.setActiveCategory();
    };
    loadCategories = async ()=>{
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_categories"
        }));
        this.categories = await (0, _fetch.fetchData)("./includes/ajax.inc.php", form);
        this.displayCategories();
    };
    setActiveCategory = ()=>{
        const categories = document.querySelectorAll(".sidebar-item");
        for(let i = 0; i < categories.length; i++)if (this.activeCategory == i) categories[i].classList.add("active");
        else categories[i].classList.remove("active");
    };
    getActiveCategory = ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("category") ?? 0;
    };
    handleClick = (e)=>{
        if (!e.target.classList.contains("sidebar-link")) return;
        e.stopPropagation();
        e.preventDefault();
        this.activeCategory = e.target.dataset.category;
        const urlParams = new URL(window.location);
        urlParams.searchParams.set("category", this.activeCategory);
        this.setActiveCategory();
        window.history.pushState({}, "", urlParams.href);
        window.dispatchEvent(new Event("popstate"));
    };
}

},{"../helpers/fetch":"9lkvx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7rlZS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "eventObserver", ()=>eventObserver);
var _debounce = require("../helpers/debounce");
class EventObserver {
    constructor(){
        this.scrollObservers = [];
        this.clickObservers = [];
        this.inputObservers = [];
        this.urlObservers = [];
    }
    subscribeToScrollEvent = (sub)=>{
        this.scrollObservers.push(sub);
    };
    unsubscribeFromScrollEvent = (sub)=>{
        this.scrollObservers = this.scrollObservers.filter((observer)=>observer !== sub);
    };
    subscribeToClickEvent = (sub)=>{
        this.clickObservers.push(sub);
    };
    subscribeToInputEvent = (sub)=>{
        this.inputObservers.push(sub);
    };
    subscribeToUrlUpdateEvent = (sub)=>{
        this.urlObservers.push(sub);
    };
    notify = (data)=>{
        if (data.type === "scroll") this.scrollObservers.forEach((observer)=>observer(data));
        else if (data.type === "click") this.clickObservers.forEach((observer)=>observer(data));
        else if (data.type === "input") this.inputObservers.forEach((observer)=>observer(data));
        else if (data.type === "popstate") this.urlObservers.forEach((observer)=>observer(data));
    };
}
const eventObserver = new EventObserver();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../helpers/debounce":"kYYSQ"}],"kYYSQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "debounce", ()=>debounce);
function debounce(func, timeout = 300) {
    let timer;
    return (...args)=>{
        clearTimeout(timer);
        timer = setTimeout(()=>{
            func.apply(this, args);
        }, timeout);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2W86W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "search", ()=>search);
class Search {
    setSearch = ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        document.querySelector(".product-search").value = urlParams.get("name");
    };
    productSearch = (e)=>{
        if (!e.target.classList.contains("product-search")) return;
        const urlParams = new URL(window.location);
        urlParams.searchParams.set("name", e.target.value);
        window.history.pushState({}, "", urlParams.href);
        window.dispatchEvent(new Event("popstate"));
    };
}
const search = new Search();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bueJF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ProductList", ()=>ProductList);
var _fetch = require("../helpers/fetch");
var _imageObserver = require("../helpers/imageObserver");
var _loader = require("../helpers/loader");
class ProductList {
    constructor(){
        this.currentItems;
        this.page = 1;
        this.loading = false;
        this.endOfList = false;
        this.container = document.getElementById("grid-view");
    }
    displayProducts = ()=>{
        if (this.currentItems.length === 0) this.endOfList = true;
        if (this.currentItems.length === 0 && this.page === 1) return this.noProductsFound(); // prettier-ignore
        for (const item of this.currentItems)this.container.innerHTML += this.render(item);
    };
    render = (product)=>{
        return `
    <div class="product">
      <div class="product-header">
      <a href="./product?q=${product.id}" 
        class="product-name">
        <img data-src="./uploads/images/small-${product.image}" 
        alt="Munchmallow Family pack 210 g" 
        load="lazy" class="product-image">
        <span> ${product.name} </span>
        </a>
      </div>
      <div class="product-footer">
        <h4 class="product-price">
          ${Number(product.min.price).toFixed(2)} KM
        </h4>
        <img src="./uploads/images/${product.min.storeLogo}" 
        alt="${product.min.store} Logo" class="store-logo">
      </div>
      <div class="add-to-cart-button-container">
        <button class="add-to-cart-button" 
        data-id="${product.id}" 
        data-name="${product.name}" 
        data-price="${product.min.price}"
        data-image="small-${product.image}">Dodaj u korpu</button>
      </div>
    </div>`;
    };
    noProductsFound = ()=>{
        this.container.innerHTML = `<h2>No products found</h2>`;
    };
    loadProducts = async ()=>{
        this.loading = true;
        (0, _loader.showLoader)();
        const urlParams = new URLSearchParams(window.location.search);
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_products",
            page: this.page,
            category: urlParams.get("category"),
            name: urlParams.get("name")
        }));
        this.currentItems = await (0, _fetch.fetchData)("./includes/ajax.inc.php", form);
        this.displayProducts();
        (0, _imageObserver.lazyLoadImages)(".product img[data-src]");
        this.loading = false;
        (0, _loader.hideLoader)();
    };
    loadNextProducts = ()=>{
        if (this.endOfList) (0, _loader.hideLoader)();
        if (this.loading || this.endOfList) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight < scrollHeight - 200) return;
        this.page++;
        this.loadProducts();
    };
    updateProductByCategoryAndName = (e)=>{
        this.updateSearchParams();
        this.loadProducts();
    };
    updateSearchParams = ()=>{
        window.scrollTo(0, 0);
        this.page = 1;
        this.endOfList = false;
        this.container.innerHTML = "";
    };
}

},{"../helpers/fetch":"9lkvx","../helpers/imageObserver":"6zArp","../helpers/loader":"dEs08","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6zArp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lazyLoadImages", ()=>lazyLoadImages);
const imageObserver = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            imageObserver.unobserve(lazyImage);
        }
    });
});
const lazyLoadImages = (selector)=>{
    const lazyImages = document.querySelectorAll(selector);
    lazyImages.forEach((img)=>{
        imageObserver.observe(img);
    });
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dEs08":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "showLoader", ()=>showLoader);
parcelHelpers.export(exports, "hideLoader", ()=>hideLoader);
const showLoader = ()=>{
    document.querySelector(".loader")?.classList.add("active");
};
const hideLoader = ()=>{
    document.querySelector(".loader")?.classList.remove("active");
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hZDMD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cart", ()=>cart);
var _trash = require("../svg/trash");
class Cart {
    constructor(){
        this.cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        this.container = document.querySelector(".cart-container");
        this.cartQuantity = this.setCartQuantity();
        this.updateCartItemsQuantity();
        this.total = 0;
    }
    displayCartItems = ()=>{
        for (const item of this.cart)this.container.innerHTML += this.render(item);
    };
    updateCart = (event)=>{
        if (event.target.classList.contains("add-to-cart-button")) this.addToCart(event);
        else if (event.type === "input" && event.target.classList.contains("cart-item-quantity")) {
            const cartItem = this.getCartItemById(event.target.dataset.id);
            if (cartItem[0].quantity < parseInt(event.target.value)) this.addToCart(event);
            else this.decreaseCartItem(event);
        } else if (event.type === "click" && event.target.classList.contains("delete-cart-item")) this.removeItemFromCart(event);
    };
    addToCart = (event)=>{
        const id = event.target.dataset.id;
        const product = {
            id,
            name: event.target.dataset.name,
            price: event.target.dataset.price,
            image: event.target.dataset.image
        };
        const results = this.getCartItemById(id);
        if (results.length == 1) this.cart = this.cart.map((p)=>p.product.id == id ? {
                ...p,
                quantity: p.quantity + 1
            } : p);
        else this.cart = [
            ...this.cart,
            {
                product,
                quantity: 1
            }
        ];
        this.cartQuantity++;
        this.updateCartItemsQuantity();
        this.saveToDb();
    };
    decreaseCartItem = (event)=>{
        const id = event.target.dataset.id;
        this.cart = this.cart.map((prodInCart)=>prodInCart.product.id == id ? {
                ...prodInCart,
                quantity: prodInCart.quantity - 1
            } : prodInCart);
        if (this.isItemEmpty()) this.removeItemFromCart(event);
        this.cartQuantity--;
        this.updateCartItemsQuantity();
        this.saveToDb();
    };
    isItemEmpty = ()=>{
        const emptyItem = this.cart.filter((prodInCart)=>prodInCart.quantity == 0);
        if (emptyItem.length === 0) return false;
        return true;
    };
    removeItemFromCart = (event)=>{
        const id = event.target.dataset.id;
        this.cart = this.cart.filter((prodInCart)=>prodInCart.product.id != id);
        const item = document.querySelector(`.cart-item[data-id="${id}"]`);
        item && item.remove();
        this.saveToDb();
    };
    updateCartItemsQuantity = ()=>{
        const itemQuantity = document.querySelector(".header-cart-quantity");
        if (itemQuantity) {
            itemQuantity.textContent = this.cartQuantity;
            itemQuantity.style.opacity = this.cartQuantity > 0 ? "1" : "0";
        }
    };
    saveToDb = ()=>{
        localStorage.setItem("cart", JSON.stringify(this.cart));
    };
    render = (item)=>{
        return `
    <div class="cart-item" data-id="${item.product.id}">
      <div class="cart-item-image-container">
        <img class="cart-item-image" 
        src="./uploads/images/${item.product.image}" alt="Product Image">
      </div>
      <h2 class="cart-item-name">${item.product.name}</h2>
      <p class="cart-item-price"> ${item.product.price}KM</p>
      <div class="cart-item-quantity-container">
        <input type="number" value="${item.quantity}" 
        data-id="${item.product.id}" class="cart-item-quantity">
      </div>
      <span class="cart-item-total"> 
        ${(item.quantity * item.product.price).toFixed(2)}KM
      </span>
      <img class="delete-cart-item" 
      data-id=${item.product.id} src="./uploads/images/trash-bin.png">
    </div>`;
    };
    getCartItemById = (id)=>{
        const results = this.cart.filter((prodInCart)=>prodInCart.product.id == id);
        return results;
    };
    getItemQuantity = (id)=>{
        for (const item of this.cart){
            if (item.product.id === id) return item.quantity;
        }
        return 0;
    };
    setCartQuantity = ()=>{
        let quantity = 0;
        for (const item of this.cart)quantity += Number(item.quantity);
        return quantity;
    };
}
const cart = new Cart();

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../svg/trash":"bgzmk"}],"bgzmk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "trash", ()=>trash);
const trash = (id)=>`<svg data-id=${id} viewBox="0 0 24 24" style="width: 20px; height: 20px; overflow: visible; opacity: 1; z-index: 1; fill: rgb(21, 21, 21);"><path d="M0 0h24v24H0z" data-id=${id} fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b4rX1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "productPage", ()=>productPage);
var _product = require("../classes/Product");
var _productPriceHistory = require("../classes/ProductPriceHistory");
async function productPage() {
    if (window.location.href.indexOf("/product?") === -1) return;
    const product = new (0, _product.Product)();
    product.loadProductData();
    const productPriceHistory = new (0, _productPriceHistory.ProductPriceHistory)();
    await productPriceHistory.loadHistory();
}

},{"../classes/Product":"ewDDf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../classes/ProductPriceHistory":"5cYT6"}],"ewDDf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Product", ()=>Product);
var _fetch = require("../helpers/fetch");
var _loader = require("../helpers/loader");
class Product {
    constructor(){
        this.container = document.querySelector(".single-product-container");
        this.item;
        this.minPrice = 1000;
        const urlParams = new URLSearchParams(window.location.search);
        this.id = urlParams.get("q");
    }
    render = ()=>{
        this.container.innerHTML = `
    <div class="single-product">
      <div class="single-product-image-container">
        <img src="./uploads/images/${this.item[0].image}" class="single-product-image">
      </div>
      <div class="single-product-info">
        <h2 class="single-product-heading">
        ${this.item[0].name}
        </h2>
        <div class="single-product-footer">
          ${this.renderPrices(this.item[0].product_details)}
          <button class="add-to-cart-button" 
          data-id="${this.item[0].id}" 
          data-name="${this.item[0].name}" 
          data-price="${this.minPrice}"
          data-image="small-${this.item[0].image}"> Dodaj u korpu </button>
        </div>
      </div>
    </div>`;
    };
    renderPrices = (details)=>{
        const prices = JSON.parse(details);
        let priceList = "";
        for (const detail of prices){
            if (detail.price < this.minPrice) this.minPrice = detail.price;
            priceList += `
      <div class="product-footer">
        <h4 class="product-price">
          ${Number(detail.price).toFixed(2)} KM
        </h4>
        <img src="./uploads/images/${detail.storeLogo}" 
        alt="${detail.store} Logo" class="store-logo">
      </div>`;
        }
        return priceList;
    };
    loadProductData = async ()=>{
        (0, _loader.showLoader)();
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_product",
            id: this.id
        }));
        this.item = await (0, _fetch.fetchData)("./includes/ajax.inc.php", form);
        this.render();
        this.loading = false;
        (0, _loader.hideLoader)();
    };
}

},{"../helpers/fetch":"9lkvx","../helpers/loader":"dEs08","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5cYT6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ProductPriceHistory", ()=>ProductPriceHistory);
var _fetch = require("../helpers/fetch");
class ProductPriceHistory {
    constructor(){
        this.data;
    }
    loadHistory = async ()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("q");
        const form = new FormData();
        form.append("data", JSON.stringify({
            function: "get_price_history",
            id
        }));
        this.data = await (0, _fetch.fetchData)("./includes/ajax.inc.php", form);
        this.structureDataByStore();
    };
    structureDataByStore = ()=>{
        let stores = [];
        for (const priceRow of this.data){
            const results = stores.filter((store)=>store.name == priceRow.name);
            if (results.length == 1) stores = stores.map((store)=>store.name === priceRow.name ? {
                    name: store.name,
                    prices: [
                        ...store.prices,
                        priceRow.price
                    ]
                } : store);
            else stores.push({
                name: priceRow.name,
                prices: [
                    priceRow.price
                ]
            });
        }
        const colors = [
            "#e6194B",
            "#3cb44b",
            "#ffe119",
            "#4363d8",
            "#f58231",
            "#911eb4",
            "#42d4f4",
            "#f032e6",
            "#bfef45",
            "#fabed4"
        ];
        let datasets = [];
        let i = 0;
        for (const store of stores){
            datasets.push({
                label: "Price history for " + store.name,
                data: store.prices.map((row)=>row),
                fill: false,
                borderColor: colors[i],
                tension: 0.1
            });
            i++;
        }
        new Chart(document.getElementById("priceChart"), {
            type: "line",
            data: {
                labels: this.data.map((row)=>row.date),
                datasets
            }
        });
    };
}

},{"../helpers/fetch":"9lkvx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7WYfd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cartPage", ()=>cartPage);
var _cart = require("../classes/Cart");
var _eventObserver = require("../classes/EventObserver");
async function cartPage() {
    if (window.location.href.indexOf("/cart") === -1) return;
    (0, _cart.cart).displayCartItems();
    (0, _eventObserver.eventObserver).subscribeToInputEvent((0, _cart.cart).updateCart);
}

},{"../classes/Cart":"hZDMD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../classes/EventObserver":"7rlZS"}]},["cYEQv","8VGZO"], "8VGZO", "parcelRequirea77f")

//# sourceMappingURL=main.js.map
