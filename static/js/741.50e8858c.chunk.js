"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[741],{741:function(e,n,r){r.r(n),r.d(n,{default:function(){return ge}});var t=r(5671),s=r(3144),a=r(136),o=r(7277),i=r(2791),l=r(8687),c=r(2938),u=r(9439),d={userPhoto:"Users_userPhoto__UooOC",preloader:"Users_preloader__Sz3u6",textHeight:"Users_textHeight__TZEm0",line:"Users_line__ikUz1",myAlignCenter:"Users_myAlignCenter__ZhOwc",favImage:"Users_favImage__D12Gy",myCol:"Users_myCol__vRBAb",myImg:"Users_myImg__PIKPc",myCard:"Users_myCard__v+CzL"},f=r(6110);var h=r.p+"static/media/dialog-svgrepo-com.0d0c7d1c2dbd133450ec43d4683a2547.svg";var g=r.p+"static/media/star-.b5a91c838974fe9894b8b52694e8f9dd.svg";var p=r.p+"static/media/star+.8f12c1f646656dcb9d3b823059f13349.svg",m=r(1087),v=(r(7632),r(1413)),y=r(5987),x=r(1694),C=r.n(x),j=r(162),P=r(6445),Z=r(184),F=["active","disabled","className","style","activeLabel","children"],w=["children"],k=i.forwardRef((function(e,n){var r=e.active,t=e.disabled,s=e.className,a=e.style,o=e.activeLabel,i=e.children,l=(0,y.Z)(e,F),c=r||t?"span":P.Z;return(0,Z.jsx)("li",{ref:n,style:a,className:C()(s,"page-item",{active:r,disabled:t}),children:(0,Z.jsxs)(c,(0,v.Z)((0,v.Z)({className:"page-link"},l),{},{children:[i,r&&o&&(0,Z.jsx)("span",{className:"visually-hidden",children:o})]}))})}));k.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},k.displayName="PageItem";var T=k;function N(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,t=i.forwardRef((function(e,t){var s=e.children,a=(0,y.Z)(e,w);return(0,Z.jsxs)(k,(0,v.Z)((0,v.Z)({},a),{},{ref:t,children:[(0,Z.jsx)("span",{"aria-hidden":"true",children:s||n}),(0,Z.jsx)("span",{className:"visually-hidden",children:r})]}))}));return t.displayName=e,t}var b=N("First","\xab"),I=N("Prev","\u2039","Previous"),U=N("Ellipsis","\u2026","More"),_=N("Next","\u203a"),S=N("Last","\xbb"),A=["bsPrefix","className","size"],z=i.forwardRef((function(e,n){var r=e.bsPrefix,t=e.className,s=e.size,a=(0,y.Z)(e,A),o=(0,j.vE)(r,"pagination");return(0,Z.jsx)("ul",(0,v.Z)((0,v.Z)({ref:n},a),{},{className:C()(t,o,s&&"".concat(o,"-").concat(s))}))}));z.displayName="Pagination";var L=Object.assign(z,{First:b,Prev:I,Ellipsis:U,Item:T,Next:_,Last:S}),R=function(e){for(var n=e.totalUsersCount,r=e.pageSize,t=e.currentPage,s=e.onPageChanged,a=e.PortionSize,o=void 0===a?6:a,i=e.currentRangeLocal,l=e.onChangeRangeLocal,c=Math.ceil(n/r),u=[],d=1;d<=c;d++)u.push(d);var f=1+o*(i-1),h=o*i,g=u.filter((function(e){return e>=f&&e<=h})),p=function(e){"prevPortion"===e&&i>1&&l(-1),"nextPortion"===e&&l(1)},m=g.map((function(e){return(0,Z.jsxs)(L.Item,{active:e===t,onClick:function(){s(e)},children:[e," "]},e)}));return(0,Z.jsx)("div",{children:(0,Z.jsxs)(L,{className:"pagination align-items-center justify-content-center",children:[" ",(0,Z.jsx)(L.Prev,{onClick:function(){p("prevPortion")}})," ",m," ",(0,Z.jsx)(L.Next,{onClick:function(){p("nextPortion")}}),"  "]})})},O=r(1338),E=r(4266),M=r(5313),D=r(3360),B=r(9410),W=r(2592),q=function(e){var n=e.onChangeTerm,r=e.onChangeTermFunction,t=e.SetTermFunction,s=e.handleClick,a=e.setOnlyFriends,o=e.onlyFriends;return(0,Z.jsx)("div",{children:(0,Z.jsx)(M.Z,{children:(0,Z.jsxs)(E.Z,{direction:"horizontal",gap:3,className:"mx-1",children:[(0,Z.jsxs)(B.Z,{children:[(0,Z.jsx)(B.Z.Text,{children:(0,Z.jsx)(W.Z,{fluid:!0,src:p,className:d.favImage})}),(0,Z.jsx)(B.Z.Checkbox,{checked:o,onChange:function(e){a(e.currentTarget.checked)}}),(0,Z.jsx)(M.Z.Control,{type:"text",value:n,onChange:function(e){r(e)},onBlur:t,placeholder:"find users..."})," "]}),(0,Z.jsx)("div",{className:"vr"})," ",(0,Z.jsx)(D.Z,{onClick:s,type:"submit",children:"Find"})]})})})},H=r(9140),G=r(7022),K=r(9743),Y=r(9603),$=r(2677),J=function(e){var n=e.totalUsersCount,r=e.pageSize,t=e.currentPage,s=e.onPageChanged,a=e.users,o=e.followingInProgress,l=e.unfollowAPI,c=e.isAuth,v=e.followAPI,y=e.SetTermFunction,x=e.onChangeTerm,C=e.onChangeTermFunction,j=e.onChangeRangeLocal,P=e.currentRangeLocal,F=(e.myId,e.setOnlyFriends),w=e.onlyFriends,k=(0,i.useState)(""),T=(0,u.Z)(k,2),N=T[0],b=T[1];if(N)return N.message;try{O.d&&console.log("UsersBS");var I=function(e){var n=e.u,r=e.followUnfollowAPICallback,t=(e.buttonText,o.some((function(e){return e===n.id})));return(0,Z.jsx)("span",{children:(0,Z.jsx)(W.Z,{className:d.myImg,fluid:!0,src:n.followed?p:g,alt:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",title:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",onClick:function(){t||(c?r(n.id):alert("You are not authorized, please Login"))}})})},U=a.map((function(e){return(0,Z.jsxs)("div",{className:"my-2 col-12 col-sm-5 col-lg-2 d-inline-block",children:[" ",(0,Z.jsx)(H.Z,{className:d.myCard,children:(0,Z.jsxs)(H.Z.Body,{children:[(0,Z.jsx)(H.Z.Title,{className:"".concat(Y.Z.textMaxWidthCommon," ").concat(Y.Z.textMaxWidth8rem),children:e.name}),(0,Z.jsxs)(K.Z,{className:d.myRow,children:[(0,Z.jsx)($.Z,{className:d.myCol,children:(0,Z.jsxs)(m.OL,{to:"/profile/"+e.id,children:[" ",(0,Z.jsx)(W.Z,{fluid:!0,variant:"top",className:d.userPhoto,src:null!==e.photos.small?e.photos.small:f,alt:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",title:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"})," "]})}),(0,Z.jsx)($.Z,{className:d.img1,children:(0,Z.jsx)(m.OL,{to:"/dialogs/"+e.id,children:(0,Z.jsx)(W.Z,{fluid:!0,src:h,alt:"\u041d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433",title:"\u041d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433",className:d.myImg})})}),(0,Z.jsx)($.Z,{className:d.img1,children:(0,Z.jsx)("div",{children:e.followed?(0,Z.jsx)(I,{u:e,followUnfollowAPICallback:l,buttonText:"Remove"}):(0,Z.jsx)(I,{u:e,followUnfollowAPICallback:v,buttonText:"Add"})})})]}),(0,Z.jsx)(K.Z,{className:"".concat(Y.Z.textMaxWidthCommon," ").concat(Y.Z.textMaxWidth8rem),children:e.status&&(0,Z.jsx)("div",{children:e.status})})]})})]},e.id)})),_=(0,Z.jsx)(R,{totalUsersCount:n,pageSize:r,currentPage:t,onPageChanged:s,currentRangeLocal:P,onChangeRangeLocal:j});return(0,Z.jsxs)("div",{children:[(0,Z.jsx)("div",{className:d.minwidth}),(0,Z.jsxs)(G.Z,{fluid:!0,className:"d-block justify-content-center",children:[(0,Z.jsx)("h2",{className:Y.Z.pageHeader,children:"Users"}),(0,Z.jsxs)(K.Z,{children:[_,(0,Z.jsx)(q,{onChangeTerm:x,onChangeTermFunction:C,SetTermFunction:y,handleClick:function(e){e.preventDefault(),y()},setOnlyFriends:F,onlyFriends:w})]}),(0,Z.jsxs)(K.Z,{children:[(0,Z.jsxs)("div",{className:"d-flex justify-content-center opacity-50 mt-2 ",children:[" Total: ",n]}),(0,Z.jsx)("div",{className:d.line})]}),(0,Z.jsxs)(K.Z,{children:[U," "]}),(0,Z.jsx)(K.Z,{className:"mt-3",children:_})]})]})}catch(N){b(N)}},Q=r(8570),V="NOT_FOUND";var X=function(e,n){return e===n};function ee(e,n){var r="object"===typeof n?n:{equalityCheck:n},t=r.equalityCheck,s=void 0===t?X:t,a=r.maxSize,o=void 0===a?1:a,i=r.resultEqualityCheck,l=function(e){return function(n,r){if(null===n||null===r||n.length!==r.length)return!1;for(var t=n.length,s=0;s<t;s++)if(!e(n[s],r[s]))return!1;return!0}}(s),c=1===o?function(e){var n;return{get:function(r){return n&&e(n.key,r)?n.value:V},put:function(e,r){n={key:e,value:r}},getEntries:function(){return n?[n]:[]},clear:function(){n=void 0}}}(l):function(e,n){var r=[];function t(e){var t=r.findIndex((function(r){return n(e,r.key)}));if(t>-1){var s=r[t];return t>0&&(r.splice(t,1),r.unshift(s)),s.value}return V}return{get:t,put:function(n,s){t(n)===V&&(r.unshift({key:n,value:s}),r.length>e&&r.pop())},getEntries:function(){return r},clear:function(){r=[]}}}(o,l);function u(){var n=c.get(arguments);if(n===V){if(n=e.apply(null,arguments),i){var r=c.getEntries(),t=r.find((function(e){return i(e.value,n)}));t&&(n=t.value)}c.put(arguments,n)}return n}return u.clearCache=function(){return c.clear()},u}function ne(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var r=n.map((function(e){return"function"===typeof e?"function "+(e.name||"unnamed")+"()":typeof e})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+r+"]")}return n}function re(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),t=1;t<n;t++)r[t-1]=arguments[t];var s=function(){for(var n=arguments.length,t=new Array(n),s=0;s<n;s++)t[s]=arguments[s];var a,o=0,i={memoizeOptions:void 0},l=t.pop();if("object"===typeof l&&(i=l,l=t.pop()),"function"!==typeof l)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof l+"]");var c=i,u=c.memoizeOptions,d=void 0===u?r:u,f=Array.isArray(d)?d:[d],h=ne(t),g=e.apply(void 0,[function(){return o++,l.apply(null,arguments)}].concat(f)),p=e((function(){for(var e=[],n=h.length,r=0;r<n;r++)e.push(h[r].apply(null,arguments));return a=g.apply(null,e)}));return Object.assign(p,{resultFunc:l,memoizedResultFunc:g,dependencies:h,lastResult:function(){return a},recomputations:function(){return o},resetRecomputations:function(){return o=0}}),p};return s}var te=re(ee),se=function(e){return e.usersPage.pageSize},ae=function(e){return e.usersPage.totalUsersCount},oe=function(e){return e.usersPage.currentPage},ie=function(e){return e.usersPage.isFetching},le=function(e){return e.usersPage.followingInProgress},ce=function(e){return e.auth.isAuth},ue=function(e){return e.usersPage.onlyFriends},de=te((function(e){return e.usersPage.users}),(function(e){return e})),fe=function(e){(0,a.Z)(r,e);var n=(0,o.Z)(r);function r(e){var s;return(0,t.Z)(this,r),(s=n.call(this,e)).onChangeTermFunction=function(e){s.setState({onChangeTerm:e.currentTarget.value})},s.onChangeRangeLocal=function(e){s.setState({currentRangeLocal:s.state.currentRangeLocal+e})},s.SetTermFunction=function(){s.props.setTerm(s.state.onChangeTerm)},s.onPageChanged=function(e){var n=s.props,r=n.setCurrentPage,t=n.getUsersThunkCreator,a=n.pageSize,o=n.term,i=n.onlyFriends;r(e),t(e,a,o,i)},s.followAPI=function(e){s.props.followThunkCreator(e,s.props.currentPage,s.props.pageSize,s.props.term,s.props.onlyFriends)},s.unfollowAPI=function(e){s.props.unfollowThunkCreator(e,s.props.currentPage,s.props.pageSize,s.props.term,s.props.onlyFriends)},s.state={onChangeTerm:s.props.term,currentRangeLocal:1},s}return(0,s.Z)(r,[{key:"componentDidMount",value:function(){var e=this.props;(0,e.getUsersThunkCreator)(e.currentPage,e.pageSize,e.term,e.onlyFriends)}},{key:"componentDidUpdate",value:function(e,n,r){if(e.term!==this.props.term||e.onlyFriends!==this.props.onlyFriends){this.props.setCurrentPage(1),this.setState({currentRangeLocal:1});var t=this.props;(0,t.getUsersThunkCreator)(1,t.pageSize,t.term,t.onlyFriends)}}},{key:"render",value:function(){var e=this.props,n=e.isFetching,r=e.totalUsersCount,t=e.pageSize,s=e.currentPage,a=e.users,o=e.followingInProgress,i=e.isAuth;return(0,Z.jsxs)(Z.Fragment,{children:[" ",n&&(0,Z.jsx)(Q.Z,{}),(0,Z.jsx)(J,{onPageChanged:this.onPageChanged,totalUsersCount:r,pageSize:t,currentPage:s,users:a,unfollowAPI:this.unfollowAPI,followAPI:this.followAPI,followingInProgress:o,isAuth:i,SetTermFunction:this.SetTermFunction,onChangeTerm:this.state.onChangeTerm,onChangeTermFunction:this.onChangeTermFunction,currentRangeLocal:this.state.currentRangeLocal,onChangeRangeLocal:this.onChangeRangeLocal,myId:this.props.myId,setOnlyFriends:this.props.setOnlyFriends,onlyFriends:this.props.onlyFriends})]})}}]),r}(i.Component),he=(0,l.$j)((function(e){return{users:de(e),pageSize:se(e),totalUsersCount:ae(e),currentPage:oe(e),isFetching:ie(e),followingInProgress:le(e),isAuth:ce(e),term:e.usersPage.term,myId:e.auth.myId,onlyFriends:ue(e)}}),{setCurrentPage:c.D4,getUsersThunkCreator:c.Uk,followThunkCreator:c.AC,unfollowThunkCreator:c.Ow,setTerm:c.nS,setOnlyFriends:c.F3})(fe),ge=function(){return(0,Z.jsx)(he,{})}}}]);
//# sourceMappingURL=741.50e8858c.chunk.js.map