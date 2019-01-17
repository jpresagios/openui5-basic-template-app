/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Control","./library","./theming/Parameters","./LocalBusyIndicatorRenderer","sap/ui/thirdparty/jquery"],function(t,i,e,o,r){"use strict";var s=t.extend("sap.ui.core.LocalBusyIndicator",{metadata:{deprecated:true,library:"sap.ui.core",properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"100px"},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"100px"}}}});(function(){s.prototype.init=function(){var i="sap.ui.core.LocalBusyIndicator:";var o="sapUiLocalBusyIndicatorBoxSize";o=e.get(i+o);this._iBoxSize=8;o="sapUiLocalBusyIndicatorBoxColor";this._sBoxColor=e.get(i+o);o="sapUiLocalBusyIndicatorBoxColorActive";this._sBoxColorActive=e.get(i+o);this._animateProxy=r.proxy(t,this)};s.prototype.exit=function(){clearTimeout(this._delayedCallId);delete this._delayedCallId};s.prototype.onThemeChanged=function(t){if(this.getDomRef()){this.invalidate()}};s.prototype.onAfterRendering=function(){var t=parseInt(this.getWidth());var i=parseInt(this.getHeight());var e=this.$();e.css("width",t+"px");e.css("height",i+"px");var o=this.$("animation");var r=Math.floor(t/2);r-=Math.floor(5*this._iBoxSize/2);var s=Math.floor(i/2)-Math.floor(this._iBoxSize/2);o.css("left",r+"px");o.css("top",s+"px");if(!this._$left){this._$left=this.$("leftBox")}if(!this._$middle){this._$middle=this.$("middleBox")}if(!this._$right){this._$right=this.$("rightBox")}this._delayedCallId=setTimeout(this._animateProxy.bind(this),0)};var t=function(){if(this.getDomRef()){var t=this;var i,e,o;var r="",s="";if(t._$left){i=t._$left}else{return}if(t._$middle){e=t._$middle}else{return}if(t._$right){o=t._$right}else{return}if(t._sBoxColor){r=t._sBoxColor}else{return}if(t._sBoxColorActive){s=t._sBoxColorActive}else{return}i.css("background-color",s);setTimeout(function(){i.css("background-color",r);e.css("background-color",s);setTimeout(function(){e.css("background-color",r);o.css("background-color",s);setTimeout(function(){o.css("background-color",r)},150)},150)},150);this._delayedCallId=setTimeout(this._animateProxy.bind(this),1200)}}})();return s});