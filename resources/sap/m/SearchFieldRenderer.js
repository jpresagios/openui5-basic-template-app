/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/InvisibleText"],function(e,t){"use strict";var i={};i.render=function(i,r){if(!r.getVisible()){return}var s=r.getPlaceholder(),a=r.getValue(),d=r.getProperty("width"),l=r.getId(),o=r.getShowRefreshButton(),w=r.getShowSearchButton(),p={},u,b=r.getRefreshButtonTooltip(),f,n=sap.ui.getCore().getConfiguration().getAccessibility();i.write("<div");i.writeControlData(r);if(d){i.writeAttribute("style","width:"+d+";")}i.addClass("sapMSF");if(a){i.addClass("sapMSFVal")}if(!r.getEnabled()){i.addClass("sapMSFDisabled")}i.writeClasses();i.write(">");i.write("<form");i.writeAttribute("id",l+"-F");i.addClass("sapMSFF");if(!w){i.addClass("sapMSFNS")}else if(o){i.addClass("sapMSFReload")}i.writeClasses();i.write(">");if(!r._hasPlaceholder&&s){i.write("<label ");i.writeAttribute("id",l+"-P");i.writeAttribute("for",l+"-I");i.addClass("sapMSFPlaceholder");i.writeClasses();i.write(">");i.writeEscaped(s);i.write("</label>")}i.write("<input");i.writeAttribute("type","search");i.writeAttribute("autocomplete","off");if(e.browser.safari){i.writeAttribute("autocorrect","off")}i.writeAttribute("id",r.getId()+"-I");var S=r.getTooltip_AsString();if(S){i.writeAttributeEscaped("title",S)}i.addClass("sapMSFI");if(e.os.android&&e.os.version>=4&&e.os.version<4.1){i.addClass("sapMSFIA4")}i.writeClasses();if(r.getEnableSuggestions()&&e.system.phone){i.writeAttribute("readonly","readonly")}if(!r.getEnabled()){i.writeAttribute("disabled","disabled")}if(s){i.writeAttributeEscaped("placeholder",s)}if(r.getMaxLength()){i.writeAttribute("maxLength",r.getMaxLength())}if(a){i.writeAttributeEscaped("value",a)}if(r.getEnabled()&&o){var c=t.getStaticId("sap.m","SEARCHFIELD_ARIA_F5");if(c){p.describedby={value:c,append:true}}}var g=r.getId()+"-I"+"-labelledby";p.labelledby={value:g,append:true};i.writeAccessibilityState(r,p);i.write(">");if(n){var C=r.getPlaceholder()||"";if(C){i.write("<span");i.writeAttribute("id",g);i.writeAttribute("aria-hidden","true");i.addClass("sapUiInvisibleText");i.writeClasses();i.write(">");i.writeEscaped(C.trim());i.write("</span>")}}if(r.getEnabled()){i.write("<div");i.writeAttribute("id",r.getId()+"-reset");f=a===""?this.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP:this.oSearchFieldToolTips.RESET_BUTTON_TOOLTIP;i.writeAttributeEscaped("title",f);i.addClass("sapMSFR");i.addClass("sapMSFB");if(e.browser.firefox){i.addClass("sapMSFBF")}if(!w){i.addClass("sapMSFNS")}i.writeClasses();i.write("></div>");if(w){i.write("<div");i.writeAttribute("id",r.getId()+"-search");i.addClass("sapMSFS");i.addClass("sapMSFB");if(e.browser.firefox){i.addClass("sapMSFBF")}i.writeClasses();if(o){u=b===""?this.oSearchFieldToolTips.REFRESH_BUTTON_TOOLTIP:b}else{u=this.oSearchFieldToolTips.SEARCH_BUTTON_TOOLTIP}i.writeAttributeEscaped("title",u);i.write("></div>")}}i.write("</form>");i.write("</div>")};return i},true);