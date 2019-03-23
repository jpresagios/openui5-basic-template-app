/*!
* OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/base/Log","sap/ui/core/Locale","sap/ui/core/LocaleData"],function(e,n,i,t,a){"use strict";var o={bg:"непротивоконституционствувателствувайте",ca:"Psiconeuroimmunoendocrinologia",hr:"prijestolonasljednikovičičinima",cs:"nejnezdevětadevadesáteronásobitelnějšími",da:"Gedebukkebensoverogundergeneralkrigskommandersergenten",nl:"meervoudigepersoonlijkheidsstoornissen","en-us":"pneumonoultramicroscopicsilicovolcanoconiosis",et:"Sünnipäevanädalalõpupeopärastlõunaväsimus",fi:"kolmivaihekilowattituntimittari",fr:"hippopotomonstrosesquippedaliophobie",de:"Kindercarnavalsoptochtvoorbereidingswerkzaamhedenplan","el-monoton":"ηλεκτροεγκεφαλογράφημα",hi:"किंकर्तव्यविमूढ़",hu:"Megszentségteleníthetetlenségeskedéseitekért",it:"hippopotomonstrosesquippedaliofobia",lt:"nebeprisikiškiakopūstlapiaujančiuosiuose","nb-no":"supercalifragilisticexpialidocious",pl:"dziewięćdziesięciokilkuletniemu",pt:"pneumoultramicroscopicossilicovulcanoconiose",ru:"превысокомногорассмотрительствующий",sr:"Семпаравиливичинаверсаламилитипиковски",sl:"Dialektičnomaterialističen",es:"Electroencefalografistas",sv:"Realisationsvinstbeskattning",th:"ตัวอย่างข้อความที่จะใช้ในการยืนยันการถ่ายโอน",tr:"Muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine",uk:"Нікотинамідаденіндинуклеотидфосфат"};var r={bg:true,ca:true,hr:true,cs:false,// no valid license
da:true,nl:true,"en-us":true,et:true,fi:true,fr:true,de:true,"el-monoton":true,hi:true,hu:true,it:true,lt:true,"nb-no":true,pl:false,// no valid license
pt:true,ru:true,sr:false,// no valid license
sl:true,es:true,sv:true,th:true,tr:true,uk:true};var s={bg:"Bulgarian",ca:"Catalan",hr:"Croatian",cs:"Czech",da:"Danish",nl:"Dutch",en:"English",et:"Estonian",fi:"Finnish",fr:"French",de:"German",el:"Greek",hi:"Hindi",hu:"Hungarian",it:"Italian",lt:"Lithuanian",nb:"Norwegian Bokmål",no:"Norwegian",pl:"Polish",pt:"Portuguese",ru:"Russian",sr:"Serbian",sl:"Slovenian",es:"Spanish",sv:"Swedish",th:"Thai",tr:"Turkish",uk:"Ukrainian"};var u={};var p={};var h={};var l=null;var c=null;var d={};var f={};var g=[];function y(e,n,t){i.info("[UI5 Hyphenation] Initializing third-party module for language "+P(e),"sap.ui.core.hyphenation.Hyphenation.initialize()");window.hyphenopoly.initializeLanguage(n).then(m.bind(this,e,t))}function v(e,n,t){i.info("[UI5 Hyphenation] Re-initializing third-party module for language "+P(e),"sap.ui.core.hyphenation.Hyphenation.initialize()");window.hyphenopoly.reInitializeLanguage(e,n).then(m.bind(this,e,t))}function m(e,n,i){d[e]=i;l.bIsInitialized=true;if(g.length>0){g.forEach(function(e){y(e.sLanguage,e.oConfig,e.resolve)});g=[]}l.bLoading=false;n(E(e))}function b(n,t){var a={require:[n],hyphen:"­",compound:"all",path:e.sap.getResourcePath("sap/ui/thirdparty/hyphenopoly")};if(t){if("hyphen"in t){a.hyphen=t.hyphen}if("minWordLength"in t){a.minWordLength=t.minWordLength}if("exceptions"in t){i.info("[UI5 Hyphenation] Add hyphenation exceptions '"+JSON.stringify(t.exceptions)+"' for language "+P(n),"sap.ui.core.hyphenation.Hyphenation");var o=[];Object.keys(t.exceptions).forEach(function(e){o.push(t.exceptions[e])});if(o.length>0){a.exceptions={};a.exceptions[n]=o.join(", ")}}}return a}function w(e,n){return new Promise(function(i,t){var a=document.createElement("script");a.async=true;a.src=e+n;a.addEventListener("load",i);a.addEventListener("error",function(){return t("Error loading script: "+n)});a.addEventListener("abort",function(){return t(n+" Script loading aborted.")});document.head.appendChild(a)})}var k=function e(){var n=["visibility:hidden;","-moz-hyphens:auto;","-webkit-hyphens:auto;","-ms-hyphens:auto;","hyphens:auto;","width:48px;","font-size:12px;","line-height:12px;","border:none;","padding:0;","word-wrap:normal"];return n.join("")}();function z(e){if(!c){c=document.createElement("body")}var n=document.createElement("div");n.lang=e;n.id=e;n.style.cssText=k;n.appendChild(document.createTextNode(o[e]));c.appendChild(n)}function L(e){if(c){e.appendChild(c);return c}return null}function H(){if(c){c.parentNode.removeChild(c)}}function I(e){return e.style.hyphens==="auto"||e.style.webkitHyphens==="auto"||e.style.msHyphens==="auto"||e.style["-moz-hyphens"]==="auto"}function x(e){var n;if(e){n=new t(e)}else{n=sap.ui.getCore().getConfiguration().getLocale()}var i=n.getLanguage().toLowerCase();switch(i){case"en":i="en-us";break;case"nb":i="nb-no";break;case"no":i="nb-no";break;case"el":i="el-monoton";break}return i}function E(e){if(typeof e==="string"){return e.substring(0,2)}else{return null}}function P(e){var n=E(e);if(s.hasOwnProperty(n)){return"'"+s[n]+"' (code:'"+n+"')"}else{return"'"+n+"'"}}function U(e){l.fireError(e);i.error("[UI5 Hyphenation] "+e,"sap.ui.core.hyphenation.Hyphenation");l.bLoading=false}var j=n.extend("sap.ui.core.hyphenation.Hyphenation",{metadata:{library:"sap.ui.core",events:{error:{parameters:{sErrorMessage:{type:"string"}}}}}});j.prototype.canUseNativeHyphenation=function(e){var n=x(e);var t;if(!this.isLanguageSupported(e)){return null}if(!u.hasOwnProperty(n)){z(n);var a=L(document.documentElement);if(a!==null){var o=document.getElementById(n);if(I(o)&&o.offsetHeight>12){t=true}else{t=false}H()}u[n]=t;if(t){i.info("[UI5 Hyphenation] Browser-native hyphenation can be used for language "+P(n),"sap.ui.core.hyphenation.Hyphenation.canUseNativeHyphenation()")}else{i.info("[UI5 Hyphenation] Browser-native hyphenation is not supported by current platform for language "+P(n),"sap.ui.core.hyphenation.Hyphenation.canUseNativeHyphenation()")}}else{t=u[n]}return t};j.prototype.canUseThirdPartyHyphenation=function(e){var n=x(e),t;if(!this.isLanguageSupported(e)){return null}if(!h.hasOwnProperty(n)){t=r.hasOwnProperty(n)&&r[n];if(t){i.info("[UI5 Hyphenation] Third-party hyphenation can be used for language "+P(n),"sap.ui.core.hyphenation.Hyphenation.canUseThirdPartyHyphenation()")}else{i.info("[UI5 Hyphenation] Third-party hyphenation is not supported for language "+P(n),"sap.ui.core.hyphenation.Hyphenation.canUseThirdPartyHyphenation()")}h[n]=t}else{t=h[n]}return t};j.prototype.isLanguageSupported=function(e){var n=x(e),t;if(!p.hasOwnProperty(n)){t=o.hasOwnProperty(n);if(!t){i.info("[UI5 Hyphenation] Language "+P(n)+" is not known to the Hyphenation API","sap.ui.core.hyphenation.Hyphenation.isLanguageSupported()")}p[n]=t}else{t=p[n]}return t};j.prototype.hyphenate=function(e,n){var i=x(n);if(!d.hasOwnProperty(i)){U("Language "+P(i)+" is not initialized. You have to initialize it first with method 'initialize()'");return e}return d[i](e)};j.prototype.getInitializedLanguages=function(){return Object.keys(d).map(function(e){return E(e)})};j.prototype.isLanguageInitialized=function(e){var e=x(e);return Object.keys(d).indexOf(e)!=-1};j.prototype.getExceptions=function(e){var e=x(e);if(this.isLanguageInitialized(e)){return window.hyphenopoly.languages[e].exceptions}else{U("Language "+P(e)+" is not initialized. You have to initialize it first with method 'initialize()'")}};j.prototype.addExceptions=function(e,n){var e=x(e);if(this.isLanguageInitialized(e)){i.info("[UI5 Hyphenation] Add hyphenation exceptions '"+JSON.stringify(n)+"' for language "+P(e),"sap.ui.core.hyphenation.Hyphenation.addExceptions()");Object.keys(n).forEach(function(i){window.hyphenopoly.languages[e].cache[i]=n[i];window.hyphenopoly.languages[e].exceptions[i]=n[i]})}else{U("Language "+P(e)+" is not initialized. You have to initialize it first with method 'initialize()'")}};j.prototype.initialize=function(e,n){var i=x(e);var n=b(i,n);if(r[i]){if(!l.bIsInitialized&&!l.bLoading){l.bLoading=true;f[i]=new Promise(function(e,t){w(n.path,"/hyphenopoly.bundle.js").then(y.bind(this,i,n,e))});return f[i]}else if(l.bLoading&&!d[i]&&f[i]){return f[i]}else if(this.isLanguageInitialized(i)){f[i]=new Promise(function(e,t){v(i,n,e)})}else{f[i]=new Promise(function(e,t){if(!l.bIsInitialized){g.push({sLanguage:i,oConfig:n,resolve:e})}else{y(i,n,e)}})}l.bLoading=true;return f[i]}else{var t="Language "+P(e)+" can not be initialized. It is either not supported by the third-party module or an error occurred";U(t);return new Promise(function(e,n){n(t)})}};j.getInstance=function(){if(!l){l=new j;l.bIsInitialized=false;l.bLoading=false}return l};return j});