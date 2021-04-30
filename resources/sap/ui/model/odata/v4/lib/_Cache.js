/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_GroupLock","./_Helper","./_Requestor","sap/base/Log","sap/base/util/isEmptyObject","sap/ui/base/SyncPromise"],function(e,t,i,n,r,s){"use strict";var o="sap.ui.model.odata.v4.lib._Cache",a=/\(\$uid=[-\w]+\)$/,u="@com.sap.vocabularies.Common.v1.Messages",h=/^-?\d+$/,l=/^([^(]*)(\(.*\))$/;function d(e,t,i,n){if(i.$count!==undefined){c(e,t,i,i.$count+n)}}function f(e,t){return t===""||e===t||e.startsWith(t+"/")}function c(e,i,n,r){if(typeof r==="string"){r=parseInt(r)}t.updateExisting(e,i,n,{$count:r})}function p(e,t,i,n,r,s){this.iActiveUsages=1;this.mChangeListeners={};this.fnGetOriginalResourcePath=r;this.iInactiveSince=Infinity;this.mPatchRequests={};this.oPendingRequestsPromise=null;this.mPostRequests={};this.oRequestor=e;this.bSentRequest=false;this.bSortExpandSelect=n;this.setResourcePath(t);this.setQueryOptions(i);this.bSharedRequest=s}p.prototype._delete=function(i,n,r,o,a){var u=r.split("/"),l=u.pop(),d=h.test(l)?Number(l):undefined,f=u.join("/"),c=this;this.checkSharedRequest();this.addPendingRequest();return this.fetchValue(e.$cached,f).then(function(e){var r=p.from$skip(l,e),u=l?e[r]||e.$byPredicate[r]:e,h,g=t.getPrivateAnnotation(u,"predicate"),P=t.buildPath(f,Array.isArray(e)?g:l),y=t.getPrivateAnnotation(u,"transient");if(y===true){throw new Error("No 'delete' allowed while waiting for server response")}if(y){i.unlock();c.oRequestor.removePost(y,u);return undefined}if(u["$ui5.deleting"]){throw new Error("Must not delete twice: "+n)}u["$ui5.deleting"]=true;h={"If-Match":o||u};n+=c.oRequestor.buildQueryString(c.sMetaPath,c.mQueryOptions,true);return s.all([c.oRequestor.request("DELETE",n,i.getUnlockedCopy(),h,undefined,undefined,undefined,undefined,t.buildPath(c.getOriginalResourcePath(u),P)).catch(function(e){if(e.status!==404){delete u["$ui5.deleting"];throw e}}).then(function(){if(Array.isArray(e)){a(c.removeElement(e,d,g,f),e)}else{if(l){t.updateExisting(c.mChangeListeners,f,e,p.makeUpdateData([l],null))}else{u["$ui5.deleted"]=true}a()}c.oRequestor.getModelInterface().reportBoundMessages(c.sResourcePath,[],[P])}),d===undefined&&c.requestCount(i.getUnlockedCopy()),i.unlock()])}).finally(function(){c.removePendingRequest()})};p.prototype.addPendingRequest=function(){var e;if(!this.oPendingRequestsPromise){this.oPendingRequestsPromise=new s(function(t){e=t});this.oPendingRequestsPromise.$count=0;this.oPendingRequestsPromise.$resolve=e}this.oPendingRequestsPromise.$count+=1};p.prototype.calculateKeyPredicate=function(e,i,n){var r,s=i[n];if(s&&s.$Key){r=t.getKeyPredicate(e,n,i);if(r){t.setPrivateAnnotation(e,"predicate",r)}}return r};p.prototype.checkSharedRequest=function(){if(this.bSharedRequest){throw new Error(this+" is read-only")}};p.prototype.create=function(e,n,r,o,a,u,h){var l,f=a&&a["@$ui5.keepTransientPath"],c,p=this;function g(){t.removeByPath(p.mPostRequests,r,a);l.splice(l.indexOf(a),1);l.$created-=1;d(p.mChangeListeners,r,l,-1);delete l.$byPredicate[o];if(!r){p.adjustReadRequests(0,-1)}e.cancel()}function P(){p.addPendingRequest();t.setPrivateAnnotation(a,"transient",true);h()}function y(e,i){var n=i.getGroupId();t.setPrivateAnnotation(a,"transient",n);t.addByPath(p.mPostRequests,r,a);return s.all([p.oRequestor.request("POST",e,i,null,c,P,g,undefined,t.buildPath(p.sResourcePath,r,o)),p.fetchTypes()]).then(function(e){var i=e[0],n;t.deletePrivateAnnotation(a,"postBody");t.deletePrivateAnnotation(a,"transient");a["@$ui5.context.isTransient"]=false;t.removeByPath(p.mPostRequests,r,a);p.visitResponse(i,e[1],t.getMetaPath(t.buildPath(p.sMetaPath,r)),r+o,f);if(!f){n=t.getPrivateAnnotation(i,"predicate");if(n){l.$byPredicate[n]=a;t.updateTransientPaths(p.mChangeListeners,o,n)}}t.updateSelected(p.mChangeListeners,t.buildPath(r,n||o),a,i,t.getQueryOptionsForPath(p.mQueryOptions,r).$select);p.removePendingRequest();return a},function(t){if(t.canceled){throw t}p.removePendingRequest();u(t);if(p.fetchTypes().isRejected()){throw t}return y(e,p.oRequestor.lockGroup(p.oRequestor.getGroupSubmitMode(n)==="API"?n:"$parked."+n,p,true,true))})}this.checkSharedRequest();a=t.merge({},a);a=i.cleanPayload(a);c=t.merge({},a);t.setPrivateAnnotation(a,"postBody",c);t.setPrivateAnnotation(a,"transientPredicate",o);a["@$ui5.context.isTransient"]=true;l=this.getValue(r);if(!Array.isArray(l)){throw new Error("Create is only supported for collections; '"+r+"' does not reference a collection")}l.unshift(a);l.$created+=1;d(this.mChangeListeners,r,l,1);l.$byPredicate=l.$byPredicate||{};l.$byPredicate[o]=a;if(!r){p.adjustReadRequests(0,1)}return n.then(function(t){t+=p.oRequestor.buildQueryString(p.sMetaPath,p.mQueryOptions,true);return y(t,e)})};p.prototype.deregisterChange=function(e,i){if(!this.bSharedRequest){t.removeByPath(this.mChangeListeners,e,i)}};p.prototype.drillDown=function(e,i,r,a){var u=s.resolve(e),h,d,f,c=false,g=this;function P(e){n.error("Failed to drill-down into "+i+", invalid segment: "+e,g.toString(),o);return undefined}function y(i,n,s){var o=f.slice(0,s).join("/"),a,u;if(Array.isArray(i)){return P(n)}return g.oRequestor.getModelInterface().fetchMetadata(g.sMetaPath+"/"+t.getMetaPath(o)).then(function(l){if(!l){return P(n)}if(l.$Type==="Edm.Stream"){a=i[n+"@odata.mediaReadLink"]||i[n+"@mediaReadLink"];u=g.oRequestor.getServiceUrl();return a||t.buildPath(u+g.sResourcePath,o)}if(!c){if(!h&&!Array.isArray(e)){h=e;d=0}return h&&g.fetchLateProperty(r,h,f.slice(0,d).join("/"),f.slice(d).join("/"),f.slice(d,s).join("/"))||P(n)}if(l.$kind==="NavigationProperty"){return null}if(!l.$Type.startsWith("Edm.")){return{}}if("$DefaultValue"in l){return l.$Type==="Edm.String"?l.$DefaultValue:t.parseLiteral(l.$DefaultValue,l.$Type,o)}return null})}if(!i){return u}f=i.split("/");return f.reduce(function(e,i,n){return e.then(function(e){var r,s,o;if(i==="$count"){return Array.isArray(e)?e.$count:P(i)}if(e===undefined||e===null){return undefined}if(typeof e!=="object"||i==="@$ui5._"||Array.isArray(e)&&(i[0]==="$"||i==="length")){return P(i)}if(t.hasPrivateAnnotation(e,"predicate")){h=e;d=n}o=e;c=c||t.getPrivateAnnotation(e,"transient");s=l.exec(i);if(s){if(s[1]){e=e[s[1]]}if(e){e=e.$byPredicate&&e.$byPredicate[s[2]]}}else{r=p.from$skip(i,e);if(a&&r===i&&(e[i]===undefined||e[i]===null)){e[i]={}}e=e[r]}return e===undefined&&i[0]!=="#"&&i[0]!=="@"?y(o,i,n+1):e})},u)};p.prototype.fetchLateProperty=function(e,i,n,r,s){var o,a,u,h,l,d,f=t.getMetaPath(n),c=this.fetchTypes().getResult(),p=[r],g=this;function P(e,i){var n=t.buildPath(o,i),r=c[n],s;if(!r){r=g.fetchType(c,n).getResult()}if(i){(r.$Key||[]).forEach(function(e){if(typeof e==="object"){e=e[Object.keys(e)[0]]}p.push(t.buildPath(i,e))});p.push(i+"/@odata.etag");p.push(i+"/@$ui5._/predicate")}if(e.$expand){s=Object.keys(e.$expand)[0];P(e.$expand[s],t.buildPath(i,s))}}if(!this.mLateQueryOptions){return undefined}o=t.buildPath(this.sMetaPath,f);l=t.intersectQueryOptions(t.getQueryOptionsForPath(this.mLateQueryOptions,n),[r],this.oRequestor.getModelInterface().fetchMetadata,o,{});if(!l){return undefined}P(l);a=t.buildPath(this.sResourcePath,n);d=a+this.oRequestor.buildQueryString(o,l,false,true);h=this.mPropertyRequestByPath[d];if(!h){u=a+this.oRequestor.buildQueryString(o,this.mQueryOptions,true);h=this.oRequestor.request("GET",u,e.getUnlockedCopy(),undefined,undefined,undefined,undefined,o,undefined,false,l).then(function(e){g.visitResponse(e,c,o,n);return e}).finally(function(){delete g.mPropertyRequestByPath[d]});this.mPropertyRequestByPath[d]=h}return h.then(function(e){var r=t.getPrivateAnnotation(e,"predicate");if(r&&t.getPrivateAnnotation(i,"predicate")!==r){throw new Error("GET "+d+": Key predicate changed from "+t.getPrivateAnnotation(i,"predicate")+" to "+r)}if(e["@odata.etag"]!==i["@odata.etag"]){throw new Error("GET "+d+": ETag changed")}t.updateSelected(g.mChangeListeners,n,i,e,p);return t.drillDown(i,s.split("/"))})};p.prototype.fetchType=function(e,t){var i=this;return this.oRequestor.fetchTypeForPath(t).then(function(n){var r,o=[];if(n){r=i.oRequestor.getModelInterface().fetchMetadata(t+"/"+u).getResult();if(r){n=Object.create(n);n[u]=r}e[t]=n;(n.$Key||[]).forEach(function(n){if(typeof n==="object"){n=n[Object.keys(n)[0]];o.push(i.fetchType(e,t+"/"+n.slice(0,n.lastIndexOf("/"))))}});return s.all(o).then(function(){return n})}})};p.prototype.fetchTypes=function(){var e,t,i=this;function n(r,s){if(s&&s.$expand){Object.keys(s.$expand).forEach(function(o){var a=r;o.split("/").forEach(function(n){a+="/"+n;e.push(i.fetchType(t,a))});n(a,s.$expand[o])})}}if(!this.oTypePromise){e=[];t={};e.push(this.fetchType(t,this.sMetaPath));n(this.sMetaPath,this.mQueryOptions);this.oTypePromise=s.all(e).then(function(){return t})}return this.oTypePromise};p.prototype.getDownloadUrl=function(e,i){var n=this.mQueryOptions;if(e){n=t.getQueryOptionsForPath(n,e);n=t.merge({},i,n)}return this.oRequestor.getServiceUrl()+t.buildPath(this.sResourcePath,e)+this.oRequestor.buildQueryString(t.buildPath(this.sMetaPath,t.getMetaPath(e)),n)};p.prototype.getLateQueryOptions=function(){return this.mLateQueryOptions};p.prototype.getMeasureRangePromise=function(){return undefined};p.prototype.getValue=function(e){throw new Error("Unsupported operation")};p.prototype.getOriginalResourcePath=function(e){return this.fnGetOriginalResourcePath&&this.fnGetOriginalResourcePath(e)||this.sResourcePath};p.prototype.getResourcePath=function(){return this.sResourcePath};p.prototype.hasChangeListeners=function(){return!r(this.mChangeListeners)};p.prototype.hasPendingChangesForPath=function(e){return Object.keys(this.mPatchRequests).some(function(t){return f(t,e)})||Object.keys(this.mPostRequests).some(function(t){return f(t,e)})};p.prototype.hasSentRequest=function(){return this.bSentRequest};p.prototype.patch=function(i,n){var r=this;this.checkSharedRequest();return this.fetchValue(e.$cached,i).then(function(e){t.updateExisting(r.mChangeListeners,i,e,n);return e})};p.prototype.refreshSingle=function(i,n,r,o,a,u){var h=this;this.checkSharedRequest();return this.fetchValue(e.$cached,n).then(function(e){var l=Object.assign({},t.getQueryOptionsForPath(h.mQueryOptions,n)),d;if(r!==undefined){o=t.getPrivateAnnotation(e[r],"predicate")}d=t.buildPath(h.sResourcePath,n,o);if(a&&h.mLateQueryOptions){t.aggregateQueryOptions(l,h.mLateQueryOptions)}delete l.$apply;delete l.$count;delete l.$filter;delete l.$orderby;delete l.$search;d+=h.oRequestor.buildQueryString(h.sMetaPath,l,false,h.bSortExpandSelect);h.bSentRequest=true;return s.all([h.oRequestor.request("GET",d,i,undefined,undefined,u),h.fetchTypes()]).then(function(t){var i=t[0];h.replaceElement(e,r,o,i,t[1],n);return i})})};p.prototype.refreshSingleWithRemove=function(i,n,r,o,a,u,h){var l=this;this.checkSharedRequest();return s.all([this.fetchValue(e.$cached,n),this.fetchTypes()]).then(function(e){var d=e[0],f,c,p={},g,P,y=Object.assign({},t.getQueryOptionsForPath(l.mQueryOptions,n)),m,R=t.buildPath(l.sResourcePath,n),v=[],q=e[1];if(r!==undefined){f=d[r];o=t.getPrivateAnnotation(f,"predicate")}else{f=d.$byPredicate[o]}P=t.getKeyFilter(f,l.sMetaPath,q);c=(y.$filter?"("+y.$filter+") and ":"")+P;delete y.$count;delete y.$orderby;l.bSentRequest=true;if(a){if(l.mLateQueryOptions){t.aggregateQueryOptions(y,l.mLateQueryOptions)}p=Object.assign({},y);p.$filter=c;y.$filter=P;delete y.$search;m=R+l.oRequestor.buildQueryString(l.sMetaPath,y,false,l.bSortExpandSelect);v.push(l.oRequestor.request("GET",m,i,undefined,undefined,u));if(r!==undefined&&(P!==c||p.$search)){delete p.$select;delete p.$expand;p.$count=true;p.$top=0;g=R+l.oRequestor.buildQueryString(l.sMetaPath,p);v.push(l.oRequestor.request("GET",g,i.getUnlockedCopy()))}}else{y.$filter=c;m=R+l.oRequestor.buildQueryString(l.sMetaPath,y,false,l.bSortExpandSelect);v.push(l.oRequestor.request("GET",m,i,undefined,undefined,u))}return s.all(v).then(function(e){var t=e[0].value,i=e[1]&&e[1]["@odata.count"]==="0";if(t.length>1){throw new Error("Unexpected server response, more than one entity returned.")}else if(t.length===0){l.removeElement(d,r,o,n);l.oRequestor.getModelInterface().reportBoundMessages(l.sResourcePath,[],[n+o]);h(false)}else if(i){l.removeElement(d,r,o,n);l.replaceElement(d,undefined,o,t[0],q,n);h(true)}else{l.replaceElement(d,r,o,t[0],q,n)}})})};p.prototype.registerChange=function(e,i){if(!this.bSharedRequest){t.addByPath(this.mChangeListeners,e,i)}};p.prototype.removeElement=function(e,i,n,r){var s,o;s=e.$byPredicate[n];if(i!==undefined){i=p.getElementIndex(e,n,i);e.splice(i,1);d(this.mChangeListeners,r,e,-1)}delete e.$byPredicate[n];o=t.getPrivateAnnotation(s,"transientPredicate");if(o){e.$created-=1;delete e.$byPredicate[o]}else if(!r){if(i!==undefined){this.iLimit-=1;this.adjustReadRequests(i,-1)}}return i};p.prototype.removePendingRequest=function(){if(this.oPendingRequestsPromise){this.oPendingRequestsPromise.$count-=1;if(!this.oPendingRequestsPromise.$count){this.oPendingRequestsPromise.$resolve();this.oPendingRequestsPromise=null}}};p.prototype.replaceElement=function(e,i,n,r,s,o){var a,u;if(i===undefined){e.$byPredicate[n]=r}else{i=p.getElementIndex(e,n,i);a=e[i];e[i]=e.$byPredicate[n]=r;u=t.getPrivateAnnotation(a,"transientPredicate");if(u){r["@$ui5.context.isTransient"]=false;e.$byPredicate[u]=r;t.setPrivateAnnotation(r,"transientPredicate",u)}}this.visitResponse(r,s,t.getMetaPath(t.buildPath(this.sMetaPath,o)),o+n)};p.prototype.requestCount=function(e){var t,i,n,r=this;if(this.mQueryOptions&&this.mQueryOptions.$count){i=Object.assign({},this.mQueryOptions);delete i.$expand;delete i.$orderby;delete i.$select;t=this.getFilterExcludingCreated();if(t){i.$filter=i.$filter?"("+i.$filter+") and "+t:t}i.$top=0;n=this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,i);return this.oRequestor.request("GET",n,e).then(function(e){var t=parseInt(e["@odata.count"])+r.aElements.$created;c(r.mChangeListeners,"",r.aElements,t);r.iLimit=t})}};p.prototype.resetChangesForPath=function(e){var i=this;Object.keys(this.mPatchRequests).forEach(function(t){var n,r;if(f(t,e)){r=i.mPatchRequests[t];for(n=r.length-1;n>=0;n-=1){i.oRequestor.removePatch(r[n])}delete i.mPatchRequests[t]}});Object.keys(this.mPostRequests).forEach(function(n){var r,s,o;if(f(n,e)){r=i.mPostRequests[n];for(s=r.length-1;s>=0;s-=1){o=t.getPrivateAnnotation(r[s],"transient");i.oRequestor.removePost(o,r[s])}delete i.mPostRequests[n]}})};p.prototype.setActive=function(e){if(e){this.iActiveUsages+=1;this.iInactiveSince=Infinity}else{this.iActiveUsages-=1;if(!this.iActiveUsages){this.iInactiveSince=Date.now()}this.mChangeListeners={}}};p.prototype.setLateQueryOptions=function(e){if(e){this.mLateQueryOptions={$select:e.$select,$expand:e.$expand}}else{this.mLateQueryOptions=null}};p.prototype.setProperty=function(i,n,r){var s=this;this.checkSharedRequest();return this.fetchValue(e.$cached,r,null,null,true).then(function(e){t.updateSelected(s.mChangeListeners,r,e,p.makeUpdateData(i.split("/"),n))})};p.prototype.setQueryOptions=function(e){this.checkSharedRequest();if(this.bSentRequest){throw new Error("Cannot set query options: Cache has already sent a request")}this.mQueryOptions=e;this.sQueryString=this.oRequestor.buildQueryString(this.sMetaPath,e,false,this.bSortExpandSelect)};p.prototype.setResourcePath=function(e){this.checkSharedRequest();this.sResourcePath=e;this.sMetaPath=t.getMetaPath("/"+e);this.oTypePromise=undefined;this.mLateQueryOptions=null;this.mPropertyRequestByPath={}};p.prototype.toString=function(){return this.oRequestor.getServiceUrl()+this.sResourcePath+this.sQueryString};p.prototype.update=function(i,r,a,u,h,l,d,f,c){var g,P=r.split("/"),y,m=this;this.checkSharedRequest();try{g=this.fetchValue(e.$cached,l)}catch(e){if(!e.$cached){throw e}g=s.resolve({"@odata.etag":"*"})}return g.then(function(e){var g=t.buildPath(l,r),R=i.getGroupId(),v,q,$,E,b,S,w=p.makeUpdateData(P,a);function O(){t.removeByPath(m.mPatchRequests,g,q);t.updateExisting(m.mChangeListeners,l,e,p.makeUpdateData(P,v))}function M(i,n){var r;function o(){r=m.oRequestor.lockGroup(R,m,true);if(c){c()}}q=m.oRequestor.request("PATCH",h,i,{"If-Match":e},w,o,O,undefined,t.buildPath(m.getOriginalResourcePath(e),l),n);t.addByPath(m.mPatchRequests,g,q);return s.all([q,m.fetchTypes()]).then(function(i){var n=i[0];t.removeByPath(m.mPatchRequests,g,q);if(!f){m.visitResponse(n,i[1],t.getMetaPath(t.buildPath(m.sMetaPath,l)),l)}t.updateExisting(m.mChangeListeners,l,e,f?{"@odata.etag":n["@odata.etag"]}:n)},function(i){var n=R;t.removeByPath(m.mPatchRequests,g,q);if(!u||i.canceled){throw i}u(i);switch(m.oRequestor.getGroupSubmitMode(R)){case"API":break;case"Auto":if(!m.oRequestor.hasChanges(R,e)){n="$parked."+R}break;default:throw i}r.unlock();r=undefined;return M(m.oRequestor.lockGroup(n,m,true,true),true)}).finally(function(){if(r){r.unlock()}})}if(!e){throw new Error("Cannot update '"+r+"': '"+l+"' does not exist")}b=t.getPrivateAnnotation(e,"transient");if(b){if(b===true){throw new Error("No 'update' allowed while waiting for server response")}if(b.startsWith("$parked.")){E=b;b=b.slice(8)}if(b!==R){throw new Error("The entity will be created via group '"+b+"'. Cannot patch via group '"+R+"'")}}v=t.drillDown(e,P);t.updateAll(m.mChangeListeners,l,e,w);$=t.getPrivateAnnotation(e,"postBody");if($){t.updateAll({},l,$,w)}if(d){y=d.split("/");d=t.buildPath(l,d);S=m.getValue(d);if(S===undefined){n.debug("Missing value for unit of measure "+d+" when updating "+g,m.toString(),o)}else{t.merge(b?$:w,p.makeUpdateData(y,S))}}if(b){if(E){t.setPrivateAnnotation(e,"transient",b);m.oRequestor.relocate(E,$,b)}i.unlock();return Promise.resolve()}m.oRequestor.relocateAll("$parked."+R,R,e);h+=m.oRequestor.buildQueryString(m.sMetaPath,m.mQueryOptions,true);return M(i)})};p.prototype.visitResponse=function(e,i,n,r,s,o){var h,l=false,d={},f=this.oRequestor.getServiceUrl()+this.sResourcePath,p=this;function g(e,i,n){l=true;if(e&&e.length){d[i]=e;e.forEach(function(e){if(e.longtextUrl){e.longtextUrl=t.makeAbsolute(e.longtextUrl,n)}})}}function P(e,i){return i?t.makeAbsolute(i,e):e}function y(e,i,n,r){var s={},a,u,l,d;for(a=0;a<e.length;a+=1){l=e[a];u=n===""?o+a:a;if(l&&typeof l==="object"){m(l,i,n,r,u);d=t.getPrivateAnnotation(l,"predicate");if(!n){h.push(d||u.toString())}if(d){s[d]=l;e.$byPredicate=s}}}}function m(e,n,o,l,d){var f,R,v=i[n],q=v&&v[u]&&v[u].$Path,$;l=P(l,e["@odata.context"]);R=p.calculateKeyPredicate(e,i,n);if(d!==undefined){o=t.buildPath(o,R||d)}else if(!s&&R){f=a.exec(o);if(f){o=o.slice(0,-f[0].length)+R}}if(r&&!h){h=[o]}if(q){$=t.drillDown(e,q.split("/"));if($!==undefined){g($,o,l)}}Object.keys(e).forEach(function(i){var r,s=n+"/"+i,a=e[i],u=t.buildPath(o,i);if(i.endsWith("@odata.mediaReadLink")||i.endsWith("@mediaReadLink")){e[i]=t.makeAbsolute(a,l)}if(i.includes("@")){return}if(Array.isArray(a)){a.$created=0;a.$count=undefined;r=e[i+"@odata.count"];if(r){c({},"",a,r)}else if(!e[i+"@odata.nextLink"]){c({},"",a,a.length)}y(a,s,u,P(l,e[i+"@odata.context"]))}else if(a&&typeof a==="object"){m(a,s,u,l)}})}if(o!==undefined){h=[];y(e.value,n||this.sMetaPath,"",P(f,e["@odata.context"]))}else if(e&&typeof e==="object"){m(e,n||this.sMetaPath,r||"",f)}if(l){this.oRequestor.getModelInterface().reportBoundMessages(this.getOriginalResourcePath(e),d,h)}};function g(e,t,i,n,r,s){p.call(this,e,t,i,n,function(){return r},s);this.sContext=undefined;this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;this.aElements.$tail=undefined;this.iLimit=Infinity;this.aReadRequests=[];this.bServerDrivenPaging=false;this.oSyncPromiseAll=undefined}g.prototype=Object.create(p.prototype);g.prototype.addKeptElement=function(e){this.aElements.$byPredicate[t.getPrivateAnnotation(e,"predicate")]=e};g.prototype.adjustReadRequests=function(e,t){this.aReadRequests.forEach(function(i){if(i.iStart>=e){i.iStart+=t;i.iEnd+=t}})};g.prototype.fetchValue=function(t,i,n,r,o){var a,u=i.split("/")[0],h,l=this;t.unlock();if(this.aElements.$byPredicate[u]){h=s.resolve()}else if((t===e.$cached||u!=="$count")&&this.aElements[u]!==undefined){h=s.resolve(this.aElements[u])}else{if(!this.oSyncPromiseAll){a=this.aElements.$tail?this.aElements.concat(this.aElements.$tail):this.aElements;this.oSyncPromiseAll=s.all(a)}h=this.oSyncPromiseAll}return h.then(function(){l.registerChange(i,r);return l.drillDown(l.aElements,i,t,o)})};g.prototype.fill=function(e,t,i){var n,r=Math.max(this.aElements.length,1024);if(i>r){if(this.aElements.$tail&&e){throw new Error("Cannot fill from "+t+" to "+i+", $tail already in use, # of elements is "+this.aElements.length)}this.aElements.$tail=e;i=this.aElements.length}for(n=t;n<i;n+=1){this.aElements[n]=e}this.oSyncPromiseAll=undefined};g.prototype.getFilterExcludingCreated=function(){var e,i,n,r=[],s;for(i=0;i<this.aElements.$created;i+=1){e=this.aElements[i];if(!e["@$ui5.context.isTransient"]){s=s||this.fetchTypes().getResult();n=t.getKeyFilter(e,this.sMetaPath,s);if(n){r.push(n)}}}return r.length?"not ("+r.join(" or ")+")":undefined};g.prototype.getQueryString=function(){var e=this.getFilterExcludingCreated(),i=Object.assign({},this.mQueryOptions),n=i.$filter,r=this.sQueryString;if(e){if(n){i.$filter="("+n+") and "+e;r=this.oRequestor.buildQueryString(this.sMetaPath,i,false,this.bSortExpandSelect)}else{r+=(r?"&":"?")+"$filter="+t.encode(e,false)}}return r};g.prototype.getReadRange=function(e,t,i){var n=this.aElements;function r(e,t){var i;for(i=e;i<t;i+=1){if(n[i]===undefined){return true}}return false}if(r(e+t,e+t+i/2)){t+=i}if(r(Math.max(e-i/2,0),e)){t+=i;e-=i;if(e<0){t+=e;if(isNaN(t)){t=Infinity}e=0}}return{length:t,start:e}};g.prototype.getResourcePathWithQuery=function(e,t){var i=this.aElements.$created,n=this.getQueryString(),r=n?"&":"?",s=t-e,o=this.sResourcePath+n;if(e<i){throw new Error("Must not request created element")}e-=i;if(e>0||s<Infinity){o+=r+"$skip="+e}if(s<Infinity){o+="&$top="+s}return o};g.prototype.getValue=function(t){var i=this.drillDown(this.aElements,t,e.$cached);if(i.isFulfilled()){return i.getResult()}};g.prototype.handleResponse=function(e,i,n,r){var s=-1,o,a=this.aElements.$created,u,h,l,d=this.aElements.$count,f,p=n.value.length;this.sContext=n["@odata.context"];this.visitResponse(n,r,undefined,undefined,undefined,e);for(h=0;h<p;h+=1){u=n.value[h];f=t.getPrivateAnnotation(u,"predicate");if(f){l=this.aElements.$byPredicate[f];if(l){if(u["@odata.etag"]===l["@odata.etag"]){u=l}else if(this.hasPendingChangesForPath(f)){throw new Error("Modified on client and on server: "+this.sResourcePath+f)}}this.aElements.$byPredicate[f]=u}this.aElements[e+h]=u}o=n["@odata.count"];if(o){this.iLimit=s=parseInt(o)}if(n["@odata.nextLink"]){this.bServerDrivenPaging=true;if(i<this.aElements.length){for(h=e+p;h<i;h+=1){delete this.aElements[h]}}else{this.aElements.length=e+p}}else if(p<i-e){if(s===-1){s=d&&d-a}s=Math.min(s!==undefined?s:Infinity,e-a+p);this.aElements.length=a+s;this.iLimit=s;if(!o&&s>0&&!this.aElements[s-1]){s=undefined}}if(s!==-1){c(this.mChangeListeners,"",this.aElements,s!==undefined?s+a:undefined)}};g.prototype.read=function(e,t,i,n,r){var o,a,u,h,l=-1,d=this.oPendingRequestsPromise||this.aElements.$tail,f,c=this;if(e<0){throw new Error("Illegal index "+e+", must be >= 0")}if(t<0){throw new Error("Illegal length "+t+", must be >= 0")}if(d){return d.then(function(){return c.read(e,t,i,n,r)})}f=this.getReadRange(e,t,this.bServerDrivenPaging?0:i);h=Math.min(f.start+f.length,this.aElements.$created+this.iLimit);a=Math.min(h,Math.max(f.start,this.aElements.length)+1);for(o=f.start;o<a;o+=1){if(this.aElements[o]!==undefined){if(l>=0){this.requestElements(l,o,n.getUnlockedCopy(),r);r=undefined;l=-1}}else if(l<0){l=o}}if(l>=0){this.requestElements(l,h,n.getUnlockedCopy(),r)}n.unlock();u=this.aElements.slice(e,h);if(this.aElements.$tail){u.push(this.aElements.$tail)}return s.all(u).then(function(){var t=c.aElements.slice(e,h);t.$count=c.aElements.$count;return{"@odata.context":c.sContext,value:t}})};g.prototype.requestElements=function(e,t,i,n){var r,o={iEnd:t,iStart:e},a=this;this.aReadRequests.push(o);this.bSentRequest=true;r=s.all([this.oRequestor.request("GET",this.getResourcePathWithQuery(e,t),i,undefined,undefined,n),this.fetchTypes()]).then(function(e){if(a.aElements.$tail===r){a.aElements.$tail=undefined}a.handleResponse(o.iStart,o.iEnd,e[0],e[1])}).catch(function(e){a.fill(undefined,o.iStart,o.iEnd);throw e}).finally(function(){a.aReadRequests.splice(a.aReadRequests.indexOf(o),1)});this.fill(r,e,t)};g.prototype.requestSideEffects=function(e,i,n,r,o){var a,u=[],h,l,d,f=this.fetchTypes().getResult(),c=this,p;function g(e){var i=t.getKeyFilter(e,c.sMetaPath,f);u.push(i);return i}this.checkSharedRequest();if(this.oPendingRequestsPromise){return this.oPendingRequestsPromise.then(function(){return c.requestSideEffects(e,i,n,r,o)})}l=t.intersectQueryOptions(this.mLateQueryOptions||this.mQueryOptions,i,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,n,"",true);if(!l){return s.resolve()}if(o===undefined){if(!g(this.aElements[r])){return null}}else{for(p=0;p<this.aElements.length;p+=1){a=this.aElements[p];if(!a||t.hasPrivateAnnotation(a,"transient")){continue}if((p<r||p>=r+o)&&!t.hasPrivateAnnotation(a,"transientPredicate")){delete this.aElements.$byPredicate[t.getPrivateAnnotation(a,"predicate")];delete this.aElements[p];continue}if(!g(a)){return null}}this.aElements.length=o?Math.min(r+o,this.aElements.length):this.aElements.$created;if(!u.length){return s.resolve()}}l.$filter=u.join(" or ");if(u.length>1){l.$top=u.length}t.selectKeyProperties(l,f[this.sMetaPath]);delete l.$count;delete l.$orderby;delete l.$search;h=t.extractMergeableQueryOptions(l);d=this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,l,false,true);return this.oRequestor.request("GET",d,e,undefined,undefined,undefined,undefined,this.sMetaPath,undefined,false,h).then(function(e){var n,r,s,o;function a(e){e=e.slice(r.length+1);return!i.some(function(i){return t.getRelativePath(e,i)!==undefined})}if(e.value.length!==u.length){throw new Error("Expected "+u.length+" row(s), but instead saw "+e.value.length)}c.visitResponse(e,f,undefined,"",false,NaN);for(s=0,o=e.value.length;s<o;s+=1){n=e.value[s];r=t.getPrivateAnnotation(n,"predicate");t.updateAll(c.mChangeListeners,r,c.aElements.$byPredicate[r],n,a)}})};function P(e,t,i){p.call(this,e,t,i);this.oPromise=null}P.prototype=Object.create(p.prototype);P.prototype._delete=function(){throw new Error("Unsupported")};P.prototype.create=function(){throw new Error("Unsupported")};P.prototype.fetchValue=function(e,t,i,n,r){var o=this;if(r){throw new Error("Unsupported argument: bCreateOnDemand")}if(this.oPromise){e.unlock()}else{this.bSentRequest=true;this.oPromise=s.resolve(this.oRequestor.request("GET",this.sResourcePath+this.sQueryString,e,undefined,undefined,i,undefined,this.sMetaPath))}return this.oPromise.then(function(e){e=e||{value:null};o.registerChange("",n);return e.value})};P.prototype.update=function(){throw new Error("Unsupported")};function y(e,t,i,n,r,s,o,a){p.call(this,e,t,i,n,s,r);this.sMetaPath=a||this.sMetaPath;this.bPost=o;this.bPosting=false;this.oPromise=null}y.prototype=Object.create(p.prototype);y.prototype.fetchValue=function(e,t,i,n,r){var o=this.sResourcePath+this.sQueryString,a=this;if(this.oPromise){e.unlock()}else{if(this.bPost){throw new Error("Cannot fetch a value before the POST request")}this.bSentRequest=true;this.oPromise=s.all([this.oRequestor.request("GET",o,e,undefined,undefined,i,undefined,this.sMetaPath),this.fetchTypes()]).then(function(e){a.visitResponse(e[0],e[1]);return e[0]})}return this.oPromise.then(function(i){if(i&&i["$ui5.deleted"]){throw new Error("Cannot read a deleted entity")}a.registerChange(t,n);return a.drillDown(i,t,e,r)})};y.prototype.getValue=function(t){var i;if(this.oPromise&&this.oPromise.isFulfilled()){i=this.drillDown(this.oPromise.getResult(),t,e.$cached);if(i.isFulfilled()){return i.getResult()}}};y.prototype.post=function(e,t,i){var n,r="POST",o=this;this.checkSharedRequest();if(!this.bPost){throw new Error("POST request not allowed")}if(this.bPosting){throw new Error("Parallel POST requests not allowed")}if(i){n=e.getGroupId();this.oRequestor.relocateAll("$parked."+n,n,i)}if(t){r=t["X-HTTP-Method"]||r;delete t["X-HTTP-Method"];if(this.oRequestor.isActionBodyOptional()&&!Object.keys(t).length){t=undefined}}this.bPosting=true;this.bSentRequest=true;this.oPromise=s.all([this.oRequestor.request(r,this.sResourcePath+this.sQueryString,e,i&&{"If-Match":i},t),this.fetchTypes()]).then(function(e){o.visitResponse(e[0],e[1]);o.bPosting=false;return e[0]},function(e){o.bPosting=false;throw e});return this.oPromise};y.prototype.requestSideEffects=function(i,n,r,o){var a,u=this.oPromise,h,l,d=this;this.checkSharedRequest();h=u&&t.intersectQueryOptions(this.mLateQueryOptions||this.mQueryOptions,n,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,r);if(!h){return s.resolve()}a=t.extractMergeableQueryOptions(h);o=(o||this.sResourcePath)+this.oRequestor.buildQueryString(this.sMetaPath,h,false,true);l=s.all([this.oRequestor.request("GET",o,i,undefined,undefined,undefined,undefined,this.sMetaPath,undefined,false,a),this.fetchTypes(),this.fetchValue(e.$cached,"")]).then(function(e){return e}).then(function(e){var i=e[0],r=e[2];d.visitResponse(i,e[1]);t.updateAll(d.mChangeListeners,"",r,i,function(e){return!n.some(function(i){return t.getRelativePath(e,i)!==undefined})})});return l};p.create=function(e,i,n,r,s,o){var a,u,h,l,d;if(o){h=i+e.buildQueryString(t.getMetaPath("/"+i),n,false,r);d=e.$mSharedCollectionCacheByPath;if(!d){d=e.$mSharedCollectionCacheByPath={}}l=d[h];if(l){l.setActive(true)}else{u=Object.keys(d);a=u.length;if(a>100){u.filter(function(e){return!d[e].iActiveUsages}).sort(function(e,t){return d[e].iInactiveSince-d[t].iInactiveSince}).every(function(e){delete d[e];a-=1;return a>100})}l=d[h]=new g(e,i,n,r,s,o)}return l}return new g(e,i,n,r,s)};p.createProperty=function(e,t,i){return new P(e,t,i)};p.createSingle=function(e,t,i,n,r,s,o,a){return new y(e,t,i,n,r,s,o,a)};p.from$skip=function(e,t){return h.test(e)?t.$created+Number(e):e};p.getElementIndex=function(e,i,n){var r=e[n];if(!r||t.getPrivateAnnotation(r,"predicate")!==i){n=e.indexOf(e.$byPredicate[i])}return n};p.makeUpdateData=function(e,t){return e.reduceRight(function(e,t){var i={};i[t]=e;return i},t)};return p},false);