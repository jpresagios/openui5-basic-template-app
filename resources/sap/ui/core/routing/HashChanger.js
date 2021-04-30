/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./HashChangerBase","./RouterHashChanger","sap/ui/thirdparty/hasher","sap/base/Log","sap/base/util/ObjectPath"],function(e,t,s,a,n){"use strict";var r=e.extend("sap.ui.core.routing.HashChanger",{constructor:function(){e.apply(this)}});r.prototype.init=function(){if(this._initialized){a.info("this HashChanger instance has already been initialized.");return false}this._initialized=true;s.changed.add(this.fireHashChanged,this);if(!s.isActive()){s.initialized.addOnce(this.fireHashChanged,this);s.init()}else{this.fireHashChanged(s.getHash())}return this._initialized};r.prototype.fireHashChanged=function(e,t){this.fireEvent("hashChanged",{newHash:e,oldHash:t})};r.prototype.createRouterHashChanger=function(){if(!this._oRouterHashChanger){this._oRouterHashChanger=new t({parent:this});this._registerListenerToRelevantEvents();this._oRouterHashChanger.attachEvent("hashSet",this._onHashModified,this);this._oRouterHashChanger.attachEvent("hashReplaced",this._onHashModified,this)}return this._oRouterHashChanger};r.prototype._registerListenerToRelevantEvents=function(){if(!this._mEventListeners){this._mEventListeners={};this.getRelevantEventsInfo().forEach(function(e){var t=e.name,s=this._onHashChangedForRouterHashChanger.bind(this,e);this._mEventListeners[t]=s;this.attachEvent(t,s,this)}.bind(this))}};r.prototype._deregisterListenerFromRelevantEvents=function(){if(this._mEventListeners){var e=Object.keys(this._mEventListeners);e.forEach(function(e){this.detachEvent(e,this._mEventListeners[e],this)}.bind(this));delete this._mEventListeners}};r.prototype._onHashChangedForRouterHashChanger=function(e,t){if(this._oRouterHashChanger){var s=e.paramMapping||{},a=s["newHash"]||"newHash",n=t.getParameter(a)||"",r=this._parseHash(n);this._oRouterHashChanger.fireHashChanged(r.hash,r.subHashMap,!!e.updateHashOnly)}};r.prototype._onHashModified=function(e){var t=e.getId(),s=[e.getParameter("hash")],a=[e.getParameter("key")],n=e.getParameter("nestedHashInfo"),r=e.getParameter("deletePrefix")||[];if(Array.isArray(n)){n.forEach(function(e){s.push(e.hash);a.push(e.key);if(Array.isArray(e.deletePrefix)){e.deletePrefix.forEach(function(e){if(r.indexOf(e)===-1){r.push(e)}})}})}if(t==="hashSet"){this._setSubHash(a,s,r)}else{this._replaceSubHash(a,s,r)}};r.prototype._setSubHash=function(e,t,s){var a=this._reconstructHash(e,t,s);this.setHash(a)};r.prototype._replaceSubHash=function(e,t,s){var a=this._reconstructHash(e,t,s);this.replaceHash(a)};r.prototype._reconstructHash=function(e,t,s){var a=this.getHash().split("&/"),n=a.shift();e.forEach(function(e,r){if(s){s=s.filter(function(t){return t!==e})}var i=t[r];if(e===undefined){n=i+""}else{var h=a.some(function(t,a,n){if(t.startsWith(e)){if(i){n[a]=e+"/"+i}else{s.push(e)}return true}});if(!h){a.push(e+"/"+i)}}});if(s&&s.length>0){a=a.filter(function(e){return!s.some(function(t){return e.startsWith(t)})})}a.unshift(n);return a.join("&/")};r.prototype._parseHash=function(e){var t=e.split("&/");return{hash:t.shift(),subHashMap:t.reduce(function(e,t){var s=t.indexOf("/");e[t.substring(0,s)]=t.substring(s+1);return e},{})}};r.prototype.setHash=function(t){e.prototype.setHash.apply(this,arguments);s.setHash(t)};r.prototype.replaceHash=function(t){e.prototype.replaceHash.apply(this,arguments);s.replaceHash(t)};r.prototype.getHash=function(){return s.getHash()};r.prototype.getRelevantEventsInfo=function(){return[{name:"hashChanged",paramMapping:{fullHash:"newHash"}}]};r.prototype.destroy=function(){if(this._oRouterHashChanger){this._deregisterListenerFromRelevantEvents();this._oRouterHashChanger.destroy();this._oRouterHashChanger=undefined}delete this._initialized;s.changed.remove(this.fireHashChanged,this);e.prototype.destroy.apply(this,arguments)};r.prototype.deregisterRouterHashChanger=function(){this._deregisterListenerFromRelevantEvents();delete this._oRouterHashChanger};(function(){var e=null;r.getInstance=function(){if(!e){e=new r}return e};function t(t){var s,a,n;for(s in e.mEventRegistry){if(e.mEventRegistry.hasOwnProperty(s)){a=e.mEventRegistry[s];n=t.mEventRegistry[s];if(n){t.mEventRegistry[s]=a.concat(n)}else{t.mEventRegistry[s]=a}}}}r.replaceHashChanger=function(s){if(e&&s){var a=n.get("sap.ui.core.routing.History.getInstance"),r;if(a){r=a();r._setHashChanger(s)}if(e._oRouterHashChanger){e._oRouterHashChanger.detachEvent("hashSet",e._onHashModified,e);e._oRouterHashChanger.detachEvent("hashReplaced",e._onHashModified,e);e._deregisterListenerFromRelevantEvents();s._oRouterHashChanger=e._oRouterHashChanger;s._oRouterHashChanger.parent=s;delete e._oRouterHashChanger;s._oRouterHashChanger.attachEvent("hashSet",s._onHashModified,s);s._oRouterHashChanger.attachEvent("hashReplaced",s._onHashModified,s);s._registerListenerToRelevantEvents()}t(s);e.destroy()}e=s}})();return r});