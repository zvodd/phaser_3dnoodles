var dr=Object.create;var gs=Object.defineProperty;var fr=Object.getOwnPropertyDescriptor;var pr=Object.getOwnPropertyNames;var mr=Object.getPrototypeOf,gr=Object.prototype.hasOwnProperty;var ii=(g,t)=>()=>(t||g((t={exports:{}}).exports,t),t.exports);var xr=(g,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of pr(t))!gr.call(g,i)&&i!==e&&gs(g,i,{get:()=>t[i],enumerable:!(n=fr(t,i))||n.enumerable});return g};var xs=(g,t,e)=>(e=g!=null?dr(mr(g)):{},xr(t||!g||!g.__esModule?gs(e,"default",{value:g,enumerable:!0}):e,g));var nr=ii(Qn=>{"use strict";Object.defineProperty(Qn,"__esModule",{value:!0});Qn.VERSION=void 0;Qn.VERSION="0.0.5"});var rr=ii(ye=>{"use strict";var ir=ye&&ye.__spreadArray||function(g,t){for(var e=0,n=t.length,i=g.length;e<n;e++,i++)g[i]=t[e];return g};Object.defineProperty(ye,"__esModule",{value:!0});ye.Events=void 0;var Ql=nr(),jl=function(){function g(t,e,n){n===void 0&&(n=!1),this.fn=t,this.context=e,this.once=n}return g}(),sr=function(g,t,e,n,i){if(typeof e!="function")throw new TypeError("The listener must be a function");var s=new jl(e,n||g,i);return g._events.has(t)?g._events.get(t).fn?g._events.set(t,[g._events.get(t),s]):g._events.get(t).push(s):(g._events.set(t,s),g._eventsCount++),g},jn=function(g,t){--g._eventsCount===0?g._events=new Map:g._events.delete(t)},tc=function(){function g(){this._events=new Map,this._eventsCount=0}return Object.defineProperty(g,"VERSION",{get:function(){return Ql.VERSION},enumerable:!1,configurable:!0}),g.prototype.eventNames=function(){return Array.from(this._events.keys())},g.prototype.listeners=function(t){var e=this._events.get(t);if(!e)return[];if(e.fn)return[e.fn];for(var n=0,i=e.length,s=new Array(i);n<i;n++)s[n]=e[n].fn;return s},g.prototype.listenerCount=function(t){var e=this._events.get(t);return e?e.fn?1:e.length:0},g.prototype.emit=function(t){for(var e,n,i=[],s=1;s<arguments.length;s++)i[s-1]=arguments[s];if(!this._events.has(t))return!1;var o=this._events.get(t),l;if(o.fn)return o.once&&this.removeListener(t,o.fn,void 0,!0),(e=o.fn).call.apply(e,ir([o.context],i)),!0;var a=o.length;for(l=0;l<a;l++)o[l].once&&this.removeListener(t,o[l].fn,void 0,!0),(n=o[l].fn).call.apply(n,ir([o[l].context],i));return!0},g.prototype.on=function(t,e,n){return sr(this,t,e,n,!1)},g.prototype.once=function(t,e,n){return sr(this,t,e,n,!0)},g.prototype.removeListener=function(t,e,n,i){if(!this._events.has(t))return this;if(!e)return jn(this,t),this;var s=this._events.get(t);if(s.fn)s.fn===e&&(!i||s.once)&&(!n||s.context===n)&&jn(this,t);else{for(var o=0,l=[],a=s.length;o<a;o++)(s[o].fn!==e||i&&!s[o].once||n&&s[o].context!==n)&&l.push(s[o]);l.length?this._events.set(t,l.length===1?l[0]:l):jn(this,t)}return this},g.prototype.removeAllListeners=function(t){return t?this._events.delete(t)&&jn(this,t):(this._events=new Map,this._eventsCount=0),this},Object.defineProperty(g.prototype,"off",{get:function(){return this.removeListener},enumerable:!1,configurable:!0}),Object.defineProperty(g.prototype,"addListener",{get:function(){return this.on},enumerable:!1,configurable:!0}),g}();ye.Events=tc});var lr=ii((qe,ls)=>{(function(t,e){typeof qe=="object"&&typeof ls=="object"?ls.exports=e():typeof define=="function"&&define.amd?define("Matter",[],e):typeof qe=="object"?qe.Matter=e():t.Matter=e()})(qe,function(){return function(g){var t={};function e(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return g[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=g,e.c=t,e.d=function(n,i,s){e.o(n,i)||Object.defineProperty(n,i,{enumerable:!0,get:s})},e.r=function(n){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,i){if(i&1&&(n=e(n)),i&8||i&4&&typeof n=="object"&&n&&n.__esModule)return n;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:n}),i&2&&typeof n!="string")for(var o in n)e.d(s,o,function(l){return n[l]}.bind(null,o));return s},e.n=function(n){var i=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(i,"a",i),i},e.o=function(n,i){return Object.prototype.hasOwnProperty.call(n,i)},e.p="",e(e.s=20)}([function(g,t){var e={};g.exports=e,function(){e._baseDelta=1e3/60,e._nextId=0,e._seed=0,e._nowStartTime=+new Date,e._warnedOnce={},e._decomp=null,e.extend=function(i,s){var o,l,a;typeof s=="boolean"?(o=2,a=s):(o=1,a=!0);for(var u=o;u<arguments.length;u++){var h=arguments[u];if(h)for(var r in h)a&&h[r]&&h[r].constructor===Object&&(!i[r]||i[r].constructor===Object)?(i[r]=i[r]||{},e.extend(i[r],a,h[r])):i[r]=h[r]}return i},e.clone=function(i,s){return e.extend({},s,i)},e.keys=function(i){if(Object.keys)return Object.keys(i);var s=[];for(var o in i)s.push(o);return s},e.values=function(i){var s=[];if(Object.keys){for(var o=Object.keys(i),l=0;l<o.length;l++)s.push(i[o[l]]);return s}for(var a in i)s.push(i[a]);return s},e.get=function(i,s,o,l){s=s.split(".").slice(o,l);for(var a=0;a<s.length;a+=1)i=i[s[a]];return i},e.set=function(i,s,o,l,a){var u=s.split(".").slice(l,a);return e.get(i,s,0,-1)[u[u.length-1]]=o,o},e.shuffle=function(i){for(var s=i.length-1;s>0;s--){var o=Math.floor(e.random()*(s+1)),l=i[s];i[s]=i[o],i[o]=l}return i},e.choose=function(i){return i[Math.floor(e.random()*i.length)]},e.isElement=function(i){return typeof HTMLElement<"u"?i instanceof HTMLElement:!!(i&&i.nodeType&&i.nodeName)},e.isArray=function(i){return Object.prototype.toString.call(i)==="[object Array]"},e.isFunction=function(i){return typeof i=="function"},e.isPlainObject=function(i){return typeof i=="object"&&i.constructor===Object},e.isString=function(i){return toString.call(i)==="[object String]"},e.clamp=function(i,s,o){return i<s?s:i>o?o:i},e.sign=function(i){return i<0?-1:1},e.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-e._nowStartTime},e.random=function(i,s){return i=typeof i<"u"?i:0,s=typeof s<"u"?s:1,i+n()*(s-i)};var n=function(){return e._seed=(e._seed*9301+49297)%233280,e._seed/233280};e.colorToNumber=function(i){return i=i.replace("#",""),i.length==3&&(i=i.charAt(0)+i.charAt(0)+i.charAt(1)+i.charAt(1)+i.charAt(2)+i.charAt(2)),parseInt(i,16)},e.logLevel=1,e.log=function(){console&&e.logLevel>0&&e.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},e.info=function(){console&&e.logLevel>0&&e.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},e.warn=function(){console&&e.logLevel>0&&e.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},e.warnOnce=function(){var i=Array.prototype.slice.call(arguments).join(" ");e._warnedOnce[i]||(e.warn(i),e._warnedOnce[i]=!0)},e.deprecated=function(i,s,o){i[s]=e.chain(function(){e.warnOnce("\u{1F505} deprecated \u{1F505}",o)},i[s])},e.nextId=function(){return e._nextId++},e.indexOf=function(i,s){if(i.indexOf)return i.indexOf(s);for(var o=0;o<i.length;o++)if(i[o]===s)return o;return-1},e.map=function(i,s){if(i.map)return i.map(s);for(var o=[],l=0;l<i.length;l+=1)o.push(s(i[l]));return o},e.topologicalSort=function(i){var s=[],o=[],l=[];for(var a in i)!o[a]&&!l[a]&&e._topologicalSort(a,o,l,i,s);return s},e._topologicalSort=function(i,s,o,l,a){var u=l[i]||[];o[i]=!0;for(var h=0;h<u.length;h+=1){var r=u[h];o[r]||s[r]||e._topologicalSort(r,s,o,l,a)}o[i]=!1,s[i]=!0,a.push(i)},e.chain=function(){for(var i=[],s=0;s<arguments.length;s+=1){var o=arguments[s];o._chained?i.push.apply(i,o._chained):i.push(o)}var l=function(){for(var a,u=new Array(arguments.length),h=0,r=arguments.length;h<r;h++)u[h]=arguments[h];for(h=0;h<i.length;h+=1){var c=i[h].apply(a,u);typeof c<"u"&&(a=c)}return a};return l._chained=i,l},e.chainPathBefore=function(i,s,o){return e.set(i,s,e.chain(o,e.get(i,s)))},e.chainPathAfter=function(i,s,o){return e.set(i,s,e.chain(e.get(i,s),o))},e.setDecomp=function(i){e._decomp=i},e.getDecomp=function(){var i=e._decomp;try{!i&&typeof window<"u"&&(i=window.decomp),!i&&typeof global<"u"&&(i=global.decomp)}catch{i=null}return i}}()},function(g,t){var e={};g.exports=e,function(){e.create=function(n){var i={min:{x:0,y:0},max:{x:0,y:0}};return n&&e.update(i,n),i},e.update=function(n,i,s){n.min.x=1/0,n.max.x=-1/0,n.min.y=1/0,n.max.y=-1/0;for(var o=0;o<i.length;o++){var l=i[o];l.x>n.max.x&&(n.max.x=l.x),l.x<n.min.x&&(n.min.x=l.x),l.y>n.max.y&&(n.max.y=l.y),l.y<n.min.y&&(n.min.y=l.y)}s&&(s.x>0?n.max.x+=s.x:n.min.x+=s.x,s.y>0?n.max.y+=s.y:n.min.y+=s.y)},e.contains=function(n,i){return i.x>=n.min.x&&i.x<=n.max.x&&i.y>=n.min.y&&i.y<=n.max.y},e.overlaps=function(n,i){return n.min.x<=i.max.x&&n.max.x>=i.min.x&&n.max.y>=i.min.y&&n.min.y<=i.max.y},e.translate=function(n,i){n.min.x+=i.x,n.max.x+=i.x,n.min.y+=i.y,n.max.y+=i.y},e.shift=function(n,i){var s=n.max.x-n.min.x,o=n.max.y-n.min.y;n.min.x=i.x,n.max.x=i.x+s,n.min.y=i.y,n.max.y=i.y+o}}()},function(g,t){var e={};g.exports=e,function(){e.create=function(n,i){return{x:n||0,y:i||0}},e.clone=function(n){return{x:n.x,y:n.y}},e.magnitude=function(n){return Math.sqrt(n.x*n.x+n.y*n.y)},e.magnitudeSquared=function(n){return n.x*n.x+n.y*n.y},e.rotate=function(n,i,s){var o=Math.cos(i),l=Math.sin(i);s||(s={});var a=n.x*o-n.y*l;return s.y=n.x*l+n.y*o,s.x=a,s},e.rotateAbout=function(n,i,s,o){var l=Math.cos(i),a=Math.sin(i);o||(o={});var u=s.x+((n.x-s.x)*l-(n.y-s.y)*a);return o.y=s.y+((n.x-s.x)*a+(n.y-s.y)*l),o.x=u,o},e.normalise=function(n){var i=e.magnitude(n);return i===0?{x:0,y:0}:{x:n.x/i,y:n.y/i}},e.dot=function(n,i){return n.x*i.x+n.y*i.y},e.cross=function(n,i){return n.x*i.y-n.y*i.x},e.cross3=function(n,i,s){return(i.x-n.x)*(s.y-n.y)-(i.y-n.y)*(s.x-n.x)},e.add=function(n,i,s){return s||(s={}),s.x=n.x+i.x,s.y=n.y+i.y,s},e.sub=function(n,i,s){return s||(s={}),s.x=n.x-i.x,s.y=n.y-i.y,s},e.mult=function(n,i){return{x:n.x*i,y:n.y*i}},e.div=function(n,i){return{x:n.x/i,y:n.y/i}},e.perp=function(n,i){return i=i===!0?-1:1,{x:i*-n.y,y:i*n.x}},e.neg=function(n){return{x:-n.x,y:-n.y}},e.angle=function(n,i){return Math.atan2(i.y-n.y,i.x-n.x)},e._temp=[e.create(),e.create(),e.create(),e.create(),e.create(),e.create()]}()},function(g,t,e){var n={};g.exports=n;var i=e(2),s=e(0);(function(){n.create=function(o,l){for(var a=[],u=0;u<o.length;u++){var h=o[u],r={x:h.x,y:h.y,index:u,body:l,isInternal:!1};a.push(r)}return a},n.fromPath=function(o,l){var a=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,u=[];return o.replace(a,function(h,r,c){u.push({x:parseFloat(r),y:parseFloat(c)})}),n.create(u,l)},n.centre=function(o){for(var l=n.area(o,!0),a={x:0,y:0},u,h,r,c=0;c<o.length;c++)r=(c+1)%o.length,u=i.cross(o[c],o[r]),h=i.mult(i.add(o[c],o[r]),u),a=i.add(a,h);return i.div(a,6*l)},n.mean=function(o){for(var l={x:0,y:0},a=0;a<o.length;a++)l.x+=o[a].x,l.y+=o[a].y;return i.div(l,o.length)},n.area=function(o,l){for(var a=0,u=o.length-1,h=0;h<o.length;h++)a+=(o[u].x-o[h].x)*(o[u].y+o[h].y),u=h;return l?a/2:Math.abs(a)/2},n.inertia=function(o,l){for(var a=0,u=0,h=o,r,c,d=0;d<h.length;d++)c=(d+1)%h.length,r=Math.abs(i.cross(h[c],h[d])),a+=r*(i.dot(h[c],h[c])+i.dot(h[c],h[d])+i.dot(h[d],h[d])),u+=r;return l/6*(a/u)},n.translate=function(o,l,a){a=typeof a<"u"?a:1;var u=o.length,h=l.x*a,r=l.y*a,c;for(c=0;c<u;c++)o[c].x+=h,o[c].y+=r;return o},n.rotate=function(o,l,a){if(l!==0){var u=Math.cos(l),h=Math.sin(l),r=a.x,c=a.y,d=o.length,f,m,x,M;for(M=0;M<d;M++)f=o[M],m=f.x-r,x=f.y-c,f.x=r+(m*u-x*h),f.y=c+(m*h+x*u);return o}},n.contains=function(o,l){for(var a=l.x,u=l.y,h=o.length,r=o[h-1],c,d=0;d<h;d++){if(c=o[d],(a-r.x)*(c.y-r.y)+(u-r.y)*(r.x-c.x)>0)return!1;r=c}return!0},n.scale=function(o,l,a,u){if(l===1&&a===1)return o;u=u||n.centre(o);for(var h,r,c=0;c<o.length;c++)h=o[c],r=i.sub(h,u),o[c].x=u.x+r.x*l,o[c].y=u.y+r.y*a;return o},n.chamfer=function(o,l,a,u,h){typeof l=="number"?l=[l]:l=l||[8],a=typeof a<"u"?a:-1,u=u||2,h=h||14;for(var r=[],c=0;c<o.length;c++){var d=o[c-1>=0?c-1:o.length-1],f=o[c],m=o[(c+1)%o.length],x=l[c<l.length?c:l.length-1];if(x===0){r.push(f);continue}var M=i.normalise({x:f.y-d.y,y:d.x-f.x}),b=i.normalise({x:m.y-f.y,y:f.x-m.x}),p=Math.sqrt(2*Math.pow(x,2)),v=i.mult(s.clone(M),x),y=i.normalise(i.mult(i.add(M,b),.5)),_=i.sub(f,i.mult(y,p)),S=a;a===-1&&(S=Math.pow(x,.32)*1.75),S=s.clamp(S,u,h),S%2===1&&(S+=1);for(var A=Math.acos(i.dot(M,b)),w=A/S,T=0;T<S;T++)r.push(i.add(i.rotate(v,w*T),_))}return r},n.clockwiseSort=function(o){var l=n.mean(o);return o.sort(function(a,u){return i.angle(l,a)-i.angle(l,u)}),o},n.isConvex=function(o){var l=0,a=o.length,u,h,r,c;if(a<3)return null;for(u=0;u<a;u++)if(h=(u+1)%a,r=(u+2)%a,c=(o[h].x-o[u].x)*(o[r].y-o[h].y),c-=(o[h].y-o[u].y)*(o[r].x-o[h].x),c<0?l|=1:c>0&&(l|=2),l===3)return!1;return l!==0?!0:null},n.hull=function(o){var l=[],a=[],u,h;for(o=o.slice(0),o.sort(function(r,c){var d=r.x-c.x;return d!==0?d:r.y-c.y}),h=0;h<o.length;h+=1){for(u=o[h];a.length>=2&&i.cross3(a[a.length-2],a[a.length-1],u)<=0;)a.pop();a.push(u)}for(h=o.length-1;h>=0;h-=1){for(u=o[h];l.length>=2&&i.cross3(l[l.length-2],l[l.length-1],u)<=0;)l.pop();l.push(u)}return l.pop(),a.pop(),l.concat(a)}})()},function(g,t,e){var n={};g.exports=n;var i=e(3),s=e(2),o=e(7),l=e(0),a=e(1),u=e(11);(function(){n._timeCorrection=!0,n._inertiaScale=4,n._nextCollidingGroupId=1,n._nextNonCollidingGroupId=-1,n._nextCategory=1,n._baseDelta=1e3/60,n.create=function(r){var c={id:l.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:i.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,deltaTime:16.666666666666668,_original:null},d=l.extend(c,r);return h(d,r),d},n.nextGroup=function(r){return r?n._nextNonCollidingGroupId--:n._nextCollidingGroupId++},n.nextCategory=function(){return n._nextCategory=n._nextCategory<<1,n._nextCategory};var h=function(r,c){c=c||{},n.set(r,{bounds:r.bounds||a.create(r.vertices),positionPrev:r.positionPrev||s.clone(r.position),anglePrev:r.anglePrev||r.angle,vertices:r.vertices,parts:r.parts||[r],isStatic:r.isStatic,isSleeping:r.isSleeping,parent:r.parent||r}),i.rotate(r.vertices,r.angle,r.position),u.rotate(r.axes,r.angle),a.update(r.bounds,r.vertices,r.velocity),n.set(r,{axes:c.axes||r.axes,area:c.area||r.area,mass:c.mass||r.mass,inertia:c.inertia||r.inertia});var d=r.isStatic?"#14151f":l.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),f=r.isStatic?"#555":"#ccc",m=r.isStatic&&r.render.fillStyle===null?1:0;r.render.fillStyle=r.render.fillStyle||d,r.render.strokeStyle=r.render.strokeStyle||f,r.render.lineWidth=r.render.lineWidth||m,r.render.sprite.xOffset+=-(r.bounds.min.x-r.position.x)/(r.bounds.max.x-r.bounds.min.x),r.render.sprite.yOffset+=-(r.bounds.min.y-r.position.y)/(r.bounds.max.y-r.bounds.min.y)};n.set=function(r,c,d){var f;typeof c=="string"&&(f=c,c={},c[f]=d);for(f in c)if(Object.prototype.hasOwnProperty.call(c,f))switch(d=c[f],f){case"isStatic":n.setStatic(r,d);break;case"isSleeping":o.set(r,d);break;case"mass":n.setMass(r,d);break;case"density":n.setDensity(r,d);break;case"inertia":n.setInertia(r,d);break;case"vertices":n.setVertices(r,d);break;case"position":n.setPosition(r,d);break;case"angle":n.setAngle(r,d);break;case"velocity":n.setVelocity(r,d);break;case"angularVelocity":n.setAngularVelocity(r,d);break;case"speed":n.setSpeed(r,d);break;case"angularSpeed":n.setAngularSpeed(r,d);break;case"parts":n.setParts(r,d);break;case"centre":n.setCentre(r,d);break;default:r[f]=d}},n.setStatic=function(r,c){for(var d=0;d<r.parts.length;d++){var f=r.parts[d];c?(f.isStatic||(f._original={restitution:f.restitution,friction:f.friction,mass:f.mass,inertia:f.inertia,density:f.density,inverseMass:f.inverseMass,inverseInertia:f.inverseInertia}),f.restitution=0,f.friction=1,f.mass=f.inertia=f.density=1/0,f.inverseMass=f.inverseInertia=0,f.positionPrev.x=f.position.x,f.positionPrev.y=f.position.y,f.anglePrev=f.angle,f.angularVelocity=0,f.speed=0,f.angularSpeed=0,f.motion=0):f._original&&(f.restitution=f._original.restitution,f.friction=f._original.friction,f.mass=f._original.mass,f.inertia=f._original.inertia,f.density=f._original.density,f.inverseMass=f._original.inverseMass,f.inverseInertia=f._original.inverseInertia,f._original=null),f.isStatic=c}},n.setMass=function(r,c){var d=r.inertia/(r.mass/6);r.inertia=d*(c/6),r.inverseInertia=1/r.inertia,r.mass=c,r.inverseMass=1/r.mass,r.density=r.mass/r.area},n.setDensity=function(r,c){n.setMass(r,c*r.area),r.density=c},n.setInertia=function(r,c){r.inertia=c,r.inverseInertia=1/r.inertia},n.setVertices=function(r,c){c[0].body===r?r.vertices=c:r.vertices=i.create(c,r),r.axes=u.fromVertices(r.vertices),r.area=i.area(r.vertices),n.setMass(r,r.density*r.area);var d=i.centre(r.vertices);i.translate(r.vertices,d,-1),n.setInertia(r,n._inertiaScale*i.inertia(r.vertices,r.mass)),i.translate(r.vertices,r.position),a.update(r.bounds,r.vertices,r.velocity)},n.setParts=function(r,c,d){var f;for(c=c.slice(0),r.parts.length=0,r.parts.push(r),r.parent=r,f=0;f<c.length;f++){var m=c[f];m!==r&&(m.parent=r,r.parts.push(m))}if(r.parts.length!==1){if(d=typeof d<"u"?d:!0,d){var x=[];for(f=0;f<c.length;f++)x=x.concat(c[f].vertices);i.clockwiseSort(x);var M=i.hull(x),b=i.centre(M);n.setVertices(r,M),i.translate(r.vertices,b)}var p=n._totalProperties(r);r.area=p.area,r.parent=r,r.position.x=p.centre.x,r.position.y=p.centre.y,r.positionPrev.x=p.centre.x,r.positionPrev.y=p.centre.y,n.setMass(r,p.mass),n.setInertia(r,p.inertia),n.setPosition(r,p.centre)}},n.setCentre=function(r,c,d){d?(r.positionPrev.x+=c.x,r.positionPrev.y+=c.y,r.position.x+=c.x,r.position.y+=c.y):(r.positionPrev.x=c.x-(r.position.x-r.positionPrev.x),r.positionPrev.y=c.y-(r.position.y-r.positionPrev.y),r.position.x=c.x,r.position.y=c.y)},n.setPosition=function(r,c,d){var f=s.sub(c,r.position);d?(r.positionPrev.x=r.position.x,r.positionPrev.y=r.position.y,r.velocity.x=f.x,r.velocity.y=f.y,r.speed=s.magnitude(f)):(r.positionPrev.x+=f.x,r.positionPrev.y+=f.y);for(var m=0;m<r.parts.length;m++){var x=r.parts[m];x.position.x+=f.x,x.position.y+=f.y,i.translate(x.vertices,f),a.update(x.bounds,x.vertices,r.velocity)}},n.setAngle=function(r,c,d){var f=c-r.angle;d?(r.anglePrev=r.angle,r.angularVelocity=f,r.angularSpeed=Math.abs(f)):r.anglePrev+=f;for(var m=0;m<r.parts.length;m++){var x=r.parts[m];x.angle+=f,i.rotate(x.vertices,f,r.position),u.rotate(x.axes,f),a.update(x.bounds,x.vertices,r.velocity),m>0&&s.rotateAbout(x.position,f,r.position,x.position)}},n.setVelocity=function(r,c){var d=r.deltaTime/n._baseDelta;r.positionPrev.x=r.position.x-c.x*d,r.positionPrev.y=r.position.y-c.y*d,r.velocity.x=(r.position.x-r.positionPrev.x)/d,r.velocity.y=(r.position.y-r.positionPrev.y)/d,r.speed=s.magnitude(r.velocity)},n.getVelocity=function(r){var c=n._baseDelta/r.deltaTime;return{x:(r.position.x-r.positionPrev.x)*c,y:(r.position.y-r.positionPrev.y)*c}},n.getSpeed=function(r){return s.magnitude(n.getVelocity(r))},n.setSpeed=function(r,c){n.setVelocity(r,s.mult(s.normalise(n.getVelocity(r)),c))},n.setAngularVelocity=function(r,c){var d=r.deltaTime/n._baseDelta;r.anglePrev=r.angle-c*d,r.angularVelocity=(r.angle-r.anglePrev)/d,r.angularSpeed=Math.abs(r.angularVelocity)},n.getAngularVelocity=function(r){return(r.angle-r.anglePrev)*n._baseDelta/r.deltaTime},n.getAngularSpeed=function(r){return Math.abs(n.getAngularVelocity(r))},n.setAngularSpeed=function(r,c){n.setAngularVelocity(r,l.sign(n.getAngularVelocity(r))*c)},n.translate=function(r,c,d){n.setPosition(r,s.add(r.position,c),d)},n.rotate=function(r,c,d,f){if(!d)n.setAngle(r,r.angle+c,f);else{var m=Math.cos(c),x=Math.sin(c),M=r.position.x-d.x,b=r.position.y-d.y;n.setPosition(r,{x:d.x+(M*m-b*x),y:d.y+(M*x+b*m)},f),n.setAngle(r,r.angle+c,f)}},n.scale=function(r,c,d,f){var m=0,x=0;f=f||r.position;for(var M=0;M<r.parts.length;M++){var b=r.parts[M];i.scale(b.vertices,c,d,f),b.axes=u.fromVertices(b.vertices),b.area=i.area(b.vertices),n.setMass(b,r.density*b.area),i.translate(b.vertices,{x:-b.position.x,y:-b.position.y}),n.setInertia(b,n._inertiaScale*i.inertia(b.vertices,b.mass)),i.translate(b.vertices,{x:b.position.x,y:b.position.y}),M>0&&(m+=b.area,x+=b.inertia),b.position.x=f.x+(b.position.x-f.x)*c,b.position.y=f.y+(b.position.y-f.y)*d,a.update(b.bounds,b.vertices,r.velocity)}r.parts.length>1&&(r.area=m,r.isStatic||(n.setMass(r,r.density*m),n.setInertia(r,x))),r.circleRadius&&(c===d?r.circleRadius*=c:r.circleRadius=null)},n.update=function(r,c){c=(typeof c<"u"?c:1e3/60)*r.timeScale;var d=c*c,f=n._timeCorrection?c/(r.deltaTime||c):1,m=1-r.frictionAir*(c/l._baseDelta),x=(r.position.x-r.positionPrev.x)*f,M=(r.position.y-r.positionPrev.y)*f;r.velocity.x=x*m+r.force.x/r.mass*d,r.velocity.y=M*m+r.force.y/r.mass*d,r.positionPrev.x=r.position.x,r.positionPrev.y=r.position.y,r.position.x+=r.velocity.x,r.position.y+=r.velocity.y,r.deltaTime=c,r.angularVelocity=(r.angle-r.anglePrev)*m*f+r.torque/r.inertia*d,r.anglePrev=r.angle,r.angle+=r.angularVelocity;for(var b=0;b<r.parts.length;b++){var p=r.parts[b];i.translate(p.vertices,r.velocity),b>0&&(p.position.x+=r.velocity.x,p.position.y+=r.velocity.y),r.angularVelocity!==0&&(i.rotate(p.vertices,r.angularVelocity,r.position),u.rotate(p.axes,r.angularVelocity),b>0&&s.rotateAbout(p.position,r.angularVelocity,r.position,p.position)),a.update(p.bounds,p.vertices,r.velocity)}},n.updateVelocities=function(r){var c=n._baseDelta/r.deltaTime,d=r.velocity;d.x=(r.position.x-r.positionPrev.x)*c,d.y=(r.position.y-r.positionPrev.y)*c,r.speed=Math.sqrt(d.x*d.x+d.y*d.y),r.angularVelocity=(r.angle-r.anglePrev)*c,r.angularSpeed=Math.abs(r.angularVelocity)},n.applyForce=function(r,c,d){var f={x:c.x-r.position.x,y:c.y-r.position.y};r.force.x+=d.x,r.force.y+=d.y,r.torque+=f.x*d.y-f.y*d.x},n._totalProperties=function(r){for(var c={mass:0,area:0,inertia:0,centre:{x:0,y:0}},d=r.parts.length===1?0:1;d<r.parts.length;d++){var f=r.parts[d],m=f.mass!==1/0?f.mass:1;c.mass+=m,c.area+=f.area,c.inertia+=f.inertia,c.centre=s.add(c.centre,s.mult(f.position,m))}return c.centre=s.div(c.centre,c.mass),c}})()},function(g,t,e){var n={};g.exports=n;var i=e(0);(function(){n.on=function(s,o,l){for(var a=o.split(" "),u,h=0;h<a.length;h++)u=a[h],s.events=s.events||{},s.events[u]=s.events[u]||[],s.events[u].push(l);return l},n.off=function(s,o,l){if(!o){s.events={};return}typeof o=="function"&&(l=o,o=i.keys(s.events).join(" "));for(var a=o.split(" "),u=0;u<a.length;u++){var h=s.events[a[u]],r=[];if(l&&h)for(var c=0;c<h.length;c++)h[c]!==l&&r.push(h[c]);s.events[a[u]]=r}},n.trigger=function(s,o,l){var a,u,h,r,c=s.events;if(c&&i.keys(c).length>0){l||(l={}),a=o.split(" ");for(var d=0;d<a.length;d++)if(u=a[d],h=c[u],h){r=i.clone(l,!1),r.name=u,r.source=s;for(var f=0;f<h.length;f++)h[f].apply(s,[r])}}}})()},function(g,t,e){var n={};g.exports=n;var i=e(5),s=e(0),o=e(1),l=e(4);(function(){n.create=function(a){return s.extend({id:s.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{},cache:{allBodies:null,allConstraints:null,allComposites:null}},a)},n.setModified=function(a,u,h,r){if(a.isModified=u,u&&a.cache&&(a.cache.allBodies=null,a.cache.allConstraints=null,a.cache.allComposites=null),h&&a.parent&&n.setModified(a.parent,u,h,r),r)for(var c=0;c<a.composites.length;c++){var d=a.composites[c];n.setModified(d,u,h,r)}},n.add=function(a,u){var h=[].concat(u);i.trigger(a,"beforeAdd",{object:u});for(var r=0;r<h.length;r++){var c=h[r];switch(c.type){case"body":if(c.parent!==c){s.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}n.addBody(a,c);break;case"constraint":n.addConstraint(a,c);break;case"composite":n.addComposite(a,c);break;case"mouseConstraint":n.addConstraint(a,c.constraint);break}}return i.trigger(a,"afterAdd",{object:u}),a},n.remove=function(a,u,h){var r=[].concat(u);i.trigger(a,"beforeRemove",{object:u});for(var c=0;c<r.length;c++){var d=r[c];switch(d.type){case"body":n.removeBody(a,d,h);break;case"constraint":n.removeConstraint(a,d,h);break;case"composite":n.removeComposite(a,d,h);break;case"mouseConstraint":n.removeConstraint(a,d.constraint);break}}return i.trigger(a,"afterRemove",{object:u}),a},n.addComposite=function(a,u){return a.composites.push(u),u.parent=a,n.setModified(a,!0,!0,!1),a},n.removeComposite=function(a,u,h){var r=s.indexOf(a.composites,u);if(r!==-1){var c=n.allBodies(u);n.removeCompositeAt(a,r);for(var d=0;d<c.length;d++)c[d].sleepCounter=0}if(h)for(var d=0;d<a.composites.length;d++)n.removeComposite(a.composites[d],u,!0);return a},n.removeCompositeAt=function(a,u){return a.composites.splice(u,1),n.setModified(a,!0,!0,!1),a},n.addBody=function(a,u){return a.bodies.push(u),n.setModified(a,!0,!0,!1),a},n.removeBody=function(a,u,h){var r=s.indexOf(a.bodies,u);if(r!==-1&&(n.removeBodyAt(a,r),u.sleepCounter=0),h)for(var c=0;c<a.composites.length;c++)n.removeBody(a.composites[c],u,!0);return a},n.removeBodyAt=function(a,u){return a.bodies.splice(u,1),n.setModified(a,!0,!0,!1),a},n.addConstraint=function(a,u){return a.constraints.push(u),n.setModified(a,!0,!0,!1),a},n.removeConstraint=function(a,u,h){var r=s.indexOf(a.constraints,u);if(r!==-1&&n.removeConstraintAt(a,r),h)for(var c=0;c<a.composites.length;c++)n.removeConstraint(a.composites[c],u,!0);return a},n.removeConstraintAt=function(a,u){return a.constraints.splice(u,1),n.setModified(a,!0,!0,!1),a},n.clear=function(a,u,h){if(h)for(var r=0;r<a.composites.length;r++)n.clear(a.composites[r],u,!0);return u?a.bodies=a.bodies.filter(function(c){return c.isStatic}):a.bodies.length=0,a.constraints.length=0,a.composites.length=0,n.setModified(a,!0,!0,!1),a},n.allBodies=function(a){if(a.cache&&a.cache.allBodies)return a.cache.allBodies;for(var u=[].concat(a.bodies),h=0;h<a.composites.length;h++)u=u.concat(n.allBodies(a.composites[h]));return a.cache&&(a.cache.allBodies=u),u},n.allConstraints=function(a){if(a.cache&&a.cache.allConstraints)return a.cache.allConstraints;for(var u=[].concat(a.constraints),h=0;h<a.composites.length;h++)u=u.concat(n.allConstraints(a.composites[h]));return a.cache&&(a.cache.allConstraints=u),u},n.allComposites=function(a){if(a.cache&&a.cache.allComposites)return a.cache.allComposites;for(var u=[].concat(a.composites),h=0;h<a.composites.length;h++)u=u.concat(n.allComposites(a.composites[h]));return a.cache&&(a.cache.allComposites=u),u},n.get=function(a,u,h){var r,c;switch(h){case"body":r=n.allBodies(a);break;case"constraint":r=n.allConstraints(a);break;case"composite":r=n.allComposites(a).concat(a);break}return r?(c=r.filter(function(d){return d.id.toString()===u.toString()}),c.length===0?null:c[0]):null},n.move=function(a,u,h){return n.remove(a,u),n.add(h,u),a},n.rebase=function(a){for(var u=n.allBodies(a).concat(n.allConstraints(a)).concat(n.allComposites(a)),h=0;h<u.length;h++)u[h].id=s.nextId();return a},n.translate=function(a,u,h){for(var r=h?n.allBodies(a):a.bodies,c=0;c<r.length;c++)l.translate(r[c],u);return a},n.rotate=function(a,u,h,r){for(var c=Math.cos(u),d=Math.sin(u),f=r?n.allBodies(a):a.bodies,m=0;m<f.length;m++){var x=f[m],M=x.position.x-h.x,b=x.position.y-h.y;l.setPosition(x,{x:h.x+(M*c-b*d),y:h.y+(M*d+b*c)}),l.rotate(x,u)}return a},n.scale=function(a,u,h,r,c){for(var d=c?n.allBodies(a):a.bodies,f=0;f<d.length;f++){var m=d[f],x=m.position.x-r.x,M=m.position.y-r.y;l.setPosition(m,{x:r.x+x*u,y:r.y+M*h}),l.scale(m,u,h)}return a},n.bounds=function(a){for(var u=n.allBodies(a),h=[],r=0;r<u.length;r+=1){var c=u[r];h.push(c.bounds.min,c.bounds.max)}return o.create(h)}})()},function(g,t,e){var n={};g.exports=n;var i=e(4),s=e(5),o=e(0);(function(){n._motionWakeThreshold=.18,n._motionSleepThreshold=.08,n._minBias=.9,n.update=function(l,a){for(var u=a/o._baseDelta,h=n._motionSleepThreshold,r=0;r<l.length;r++){var c=l[r],d=i.getSpeed(c),f=i.getAngularSpeed(c),m=d*d+f*f;if(c.force.x!==0||c.force.y!==0){n.set(c,!1);continue}var x=Math.min(c.motion,m),M=Math.max(c.motion,m);c.motion=n._minBias*x+(1-n._minBias)*M,c.sleepThreshold>0&&c.motion<h?(c.sleepCounter+=1,c.sleepCounter>=c.sleepThreshold/u&&n.set(c,!0)):c.sleepCounter>0&&(c.sleepCounter-=1)}},n.afterCollisions=function(l){for(var a=n._motionSleepThreshold,u=0;u<l.length;u++){var h=l[u];if(h.isActive){var r=h.collision,c=r.bodyA.parent,d=r.bodyB.parent;if(!(c.isSleeping&&d.isSleeping||c.isStatic||d.isStatic)&&(c.isSleeping||d.isSleeping)){var f=c.isSleeping&&!c.isStatic?c:d,m=f===c?d:c;!f.isStatic&&m.motion>a&&n.set(f,!1)}}}},n.set=function(l,a){var u=l.isSleeping;a?(l.isSleeping=!0,l.sleepCounter=l.sleepThreshold,l.positionImpulse.x=0,l.positionImpulse.y=0,l.positionPrev.x=l.position.x,l.positionPrev.y=l.position.y,l.anglePrev=l.angle,l.speed=0,l.angularSpeed=0,l.motion=0,u||s.trigger(l,"sleepStart")):(l.isSleeping=!1,l.sleepCounter=0,u&&s.trigger(l,"sleepEnd"))}})()},function(g,t,e){var n={};g.exports=n;var i=e(3),s=e(9);(function(){var o=[],l={overlap:0,axis:null},a={overlap:0,axis:null};n.create=function(u,h){return{pair:null,collided:!1,bodyA:u,bodyB:h,parentA:u.parent,parentB:h.parent,depth:0,normal:{x:0,y:0},tangent:{x:0,y:0},penetration:{x:0,y:0},supports:[null,null],supportCount:0}},n.collides=function(u,h,r){if(n._overlapAxes(l,u.vertices,h.vertices,u.axes),l.overlap<=0||(n._overlapAxes(a,h.vertices,u.vertices,h.axes),a.overlap<=0))return null;var c=r&&r.table[s.id(u,h)],d;c?d=c.collision:(d=n.create(u,h),d.collided=!0,d.bodyA=u.id<h.id?u:h,d.bodyB=u.id<h.id?h:u,d.parentA=d.bodyA.parent,d.parentB=d.bodyB.parent),u=d.bodyA,h=d.bodyB;var f;l.overlap<a.overlap?f=l:f=a;var m=d.normal,x=d.tangent,M=d.penetration,b=d.supports,p=f.overlap,v=f.axis,y=v.x,_=v.y,S=h.position.x-u.position.x,A=h.position.y-u.position.y;y*S+_*A>=0&&(y=-y,_=-_),m.x=y,m.y=_,x.x=-_,x.y=y,M.x=y*p,M.y=_*p,d.depth=p;var w=n._findSupports(u,h,m,1),T=0;if(i.contains(u.vertices,w[0])&&(b[T++]=w[0]),i.contains(u.vertices,w[1])&&(b[T++]=w[1]),T<2){var E=n._findSupports(h,u,m,-1);i.contains(h.vertices,E[0])&&(b[T++]=E[0]),T<2&&i.contains(h.vertices,E[1])&&(b[T++]=E[1])}return T===0&&(b[T++]=w[0]),d.supportCount=T,d},n._overlapAxes=function(u,h,r,c){var d=h.length,f=r.length,m=h[0].x,x=h[0].y,M=r[0].x,b=r[0].y,p=c.length,v=Number.MAX_VALUE,y=0,_,S,A,w,T,E;for(T=0;T<p;T++){var R=c[T],P=R.x,L=R.y,I=m*P+x*L,F=M*P+b*L,U=I,V=F;for(E=1;E<d;E+=1)w=h[E].x*P+h[E].y*L,w>U?U=w:w<I&&(I=w);for(E=1;E<f;E+=1)w=r[E].x*P+r[E].y*L,w>V?V=w:w<F&&(F=w);if(S=U-F,A=V-I,_=S<A?S:A,_<v&&(v=_,y=T,_<=0))break}u.axis=c[y],u.overlap=v},n._findSupports=function(u,h,r,c){var d=h.vertices,f=d.length,m=u.position.x,x=u.position.y,M=r.x*c,b=r.y*c,p=d[0],v=p,y=M*(m-v.x)+b*(x-v.y),_,S,A;for(A=1;A<f;A+=1)v=d[A],S=M*(m-v.x)+b*(x-v.y),S<y&&(y=S,p=v);return _=d[(f+p.index-1)%f],y=M*(m-_.x)+b*(x-_.y),v=d[(p.index+1)%f],M*(m-v.x)+b*(x-v.y)<y?(o[0]=p,o[1]=v,o):(o[0]=p,o[1]=_,o)}})()},function(g,t,e){var n={};g.exports=n;var i=e(16);(function(){n.create=function(s,o){var l=s.bodyA,a=s.bodyB,u={id:n.id(l,a),bodyA:l,bodyB:a,collision:s,contacts:[i.create(),i.create()],contactCount:0,separation:0,isActive:!0,isSensor:l.isSensor||a.isSensor,timeCreated:o,timeUpdated:o,inverseMass:0,friction:0,frictionStatic:0,restitution:0,slop:0};return n.update(u,s,o),u},n.update=function(s,o,l){var a=o.supports,u=o.supportCount,h=s.contacts,r=o.parentA,c=o.parentB;s.isActive=!0,s.timeUpdated=l,s.collision=o,s.separation=o.depth,s.inverseMass=r.inverseMass+c.inverseMass,s.friction=r.friction<c.friction?r.friction:c.friction,s.frictionStatic=r.frictionStatic>c.frictionStatic?r.frictionStatic:c.frictionStatic,s.restitution=r.restitution>c.restitution?r.restitution:c.restitution,s.slop=r.slop>c.slop?r.slop:c.slop,s.contactCount=u,o.pair=s;var d=a[0],f=h[0],m=a[1],x=h[1];(x.vertex===d||f.vertex===m)&&(h[1]=f,h[0]=f=x,x=h[1]),f.vertex=d,x.vertex=m},n.setActive=function(s,o,l){o?(s.isActive=!0,s.timeUpdated=l):(s.isActive=!1,s.contactCount=0)},n.id=function(s,o){return s.id<o.id?s.id.toString(36)+":"+o.id.toString(36):o.id.toString(36)+":"+s.id.toString(36)}})()},function(g,t,e){var n={};g.exports=n;var i=e(3),s=e(2),o=e(7),l=e(1),a=e(11),u=e(0);(function(){n._warming=.4,n._torqueDampen=1,n._minLength=1e-6,n.create=function(h){var r=h;r.bodyA&&!r.pointA&&(r.pointA={x:0,y:0}),r.bodyB&&!r.pointB&&(r.pointB={x:0,y:0});var c=r.bodyA?s.add(r.bodyA.position,r.pointA):r.pointA,d=r.bodyB?s.add(r.bodyB.position,r.pointB):r.pointB,f=s.magnitude(s.sub(c,d));r.length=typeof r.length<"u"?r.length:f,r.id=r.id||u.nextId(),r.label=r.label||"Constraint",r.type="constraint",r.stiffness=r.stiffness||(r.length>0?1:.7),r.damping=r.damping||0,r.angularStiffness=r.angularStiffness||0,r.angleA=r.bodyA?r.bodyA.angle:r.angleA,r.angleB=r.bodyB?r.bodyB.angle:r.angleB,r.plugin={};var m={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return r.length===0&&r.stiffness>.1?(m.type="pin",m.anchors=!1):r.stiffness<.9&&(m.type="spring"),r.render=u.extend(m,r.render),r},n.preSolveAll=function(h){for(var r=0;r<h.length;r+=1){var c=h[r],d=c.constraintImpulse;c.isStatic||d.x===0&&d.y===0&&d.angle===0||(c.position.x+=d.x,c.position.y+=d.y,c.angle+=d.angle)}},n.solveAll=function(h,r){for(var c=u.clamp(r/u._baseDelta,0,1),d=0;d<h.length;d+=1){var f=h[d],m=!f.bodyA||f.bodyA&&f.bodyA.isStatic,x=!f.bodyB||f.bodyB&&f.bodyB.isStatic;(m||x)&&n.solve(h[d],c)}for(d=0;d<h.length;d+=1)f=h[d],m=!f.bodyA||f.bodyA&&f.bodyA.isStatic,x=!f.bodyB||f.bodyB&&f.bodyB.isStatic,!m&&!x&&n.solve(h[d],c)},n.solve=function(h,r){var c=h.bodyA,d=h.bodyB,f=h.pointA,m=h.pointB;if(!(!c&&!d)){c&&!c.isStatic&&(s.rotate(f,c.angle-h.angleA,f),h.angleA=c.angle),d&&!d.isStatic&&(s.rotate(m,d.angle-h.angleB,m),h.angleB=d.angle);var x=f,M=m;if(c&&(x=s.add(c.position,f)),d&&(M=s.add(d.position,m)),!(!x||!M)){var b=s.sub(x,M),p=s.magnitude(b);p<n._minLength&&(p=n._minLength);var v=(p-h.length)/p,y=h.stiffness>=1||h.length===0,_=y?h.stiffness*r:h.stiffness*r*r,S=h.damping*r,A=s.mult(b,v*_),w=(c?c.inverseMass:0)+(d?d.inverseMass:0),T=(c?c.inverseInertia:0)+(d?d.inverseInertia:0),E=w+T,R,P,L,I,F;if(S>0){var U=s.create();L=s.div(b,p),F=s.sub(d&&s.sub(d.position,d.positionPrev)||U,c&&s.sub(c.position,c.positionPrev)||U),I=s.dot(L,F)}c&&!c.isStatic&&(P=c.inverseMass/w,c.constraintImpulse.x-=A.x*P,c.constraintImpulse.y-=A.y*P,c.position.x-=A.x*P,c.position.y-=A.y*P,S>0&&(c.positionPrev.x-=S*L.x*I*P,c.positionPrev.y-=S*L.y*I*P),R=s.cross(f,A)/E*n._torqueDampen*c.inverseInertia*(1-h.angularStiffness),c.constraintImpulse.angle-=R,c.angle-=R),d&&!d.isStatic&&(P=d.inverseMass/w,d.constraintImpulse.x+=A.x*P,d.constraintImpulse.y+=A.y*P,d.position.x+=A.x*P,d.position.y+=A.y*P,S>0&&(d.positionPrev.x+=S*L.x*I*P,d.positionPrev.y+=S*L.y*I*P),R=s.cross(m,A)/E*n._torqueDampen*d.inverseInertia*(1-h.angularStiffness),d.constraintImpulse.angle+=R,d.angle+=R)}}},n.postSolveAll=function(h){for(var r=0;r<h.length;r++){var c=h[r],d=c.constraintImpulse;if(!(c.isStatic||d.x===0&&d.y===0&&d.angle===0)){o.set(c,!1);for(var f=0;f<c.parts.length;f++){var m=c.parts[f];i.translate(m.vertices,d),f>0&&(m.position.x+=d.x,m.position.y+=d.y),d.angle!==0&&(i.rotate(m.vertices,d.angle,c.position),a.rotate(m.axes,d.angle),f>0&&s.rotateAbout(m.position,d.angle,c.position,m.position)),l.update(m.bounds,m.vertices,c.velocity)}d.angle*=n._warming,d.x*=n._warming,d.y*=n._warming}}},n.pointAWorld=function(h){return{x:(h.bodyA?h.bodyA.position.x:0)+(h.pointA?h.pointA.x:0),y:(h.bodyA?h.bodyA.position.y:0)+(h.pointA?h.pointA.y:0)}},n.pointBWorld=function(h){return{x:(h.bodyB?h.bodyB.position.x:0)+(h.pointB?h.pointB.x:0),y:(h.bodyB?h.bodyB.position.y:0)+(h.pointB?h.pointB.y:0)}},n.currentLength=function(h){var r=(h.bodyA?h.bodyA.position.x:0)+(h.pointA?h.pointA.x:0),c=(h.bodyA?h.bodyA.position.y:0)+(h.pointA?h.pointA.y:0),d=(h.bodyB?h.bodyB.position.x:0)+(h.pointB?h.pointB.x:0),f=(h.bodyB?h.bodyB.position.y:0)+(h.pointB?h.pointB.y:0),m=r-d,x=c-f;return Math.sqrt(m*m+x*x)}})()},function(g,t,e){var n={};g.exports=n;var i=e(2),s=e(0);(function(){n.fromVertices=function(o){for(var l={},a=0;a<o.length;a++){var u=(a+1)%o.length,h=i.normalise({x:o[u].y-o[a].y,y:o[a].x-o[u].x}),r=h.y===0?1/0:h.x/h.y;r=r.toFixed(3).toString(),l[r]=h}return s.values(l)},n.rotate=function(o,l){if(l!==0)for(var a=Math.cos(l),u=Math.sin(l),h=0;h<o.length;h++){var r=o[h],c;c=r.x*a-r.y*u,r.y=r.x*u+r.y*a,r.x=c}}})()},function(g,t,e){var n={};g.exports=n;var i=e(3),s=e(0),o=e(4),l=e(1),a=e(2);(function(){n.rectangle=function(u,h,r,c,d){d=d||{};var f={label:"Rectangle Body",position:{x:u,y:h},vertices:i.fromPath("L 0 0 L "+r+" 0 L "+r+" "+c+" L 0 "+c)};if(d.chamfer){var m=d.chamfer;f.vertices=i.chamfer(f.vertices,m.radius,m.quality,m.qualityMin,m.qualityMax),delete d.chamfer}return o.create(s.extend({},f,d))},n.trapezoid=function(u,h,r,c,d,f){f=f||{},d>=1&&s.warn("Bodies.trapezoid: slope parameter must be < 1."),d*=.5;var m=(1-d*2)*r,x=r*d,M=x+m,b=M+x,p;d<.5?p="L 0 0 L "+x+" "+-c+" L "+M+" "+-c+" L "+b+" 0":p="L 0 0 L "+M+" "+-c+" L "+b+" 0";var v={label:"Trapezoid Body",position:{x:u,y:h},vertices:i.fromPath(p)};if(f.chamfer){var y=f.chamfer;v.vertices=i.chamfer(v.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete f.chamfer}return o.create(s.extend({},v,f))},n.circle=function(u,h,r,c,d){c=c||{};var f={label:"Circle Body",circleRadius:r};d=d||25;var m=Math.ceil(Math.max(10,Math.min(d,r)));return m%2===1&&(m+=1),n.polygon(u,h,m,r,s.extend({},f,c))},n.polygon=function(u,h,r,c,d){if(d=d||{},r<3)return n.circle(u,h,c,d);for(var f=2*Math.PI/r,m="",x=f*.5,M=0;M<r;M+=1){var b=x+M*f,p=Math.cos(b)*c,v=Math.sin(b)*c;m+="L "+p.toFixed(3)+" "+v.toFixed(3)+" "}var y={label:"Polygon Body",position:{x:u,y:h},vertices:i.fromPath(m)};if(d.chamfer){var _=d.chamfer;y.vertices=i.chamfer(y.vertices,_.radius,_.quality,_.qualityMin,_.qualityMax),delete d.chamfer}return o.create(s.extend({},y,d))},n.fromVertices=function(u,h,r,c,d,f,m,x){var M=s.getDecomp(),b,p,v,y,_,S,A,w,T,E,R;for(b=!!(M&&M.quickDecomp),c=c||{},v=[],d=typeof d<"u"?d:!1,f=typeof f<"u"?f:.01,m=typeof m<"u"?m:10,x=typeof x<"u"?x:.01,s.isArray(r[0])||(r=[r]),E=0;E<r.length;E+=1)if(S=r[E],y=i.isConvex(S),_=!y,_&&!b&&s.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),y||!b)y?S=i.clockwiseSort(S):S=i.hull(S),v.push({position:{x:u,y:h},vertices:S});else{var P=S.map(function(B){return[B.x,B.y]});M.makeCCW(P),f!==!1&&M.removeCollinearPoints(P,f),x!==!1&&M.removeDuplicatePoints&&M.removeDuplicatePoints(P,x);var L=M.quickDecomp(P);for(A=0;A<L.length;A++){var I=L[A],F=I.map(function(B){return{x:B[0],y:B[1]}});m>0&&i.area(F)<m||v.push({position:i.centre(F),vertices:F})}}for(A=0;A<v.length;A++)v[A]=o.create(s.extend(v[A],c));if(d){var U=5;for(A=0;A<v.length;A++){var V=v[A];for(w=A+1;w<v.length;w++){var k=v[w];if(l.overlaps(V.bounds,k.bounds)){var H=V.vertices,G=k.vertices;for(T=0;T<V.vertices.length;T++)for(R=0;R<k.vertices.length;R++){var ot=a.magnitudeSquared(a.sub(H[(T+1)%H.length],G[R])),at=a.magnitudeSquared(a.sub(H[T],G[(R+1)%G.length]));ot<U&&at<U&&(H[T].isInternal=!0,G[R].isInternal=!0)}}}}}return v.length>1?(p=o.create(s.extend({parts:v.slice(0)},c)),o.setPosition(p,{x:u,y:h}),p):v[0]}})()},function(g,t,e){var n={};g.exports=n;var i=e(0),s=e(8);(function(){n.create=function(o){var l={bodies:[],collisions:[],pairs:null};return i.extend(l,o)},n.setBodies=function(o,l){o.bodies=l.slice(0)},n.clear=function(o){o.bodies=[],o.collisions=[]},n.collisions=function(o){var l=o.pairs,a=o.bodies,u=a.length,h=n.canCollide,r=s.collides,c=o.collisions,d=0,f,m;for(a.sort(n._compareBoundsX),f=0;f<u;f++){var x=a[f],M=x.bounds,b=x.bounds.max.x,p=x.bounds.max.y,v=x.bounds.min.y,y=x.isStatic||x.isSleeping,_=x.parts.length,S=_===1;for(m=f+1;m<u;m++){var A=a[m],w=A.bounds;if(w.min.x>b)break;if(!(p<w.min.y||v>w.max.y)&&!(y&&(A.isStatic||A.isSleeping))&&h(x.collisionFilter,A.collisionFilter)){var T=A.parts.length;if(S&&T===1){var E=r(x,A,l);E&&(c[d++]=E)}else for(var R=_>1?1:0,P=T>1?1:0,L=R;L<_;L++)for(var I=x.parts[L],M=I.bounds,F=P;F<T;F++){var U=A.parts[F],w=U.bounds;if(!(M.min.x>w.max.x||M.max.x<w.min.x||M.max.y<w.min.y||M.min.y>w.max.y)){var E=r(I,U,l);E&&(c[d++]=E)}}}}}return c.length!==d&&(c.length=d),c},n.canCollide=function(o,l){return o.group===l.group&&o.group!==0?o.group>0:(o.mask&l.category)!==0&&(l.mask&o.category)!==0},n._compareBoundsX=function(o,l){return o.bounds.min.x-l.bounds.min.x}})()},function(g,t,e){var n={};g.exports=n;var i=e(0);(function(){n.create=function(s){var o={};return s||i.log("Mouse.create: element was undefined, defaulting to document.body","warn"),o.element=s||document.body,o.absolute={x:0,y:0},o.position={x:0,y:0},o.mousedownPosition={x:0,y:0},o.mouseupPosition={x:0,y:0},o.offset={x:0,y:0},o.scale={x:1,y:1},o.wheelDelta=0,o.button=-1,o.pixelRatio=parseInt(o.element.getAttribute("data-pixel-ratio"),10)||1,o.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},o.mousemove=function(l){var a=n._getRelativeMousePosition(l,o.element,o.pixelRatio),u=l.changedTouches;u&&(o.button=0,l.preventDefault()),o.absolute.x=a.x,o.absolute.y=a.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y,o.sourceEvents.mousemove=l},o.mousedown=function(l){var a=n._getRelativeMousePosition(l,o.element,o.pixelRatio),u=l.changedTouches;u?(o.button=0,l.preventDefault()):o.button=l.button,o.absolute.x=a.x,o.absolute.y=a.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y,o.mousedownPosition.x=o.position.x,o.mousedownPosition.y=o.position.y,o.sourceEvents.mousedown=l},o.mouseup=function(l){var a=n._getRelativeMousePosition(l,o.element,o.pixelRatio),u=l.changedTouches;u&&l.preventDefault(),o.button=-1,o.absolute.x=a.x,o.absolute.y=a.y,o.position.x=o.absolute.x*o.scale.x+o.offset.x,o.position.y=o.absolute.y*o.scale.y+o.offset.y,o.mouseupPosition.x=o.position.x,o.mouseupPosition.y=o.position.y,o.sourceEvents.mouseup=l},o.mousewheel=function(l){o.wheelDelta=Math.max(-1,Math.min(1,l.wheelDelta||-l.detail)),l.preventDefault(),o.sourceEvents.mousewheel=l},n.setElement(o,o.element),o},n.setElement=function(s,o){s.element=o,o.addEventListener("mousemove",s.mousemove,{passive:!0}),o.addEventListener("mousedown",s.mousedown,{passive:!0}),o.addEventListener("mouseup",s.mouseup,{passive:!0}),o.addEventListener("wheel",s.mousewheel,{passive:!1}),o.addEventListener("touchmove",s.mousemove,{passive:!1}),o.addEventListener("touchstart",s.mousedown,{passive:!1}),o.addEventListener("touchend",s.mouseup,{passive:!1})},n.clearSourceEvents=function(s){s.sourceEvents.mousemove=null,s.sourceEvents.mousedown=null,s.sourceEvents.mouseup=null,s.sourceEvents.mousewheel=null,s.wheelDelta=0},n.setOffset=function(s,o){s.offset.x=o.x,s.offset.y=o.y,s.position.x=s.absolute.x*s.scale.x+s.offset.x,s.position.y=s.absolute.y*s.scale.y+s.offset.y},n.setScale=function(s,o){s.scale.x=o.x,s.scale.y=o.y,s.position.x=s.absolute.x*s.scale.x+s.offset.x,s.position.y=s.absolute.y*s.scale.y+s.offset.y},n._getRelativeMousePosition=function(s,o,l){var a=o.getBoundingClientRect(),u=document.documentElement||document.body.parentNode||document.body,h=window.pageXOffset!==void 0?window.pageXOffset:u.scrollLeft,r=window.pageYOffset!==void 0?window.pageYOffset:u.scrollTop,c=s.changedTouches,d,f;return c?(d=c[0].pageX-a.left-h,f=c[0].pageY-a.top-r):(d=s.pageX-a.left-h,f=s.pageY-a.top-r),{x:d/(o.clientWidth/(o.width||o.clientWidth)*l),y:f/(o.clientHeight/(o.height||o.clientHeight)*l)}}})()},function(g,t,e){var n={};g.exports=n;var i=e(0);(function(){n._registry={},n.register=function(s){if(n.isPlugin(s)||i.warn("Plugin.register:",n.toString(s),"does not implement all required fields."),s.name in n._registry){var o=n._registry[s.name],l=n.versionParse(s.version).number,a=n.versionParse(o.version).number;l>a?(i.warn("Plugin.register:",n.toString(o),"was upgraded to",n.toString(s)),n._registry[s.name]=s):l<a?i.warn("Plugin.register:",n.toString(o),"can not be downgraded to",n.toString(s)):s!==o&&i.warn("Plugin.register:",n.toString(s),"is already registered to different plugin object")}else n._registry[s.name]=s;return s},n.resolve=function(s){return n._registry[n.dependencyParse(s).name]},n.toString=function(s){return typeof s=="string"?s:(s.name||"anonymous")+"@"+(s.version||s.range||"0.0.0")},n.isPlugin=function(s){return s&&s.name&&s.version&&s.install},n.isUsed=function(s,o){return s.used.indexOf(o)>-1},n.isFor=function(s,o){var l=s.for&&n.dependencyParse(s.for);return!s.for||o.name===l.name&&n.versionSatisfies(o.version,l.range)},n.use=function(s,o){if(s.uses=(s.uses||[]).concat(o||[]),s.uses.length===0){i.warn("Plugin.use:",n.toString(s),"does not specify any dependencies to install.");return}for(var l=n.dependencies(s),a=i.topologicalSort(l),u=[],h=0;h<a.length;h+=1)if(a[h]!==s.name){var r=n.resolve(a[h]);if(!r){u.push("\u274C "+a[h]);continue}n.isUsed(s,r.name)||(n.isFor(r,s)||(i.warn("Plugin.use:",n.toString(r),"is for",r.for,"but installed on",n.toString(s)+"."),r._warned=!0),r.install?r.install(s):(i.warn("Plugin.use:",n.toString(r),"does not specify an install function."),r._warned=!0),r._warned?(u.push("\u{1F536} "+n.toString(r)),delete r._warned):u.push("\u2705 "+n.toString(r)),s.used.push(r.name))}u.length>0&&i.info(u.join("  "))},n.dependencies=function(s,o){var l=n.dependencyParse(s),a=l.name;if(o=o||{},!(a in o)){s=n.resolve(s)||s,o[a]=i.map(s.uses||[],function(h){n.isPlugin(h)&&n.register(h);var r=n.dependencyParse(h),c=n.resolve(h);return c&&!n.versionSatisfies(c.version,r.range)?(i.warn("Plugin.dependencies:",n.toString(c),"does not satisfy",n.toString(r),"used by",n.toString(l)+"."),c._warned=!0,s._warned=!0):c||(i.warn("Plugin.dependencies:",n.toString(h),"used by",n.toString(l),"could not be resolved."),s._warned=!0),r.name});for(var u=0;u<o[a].length;u+=1)n.dependencies(o[a][u],o);return o}},n.dependencyParse=function(s){if(i.isString(s)){var o=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;return o.test(s)||i.warn("Plugin.dependencyParse:",s,"is not a valid dependency string."),{name:s.split("@")[0],range:s.split("@")[1]||"*"}}return{name:s.name,range:s.range||s.version}},n.versionParse=function(s){var o=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;o.test(s)||i.warn("Plugin.versionParse:",s,"is not a valid version or range.");var l=o.exec(s),a=Number(l[4]),u=Number(l[5]),h=Number(l[6]);return{isRange:!!(l[1]||l[2]),version:l[3],range:s,operator:l[1]||l[2]||"",major:a,minor:u,patch:h,parts:[a,u,h],prerelease:l[7],number:a*1e8+u*1e4+h}},n.versionSatisfies=function(s,o){o=o||"*";var l=n.versionParse(o),a=n.versionParse(s);if(l.isRange){if(l.operator==="*"||s==="*")return!0;if(l.operator===">")return a.number>l.number;if(l.operator===">=")return a.number>=l.number;if(l.operator==="~")return a.major===l.major&&a.minor===l.minor&&a.patch>=l.patch;if(l.operator==="^")return l.major>0?a.major===l.major&&a.number>=l.number:l.minor>0?a.minor===l.minor&&a.patch>=l.patch:a.patch===l.patch}return s===o||s==="*"}})()},function(g,t){var e={};g.exports=e,function(){e.create=function(n){return{vertex:n,normalImpulse:0,tangentImpulse:0}}}()},function(g,t,e){var n={};g.exports=n;var i=e(7),s=e(18),o=e(13),l=e(19),a=e(5),u=e(6),h=e(10),r=e(0),c=e(4);(function(){n._deltaMax=1e3/60,n.create=function(d){d=d||{};var f={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0,lastUpdatesPerFrame:0}},m=r.extend(f,d);return m.world=d.world||u.create({label:"World"}),m.pairs=d.pairs||l.create(),m.detector=d.detector||o.create(),m.detector.pairs=m.pairs,m.grid={buckets:[]},m.world.gravity=m.gravity,m.broadphase=m.grid,m.metrics={},m},n.update=function(d,f){var m=r.now(),x=d.world,M=d.detector,b=d.pairs,p=d.timing,v=p.timestamp,y;f>n._deltaMax&&r.warnOnce("Matter.Engine.update: delta argument is recommended to be less than or equal to",n._deltaMax.toFixed(3),"ms."),f=typeof f<"u"?f:r._baseDelta,f*=p.timeScale,p.timestamp+=f,p.lastDelta=f;var _={timestamp:p.timestamp,delta:f};a.trigger(d,"beforeUpdate",_);var S=u.allBodies(x),A=u.allConstraints(x);for(x.isModified&&(o.setBodies(M,S),u.setModified(x,!1,!1,!0)),d.enableSleeping&&i.update(S,f),n._bodiesApplyGravity(S,d.gravity),f>0&&n._bodiesUpdate(S,f),a.trigger(d,"beforeSolve",_),h.preSolveAll(S),y=0;y<d.constraintIterations;y++)h.solveAll(A,f);h.postSolveAll(S);var w=o.collisions(M);l.update(b,w,v),d.enableSleeping&&i.afterCollisions(b.list),b.collisionStart.length>0&&a.trigger(d,"collisionStart",{pairs:b.collisionStart,timestamp:p.timestamp,delta:f});var T=r.clamp(20/d.positionIterations,0,1);for(s.preSolvePosition(b.list),y=0;y<d.positionIterations;y++)s.solvePosition(b.list,f,T);for(s.postSolvePosition(S),h.preSolveAll(S),y=0;y<d.constraintIterations;y++)h.solveAll(A,f);for(h.postSolveAll(S),s.preSolveVelocity(b.list),y=0;y<d.velocityIterations;y++)s.solveVelocity(b.list,f);return n._bodiesUpdateVelocities(S),b.collisionActive.length>0&&a.trigger(d,"collisionActive",{pairs:b.collisionActive,timestamp:p.timestamp,delta:f}),b.collisionEnd.length>0&&a.trigger(d,"collisionEnd",{pairs:b.collisionEnd,timestamp:p.timestamp,delta:f}),n._bodiesClearForces(S),a.trigger(d,"afterUpdate",_),d.timing.lastElapsed=r.now()-m,d},n.merge=function(d,f){if(r.extend(d,f),f.world){d.world=f.world,n.clear(d);for(var m=u.allBodies(d.world),x=0;x<m.length;x++){var M=m[x];i.set(M,!1),M.id=r.nextId()}}},n.clear=function(d){l.clear(d.pairs),o.clear(d.detector)},n._bodiesClearForces=function(d){for(var f=d.length,m=0;m<f;m++){var x=d[m];x.force.x=0,x.force.y=0,x.torque=0}},n._bodiesApplyGravity=function(d,f){var m=typeof f.scale<"u"?f.scale:.001,x=d.length;if(!(f.x===0&&f.y===0||m===0))for(var M=0;M<x;M++){var b=d[M];b.isStatic||b.isSleeping||(b.force.y+=b.mass*f.y*m,b.force.x+=b.mass*f.x*m)}},n._bodiesUpdate=function(d,f){for(var m=d.length,x=0;x<m;x++){var M=d[x];M.isStatic||M.isSleeping||c.update(M,f)}},n._bodiesUpdateVelocities=function(d){for(var f=d.length,m=0;m<f;m++)c.updateVelocities(d[m])}})()},function(g,t,e){var n={};g.exports=n;var i=e(3),s=e(0),o=e(1);(function(){n._restingThresh=2,n._restingThreshTangent=Math.sqrt(6),n._positionDampen=.9,n._positionWarming=.8,n._frictionNormalMultiplier=5,n._frictionMaxStatic=Number.MAX_VALUE,n.preSolvePosition=function(l){var a,u,h,r=l.length;for(a=0;a<r;a++)u=l[a],u.isActive&&(h=u.contactCount,u.collision.parentA.totalContacts+=h,u.collision.parentB.totalContacts+=h)},n.solvePosition=function(l,a,u){var h,r,c,d,f,m,x,M,b=n._positionDampen*(u||1),p=s.clamp(a/s._baseDelta,0,1),v=l.length;for(h=0;h<v;h++)r=l[h],!(!r.isActive||r.isSensor)&&(c=r.collision,d=c.parentA,f=c.parentB,m=c.normal,r.separation=c.depth+m.x*(f.positionImpulse.x-d.positionImpulse.x)+m.y*(f.positionImpulse.y-d.positionImpulse.y));for(h=0;h<v;h++)r=l[h],!(!r.isActive||r.isSensor)&&(c=r.collision,d=c.parentA,f=c.parentB,m=c.normal,M=r.separation-r.slop*p,(d.isStatic||f.isStatic)&&(M*=2),d.isStatic||d.isSleeping||(x=b/d.totalContacts,d.positionImpulse.x+=m.x*M*x,d.positionImpulse.y+=m.y*M*x),f.isStatic||f.isSleeping||(x=b/f.totalContacts,f.positionImpulse.x-=m.x*M*x,f.positionImpulse.y-=m.y*M*x))},n.postSolvePosition=function(l){for(var a=n._positionWarming,u=l.length,h=i.translate,r=o.update,c=0;c<u;c++){var d=l[c],f=d.positionImpulse,m=f.x,x=f.y,M=d.velocity;if(d.totalContacts=0,m!==0||x!==0){for(var b=0;b<d.parts.length;b++){var p=d.parts[b];h(p.vertices,f),r(p.bounds,p.vertices,M),p.position.x+=m,p.position.y+=x}d.positionPrev.x+=m,d.positionPrev.y+=x,m*M.x+x*M.y<0?(f.x=0,f.y=0):(f.x*=a,f.y*=a)}}},n.preSolveVelocity=function(l){var a=l.length,u,h;for(u=0;u<a;u++){var r=l[u];if(!(!r.isActive||r.isSensor)){var c=r.contacts,d=r.contactCount,f=r.collision,m=f.parentA,x=f.parentB,M=f.normal,b=f.tangent;for(h=0;h<d;h++){var p=c[h],v=p.vertex,y=p.normalImpulse,_=p.tangentImpulse;if(y!==0||_!==0){var S=M.x*y+b.x*_,A=M.y*y+b.y*_;m.isStatic||m.isSleeping||(m.positionPrev.x+=S*m.inverseMass,m.positionPrev.y+=A*m.inverseMass,m.anglePrev+=m.inverseInertia*((v.x-m.position.x)*A-(v.y-m.position.y)*S)),x.isStatic||x.isSleeping||(x.positionPrev.x-=S*x.inverseMass,x.positionPrev.y-=A*x.inverseMass,x.anglePrev-=x.inverseInertia*((v.x-x.position.x)*A-(v.y-x.position.y)*S))}}}}},n.solveVelocity=function(l,a){var u=a/s._baseDelta,h=u*u,r=h*u,c=-n._restingThresh*u,d=n._restingThreshTangent,f=n._frictionNormalMultiplier*u,m=n._frictionMaxStatic,x=l.length,M,b,p,v;for(p=0;p<x;p++){var y=l[p];if(!(!y.isActive||y.isSensor)){var _=y.collision,S=_.parentA,A=_.parentB,w=_.normal.x,T=_.normal.y,E=_.tangent.x,R=_.tangent.y,P=y.inverseMass,L=y.friction*y.frictionStatic*f,I=y.contacts,F=y.contactCount,U=1/F,V=S.position.x-S.positionPrev.x,k=S.position.y-S.positionPrev.y,H=S.angle-S.anglePrev,G=A.position.x-A.positionPrev.x,ot=A.position.y-A.positionPrev.y,at=A.angle-A.anglePrev;for(v=0;v<F;v++){var B=I[v],j=B.vertex,W=j.x-S.position.x,bt=j.y-S.position.y,et=j.x-A.position.x,tt=j.y-A.position.y,q=V-bt*H,Me=k+W*H,Xt=G-tt*at,ti=ot+et*at,Se=q-Xt,hs=Me-ti,ei=w*Se+T*hs,wt=E*Se+R*hs,us=y.separation+ei,ni=Math.min(us,1);ni=us<0?0:ni;var ds=ni*L;wt<-ds||wt>ds?(b=wt>0?wt:-wt,M=y.friction*(wt>0?1:-1)*r,M<-b?M=-b:M>b&&(M=b)):(M=wt,b=m);var fs=W*T-bt*w,ps=et*T-tt*w,ms=U/(P+S.inverseInertia*fs*fs+A.inverseInertia*ps*ps),je=(1+y.restitution)*ei*ms;if(M*=ms,ei<c)B.normalImpulse=0;else{var hr=B.normalImpulse;B.normalImpulse+=je,B.normalImpulse>0&&(B.normalImpulse=0),je=B.normalImpulse-hr}if(wt<-d||wt>d)B.tangentImpulse=0;else{var ur=B.tangentImpulse;B.tangentImpulse+=M,B.tangentImpulse<-b&&(B.tangentImpulse=-b),B.tangentImpulse>b&&(B.tangentImpulse=b),M=B.tangentImpulse-ur}var tn=w*je+E*M,en=T*je+R*M;S.isStatic||S.isSleeping||(S.positionPrev.x+=tn*S.inverseMass,S.positionPrev.y+=en*S.inverseMass,S.anglePrev+=(W*en-bt*tn)*S.inverseInertia),A.isStatic||A.isSleeping||(A.positionPrev.x-=tn*A.inverseMass,A.positionPrev.y-=en*A.inverseMass,A.anglePrev-=(et*en-tt*tn)*A.inverseInertia)}}}}})()},function(g,t,e){var n={};g.exports=n;var i=e(9),s=e(0);(function(){n.create=function(o){return s.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},o)},n.update=function(o,l,a){var u=i.update,h=i.create,r=i.setActive,c=o.table,d=o.list,f=d.length,m=f,x=o.collisionStart,M=o.collisionEnd,b=o.collisionActive,p=l.length,v=0,y=0,_=0,S,A,w;for(w=0;w<p;w++)S=l[w],A=S.pair,A?(A.isActive&&(b[_++]=A),u(A,S,a)):(A=h(S,a),c[A.id]=A,x[v++]=A,d[m++]=A);for(m=0,f=d.length,w=0;w<f;w++)A=d[w],A.timeUpdated>=a?d[m++]=A:(r(A,!1,a),A.collision.bodyA.sleepCounter>0&&A.collision.bodyB.sleepCounter>0?d[m++]=A:(M[y++]=A,delete c[A.id]));d.length!==m&&(d.length=m),x.length!==v&&(x.length=v),M.length!==y&&(M.length=y),b.length!==_&&(b.length=_)},n.clear=function(o){return o.table={},o.list.length=0,o.collisionStart.length=0,o.collisionActive.length=0,o.collisionEnd.length=0,o}})()},function(g,t,e){var n=g.exports=e(21);n.Axes=e(11),n.Bodies=e(12),n.Body=e(4),n.Bounds=e(1),n.Collision=e(8),n.Common=e(0),n.Composite=e(6),n.Composites=e(22),n.Constraint=e(10),n.Contact=e(16),n.Detector=e(13),n.Engine=e(17),n.Events=e(5),n.Grid=e(23),n.Mouse=e(14),n.MouseConstraint=e(24),n.Pair=e(9),n.Pairs=e(19),n.Plugin=e(15),n.Query=e(25),n.Render=e(26),n.Resolver=e(18),n.Runner=e(27),n.SAT=e(28),n.Sleeping=e(7),n.Svg=e(29),n.Vector=e(2),n.Vertices=e(3),n.World=e(30),n.Engine.run=n.Runner.run,n.Common.deprecated(n.Engine,"run","Engine.run \u27A4 use Matter.Runner.run(engine) instead")},function(g,t,e){var n={};g.exports=n;var i=e(15),s=e(0);(function(){n.name="matter-js",n.version="0.20.0",n.uses=[],n.used=[],n.use=function(){i.use(n,Array.prototype.slice.call(arguments))},n.before=function(o,l){return o=o.replace(/^Matter./,""),s.chainPathBefore(n,o,l)},n.after=function(o,l){return o=o.replace(/^Matter./,""),s.chainPathAfter(n,o,l)}})()},function(g,t,e){var n={};g.exports=n;var i=e(6),s=e(10),o=e(0),l=e(4),a=e(12),u=o.deprecated;(function(){n.stack=function(h,r,c,d,f,m,x){for(var M=i.create({label:"Stack"}),b=h,p=r,v,y=0,_=0;_<d;_++){for(var S=0,A=0;A<c;A++){var w=x(b,p,A,_,v,y);if(w){var T=w.bounds.max.y-w.bounds.min.y,E=w.bounds.max.x-w.bounds.min.x;T>S&&(S=T),l.translate(w,{x:E*.5,y:T*.5}),b=w.bounds.max.x+f,i.addBody(M,w),v=w,y+=1}else b+=f}p+=S+m,b=h}return M},n.chain=function(h,r,c,d,f,m){for(var x=h.bodies,M=1;M<x.length;M++){var b=x[M-1],p=x[M],v=b.bounds.max.y-b.bounds.min.y,y=b.bounds.max.x-b.bounds.min.x,_=p.bounds.max.y-p.bounds.min.y,S=p.bounds.max.x-p.bounds.min.x,A={bodyA:b,pointA:{x:y*r,y:v*c},bodyB:p,pointB:{x:S*d,y:_*f}},w=o.extend(A,m);i.addConstraint(h,s.create(w))}return h.label+=" Chain",h},n.mesh=function(h,r,c,d,f){var m=h.bodies,x,M,b,p,v;for(x=0;x<c;x++){for(M=1;M<r;M++)b=m[M-1+x*r],p=m[M+x*r],i.addConstraint(h,s.create(o.extend({bodyA:b,bodyB:p},f)));if(x>0)for(M=0;M<r;M++)b=m[M+(x-1)*r],p=m[M+x*r],i.addConstraint(h,s.create(o.extend({bodyA:b,bodyB:p},f))),d&&M>0&&(v=m[M-1+(x-1)*r],i.addConstraint(h,s.create(o.extend({bodyA:v,bodyB:p},f)))),d&&M<r-1&&(v=m[M+1+(x-1)*r],i.addConstraint(h,s.create(o.extend({bodyA:v,bodyB:p},f))))}return h.label+=" Mesh",h},n.pyramid=function(h,r,c,d,f,m,x){return n.stack(h,r,c,d,f,m,function(M,b,p,v,y,_){var S=Math.min(d,Math.ceil(c/2)),A=y?y.bounds.max.x-y.bounds.min.x:0;if(!(v>S)){v=S-v;var w=v,T=c-1-v;if(!(p<w||p>T)){_===1&&l.translate(y,{x:(p+(c%2===1?1:-1))*A,y:0});var E=y?p*A:0;return x(h+E+p*f,b,p,v,y,_)}}})},n.newtonsCradle=function(h,r,c,d,f){for(var m=i.create({label:"Newtons Cradle"}),x=0;x<c;x++){var M=1.9,b=a.circle(h+x*(d*M),r+f,d,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),p=s.create({pointA:{x:h+x*(d*M),y:r},bodyB:b});i.addBody(m,b),i.addConstraint(m,p)}return m},u(n,"newtonsCradle","Composites.newtonsCradle \u27A4 moved to newtonsCradle example"),n.car=function(h,r,c,d,f){var m=l.nextGroup(!0),x=20,M=-c*.5+x,b=c*.5-x,p=0,v=i.create({label:"Car"}),y=a.rectangle(h,r,c,d,{collisionFilter:{group:m},chamfer:{radius:d*.5},density:2e-4}),_=a.circle(h+M,r+p,f,{collisionFilter:{group:m},friction:.8}),S=a.circle(h+b,r+p,f,{collisionFilter:{group:m},friction:.8}),A=s.create({bodyB:y,pointB:{x:M,y:p},bodyA:_,stiffness:1,length:0}),w=s.create({bodyB:y,pointB:{x:b,y:p},bodyA:S,stiffness:1,length:0});return i.addBody(v,y),i.addBody(v,_),i.addBody(v,S),i.addConstraint(v,A),i.addConstraint(v,w),v},u(n,"car","Composites.car \u27A4 moved to car example"),n.softBody=function(h,r,c,d,f,m,x,M,b,p){b=o.extend({inertia:1/0},b),p=o.extend({stiffness:.2,render:{type:"line",anchors:!1}},p);var v=n.stack(h,r,c,d,f,m,function(y,_){return a.circle(y,_,M,b)});return n.mesh(v,c,d,x,p),v.label="Soft Body",v},u(n,"softBody","Composites.softBody \u27A4 moved to softBody and cloth examples")})()},function(g,t,e){var n={};g.exports=n;var i=e(9),s=e(0),o=s.deprecated;(function(){n.create=function(l){var a={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return s.extend(a,l)},n.update=function(l,a,u,h){var r,c,d,f=u.world,m=l.buckets,x,M,b=!1;for(r=0;r<a.length;r++){var p=a[r];if(!(p.isSleeping&&!h)&&!(f.bounds&&(p.bounds.max.x<f.bounds.min.x||p.bounds.min.x>f.bounds.max.x||p.bounds.max.y<f.bounds.min.y||p.bounds.min.y>f.bounds.max.y))){var v=n._getRegion(l,p);if(!p.region||v.id!==p.region.id||h){(!p.region||h)&&(p.region=v);var y=n._regionUnion(v,p.region);for(c=y.startCol;c<=y.endCol;c++)for(d=y.startRow;d<=y.endRow;d++){M=n._getBucketId(c,d),x=m[M];var _=c>=v.startCol&&c<=v.endCol&&d>=v.startRow&&d<=v.endRow,S=c>=p.region.startCol&&c<=p.region.endCol&&d>=p.region.startRow&&d<=p.region.endRow;!_&&S&&S&&x&&n._bucketRemoveBody(l,x,p),(p.region===v||_&&!S||h)&&(x||(x=n._createBucket(m,M)),n._bucketAddBody(l,x,p))}p.region=v,b=!0}}}b&&(l.pairsList=n._createActivePairsList(l))},o(n,"update","Grid.update \u27A4 replaced by Matter.Detector"),n.clear=function(l){l.buckets={},l.pairs={},l.pairsList=[]},o(n,"clear","Grid.clear \u27A4 replaced by Matter.Detector"),n._regionUnion=function(l,a){var u=Math.min(l.startCol,a.startCol),h=Math.max(l.endCol,a.endCol),r=Math.min(l.startRow,a.startRow),c=Math.max(l.endRow,a.endRow);return n._createRegion(u,h,r,c)},n._getRegion=function(l,a){var u=a.bounds,h=Math.floor(u.min.x/l.bucketWidth),r=Math.floor(u.max.x/l.bucketWidth),c=Math.floor(u.min.y/l.bucketHeight),d=Math.floor(u.max.y/l.bucketHeight);return n._createRegion(h,r,c,d)},n._createRegion=function(l,a,u,h){return{id:l+","+a+","+u+","+h,startCol:l,endCol:a,startRow:u,endRow:h}},n._getBucketId=function(l,a){return"C"+l+"R"+a},n._createBucket=function(l,a){var u=l[a]=[];return u},n._bucketAddBody=function(l,a,u){var h=l.pairs,r=i.id,c=a.length,d;for(d=0;d<c;d++){var f=a[d];if(!(u.id===f.id||u.isStatic&&f.isStatic)){var m=r(u,f),x=h[m];x?x[2]+=1:h[m]=[u,f,1]}}a.push(u)},n._bucketRemoveBody=function(l,a,u){var h=l.pairs,r=i.id,c;a.splice(s.indexOf(a,u),1);var d=a.length;for(c=0;c<d;c++){var f=h[r(u,a[c])];f&&(f[2]-=1)}},n._createActivePairsList=function(l){var a,u=l.pairs,h=s.keys(u),r=h.length,c=[],d;for(d=0;d<r;d++)a=u[h[d]],a[2]>0?c.push(a):delete u[h[d]];return c}})()},function(g,t,e){var n={};g.exports=n;var i=e(3),s=e(7),o=e(14),l=e(5),a=e(13),u=e(10),h=e(6),r=e(0),c=e(1);(function(){n.create=function(d,f){var m=(d?d.mouse:null)||(f?f.mouse:null);m||(d&&d.render&&d.render.canvas?m=o.create(d.render.canvas):f&&f.element?m=o.create(f.element):(m=o.create(),r.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var x=u.create({label:"Mouse Constraint",pointA:m.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),M={type:"mouseConstraint",mouse:m,element:null,body:null,constraint:x,collisionFilter:{category:1,mask:4294967295,group:0}},b=r.extend(M,f);return l.on(d,"beforeUpdate",function(){var p=h.allBodies(d.world);n.update(b,p),n._triggerEvents(b)}),b},n.update=function(d,f){var m=d.mouse,x=d.constraint,M=d.body;if(m.button===0){if(x.bodyB)s.set(x.bodyB,!1),x.pointA=m.position;else for(var b=0;b<f.length;b++)if(M=f[b],c.contains(M.bounds,m.position)&&a.canCollide(M.collisionFilter,d.collisionFilter))for(var p=M.parts.length>1?1:0;p<M.parts.length;p++){var v=M.parts[p];if(i.contains(v.vertices,m.position)){x.pointA=m.position,x.bodyB=d.body=M,x.pointB={x:m.position.x-M.position.x,y:m.position.y-M.position.y},x.angleB=M.angle,s.set(M,!1),l.trigger(d,"startdrag",{mouse:m,body:M});break}}}else x.bodyB=d.body=null,x.pointB=null,M&&l.trigger(d,"enddrag",{mouse:m,body:M})},n._triggerEvents=function(d){var f=d.mouse,m=f.sourceEvents;m.mousemove&&l.trigger(d,"mousemove",{mouse:f}),m.mousedown&&l.trigger(d,"mousedown",{mouse:f}),m.mouseup&&l.trigger(d,"mouseup",{mouse:f}),o.clearSourceEvents(f)}})()},function(g,t,e){var n={};g.exports=n;var i=e(2),s=e(8),o=e(1),l=e(12),a=e(3);(function(){n.collides=function(u,h){for(var r=[],c=h.length,d=u.bounds,f=s.collides,m=o.overlaps,x=0;x<c;x++){var M=h[x],b=M.parts.length,p=b===1?0:1;if(m(M.bounds,d))for(var v=p;v<b;v++){var y=M.parts[v];if(m(y.bounds,d)){var _=f(y,u);if(_){r.push(_);break}}}}return r},n.ray=function(u,h,r,c){c=c||1e-100;for(var d=i.angle(h,r),f=i.magnitude(i.sub(h,r)),m=(r.x+h.x)*.5,x=(r.y+h.y)*.5,M=l.rectangle(m,x,f,c,{angle:d}),b=n.collides(M,u),p=0;p<b.length;p+=1){var v=b[p];v.body=v.bodyB=v.bodyA}return b},n.region=function(u,h,r){for(var c=[],d=0;d<u.length;d++){var f=u[d],m=o.overlaps(f.bounds,h);(m&&!r||!m&&r)&&c.push(f)}return c},n.point=function(u,h){for(var r=[],c=0;c<u.length;c++){var d=u[c];if(o.contains(d.bounds,h))for(var f=d.parts.length===1?0:1;f<d.parts.length;f++){var m=d.parts[f];if(o.contains(m.bounds,h)&&a.contains(m.vertices,h)){r.push(d);break}}}return r}})()},function(g,t,e){var n={};g.exports=n;var i=e(4),s=e(0),o=e(6),l=e(1),a=e(5),u=e(2),h=e(14);(function(){var r,c;typeof window<"u"&&(r=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(p){window.setTimeout(function(){p(s.now())},1e3/60)},c=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),n._goodFps=30,n._goodDelta=1e3/60,n.create=function(p){var v={engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],engineUpdatesHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",wireframeStrokeStyle:"#bbb",hasBounds:!!p.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},y=s.extend(v,p);return y.canvas&&(y.canvas.width=y.options.width||y.canvas.width,y.canvas.height=y.options.height||y.canvas.height),y.mouse=p.mouse,y.engine=p.engine,y.canvas=y.canvas||m(y.options.width,y.options.height),y.context=y.canvas.getContext("2d"),y.textures={},y.bounds=y.bounds||{min:{x:0,y:0},max:{x:y.canvas.width,y:y.canvas.height}},y.controller=n,y.options.showBroadphase=!1,y.options.pixelRatio!==1&&n.setPixelRatio(y,y.options.pixelRatio),s.isElement(y.element)&&y.element.appendChild(y.canvas),y},n.run=function(p){(function v(y){p.frameRequestId=r(v),d(p,y),n.world(p,y),p.context.setTransform(p.options.pixelRatio,0,0,p.options.pixelRatio,0,0),(p.options.showStats||p.options.showDebug)&&n.stats(p,p.context,y),(p.options.showPerformance||p.options.showDebug)&&n.performance(p,p.context,y),p.context.setTransform(1,0,0,1,0,0)})()},n.stop=function(p){c(p.frameRequestId)},n.setPixelRatio=function(p,v){var y=p.options,_=p.canvas;v==="auto"&&(v=x(_)),y.pixelRatio=v,_.setAttribute("data-pixel-ratio",v),_.width=y.width*v,_.height=y.height*v,_.style.width=y.width+"px",_.style.height=y.height+"px"},n.setSize=function(p,v,y){p.options.width=v,p.options.height=y,p.bounds.max.x=p.bounds.min.x+v,p.bounds.max.y=p.bounds.min.y+y,p.options.pixelRatio!==1?n.setPixelRatio(p,p.options.pixelRatio):(p.canvas.width=v,p.canvas.height=y)},n.lookAt=function(p,v,y,_){_=typeof _<"u"?_:!0,v=s.isArray(v)?v:[v],y=y||{x:0,y:0};for(var S={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},A=0;A<v.length;A+=1){var w=v[A],T=w.bounds?w.bounds.min:w.min||w.position||w,E=w.bounds?w.bounds.max:w.max||w.position||w;T&&E&&(T.x<S.min.x&&(S.min.x=T.x),E.x>S.max.x&&(S.max.x=E.x),T.y<S.min.y&&(S.min.y=T.y),E.y>S.max.y&&(S.max.y=E.y))}var R=S.max.x-S.min.x+2*y.x,P=S.max.y-S.min.y+2*y.y,L=p.canvas.height,I=p.canvas.width,F=I/L,U=R/P,V=1,k=1;U>F?k=U/F:V=F/U,p.options.hasBounds=!0,p.bounds.min.x=S.min.x,p.bounds.max.x=S.min.x+R*V,p.bounds.min.y=S.min.y,p.bounds.max.y=S.min.y+P*k,_&&(p.bounds.min.x+=R*.5-R*V*.5,p.bounds.max.x+=R*.5-R*V*.5,p.bounds.min.y+=P*.5-P*k*.5,p.bounds.max.y+=P*.5-P*k*.5),p.bounds.min.x-=y.x,p.bounds.max.x-=y.x,p.bounds.min.y-=y.y,p.bounds.max.y-=y.y,p.mouse&&(h.setScale(p.mouse,{x:(p.bounds.max.x-p.bounds.min.x)/p.canvas.width,y:(p.bounds.max.y-p.bounds.min.y)/p.canvas.height}),h.setOffset(p.mouse,p.bounds.min))},n.startViewTransform=function(p){var v=p.bounds.max.x-p.bounds.min.x,y=p.bounds.max.y-p.bounds.min.y,_=v/p.options.width,S=y/p.options.height;p.context.setTransform(p.options.pixelRatio/_,0,0,p.options.pixelRatio/S,0,0),p.context.translate(-p.bounds.min.x,-p.bounds.min.y)},n.endViewTransform=function(p){p.context.setTransform(p.options.pixelRatio,0,0,p.options.pixelRatio,0,0)},n.world=function(p,v){var y=s.now(),_=p.engine,S=_.world,A=p.canvas,w=p.context,T=p.options,E=p.timing,R=o.allBodies(S),P=o.allConstraints(S),L=T.wireframes?T.wireframeBackground:T.background,I=[],F=[],U,V={timestamp:_.timing.timestamp};if(a.trigger(p,"beforeRender",V),p.currentBackground!==L&&b(p,L),w.globalCompositeOperation="source-in",w.fillStyle="transparent",w.fillRect(0,0,A.width,A.height),w.globalCompositeOperation="source-over",T.hasBounds){for(U=0;U<R.length;U++){var k=R[U];l.overlaps(k.bounds,p.bounds)&&I.push(k)}for(U=0;U<P.length;U++){var H=P[U],G=H.bodyA,ot=H.bodyB,at=H.pointA,B=H.pointB;G&&(at=u.add(G.position,H.pointA)),ot&&(B=u.add(ot.position,H.pointB)),!(!at||!B)&&(l.contains(p.bounds,at)||l.contains(p.bounds,B))&&F.push(H)}n.startViewTransform(p),p.mouse&&(h.setScale(p.mouse,{x:(p.bounds.max.x-p.bounds.min.x)/p.options.width,y:(p.bounds.max.y-p.bounds.min.y)/p.options.height}),h.setOffset(p.mouse,p.bounds.min))}else F=P,I=R,p.options.pixelRatio!==1&&p.context.setTransform(p.options.pixelRatio,0,0,p.options.pixelRatio,0,0);!T.wireframes||_.enableSleeping&&T.showSleeping?n.bodies(p,I,w):(T.showConvexHulls&&n.bodyConvexHulls(p,I,w),n.bodyWireframes(p,I,w)),T.showBounds&&n.bodyBounds(p,I,w),(T.showAxes||T.showAngleIndicator)&&n.bodyAxes(p,I,w),T.showPositions&&n.bodyPositions(p,I,w),T.showVelocity&&n.bodyVelocity(p,I,w),T.showIds&&n.bodyIds(p,I,w),T.showSeparations&&n.separations(p,_.pairs.list,w),T.showCollisions&&n.collisions(p,_.pairs.list,w),T.showVertexNumbers&&n.vertexNumbers(p,I,w),T.showMousePosition&&n.mousePosition(p,p.mouse,w),n.constraints(F,w),T.hasBounds&&n.endViewTransform(p),a.trigger(p,"afterRender",V),E.lastElapsed=s.now()-y},n.stats=function(p,v,y){for(var _=p.engine,S=_.world,A=o.allBodies(S),w=0,T=55,E=44,R=0,P=0,L=0;L<A.length;L+=1)w+=A[L].parts.length;var I={Part:w,Body:A.length,Cons:o.allConstraints(S).length,Comp:o.allComposites(S).length,Pair:_.pairs.list.length};v.fillStyle="#0e0f19",v.fillRect(R,P,T*5.5,E),v.font="12px Arial",v.textBaseline="top",v.textAlign="right";for(var F in I){var U=I[F];v.fillStyle="#aaa",v.fillText(F,R+T,P+8),v.fillStyle="#eee",v.fillText(U,R+T,P+26),R+=T}},n.performance=function(p,v){var y=p.engine,_=p.timing,S=_.deltaHistory,A=_.elapsedHistory,w=_.timestampElapsedHistory,T=_.engineDeltaHistory,E=_.engineUpdatesHistory,R=_.engineElapsedHistory,P=y.timing.lastUpdatesPerFrame,L=y.timing.lastDelta,I=f(S),F=f(A),U=f(T),V=f(E),k=f(R),H=f(w),G=H/I||0,ot=Math.round(I/L),at=1e3/I||0,B=4,j=12,W=60,bt=34,et=10,tt=69;v.fillStyle="#0e0f19",v.fillRect(0,50,j*5+W*6+22,bt),n.status(v,et,tt,W,B,S.length,Math.round(at)+" fps",at/n._goodFps,function(q){return S[q]/I-1}),n.status(v,et+j+W,tt,W,B,T.length,L.toFixed(2)+" dt",n._goodDelta/L,function(q){return T[q]/U-1}),n.status(v,et+(j+W)*2,tt,W,B,E.length,P+" upf",Math.pow(s.clamp(V/ot||1,0,1),4),function(q){return E[q]/V-1}),n.status(v,et+(j+W)*3,tt,W,B,R.length,k.toFixed(2)+" ut",1-P*k/n._goodFps,function(q){return R[q]/k-1}),n.status(v,et+(j+W)*4,tt,W,B,A.length,F.toFixed(2)+" rt",1-F/n._goodFps,function(q){return A[q]/F-1}),n.status(v,et+(j+W)*5,tt,W,B,w.length,G.toFixed(2)+" x",G*G*G,function(q){return(w[q]/S[q]/G||0)-1})},n.status=function(p,v,y,_,S,A,w,T,E){p.strokeStyle="#888",p.fillStyle="#444",p.lineWidth=1,p.fillRect(v,y+7,_,1),p.beginPath(),p.moveTo(v,y+7-S*s.clamp(.4*E(0),-2,2));for(var R=0;R<_;R+=1)p.lineTo(v+R,y+7-(R<A?S*s.clamp(.4*E(R),-2,2):0));p.stroke(),p.fillStyle="hsl("+s.clamp(25+95*T,0,120)+",100%,60%)",p.fillRect(v,y-7,4,4),p.font="12px Arial",p.textBaseline="middle",p.textAlign="right",p.fillStyle="#eee",p.fillText(w,v+_,y-5)},n.constraints=function(p,v){for(var y=v,_=0;_<p.length;_++){var S=p[_];if(!(!S.render.visible||!S.pointA||!S.pointB)){var A=S.bodyA,w=S.bodyB,T,E;if(A?T=u.add(A.position,S.pointA):T=S.pointA,S.render.type==="pin")y.beginPath(),y.arc(T.x,T.y,3,0,2*Math.PI),y.closePath();else{if(w?E=u.add(w.position,S.pointB):E=S.pointB,y.beginPath(),y.moveTo(T.x,T.y),S.render.type==="spring")for(var R=u.sub(E,T),P=u.perp(u.normalise(R)),L=Math.ceil(s.clamp(S.length/5,12,20)),I,F=1;F<L;F+=1)I=F%2===0?1:-1,y.lineTo(T.x+R.x*(F/L)+P.x*I*4,T.y+R.y*(F/L)+P.y*I*4);y.lineTo(E.x,E.y)}S.render.lineWidth&&(y.lineWidth=S.render.lineWidth,y.strokeStyle=S.render.strokeStyle,y.stroke()),S.render.anchors&&(y.fillStyle=S.render.strokeStyle,y.beginPath(),y.arc(T.x,T.y,3,0,2*Math.PI),y.arc(E.x,E.y,3,0,2*Math.PI),y.closePath(),y.fill())}}},n.bodies=function(p,v,y){var _=y,S=p.engine,A=p.options,w=A.showInternalEdges||!A.wireframes,T,E,R,P;for(R=0;R<v.length;R++)if(T=v[R],!!T.render.visible){for(P=T.parts.length>1?1:0;P<T.parts.length;P++)if(E=T.parts[P],!!E.render.visible){if(A.showSleeping&&T.isSleeping?_.globalAlpha=.5*E.render.opacity:E.render.opacity!==1&&(_.globalAlpha=E.render.opacity),E.render.sprite&&E.render.sprite.texture&&!A.wireframes){var L=E.render.sprite,I=M(p,L.texture);_.translate(E.position.x,E.position.y),_.rotate(E.angle),_.drawImage(I,I.width*-L.xOffset*L.xScale,I.height*-L.yOffset*L.yScale,I.width*L.xScale,I.height*L.yScale),_.rotate(-E.angle),_.translate(-E.position.x,-E.position.y)}else{if(E.circleRadius)_.beginPath(),_.arc(E.position.x,E.position.y,E.circleRadius,0,2*Math.PI);else{_.beginPath(),_.moveTo(E.vertices[0].x,E.vertices[0].y);for(var F=1;F<E.vertices.length;F++)!E.vertices[F-1].isInternal||w?_.lineTo(E.vertices[F].x,E.vertices[F].y):_.moveTo(E.vertices[F].x,E.vertices[F].y),E.vertices[F].isInternal&&!w&&_.moveTo(E.vertices[(F+1)%E.vertices.length].x,E.vertices[(F+1)%E.vertices.length].y);_.lineTo(E.vertices[0].x,E.vertices[0].y),_.closePath()}A.wireframes?(_.lineWidth=1,_.strokeStyle=p.options.wireframeStrokeStyle,_.stroke()):(_.fillStyle=E.render.fillStyle,E.render.lineWidth&&(_.lineWidth=E.render.lineWidth,_.strokeStyle=E.render.strokeStyle,_.stroke()),_.fill())}_.globalAlpha=1}}},n.bodyWireframes=function(p,v,y){var _=y,S=p.options.showInternalEdges,A,w,T,E,R;for(_.beginPath(),T=0;T<v.length;T++)if(A=v[T],!!A.render.visible)for(R=A.parts.length>1?1:0;R<A.parts.length;R++){for(w=A.parts[R],_.moveTo(w.vertices[0].x,w.vertices[0].y),E=1;E<w.vertices.length;E++)!w.vertices[E-1].isInternal||S?_.lineTo(w.vertices[E].x,w.vertices[E].y):_.moveTo(w.vertices[E].x,w.vertices[E].y),w.vertices[E].isInternal&&!S&&_.moveTo(w.vertices[(E+1)%w.vertices.length].x,w.vertices[(E+1)%w.vertices.length].y);_.lineTo(w.vertices[0].x,w.vertices[0].y)}_.lineWidth=1,_.strokeStyle=p.options.wireframeStrokeStyle,_.stroke()},n.bodyConvexHulls=function(p,v,y){var _=y,S,A,w,T,E;for(_.beginPath(),w=0;w<v.length;w++)if(S=v[w],!(!S.render.visible||S.parts.length===1)){for(_.moveTo(S.vertices[0].x,S.vertices[0].y),T=1;T<S.vertices.length;T++)_.lineTo(S.vertices[T].x,S.vertices[T].y);_.lineTo(S.vertices[0].x,S.vertices[0].y)}_.lineWidth=1,_.strokeStyle="rgba(255,255,255,0.2)",_.stroke()},n.vertexNumbers=function(p,v,y){var _=y,S,A,w;for(S=0;S<v.length;S++){var T=v[S].parts;for(w=T.length>1?1:0;w<T.length;w++){var E=T[w];for(A=0;A<E.vertices.length;A++)_.fillStyle="rgba(255,255,255,0.2)",_.fillText(S+"_"+A,E.position.x+(E.vertices[A].x-E.position.x)*.8,E.position.y+(E.vertices[A].y-E.position.y)*.8)}}},n.mousePosition=function(p,v,y){var _=y;_.fillStyle="rgba(255,255,255,0.8)",_.fillText(v.position.x+"  "+v.position.y,v.position.x+5,v.position.y-5)},n.bodyBounds=function(p,v,y){var _=y,S=p.engine,A=p.options;_.beginPath();for(var w=0;w<v.length;w++){var T=v[w];if(T.render.visible)for(var E=v[w].parts,R=E.length>1?1:0;R<E.length;R++){var P=E[R];_.rect(P.bounds.min.x,P.bounds.min.y,P.bounds.max.x-P.bounds.min.x,P.bounds.max.y-P.bounds.min.y)}}A.wireframes?_.strokeStyle="rgba(255,255,255,0.08)":_.strokeStyle="rgba(0,0,0,0.1)",_.lineWidth=1,_.stroke()},n.bodyAxes=function(p,v,y){var _=y,S=p.engine,A=p.options,w,T,E,R;for(_.beginPath(),T=0;T<v.length;T++){var P=v[T],L=P.parts;if(P.render.visible)if(A.showAxes)for(E=L.length>1?1:0;E<L.length;E++)for(w=L[E],R=0;R<w.axes.length;R++){var I=w.axes[R];_.moveTo(w.position.x,w.position.y),_.lineTo(w.position.x+I.x*20,w.position.y+I.y*20)}else for(E=L.length>1?1:0;E<L.length;E++)for(w=L[E],R=0;R<w.axes.length;R++)_.moveTo(w.position.x,w.position.y),_.lineTo((w.vertices[0].x+w.vertices[w.vertices.length-1].x)/2,(w.vertices[0].y+w.vertices[w.vertices.length-1].y)/2)}A.wireframes?(_.strokeStyle="indianred",_.lineWidth=1):(_.strokeStyle="rgba(255, 255, 255, 0.4)",_.globalCompositeOperation="overlay",_.lineWidth=2),_.stroke(),_.globalCompositeOperation="source-over"},n.bodyPositions=function(p,v,y){var _=y,S=p.engine,A=p.options,w,T,E,R;for(_.beginPath(),E=0;E<v.length;E++)if(w=v[E],!!w.render.visible)for(R=0;R<w.parts.length;R++)T=w.parts[R],_.arc(T.position.x,T.position.y,3,0,2*Math.PI,!1),_.closePath();for(A.wireframes?_.fillStyle="indianred":_.fillStyle="rgba(0,0,0,0.5)",_.fill(),_.beginPath(),E=0;E<v.length;E++)w=v[E],w.render.visible&&(_.arc(w.positionPrev.x,w.positionPrev.y,2,0,2*Math.PI,!1),_.closePath());_.fillStyle="rgba(255,165,0,0.8)",_.fill()},n.bodyVelocity=function(p,v,y){var _=y;_.beginPath();for(var S=0;S<v.length;S++){var A=v[S];if(A.render.visible){var w=i.getVelocity(A);_.moveTo(A.position.x,A.position.y),_.lineTo(A.position.x+w.x,A.position.y+w.y)}}_.lineWidth=3,_.strokeStyle="cornflowerblue",_.stroke()},n.bodyIds=function(p,v,y){var _=y,S,A;for(S=0;S<v.length;S++)if(v[S].render.visible){var w=v[S].parts;for(A=w.length>1?1:0;A<w.length;A++){var T=w[A];_.font="12px Arial",_.fillStyle="rgba(255,255,255,0.5)",_.fillText(T.id,T.position.x+10,T.position.y-10)}}},n.collisions=function(p,v,y){var _=y,S=p.options,A,w,T,E,R,P,L;for(_.beginPath(),P=0;P<v.length;P++)if(A=v[P],!!A.isActive)for(w=A.collision,L=0;L<A.contactCount;L++){var I=A.contacts[L],F=I.vertex;_.rect(F.x-1.5,F.y-1.5,3.5,3.5)}for(S.wireframes?_.fillStyle="rgba(255,255,255,0.7)":_.fillStyle="orange",_.fill(),_.beginPath(),P=0;P<v.length;P++)if(A=v[P],!!A.isActive&&(w=A.collision,A.contactCount>0)){var U=A.contacts[0].vertex.x,V=A.contacts[0].vertex.y;A.contactCount===2&&(U=(A.contacts[0].vertex.x+A.contacts[1].vertex.x)/2,V=(A.contacts[0].vertex.y+A.contacts[1].vertex.y)/2),w.bodyB===w.supports[0].body||w.bodyA.isStatic===!0?_.moveTo(U-w.normal.x*8,V-w.normal.y*8):_.moveTo(U+w.normal.x*8,V+w.normal.y*8),_.lineTo(U,V)}S.wireframes?_.strokeStyle="rgba(255,165,0,0.7)":_.strokeStyle="orange",_.lineWidth=1,_.stroke()},n.separations=function(p,v,y){var _=y,S=p.options,A,w,T,E,R,P,L;for(_.beginPath(),P=0;P<v.length;P++)if(A=v[P],!!A.isActive){w=A.collision,E=w.bodyA,R=w.bodyB;var I=1;!R.isStatic&&!E.isStatic&&(I=.5),R.isStatic&&(I=0),_.moveTo(R.position.x,R.position.y),_.lineTo(R.position.x-w.penetration.x*I,R.position.y-w.penetration.y*I),I=1,!R.isStatic&&!E.isStatic&&(I=.5),E.isStatic&&(I=0),_.moveTo(E.position.x,E.position.y),_.lineTo(E.position.x+w.penetration.x*I,E.position.y+w.penetration.y*I)}S.wireframes?_.strokeStyle="rgba(255,165,0,0.5)":_.strokeStyle="orange",_.stroke()},n.inspector=function(p,v){var y=p.engine,_=p.selected,S=p.render,A=S.options,w;if(A.hasBounds){var T=S.bounds.max.x-S.bounds.min.x,E=S.bounds.max.y-S.bounds.min.y,R=T/S.options.width,P=E/S.options.height;v.scale(1/R,1/P),v.translate(-S.bounds.min.x,-S.bounds.min.y)}for(var L=0;L<_.length;L++){var I=_[L].data;switch(v.translate(.5,.5),v.lineWidth=1,v.strokeStyle="rgba(255,165,0,0.9)",v.setLineDash([1,2]),I.type){case"body":w=I.bounds,v.beginPath(),v.rect(Math.floor(w.min.x-3),Math.floor(w.min.y-3),Math.floor(w.max.x-w.min.x+6),Math.floor(w.max.y-w.min.y+6)),v.closePath(),v.stroke();break;case"constraint":var F=I.pointA;I.bodyA&&(F=I.pointB),v.beginPath(),v.arc(F.x,F.y,10,0,2*Math.PI),v.closePath(),v.stroke();break}v.setLineDash([]),v.translate(-.5,-.5)}p.selectStart!==null&&(v.translate(.5,.5),v.lineWidth=1,v.strokeStyle="rgba(255,165,0,0.6)",v.fillStyle="rgba(255,165,0,0.1)",w=p.selectBounds,v.beginPath(),v.rect(Math.floor(w.min.x),Math.floor(w.min.y),Math.floor(w.max.x-w.min.x),Math.floor(w.max.y-w.min.y)),v.closePath(),v.stroke(),v.fill(),v.translate(-.5,-.5)),A.hasBounds&&v.setTransform(1,0,0,1,0,0)};var d=function(p,v){var y=p.engine,_=p.timing,S=_.historySize,A=y.timing.timestamp;_.delta=v-_.lastTime||n._goodDelta,_.lastTime=v,_.timestampElapsed=A-_.lastTimestamp||0,_.lastTimestamp=A,_.deltaHistory.unshift(_.delta),_.deltaHistory.length=Math.min(_.deltaHistory.length,S),_.engineDeltaHistory.unshift(y.timing.lastDelta),_.engineDeltaHistory.length=Math.min(_.engineDeltaHistory.length,S),_.timestampElapsedHistory.unshift(_.timestampElapsed),_.timestampElapsedHistory.length=Math.min(_.timestampElapsedHistory.length,S),_.engineUpdatesHistory.unshift(y.timing.lastUpdatesPerFrame),_.engineUpdatesHistory.length=Math.min(_.engineUpdatesHistory.length,S),_.engineElapsedHistory.unshift(y.timing.lastElapsed),_.engineElapsedHistory.length=Math.min(_.engineElapsedHistory.length,S),_.elapsedHistory.unshift(_.lastElapsed),_.elapsedHistory.length=Math.min(_.elapsedHistory.length,S)},f=function(p){for(var v=0,y=0;y<p.length;y+=1)v+=p[y];return v/p.length||0},m=function(p,v){var y=document.createElement("canvas");return y.width=p,y.height=v,y.oncontextmenu=function(){return!1},y.onselectstart=function(){return!1},y},x=function(p){var v=p.getContext("2d"),y=window.devicePixelRatio||1,_=v.webkitBackingStorePixelRatio||v.mozBackingStorePixelRatio||v.msBackingStorePixelRatio||v.oBackingStorePixelRatio||v.backingStorePixelRatio||1;return y/_},M=function(p,v){var y=p.textures[v];return y||(y=p.textures[v]=new Image,y.src=v,y)},b=function(p,v){var y=v;/(jpg|gif|png)$/.test(v)&&(y="url("+v+")"),p.canvas.style.background=y,p.canvas.style.backgroundSize="contain",p.currentBackground=v}})()},function(g,t,e){var n={};g.exports=n;var i=e(5),s=e(17),o=e(0);(function(){n._maxFrameDelta=1e3/15,n._frameDeltaFallback=1e3/60,n._timeBufferMargin=1.5,n._elapsedNextEstimate=1,n._smoothingLowerBound=.1,n._smoothingUpperBound=.9,n.create=function(a){var u={delta:16.666666666666668,frameDelta:null,frameDeltaSmoothing:!0,frameDeltaSnapping:!0,frameDeltaHistory:[],frameDeltaHistorySize:100,frameRequestId:null,timeBuffer:0,timeLastTick:null,maxUpdates:null,maxFrameTime:33.333333333333336,lastUpdatesDeferred:0,enabled:!0},h=o.extend(u,a);return h.fps=0,h},n.run=function(a,u){return a.timeBuffer=n._frameDeltaFallback,function h(r){a.frameRequestId=n._onNextFrame(a,h),r&&a.enabled&&n.tick(a,u,r)}(),a},n.tick=function(a,u,h){var r=o.now(),c=a.delta,d=0,f=h-a.timeLastTick;if((!f||!a.timeLastTick||f>Math.max(n._maxFrameDelta,a.maxFrameTime))&&(f=a.frameDelta||n._frameDeltaFallback),a.frameDeltaSmoothing){a.frameDeltaHistory.push(f),a.frameDeltaHistory=a.frameDeltaHistory.slice(-a.frameDeltaHistorySize);var m=a.frameDeltaHistory.slice(0).sort(),x=a.frameDeltaHistory.slice(m.length*n._smoothingLowerBound,m.length*n._smoothingUpperBound),M=l(x);f=M||f}a.frameDeltaSnapping&&(f=1e3/Math.round(1e3/f)),a.frameDelta=f,a.timeLastTick=h,a.timeBuffer+=a.frameDelta,a.timeBuffer=o.clamp(a.timeBuffer,0,a.frameDelta+c*n._timeBufferMargin),a.lastUpdatesDeferred=0;var b=a.maxUpdates||Math.ceil(a.maxFrameTime/c),p={timestamp:u.timing.timestamp};i.trigger(a,"beforeTick",p),i.trigger(a,"tick",p);for(var v=o.now();c>0&&a.timeBuffer>=c*n._timeBufferMargin;){i.trigger(a,"beforeUpdate",p),s.update(u,c),i.trigger(a,"afterUpdate",p),a.timeBuffer-=c,d+=1;var y=o.now()-r,_=o.now()-v,S=y+n._elapsedNextEstimate*_/d;if(d>=b||S>a.maxFrameTime){a.lastUpdatesDeferred=Math.round(Math.max(0,a.timeBuffer/c-n._timeBufferMargin));break}}u.timing.lastUpdatesPerFrame=d,i.trigger(a,"afterTick",p),a.frameDeltaHistory.length>=100&&(a.lastUpdatesDeferred&&Math.round(a.frameDelta/c)>b?o.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs."):a.lastUpdatesDeferred&&o.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs."),typeof a.isFixed<"u"&&o.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs."),(a.deltaMin||a.deltaMax)&&o.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs."),a.fps!==0&&o.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs."))},n.stop=function(a){n._cancelNextFrame(a)},n._onNextFrame=function(a,u){if(typeof window<"u"&&window.requestAnimationFrame)a.frameRequestId=window.requestAnimationFrame(u);else throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");return a.frameRequestId},n._cancelNextFrame=function(a){if(typeof window<"u"&&window.cancelAnimationFrame)window.cancelAnimationFrame(a.frameRequestId);else throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.")};var l=function(a){for(var u=0,h=a.length,r=0;r<h;r+=1)u+=a[r];return u/h||0}})()},function(g,t,e){var n={};g.exports=n;var i=e(8),s=e(0),o=s.deprecated;(function(){n.collides=function(l,a){return i.collides(l,a)},o(n,"collides","SAT.collides \u27A4 replaced by Collision.collides")})()},function(g,t,e){var n={};g.exports=n;var i=e(1),s=e(0);(function(){n.pathToVertices=function(o,l){typeof window<"u"&&!("SVGPathSeg"in window)&&s.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var a,u,h,r,c,d,f,m,x,M,b=[],p,v,y=0,_=0,S=0;l=l||15;var A=function(T,E,R){var P=R%2===1&&R>1;if(!x||T!=x.x||E!=x.y){x&&P?(p=x.x,v=x.y):(p=0,v=0);var L={x:p+T,y:v+E};(P||!x)&&(x=L),b.push(L),_=p+T,S=v+E}},w=function(T){var E=T.pathSegTypeAsLetter.toUpperCase();if(E!=="Z"){switch(E){case"M":case"L":case"T":case"C":case"S":case"Q":_=T.x,S=T.y;break;case"H":_=T.x;break;case"V":S=T.y;break}A(_,S,T.pathSegType)}};for(n._svgPathToAbsolute(o),h=o.getTotalLength(),d=[],a=0;a<o.pathSegList.numberOfItems;a+=1)d.push(o.pathSegList.getItem(a));for(f=d.concat();y<h;){if(M=o.getPathSegAtLength(y),c=d[M],c!=m){for(;f.length&&f[0]!=c;)w(f.shift());m=c}switch(c.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":r=o.getPointAtLength(y),A(r.x,r.y,0);break}y+=l}for(a=0,u=f.length;a<u;++a)w(f[a]);return b},n._svgPathToAbsolute=function(o){for(var l,a,u,h,r,c,d=o.pathSegList,f=0,m=0,x=d.numberOfItems,M=0;M<x;++M){var b=d.getItem(M),p=b.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(p))"x"in b&&(f=b.x),"y"in b&&(m=b.y);else switch("x1"in b&&(u=f+b.x1),"x2"in b&&(r=f+b.x2),"y1"in b&&(h=m+b.y1),"y2"in b&&(c=m+b.y2),"x"in b&&(f+=b.x),"y"in b&&(m+=b.y),p){case"m":d.replaceItem(o.createSVGPathSegMovetoAbs(f,m),M);break;case"l":d.replaceItem(o.createSVGPathSegLinetoAbs(f,m),M);break;case"h":d.replaceItem(o.createSVGPathSegLinetoHorizontalAbs(f),M);break;case"v":d.replaceItem(o.createSVGPathSegLinetoVerticalAbs(m),M);break;case"c":d.replaceItem(o.createSVGPathSegCurvetoCubicAbs(f,m,u,h,r,c),M);break;case"s":d.replaceItem(o.createSVGPathSegCurvetoCubicSmoothAbs(f,m,r,c),M);break;case"q":d.replaceItem(o.createSVGPathSegCurvetoQuadraticAbs(f,m,u,h),M);break;case"t":d.replaceItem(o.createSVGPathSegCurvetoQuadraticSmoothAbs(f,m),M);break;case"a":d.replaceItem(o.createSVGPathSegArcAbs(f,m,b.r1,b.r2,b.angle,b.largeArcFlag,b.sweepFlag),M);break;case"z":case"Z":f=l,m=a;break}(p=="M"||p=="m")&&(l=f,a=m)}}})()},function(g,t,e){var n={};g.exports=n;var i=e(6),s=e(0);(function(){n.create=i.create,n.add=i.add,n.remove=i.remove,n.clear=i.clear,n.addComposite=i.addComposite,n.addBody=i.addBody,n.addConstraint=i.addConstraint})()}])})});var Be="175";var bn=0,Us=1;var Ai=1;var Ei=100;var Ti=204,Ci=205;var Hi=0,Gi=1,Wi=2,Pe=3,Xi=4,qi=5,Yi=6,Zi=7,Ns=0;var $i=300;var Ri=1e3,Ce=1001,Pi=1002;var Ji=1006;var Bs=1008;var Os=1009;var zs=1015;var Vs=1023;var Ie=2300,wn=2301,Mn=2302,Ii=2400,Li=2401,Di=2402;var Ki="",mt="srgb",Fi="srgb-linear",Ui="linear",Sn="srgb";var $t=7680;var Ni=519;var Bi=35044;var Re=2e3,Oi=2001;var Jt=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}},nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var _c=Math.PI/180,vr=180/Math.PI;function Oe(){let g=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nt[g&255]+nt[g>>8&255]+nt[g>>16&255]+nt[g>>24&255]+"-"+nt[t&255]+nt[t>>8&255]+"-"+nt[t>>16&15|64]+nt[t>>24&255]+"-"+nt[e&63|128]+nt[e>>8&255]+"-"+nt[e>>16&255]+nt[e>>24&255]+nt[n&255]+nt[n>>8&255]+nt[n>>16&255]+nt[n>>24&255]).toLowerCase()}function O(g,t,e){return Math.max(t,Math.min(e,g))}function yr(g,t){return(g%t+t)%t}function si(g,t,e){return(1-e)*g+e*t}function be(g,t){switch(t.constructor){case Float32Array:return g;case Uint32Array:return g/4294967295;case Uint16Array:return g/65535;case Uint8Array:return g/255;case Int32Array:return Math.max(g/2147483647,-1);case Int16Array:return Math.max(g/32767,-1);case Int8Array:return Math.max(g/127,-1);default:throw new Error("Invalid component type.")}}function lt(g,t){switch(t.constructor){case Float32Array:return g;case Uint32Array:return Math.round(g*4294967295);case Uint16Array:return Math.round(g*65535);case Uint8Array:return Math.round(g*255);case Int32Array:return Math.round(g*2147483647);case Int16Array:return Math.round(g*32767);case Int8Array:return Math.round(g*127);default:throw new Error("Invalid component type.")}}var Y=class g{constructor(t=0,e=0){g.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=O(this.x,t.x,e.x),this.y=O(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=O(this.x,t,e),this.y=O(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(O(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(O(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},N=class g{constructor(t,e,n,i,s,o,l,a,u){g.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,l,a,u)}set(t,e,n,i,s,o,l,a,u){let h=this.elements;return h[0]=t,h[1]=i,h[2]=l,h[3]=e,h[4]=s,h[5]=a,h[6]=n,h[7]=o,h[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],l=n[3],a=n[6],u=n[1],h=n[4],r=n[7],c=n[2],d=n[5],f=n[8],m=i[0],x=i[3],M=i[6],b=i[1],p=i[4],v=i[7],y=i[2],_=i[5],S=i[8];return s[0]=o*m+l*b+a*y,s[3]=o*x+l*p+a*_,s[6]=o*M+l*v+a*S,s[1]=u*m+h*b+r*y,s[4]=u*x+h*p+r*_,s[7]=u*M+h*v+r*S,s[2]=c*m+d*b+f*y,s[5]=c*x+d*p+f*_,s[8]=c*M+d*v+f*S,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],l=t[5],a=t[6],u=t[7],h=t[8];return e*o*h-e*l*u-n*s*h+n*l*a+i*s*u-i*o*a}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],l=t[5],a=t[6],u=t[7],h=t[8],r=h*o-l*u,c=l*a-h*s,d=u*s-o*a,f=e*r+n*c+i*d;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/f;return t[0]=r*m,t[1]=(i*u-h*n)*m,t[2]=(l*n-i*o)*m,t[3]=c*m,t[4]=(h*e-i*a)*m,t[5]=(i*s-l*e)*m,t[6]=d*m,t[7]=(n*a-u*e)*m,t[8]=(o*e-n*s)*m,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,l){let a=Math.cos(s),u=Math.sin(s);return this.set(n*a,n*u,-n*(a*o+u*l)+o+t,-i*u,i*a,-i*(-u*o+a*l)+l+e,0,0,1),this}scale(t,e){return this.premultiply(ri.makeScale(t,e)),this}rotate(t){return this.premultiply(ri.makeRotation(-t)),this}translate(t,e){return this.premultiply(ri.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ri=new N;function ks(g){for(let t=g.length-1;t>=0;--t)if(g[t]>=65535)return!0;return!1}function zi(g){return document.createElementNS("http://www.w3.org/1999/xhtml",g)}var vs=new N().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ys=new N().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _r(){let g={enabled:!0,workingColorSpace:Fi,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Sn&&(i.r=Pt(i.r),i.g=Pt(i.g),i.b=Pt(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Sn&&(i.r=de(i.r),i.g=de(i.g),i.b=de(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ki?Ui:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return g.define({[Fi]:{primaries:t,whitePoint:n,transfer:Ui,toXYZ:vs,fromXYZ:ys,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:mt},outputColorSpaceConfig:{drawingBufferColorSpace:mt}},[mt]:{primaries:t,whitePoint:n,transfer:Sn,toXYZ:vs,fromXYZ:ys,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:mt}}}),g}var pt=_r();function Pt(g){return g<.04045?g*.0773993808:Math.pow(g*.9478672986+.0521327014,2.4)}function de(g){return g<.0031308?g*12.92:1.055*Math.pow(g,.41666)-.055}var ne,An=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ne===void 0&&(ne=zi("canvas")),ne.width=t.width,ne.height=t.height;let i=ne.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ne}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=zi("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Pt(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pt(e[n]/255)*255):e[n]=Pt(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Mr=0,En=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mr++}),this.uuid=Oe(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,l=i.length;o<l;o++)i[o].isDataTexture?s.push(oi(i[o].image)):s.push(oi(i[o]))}else s=oi(i);n.url=s}return e||(t.images[this.uuid]=n),n}};function oi(g){return typeof HTMLImageElement<"u"&&g instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&g instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&g instanceof ImageBitmap?An.getDataURL(g):g.data?{data:Array.from(g.data),width:g.width,height:g.height,type:g.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Sr=0,Kt=class g extends Jt{constructor(t=g.DEFAULT_IMAGE,e=g.DEFAULT_MAPPING,n=Ce,i=Ce,s=Ji,o=Bs,l=Vs,a=Os,u=g.DEFAULT_ANISOTROPY,h=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sr++}),this.uuid=Oe(),this.name="",this.source=new En(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=l,this.internalFormat=null,this.type=a,this.offset=new Y(0,0),this.repeat=new Y(1,1),this.center=new Y(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new N,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$i)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ri:t.x=t.x-Math.floor(t.x);break;case Ce:t.x=t.x<0?0:1;break;case Pi:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ri:t.y=t.y-Math.floor(t.y);break;case Ce:t.y=t.y<0?0:1;break;case Pi:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=$i;Kt.DEFAULT_ANISOTROPY=1;var fe=class g{constructor(t=0,e=0,n=0,i=1){g.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s,a=t.elements,u=a[0],h=a[4],r=a[8],c=a[1],d=a[5],f=a[9],m=a[2],x=a[6],M=a[10];if(Math.abs(h-c)<.01&&Math.abs(r-m)<.01&&Math.abs(f-x)<.01){if(Math.abs(h+c)<.1&&Math.abs(r+m)<.1&&Math.abs(f+x)<.1&&Math.abs(u+d+M-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let p=(u+1)/2,v=(d+1)/2,y=(M+1)/2,_=(h+c)/4,S=(r+m)/4,A=(f+x)/4;return p>v&&p>y?p<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(p),i=_/n,s=S/n):v>y?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=_/i,s=A/i):y<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(y),n=S/s,i=A/s),this.set(n,i,s,e),this}let b=Math.sqrt((x-f)*(x-f)+(r-m)*(r-m)+(c-h)*(c-h));return Math.abs(b)<.001&&(b=1),this.x=(x-f)/b,this.y=(r-m)/b,this.z=(c-h)/b,this.w=Math.acos((u+d+M-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=O(this.x,t.x,e.x),this.y=O(this.y,t.y,e.y),this.z=O(this.z,t.z,e.z),this.w=O(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=O(this.x,t,e),this.y=O(this.y,t,e),this.z=O(this.z,t,e),this.w=O(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(O(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var Lt=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,l){let a=n[i+0],u=n[i+1],h=n[i+2],r=n[i+3],c=s[o+0],d=s[o+1],f=s[o+2],m=s[o+3];if(l===0){t[e+0]=a,t[e+1]=u,t[e+2]=h,t[e+3]=r;return}if(l===1){t[e+0]=c,t[e+1]=d,t[e+2]=f,t[e+3]=m;return}if(r!==m||a!==c||u!==d||h!==f){let x=1-l,M=a*c+u*d+h*f+r*m,b=M>=0?1:-1,p=1-M*M;if(p>Number.EPSILON){let y=Math.sqrt(p),_=Math.atan2(y,M*b);x=Math.sin(x*_)/y,l=Math.sin(l*_)/y}let v=l*b;if(a=a*x+c*v,u=u*x+d*v,h=h*x+f*v,r=r*x+m*v,x===1-l){let y=1/Math.sqrt(a*a+u*u+h*h+r*r);a*=y,u*=y,h*=y,r*=y}}t[e]=a,t[e+1]=u,t[e+2]=h,t[e+3]=r}static multiplyQuaternionsFlat(t,e,n,i,s,o){let l=n[i],a=n[i+1],u=n[i+2],h=n[i+3],r=s[o],c=s[o+1],d=s[o+2],f=s[o+3];return t[e]=l*f+h*r+a*d-u*c,t[e+1]=a*f+h*c+u*r-l*d,t[e+2]=u*f+h*d+l*c-a*r,t[e+3]=h*f-l*r-a*c-u*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,s=t._z,o=t._order,l=Math.cos,a=Math.sin,u=l(n/2),h=l(i/2),r=l(s/2),c=a(n/2),d=a(i/2),f=a(s/2);switch(o){case"XYZ":this._x=c*h*r+u*d*f,this._y=u*d*r-c*h*f,this._z=u*h*f+c*d*r,this._w=u*h*r-c*d*f;break;case"YXZ":this._x=c*h*r+u*d*f,this._y=u*d*r-c*h*f,this._z=u*h*f-c*d*r,this._w=u*h*r+c*d*f;break;case"ZXY":this._x=c*h*r-u*d*f,this._y=u*d*r+c*h*f,this._z=u*h*f+c*d*r,this._w=u*h*r-c*d*f;break;case"ZYX":this._x=c*h*r-u*d*f,this._y=u*d*r+c*h*f,this._z=u*h*f-c*d*r,this._w=u*h*r+c*d*f;break;case"YZX":this._x=c*h*r+u*d*f,this._y=u*d*r+c*h*f,this._z=u*h*f-c*d*r,this._w=u*h*r-c*d*f;break;case"XZY":this._x=c*h*r-u*d*f,this._y=u*d*r-c*h*f,this._z=u*h*f+c*d*r,this._w=u*h*r+c*d*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],l=e[5],a=e[9],u=e[2],h=e[6],r=e[10],c=n+l+r;if(c>0){let d=.5/Math.sqrt(c+1);this._w=.25/d,this._x=(h-a)*d,this._y=(s-u)*d,this._z=(o-i)*d}else if(n>l&&n>r){let d=2*Math.sqrt(1+n-l-r);this._w=(h-a)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+u)/d}else if(l>r){let d=2*Math.sqrt(1+l-n-r);this._w=(s-u)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(a+h)/d}else{let d=2*Math.sqrt(1+r-n-l);this._w=(o-i)/d,this._x=(s+u)/d,this._y=(a+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(O(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,s=t._z,o=t._w,l=e._x,a=e._y,u=e._z,h=e._w;return this._x=n*h+o*l+i*u-s*a,this._y=i*h+o*a+s*l-n*u,this._z=s*h+o*u+n*a-i*l,this._w=o*h-n*l-i*a-s*u,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,i=this._y,s=this._z,o=this._w,l=o*t._w+n*t._x+i*t._y+s*t._z;if(l<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,l=-l):this.copy(t),l>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;let a=1-l*l;if(a<=Number.EPSILON){let d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}let u=Math.sqrt(a),h=Math.atan2(u,l),r=Math.sin((1-e)*h)/u,c=Math.sin(e*h)/u;return this._w=o*r+this._w*c,this._x=n*r+this._x*c,this._y=i*r+this._y*c,this._z=s*r+this._z*c,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},C=class g{constructor(t=0,e=0,n=0){g.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_s.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_s.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,l=t.z,a=t.w,u=2*(o*i-l*n),h=2*(l*e-s*i),r=2*(s*n-o*e);return this.x=e+a*u+o*r-l*h,this.y=n+a*h+l*u-s*r,this.z=i+a*r+s*h-o*u,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=O(this.x,t.x,e.x),this.y=O(this.y,t.y,e.y),this.z=O(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=O(this.x,t,e),this.y=O(this.y,t,e),this.z=O(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(O(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,s=t.z,o=e.x,l=e.y,a=e.z;return this.x=i*a-s*l,this.y=s*o-n*a,this.z=n*l-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return ai.copy(this).projectOnVector(t),this.sub(ai)}reflect(t){return this.sub(ai.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(O(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ai=new C,_s=new Lt,Mt=class{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gt.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gt.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=gt.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,l=s.count;o<l;o++)t.isMesh===!0?t.getVertexPosition(o,gt):gt.fromBufferAttribute(s,o),gt.applyMatrix4(t.matrixWorld),this.expandByPoint(gt);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),nn.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),nn.copy(n.boundingBox)),nn.applyMatrix4(t.matrixWorld),this.union(nn)}let i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gt),gt.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(we),sn.subVectors(this.max,we),ie.subVectors(t.a,we),se.subVectors(t.b,we),re.subVectors(t.c,we),Nt.subVectors(se,ie),Bt.subVectors(re,se),qt.subVectors(ie,re);let e=[0,-Nt.z,Nt.y,0,-Bt.z,Bt.y,0,-qt.z,qt.y,Nt.z,0,-Nt.x,Bt.z,0,-Bt.x,qt.z,0,-qt.x,-Nt.y,Nt.x,0,-Bt.y,Bt.x,0,-qt.y,qt.x,0];return!li(e,ie,se,re,sn)||(e=[1,0,0,0,1,0,0,0,1],!li(e,ie,se,re,sn))?!1:(rn.crossVectors(Nt,Bt),e=[rn.x,rn.y,rn.z],li(e,ie,se,re,sn))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gt).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gt).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(At[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),At[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),At[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),At[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),At[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),At[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),At[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),At[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(At),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},At=[new C,new C,new C,new C,new C,new C,new C,new C],gt=new C,nn=new Mt,ie=new C,se=new C,re=new C,Nt=new C,Bt=new C,qt=new C,we=new C,sn=new C,rn=new C,Yt=new C;function li(g,t,e,n,i){for(let s=0,o=g.length-3;s<=o;s+=3){Yt.fromArray(g,s);let l=i.x*Math.abs(Yt.x)+i.y*Math.abs(Yt.y)+i.z*Math.abs(Yt.z),a=t.dot(Yt),u=e.dot(Yt),h=n.dot(Yt);if(Math.max(-Math.max(a,u,h),Math.min(a,u,h))>l)return!1}return!0}var br=new Mt,Ae=new C,ci=new C,Le=class{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):br.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ae.subVectors(t,this.center);let e=Ae.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ae,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ci.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ae.copy(t.center).add(ci)),this.expandByPoint(Ae.copy(t.center).sub(ci))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Et=new C,hi=new C,on=new C,Ot=new C,ui=new C,an=new C,di=new C,De=class{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Et)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Et.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Et.copy(this.origin).addScaledVector(this.direction,e),Et.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){hi.copy(t).add(e).multiplyScalar(.5),on.copy(e).sub(t).normalize(),Ot.copy(this.origin).sub(hi);let s=t.distanceTo(e)*.5,o=-this.direction.dot(on),l=Ot.dot(this.direction),a=-Ot.dot(on),u=Ot.lengthSq(),h=Math.abs(1-o*o),r,c,d,f;if(h>0)if(r=o*a-l,c=o*l-a,f=s*h,r>=0)if(c>=-f)if(c<=f){let m=1/h;r*=m,c*=m,d=r*(r+o*c+2*l)+c*(o*r+c+2*a)+u}else c=s,r=Math.max(0,-(o*c+l)),d=-r*r+c*(c+2*a)+u;else c=-s,r=Math.max(0,-(o*c+l)),d=-r*r+c*(c+2*a)+u;else c<=-f?(r=Math.max(0,-(-o*s+l)),c=r>0?-s:Math.min(Math.max(-s,-a),s),d=-r*r+c*(c+2*a)+u):c<=f?(r=0,c=Math.min(Math.max(-s,-a),s),d=c*(c+2*a)+u):(r=Math.max(0,-(o*s+l)),c=r>0?s:Math.min(Math.max(-s,-a),s),d=-r*r+c*(c+2*a)+u);else c=o>0?-s:s,r=Math.max(0,-(o*c+l)),d=-r*r+c*(c+2*a)+u;return n&&n.copy(this.origin).addScaledVector(this.direction,r),i&&i.copy(hi).addScaledVector(on,c),d}intersectSphere(t,e){Et.subVectors(t.center,this.origin);let n=Et.dot(this.direction),i=Et.dot(Et)-n*n,s=t.radius*t.radius;if(i>s)return null;let o=Math.sqrt(s-i),l=n-o,a=n+o;return a<0?null:l<0?this.at(a,e):this.at(l,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,l,a,u=1/this.direction.x,h=1/this.direction.y,r=1/this.direction.z,c=this.origin;return u>=0?(n=(t.min.x-c.x)*u,i=(t.max.x-c.x)*u):(n=(t.max.x-c.x)*u,i=(t.min.x-c.x)*u),h>=0?(s=(t.min.y-c.y)*h,o=(t.max.y-c.y)*h):(s=(t.max.y-c.y)*h,o=(t.min.y-c.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),r>=0?(l=(t.min.z-c.z)*r,a=(t.max.z-c.z)*r):(l=(t.max.z-c.z)*r,a=(t.min.z-c.z)*r),n>a||l>i)||((l>n||n!==n)&&(n=l),(a<i||i!==i)&&(i=a),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Et)!==null}intersectTriangle(t,e,n,i,s){ui.subVectors(e,t),an.subVectors(n,t),di.crossVectors(ui,an);let o=this.direction.dot(di),l;if(o>0){if(i)return null;l=1}else if(o<0)l=-1,o=-o;else return null;Ot.subVectors(this.origin,t);let a=l*this.direction.dot(an.crossVectors(Ot,an));if(a<0)return null;let u=l*this.direction.dot(ui.cross(Ot));if(u<0||a+u>o)return null;let h=-l*Ot.dot(di);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Z=class g{constructor(t,e,n,i,s,o,l,a,u,h,r,c,d,f,m,x){g.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,l,a,u,h,r,c,d,f,m,x)}set(t,e,n,i,s,o,l,a,u,h,r,c,d,f,m,x){let M=this.elements;return M[0]=t,M[4]=e,M[8]=n,M[12]=i,M[1]=s,M[5]=o,M[9]=l,M[13]=a,M[2]=u,M[6]=h,M[10]=r,M[14]=c,M[3]=d,M[7]=f,M[11]=m,M[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new g().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,i=1/oe.setFromMatrixColumn(t,0).length(),s=1/oe.setFromMatrixColumn(t,1).length(),o=1/oe.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),l=Math.sin(n),a=Math.cos(i),u=Math.sin(i),h=Math.cos(s),r=Math.sin(s);if(t.order==="XYZ"){let c=o*h,d=o*r,f=l*h,m=l*r;e[0]=a*h,e[4]=-a*r,e[8]=u,e[1]=d+f*u,e[5]=c-m*u,e[9]=-l*a,e[2]=m-c*u,e[6]=f+d*u,e[10]=o*a}else if(t.order==="YXZ"){let c=a*h,d=a*r,f=u*h,m=u*r;e[0]=c+m*l,e[4]=f*l-d,e[8]=o*u,e[1]=o*r,e[5]=o*h,e[9]=-l,e[2]=d*l-f,e[6]=m+c*l,e[10]=o*a}else if(t.order==="ZXY"){let c=a*h,d=a*r,f=u*h,m=u*r;e[0]=c-m*l,e[4]=-o*r,e[8]=f+d*l,e[1]=d+f*l,e[5]=o*h,e[9]=m-c*l,e[2]=-o*u,e[6]=l,e[10]=o*a}else if(t.order==="ZYX"){let c=o*h,d=o*r,f=l*h,m=l*r;e[0]=a*h,e[4]=f*u-d,e[8]=c*u+m,e[1]=a*r,e[5]=m*u+c,e[9]=d*u-f,e[2]=-u,e[6]=l*a,e[10]=o*a}else if(t.order==="YZX"){let c=o*a,d=o*u,f=l*a,m=l*u;e[0]=a*h,e[4]=m-c*r,e[8]=f*r+d,e[1]=r,e[5]=o*h,e[9]=-l*h,e[2]=-u*h,e[6]=d*r+f,e[10]=c-m*r}else if(t.order==="XZY"){let c=o*a,d=o*u,f=l*a,m=l*u;e[0]=a*h,e[4]=-r,e[8]=u*h,e[1]=c*r+m,e[5]=o*h,e[9]=d*r-f,e[2]=f*r-d,e[6]=l*h,e[10]=m*r+c}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(wr,t,Ar)}lookAt(t,e,n){let i=this.elements;return ht.subVectors(t,e),ht.lengthSq()===0&&(ht.z=1),ht.normalize(),zt.crossVectors(n,ht),zt.lengthSq()===0&&(Math.abs(n.z)===1?ht.x+=1e-4:ht.z+=1e-4,ht.normalize(),zt.crossVectors(n,ht)),zt.normalize(),ln.crossVectors(ht,zt),i[0]=zt.x,i[4]=ln.x,i[8]=ht.x,i[1]=zt.y,i[5]=ln.y,i[9]=ht.y,i[2]=zt.z,i[6]=ln.z,i[10]=ht.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,s=this.elements,o=n[0],l=n[4],a=n[8],u=n[12],h=n[1],r=n[5],c=n[9],d=n[13],f=n[2],m=n[6],x=n[10],M=n[14],b=n[3],p=n[7],v=n[11],y=n[15],_=i[0],S=i[4],A=i[8],w=i[12],T=i[1],E=i[5],R=i[9],P=i[13],L=i[2],I=i[6],F=i[10],U=i[14],V=i[3],k=i[7],H=i[11],G=i[15];return s[0]=o*_+l*T+a*L+u*V,s[4]=o*S+l*E+a*I+u*k,s[8]=o*A+l*R+a*F+u*H,s[12]=o*w+l*P+a*U+u*G,s[1]=h*_+r*T+c*L+d*V,s[5]=h*S+r*E+c*I+d*k,s[9]=h*A+r*R+c*F+d*H,s[13]=h*w+r*P+c*U+d*G,s[2]=f*_+m*T+x*L+M*V,s[6]=f*S+m*E+x*I+M*k,s[10]=f*A+m*R+x*F+M*H,s[14]=f*w+m*P+x*U+M*G,s[3]=b*_+p*T+v*L+y*V,s[7]=b*S+p*E+v*I+y*k,s[11]=b*A+p*R+v*F+y*H,s[15]=b*w+p*P+v*U+y*G,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],l=t[5],a=t[9],u=t[13],h=t[2],r=t[6],c=t[10],d=t[14],f=t[3],m=t[7],x=t[11],M=t[15];return f*(+s*a*r-i*u*r-s*l*c+n*u*c+i*l*d-n*a*d)+m*(+e*a*d-e*u*c+s*o*c-i*o*d+i*u*h-s*a*h)+x*(+e*u*r-e*l*d-s*o*r+n*o*d+s*l*h-n*u*h)+M*(-i*l*h-e*a*r+e*l*c+i*o*r-n*o*c+n*a*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],l=t[5],a=t[6],u=t[7],h=t[8],r=t[9],c=t[10],d=t[11],f=t[12],m=t[13],x=t[14],M=t[15],b=r*x*u-m*c*u+m*a*d-l*x*d-r*a*M+l*c*M,p=f*c*u-h*x*u-f*a*d+o*x*d+h*a*M-o*c*M,v=h*m*u-f*r*u+f*l*d-o*m*d-h*l*M+o*r*M,y=f*r*a-h*m*a-f*l*c+o*m*c+h*l*x-o*r*x,_=e*b+n*p+i*v+s*y;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/_;return t[0]=b*S,t[1]=(m*c*s-r*x*s-m*i*d+n*x*d+r*i*M-n*c*M)*S,t[2]=(l*x*s-m*a*s+m*i*u-n*x*u-l*i*M+n*a*M)*S,t[3]=(r*a*s-l*c*s-r*i*u+n*c*u+l*i*d-n*a*d)*S,t[4]=p*S,t[5]=(h*x*s-f*c*s+f*i*d-e*x*d-h*i*M+e*c*M)*S,t[6]=(f*a*s-o*x*s-f*i*u+e*x*u+o*i*M-e*a*M)*S,t[7]=(o*c*s-h*a*s+h*i*u-e*c*u-o*i*d+e*a*d)*S,t[8]=v*S,t[9]=(f*r*s-h*m*s-f*n*d+e*m*d+h*n*M-e*r*M)*S,t[10]=(o*m*s-f*l*s+f*n*u-e*m*u-o*n*M+e*l*M)*S,t[11]=(h*l*s-o*r*s-h*n*u+e*r*u+o*n*d-e*l*d)*S,t[12]=y*S,t[13]=(h*m*i-f*r*i+f*n*c-e*m*c-h*n*x+e*r*x)*S,t[14]=(f*l*i-o*m*i-f*n*a+e*m*a+o*n*x-e*l*x)*S,t[15]=(o*r*i-h*l*i+h*n*a-e*r*a-o*n*c+e*l*c)*S,this}scale(t){let e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,l=t.y,a=t.z,u=s*o,h=s*l;return this.set(u*o+n,u*l-i*a,u*a+i*l,0,u*l+i*a,h*l+n,h*a-i*o,0,u*a-i*l,h*a+i*o,s*a*a+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,s=e._x,o=e._y,l=e._z,a=e._w,u=s+s,h=o+o,r=l+l,c=s*u,d=s*h,f=s*r,m=o*h,x=o*r,M=l*r,b=a*u,p=a*h,v=a*r,y=n.x,_=n.y,S=n.z;return i[0]=(1-(m+M))*y,i[1]=(d+v)*y,i[2]=(f-p)*y,i[3]=0,i[4]=(d-v)*_,i[5]=(1-(c+M))*_,i[6]=(x+b)*_,i[7]=0,i[8]=(f+p)*S,i[9]=(x-b)*S,i[10]=(1-(c+m))*S,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements,s=oe.set(i[0],i[1],i[2]).length(),o=oe.set(i[4],i[5],i[6]).length(),l=oe.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],xt.copy(this);let u=1/s,h=1/o,r=1/l;return xt.elements[0]*=u,xt.elements[1]*=u,xt.elements[2]*=u,xt.elements[4]*=h,xt.elements[5]*=h,xt.elements[6]*=h,xt.elements[8]*=r,xt.elements[9]*=r,xt.elements[10]*=r,e.setFromRotationMatrix(xt),n.x=s,n.y=o,n.z=l,this}makePerspective(t,e,n,i,s,o,l=Re){let a=this.elements,u=2*s/(e-t),h=2*s/(n-i),r=(e+t)/(e-t),c=(n+i)/(n-i),d,f;if(l===Re)d=-(o+s)/(o-s),f=-2*o*s/(o-s);else if(l===Oi)d=-o/(o-s),f=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return a[0]=u,a[4]=0,a[8]=r,a[12]=0,a[1]=0,a[5]=h,a[9]=c,a[13]=0,a[2]=0,a[6]=0,a[10]=d,a[14]=f,a[3]=0,a[7]=0,a[11]=-1,a[15]=0,this}makeOrthographic(t,e,n,i,s,o,l=Re){let a=this.elements,u=1/(e-t),h=1/(n-i),r=1/(o-s),c=(e+t)*u,d=(n+i)*h,f,m;if(l===Re)f=(o+s)*r,m=-2*r;else if(l===Oi)f=s*r,m=-1*r;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return a[0]=2*u,a[4]=0,a[8]=0,a[12]=-c,a[1]=0,a[5]=2*h,a[9]=0,a[13]=-d,a[2]=0,a[6]=0,a[10]=m,a[14]=-f,a[3]=0,a[7]=0,a[11]=0,a[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},oe=new C,xt=new Z,wr=new C(0,0,0),Ar=new C(1,1,1),zt=new C,ln=new C,ht=new C,Ms=new Z,Ss=new Lt,pe=class g{constructor(t=0,e=0,n=0,i=g.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,s=i[0],o=i[4],l=i[8],a=i[1],u=i[5],h=i[9],r=i[2],c=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(O(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(c,u),this._z=0);break;case"YXZ":this._x=Math.asin(-O(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(l,d),this._z=Math.atan2(a,u)):(this._y=Math.atan2(-r,s),this._z=0);break;case"ZXY":this._x=Math.asin(O(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-r,d),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(a,s));break;case"ZYX":this._y=Math.asin(-O(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(c,d),this._z=Math.atan2(a,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(O(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,u),this._y=Math.atan2(-r,s)):(this._x=0,this._y=Math.atan2(l,d));break;case"XZY":this._z=Math.asin(-O(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(c,u),this._y=Math.atan2(l,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ms.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ms,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ss.setFromEuler(this),this.setFromQuaternion(Ss,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pe.DEFAULT_ORDER="XYZ";var Fe=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Er=0,bs=new C,ae=new Lt,Tt=new Z,cn=new C,Ee=new C,Tr=new C,Cr=new Lt,ws=new C(1,0,0),As=new C(0,1,0),Es=new C(0,0,1),Ts={type:"added"},Rr={type:"removed"},le={type:"childadded",child:null},fi={type:"childremoved",child:null},kt=class g extends Jt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Er++}),this.uuid=Oe(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=g.DEFAULT_UP.clone();let t=new C,e=new pe,n=new Lt,i=new C(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Z},normalMatrix:{value:new N}}),this.matrix=new Z,this.matrixWorld=new Z,this.matrixAutoUpdate=g.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=g.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fe,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ae.setFromAxisAngle(t,e),this.quaternion.multiply(ae),this}rotateOnWorldAxis(t,e){return ae.setFromAxisAngle(t,e),this.quaternion.premultiply(ae),this}rotateX(t){return this.rotateOnAxis(ws,t)}rotateY(t){return this.rotateOnAxis(As,t)}rotateZ(t){return this.rotateOnAxis(Es,t)}translateOnAxis(t,e){return bs.copy(t).applyQuaternion(this.quaternion),this.position.add(bs.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ws,t)}translateY(t){return this.translateOnAxis(As,t)}translateZ(t){return this.translateOnAxis(Es,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Tt.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?cn.copy(t):cn.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ee.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Tt.lookAt(Ee,cn,this.up):Tt.lookAt(cn,Ee,this.up),this.quaternion.setFromRotationMatrix(Tt),i&&(Tt.extractRotation(i.matrixWorld),ae.setFromRotationMatrix(Tt),this.quaternion.premultiply(ae.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ts),le.child=t,this.dispatchEvent(le),le.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Rr),fi.child=t,this.dispatchEvent(fi),fi.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Tt.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Tt.multiply(t.parent.matrixWorld)),t.applyMatrix4(Tt),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ts),le.child=t,this.dispatchEvent(le),le.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ee,t,Tr),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ee,Cr,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(l,a){return l[a.uuid]===void 0&&(l[a.uuid]=a.toJSON(t)),a.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let a=l.shapes;if(Array.isArray(a))for(let u=0,h=a.length;u<h;u++){let r=a[u];s(t.shapes,r)}else s(t.shapes,a)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let a=0,u=this.material.length;a<u;a++)l.push(s(t.materials,this.material[a]));i.material=l}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let l=0;l<this.children.length;l++)i.children.push(this.children[l].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let l=0;l<this.animations.length;l++){let a=this.animations[l];i.animations.push(s(t.animations,a))}}if(e){let l=o(t.geometries),a=o(t.materials),u=o(t.textures),h=o(t.images),r=o(t.shapes),c=o(t.skeletons),d=o(t.animations),f=o(t.nodes);l.length>0&&(n.geometries=l),a.length>0&&(n.materials=a),u.length>0&&(n.textures=u),h.length>0&&(n.images=h),r.length>0&&(n.shapes=r),c.length>0&&(n.skeletons=c),d.length>0&&(n.animations=d),f.length>0&&(n.nodes=f)}return n.object=i,n;function o(l){let a=[];for(let u in l){let h=l[u];delete h.metadata,a.push(h)}return a}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}};kt.DEFAULT_UP=new C(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var vt=new C,Ct=new C,pi=new C,Rt=new C,ce=new C,he=new C,Cs=new C,mi=new C,gi=new C,xi=new C,vi=new fe,yi=new fe,_i=new fe,_t=class g{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),vt.subVectors(t,e),i.cross(vt);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){vt.subVectors(i,e),Ct.subVectors(n,e),pi.subVectors(t,e);let o=vt.dot(vt),l=vt.dot(Ct),a=vt.dot(pi),u=Ct.dot(Ct),h=Ct.dot(pi),r=o*u-l*l;if(r===0)return s.set(0,0,0),null;let c=1/r,d=(u*a-l*h)*c,f=(o*h-l*a)*c;return s.set(1-d-f,f,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Rt)===null?!1:Rt.x>=0&&Rt.y>=0&&Rt.x+Rt.y<=1}static getInterpolation(t,e,n,i,s,o,l,a){return this.getBarycoord(t,e,n,i,Rt)===null?(a.x=0,a.y=0,"z"in a&&(a.z=0),"w"in a&&(a.w=0),null):(a.setScalar(0),a.addScaledVector(s,Rt.x),a.addScaledVector(o,Rt.y),a.addScaledVector(l,Rt.z),a)}static getInterpolatedAttribute(t,e,n,i,s,o){return vi.setScalar(0),yi.setScalar(0),_i.setScalar(0),vi.fromBufferAttribute(t,e),yi.fromBufferAttribute(t,n),_i.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(vi,s.x),o.addScaledVector(yi,s.y),o.addScaledVector(_i,s.z),o}static isFrontFacing(t,e,n,i){return vt.subVectors(n,e),Ct.subVectors(t,e),vt.cross(Ct).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vt.subVectors(this.c,this.b),Ct.subVectors(this.a,this.b),vt.cross(Ct).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return g.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return g.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return g.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return g.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return g.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,s=this.c,o,l;ce.subVectors(i,n),he.subVectors(s,n),mi.subVectors(t,n);let a=ce.dot(mi),u=he.dot(mi);if(a<=0&&u<=0)return e.copy(n);gi.subVectors(t,i);let h=ce.dot(gi),r=he.dot(gi);if(h>=0&&r<=h)return e.copy(i);let c=a*r-h*u;if(c<=0&&a>=0&&h<=0)return o=a/(a-h),e.copy(n).addScaledVector(ce,o);xi.subVectors(t,s);let d=ce.dot(xi),f=he.dot(xi);if(f>=0&&d<=f)return e.copy(s);let m=d*u-a*f;if(m<=0&&u>=0&&f<=0)return l=u/(u-f),e.copy(n).addScaledVector(he,l);let x=h*f-d*r;if(x<=0&&r-h>=0&&d-f>=0)return Cs.subVectors(s,i),l=(r-h)/(r-h+(d-f)),e.copy(i).addScaledVector(Cs,l);let M=1/(x+m+c);return o=m*M,l=c*M,e.copy(n).addScaledVector(ce,o).addScaledVector(he,l)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Hs={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vt={h:0,s:0,l:0},hn={h:0,s:0,l:0};function Mi(g,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?g+(t-g)*6*e:e<1/2?t:e<2/3?g+(t-g)*6*(2/3-e):g}var J=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=mt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=pt.workingColorSpace){return this.r=t,this.g=e,this.b=n,pt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=pt.workingColorSpace){if(t=yr(t,1),e=O(e,0,1),n=O(n,0,1),e===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=Mi(o,s,t+1/3),this.g=Mi(o,s,t),this.b=Mi(o,s,t-1/3)}return pt.toWorkingColorSpace(this,i),this}setStyle(t,e=mt){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s,o=i[1],l=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=mt){let n=Hs[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pt(t.r),this.g=Pt(t.g),this.b=Pt(t.b),this}copyLinearToSRGB(t){return this.r=de(t.r),this.g=de(t.g),this.b=de(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=mt){return pt.fromWorkingColorSpace(it.copy(this),t),Math.round(O(it.r*255,0,255))*65536+Math.round(O(it.g*255,0,255))*256+Math.round(O(it.b*255,0,255))}getHexString(t=mt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pt.workingColorSpace){pt.fromWorkingColorSpace(it.copy(this),e);let n=it.r,i=it.g,s=it.b,o=Math.max(n,i,s),l=Math.min(n,i,s),a,u,h=(l+o)/2;if(l===o)a=0,u=0;else{let r=o-l;switch(u=h<=.5?r/(o+l):r/(2-o-l),o){case n:a=(i-s)/r+(i<s?6:0);break;case i:a=(s-n)/r+2;break;case s:a=(n-i)/r+4;break}a/=6}return t.h=a,t.s=u,t.l=h,t}getRGB(t,e=pt.workingColorSpace){return pt.fromWorkingColorSpace(it.copy(this),e),t.r=it.r,t.g=it.g,t.b=it.b,t}getStyle(t=mt){pt.fromWorkingColorSpace(it.copy(this),t);let e=it.r,n=it.g,i=it.b;return t!==mt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Vt),this.setHSL(Vt.h+t,Vt.s+e,Vt.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Vt),t.getHSL(hn);let n=si(Vt.h,hn.h,e),i=si(Vt.s,hn.s,e),s=si(Vt.l,hn.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},it=new J;J.NAMES=Hs;var Pr=0,Tn=class extends Jt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pr++}),this.uuid=Oe(),this.name="",this.type="Material",this.blending=Ai,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ti,this.blendDst=Ci,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=Pe,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ni,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$t,this.stencilZFail=$t,this.stencilZPass=$t,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ti&&(n.blendSrc=this.blendSrc),this.blendDst!==Ci&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pe&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ni&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$t&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$t&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$t&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){let o=[];for(let l in s){let a=s[l];delete a.metadata,o.push(a)}return o}if(e){let s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},Cn=class extends Tn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pe,this.combine=Ns,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var $=new C,un=new Y,Ir=0,It=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ir++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Bi,this.updateRanges=[],this.gpuType=zs,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)un.fromBufferAttribute(this,e),un.applyMatrix3(t),this.setXY(e,un.x,un.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)$.fromBufferAttribute(this,e),$.applyMatrix3(t),this.setXYZ(e,$.x,$.y,$.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)$.fromBufferAttribute(this,e),$.applyMatrix4(t),this.setXYZ(e,$.x,$.y,$.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$.fromBufferAttribute(this,e),$.applyNormalMatrix(t),this.setXYZ(e,$.x,$.y,$.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$.fromBufferAttribute(this,e),$.transformDirection(t),this.setXYZ(e,$.x,$.y,$.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=be(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=lt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=be(e,this.array)),e}setX(t,e){return this.normalized&&(e=lt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=be(e,this.array)),e}setY(t,e){return this.normalized&&(e=lt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=be(e,this.array)),e}setZ(t,e){return this.normalized&&(e=lt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=be(e,this.array)),e}setW(t,e){return this.normalized&&(e=lt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=lt(e,this.array),n=lt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=lt(e,this.array),n=lt(n,this.array),i=lt(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=lt(e,this.array),n=lt(n,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Bi&&(t.usage=this.usage),t}};var Rn=class extends It{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Pn=class extends It{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Qt=class extends It{constructor(t,e,n){super(new Float32Array(t),e,n)}},Lr=0,ft=new Z,Si=new kt,ue=new C,ut=new Mt,Te=new Mt,Q=new C,me=class g extends Jt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lr++}),this.uuid=Oe(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ks(t)?Pn:Rn)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new N().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ft.makeRotationFromQuaternion(t),this.applyMatrix4(ft),this}rotateX(t){return ft.makeRotationX(t),this.applyMatrix4(ft),this}rotateY(t){return ft.makeRotationY(t),this.applyMatrix4(ft),this}rotateZ(t){return ft.makeRotationZ(t),this.applyMatrix4(ft),this}translate(t,e,n){return ft.makeTranslation(t,e,n),this.applyMatrix4(ft),this}scale(t,e,n){return ft.makeScale(t,e,n),this.applyMatrix4(ft),this}lookAt(t){return Si.lookAt(t),Si.updateMatrix(),this.applyMatrix4(Si.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ue).negate(),this.translate(ue.x,ue.y,ue.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,s=t.length;i<s;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Qt(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let s=t[i];e.setXYZ(i,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mt);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let s=e[n];ut.setFromBufferAttribute(s),this.morphTargetsRelative?(Q.addVectors(this.boundingBox.min,ut.min),this.boundingBox.expandByPoint(Q),Q.addVectors(this.boundingBox.max,ut.max),this.boundingBox.expandByPoint(Q)):(this.boundingBox.expandByPoint(ut.min),this.boundingBox.expandByPoint(ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Le);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){let n=this.boundingSphere.center;if(ut.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){let l=e[s];Te.setFromBufferAttribute(l),this.morphTargetsRelative?(Q.addVectors(ut.min,Te.min),ut.expandByPoint(Q),Q.addVectors(ut.max,Te.max),ut.expandByPoint(Q)):(ut.expandByPoint(Te.min),ut.expandByPoint(Te.max))}ut.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Q.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Q));if(e)for(let s=0,o=e.length;s<o;s++){let l=e[s],a=this.morphTargetsRelative;for(let u=0,h=l.count;u<h;u++)Q.fromBufferAttribute(l,u),a&&(ue.fromBufferAttribute(t,u),Q.add(ue)),i=Math.max(i,n.distanceToSquared(Q))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),l=[],a=[];for(let A=0;A<n.count;A++)l[A]=new C,a[A]=new C;let u=new C,h=new C,r=new C,c=new Y,d=new Y,f=new Y,m=new C,x=new C;function M(A,w,T){u.fromBufferAttribute(n,A),h.fromBufferAttribute(n,w),r.fromBufferAttribute(n,T),c.fromBufferAttribute(s,A),d.fromBufferAttribute(s,w),f.fromBufferAttribute(s,T),h.sub(u),r.sub(u),d.sub(c),f.sub(c);let E=1/(d.x*f.y-f.x*d.y);isFinite(E)&&(m.copy(h).multiplyScalar(f.y).addScaledVector(r,-d.y).multiplyScalar(E),x.copy(r).multiplyScalar(d.x).addScaledVector(h,-f.x).multiplyScalar(E),l[A].add(m),l[w].add(m),l[T].add(m),a[A].add(x),a[w].add(x),a[T].add(x))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let A=0,w=b.length;A<w;++A){let T=b[A],E=T.start,R=T.count;for(let P=E,L=E+R;P<L;P+=3)M(t.getX(P+0),t.getX(P+1),t.getX(P+2))}let p=new C,v=new C,y=new C,_=new C;function S(A){y.fromBufferAttribute(i,A),_.copy(y);let w=l[A];p.copy(w),p.sub(y.multiplyScalar(y.dot(w))).normalize(),v.crossVectors(_,w);let E=v.dot(a[A])<0?-1:1;o.setXYZW(A,p.x,p.y,p.z,E)}for(let A=0,w=b.length;A<w;++A){let T=b[A],E=T.start,R=T.count;for(let P=E,L=E+R;P<L;P+=3)S(t.getX(P+0)),S(t.getX(P+1)),S(t.getX(P+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let c=0,d=n.count;c<d;c++)n.setXYZ(c,0,0,0);let i=new C,s=new C,o=new C,l=new C,a=new C,u=new C,h=new C,r=new C;if(t)for(let c=0,d=t.count;c<d;c+=3){let f=t.getX(c+0),m=t.getX(c+1),x=t.getX(c+2);i.fromBufferAttribute(e,f),s.fromBufferAttribute(e,m),o.fromBufferAttribute(e,x),h.subVectors(o,s),r.subVectors(i,s),h.cross(r),l.fromBufferAttribute(n,f),a.fromBufferAttribute(n,m),u.fromBufferAttribute(n,x),l.add(h),a.add(h),u.add(h),n.setXYZ(f,l.x,l.y,l.z),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,u.x,u.y,u.z)}else for(let c=0,d=e.count;c<d;c+=3)i.fromBufferAttribute(e,c+0),s.fromBufferAttribute(e,c+1),o.fromBufferAttribute(e,c+2),h.subVectors(o,s),r.subVectors(i,s),h.cross(r),n.setXYZ(c+0,h.x,h.y,h.z),n.setXYZ(c+1,h.x,h.y,h.z),n.setXYZ(c+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Q.fromBufferAttribute(t,e),Q.normalize(),t.setXYZ(e,Q.x,Q.y,Q.z)}toNonIndexed(){function t(l,a){let u=l.array,h=l.itemSize,r=l.normalized,c=new u.constructor(a.length*h),d=0,f=0;for(let m=0,x=a.length;m<x;m++){l.isInterleavedBufferAttribute?d=a[m]*l.data.stride+l.offset:d=a[m]*h;for(let M=0;M<h;M++)c[f++]=u[d++]}return new It(c,h,r)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new g,n=this.index.array,i=this.attributes;for(let l in i){let a=i[l],u=t(a,n);e.setAttribute(l,u)}let s=this.morphAttributes;for(let l in s){let a=[],u=s[l];for(let h=0,r=u.length;h<r;h++){let c=u[h],d=t(c,n);a.push(d)}e.morphAttributes[l]=a}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let l=0,a=o.length;l<a;l++){let u=o[l];e.addGroup(u.start,u.count,u.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let a=this.parameters;for(let u in a)a[u]!==void 0&&(t[u]=a[u]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let a in n){let u=n[a];t.data.attributes[a]=u.toJSON(t.data)}let i={},s=!1;for(let a in this.morphAttributes){let u=this.morphAttributes[a],h=[];for(let r=0,c=u.length;r<c;r++){let d=u[r];h.push(d.toJSON(t.data))}h.length>0&&(i[a]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let l=this.boundingSphere;return l!==null&&(t.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let u in i){let h=i[u];this.setAttribute(u,h.clone(e))}let s=t.morphAttributes;for(let u in s){let h=[],r=s[u];for(let c=0,d=r.length;c<d;c++)h.push(r[c].clone(e));this.morphAttributes[u]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let u=0,h=o.length;u<h;u++){let r=o[u];this.addGroup(r.start,r.count,r.materialIndex)}let l=t.boundingBox;l!==null&&(this.boundingBox=l.clone());let a=t.boundingSphere;return a!==null&&(this.boundingSphere=a.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Rs=new Z,Zt=new De,dn=new Le,Ps=new C,fn=new C,pn=new C,mn=new C,bi=new C,gn=new C,Is=new C,xn=new C,ge=class extends kt{constructor(t=new me,e=new Cn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){let l=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=s}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let l=this.morphTargetInfluences;if(s&&l){gn.set(0,0,0);for(let a=0,u=s.length;a<u;a++){let h=l[a],r=s[a];h!==0&&(bi.fromBufferAttribute(r,t),o?gn.addScaledVector(bi,h):gn.addScaledVector(bi.sub(e),h))}e.add(gn)}return e}raycast(t,e){let n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dn.copy(n.boundingSphere),dn.applyMatrix4(s),Zt.copy(t.ray).recast(t.near),!(dn.containsPoint(Zt.origin)===!1&&(Zt.intersectSphere(dn,Ps)===null||Zt.origin.distanceToSquared(Ps)>(t.far-t.near)**2))&&(Rs.copy(s).invert(),Zt.copy(t.ray).applyMatrix4(Rs),!(n.boundingBox!==null&&Zt.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zt)))}_computeIntersections(t,e,n){let i,s=this.geometry,o=this.material,l=s.index,a=s.attributes.position,u=s.attributes.uv,h=s.attributes.uv1,r=s.attributes.normal,c=s.groups,d=s.drawRange;if(l!==null)if(Array.isArray(o))for(let f=0,m=c.length;f<m;f++){let x=c[f],M=o[x.materialIndex],b=Math.max(x.start,d.start),p=Math.min(l.count,Math.min(x.start+x.count,d.start+d.count));for(let v=b,y=p;v<y;v+=3){let _=l.getX(v),S=l.getX(v+1),A=l.getX(v+2);i=vn(this,M,t,n,u,h,r,_,S,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=x.materialIndex,e.push(i))}}else{let f=Math.max(0,d.start),m=Math.min(l.count,d.start+d.count);for(let x=f,M=m;x<M;x+=3){let b=l.getX(x),p=l.getX(x+1),v=l.getX(x+2);i=vn(this,o,t,n,u,h,r,b,p,v),i&&(i.faceIndex=Math.floor(x/3),e.push(i))}}else if(a!==void 0)if(Array.isArray(o))for(let f=0,m=c.length;f<m;f++){let x=c[f],M=o[x.materialIndex],b=Math.max(x.start,d.start),p=Math.min(a.count,Math.min(x.start+x.count,d.start+d.count));for(let v=b,y=p;v<y;v+=3){let _=v,S=v+1,A=v+2;i=vn(this,M,t,n,u,h,r,_,S,A),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=x.materialIndex,e.push(i))}}else{let f=Math.max(0,d.start),m=Math.min(a.count,d.start+d.count);for(let x=f,M=m;x<M;x+=3){let b=x,p=x+1,v=x+2;i=vn(this,o,t,n,u,h,r,b,p,v),i&&(i.faceIndex=Math.floor(x/3),e.push(i))}}}};function Dr(g,t,e,n,i,s,o,l){let a;if(t.side===Us?a=n.intersectTriangle(o,s,i,!0,l):a=n.intersectTriangle(i,s,o,t.side===bn,l),a===null)return null;xn.copy(l),xn.applyMatrix4(g.matrixWorld);let u=e.ray.origin.distanceTo(xn);return u<e.near||u>e.far?null:{distance:u,point:xn.clone(),object:g}}function vn(g,t,e,n,i,s,o,l,a,u){g.getVertexPosition(l,fn),g.getVertexPosition(a,pn),g.getVertexPosition(u,mn);let h=Dr(g,t,e,n,fn,pn,mn,Is);if(h){let r=new C;_t.getBarycoord(Is,fn,pn,mn,r),i&&(h.uv=_t.getInterpolatedAttribute(i,l,a,u,r,new Y)),s&&(h.uv1=_t.getInterpolatedAttribute(s,l,a,u,r,new Y)),o&&(h.normal=_t.getInterpolatedAttribute(o,l,a,u,r,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let c={a:l,b:a,c:u,normal:new C,materialIndex:0};_t.getNormal(fn,pn,mn,c.normal),h.face=c,h.barycoord=r}return h}function Gs(g){let t={};for(let e in g){t[e]={};for(let n in g[e]){let i=g[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function rt(g){let t={};for(let e=0;e<g.length;e++){let n=Gs(g[e]);for(let i in n)t[i]=n[i]}return t}var wi=new C,Fr=new C,Ur=new N,Dt=class{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=wi.subVectors(n,e).cross(Fr.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(wi),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||Ur.getNormalMatrix(t),i=this.coplanarPoint(wi).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}};function yn(g,t){return!g||g.constructor===t?g:typeof t.BYTES_PER_ELEMENT=="number"?new t(g):Array.prototype.slice.call(g)}function Nr(g){return ArrayBuffer.isView(g)&&!(g instanceof DataView)}var jt=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],s=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let l=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===l)break;if(s=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=s)){let l=e[1];t<l&&(n=2,s=l);for(let a=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(i=s,s=e[--n-1],t>=s)break t}o=n,n=0;break e}break n}for(;n<o;){let l=n+o>>>1;t<e[l]?o=l:n=l+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},In=class extends jt{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ii,endingEnd:Ii}}intervalChanged_(t,e,n){let i=this.parameterPositions,s=t-2,o=t+1,l=i[s],a=i[o];if(l===void 0)switch(this.getSettings_().endingStart){case Li:s=t,l=2*e-n;break;case Di:s=i.length-2,l=e+i[s]-i[s+1];break;default:s=t,l=n}if(a===void 0)switch(this.getSettings_().endingEnd){case Li:o=t,a=2*n-e;break;case Di:o=1,a=n+i[1]-i[0];break;default:o=t-1,a=e}let u=(n-e)*.5,h=this.valueSize;this._weightPrev=u/(e-l),this._weightNext=u/(a-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=t*l,u=a-l,h=this._offsetPrev,r=this._offsetNext,c=this._weightPrev,d=this._weightNext,f=(n-e)/(i-e),m=f*f,x=m*f,M=-c*x+2*c*m-c*f,b=(1+c)*x+(-1.5-2*c)*m+(-.5+c)*f+1,p=(-1-d)*x+(1.5+d)*m+.5*f,v=d*x-d*m;for(let y=0;y!==l;++y)s[y]=M*o[h+y]+b*o[u+y]+p*o[a+y]+v*o[r+y];return s}},Ln=class extends jt{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=t*l,u=a-l,h=(n-e)/(i-e),r=1-h;for(let c=0;c!==l;++c)s[c]=o[u+c]*r+o[a+c]*h;return s}},Dn=class extends jt{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},dt=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=yn(e,this.TimeBufferType),this.values=yn(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:yn(t.times,Array),values:yn(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Dn(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ln(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new In(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ie:e=this.InterpolantFactoryMethodDiscrete;break;case wn:e=this.InterpolantFactoryMethodLinear;break;case Mn:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ie;case this.InterpolantFactoryMethodLinear:return wn;case this.InterpolantFactoryMethodSmooth:return Mn}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){let n=this.times,i=n.length,s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);let l=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*l,o*l)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let l=0;l!==s;l++){let a=n[l];if(typeof a=="number"&&isNaN(a)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,a),t=!1;break}if(o!==null&&o>a){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,a,o),t=!1;break}o=a}if(i!==void 0&&Nr(i))for(let l=0,a=i.length;l!==a;++l){let u=i[l];if(isNaN(u)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,u),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Mn,s=t.length-1,o=1;for(let l=1;l<s;++l){let a=!1,u=t[l],h=t[l+1];if(u!==h&&(l!==1||u!==t[0]))if(i)a=!0;else{let r=l*n,c=r-n,d=r+n;for(let f=0;f!==n;++f){let m=e[r+f];if(m!==e[c+f]||m!==e[d+f]){a=!0;break}}}if(a){if(l!==o){t[o]=t[l];let r=l*n,c=o*n;for(let d=0;d!==n;++d)e[c+d]=e[r+d]}++o}}if(s>0){t[o]=t[s];for(let l=s*n,a=o*n,u=0;u!==n;++u)e[a+u]=e[l+u];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}};dt.prototype.ValueTypeName="";dt.prototype.TimeBufferType=Float32Array;dt.prototype.ValueBufferType=Float32Array;dt.prototype.DefaultInterpolation=wn;var Ht=class extends dt{constructor(t,e,n){super(t,e,n)}};Ht.prototype.ValueTypeName="bool";Ht.prototype.ValueBufferType=Array;Ht.prototype.DefaultInterpolation=Ie;Ht.prototype.InterpolantFactoryMethodLinear=void 0;Ht.prototype.InterpolantFactoryMethodSmooth=void 0;var Fn=class extends dt{constructor(t,e,n,i){super(t,e,n,i)}};Fn.prototype.ValueTypeName="color";var Un=class extends dt{constructor(t,e,n,i){super(t,e,n,i)}};Un.prototype.ValueTypeName="number";var Nn=class extends jt{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let s=this.resultBuffer,o=this.sampleValues,l=this.valueSize,a=(n-e)/(i-e),u=t*l;for(let h=u+l;u!==h;u+=4)Lt.slerpFlat(s,0,o,u-l,o,u,a);return s}},Ue=class extends dt{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new Nn(this.times,this.values,this.getValueSize(),t)}};Ue.prototype.ValueTypeName="quaternion";Ue.prototype.InterpolantFactoryMethodSmooth=void 0;var Gt=class extends dt{constructor(t,e,n){super(t,e,n)}};Gt.prototype.ValueTypeName="string";Gt.prototype.ValueBufferType=Array;Gt.prototype.DefaultInterpolation=Ie;Gt.prototype.InterpolantFactoryMethodLinear=void 0;Gt.prototype.InterpolantFactoryMethodSmooth=void 0;var Bn=class extends dt{constructor(t,e,n,i){super(t,e,n,i)}};Bn.prototype.ValueTypeName="vector";var On=class{constructor(t,e,n){let i=this,s=!1,o=0,l=0,a,u=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){l++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,l),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,l),o===l&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return a?a(h):h},this.setURLModifier=function(h){return a=h,this},this.addHandler=function(h,r){return u.push(h,r),this},this.removeHandler=function(h){let r=u.indexOf(h);return r!==-1&&u.splice(r,2),this},this.getHandler=function(h){for(let r=0,c=u.length;r<c;r+=2){let d=u[r],f=u[r+1];if(d.global&&(d.lastIndex=0),d.test(h))return f}return null}}},Ws=new On,zn=class{constructor(t){this.manager=t!==void 0?t:Ws,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};zn.DEFAULT_MATERIAL_NAME="__DEFAULT";var Qi="\\[\\]\\.:\\/",Br=new RegExp("["+Qi+"]","g"),ji="[^"+Qi+"]",Or="[^"+Qi.replace("\\.","")+"]",zr=/((?:WC+[\/:])*)/.source.replace("WC",ji),Vr=/(WCOD+)?/.source.replace("WCOD",Or),kr=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ji),Hr=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ji),Gr=new RegExp("^"+zr+Vr+kr+Hr+"$"),Wr=["material","materials","bones","map"],Vi=class{constructor(t,e,n){let i=n||X.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},X=class g{constructor(t,e,n){this.path=e,this.parsedPath=n||g.parseTrackName(e),this.node=g.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new g.Composite(t,e,n):new g(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Br,"")}static parseTrackName(t){let e=Gr.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Wr.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(s){for(let o=0;o<s.length;o++){let l=s[o];if(l.name===e||l.uuid===e)return l;let a=n(l.children);if(a)return a}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,s=e.propertyIndex;if(t||(t=g.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let u=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===u){u=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(u!==void 0){if(t[u]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[u]}}let o=t[i];if(o===void 0){let u=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+u+"."+i+" but it wasn't found.",t);return}let l=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?l=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let a=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}a=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(a=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(a=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[a],this.setValue=this.SetterByBindingTypeAndVersioning[a][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};X.Composite=Vi;X.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};X.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};X.prototype.GetterByBindingType=[X.prototype._getValue_direct,X.prototype._getValue_array,X.prototype._getValue_arrayElement,X.prototype._getValue_toArray];X.prototype.SetterByBindingTypeAndVersioning=[[X.prototype._setValue_direct,X.prototype._setValue_direct_setNeedsUpdate,X.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[X.prototype._setValue_array,X.prototype._setValue_array_setNeedsUpdate,X.prototype._setValue_array_setMatrixWorldNeedsUpdate],[X.prototype._setValue_arrayElement,X.prototype._setValue_arrayElement_setNeedsUpdate,X.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[X.prototype._setValue_fromArray,X.prototype._setValue_fromArray_setNeedsUpdate,X.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Mc=new Float32Array(1);var Ls=new Z,Ne=class{constructor(t,e,n=0,i=1/0){this.ray=new De(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new Fe,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ls.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ls),this}intersectObject(t,e=!0,n=[]){return ki(t,this,n,e),n.sort(Ds),n}intersectObjects(t,e=!0,n=[]){for(let i=0,s=t.length;i<s;i++)ki(t[i],this,n,e);return n.sort(Ds),n}};function Ds(g,t){return g.distance-t.distance}function ki(g,t,e,n){let i=!0;if(g.layers.test(t.layers)&&g.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){let s=g.children;for(let o=0,l=s.length;o<l;o++)ki(s[o],t,e,!0)}}var Fs=new C,_n=new C,te=class{constructor(t=new C,e=new C){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Fs.subVectors(t,this.start),_n.subVectors(this.end,this.start);let n=_n.dot(_n),s=_n.dot(Fs)/n;return e&&(s=O(s,0,1)),s}closestPointToPoint(t,e,n){let i=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(i).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Be}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Be);var Xr=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,qr=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Yr=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zr=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$r=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jr=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kr=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Qr=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jr=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,to=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,eo=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,no=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,io=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,so=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,ro=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,oo=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ao=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lo=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,co=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ho=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,uo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,fo=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,po=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,mo=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,go=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xo=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vo=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yo=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_o=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mo=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,So="gl_FragColor = linearToOutputTexel( gl_FragColor );",bo=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wo=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ao=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Eo=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,To=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Co=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Ro=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Po=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Io=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Lo=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Do=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fo=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Uo=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,No=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bo=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Oo=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,zo=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vo=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ko=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ho=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Go=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Wo=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Xo=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qo=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yo=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zo=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$o=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jo=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ko=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qo=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jo=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ta=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ea=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,na=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ia=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,sa=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ra=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,oa=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,aa=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,la=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ca=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ha=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ua=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,da=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fa=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pa=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ma=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ga=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xa=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,va=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ya=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_a=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ma=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Sa=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ba=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wa=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Aa=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ea=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ta=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Ca=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ra=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Pa=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ia=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,La=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Da=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fa=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Ua=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Na=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ba=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Oa=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,za=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Va=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ka=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ha=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ga=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Wa=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Xa=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,qa=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ya=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Za=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$a=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ja=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ka=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Qa=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ja=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tl=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,el=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nl=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,il=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sl=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rl=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ol=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,al=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ll=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cl=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hl=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ul=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dl=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,fl=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pl=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ml=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gl=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xl=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vl=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yl=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_l=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ml=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sl=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bl=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wl=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,z={alphahash_fragment:Xr,alphahash_pars_fragment:qr,alphamap_fragment:Yr,alphamap_pars_fragment:Zr,alphatest_fragment:$r,alphatest_pars_fragment:Jr,aomap_fragment:Kr,aomap_pars_fragment:Qr,batching_pars_vertex:jr,batching_vertex:to,begin_vertex:eo,beginnormal_vertex:no,bsdfs:io,iridescence_fragment:so,bumpmap_pars_fragment:ro,clipping_planes_fragment:oo,clipping_planes_pars_fragment:ao,clipping_planes_pars_vertex:lo,clipping_planes_vertex:co,color_fragment:ho,color_pars_fragment:uo,color_pars_vertex:fo,color_vertex:po,common:mo,cube_uv_reflection_fragment:go,defaultnormal_vertex:xo,displacementmap_pars_vertex:vo,displacementmap_vertex:yo,emissivemap_fragment:_o,emissivemap_pars_fragment:Mo,colorspace_fragment:So,colorspace_pars_fragment:bo,envmap_fragment:wo,envmap_common_pars_fragment:Ao,envmap_pars_fragment:Eo,envmap_pars_vertex:To,envmap_physical_pars_fragment:Oo,envmap_vertex:Co,fog_vertex:Ro,fog_pars_vertex:Po,fog_fragment:Io,fog_pars_fragment:Lo,gradientmap_pars_fragment:Do,lightmap_pars_fragment:Fo,lights_lambert_fragment:Uo,lights_lambert_pars_fragment:No,lights_pars_begin:Bo,lights_toon_fragment:zo,lights_toon_pars_fragment:Vo,lights_phong_fragment:ko,lights_phong_pars_fragment:Ho,lights_physical_fragment:Go,lights_physical_pars_fragment:Wo,lights_fragment_begin:Xo,lights_fragment_maps:qo,lights_fragment_end:Yo,logdepthbuf_fragment:Zo,logdepthbuf_pars_fragment:$o,logdepthbuf_pars_vertex:Jo,logdepthbuf_vertex:Ko,map_fragment:Qo,map_pars_fragment:jo,map_particle_fragment:ta,map_particle_pars_fragment:ea,metalnessmap_fragment:na,metalnessmap_pars_fragment:ia,morphinstance_vertex:sa,morphcolor_vertex:ra,morphnormal_vertex:oa,morphtarget_pars_vertex:aa,morphtarget_vertex:la,normal_fragment_begin:ca,normal_fragment_maps:ha,normal_pars_fragment:ua,normal_pars_vertex:da,normal_vertex:fa,normalmap_pars_fragment:pa,clearcoat_normal_fragment_begin:ma,clearcoat_normal_fragment_maps:ga,clearcoat_pars_fragment:xa,iridescence_pars_fragment:va,opaque_fragment:ya,packing:_a,premultiplied_alpha_fragment:Ma,project_vertex:Sa,dithering_fragment:ba,dithering_pars_fragment:wa,roughnessmap_fragment:Aa,roughnessmap_pars_fragment:Ea,shadowmap_pars_fragment:Ta,shadowmap_pars_vertex:Ca,shadowmap_vertex:Ra,shadowmask_pars_fragment:Pa,skinbase_vertex:Ia,skinning_pars_vertex:La,skinning_vertex:Da,skinnormal_vertex:Fa,specularmap_fragment:Ua,specularmap_pars_fragment:Na,tonemapping_fragment:Ba,tonemapping_pars_fragment:Oa,transmission_fragment:za,transmission_pars_fragment:Va,uv_pars_fragment:ka,uv_pars_vertex:Ha,uv_vertex:Ga,worldpos_vertex:Wa,background_vert:Xa,background_frag:qa,backgroundCube_vert:Ya,backgroundCube_frag:Za,cube_vert:$a,cube_frag:Ja,depth_vert:Ka,depth_frag:Qa,distanceRGBA_vert:ja,distanceRGBA_frag:tl,equirect_vert:el,equirect_frag:nl,linedashed_vert:il,linedashed_frag:sl,meshbasic_vert:rl,meshbasic_frag:ol,meshlambert_vert:al,meshlambert_frag:ll,meshmatcap_vert:cl,meshmatcap_frag:hl,meshnormal_vert:ul,meshnormal_frag:dl,meshphong_vert:fl,meshphong_frag:pl,meshphysical_vert:ml,meshphysical_frag:gl,meshtoon_vert:xl,meshtoon_frag:vl,points_vert:yl,points_frag:_l,shadow_vert:Ml,shadow_frag:Sl,sprite_vert:bl,sprite_frag:wl},D={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new N},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new N}},envmap:{envMap:{value:null},envMapRotation:{value:new N},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new N}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new N}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new N},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new N},normalScale:{value:new Y(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new N},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new N}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new N}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new N}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0},uvTransform:{value:new N}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new Y(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new N},alphaMap:{value:null},alphaMapTransform:{value:new N},alphaTest:{value:0}}},Xs={basic:{uniforms:rt([D.common,D.specularmap,D.envmap,D.aomap,D.lightmap,D.fog]),vertexShader:z.meshbasic_vert,fragmentShader:z.meshbasic_frag},lambert:{uniforms:rt([D.common,D.specularmap,D.envmap,D.aomap,D.lightmap,D.emissivemap,D.bumpmap,D.normalmap,D.displacementmap,D.fog,D.lights,{emissive:{value:new J(0)}}]),vertexShader:z.meshlambert_vert,fragmentShader:z.meshlambert_frag},phong:{uniforms:rt([D.common,D.specularmap,D.envmap,D.aomap,D.lightmap,D.emissivemap,D.bumpmap,D.normalmap,D.displacementmap,D.fog,D.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30}}]),vertexShader:z.meshphong_vert,fragmentShader:z.meshphong_frag},standard:{uniforms:rt([D.common,D.envmap,D.aomap,D.lightmap,D.emissivemap,D.bumpmap,D.normalmap,D.displacementmap,D.roughnessmap,D.metalnessmap,D.fog,D.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:z.meshphysical_vert,fragmentShader:z.meshphysical_frag},toon:{uniforms:rt([D.common,D.aomap,D.lightmap,D.emissivemap,D.bumpmap,D.normalmap,D.displacementmap,D.gradientmap,D.fog,D.lights,{emissive:{value:new J(0)}}]),vertexShader:z.meshtoon_vert,fragmentShader:z.meshtoon_frag},matcap:{uniforms:rt([D.common,D.bumpmap,D.normalmap,D.displacementmap,D.fog,{matcap:{value:null}}]),vertexShader:z.meshmatcap_vert,fragmentShader:z.meshmatcap_frag},points:{uniforms:rt([D.points,D.fog]),vertexShader:z.points_vert,fragmentShader:z.points_frag},dashed:{uniforms:rt([D.common,D.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:z.linedashed_vert,fragmentShader:z.linedashed_frag},depth:{uniforms:rt([D.common,D.displacementmap]),vertexShader:z.depth_vert,fragmentShader:z.depth_frag},normal:{uniforms:rt([D.common,D.bumpmap,D.normalmap,D.displacementmap,{opacity:{value:1}}]),vertexShader:z.meshnormal_vert,fragmentShader:z.meshnormal_frag},sprite:{uniforms:rt([D.sprite,D.fog]),vertexShader:z.sprite_vert,fragmentShader:z.sprite_frag},background:{uniforms:{uvTransform:{value:new N},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:z.background_vert,fragmentShader:z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new N}},vertexShader:z.backgroundCube_vert,fragmentShader:z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:z.cube_vert,fragmentShader:z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:z.equirect_vert,fragmentShader:z.equirect_frag},distanceRGBA:{uniforms:rt([D.common,D.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:z.distanceRGBA_vert,fragmentShader:z.distanceRGBA_frag},shadow:{uniforms:rt([D.lights,D.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:z.shadow_vert,fragmentShader:z.shadow_frag}};Xs.physical={uniforms:rt([Xs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new N},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new N},clearcoatNormalScale:{value:new Y(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new N},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new N},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new N},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new N},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new N},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new N},transmissionSamplerSize:{value:new Y},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new N},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new N},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new N},anisotropyVector:{value:new Y},anisotropyMap:{value:null},anisotropyMapTransform:{value:new N}}]),vertexShader:z.meshphysical_vert,fragmentShader:z.meshphysical_frag};var ee=(1+Math.sqrt(5))/2,xe=1/ee,Dm=[new C(-ee,xe,0),new C(ee,xe,0),new C(-xe,0,ee),new C(xe,0,ee),new C(0,ee,-xe),new C(0,ee,xe),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];var Fm=new Float32Array(16),Um=new Float32Array(9),Nm=new Float32Array(4);var Bm={[Hi]:Gi,[Wi]:Yi,[Xi]:Zi,[Pe]:qi,[Gi]:Hi,[Yi]:Wi,[Zi]:Xi,[qi]:Pe};var Vn=new Map,El=5,ct=(g,t=!1)=>{if(!Vn.has(g))Vn.set(g,1);else{let e=Vn.get(g);if(typeof e>"u"||e>=El)return;Vn.set(g,e+1)}t?console.error(`%c [enable3d] ${g} `,"background: #222; color: #bada55"):console.warn(`%c [enable3d] ${g} `,"background: #222; color: #bada55")};var ze={BOX:"box",CYLINDER:"cylinder",SPHERE:"sphere",CAPSULE:"capsule",CONE:"cone",HULL:"hull",HACD:"hacd",VHACD:"vhacd",MESH:"mesh",HEIGHTFIELD:"heightfield"},Ve={ALL:"all",MANUAL:"manual"};var Tl=function(){let g=new C,t=new C,e=new Z;return function(n,i,s,o={}){if(o.type=ze.HULL,Hn(o),o.fit===Ve.MANUAL)return console.warn("cannot use fit: manual with type: hull"),null;let l=ts(n,i),a=new Ammo.btVector3,u=new Ammo.btConvexHullShape;u.setMargin(o.margin),t.addVectors(l.max,l.min).multiplyScalar(.5);let h=0;for(let f=0;f<n.length;f++)h+=n[f].length/3;let r=o.hullMaxVertices||1e5;h>r&&console.warn(`too many vertices for hull shape; sampling ~${r} from ~${h} vertices`);let c=Math.min(1,r/h);for(let f=0;f<n.length;f++){let m=n[f];e.fromArray(i[f]);for(let x=0;x<m.length;x+=3){let M=f===n.length-1&&x===m.length-3;(Math.random()<=c||M)&&(g.set(m[x],m[x+1],m[x+2]).applyMatrix4(e).sub(t),a.setValue(g.x,g.y,g.z),u.addPoint(a,M))}}let d=u;if(u.getNumVertices()>=100){let f=new Ammo.btShapeHull(u);f.buildHull(o.margin),Ammo.destroy(u),d=new Ammo.btConvexHullShape(Ammo.getPointer(f.getVertexPointer()),f.numVertices()),Ammo.destroy(f)}return Ammo.destroy(a),Gn(d,o,Wn(s,o)),d}}(),Cl=function(){let g=new C,t=new C,e=new Z;return function(n,i,s,o,l={}){if(l.type=ze.HACD,Hn(l),l.fit===Ve.MANUAL)return console.warn("cannot use fit: manual with type: hacd"),[];if(!Ammo.hasOwnProperty("HACD"))return console.warn("HACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];let a=ts(n,i),u=Wn(o,l),h=0,r=0;t.addVectors(a.max,a.min).multiplyScalar(.5);for(let p=0;p<n.length;p++)h+=n[p].length/3,s&&s[p]?r+=s[p].length/3:r+=n[p].length/9;let c=new Ammo.HACD;l.hasOwnProperty("compacityWeight")&&c.SetCompacityWeight(l.compacityWeight),l.hasOwnProperty("volumeWeight")&&c.SetVolumeWeight(l.volumeWeight),l.hasOwnProperty("nClusters")&&c.SetNClusters(l.nClusters),l.hasOwnProperty("nVerticesPerCH")&&c.SetNVerticesPerCH(l.nVerticesPerCH),l.hasOwnProperty("concavity")&&c.SetConcavity(l.concavity);let d=Ammo._malloc(h*3*8),f=Ammo._malloc(r*3*4);c.SetPoints(d),c.SetTriangles(f),c.SetNPoints(h),c.SetNTriangles(r);let m=d/8,x=f/4;for(let p=0;p<n.length;p++){let v=n[p];e.fromArray(i[p]);for(let y=0;y<v.length;y+=3)g.set(v[y+0],v[y+1],v[y+2]).applyMatrix4(e).sub(t),Ammo.HEAPF64[m+0]=g.x,Ammo.HEAPF64[m+1]=g.y,Ammo.HEAPF64[m+2]=g.z,m+=3;if(s[p]){let y=s[p];for(let _=0;_<y.length;_++)Ammo.HEAP32[x]=y[_],x++}else for(let y=0;y<v.length/3;y++)Ammo.HEAP32[x]=y,x++}c.Compute(),Ammo._free(d),Ammo._free(f);let M=c.GetNClusters(),b=[];for(let p=0;p<M;p++){let v=new Ammo.btConvexHullShape;v.setMargin(l.margin);let y=c.GetNPointsCH(p),_=c.GetNTrianglesCH(p),S=Ammo._malloc(y*3*8),A=Ammo._malloc(_*3*4);c.GetCH(p,S,A);let w=S/8;for(let T=0;T<y;T++){let E=new Ammo.btVector3,R=Ammo.HEAPF64[w+T*3+0],P=Ammo.HEAPF64[w+T*3+1],L=Ammo.HEAPF64[w+T*3+2];E.setValue(R,P,L),v.addPoint(E,T===y-1),Ammo.destroy(E)}Gn(v,l,u),b.push(v)}return b}}(),Rl=function(){let g=new C,t=new C,e=new Z;return function(n,i,s,o,l={}){if(l.type=ze.VHACD,Hn(l),l.fit===Ve.MANUAL)return console.warn("cannot use fit: manual with type: vhacd"),[];if(!Ammo.hasOwnProperty("VHACD"))return console.warn("VHACD unavailable in included build of Ammo.js. Visit https://github.com/mozillareality/ammo.js for the latest version."),[];let a=ts(n,i),u=Wn(o,l),h=0,r=0;t.addVectors(a.max,a.min).multiplyScalar(.5);for(let y=0;y<n.length;y++)h+=n[y].length/3,s&&s[y]?r+=s[y].length/3:r+=n[y].length/9;let c=new Ammo.VHACD,d=new Ammo.Parameters;l.hasOwnProperty("resolution")&&d.set_m_resolution(l.resolution),l.hasOwnProperty("depth")&&d.set_m_depth(l.depth),l.hasOwnProperty("concavity")&&d.set_m_concavity(l.concavity),l.hasOwnProperty("planeDownsampling")&&d.set_m_planeDownsampling(l.planeDownsampling),l.hasOwnProperty("convexhullDownsampling")&&d.set_m_convexhullDownsampling(l.convexhullDownsampling),l.hasOwnProperty("alpha")&&d.set_m_alpha(l.alpha),l.hasOwnProperty("beta")&&d.set_m_beta(l.beta),l.hasOwnProperty("gamma")&&d.set_m_gamma(l.gamma),l.hasOwnProperty("pca")&&d.set_m_pca(l.pca),l.hasOwnProperty("mode")&&d.set_m_mode(l.mode),l.hasOwnProperty("maxNumVerticesPerCH")&&d.set_m_maxNumVerticesPerCH(l.maxNumVerticesPerCH),l.hasOwnProperty("minVolumePerCH")&&d.set_m_minVolumePerCH(l.minVolumePerCH),l.hasOwnProperty("convexhullApproximation")&&d.set_m_convexhullApproximation(l.convexhullApproximation),l.hasOwnProperty("oclAcceleration")&&d.set_m_oclAcceleration(l.oclAcceleration);let f=Ammo._malloc(h*3*8+3),m=Ammo._malloc(r*3*4),x=f/8,M=m/4;for(let y=0;y<n.length;y++){let _=n[y];e.fromArray(i[y]);for(let S=0;S<_.length;S+=3)g.set(_[S+0],_[S+1],_[S+2]).applyMatrix4(e).sub(t),Ammo.HEAPF64[x+0]=g.x,Ammo.HEAPF64[x+1]=g.y,Ammo.HEAPF64[x+2]=g.z,x+=3;if(s[y]){let S=s[y];for(let A=0;A<S.length;A++)Ammo.HEAP32[M]=S[A],M++}else for(let S=0;S<_.length/3;S++)Ammo.HEAP32[M]=S,M++}c.Compute(f,3,h,m,3,r,d),Ammo._free(f),Ammo._free(m);let b=c.GetNConvexHulls(),p=[],v=new Ammo.ConvexHull;for(let y=0;y<b;y++){c.GetConvexHull(y,v);let _=v.get_m_nPoints(),S=v.get_m_points(),A=new Ammo.btConvexHullShape;A.setMargin(l.margin);for(let w=0;w<_;w++){let T=new Ammo.btVector3,E=v.get_m_points(w*3+0),R=v.get_m_points(w*3+1),P=v.get_m_points(w*3+2);T.setValue(E,R,P),A.addPoint(T,w===_-1),Ammo.destroy(T)}Gn(A,l,u),p.push(A)}return Ammo.destroy(v),Ammo.destroy(c),p}}(),Pl=function(){let g=new C,t=new C,e=new C,n=new Z;return function(i,s,o,l,a={}){if(a.type=ze.MESH,Hn(a),a.fit===Ve.MANUAL)return console.warn("cannot use fit: manual with type: mesh"),null;let u=Wn(l,a),h=new Ammo.btVector3,r=new Ammo.btVector3,c=new Ammo.btVector3,d=new Ammo.btTriangleMesh(!0,!1);for(let x=0;x<i.length;x++){let M=i[x],b=o[x]?o[x]:null;if(n.fromArray(s[x]),b)for(let p=0;p<b.length;p+=3){let v=b[p]*3,y=b[p+1]*3,_=b[p+2]*3;g.set(M[v],M[v+1],M[v+2]).applyMatrix4(n),t.set(M[y],M[y+1],M[y+2]).applyMatrix4(n),e.set(M[_],M[_+1],M[_+2]).applyMatrix4(n),h.setValue(g.x,g.y,g.z),r.setValue(t.x,t.y,t.z),c.setValue(e.x,e.y,e.z),d.addTriangle(h,r,c,!1)}else for(let p=0;p<M.length;p+=9)g.set(M[p+0],M[p+1],M[p+2]).applyMatrix4(n),t.set(M[p+3],M[p+4],M[p+5]).applyMatrix4(n),e.set(M[p+6],M[p+7],M[p+8]).applyMatrix4(n),h.setValue(g.x,g.y,g.z),r.setValue(t.x,t.y,t.z),c.setValue(e.x,e.y,e.z),d.addTriangle(h,r,c,!1)}let f=new Ammo.btVector3(u.x,u.y,u.z);d.setScaling(f),Ammo.destroy(f);let m;return a.concave?m=new Ammo.btBvhTriangleMeshShape(d,!0,!0):m=new Ammo.btConvexTriangleMeshShape(d,!0),m.resources=[d],Ammo.destroy(h),Ammo.destroy(r),Ammo.destroy(c),Gn(m,a),m}}();function Hn(g){g.type=g.type||ze.HULL,g.margin=g.hasOwnProperty("margin")?g.margin:.01}var Gn=function(g,t,e){},Il=function(){let g=new Z;return function(t,e,n){parseInt(Be)>=123?g.copy(t.matrixWorld).invert():g.getInverse(t.matrixWorld),new C().setFromMatrixScale(t.matrixWorld),t.traverse(s=>{let o=new Z;if(s.isMesh&&(e.includeInvisible||s.el&&s.el.object3D.visible||s.visible)){s===t?o.identity():(s.updateWorldMatrix(!0),o.multiplyMatrices(g,s.matrixWorld));let l;if(s.geometry.isBufferGeometry){let a=s.geometry.attributes.position;if(a.isInterleavedBufferAttribute){l=new Float32Array(a.count*a.itemSize);let u=a.offset,h=0;for(;h<l.length;){for(let r=0;r<a.itemSize;r++)l[h++]=a.array[u+r];u+=a.data.stride}}else l=a.array}n(s.geometry.isBufferGeometry?l:s.geometry.vertices,o.elements,s.geometry.index?s.geometry.index.array:null)}})}}(),Wn=function(){let g=new Z;return function(t,e={}){let n=new C(1,1,1);return e.fit===Ve.ALL&&(g.fromArray(t),n.setFromMatrixScale(g)),n}}(),tg=function(){let g=new C;return function(t,e,n){let i=0,{x:s,y:o,z:l}=n.getCenter(g);return qs(t,e,a=>{let u=s-a.x,h=o-a.y,r=l-a.z;i=Math.max(i,u*u+h*h+r*r)}),Math.sqrt(i)}}();var ts=function(g,t){let e=new Mt,n=1/0,i=1/0,s=1/0,o=-1/0,l=-1/0,a=-1/0;return e.min.set(0,0,0),e.max.set(0,0,0),qs(g,t,u=>{u.x<n&&(n=u.x),u.y<i&&(i=u.y),u.z<s&&(s=u.z),u.x>o&&(o=u.x),u.y>l&&(l=u.y),u.z>a&&(a=u.z)}),e.min.set(n,i,s),e.max.set(o,l,a),e},qs=function(){let g=new C,t=new Z;return function(e,n,i){for(let s=0;s<e.length;s++){t.fromArray(n[s]);for(let o=0;o<e[s].length;o+=3)g.set(e[s][o],e[s][o+1],e[s][o+2]).applyMatrix4(t),i(g)}}}();var qn=0,Dl=1,Fl=new C,Ys=new te,ns=new Dt,Zs=new C,Xn=new _t,Yn=class{constructor(){this.tolerance=-1,this.faces=[],this.newFaces=[],this.assigned=new Zn,this.unassigned=new Zn,this.vertices=[]}setFromPoints(t){if(t.length>=4){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.vertices.push(new is(t[e]));this._compute()}return this}setFromObject(t){let e=[];return t.updateMatrixWorld(!0),t.traverse(function(n){let i=n.geometry;if(i!==void 0){let s=i.attributes.position;if(s!==void 0)for(let o=0,l=s.count;o<l;o++){let a=new C;a.fromBufferAttribute(s,o).applyMatrix4(n.matrixWorld),e.push(a)}}}),this.setFromPoints(e)}containsPoint(t){let e=this.faces;for(let n=0,i=e.length;n<i;n++)if(e[n].distanceToPoint(t)>this.tolerance)return!1;return!0}intersectRay(t,e){let n=this.faces,i=-1/0,s=1/0;for(let o=0,l=n.length;o<l;o++){let a=n[o],u=a.distanceToPoint(t.origin),h=a.normal.dot(t.direction);if(u>0&&h>=0)return null;let r=h!==0?-u/h:0;if(!(r<=0)&&(h>0?s=Math.min(r,s):i=Math.max(r,i),i>s))return null}return i!==-1/0?t.at(i,e):t.at(s,e),e}intersectsRay(t){return this.intersectRay(t,Fl)!==null}makeEmpty(){return this.faces=[],this.vertices=[],this}_addVertexToFace(t,e){return t.face=e,e.outside===null?this.assigned.append(t):this.assigned.insertBefore(e.outside,t),e.outside=t,this}_removeVertexFromFace(t,e){return t===e.outside&&(t.next!==null&&t.next.face===e?e.outside=t.next:e.outside=null),this.assigned.remove(t),this}_removeAllVerticesFromFace(t){if(t.outside!==null){let e=t.outside,n=t.outside;for(;n.next!==null&&n.next.face===t;)n=n.next;return this.assigned.removeSubList(e,n),e.prev=n.next=null,t.outside=null,e}}_deleteFaceVertices(t,e){let n=this._removeAllVerticesFromFace(t);if(n!==void 0)if(e===void 0)this.unassigned.appendChain(n);else{let i=n;do{let s=i.next;e.distanceToPoint(i.point)>this.tolerance?this._addVertexToFace(i,e):this.unassigned.append(i),i=s}while(i!==null)}return this}_resolveUnassignedPoints(t){if(this.unassigned.isEmpty()===!1){let e=this.unassigned.first();do{let n=e.next,i=this.tolerance,s=null;for(let o=0;o<t.length;o++){let l=t[o];if(l.mark===qn){let a=l.distanceToPoint(e.point);if(a>i&&(i=a,s=l),i>1e3*this.tolerance)break}}s!==null&&this._addVertexToFace(e,s),e=n}while(e!==null)}return this}_computeExtremes(){let t=new C,e=new C,n=[],i=[];for(let s=0;s<3;s++)n[s]=i[s]=this.vertices[0];t.copy(this.vertices[0].point),e.copy(this.vertices[0].point);for(let s=0,o=this.vertices.length;s<o;s++){let l=this.vertices[s],a=l.point;for(let u=0;u<3;u++)a.getComponent(u)<t.getComponent(u)&&(t.setComponent(u,a.getComponent(u)),n[u]=l);for(let u=0;u<3;u++)a.getComponent(u)>e.getComponent(u)&&(e.setComponent(u,a.getComponent(u)),i[u]=l)}return this.tolerance=3*Number.EPSILON*(Math.max(Math.abs(t.x),Math.abs(e.x))+Math.max(Math.abs(t.y),Math.abs(e.y))+Math.max(Math.abs(t.z),Math.abs(e.z))),{min:n,max:i}}_computeInitialHull(){let t=this.vertices,e=this._computeExtremes(),n=e.min,i=e.max,s=0,o=0;for(let c=0;c<3;c++){let d=i[c].point.getComponent(c)-n[c].point.getComponent(c);d>s&&(s=d,o=c)}let l=n[o],a=i[o],u,h;s=0,Ys.set(l.point,a.point);for(let c=0,d=this.vertices.length;c<d;c++){let f=t[c];if(f!==l&&f!==a){Ys.closestPointToPoint(f.point,!0,Zs);let m=Zs.distanceToSquared(f.point);m>s&&(s=m,u=f)}}s=-1,ns.setFromCoplanarPoints(l.point,a.point,u.point);for(let c=0,d=this.vertices.length;c<d;c++){let f=t[c];if(f!==l&&f!==a&&f!==u){let m=Math.abs(ns.distanceToPoint(f.point));m>s&&(s=m,h=f)}}let r=[];if(ns.distanceToPoint(h.point)<0){r.push(yt.create(l,a,u),yt.create(h,a,l),yt.create(h,u,a),yt.create(h,l,u));for(let c=0;c<3;c++){let d=(c+1)%3;r[c+1].getEdge(2).setTwin(r[0].getEdge(d)),r[c+1].getEdge(1).setTwin(r[d+1].getEdge(0))}}else{r.push(yt.create(l,u,a),yt.create(h,l,a),yt.create(h,a,u),yt.create(h,u,l));for(let c=0;c<3;c++){let d=(c+1)%3;r[c+1].getEdge(2).setTwin(r[0].getEdge((3-c)%3)),r[c+1].getEdge(0).setTwin(r[d+1].getEdge(1))}}for(let c=0;c<4;c++)this.faces.push(r[c]);for(let c=0,d=t.length;c<d;c++){let f=t[c];if(f!==l&&f!==a&&f!==u&&f!==h){s=this.tolerance;let m=null;for(let x=0;x<4;x++){let M=this.faces[x].distanceToPoint(f.point);M>s&&(s=M,m=this.faces[x])}m!==null&&this._addVertexToFace(f,m)}}return this}_reindexFaces(){let t=[];for(let e=0;e<this.faces.length;e++){let n=this.faces[e];n.mark===qn&&t.push(n)}return this.faces=t,this}_nextVertexToAdd(){if(this.assigned.isEmpty()===!1){let t,e=0,n=this.assigned.first().face,i=n.outside;do{let s=n.distanceToPoint(i.point);s>e&&(e=s,t=i),i=i.next}while(i!==null&&i.face===n);return t}}_computeHorizon(t,e,n,i){this._deleteFaceVertices(n),n.mark=Dl;let s;e===null?s=e=n.getEdge(0):s=e.next;do{let o=s.twin,l=o.face;l.mark===qn&&(l.distanceToPoint(t)>this.tolerance?this._computeHorizon(t,o,l,i):i.push(s)),s=s.next}while(s!==e);return this}_addAdjoiningFace(t,e){let n=yt.create(t,e.tail(),e.head());return this.faces.push(n),n.getEdge(-1).setTwin(e.twin),n.getEdge(0)}_addNewFaces(t,e){this.newFaces=[];let n=null,i=null;for(let s=0;s<e.length;s++){let o=e[s],l=this._addAdjoiningFace(t,o);n===null?n=l:l.next.setTwin(i),this.newFaces.push(l.face),i=l}return n.next.setTwin(i),this}_addVertexToHull(t){let e=[];return this.unassigned.clear(),this._removeVertexFromFace(t,t.face),this._computeHorizon(t.point,null,t.face,e),this._addNewFaces(t,e),this._resolveUnassignedPoints(this.newFaces),this}_cleanup(){return this.assigned.clear(),this.unassigned.clear(),this.newFaces=[],this}_compute(){let t;for(this._computeInitialHull();(t=this._nextVertexToAdd())!==void 0;)this._addVertexToHull(t);return this._reindexFaces(),this._cleanup(),this}},yt=class g{constructor(){this.normal=new C,this.midpoint=new C,this.area=0,this.constant=0,this.outside=null,this.mark=qn,this.edge=null}static create(t,e,n){let i=new g,s=new ke(t,i),o=new ke(e,i),l=new ke(n,i);return s.next=l.prev=o,o.next=s.prev=l,l.next=o.prev=s,i.edge=s,i.compute()}getEdge(t){let e=this.edge;for(;t>0;)e=e.next,t--;for(;t<0;)e=e.prev,t++;return e}compute(){let t=this.edge.tail(),e=this.edge.head(),n=this.edge.next.head();return Xn.set(t.point,e.point,n.point),Xn.getNormal(this.normal),Xn.getMidpoint(this.midpoint),this.area=Xn.getArea(),this.constant=this.normal.dot(this.midpoint),this}distanceToPoint(t){return this.normal.dot(t)-this.constant}},ke=class{constructor(t,e){this.vertex=t,this.prev=null,this.next=null,this.twin=null,this.face=e}head(){return this.vertex}tail(){return this.prev?this.prev.vertex:null}length(){let t=this.head(),e=this.tail();return e!==null?e.point.distanceTo(t.point):-1}lengthSquared(){let t=this.head(),e=this.tail();return e!==null?e.point.distanceToSquared(t.point):-1}setTwin(t){return this.twin=t,t.twin=this,this}},is=class{constructor(t){this.point=t,this.prev=null,this.next=null,this.face=null}},Zn=class{constructor(){this.head=null,this.tail=null}first(){return this.head}last(){return this.tail}clear(){return this.head=this.tail=null,this}insertBefore(t,e){return e.prev=t.prev,e.next=t,e.prev===null?this.head=e:e.prev.next=e,t.prev=e,this}insertAfter(t,e){return e.prev=t,e.next=t.next,e.next===null?this.tail=e:e.next.prev=e,t.next=e,this}append(t){return this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail,t.next=null,this.tail=t,this}appendChain(t){for(this.head===null?this.head=t:this.tail.next=t,t.prev=this.tail;t.next!==null;)t=t.next;return this.tail=t,this}remove(t){return t.prev===null?this.head=t.next:t.prev.next=t.next,t.next===null?this.tail=t.prev:t.next.prev=t.prev,this}removeSubList(t,e){return t.prev===null?this.head=e.next:t.prev.next=e.next,e.next===null?this.tail=t.prev:e.next.prev=t.prev,this}isEmpty(){return this.head===null}};var He=class extends me{constructor(t=[]){super();let e=[],n=[],s=new Yn().setFromPoints(t).faces;for(let o=0;o<s.length;o++){let l=s[o],a=l.edge;do{let u=a.head().point;e.push(u.x,u.y,u.z),n.push(l.normal.x,l.normal.y,l.normal.z),a=a.next}while(a!==l.edge)}this.setAttribute("position",new Qt(e,3)),this.setAttribute("normal",new Qt(n,3))}};var $s=g=>{let t=window.THREE&&window.THREE.ConvexGeometry?window.THREE.ConvexGeometry:He;return new t(g)},St=function(g,t){this.minSizeForBreak=g||1.4,this.smallDelta=t||1e-4,this.tempLine1=new te,this.tempPlane1=new Dt,this.tempPlane2=new Dt,this.tempPlane_Cut=new Dt,this.tempCM1=new C,this.tempCM2=new C,this.tempVector3=new C,this.tempVector3_2=new C,this.tempVector3_3=new C,this.tempVector3_P0=new C,this.tempVector3_P1=new C,this.tempVector3_P2=new C,this.tempVector3_N0=new C,this.tempVector3_N1=new C,this.tempVector3_AB=new C,this.tempVector3_CB=new C,this.tempResultObjects={object1:null,object2:null},this.segments=[];for(var e=30*30,n=0;n<e;n++)this.segments[n]=!1};St.prototype={constructor:St,prepareBreakableObject:function(g,t,e,n,i){g.geometry.isBufferGeometry||console.error("THREE.ConvexObjectBreaker.prepareBreakableObject(): Parameter object must have a BufferGeometry."),g.userData.ammoPhysicsData={};var s=g.userData.ammoPhysicsData;s.mass=t,s.velocity=e.clone(),s.angularVelocity=n.clone(),s.breakable=i},subdivideByImpact:function(g,t,e,n,i){var s=[],o=this.tempPlane1,l=this.tempPlane2;this.tempVector3.addVectors(t,e),o.setFromCoplanarPoints(t,g.position,this.tempVector3);var a=i+n,u=this;function h(r,c,d,f){if(Math.random()<f*.05||f>a){s.push(r);return}var m=Math.PI;f===0?(l.normal.copy(o.normal),l.constant=o.constant):f<=n?(m=(d-c)*(.2+.6*Math.random())+c,u.tempVector3_2.copy(g.position).sub(t).applyAxisAngle(e,m).add(t),l.setFromCoplanarPoints(t,u.tempVector3,u.tempVector3_2)):(m=(.5*(f&1)+.2*(2-Math.random()))*Math.PI,u.tempVector3_2.copy(t).sub(r.position).applyAxisAngle(e,m).add(r.position),u.tempVector3_3.copy(e).add(r.position),l.setFromCoplanarPoints(r.position,u.tempVector3_3,u.tempVector3_2)),u.cutByPlane(r,l,u.tempResultObjects);var x=u.tempResultObjects.object1,M=u.tempResultObjects.object2;x&&h(x,c,m,f+1),M&&h(M,m,d,f+1)}return h(g,0,2*Math.PI,0),s},cutByPlane:function(g,t,e){var n=g.geometry,i=n.attributes.position.array,s=n.attributes.normal.array,o=i.length/3,l=o/3,a=n.getIndex();a&&(a=a.array,l=a.length/3);function u(Xt,ti){var Se=Xt*3+ti;return a?a[Se]:Se}for(var h=[],r=[],c=this.smallDelta,d=o*o,f=0;f<d;f++)this.segments[f]=!1;for(var m=this.tempVector3_P0,x=this.tempVector3_P1,M=this.tempVector3_N0,b=this.tempVector3_N1,f=0;f<l-1;f++){var p=u(f,0),v=u(f,1),y=u(f,2);M.set(s[p],s[p]+1,s[p]+2);for(var _=f+1;_<l;_++){var S=u(_,0),A=u(_,1),w=u(_,2);b.set(s[S],s[S]+1,s[S]+2);var T=1-M.dot(b)<c;T&&(p===S||p===A||p===w?v===S||v===A||v===w?(this.segments[p*o+v]=!0,this.segments[v*o+p]=!0):(this.segments[y*o+p]=!0,this.segments[p*o+y]=!0):(v===S||v===A||v===w)&&(this.segments[y*o+v]=!0,this.segments[v*o+y]=!0))}}var E=this.tempPlane_Cut;g.updateMatrix(),St.transformPlaneToLocalSpace(t,g.matrix,E);for(var f=0;f<l;f++)for(var R=u(f,0),P=u(f,1),L=u(f,2),I=0;I<3;I++){var F=I===0?R:I===1?P:L,U=I===0?P:I===1?L:R,V=this.segments[F*o+U];if(!V){this.segments[F*o+U]=!0,this.segments[U*o+F]=!0,m.set(i[3*F],i[3*F+1],i[3*F+2]),x.set(i[3*U],i[3*U+1],i[3*U+2]);var k=0,G=E.distanceToPoint(m);G>c?(k=2,r.push(m.clone())):G<-c?(k=1,h.push(m.clone())):(k=3,h.push(m.clone()),r.push(m.clone()));var H=0,G=E.distanceToPoint(x);if(G>c?(H=2,r.push(x.clone())):G<-c?(H=1,h.push(x.clone())):(H=3,h.push(x.clone()),r.push(x.clone())),k===1&&H===2||k===2&&H===1){this.tempLine1.start.copy(m),this.tempLine1.end.copy(x);var ot=new C;if(ot=E.intersectLine(this.tempLine1,ot),ot===void 0)return console.error("Internal error: segment does not intersect plane."),e.segmentedObject1=null,e.segmentedObject2=null,0;h.push(ot),r.push(ot.clone())}}}var at=g.userData.ammoPhysicsData.mass*.5;this.tempCM1.set(0,0,0);var B=0,j=h.length;if(j>0){for(var f=0;f<j;f++)this.tempCM1.add(h[f]);this.tempCM1.divideScalar(j);for(var f=0;f<j;f++){var W=h[f];W.sub(this.tempCM1),B=Math.max(B,W.x,W.y,W.z)}this.tempCM1.add(g.position)}this.tempCM2.set(0,0,0);var bt=0,et=r.length;if(et>0){for(var f=0;f<et;f++)this.tempCM2.add(r[f]);this.tempCM2.divideScalar(et);for(var f=0;f<et;f++){var W=r[f];W.sub(this.tempCM2),bt=Math.max(bt,W.x,W.y,W.z)}this.tempCM2.add(g.position)}var tt=null,q=null,Me=0;if(j>4)try{tt=new ge($s(h),g.material),tt.position.copy(this.tempCM1),tt.quaternion.copy(g.quaternion),tt.userData=g.userData,this.prepareBreakableObject(tt,at,g.userData.ammoPhysicsData.velocity,g.userData.ammoPhysicsData.angularVelocity,2*B>this.minSizeForBreak),Me++}catch(Xt){ct("Error in ConvexObjectBreaker.ts",!0),ct(Xt,!0)}if(et>4)try{q=new ge($s(r),g.material),q.position.copy(this.tempCM2),q.quaternion.copy(g.quaternion),q.userData=g.userData,this.prepareBreakableObject(q,at,g.userData.ammoPhysicsData.velocity,g.userData.ammoPhysicsData.angularVelocity,2*bt>this.minSizeForBreak),Me++}catch(Xt){ct("Error in ConvexObjectBreaker.ts",!0),ct(Xt,!0)}return e.object1=tt,e.object2=q,Me}};St.transformFreeVector=function(g,t){var e=g.x,n=g.y,i=g.z,s=t.elements;return g.x=s[0]*e+s[4]*n+s[8]*i,g.y=s[1]*e+s[5]*n+s[9]*i,g.z=s[2]*e+s[6]*n+s[10]*i,g};St.transformFreeVectorInverse=function(g,t){var e=g.x,n=g.y,i=g.z,s=t.elements;return g.x=s[0]*e+s[1]*n+s[2]*i,g.y=s[4]*e+s[5]*n+s[6]*i,g.z=s[8]*e+s[9]*n+s[10]*i,g};St.transformTiedVectorInverse=function(g,t){var e=g.x,n=g.y,i=g.z,s=t.elements;return g.x=s[0]*e+s[1]*n+s[2]*i-s[12],g.y=s[4]*e+s[5]*n+s[6]*i-s[13],g.z=s[8]*e+s[9]*n+s[10]*i-s[14],g};St.transformPlaneToLocalSpace=function(){var g=new C;return function(e,n,i){i.normal.copy(e.normal),i.constant=e.constant;var s=St.transformTiedVectorInverse(e.coplanarPoint(g),n);St.transformFreeVectorInverse(i.normal,n),i.constant=-s.dot(i.normal)}}();var Ul=(()=>{try{if(typeof WebAssembly=="object"&&typeof WebAssembly.instantiate=="function"){let g=new WebAssembly.Module(Uint8Array.of(0,97,115,109,1,0,0,0));if(g instanceof WebAssembly.Module)return new WebAssembly.Instance(g)instanceof WebAssembly.Instance}}catch(g){g instanceof Error&&console.error(g.message)}return!1})(),Js=(g,t)=>{var e=document.createElement("script");e.onload=()=>{t()},e.onerror=()=>{throw new Error(`failed to load ${g}`)},e.async=!0,e.src=g,document.head.appendChild(e)},Nl=(g,t)=>{Ul?Js(`${g}/ammo.wasm.js`,()=>t()):Js(`${g}/ammo.js`,()=>t())},ss=Nl;function Bl(g,t){t.forEach(e=>{Object.getOwnPropertyNames(e.prototype).forEach(n=>{Object.defineProperty(g.prototype,n,Object.getOwnPropertyDescriptor(e.prototype,n)||Object.create(null))})})}var rs=Bl;var Ge=class{physics;_btRayCallback;constructor(t){this.physics=t}getHitPointWorld(){let t=this._btRayCallback.get_m_hitPointWorld();return{x:t.x(),y:t.y(),z:t.z()}}getHitNormalWorld(){let t=this._btRayCallback.get_m_hitNormalWorld();return{x:t.x(),y:t.y(),z:t.z()}}getCollisionObject(){return Ammo.castObject(this._btRayCallback.get_m_collisionObject(),Ammo.btRigidBody).threeObject}};var We=class{physics;_btRayCallback;constructor(t){this.physics=t}getHitPointsWorld(){let t=this._btRayCallback.get_m_hitPointWorld(),e=[];for(let n=t.size()-1;n>=0;n--){let i=t.at(n);e.push({x:i.x(),y:i.y(),z:i.z()})}return e}getHitPointWorld(){return ct("Use getHitPointsWorld() instead of getHitPointWorld() for the AllHitsRayCaster!"),this.getHitPointsWorld()}getHitNormalsWorld(){let t=this._btRayCallback.get_m_hitNormalWorld(),e=[];for(let n=t.size()-1;n>=0;n--){let i=t.at(n);e.push({x:i.x(),y:i.y(),z:i.z()})}return e}getCollisionObjects(){let t=[],e=this._btRayCallback.get_m_collisionObjects();for(let n=e.size()-1;n>=0;n--){let i=Ammo.castObject(e.at(n),Ammo.btRigidBody);t.push(i.threeObject)}return t}};var $n=class{physics;type;_btRayFrom;_btRayTo;_btRayCallback;constructor(t){this.physics=t}setRayFromWorld(t=0,e=0,n=0){this._btRayFrom.setValue(t,e,n)}setRayToWorld(t=0,e=0,n=0){this._btRayTo.setValue(t,e,n)}hasHit(){return this._btRayCallback.hasHit()}rayTest(){typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback),this._btRayCallback=this.type==="closest"?new Ammo.ClosestRayResultCallback(this._btRayFrom,this._btRayTo):new Ammo.AllHitsRayResultCallback(this._btRayFrom,this._btRayTo),this.physics.physicsWorld.rayTest(this._btRayFrom,this._btRayTo,this._btRayCallback)}destroy(){typeof this._btRayFrom<"u"&&Ammo.destroy(this._btRayFrom),typeof this._btRayTo<"u"&&Ammo.destroy(this._btRayTo),typeof this._btRayCallback<"u"&&Ammo.destroy(this._btRayCallback)}},Jn=class{physics;type="closest";_btRayFrom=new Ammo.btVector3(0,0,0);_btRayTo=new Ammo.btVector3(0,0,0);_btRayCallback;constructor(t){this.physics=t}},Kn=class{physics;type="allHits";_btRayFrom=new Ammo.btVector3(0,0,0);_btRayTo=new Ammo.btVector3(0,0,0);_btRayCallback;constructor(t){this.physics=t}};rs(Jn,[$n,Ge]);rs(Kn,[$n,We]);var er="0.26.1";var Vl=`Powered by enable3d v${er}`;console.log(`%c %c %c %c %c ${Vl} %c https://enable3d.io/`,"background: #ff0000","background: #ffff00","background: #00ff00","background: #00ffff","color: #fff; background: #000000;","background: none");var Wt=class g{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}clone(){return new g(this.x,this.y,this.z)}negate(){return this.x*=-1,this.y*=-1,this.z*=-1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}times(t){return this.x*=t,this.y*=t,this.z*=t,this}dividedBy(t){return this.x/=t,this.y/=t,this.z/=t,this}lerp(t,e){return this.add(new g().copy(t).sub(this).times(e))}unit(){return this.dividedBy(this.length())}length(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2))}normalize(){return this.unit()}cross(t){let e=this.clone(),n=e.x,i=e.y,s=e.z,o=t.x,l=t.y,a=t.z;return this.x=i*a-s*l,this.y=s*o-n*a,this.z=n*l-i*o,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}toVector3(){return new C(this.x,this.y,this.z)}};var Xe=class g{constructor(t,e){this.normal=t,this.w=e,this.normal=t,this.w=e}clone(){return new g(this.normal.clone(),this.w)}flip(){this.normal.negate(),this.w=-this.w}splitPolygon(t,e,n,i,s){let h=0,r=[];for(let c=0;c<t.vertices.length;c++){let d=this.normal.dot(t.vertices[c].pos)-this.w,f=d<-g.EPSILON?2:d>g.EPSILON?1:0;h|=f,r.push(f)}switch(h){case 0:(this.normal.dot(t.plane.normal)>0?e:n).push(t);break;case 1:i.push(t);break;case 2:s.push(t);break;case 3:{let c=[],d=[];for(let f=0;f<t.vertices.length;f++){let m=(f+1)%t.vertices.length,x=r[f],M=r[m],b=t.vertices[f],p=t.vertices[m];if(x!=2&&c.push(b),x!=1&&d.push(x!=2?b.clone():b),(x|M)==3){let v=(this.w-this.normal.dot(b.pos))/this.normal.dot(new Wt().copy(p.pos).sub(b.pos)),y=b.interpolate(p,v);c.push(y),d.push(y.clone())}}c.length>=3&&i.push(new ve(c,t.shared)),d.length>=3&&s.push(new ve(d,t.shared));break}}}static fromPoints(t,e,n){let i=new Wt().copy(e).sub(t).cross(new Wt().copy(n).sub(t)).normalize();return new g(i.clone(),i.dot(t))}};Xe.EPSILON=1e-5;var ve=class g{constructor(t,e){this.vertices=t,this.shared=e,this.plane=Xe.fromPoints(t[0].pos,t[1].pos,t[2].pos)}clone(){return new g(this.vertices.map(t=>t.clone()),this.shared)}flip(){this.vertices.reverse().map(t=>t.flip()),this.plane.flip()}};import*as Kl from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";window.__loadPhysics=!1;window.__ammoPath="";var as=g=>(window.setTimeout(()=>{window.__loadPhysics?ss(window.__ammoPath,()=>{Ammo().then(()=>{g()})}):g()},50),{withPhysics(t){window.__loadPhysics=!0,window.__ammoPath=t}});var nc=xs(rr());var ec=[{name:"pointer",enabled:!0,test:"onpointerdown"in window,events:{down:"pointerdown",move:"pointermove",up:"pointerup"}},{name:"touch",enabled:!0,test:"ontouchstart"in window&&window.navigator.maxTouchPoints>=1,events:{down:"touchstart",move:"touchmove",up:"touchend"}},{name:"mouse",enabled:!0,test:"onmousedown"in window,events:{down:"mousedown",move:"mousemove",up:"mouseup"}}];var or=document.createElement("canvas");var V0=new Ne,k0=new Y,H0=new Y,G0=new Y;var Ft=xs(lr(),1);import{WEBGL as gc,Game as xc,Scale as cr}from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";import{Scene as cc}from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";var st={Boot:"Boot",MainGame:"MainGame",GameOver:"GameOver",MainMenu:"MainMenu",Preloader:"Preloader"};var K={background:{name:"background",path:"assets/bg.png",position:{x:512,y:384},backgroundColor:16768660},denoLogo:{name:"deno-logo",path:"assets/deno-logo.png",position:{x:390,y:195},animationProps:{amplitude:1,fastFrequency:.006,frequency:.004,smallAmplitude:8}},phaserLogo:{name:"phaser-logo",path:"assets/phaser-logo.png",position:{x:512,y:400},animationProps:{amplitude:1,fastFrequency:.006,frequency:.004,smallAmplitude:5}},heartLogo:{name:"heart-logo",path:"assets/heart.png",position:{x:600,y:195},animationProps:{baseScale:1,frequency:.004,scaleRange:.15}}};var Ut=class{constructor(t){this.scene=t}createImage(t){return this.scene.add.image(t.position.x,t.position.y,t.name)}createAnimatedLogo(t,e){let n=this.createImage(t);return n.setData("animation",e),n}};function lc(g){return Object.values(g).map(t=>({name:t.name,path:t.path}))}function cs(g,t){lc(t).forEach(n=>{g.load.image(n.name,n.path)})}var _e=class{amplitude;frequency;position;smallAmplitude;fastFrequency;direction;constructor({amplitude:t,frequency:e,position:n,smallAmplitude:i=0,fastFrequency:s=0,direction:o="vertical"}){this.amplitude=t,this.frequency=e,this.position=n,this.smallAmplitude=i,this.fastFrequency=s,this.direction=o}apply(t,e){let n=this.amplitude*Math.sin(this.frequency*e),i=this.smallAmplitude*Math.sin(this.fastFrequency*e);this.direction==="horizontal"?t.x=this.position.x+n+i:t.y=this.position.y+n+i}},Ye=class{baseScale;scaleRange;frequency;constructor({baseScale:t,scaleRange:e,frequency:n}){this.baseScale=t,this.scaleRange=e,this.frequency=n}apply(t,e){t.scale=Math.abs((this.baseScale+this.scaleRange)/4+Math.sin(e*this.frequency*2))}};var Ze=class extends cc{constructor(){super(st.Boot)}preload(){cs(this,K)}create(){this.scene.start(st.Preloader)}};import{Scene as hc}from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";var $e=class extends hc{constructor(){super(st.Preloader)}init(){}preload(){}create(){this.scene.start(st.MainMenu)}};import{Scene as uc}from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";var Je=class extends uc{camera;background;gameObjectFactory;constructor(){super(st.GameOver),this.gameObjectFactory=new Ut(this)}create(){this.camera=this.cameras.main,this.camera.setBackgroundColor(K.background.backgroundColor),this.background=this.gameObjectFactory.createImage(K.background),this.background.setAlpha(.5),this.add.text(512,384,"Game Over",{fontFamily:"Arial Black",fontSize:64,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5),this.input.once("pointerdown",()=>{this.scene.start(st.MainMenu)})}};import{Input as dc,Scene as fc}from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";var Ke=class extends fc{camera;background;gameObjectFactory;constructor(){super(st.MainGame),this.gameObjectFactory=new Ut(this)}create(){this.camera=this.cameras.main,this.camera.setBackgroundColor(K.background.backgroundColor),this.background=this.gameObjectFactory.createImage(K.background),this.background.setAlpha(.5),this.add.text(512,384,`Make something fun!
and share it with:
support@phaser.io`,{fontFamily:"Arial Black",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5),this.input.once(dc.Events.GAMEOBJECT_POINTER_DOWN,()=>{this.scene.start(st.GameOver)})}};import{Input as pc,Scene as mc}from"https://cdnjs.cloudflare.com/ajax/libs/phaser/3.87.0/phaser.esm.min.js";var Qe=class extends mc{camera;gameObjectFactory;animatedLogos=[];constructor(){super({key:st.MainMenu}),this.gameObjectFactory=new Ut(this)}create(){this.camera=this.cameras.main,this.camera.setBackgroundColor(K.background.backgroundColor),this.gameObjectFactory.createImage(K.background);let t=K.denoLogo.animationProps,e=K.phaserLogo.animationProps,n=K.heartLogo.animationProps,i=[this.gameObjectFactory.createAnimatedLogo(K.denoLogo,new _e({...t,position:K.denoLogo.position})),this.gameObjectFactory.createAnimatedLogo(K.phaserLogo,new _e({...e,position:K.phaserLogo.position})),this.gameObjectFactory.createAnimatedLogo(K.heartLogo,new Ye({...n}))];this.animatedLogos=i,this.add.text(512,600,"Main Menu",{fontFamily:"Arial Black",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5),this.input.once(pc.Events.GAMEOBJECT_POINTER_DOWN,()=>{this.scene.start(st.MainGame)})}update(t){this.animatedLogos.forEach(e=>{e.getData("animation").apply(e,t)})}};var vc={type:gc,width:1024,height:768,parent:"game-container",backgroundColor:"#FFDE94",scale:{mode:cr.FIT,autoCenter:cr.CENTER_BOTH},scene:[Ze,$e,Qe,Ke,Je]},s_=as(()=>new xc(vc)).withPhysics("assets/ammo");export{s_ as default};
/*! Bundled license information:

@yandeu/events/cjs/index.js:
  (**
   * @package      npmjs.com/package/@yandeu/events (events.min.js)
   *
   * @author       Arnout Kazemier (https://github.com/3rd-Eden)
   * @copyright    Copyright (c) 2014 Arnout Kazemier
   * @license      {@link https://github.com/primus/eventemitter3/blob/master/LICENSE|MIT}
   *
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/events
   * @license      {@link https://github.com/yandeu/events/blob/master/LICENSE|MIT}
   *)

matter-js/build/matter.js:
  (*!
   * matter-js 0.20.0 by @liabru
   * http://brm.io/matter-js/
   * License MIT
   * 
   * The MIT License (MIT)
   * 
   * Copyright (c) Liam Brummitt and contributors.
   * 
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   * 
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   * 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   *)

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

@enable3d/three-graphics/dist/plugins/cameras.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@yandeu/events/lib/index.js:
  (**
   * @package      npmjs.com/package/@yandeu/events (events.min.js)
   *
   * @author       Arnout Kazemier (https://github.com/3rd-Eden)
   * @copyright    Copyright (c) 2014 Arnout Kazemier
   * @license      {@link https://github.com/primus/eventemitter3/blob/master/LICENSE|MIT}
   *
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/events
   * @license      {@link https://github.com/yandeu/events/blob/master/LICENSE|MIT}
   *)

@enable3d/common/dist/physicsBody.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/extendedObject3D.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/extendedMesh.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/extendedGroup.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/shapes.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/constraints.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/three-to-ammo.js:
  (**
   * @author       Kevin Lee (https://github.com/InfiniteLee)
   * @copyright    Copyright (c) 2020 Kevin Lee; Project Url: https://github.com/InfiniteLee/three-to-ammo
   * @license      {@link https://github.com/InfiniteLee/three-to-ammo/blob/master/LICENSE|MPL-2.0}
   *)

@enable3d/ammo-physics/dist/torusShape.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/factories.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/collisionEvents.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/debugDrawer.js:
  (**
   * @author       Kevin Lee (https://github.com/InfiniteLee)
   * @copyright    Copyright (c) 2019 Kevin Lee; Project Url: https://github.com/InfiniteLee/ammo-debug-drawer
   * @license      {@link https://github.com/InfiniteLee/ammo-debug-drawer/blob/master/LICENSE|MPL-2.0}
   *)

@enable3d/common/dist/types.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/raycaster/closestRayResultCallback.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/raycaster/allHitsRayResultCallback.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/raycaster/raycaster.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/ammo-physics/dist/physics.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/core.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/plugins/loaders.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/plugins/lights.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/plugins/heightmap.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2022 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/plugins/transform.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/plugins/webxr.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/csg/index.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2022 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/phaser-extension/dist/third.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/phaser-extension/dist/scene3d.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/customCanvas.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@yandeu/tap/lib/index.js:
  (**
   * @package      npmjs.com/package/@yandeu/tap (tap.min.js)
   *
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/yandeu/tap
   * @license      {@link https://github.com/yandeu/tap/blob/master/LICENSE|MIT}
   * @description  Inspired by tapjs (https://www.npmjs.com/package/tapjs)
   *)

@enable3d/three-graphics/dist/flat/_misc.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/simpleSprite.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/actionSprite.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/spriteSheet.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/button.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/draw.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/flat.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/text.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/textureAtlas.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/physics/_misc.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/three-graphics/dist/flat/physics/physics.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/misc/joystick.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)

@enable3d/common/dist/misc/thirdPersonControls.js:
  (**
   * @description  This code has originally been copied from Sketchbook
   *
   * @author       swift502 <blaha.j502@gmail.com> (http://jblaha.art/)
   * @copyright    Copyright (c) 2018 swift502; Project Url: https://github.com/swift502/Sketchbook
   * @license      {@link https://github.com/swift502/Sketchbook/blob/master/LICENSE GPL-3.0}
   *
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE LGPL-3.0}
   *)

@enable3d/common/dist/misc/firstPersonControls.js:
  (**
   * @description  This code has originally been copied from Sketchbook
   *
   * @author       swift502 <blaha.j502@gmail.com> (http://jblaha.art/)
   * @copyright    Copyright (c) 2018 swift502; Project Url: https://github.com/swift502/Sketchbook
   * @license      {@link https://github.com/swift502/Sketchbook/blob/master/LICENSE GPL-3.0}
   *
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2021 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE LGPL-3.0}
   *)

@enable3d/phaser-extension/dist/index.js:
  (**
   * @author       Yannick Deubel (https://github.com/yandeu)
   * @copyright    Copyright (c) 2020 Yannick Deubel; Project Url: https://github.com/enable3d/enable3d
   * @license      {@link https://github.com/enable3d/enable3d/blob/master/LICENSE|LGPL-3.0}
   *)
*/
