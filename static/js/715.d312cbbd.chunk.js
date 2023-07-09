"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[715],{6688:function(e,n,t){t.r(n),t.d(n,{default:function(){return me}});var r="NOT_FOUND";var a=function(e,n){return e===n};function i(e,n){var t="object"===typeof n?n:{equalityCheck:n},i=t.equalityCheck,s=void 0===i?a:i,o=t.maxSize,c=void 0===o?1:o,u=t.resultEqualityCheck,l=function(e){return function(n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,a=0;a<r;a++)if(!e(n[a],t[a]))return!1;return!0}}(s),f=1===c?function(e){var n;return{get:function(t){return n&&e(n.key,t)?n.value:r},put:function(e,t){n={key:e,value:t}},getEntries:function(){return n?[n]:[]},clear:function(){n=void 0}}}(l):function(e,n){var t=[];function a(e){var a=t.findIndex((function(t){return n(e,t.key)}));if(a>-1){var i=t[a];return a>0&&(t.splice(a,1),t.unshift(i)),i.value}return r}return{get:a,put:function(n,i){a(n)===r&&(t.unshift({key:n,value:i}),t.length>e&&t.pop())},getEntries:function(){return t},clear:function(){t=[]}}}(c,l);function d(){var n=f.get(arguments);if(n===r){if(n=e.apply(null,arguments),u){var t=f.getEntries().find((function(e){return u(e.value,n)}));t&&(n=t.value)}f.put(arguments,n)}return n}return d.clearCache=function(){return f.clear()},d}function s(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];var i,s=0,o={memoizeOptions:void 0},c=r.pop();if("object"===typeof c&&(o=c,c=r.pop()),"function"!==typeof c)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof c+"]");var u=o.memoizeOptions,l=void 0===u?t:u,f=Array.isArray(l)?l:[l],d=function(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var t=n.map((function(e){return"function"===typeof e?"function "+(e.name||"unnamed")+"()":typeof e})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+t+"]")}return n}(r),v=e.apply(void 0,[function(){return s++,c.apply(null,arguments)}].concat(f)),m=e((function(){for(var e=[],n=d.length,t=0;t<n;t++)e.push(d[t].apply(null,arguments));return i=v.apply(null,e)}));return Object.assign(m,{resultFunc:c,memoizedResultFunc:v,dependencies:d,lastResult:function(){return i},recomputations:function(){return s},resetRecomputations:function(){return s=0}}),m}}var o=s(i),c=function(e){return e.usersPage.pageSize},u=function(e){return e.usersPage.totalUsersCount},l=function(e){return e.usersPage.currentPage},f=function(e){return e.usersPage.followingInProgress},d=function(e){return e.auth.isAuth},v=function(e){return e.usersPage.onlyFriends},m=o((function(e){return e.usersPage.users}),(function(e){return e})),p=t(8687),h=t(5732),g=t(2791),x="Users_userPhoto__5FOrl",_="Users_nameStatusCommon__IX8+8",j="Users_maxWidthcommon__XFAer",y="Users_maxWidth1Col__xpaYZ",P="Users_name__NXsmd",N="Users_status__dd8C6",C="Users_Relative__EtQqz",Z="Users_line__EXs9E",b="Users_favImage__Fih2I",w="Users_star__9qeVm",k="Users_usersHeaderDialogsPage__U9MWc",I=t(9603),E=t(9439),F=(t(7632),t(1413)),U=t(5987),A=t(1694),O=t.n(A),S=t(162),z=t(6445),M=t(184),R=["active","disabled","className","style","activeLabel","children"],T=["children"],W=g.forwardRef((function(e,n){var t=e.active,r=e.disabled,a=e.className,i=e.style,s=e.activeLabel,o=e.children,c=(0,U.Z)(e,R),u=t||r?"span":z.Z;return(0,M.jsx)("li",{ref:n,style:i,className:O()(a,"page-item",{active:t,disabled:r}),children:(0,M.jsxs)(u,(0,F.Z)((0,F.Z)({className:"page-link"},c),{},{children:[o,t&&s&&(0,M.jsx)("span",{className:"visually-hidden",children:s})]}))})}));W.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},W.displayName="PageItem";var L=W;function q(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,r=g.forwardRef((function(e,r){var a=e.children,i=(0,U.Z)(e,T);return(0,M.jsxs)(W,(0,F.Z)((0,F.Z)({},i),{},{ref:r,children:[(0,M.jsx)("span",{"aria-hidden":"true",children:a||n}),(0,M.jsx)("span",{className:"visually-hidden",children:t})]}))}));return r.displayName=e,r}var H=q("First","\xab"),X=q("Prev","\u2039","Previous"),B=q("Ellipsis","\u2026","More"),D=q("Next","\u203a"),V=q("Last","\xbb"),G=["bsPrefix","className","size"],Y=g.forwardRef((function(e,n){var t=e.bsPrefix,r=e.className,a=e.size,i=(0,U.Z)(e,G),s=(0,S.vE)(t,"pagination");return(0,M.jsx)("ul",(0,F.Z)((0,F.Z)({ref:n},i),{},{className:O()(r,s,a&&"".concat(s,"-").concat(a))}))}));Y.displayName="Pagination";var Q=Object.assign(Y,{First:H,Prev:X,Ellipsis:B,Item:L,Next:D,Last:V}),J="Pagination_pagination__utrCy",K=function(e){for(var n=e.totalUsersCount,t=e.pageSize,r=e.currentPage,a=e.onPageChanged,i=e.currentRangeLocal,s=e.onChangeRangeLocal,o=Math.ceil(n/t),c=[],u=1;u<=o;u++)c.push(u);var l=1+6*(i-1),f=6*i,d=c.filter((function(e){return e>=l&&e<=f})),v=function(e){"prevPortion"===e&&i>1&&s(-1),"nextPortion"===e&&s(1)},m=d.map((function(e){return(0,M.jsxs)(Q.Item,{active:e===r,onClick:function(){a(e)},children:[e," "]},e)}));return(0,M.jsx)("div",{className:J,children:(0,M.jsxs)(Q,{className:"pagination align-items-center justify-content-center",children:[" ",(0,M.jsx)(Q.Prev,{onClick:function(){v("prevPortion")}})," ",m," ",(0,M.jsx)(Q.Next,{onClick:function(){v("nextPortion")}})," "]})})},$=function(){var e=(0,p.I0)(),n=h._B.setCurrentPage,t=(0,p.v9)(u),r=(0,p.v9)(c),a=(0,p.v9)(l),i=(0,p.v9)(v),s=(0,p.v9)((function(e){return e.usersPage.term})),o=(0,g.useState)(1),f=(0,E.Z)(o,2),d=f[0],m=f[1],x=function(t){console.log("Pagination Container \u043f\u0435\u0440\u0435\u0432\u043e\u0434\u0438\u043c \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"),e(n(t))};return(0,g.useEffect)((function(){1!==a&&(x(1),m(1))}),[i,s]),(0,M.jsx)("div",{children:(0,M.jsx)(K,{totalUsersCount:t,pageSize:r,currentPage:a,onPageChanged:x,currentRangeLocal:d,onChangeRangeLocal:function(e){m(d+e)}})})},ee=t(4266),ne=t(5313),te=t(3360),re=t(9410),ae=t(2592);var ie=t.p+"static/media/star+.4046d1d2bf6ba05a1ba8049a83b6ed88.svg",se=function(e){var n=e.onChangeTerm,t=e.setOnlyFriends,r=e.onlyFriends,a=e.SetTermFunction,i=e.setOnChangeTerm,s=(0,p.I0)();return(0,M.jsx)("div",{children:(0,M.jsx)(ne.Z,{children:(0,M.jsxs)(ee.Z,{direction:"horizontal",gap:3,className:"mx-1",children:[(0,M.jsxs)(re.Z,{children:[(0,M.jsx)(re.Z.Text,{children:(0,M.jsx)(ae.Z,{fluid:!0,src:ie,className:b})}),(0,M.jsx)(re.Z.Checkbox,{checked:r,onChange:function(e){s(t(e.target.checked))}}),(0,M.jsx)(ne.Z.Control,{type:"text",value:n,onChange:function(e){i(e.currentTarget.value)},placeholder:"find users...",autoFocus:!0})," "]}),(0,M.jsx)("div",{className:"vr"})," ",(0,M.jsx)(te.Z,{onClick:a,type:"submit",children:"Find"})]})})})},oe=function(){var e=(0,p.I0)(),n=h._B.setOnlyFriends,t=h._B.setTerm,r=(0,p.v9)(v),a=(0,p.v9)((function(e){return e.usersPage.term})),i=(0,g.useState)(a),s=(0,E.Z)(i,2),o=s[0],c=s[1];return(0,M.jsx)(se,{onChangeTerm:o,onlyFriends:r,setOnChangeTerm:c,SetTermFunction:function(){e(t(o))},setOnlyFriends:n})},ce=t(1087),ue=t(6110);var le=t.p+"static/media/star-.bad0ce863655224a286a5a44a7b01c83.svg",fe=function(e){var n=e.users,t=e.unfollowAPI,r=e.followAPI,a=e.followingInProgress,i=e.isAuth,s=e.patch,o=e.pageWidth,c="";"users"===s&&(c=function(e){var n="";return e<460&&(n="grid1col"),e>=460&&e<800&&(n="grid2col"),e>=800&&e<1200&&(n="grid3col"),e>=1200&&e<1600&&(n="grid4col"),e>=1600&&e<2e3&&(n="grid5col"),e>=2e3&&(n="grid6col"),n}(o)),"dialogs"===s&&(c="grid1col paddingTop55");var u=(0,g.memo)(ae.Z);return(0,M.jsxs)("div",{className:c,children:[" ",n.map((function(e){var n=a.some((function(n){return n===e.id})),o=e.followed?t:r,c=(0,M.jsx)(u,{fluid:!0,className:w,src:e.followed?ie:le,alt:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",title:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",onClick:function(){n||(i?o(e.id):alert("You are not authorized, please Login"))}}),l=(0,M.jsx)(u,{fluid:!0,className:x,src:null!==e.photos.small?e.photos.small:ue,alt:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",title:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),f=(0,M.jsxs)("span",{className:"".concat(_," ").concat(P," ").concat("users"===s?j:y),children:[e.name&&e.name," "]}),d=(0,M.jsxs)("span",{className:"".concat(_," ").concat(N," ").concat("users"===s?j:y),children:[e.status&&e.status," "]});return(0,M.jsxs)("div",{className:C,children:[c,(0,M.jsxs)(ce.OL,{to:"/messages/"+e.id,children:[" ",l," ",f," ",d," "]})]},e.id)}))]})},de=function(){var e=(0,p.I0)(),n=(0,p.v9)(m),t=(0,p.v9)(f),r=(0,p.v9)(l),a=(0,p.v9)(d),i=(0,p.v9)((function(e){return e.app.patch})),s=(0,p.v9)((function(e){return e.app.pageWidth}));return(0,M.jsxs)("div",{className:"my-4",children:[" ",(0,M.jsx)(fe,{users:n,unfollowAPI:function(n){e((0,h.Ow)(n,r))},followAPI:function(n){e((0,h.AC)(n,r))},followingInProgress:t,isAuth:a,patch:i,pageWidth:s})]})},ve=t(9725),me=function(){var e=ve.PN.setDialog2InitialState,n=(0,p.v9)(l),t=(0,p.v9)(u),r=(0,p.v9)((function(e){return e.app.patch})),a=(0,p.v9)(v),i=(0,p.v9)((function(e){return e.usersPage.term})),s=(0,p.v9)((function(e){return e.dialog2.d2Item})),o=(0,p.I0)();(0,g.useEffect)((function(){o((0,h.Uk)())}),[o,a,i,n]),(0,g.useEffect)((function(){s.id&&o(e())}),[e,o,s]);var c=(0,M.jsxs)("div",{children:[" ",(0,M.jsxs)("div",{className:"d-flex justify-content-center opacity-50 mt-2 ",children:[" Total: ",t]}),(0,M.jsx)("div",{className:Z})]}),f=(0,g.useMemo)((function(){return(0,M.jsx)($,{})}),[]),d=(0,g.useMemo)((function(){return(0,M.jsx)(oe,{})}),[]);return(0,M.jsxs)("div",{children:[(0,M.jsxs)("div",{className:"users"===r?"":k,children:[" ",(0,M.jsx)("h2",{className:I.Z.pageHeader,children:"\u0427\u0430\u0442\u044b"})," ","users"===r&&f," ",d," ","users"===r&&c," "]}),(0,M.jsx)(de,{})]})}},4266:function(e,n,t){t.d(n,{Z:function(){return p}});var r=t(3433),a=t(1413),i=t(5987),s=t(1694),o=t.n(s),c=t(2791),u=t(162),l=t(9439);function f(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.Hz,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u.cs,r=[];return Object.entries(e).forEach((function(e){var a=(0,l.Z)(e,2),i=a[0],s=a[1];null!=s&&("object"===typeof s?n.forEach((function(e){var n=s[e];if(null!=n){var a=e!==t?"-".concat(e):"";r.push("".concat(i).concat(a,"-").concat(n))}})):r.push("".concat(i,"-").concat(s)))})),r}var d=t(184),v=["as","bsPrefix","className","direction","gap"],m=c.forwardRef((function(e,n){var t=e.as,s=void 0===t?"div":t,c=e.bsPrefix,l=e.className,m=e.direction,p=e.gap,h=(0,i.Z)(e,v);c=(0,u.vE)(c,"horizontal"===m?"hstack":"vstack");var g=(0,u.pi)(),x=(0,u.zG)();return(0,d.jsx)(s,(0,a.Z)((0,a.Z)({},h),{},{ref:n,className:o().apply(void 0,[l,c].concat((0,r.Z)(f({gap:p},g,x))))}))}));m.displayName="Stack";var p=m},9603:function(e,n){n.Z={pageHeader:"common_pageHeader__q6GZ3",center:"common_center__il3qC",textMaxWidthCommon:"common_textMaxWidthCommon__Sc3Hi",textMaxWidthShort:"common_textMaxWidthShort__X1+BN",textMaxWidth18rem:"common_textMaxWidth18rem__Vv4xN",minwidth:"common_minwidth__MMj4g",cursorPointer:"common_cursorPointer__nfAEV",toCenter:"common_toCenter__rOaC2"}}}]);
//# sourceMappingURL=715.d312cbbd.chunk.js.map