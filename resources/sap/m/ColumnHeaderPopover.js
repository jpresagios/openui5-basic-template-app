/*
 * ! OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/model/base/ManagedObjectModel","sap/m/OverflowToolbar","sap/m/ResponsivePopover","sap/m/OverflowToolbarButton","sap/m/OverflowToolbarToggleButton","sap/m/ToolbarSpacer","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(e,t,o,n,r,i,s,a,p){"use strict";var l=e.extend("sap.m.ColumnHeaderPopover",{library:"sap.m",metadata:{properties:{},aggregations:{items:{type:"sap.m.ColumnPopoverItem",multiple:true,singularName:"item",bindable:true},_popover:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}}}});l.prototype.init=function(){var e=new t(this);var i=this;this._oShownCustomContent=null;var l=new n({showArrow:false,showHeader:false,placement:"Bottom",verticalScrolling:true,horizontalScrolling:false});this.setAggregation("_popover",l);var g=new a({path:"visible",operator:p.EQ,value1:true});var u=function(e,t){var o=t.getObject();if(o.isA("sap.m.ColumnPopoverActionItem")){return i._createActionItem(e,o)}else if(o.isA("sap.m.ColumnPopoverCustomItem")){return i._createCustomItem(e,o)}};var f=new o({content:{path:"/items",filters:[g],length:5,factory:u}});f.updateAggregation=function(){if(this._oShownCustomContent){this._oShownCustomContent=null}o.prototype.updateAggregation.apply(this,arguments);f.addContent(new s);f.addContent(new r({type:"Transparent",icon:"sap-icon://decline",tooltip:"Close",press:[l.close,l]}))};l.addContent(f);l.setModel(e)};l.prototype._createActionItem=function(e,t){var o=this;var n=this.getAggregation("_popover");return new r(e,{icon:"{icon}",tooltip:"{text}",type:"Transparent",press:function(){if(o._oShownCustomContent){o._oShownCustomContent.setVisible(false);o._oShownCustomContent=null;o._cleanSelection(n)}t.firePress()}})};l.prototype._createCustomItem=function(e,t){var o=this;var n=this.getAggregation("_popover");var r=t.getContent();if(r){r.setVisible(false)}n.addContent(r);return new i(e,{icon:"{icon}",type:"Transparent",tooltip:"{text}",press:function(){if(o._oShownCustomContent){o._oShownCustomContent.setVisible(false)}if(this.getPressed()){o._cleanSelection(n);t.fireBeforeShowContent();r.setVisible(true);o._oShownCustomContent=r;t._sRelatedId=r.sId}else{r.setVisible(false);o._oShownCustomContent=null}}})};l.prototype._cleanSelection=function(e){var t=e.getContent()[0],o;if(t&&t.isA("sap.m.OverflowToolbar")&&t.getContent()){o=t.getContent()}if(o){for(var n=0;n<o.length;n++){if(o[n]!==this&&o[n].getPressed&&o[n].getPressed()){o[n].setPressed(false)}}}};l.prototype.updateAggregation=function(){var t=this.getAggregation("_popover"),o;if(t){o=t.getAggregation("content")}if(o){for(var n=0;n<o.length;n++){if(!o[n].isA("sap.m.OverflowToolbar")){t.removeAggregation("content",o[n])}}}e.prototype.updateAggregation.apply(this,arguments)};l.prototype.openBy=function(e){var t=this.getAggregation("_popover");if(!this._bAppendedToUIArea&&!this.getParent()){var o=sap.ui.getCore().getStaticAreaRef();o=sap.ui.getCore().getUIArea(o);o.addContent(this,true);this._bAppendedToUIArea=true}var n=e.getFocusDomRef();if(n){t.setOffsetY(-n.clientHeight)}t.openBy(e)};l.prototype.exit=function(){this._oShownCustomContent=null;var e=this.getAggregation("_popover");if(e.getContent()){e.destroyContent()}};return l});