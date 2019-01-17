/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","sap/base/security/encodeXML","sap/base/util/isPlainObject"],function(e,t,o,n){"use strict";var a=function(r,i){var s,u,l,c,p=0,d=3e3,f=2,b=3,h=1,m={},g={btnStart:"startE2ETrace",selLevel:"logLevelE2ETrace",taContent:"outputE2ETrace",infoText:"Ent-to-End trace is running in the background."+" Navigate to the URL that you would like to trace."+" The result of the trace will be shown in dialog after the trace is terminated.",infoDuration:5e3},v={dvLoadedLibs:"LoadedLibs",dvLoadedModules:"LoadedModules"},L;function S(t,n,a,r,i){t.push("<tr class='sapUiSelectable'><td class='sapUiSupportTechInfoBorder sapUiSelectable'><label class='sapUiSupportLabel sapUiSelectable'>",o(r),"</label><br>");var s=i;if(e.isFunction(i)){s=i(t)||""}t.push(o(s));t.push("</td></tr>")}function E(t,o,a,r,i){S(t,o,a,r,function(t){t.push("<table class='sapMSupportTable' border='0' cellspacing='5' cellpadding='5' width='100%'><tbody>");e.each(i,function(e,o){var a="";if(o!==undefined&&o!==null){if(typeof o=="string"||typeof o=="boolean"||Array.isArray(o)&&o.length==1){a=o}else if((Array.isArray(o)||n(o))&&window.JSON){a=window.JSON.stringify(o)}}S(t,false,false,e,""+a)});t.push("</tbody></table>")})}function w(t){m={version:t.commonInformation.version,build:t.commonInformation.buildTime,change:t.commonInformation.lastChange,useragent:t.commonInformation.userAgent,docmode:t.commonInformation.documentMode,debug:t.commonInformation.debugMode,bootconfig:t.configurationBootstrap,config:t.configurationComputed,loadedlibs:t.loadedLibraries,modules:t.loadedModules,uriparams:t.URLParameters,appurl:t.commonInformation.applicationHREF};var o=["<table class='sapUiSelectable' border='0' cellspacing='5' cellpadding='5' width='100%'><tbody class='sapUiSelectable'>"];S(o,true,true,"SAPUI5 Version",function(e){e.push(m.version," (built at ",m.build,", last change ",m.change,")")});S(o,true,true,"User Agent",function(e){e.push(m.useragent,m.docmode?", Document Mode '"+m.docmode+"'":"")});S(o,true,true,"Debug Sources",function(e){e.push(m.debug?"ON":"OFF")});S(o,true,true,"Application",m.appurl);E(o,true,true,"Configuration (bootstrap)",m.bootconfig);E(o,true,true,"Configuration (computed)",m.config);E(o,true,true,"URI Parameters",m.uriparams);S(o,true,true,"End-to-End Trace",function(e){e.push("<label class='sapUiSupportLabel'>Trace Level:</label>","<select id='"+T(g.selLevel)+"' class='sapUiSupportTxtFld' >","<option value='low'>LOW</option>","<option value='medium' selected>MEDIUM</option>","<option value='high'>HIGH</option>","</select>");e.push("<button id='"+T(g.btnStart)+"' class='sapUiSupportBtn'>Start</button>");e.push("<div class='sapUiSupportDiv'>");e.push("<label class='sapUiSupportLabel'>XML Output:</label>");e.push("<textarea id='"+T(g.taContent)+"' class='sapUiSupportTxtArea sapUiSelectable' readonly ></textarea>");e.push("</div>")});S(o,true,true,"Loaded Libraries",function(t){t.push("<ul class='sapUiSelectable'>");e.each(m.loadedlibs,function(e,o){if(o&&(typeof o==="string"||typeof o==="boolean")){t.push("<li class='sapUiSelectable'>",e+" "+o,"</li>")}});t.push("</ul>")});S(o,true,true,"Loaded Modules",function(e){e.push("<div class='sapUiSupportDiv sapUiSelectable' id='"+T(v.dvLoadedModules)+"'></div>")});o.push("</tbody></table>");return new sap.ui.core.HTML({content:o.join("").replace(/\{/g,"&#123;").replace(/\}/g,"&#125;")})}function T(e){return s.getId()+"-"+e}function y(t,o){var n="Modules";var a=0,r=[];a=o.length;e.each(o.sort(),function(e,t){r.push(new sap.m.Label({text:" - "+t}).addStyleClass("sapUiSupportPnlLbl"))});var i=new sap.m.Panel({expandable:true,expanded:false,headerToolbar:new sap.m.Toolbar({design:sap.m.ToolbarDesign.Transparent,content:[new sap.m.Label({text:n+" ("+a+")",design:sap.m.LabelDesign.Bold})]}),content:r});i.placeAt(T(t),"only")}function U(){if(s.traceXml){s.$(g.taContent).text(s.traceXml)}if(s.e2eLogLevel){s.$(g.selLevel).val(s.e2eLogLevel)}y(v.dvLoadedModules,m.modules);s.$(g.btnStart).one("tap",function(){s.e2eLogLevel=s.$(g.selLevel).val();s.$(g.btnStart).addClass("sapUiSupportRunningTrace").text("Running...");s.traceXml="";s.$(g.taContent).text("");sap.ui.core.support.trace.E2eTraceLib.start(s.e2eLogLevel,function(e){s.traceXml=e});sap.m.MessageToast.show(g.infoText,{duration:g.infoDuration});s.close()})}function R(){if(s){return s}var e=sap.ui.requireSync("sap/m/Dialog");var o=sap.ui.requireSync("sap/m/Button");sap.ui.requireSync("sap/ui/core/HTML");sap.ui.requireSync("sap/m/MessageToast");sap.ui.requireSync("sap/ui/core/support/trace/E2eTraceLib");s=new e({title:"Technical Information",horizontalScrolling:true,verticalScrolling:true,stretch:t.system.phone,buttons:[new o({text:"Close",press:function(){s.close()}})],afterOpen:function(){a.off()},afterClose:function(){a.on()}}).addStyleClass("sapMSupport");return s}function M(e){if(e.touches){var o=e.touches.length;if(t.browser.mobile&&(t.browser.name===t.browser.BROWSER.INTERNET_EXPLORER||t.browser.name===t.browser.BROWSER.EDGE)){L=o}if(o>b){i.removeEventListener("touchend",I);return}switch(o){case f:u=Date.now();i.addEventListener("touchend",I);break;case b:if(u){p=Date.now()-u;c=e.touches[o-1].identifier}break}}}function I(e){var o=t.browser.mobile&&(t.browser.name===t.browser.BROWSER.INTERNET_EXPLORER||t.browser.name===t.browser.BROWSER.EDGE)&&L==b;i.removeEventListener("touchend",I);if(p>d&&(e.touches.length===f||o)&&e.changedTouches.length===h&&e.changedTouches[0].identifier===c){p=0;u=0;D()}}function D(){sap.ui.require(["sap/ui/core/support/ToolsAPI"],function(e){var t=R();t.removeAllAggregation("content");t.addAggregation("content",w(e.getFrameworkInformation()));s.open();U()})}return{on:function(){if(!l&&"ontouchstart"in i){l=true;i.addEventListener("touchstart",M)}return this},off:function(){if(l){l=false;i.removeEventListener("touchstart",M)}return this},open:function(){D()},isEventRegistered:function(){return l}}.on()}(e,document);return a},true);