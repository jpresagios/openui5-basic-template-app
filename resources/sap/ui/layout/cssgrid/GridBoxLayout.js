/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/cssgrid/GridLayoutBase","sap/ui/layout/cssgrid/GridSettings","sap/ui/Device"],function(t,i,e){"use strict";var s=/^([X][L](?:[1-9]|1[0-2]))? ?([L](?:[1-9]|1[0-2]))? ?([M](?:[1-9]|1[0-2]))? ?([S](?:[1-9]|1[0-2]))?$/i;var o=s.exec("XL7 L6 M4 S2");var a={Phone:"sapUiLayoutCSSGridBoxLayoutSizeS",Tablet:"sapUiLayoutCSSGridBoxLayoutSizeM",Desktop:"sapUiLayoutCSSGridBoxLayoutSizeL",LargeDesktop:"sapUiLayoutCSSGridBoxLayoutSizeXL"};var r={XL:"sapUiLayoutCSSGridBoxLayoutSpanXL7",L:"sapUiLayoutCSSGridBoxLayoutSpanL6",M:"sapUiLayoutCSSGridBoxLayoutSpanM4",S:"sapUiLayoutCSSGridBoxLayoutSpanS2"};var n=t.extend("sap.ui.layout.cssgrid.GridBoxLayout",{metadata:{library:"sap.ui.layout",properties:{boxMinWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxWidth:{type:"sap.ui.core.CSSSize",defaultValue:""},boxesPerRowConfig:{type:"sap.ui.layout.BoxesPerRowConfig",group:"Behavior",defaultValue:"XL7 L6 M4 S2"}}}});n.prototype.getActiveGridSettings=function(){return new i({gridTemplateColumns:this._getTemplateColumns(),gridGap:"0.5rem 0.5rem"})};n.prototype._applySingleGridLayout=function(i){if(this.isGridSupportedByBrowser()){t.prototype._applySingleGridLayout.call(this,i)}};n.prototype.renderSingleGridLayout=function(t){this._addSpanClasses(t);if(this.isGridSupportedByBrowser()){t.addClass("sapUiLayoutCSSGridBoxLayoutContainer")}else{t.addClass("sapUiLayoutCSSGridBoxLayoutPolyfill")}};n.prototype.onGridAfterRendering=function(i){t.prototype.onGridAfterRendering.call(this,i);if(!this._hasBoxWidth()){this._applySizeClass(i)}if(!this.isGridSupportedByBrowser()){this._calcWidth(i);this._flattenHeight(i);if(!this._hasBoxWidth()){this._applyClassForLastItem(i)}}if(i.isA("sap.f.GridList")&&i.getGrowing()){var e=i._oGrowingDelegate._onAfterPageLoaded;i._oGrowingDelegate._onAfterPageLoaded=function(){e.call(i._oGrowingDelegate);if(!this.isGridSupportedByBrowser()){this._flattenHeight(i);this._calcWidth(i);this._loopOverGridItems(i,function(t){if(!t.classList.contains("sapMGHLI")){t.classList.add("sapUiLayoutCSSGridItem")}});if(!this._hasBoxWidth()){this._applyClassForLastItem(i)}}else if(i.isA("sap.f.GridList")&&i.isGrouped()){this._flattenHeight(i)}}.bind(this)}};n.prototype._setGridLayout=function(i,e){var s=sap.ui.getCore().byId(i.parentElement.id);t.prototype._setGridLayout.call(this,i,e);if(this.isGridSupportedByBrowser()&&(s&&s.isA("sap.f.GridList")&&s.isGrouped())){this._flattenHeight(s)}};n.prototype.isResponsive=function(){return true};n.prototype.onGridResize=function(t){if(!this.isGridSupportedByBrowser()||t.control&&t.control.isA("sap.f.GridList")&&t.control.isGrouped()){this._flattenHeight(t.control)}if(!this.isGridSupportedByBrowser()&&!this._hasBoxWidth()){this._applyClassForLastItem(t.control)}if(t){if(!this._hasBoxWidth()){this._applySizeClass(t.control)}}};n.prototype._calcWidth=function(t){var i;if(this._hasBoxWidth()){i=this.getBoxWidth()||this.getBoxMinWidth()}this._loopOverGridItems(t,function(t){if(!t.classList.contains("sapMGHLI")){t.style.width=i}})};n.prototype._flattenHeight=function(t){var i=0;var e=jQuery('<div style="position:absolute;top=-10000px;left=-10000px"></div>').appendTo(document.body);this._loopOverGridItems(t,function(t){if(!t.classList.contains("sapMGHLI")){var s=jQuery(jQuery.clone(t)).appendTo(e);s.css({height:"auto",width:t.getBoundingClientRect().width});i=Math.max(s.outerHeight(),i);s.remove()}});e.remove();this._loopOverGridItems(t,function(t){if(!t.classList.contains("sapMGHLI")){t.style.height=i+"px"}})};n.prototype._applyClassForLastItem=function(t){var i=0;var s=this.getBoxesPerRowConfig().split(" ");var o=e.media.getCurrentRange("StdExt",t.$().width());var r=a[o.name].substring("sapUiLayoutCSSGridBoxLayoutSize".length);var n;s.forEach(function(t){if(t.indexOf(r)!=-1){n=parseInt(t.substring(r.length))}});this._loopOverGridItems(t,function(t){if(t.classList.contains("sapUiLayoutCSSGridItem")){i++;if(i==n){t.classList.add("sapUiLayoutCSSGridItemLastOnRow");i=0}else{t.classList.remove("sapUiLayoutCSSGridItemLastOnRow")}}else if(t.classList.contains("sapMGHLI")){i=0}})};n.prototype._applySizeClass=function(t){var i=e.media.getCurrentRange("StdExt",t.$().width()),s=a[i.name];t.getGridDomRefs().forEach(function(t){if(!t.classList.contains(s)){Object.keys(a).map(function(i){t.classList.remove(a[i])});t.classList.add(s)}})};n.prototype._getTemplateColumns=function(){var t="";if(this.getBoxWidth()){t="repeat(auto-fit, "+this.getBoxWidth()+")"}else if(this.getBoxMinWidth()){t="repeat(auto-fit, minmax("+this.getBoxMinWidth()+", 1fr))"}return t};n.prototype._hasBoxWidth=function(){if(this.getBoxWidth()||this.getBoxMinWidth()){return true}else{return false}};n.prototype._addSpanClasses=function(t){var i,e,a=this.getBoxesPerRowConfig(),n,p,d,u;if(this._hasBoxWidth()){return}if(!a||!a.length===0){i=o}else{i=s.exec(a)}if(i){for(var l=1;l<i.length;l++){e=i[l];if(e){e=e.toUpperCase();switch(e.substr(0,1)){case"X":if(e.substr(1,1)==="L"){n=this._getBoxesPerRowClass(e,2)}break;case"L":p=this._getBoxesPerRowClass(e,1);break;case"M":d=this._getBoxesPerRowClass(e,1);break;case"S":u=this._getBoxesPerRowClass(e,1);break;default:break}}}}n=n||r.XL;p=p||r.L;d=d||r.M;u=u||r.S;t.addClass([n,p,d,u].join(" "))};n.prototype._getBoxesPerRowClass=function(t,i){var e=parseInt(t.substr(i,t.length));if(e&&e>0&&e<13){return"sapUiLayoutCSSGridBoxLayoutSpan"+t}};n.prototype._loopOverGridItems=function(t,i){t.getGridDomRefs().forEach(function(t){if(t&&t.children){for(var e=0;e<t.children.length;e++){i(t.children[e])}}})};return n});