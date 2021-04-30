/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(t){"use strict";var e;if(t.module){e=t.module;t.module=undefined}sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/Object","sap/ui/core/Element","sap/ui/core/mvc/View","sap/ui/test/matchers/Ancestor","sap/ui/test/matchers/MatcherFactory","sap/ui/test/pipelines/MatcherPipeline","sap/ui/test/_OpaLogger"],function(t,e,i,n,r,o,l,s){var a=e.extend("sap.ui.test.OpaPlugin",{constructor:function(){this._oLogger=s.getLogger("sap.ui.test.Opa5");this._oMatcherFactory=new o},getAllControls:function(t,e){var n=i.registry.filter(u(t));this._oLogger.debug("Found "+n.length+" controls"+(t?" of type '"+(e||t)+"'":"")+" in page");return n},getView:function(t){var e=this.getAllControls(n,"View");var i=e.filter(function(e){return e.getViewName()===t});this._oLogger.debug("Found "+i.length+" views with viewName '"+t+"'");if(i.length>1){i=i.filter(function(t){var e=t.$();return e.length>0&&e.is(":visible")&&e.css("visibility")!=="hidden"});this._oLogger.debug("Found "+i.length+" visible views with viewName '"+t+"'");if(i.length!==1){this._oLogger.debug("Cannot identify controls uniquely. Please provide viewId to locate the exact view.");i=[]}}return i[0]},_getMatchingView:function(t){var e=null;var r;if(t.viewName){var o=(t.viewNamespace||"")+"."+(t.viewName||"");r=o.replace(/\.+/g,".").replace(/^\.|\.$/g,"")}if(t.viewId){var l=i.registry.get(t.viewId);if(l instanceof n&&(!r||l.getViewName()===r)){e=l}}else{e=this.getView(r)}this._oLogger.debug("Found "+(e?"":"no ")+"view with ID '"+t.viewId+"' and viewName '"+r+"'");return e},getControlInView:function(e){var i=this._getMatchingView(e);var n=typeof e.id==="string";if(!i){return n?null:[]}var r=i.getViewName();var o=e.fragmentId?e.fragmentId+a.VIEW_ID_DELIMITER:"";if(t.isArray(e.id)){var l=[];var s=[];e.id.map(function(t){return o+t}).forEach(function(t){var e=i.byId(t);if(e){l.push(e)}else{s.push(t)}});var u=s.length?". Found no controls matching the subset of IDs "+s:"";this._oLogger.debug("Found "+l.length+" controls with ID contained in "+e.id+" in view '"+r+"'"+u);return l}if(n){var g=o+e.id;var c=i.byId(g)||null;this._oLogger.debug("Found "+(c?"":"no ")+"control with ID '"+g+"' in view '"+r+"'");return c}var f=this.getAllControlsWithTheParent(i,e.controlType,e.sOriginalControlType);var d=this._isRegExp(e.id);if(d){f=f.filter(function(t){var n=this._getUnprefixedControlId(t.getId(),i.getId(),e.fragmentId);return e.id.test(n)}.bind(this))}this._oLogger.debug("Found "+f.length+" controls of type "+e.sOriginalControlType+(d?" with ID matching "+e.id:"")+" in view '"+r+"'");return f},getAllControlsWithTheParent:function(t,e,i){var n=new r(t);return this._filterUniqueControlsByCondition(this.getAllControls(e,i),n)},getAllControlsInContainer:function(t,e,i,n){var r=u(e),o=this._filterUniqueControlsByCondition(this._getControlsInContainer(t),r);this._oLogger.debug("Found "+o.length+" controls in "+(n?n:"container")+" with controlType '"+i+"'");return o},_getControlsInStaticArea:function(e){var i=t(sap.ui.getCore().getStaticAreaRef());var n=this._getControlsInContainer(i)||[];if(e.id){n=this._filterUniqueControlsByCondition(n,function(i){var n=i.getId();var r=this._getMatchingView(e);if(r){if(this._isControlInView(i,r.getViewName())){n=this._getUnprefixedControlId(i.getId(),r.getId(),e.fragmentId)}}var o=false;if(typeof e.id==="string"){o=n===e.id}if(this._isRegExp(e.id)){o=e.id.test(n)}if(t.isArray(e.id)){o=e.id.filter(function(t){return t===n}).length>0}return o}.bind(this));this._oLogger.debug("Found "+(n.length?n.length:"no")+" controls in the static area with ID matching '"+e.id+"'"+(e.fragmentId?" and fragmentId: '"+e.fragmentId+"'":""))}if(n.length&&e.controlType){var r=u(e.controlType);n=this._filterUniqueControlsByCondition(n,r);this._oLogger.debug("Found "+(n.length?n.length:"no")+" controls in the static area with control type matching '"+e.controlType+"'")}if(e.id&&typeof e.id==="string"){return n[0]||null}else{return n}},_getControlsInContainer:function(t){var e=t.find("*").control();var i=[];e.forEach(function(t){var e=!i.filter(function(e){return e.getId()===t.getId()}).length;if(e){i.push(t)}});return i},_isControlInView:function(t,e){if(!t){return false}if(t.getViewName&&t.getViewName()===e){return true}else{return this._isControlInView(t.getParent(),e)}},_isRegExp:function(t){return Object.prototype.toString.call(t)==="[object RegExp]"},getMatchingControls:function(e){var i=null;e=e||{};var n=this._modifyControlType(e);if(!n){return typeof e.id==="string"?i:[]}if(e.searchOpenDialogs){i=this._getControlsInStaticArea(e)}else if(e.viewName||e.viewId){i=this.getControlInView(e)}else if(e.id){i=this.getControlByGlobalId(e)}else if(e.controlType){i=this.getAllControls(e.controlType,e.sOriginalControlType)}else{i=this.getAllControls()}if(!i){return i}var r=this._oMatcherFactory.getStateMatchers({visible:e.visible,interactable:e.interactable,enabled:typeof e.enabled==="undefined"?e.interactable:e.enabled,editable:typeof e.editable==="undefined"?false:e.editable});var o=a._oMatcherPipeline.process({control:i,matchers:r});if(!o){if(t.isArray(i)){return[]}if(i){return null}return i}return o},_getFilteredControls:function(e){var i=this._filterControlsByCondition(e);var n=t.extend({},e);["interactable","visible","enabled","editable"].forEach(function(t){delete n[t]});return i===a.FILTER_FOUND_NO_CONTROLS?a.FILTER_FOUND_NO_CONTROLS:this._filterControlsByMatchers(n,i)},_filterControlsByCondition:function(e){var i=null;var n=this._isLookingForAControl(e);if(n){i=this.getMatchingControls(e)}var r=[typeof e.id==="string"&&!i,this._isRegExp(e.id)&&!i.length,t.isArray(e.id)&&(!i||i.length!==e.id.length),e.controlType&&t.isArray(i)&&!i.length,!e.id&&(e.viewName||e.viewId||e.searchOpenDialogs)&&!i.length];return r.some(Boolean)?a.FILTER_FOUND_NO_CONTROLS:i},_filterControlsByMatchers:function(e,i){var n=t.extend({},e);var r=this._oMatcherFactory.getFilteringMatchers(n);var o=this._isLookingForAControl(e);var l=null;if((i||!o)&&r.length){l=a._oMatcherPipeline.process({matchers:r,control:i});if(!l){return a.FILTER_FOUND_NO_CONTROLS}}else{l=i}return l},getControlByGlobalId:function(e){var n=u(e.controlType);if(typeof e.id==="string"){var r=i.registry.get(e.id)||null;if(r&&!n(r)){this._oLogger.error("A control with global ID '"+e.id+"' is found but does not have required controlType '"+e.sOriginalControlType+"'. Found control is '"+r+"' but null is returned instead");return null}this._oLogger.debug("Found "+(r?"":"no ")+"control with the global ID '"+e.id+"'");return r}var o=[];var l=this._isRegExp(e.id);if(l){i.registry.forEach(function(t,i){if(e.id.test(i)){o.push(i)}})}else if(t.isArray(e.id)){o=e.id}var s=[];var a=[];o.forEach(function(t){var e=i.registry.get(t);if(e&&n(e)&&!e.bIsDestroyed){s.push(e)}else{a.push(t)}});var g=!l&&a.length?". Found no controls of matching the subset of IDs "+a:"";this._oLogger.debug("Found "+s.length+" controls of type "+e.sOriginalControlType+(l?" with ID matching '":" with ID contained in '")+e.id+g);return s},getControlConstructor:function(e){if(sap.ui.lazyRequire._isStub(e)){this._oLogger.debug("The control type "+e+" is currently a lazy stub.");return null}var i=t.sap.getObject(e);if(!i){this._oLogger.debug("The control type "+e+" is undefined.");return null}if(typeof i!=="function"){this._oLogger.debug("The control type "+e+" must be a function.");return null}return i},_isLookingForAControl:function(t){return Object.keys(t).some(function(e){return a._aControlSelectorsForMatchingControls.indexOf(e)!==-1&&!!t[e]})},_filterUniqueControlsByCondition:function(t,e){return t.filter(function(t,i,n){var r=!!e(t);return r&&n.indexOf(t)===i})},_modifyControlType:function(t){var e=t.controlType;if(typeof e!=="string"){if(e&&e._sapUiLazyLoader){this._oLogger.debug("The control type is currently a lazy stub");return false}return true}var i=this.getControlConstructor(e);if(!i){return false}t.sOriginalControlType=e;t.controlType=i;return true},_getUnprefixedControlId:function(t,e,i){var n=t.replace(e+a.VIEW_ID_DELIMITER,"");if(i){if(n.startsWith(i+a.VIEW_ID_DELIMITER)){n=n.replace(i+a.VIEW_ID_DELIMITER,"")}else{n=""}}return n}});function u(t){return function(e){if(!t){return true}return e instanceof t}}a._oMatcherPipeline=new l;a._aControlSelectorsForMatchingControls=["id","viewName","viewId","controlType","searchOpenDialogs"];a.FILTER_FOUND_NO_CONTROLS="FILTER_FOUND_NO_CONTROL";a.VIEW_ID_DELIMITER="--";return a});if(e){t.module=e}})(window);