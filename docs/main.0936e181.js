parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"g7hl":[function(require,module,exports) {
var e=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))(function(a,c){function o(e){try{l(n.next(e))}catch(t){c(t)}}function i(e){try{l(n.throw(e))}catch(t){c(t)}}function l(e){e.done?a(e.value):new r(function(t){t(e.value)}).then(o,i)}l((n=n.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,n,a,c,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return c={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function i(c){return function(i){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;o;)try{if(r=1,n&&(a=2&c[0]?n.return:c[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,c[1])).done)return a;switch(n=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,n=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){o=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){o.label=c[1];break}if(6===c[0]&&o.label<a[1]){o.label=a[1],a=c;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(c);break}a[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(i){c=[6,i],n=0}finally{r=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,i])}}},r=this,n=document.querySelector(".main-header__sing-in"),a=document.querySelector(".modal-login"),c=a.querySelector(".modal-login__button--close"),o=a.querySelector(".modal-login__form"),i=a.querySelector("[name=login]"),l=a.querySelector("[name=email]"),s=a.querySelector("[name=password]"),u=document.querySelector(".modal-overlay");n.addEventListener("click",function(e){e.preventDefault(),a.classList.add("modal-show"),u.classList.add("modal-show")}),c.addEventListener("click",function(e){e.preventDefault(),a.classList.remove("modal-show"),u.classList.remove("modal-show")}),u.addEventListener("click",function(e){e.preventDefault(),a.classList.remove("modal-show"),u.classList.remove("modal-show")}),window.addEventListener("keydown",function(e){"Escape"===e.key&&(e.preventDefault(),a.classList.remove("modal-show"),u.classList.remove("modal-show"))}),o.addEventListener("submit",function(e){e.preventDefault(),a.classList.remove("modal-show"),u.classList.remove("modal-show"),console.warn("Вы вошли!")});var d="https://api.punkapi.com/v2/",m={FIRST:1,current:1,LAST:5},v=document.querySelectorAll(".beer-card"),p=document.querySelector(".pagination__list"),f=p.children,h=function(n){return e(r,void 0,void 0,function(){var e,r,a,c,o;return t(this,function(t){switch(t.label){case 0:return p.querySelector(".active").classList.remove("active"),f[n].classList.add("active"),e="/beers?page="+n+"&per_page=6",[4,fetch(d+e)];case 1:if(!(r=t.sent()).ok)throw new Error("Could not fetch "+e+", received "+r.status);return[4,r.json()];case 2:return a=t.sent(),c=a.map(b),x.innerHTML="",o=[],c.forEach(function(e){o.push(e.name),q(e)}),N(o),[2]}})})};h(m.current);var b=function(e){return{img:e.image_url,name:e.name,tagline:e.tagline,abv:e.abv,brewed:e.first_brewed,description:e.description}};p.addEventListener("click",function(e){e.preventDefault();var t=e.target;"A"===t.tagName&&("left"===t.innerText?m.current>m.FIRST&&g(w,t):"right"===t.innerText?m.current<m.LAST&&g(E,t):g(S,t))});var _,y=500,g=function(e,t){void 0===t&&(t=null),_&&window.clearTimeout(_),_=window.setTimeout(function(){e(t)},y)},w=function(){m.current-=1,h(m.current)},E=function(){m.current+=1,h(m.current)},S=function(e){m.current=+e.innerText,h(m.current)},L=[],x=document.querySelector(".main");x.addEventListener("click",function(e){var t=e.target;if("INPUT"===t.tagName){var r=t.parentElement.querySelector(".beer-card__beer-name").innerText;t.checked?localStorage.setItem("favorite_"+r,"true"):localStorage.removeItem("favorite_"+r)}});var C=!1,T=document.querySelector(".main-header__favorite");T.addEventListener("click",function(e){if(e.preventDefault(),C)C=!1,p.removeAttribute("style"),T.innerText="favorite",T.removeAttribute("style"),h(m.current);else{C=!0,p.setAttribute("style","visibility: hidden"),T.innerText="back",T.setAttribute("style","background-color: green");for(var t=new DocumentFragment,r=0,n=L;r<n.length;r++){var a=n[r],c=a.querySelector(".beer-card__beer-name").textContent;localStorage.getItem("favorite_"+c)&&t.appendChild(a)}x.innerHTML="",x.appendChild(t)}});var q=function(e){var t=document.createElement("article");t.className="beer-card";var r=document.createElement("img");r.className="beer-card__image",r.src=e.img,t.appendChild(r);var n=document.createElement("div");n.className="beer-card__wrapper";var a=document.createElement("p");a.className="beer-card__name",a.innerText="name: ";var c=document.createElement("span");c.className="beer-card__beer-name",c.innerText=e.name,a.appendChild(c),n.appendChild(a);var o=document.createElement("p");o.className="beer-card__tagline",o.innerText="tagline: "+e.tagline,n.appendChild(o);var i=document.createElement("p");i.className="beer-card__abv",i.innerText="abv: ";var l=document.createElement("span");l.className="beer-card__beer-abv",l.innerText=e.abv,i.appendChild(l),n.appendChild(i);var s=document.createElement("p");s.className="beer-card__brewed",s.innerText="brewed: "+e.brewed,n.appendChild(s),t.appendChild(n);var u=document.createElement("p");u.className="beer-card__description",t.appendChild(u),u.innerText="description: "+e.description;var d=document.createElement("input");if(d.className="beer-card__favorite-checkbox",d.type="checkbox",d.title="В избранное",localStorage.length>0&&(localStorage.getItem("favorite_"+e.name)?d.checked=!0:d.checked=!1),t.appendChild(d),x.appendChild(t),0!==L.length)for(var m=0,v=L;m<v.length;m++){if(v[m].querySelector(".beer-card__beer-name").textContent===e.name)return}L.push(t)},k=document.querySelector(".search-sort"),N=function(e){var t=k.querySelector(".search");t.removeEventListener("submit",o);var r=document.createElement("form");r.className="search";var n=document.createElement("input");n.type="search",n.name="search-input",n.setAttribute("list","beer"),n.required=!0;var a=document.createElement("datalist");a.id="beer",e.forEach(function(e){var t=document.createElement("option");t.value=e,a.appendChild(t)});var c=document.createElement("button");function o(t){t.preventDefault();var r=t.target[0];if(e.includes(r.value))for(var n=0,a=x.children;n<a.length;n++){var c=a[n];c.setAttribute("style",""),c.querySelector(".beer-card__name").textContent==="name: "+r.value&&c.setAttribute("style","border-color: red; order: -1;")}}c.className="button button--red",c.innerText="Search",c.type="submit",c.setAttribute("style","margin-left: 10px"),r.appendChild(n),r.appendChild(a),r.appendChild(c),x.appendChild(r),r.addEventListener("submit",o),k.replaceChild(r,t)},A=document.querySelector(".search-sort");A.addEventListener("click",function(e){var t=e.target;if(t.classList.contains("button__sort")&&(e.preventDefault(),t.classList.contains("button__sort"))){var r=t.className.match(/sort--(.*)/)[1];I(r)}});var D=!1,I=function(e){var t=[],r=[],n=document.querySelectorAll(".beer-card");n.forEach(function(r){var n=r.querySelector(".beer-card__beer-"+e).textContent;t.push(n)}),r=isNaN(t[0])?t.sort(function(e,t){return D?e<t:t<e}):t.sort(function(e,t){return D?e-t:t-e}),D=!D,n.forEach(function(t){var n=t.querySelector(".beer-card__beer-"+e);for(var a in r){var c=r[a];if(n.textContent===c){t.setAttribute("style","order: "+a);break}}})},F=function(e){e.innerHTML=""};
},{}]},{},["g7hl"], null)
//# sourceMappingURL=/main.0936e181.js.map