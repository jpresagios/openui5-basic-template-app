/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_AggregationHelper","./_Cache","./_Helper","./_Parser","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/thirdparty/jquery"],function(e,t,r,i,n,o,s){"use strict";var u=/,|%2C|%2c/,a=new RegExp("^"+i.sODataIdentifier+"(?:"+i.sWhitespace+"+(?:asc|desc))?$"),l=new RegExp(i.sWhitespace+"+");function c(r,i,n,o){var u={},a,l,h;t.call(this,r,i,o,true);this.oAggregation=n;if(e.hasMinOrMax(n.aggregate)){if(n.groupLevels.length){throw new Error("Unsupported group levels together with min/max")}this.oMeasureRangePromise=new Promise(function(e,t){h=e});l=e.buildApply(n,o,u);this.oFirstLevel=t.create(r,i,l,true);this.oFirstLevel.getResourcePath=c.getResourcePath.bind(this.oFirstLevel,n,o);this.oFirstLevel.handleResponse=c.handleResponse.bind(this.oFirstLevel,null,u,h,this.oFirstLevel.handleResponse)}else if(n.groupLevels.length){if(o.$count){throw new Error("Unsupported system query option: $count")}if(o.$filter){throw new Error("Unsupported system query option: $filter")}a=c.filterAggregationForFirstLevel(n);l=s.extend({},o,{$orderby:c.filterOrderby(o.$orderby,a)});delete l.$count;l=e.buildApply(a,l);l.$count=true;this.oFirstLevel=t.create(r,i,l,true);this.oFirstLevel.calculateKeyPredicate=c.calculateKeyPredicate.bind(null,a,this.oFirstLevel.aElements.$byPredicate)}else{this.oFirstLevel=t.create(r,i,o,true);this.oFirstLevel.getResourcePath=c.getResourcePath.bind(this.oFirstLevel,n,o);this.oFirstLevel.handleResponse=c.handleResponse.bind(this.oFirstLevel,n,null,null,this.oFirstLevel.handleResponse)}}c.prototype=Object.create(t.prototype);c.prototype.fetchValue=function(e,t,r,i){var s=this;if(t==="$count"){if(!this.mQueryOptions.$count){n.error("Failed to drill-down into $count, invalid segment: $count",this.toString(),"sap.ui.model.odata.v4.lib._Cache");return o.resolve()}if(!this.oMeasureRangePromise){return this.oFirstLevel.fetchValue(e,t).then(function(){return s.oFirstLevel.iLeafCount})}}return this.oFirstLevel.fetchValue(e,t,r,i)};c.prototype.getMeasureRangePromise=function(){return this.oMeasureRangePromise};c.prototype.read=function(e,t,r,i,n){var o=this.oFirstLevel.read(e,t,r,i,n);if(!this.oMeasureRangePromise){return o.then(function(e){e.value.forEach(function(e){e["@$ui5.node.isExpanded"]=false;e["@$ui5.node.isTotal"]=true;e["@$ui5.node.level"]=1});return e})}return o};c.prototype.toString=function(){return this.oRequestor.getServiceUrl()+this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,e.buildApply(this.oAggregation,this.mQueryOptions),false,true)};c.calculateKeyPredicate=function(e,t,i,n,o){var s=e.groupLevels[0],u=r.formatLiteral(i[s],n[o][s].$Type),a="("+encodeURIComponent(s)+"="+encodeURIComponent(u)+")";function l(e){return JSON.stringify(r.publicClone(e))}if(a in t){throw new Error("Multi-unit situation detected: "+l(i)+" vs. "+l(t[a]))}r.setPrivateAnnotation(i,"predicate",a)};c.create=function(e,t,r,i){return new c(e,t,r,i)};c.filterAggregationForFirstLevel=function(e){function t(e,t){e[t]=this[t];return e}function r(e,r){return Object.keys(e).filter(r).reduce(t.bind(e),{})}function i(t){return e.aggregate[t].subtotals}function n(t){return e.groupLevels.indexOf(t)>=0}return{aggregate:r(e.aggregate,i),group:r(e.group,n),groupLevels:e.groupLevels}};c.filterOrderby=function(e,t){if(e){return e.split(u).filter(function(e){var r;if(a.test(e)){r=e.split(l)[0];return r in t.aggregate||r in t.group||t.groupLevels.indexOf(r)>=0}return true}).join(",")}};c.getResourcePath=function(t,r,i,n){r=s.extend({},r,{$skip:i,$top:n-i});r=e.buildApply(t,r,null,this.bFollowUp);this.bFollowUp=true;return this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,r,false,true)};c.handleResponse=function(e,t,r,i,n,o,s,u){var a,l={},c;function h(e){l[e]=l[e]||{};return l[e]}if(t){c=s.value.shift();s["@odata.count"]=c.UI5__count;for(a in t){h(t[a].measure)[t[a].method]=c[a]}r(l);this.handleResponse=i}else{c=s.value[0];if("UI5__count"in c){this.iLeafCount=parseInt(c.UI5__count);s["@odata.count"]=this.iLeafCount+1;if(n>0){s.value.shift()}}if(n===0){Object.keys(c).forEach(function(e){if(e.startsWith("UI5grand__")){c[e.slice(10)]=c[e]}});Object.keys(e.aggregate).forEach(function(e){c[e]=c[e]||null});Object.keys(e.group).forEach(function(e){c[e]=null})}}i.call(this,n,o,s,u)};return c},false);