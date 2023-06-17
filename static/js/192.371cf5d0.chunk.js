"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[192],{5192:function(e,n,t){t.r(n),t.d(n,{default:function(){return pe}});var r=t(9439),a=t(6459),s="NOT_FOUND";var i=function(e,n){return e===n};function o(e,n){var t="object"===typeof n?n:{equalityCheck:n},r=t.equalityCheck,a=void 0===r?i:r,o=t.maxSize,c=void 0===o?1:o,u=t.resultEqualityCheck,l=function(e){return function(n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,a=0;a<r;a++)if(!e(n[a],t[a]))return!1;return!0}}(a),f=1===c?function(e){var n;return{get:function(t){return n&&e(n.key,t)?n.value:s},put:function(e,t){n={key:e,value:t}},getEntries:function(){return n?[n]:[]},clear:function(){n=void 0}}}(l):function(e,n){var t=[];function r(e){var r=t.findIndex((function(t){return n(e,t.key)}));if(r>-1){var a=t[r];return r>0&&(t.splice(r,1),t.unshift(a)),a.value}return s}return{get:r,put:function(n,a){r(n)===s&&(t.unshift({key:n,value:a}),t.length>e&&t.pop())},getEntries:function(){return t},clear:function(){t=[]}}}(c,l);function d(){var n=f.get(arguments);if(n===s){if(n=e.apply(null,arguments),u){var t=f.getEntries().find((function(e){return u(e.value,n)}));t&&(n=t.value)}f.put(arguments,n)}return n}return d.clearCache=function(){return f.clear()},d}function c(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];return function(){for(var n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];var s,i=0,o={memoizeOptions:void 0},c=r.pop();if("object"===typeof c&&(o=c,c=r.pop()),"function"!==typeof c)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof c+"]");var u=o.memoizeOptions,l=void 0===u?t:u,f=Array.isArray(l)?l:[l],d=function(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var t=n.map((function(e){return"function"===typeof e?"function "+(e.name||"unnamed")+"()":typeof e})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+t+"]")}return n}(r),g=e.apply(void 0,[function(){return i++,c.apply(null,arguments)}].concat(f)),v=e((function(){for(var e=[],n=d.length,t=0;t<n;t++)e.push(d[t].apply(null,arguments));return s=g.apply(null,e)}));return Object.assign(v,{resultFunc:c,memoizedResultFunc:g,dependencies:d,lastResult:function(){return s},recomputations:function(){return i},resetRecomputations:function(){return i=0}}),v}}var u=c(o),l=function(e){return e.usersPage.pageSize},f=function(e){return e.usersPage.totalUsersCount},d=function(e){return e.usersPage.currentPage},g=function(e){return e.usersPage.isFetching},v=function(e){return e.usersPage.followingInProgress},h=function(e){return e.auth.isAuth},m=function(e){return e.usersPage.onlyFriends},p=u((function(e){return e.usersPage.users}),(function(e){return e})),x=t(8687),y=t(5732),P=t(2791),j=t(6159),C="Users_userPhoto__5FOrl",_="Users_nameStatusCommon__IX8+8",N="Users_maxWidthcommon__XFAer",k="Users_maxWidth1Col__xpaYZ",b="Users_name__NXsmd",Z="Users_status__dd8C6",U="Users_Relative__EtQqz",w="Users_line__EXs9E",F="Users_favImage__Fih2I",I="Users_star__9qeVm",A="Users_usersOverflowAuto__bmqmJ",E="Users_usersHeaderDialogsPage__U9MWc",S="Users_usersHeaderUsersPage__kK3lQ",T=(t(7632),t(1413)),z=t(5987),O=t(1694),R=t.n(O),L=t(162),W=t(6445),X=t(184),q=["active","disabled","className","style","activeLabel","children"],M=["children"],D=P.forwardRef((function(e,n){var t=e.active,r=e.disabled,a=e.className,s=e.style,i=e.activeLabel,o=e.children,c=(0,z.Z)(e,q),u=t||r?"span":W.Z;return(0,X.jsx)("li",{ref:n,style:s,className:R()(a,"page-item",{active:t,disabled:r}),children:(0,X.jsxs)(u,(0,T.Z)((0,T.Z)({className:"page-link"},c),{},{children:[o,t&&i&&(0,X.jsx)("span",{className:"visually-hidden",children:i})]}))})}));D.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},D.displayName="PageItem";var H=D;function B(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,r=P.forwardRef((function(e,r){var a=e.children,s=(0,z.Z)(e,M);return(0,X.jsxs)(D,(0,T.Z)((0,T.Z)({},s),{},{ref:r,children:[(0,X.jsx)("span",{"aria-hidden":"true",children:a||n}),(0,X.jsx)("span",{className:"visually-hidden",children:t})]}))}));return r.displayName=e,r}var Q=B("First","\xab"),Y=B("Prev","\u2039","Previous"),G=B("Ellipsis","\u2026","More"),J=B("Next","\u203a"),K=B("Last","\xbb"),V=["bsPrefix","className","size"],$=P.forwardRef((function(e,n){var t=e.bsPrefix,r=e.className,a=e.size,s=(0,z.Z)(e,V),i=(0,L.vE)(t,"pagination");return(0,X.jsx)("ul",(0,T.Z)((0,T.Z)({ref:n},s),{},{className:R()(r,i,a&&"".concat(i,"-").concat(a))}))}));$.displayName="Pagination";var ee=Object.assign($,{First:Q,Prev:Y,Ellipsis:G,Item:H,Next:J,Last:K}),ne="Pagination_pagination__utrCy",te=(0,P.memo)((function(e){var n=e.totalUsersCount,t=e.pageSize,r=e.currentPage,a=e.onPageChanged,s=e.currentRangeLocal,i=e.onChangeRangeLocal;console.log("PaginationByCourse");for(var o=Math.ceil(n/t),c=[],u=1;u<=o;u++)c.push(u);var l=1+6*(s-1),f=6*s,d=c.filter((function(e){return e>=l&&e<=f})),g=function(e){"prevPortion"===e&&s>1&&i(-1),"nextPortion"===e&&i(1)},v=(0,P.memo)(ee.Item),h=(0,P.useMemo)((function(){return d.map((function(e){return(0,X.jsxs)(v,{active:e===r,onClick:function(){a(e)},children:[e," "]},e)}))}),[d]);return(0,X.jsx)("div",{className:ne,children:(0,X.jsxs)(ee,{className:"pagination align-items-center justify-content-center",children:[" ",(0,X.jsx)(ee.Prev,{onClick:function(){g("prevPortion")}})," ",h," ",(0,X.jsx)(ee.Next,{onClick:function(){g("nextPortion")}}),"  "]})})})),re=t(4266),ae=t(5313),se=t(3360),ie=t(9410),oe=t(2592);var ce=t.p+"static/media/star+.4046d1d2bf6ba05a1ba8049a83b6ed88.svg",ue=function(e){var n=e.onChangeTerm,t=e.onChangeTermFunction,r=(e.SetTermFunction,e.handleClick),a=e.setOnlyFriends,s=e.onlyFriends;console.log("InputButtonUsersRender");var i=(0,x.I0)(),o=(0,P.memo)(ie.Z);se.Z;return(0,X.jsx)("div",{children:(0,X.jsx)(ae.Z,{children:(0,X.jsxs)(re.Z,{direction:"horizontal",gap:3,className:"mx-1",children:[(0,X.jsxs)(o,{children:[(0,X.jsx)(ie.Z.Text,{children:(0,X.jsx)(oe.Z,{fluid:!0,src:ce,className:F})}),(0,X.jsx)(ie.Z.Checkbox,{checked:s,onChange:function(e){e&&e.target&&i(a(e.target.checked))}}),(0,X.jsx)(ae.Z.Control,{type:"text",value:n,onChange:function(e){t(e)},placeholder:"find users...",autoFocus:!0})," "]}),(0,X.jsx)("div",{className:"vr"})," ",(0,X.jsx)(se.Z,{onClick:r,type:"submit",children:"Find"})]})})})},le=t(9603),fe=t(1087),de=t(6110);var ge=t.p+"static/media/star-.bad0ce863655224a286a5a44a7b01c83.svg",ve=(0,P.memo)((function(e){var n=e.users,t=e.unfollowAPI,r=e.followAPI,a=e.followingInProgress,s=e.isAuth,i=e.patch,o=e.PageWidth;console.log("UserItems");var c="";"users"===i&&(c=function(e){var n="";return e<460&&(n="grid1col"),e>=460&&e<800&&(n="grid2col"),e>=800&&e<1200&&(n="grid3col"),e>=1200&&e<1600&&(n="grid4col"),e>=1600&&e<2e3&&(n="grid5col"),e>=2e3&&(n="grid6col"),n}(o)),"dialogs"===i&&(c="grid1col paddingTop55");var u=(0,P.memo)(oe.Z);return(0,X.jsxs)("div",{className:c,children:[" ",n.map((function(e){var n=a.some((function(n){return n===e.id})),o=e.followed?t:r,c=(0,X.jsx)(u,{fluid:!0,className:I,src:e.followed?ce:ge,alt:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",title:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",onClick:function(){n||(s?o(e.id):alert("You are not authorized, please Login"))}}),l=(0,X.jsx)(u,{fluid:!0,className:C,src:null!==e.photos.small?e.photos.small:de,alt:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",title:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"}),f=(0,X.jsxs)("span",{className:"".concat(_," ").concat(b," ").concat("users"===i?N:k),children:[e.name&&e.name," "]}),d=(0,X.jsxs)("span",{className:"".concat(_," ").concat(Z," ").concat("users"===i?N:k),children:[e.status&&e.status," "]});return(0,X.jsxs)("div",{className:U,children:[c,(0,X.jsxs)(fe.OL,{to:"/messages/"+e.id,children:[" ",l," ",f," ",d," "]})]},e.id)}))]})})),he=(0,P.memo)((function(e){var n=e.totalUsersCount,t=e.pageSize,a=e.currentPage,s=e.onPageChanged,i=e.users,o=e.followingInProgress,c=e.unfollowAPI,u=e.isAuth,l=e.followAPI,f=e.SetTermFunction,d=e.onChangeTerm,g=e.onChangeTermFunction,v=e.onChangeRangeLocal,h=e.currentRangeLocal,m=e.setOnlyFriends,p=e.onlyFriends,x=e.patch,y=e.PageWidth,j=(0,P.useState)({message:""}),C=(0,r.Z)(j,2),_=C[0],N=C[1],k=(0,P.useCallback)((function(e){e.preventDefault(),f()}),[f]);if(_.message)return _.message;try{var b=(0,X.jsxs)("div",{className:"mt-3",children:[" ",(0,X.jsx)(te,{totalUsersCount:n,pageSize:t,currentPage:a,onPageChanged:s,currentRangeLocal:h,onChangeRangeLocal:v})]}),Z=(0,X.jsx)(ue,{onChangeTerm:d,onlyFriends:p,onChangeTermFunction:g,SetTermFunction:f,setOnlyFriends:m,handleClick:k}),U=(0,X.jsxs)("div",{children:[" ",(0,X.jsxs)("div",{className:"d-flex justify-content-center opacity-50 mt-2 ",children:[" Total: ",n]}),(0,X.jsx)("div",{className:w})]}),F=(0,X.jsxs)("div",{className:"my-4",children:[" ",(0,X.jsx)(ve,{users:i,unfollowAPI:c,followAPI:l,followingInProgress:o,isAuth:u,patch:x,PageWidth:y})]});return(0,X.jsx)("div",{className:A,children:(0,X.jsxs)("div",{children:[(0,X.jsxs)("div",{className:"users"===x?S:E,children:[(0,X.jsx)("h2",{className:le.Z.pageHeader,children:"\u0427\u0430\u0442\u044b"})," ","users"===x&&b,Z," ","users"===x&&U," "]}),F]})})}catch(_){N(_)}})),me=t(5870),pe=function(e){(0,a.Z)(e);var n=(0,x.v9)(p),t=(0,x.v9)(l),s=(0,x.v9)(f),i=(0,x.v9)(d),o=(0,x.v9)(g),c=(0,x.v9)(v),u=(0,x.v9)(h),C=(0,x.v9)(m),_=(0,x.v9)((function(e){return e.usersPage.term})),N=(0,x.v9)((function(e){return e.app.patch})),k=(0,x.v9)((function(e){return e.app.PageWidth})),b=(0,x.I0)(),Z=y.XU.setCurrentPage,U=y.XU.setOnlyFriends,w=y.XU.setTerm,F=me.rP.setDialog2InitialState,I=(0,P.useState)(_),A=(0,r.Z)(I,2),E=A[0],S=A[1],T=(0,P.useState)(1),z=(0,r.Z)(T,2),O=z[0],R=z[1],L=(0,P.useCallback)((function(e){b(Z(e)),b((0,y.Uk)(e,t,_,C,0))}),[Z,y.Uk,t,_,C]),W=(0,P.useCallback)((function(e){b((0,y.AC)(e,i,t,_,C))}),[y.AC,i,t,_,C]),q=(0,P.useCallback)((function(e){b((0,y.Ow)(e,i,t,_,C))}),[y.Ow,i,t,_,C]),M=(0,P.useCallback)((function(){b(w(E))}),[w,E]),D=(0,P.useCallback)((function(e){S(e.currentTarget.value)}),[S]),H=(0,P.useCallback)((function(e){R(O+e)}),[R,O]);return(0,P.useEffect)((function(){b((0,y.Uk)(i,t,_,C,0))}),[i,y.Uk,C,t,_,b]),(0,P.useEffect)((function(){b(Z(1)),R(1),b((0,y.Uk)(1,t,_,C,0))}),[_,C,y.Uk,t,Z,b]),(0,P.useEffect)((function(){b(F())}),[F,b]),(0,X.jsxs)(X.Fragment,{children:[" ",o&&(0,X.jsx)(j.Z,{}),(0,X.jsx)(he,{onlyFriends:C,patch:N,PageWidth:k,pageSize:t,totalUsersCount:s,currentPage:i,isAuth:u,onChangeTerm:E,currentRangeLocal:O,users:(0,P.useMemo)((function(){return n}),[n]),followingInProgress:(0,P.useMemo)((function(){return c}),[c]),onPageChanged:L,unfollowAPI:q,followAPI:W,SetTermFunction:M,onChangeTermFunction:D,onChangeRangeLocal:H,setOnlyFriends:U})]})}},4266:function(e,n,t){t.d(n,{Z:function(){return h}});var r=t(3433),a=t(1413),s=t(5987),i=t(1694),o=t.n(i),c=t(2791),u=t(162),l=t(9439);function f(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.Hz,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u.cs,r=[];return Object.entries(e).forEach((function(e){var a=(0,l.Z)(e,2),s=a[0],i=a[1];null!=i&&("object"===typeof i?n.forEach((function(e){var n=i[e];if(null!=n){var a=e!==t?"-".concat(e):"";r.push("".concat(s).concat(a,"-").concat(n))}})):r.push("".concat(s,"-").concat(i)))})),r}var d=t(184),g=["as","bsPrefix","className","direction","gap"],v=c.forwardRef((function(e,n){var t=e.as,i=void 0===t?"div":t,c=e.bsPrefix,l=e.className,v=e.direction,h=e.gap,m=(0,s.Z)(e,g);c=(0,u.vE)(c,"horizontal"===v?"hstack":"vstack");var p=(0,u.pi)(),x=(0,u.zG)();return(0,d.jsx)(i,(0,a.Z)((0,a.Z)({},m),{},{ref:n,className:o().apply(void 0,[l,c].concat((0,r.Z)(f({gap:h},p,x))))}))}));v.displayName="Stack";var h=v}}]);
//# sourceMappingURL=192.371cf5d0.chunk.js.map