/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/base/Log","sap/ui/core/ResizeHandler","sap/ui/thirdparty/jquery"],function(e,i,n,t){"use strict";var r={S:599,M:1023,L:1439};var s={S:"sapUi-Std-PaddingS",M:"sapUi-Std-PaddingM",L:"sapUi-Std-PaddingL",XL:"sapUi-Std-PaddingXL"};var a=function(e){if(!this.isA||!this.isA("sap.ui.core.Control")){i.error("Responsive Paddings enablement could be applied over controls only");return}this._initResponsivePaddingsEnablement=function(){this.addEventDelegate({onAfterRendering:d,onBeforeRendering:a},this)};function a(){u(this)}function d(){var i=c(this,e);if(i.length){window.requestAnimationFrame(function(){o(this)}.bind(this))}}function o(e){f(e);if(!e.__iResponsivePaddingsResizeHandlerId__){e.__iResponsivePaddingsResizeHandlerId__=n.register(e,f.bind(e,e))}}function u(e){if(e.__iResponsivePaddingsResizeHandlerId__){n.deregister(e.__iResponsivePaddingsResizeHandlerId__);e.__iResponsivePaddingsResizeHandlerId__=null}}function f(i,n){var t=c(i,e);var r=l(i,t);var s=n?n.size.width:i.$().width();p(r);v(r,s)}function c(e,i){var n=g(i);n=n.filter(function(i){return e.hasStyleClass(i)});if(!n.length){return[]}n=n.map(function(e){return e.split("--")[1]});n=n.map(function(e){return i[e]}).filter(function(e){return e});return n}function l(e,i){var n=t();i.forEach(function(i){if(i.suffix){n=n.add(e.$(i.suffix))}if(i.selector){n=n.add(e.$().find(i.selector).first())}});return n}function p(e){var i=Object.keys(s).map(function(e){return s[e]});e.each(function(e,n){var r=t(n).control(0);if(n===r.getDomRef()){i.forEach(r.removeStyleClass.bind(r))}else{t(n).removeClass(i.join(" "))}})}function v(e,i){var n;switch(true){case i<=r.S:n="S";break;case i<=r.M&&i>r.S:n="M";break;case i<=r.L&&i>r.M:n="L";break;default:n="XL";break}e.each(function(e,i){var r=t(i).control(0);if(i===r.getDomRef()){r.addStyleClass(s[n])}else{t(i).addClass(s[n])}})}function g(e){return Object.keys(e).map(function(e){return"sapUiResponsivePadding--"+e})}};return a});