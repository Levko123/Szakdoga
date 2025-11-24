"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/get-quota/route";
exports.ids = ["app/api/get-quota/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fget-quota%2Froute&page=%2Fapi%2Fget-quota%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fget-quota%2Froute.ts&appDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fget-quota%2Froute&page=%2Fapi%2Fget-quota%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fget-quota%2Froute.ts&appDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_L_na_Desktop_szakdolgozat_Szakdoga_main_Szakdoga_main_quota_calculator_app_api_get_quota_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/get-quota/route.ts */ \"(rsc)/./app/api/get-quota/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/get-quota/route\",\n        pathname: \"/api/get-quota\",\n        filename: \"route\",\n        bundlePath: \"app/api/get-quota/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\Léna\\\\Desktop\\\\szakdolgozat\\\\Szakdoga-main\\\\Szakdoga-main\\\\quota-calculator\\\\app\\\\api\\\\get-quota\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_L_na_Desktop_szakdolgozat_Szakdoga_main_Szakdoga_main_quota_calculator_app_api_get_quota_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/get-quota/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZnZXQtcXVvdGElMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmdldC1xdW90YSUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmdldC1xdW90YSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNMJUMzJUE5bmElNUNEZXNrdG9wJTVDc3pha2RvbGdvemF0JTVDU3pha2RvZ2EtbWFpbiU1Q1N6YWtkb2dhLW1haW4lNUNxdW90YS1jYWxjdWxhdG9yJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNMJUMzJUE5bmElNUNEZXNrdG9wJTVDc3pha2RvbGdvemF0JTVDU3pha2RvZ2EtbWFpbiU1Q1N6YWtkb2dhLW1haW4lNUNxdW90YS1jYWxjdWxhdG9yJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNxRTtBQUNsSjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0hBQW1CO0FBQzNDO0FBQ0EsY0FBYyx5RUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlFQUFpRTtBQUN6RTtBQUNBO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ3VIOztBQUV2SCIsInNvdXJjZXMiOlsid2VicGFjazovL3F1b3RhLWNhbGN1bGF0b3IvP2EwNWMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcTMOpbmFcXFxcRGVza3RvcFxcXFxzemFrZG9sZ296YXRcXFxcU3pha2RvZ2EtbWFpblxcXFxTemFrZG9nYS1tYWluXFxcXHF1b3RhLWNhbGN1bGF0b3JcXFxcYXBwXFxcXGFwaVxcXFxnZXQtcXVvdGFcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dldC1xdW90YS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2dldC1xdW90YVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ2V0LXF1b3RhL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcTMOpbmFcXFxcRGVza3RvcFxcXFxzemFrZG9sZ296YXRcXFxcU3pha2RvZ2EtbWFpblxcXFxTemFrZG9nYS1tYWluXFxcXHF1b3RhLWNhbGN1bGF0b3JcXFxcYXBwXFxcXGFwaVxcXFxnZXQtcXVvdGFcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2dldC1xdW90YS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fget-quota%2Froute&page=%2Fapi%2Fget-quota%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fget-quota%2Froute.ts&appDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/get-quota/route.ts":
/*!************************************!*\
  !*** ./app/api/get-quota/route.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ethers */ \"(rsc)/./node_modules/ethers/lib.esm/providers/provider-jsonrpc.js\");\n/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ethers */ \"(rsc)/./node_modules/ethers/lib.esm/contract/contract.js\");\n/* harmony import */ var lib_abi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lib/abi */ \"(rsc)/./lib/abi.ts\");\n\n\n\nconst RPC_URL = process.env.RPC_URL;\nconst CAC_ADDRESS = process.env.CAC_ADDRESS;\nconst FACTOR = Number(process.env.FACTOR_PER_M2 || \"0.01\");\nasync function GET(req) {\n    try {\n        const { searchParams } = new URL(req.url);\n        const meta = searchParams.get(\"meta\");\n        const user = searchParams.get(\"user\");\n        if (meta === \"factor\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                factor: FACTOR\n            });\n        }\n        if (!user) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"user param kell\"\n            }, {\n                status: 400\n            });\n        }\n        const provider = new ethers__WEBPACK_IMPORTED_MODULE_2__.JsonRpcProvider(RPC_URL);\n        const c = new ethers__WEBPACK_IMPORTED_MODULE_3__.Contract(CAC_ADDRESS, lib_abi__WEBPACK_IMPORTED_MODULE_1__.allowance20Abi, provider);\n        const remaining = await c.quota(user) // mapping(address=>uint256) public quota\n        ;\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            remaining: Number(remaining)\n        });\n    } catch (e) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: e?.message || String(e)\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2dldC1xdW90YS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQztBQUNYO0FBQ1M7QUFFeEMsTUFBTUcsVUFBVUMsUUFBUUMsR0FBRyxDQUFDRixPQUFPO0FBQ25DLE1BQU1HLGNBQWNGLFFBQVFDLEdBQUcsQ0FBQ0MsV0FBVztBQUMzQyxNQUFNQyxTQUFTQyxPQUFPSixRQUFRQyxHQUFHLENBQUNJLGFBQWEsSUFBSTtBQUU1QyxlQUFlQyxJQUFJQyxHQUFZO0lBQ3BDLElBQUk7UUFDRixNQUFNLEVBQUVDLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLElBQUlHLEdBQUc7UUFDeEMsTUFBTUMsT0FBT0gsYUFBYUksR0FBRyxDQUFDO1FBQzlCLE1BQU1DLE9BQU9MLGFBQWFJLEdBQUcsQ0FBQztRQUU5QixJQUFJRCxTQUFTLFVBQVU7WUFDckIsT0FBT2YscURBQVlBLENBQUNrQixJQUFJLENBQUM7Z0JBQUVDLFFBQVFaO1lBQU87UUFDNUM7UUFFQSxJQUFJLENBQUNVLE1BQU07WUFDVCxPQUFPakIscURBQVlBLENBQUNrQixJQUFJLENBQUM7Z0JBQUVFLE9BQU87WUFBa0IsR0FBRztnQkFBRUMsUUFBUTtZQUFJO1FBQ3ZFO1FBRUEsTUFBTUMsV0FBVyxJQUFJckIsbURBQXNCLENBQUNFO1FBQzVDLE1BQU1xQixJQUFJLElBQUl2Qiw0Q0FBZSxDQUFDSyxhQUFhSixtREFBY0EsRUFBRW9CO1FBRTNELE1BQU1JLFlBQW9CLE1BQU1GLEVBQUVHLEtBQUssQ0FBQ1YsTUFBTSx5Q0FBeUM7O1FBQ3ZGLE9BQU9qQixxREFBWUEsQ0FBQ2tCLElBQUksQ0FBQztZQUFFUSxXQUFXbEIsT0FBT2tCO1FBQVc7SUFDMUQsRUFBRSxPQUFPRSxHQUFPO1FBQ2QsT0FBTzVCLHFEQUFZQSxDQUFDa0IsSUFBSSxDQUFDO1lBQUVFLE9BQU9RLEdBQUdDLFdBQVdDLE9BQU9GO1FBQUcsR0FBRztZQUFFUCxRQUFRO1FBQUk7SUFDN0U7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3F1b3RhLWNhbGN1bGF0b3IvLi9hcHAvYXBpL2dldC1xdW90YS9yb3V0ZS50cz9mOTg2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xyXG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tICdldGhlcnMnXHJcbmltcG9ydCB7IGFsbG93YW5jZTIwQWJpIH0gZnJvbSAnbGliL2FiaSdcclxuXHJcbmNvbnN0IFJQQ19VUkwgPSBwcm9jZXNzLmVudi5SUENfVVJMIGFzIHN0cmluZ1xyXG5jb25zdCBDQUNfQUREUkVTUyA9IHByb2Nlc3MuZW52LkNBQ19BRERSRVNTIGFzIGAweCR7c3RyaW5nfWBcclxuY29uc3QgRkFDVE9SID0gTnVtYmVyKHByb2Nlc3MuZW52LkZBQ1RPUl9QRVJfTTIgfHwgJzAuMDEnKVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIEdFVChyZXE6IFJlcXVlc3QpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxLnVybClcclxuICAgIGNvbnN0IG1ldGEgPSBzZWFyY2hQYXJhbXMuZ2V0KCdtZXRhJylcclxuICAgIGNvbnN0IHVzZXIgPSBzZWFyY2hQYXJhbXMuZ2V0KCd1c2VyJylcclxuXHJcbiAgICBpZiAobWV0YSA9PT0gJ2ZhY3RvcicpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZmFjdG9yOiBGQUNUT1IgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXVzZXIpIHtcclxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICd1c2VyIHBhcmFtIGtlbGwnIH0sIHsgc3RhdHVzOiA0MDAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcm92aWRlciA9IG5ldyBldGhlcnMuSnNvblJwY1Byb3ZpZGVyKFJQQ19VUkwpXHJcbiAgICBjb25zdCBjID0gbmV3IGV0aGVycy5Db250cmFjdChDQUNfQUREUkVTUywgYWxsb3dhbmNlMjBBYmksIHByb3ZpZGVyKVxyXG5cclxuICAgIGNvbnN0IHJlbWFpbmluZzogYmlnaW50ID0gYXdhaXQgYy5xdW90YSh1c2VyKSAvLyBtYXBwaW5nKGFkZHJlc3M9PnVpbnQyNTYpIHB1YmxpYyBxdW90YVxyXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgcmVtYWluaW5nOiBOdW1iZXIocmVtYWluaW5nKSB9KVxyXG4gIH0gY2F0Y2ggKGU6YW55KSB7XHJcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogZT8ubWVzc2FnZSB8fCBTdHJpbmcoZSkgfSwgeyBzdGF0dXM6IDUwMCB9KVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiZXRoZXJzIiwiYWxsb3dhbmNlMjBBYmkiLCJSUENfVVJMIiwicHJvY2VzcyIsImVudiIsIkNBQ19BRERSRVNTIiwiRkFDVE9SIiwiTnVtYmVyIiwiRkFDVE9SX1BFUl9NMiIsIkdFVCIsInJlcSIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsIm1ldGEiLCJnZXQiLCJ1c2VyIiwianNvbiIsImZhY3RvciIsImVycm9yIiwic3RhdHVzIiwicHJvdmlkZXIiLCJKc29uUnBjUHJvdmlkZXIiLCJjIiwiQ29udHJhY3QiLCJyZW1haW5pbmciLCJxdW90YSIsImUiLCJtZXNzYWdlIiwiU3RyaW5nIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/get-quota/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/abi.ts":
/*!********************!*\
  !*** ./lib/abi.ts ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   allowance20Abi: () => (/* binding */ allowance20Abi)\n/* harmony export */ });\nconst allowance20Abi = [\n    {\n        \"inputs\": [\n            {\n                \"internalType\": \"address\",\n                \"name\": \"user\",\n                \"type\": \"address\"\n            },\n            {\n                \"internalType\": \"uint256\",\n                \"name\": \"quota\",\n                \"type\": \"uint256\"\n            }\n        ],\n        \"name\": \"setMintQuota\",\n        \"outputs\": [],\n        \"stateMutability\": \"nonpayable\",\n        \"type\": \"function\"\n    },\n    {\n        \"inputs\": [\n            {\n                \"internalType\": \"address\",\n                \"name\": \"\",\n                \"type\": \"address\"\n            }\n        ],\n        \"name\": \"remainingQuota\",\n        \"outputs\": [\n            {\n                \"internalType\": \"uint256\",\n                \"name\": \"\",\n                \"type\": \"uint256\"\n            }\n        ],\n        \"stateMutability\": \"view\",\n        \"type\": \"function\"\n    }\n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWJpLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxpQkFBaUI7SUFDNUI7UUFDRSxVQUFTO1lBQUM7Z0JBQUMsZ0JBQWU7Z0JBQVUsUUFBTztnQkFBTyxRQUFPO1lBQVM7WUFBRTtnQkFBQyxnQkFBZTtnQkFBVSxRQUFPO2dCQUFRLFFBQU87WUFBUztTQUFFO1FBQy9ILFFBQU87UUFDUCxXQUFVLEVBQUU7UUFDWixtQkFBa0I7UUFDbEIsUUFBTztJQUNUO0lBQ0E7UUFDRSxVQUFTO1lBQUM7Z0JBQUMsZ0JBQWU7Z0JBQVUsUUFBTztnQkFBRyxRQUFPO1lBQVM7U0FBRTtRQUNoRSxRQUFPO1FBQ1AsV0FBVTtZQUFDO2dCQUFDLGdCQUFlO2dCQUFVLFFBQU87Z0JBQUcsUUFBTztZQUFTO1NBQUU7UUFDakUsbUJBQWtCO1FBQ2xCLFFBQU87SUFDVDtDQUNELENBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdW90YS1jYWxjdWxhdG9yLy4vbGliL2FiaS50cz9kODFjIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBhbGxvd2FuY2UyMEFiaSA9IFtcclxuICB7XHJcbiAgICBcImlucHV0c1wiOlt7XCJpbnRlcm5hbFR5cGVcIjpcImFkZHJlc3NcIixcIm5hbWVcIjpcInVzZXJcIixcInR5cGVcIjpcImFkZHJlc3NcIn0se1wiaW50ZXJuYWxUeXBlXCI6XCJ1aW50MjU2XCIsXCJuYW1lXCI6XCJxdW90YVwiLFwidHlwZVwiOlwidWludDI1NlwifV0sXHJcbiAgICBcIm5hbWVcIjpcInNldE1pbnRRdW90YVwiLFxyXG4gICAgXCJvdXRwdXRzXCI6W10sXHJcbiAgICBcInN0YXRlTXV0YWJpbGl0eVwiOlwibm9ucGF5YWJsZVwiLFxyXG4gICAgXCJ0eXBlXCI6XCJmdW5jdGlvblwiXHJcbiAgfSxcclxuICB7XHJcbiAgICBcImlucHV0c1wiOlt7XCJpbnRlcm5hbFR5cGVcIjpcImFkZHJlc3NcIixcIm5hbWVcIjpcIlwiLFwidHlwZVwiOlwiYWRkcmVzc1wifV0sXHJcbiAgICBcIm5hbWVcIjpcInJlbWFpbmluZ1F1b3RhXCIsXHJcbiAgICBcIm91dHB1dHNcIjpbe1wiaW50ZXJuYWxUeXBlXCI6XCJ1aW50MjU2XCIsXCJuYW1lXCI6XCJcIixcInR5cGVcIjpcInVpbnQyNTZcIn1dLFxyXG4gICAgXCJzdGF0ZU11dGFiaWxpdHlcIjpcInZpZXdcIixcclxuICAgIFwidHlwZVwiOlwiZnVuY3Rpb25cIlxyXG4gIH1cclxuXSBhcyBjb25zdFxyXG4iXSwibmFtZXMiOlsiYWxsb3dhbmNlMjBBYmkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/abi.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/ethers","vendor-chunks/@noble","vendor-chunks/@adraffy"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fget-quota%2Froute&page=%2Fapi%2Fget-quota%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fget-quota%2Froute.ts&appDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CL%C3%A9na%5CDesktop%5Cszakdolgozat%5CSzakdoga-main%5CSzakdoga-main%5Cquota-calculator&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();