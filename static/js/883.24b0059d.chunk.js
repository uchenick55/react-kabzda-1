"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[883],{4883:function(e,n,t){t.r(n),t.d(n,{default:function(){return ge}});var r=t(5671),s=t(3144),o=t(136),a=t(7277),i=t(2791),l=t(8687),u=t(2938),c=t(9439),d={userPhoto:"Users_userPhoto__UooOC",users:"Users_users__uG5mD",preloader:"Users_preloader__Sz3u6",textHeight:"Users_textHeight__TZEm0",line:"Users_line__ikUz1",myAlignCenter:"Users_myAlignCenter__ZhOwc",textMaxWidth:"Users_textMaxWidth__ol8mw",favImage:"Users_favImage__D12Gy"},f=t(6110);var h=t.p+"static/media/dialog-svgrepo-com.0d0c7d1c2dbd133450ec43d4683a2547.svg";var g=t.p+"static/media/star-.b5a91c838974fe9894b8b52694e8f9dd.svg";var p=t.p+"static/media/star+.8f12c1f646656dcb9d3b823059f13349.svg",m=t(1087),v=(t(7632),t(1413)),x=t(5987),y=t(1694),C=t.n(y),j=t(162),P=t(6445),Z=t(184),F=["active","disabled","className","style","activeLabel","children"],w=["children"],k=i.forwardRef((function(e,n){var t=e.active,r=e.disabled,s=e.className,o=e.style,a=e.activeLabel,i=e.children,l=(0,x.Z)(e,F),u=t||r?"span":P.Z;return(0,Z.jsx)("li",{ref:n,style:o,className:C()(s,"page-item",{active:t,disabled:r}),children:(0,Z.jsxs)(u,(0,v.Z)((0,v.Z)({className:"page-link"},l),{},{children:[i,t&&a&&(0,Z.jsx)("span",{className:"visually-hidden",children:a})]}))})}));k.defaultProps={active:!1,disabled:!1,activeLabel:"(current)"},k.displayName="PageItem";var T=k;function b(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,r=i.forwardRef((function(e,r){var s=e.children,o=(0,x.Z)(e,w);return(0,Z.jsxs)(k,(0,v.Z)((0,v.Z)({},o),{},{ref:r,children:[(0,Z.jsx)("span",{"aria-hidden":"true",children:s||n}),(0,Z.jsx)("span",{className:"visually-hidden",children:t})]}))}));return r.displayName=e,r}var N=b("First","\xab"),S=b("Prev","\u2039","Previous"),U=b("Ellipsis","\u2026","More"),I=b("Next","\u203a"),_=b("Last","\xbb"),A=["bsPrefix","className","size"],z=i.forwardRef((function(e,n){var t=e.bsPrefix,r=e.className,s=e.size,o=(0,x.Z)(e,A),a=(0,j.vE)(t,"pagination");return(0,Z.jsx)("ul",(0,v.Z)((0,v.Z)({ref:n},o),{},{className:C()(r,a,s&&"".concat(a,"-").concat(s))}))}));z.displayName="Pagination";var L=Object.assign(z,{First:N,Prev:S,Ellipsis:U,Item:T,Next:I,Last:_}),R=function(e){for(var n=e.totalUsersCount,t=e.pageSize,r=e.currentPage,s=e.onPageChanged,o=e.PortionSize,a=void 0===o?7:o,i=e.currentRangeLocal,l=e.onChangeRangeLocal,u=Math.ceil(n/t),c=[],d=1;d<=u;d++)c.push(d);var f=1+a*(i-1),h=a*i,g=c.filter((function(e){return e>=f&&e<=h})),p=function(e){"prevPortion"===e&&i>1&&l(-1),"nextPortion"===e&&l(1)},m=g.map((function(e){return(0,Z.jsxs)(L.Item,{active:e===r,onClick:function(){s(e)},children:[e," "]},e)}));return(0,Z.jsx)("div",{children:(0,Z.jsxs)(L,{className:"pagination align-items-center justify-content-center",children:[" ",(0,Z.jsx)(L.Prev,{onClick:function(){p("prevPortion")}})," ",m," ",(0,Z.jsx)(L.Next,{onClick:function(){p("nextPortion")}}),"  "]})})},O=t(1338),E=t(4266),D=t(5313),M=t(3360),W=t(9410),q=t(2592),B=function(e){var n=e.onChangeTerm,t=e.onChangeTermFunction,r=e.SetTermFunction,s=e.handleClick,o=e.setOnlyFriends,a=e.onlyFriends;return(0,Z.jsx)("div",{children:(0,Z.jsx)(D.Z,{children:(0,Z.jsxs)(E.Z,{direction:"horizontal",gap:3,className:"mx-1",children:[(0,Z.jsxs)(W.Z,{children:[(0,Z.jsx)(W.Z.Text,{children:(0,Z.jsx)(q.Z,{fluid:!0,src:p,className:d.favImage})}),(0,Z.jsx)(W.Z.Checkbox,{checked:a,onChange:function(e){o(e.currentTarget.checked)}}),(0,Z.jsx)(D.Z.Control,{type:"text",value:n,onChange:function(e){t(e)},onBlur:r,placeholder:"find users..."})," "]}),(0,Z.jsx)("div",{className:"vr"})," ",(0,Z.jsx)(M.Z,{onClick:s,type:"submit",children:"Find"})]})})})},H=t(9140),G=t(7022),Y=t(9743),$=t(9603),J=t(2677),K=function(e){var n=e.totalUsersCount,t=e.pageSize,r=e.currentPage,s=e.onPageChanged,o=e.users,a=e.followingInProgress,l=e.unfollowAPI,u=e.isAuth,v=e.followAPI,x=e.SetTermFunction,y=e.onChangeTerm,C=e.onChangeTermFunction,j=e.onChangeRangeLocal,P=e.currentRangeLocal,F=e.myId,w=e.setOnlyFriends,k=e.onlyFriends,T=(0,i.useState)(""),b=(0,c.Z)(T,2),N=b[0],S=b[1];if(N)return N.message;try{O.d&&console.log("UsersBS");var U=function(e){var n=e.u,t=e.followUnfollowAPICallback;e.buttonText;return(0,Z.jsx)("span",{children:(0,Z.jsxs)(M.Z,{variant:"light",disabled:a.some((function(e){return e===n.id}))||n.id===F,onClick:function(){u?t(n.id):alert("You are not authorized, please Login")},children:[" ",!n.followed&&(0,Z.jsx)(q.Z,{fluid:!0,src:g,alt:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435",title:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0432 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0435"}),n.followed&&(0,Z.jsx)(q.Z,{fluid:!0,src:p,alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e",title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043d\u043d\u043e\u0433\u043e"})]})})},I=o.map((function(e){return(0,Z.jsxs)("div",{className:"my-2 col-12 col-sm-3 col-lg-2 d-inline-block",children:[" ",(0,Z.jsxs)(H.Z,{children:[(0,Z.jsxs)(m.OL,{to:"/profile/"+e.id,children:[" ",(0,Z.jsx)(q.Z,{fluid:!0,variant:"top",className:d.userPhoto,src:null!==e.photos.small?e.photos.large:f,alt:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c",title:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"})," "]}),(0,Z.jsxs)(H.Z.Body,{children:[(0,Z.jsx)(H.Z.Title,{className:$.Z.textMaxWidth,children:e.name}),(0,Z.jsxs)(Y.Z,{children:[(0,Z.jsx)(J.Z,{children:(0,Z.jsx)("div",{children:e.followed?(0,Z.jsx)(U,{u:e,followUnfollowAPICallback:l,buttonText:"Remove"}):(0,Z.jsx)(U,{u:e,followUnfollowAPICallback:v,buttonText:"Add"})})}),(0,Z.jsx)(J.Z,{children:(0,Z.jsx)(m.OL,{to:"/dialogs/"+e.id,children:(0,Z.jsx)(M.Z,{variant:"light",children:(0,Z.jsx)(q.Z,{fluid:!0,src:h,alt:"\u041d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433",title:"\u041d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433"})})})})]}),(0,Z.jsx)(Y.Z,{className:$.Z.textMaxWidth,children:e.status&&(0,Z.jsxs)("div",{children:["Status: ",e.status]})})]})]})]},e.id)})),_=(0,Z.jsx)(R,{totalUsersCount:n,pageSize:t,currentPage:r,onPageChanged:s,currentRangeLocal:P,onChangeRangeLocal:j});return(0,Z.jsxs)("div",{children:[(0,Z.jsx)("div",{className:d.minwidth}),(0,Z.jsxs)(G.Z,{fluid:!0,className:"d-block justify-content-center",children:[(0,Z.jsx)("h2",{className:$.Z.pageHeader,children:"Users"}),(0,Z.jsxs)(Y.Z,{children:[_,(0,Z.jsx)(B,{onChangeTerm:y,onChangeTermFunction:C,SetTermFunction:x,handleClick:function(e){e.preventDefault(),x()},setOnlyFriends:w,onlyFriends:k})]}),(0,Z.jsxs)(Y.Z,{children:[(0,Z.jsxs)("div",{className:"d-flex justify-content-center opacity-50 mt-2 ",children:[" Total: ",n]}),(0,Z.jsx)("div",{className:d.line})]}),(0,Z.jsxs)(Y.Z,{children:[I," "]}),(0,Z.jsx)(Y.Z,{className:"mt-3",children:_})]})]})}catch(N){S(N)}},Q=t(8570),V="NOT_FOUND";var X=function(e,n){return e===n};function ee(e,n){var t="object"===typeof n?n:{equalityCheck:n},r=t.equalityCheck,s=void 0===r?X:r,o=t.maxSize,a=void 0===o?1:o,i=t.resultEqualityCheck,l=function(e){return function(n,t){if(null===n||null===t||n.length!==t.length)return!1;for(var r=n.length,s=0;s<r;s++)if(!e(n[s],t[s]))return!1;return!0}}(s),u=1===a?function(e){var n;return{get:function(t){return n&&e(n.key,t)?n.value:V},put:function(e,t){n={key:e,value:t}},getEntries:function(){return n?[n]:[]},clear:function(){n=void 0}}}(l):function(e,n){var t=[];function r(e){var r=t.findIndex((function(t){return n(e,t.key)}));if(r>-1){var s=t[r];return r>0&&(t.splice(r,1),t.unshift(s)),s.value}return V}return{get:r,put:function(n,s){r(n)===V&&(t.unshift({key:n,value:s}),t.length>e&&t.pop())},getEntries:function(){return t},clear:function(){t=[]}}}(a,l);function c(){var n=u.get(arguments);if(n===V){if(n=e.apply(null,arguments),i){var t=u.getEntries(),r=t.find((function(e){return i(e.value,n)}));r&&(n=r.value)}u.put(arguments,n)}return n}return c.clearCache=function(){return u.clear()},c}function ne(e){var n=Array.isArray(e[0])?e[0]:e;if(!n.every((function(e){return"function"===typeof e}))){var t=n.map((function(e){return"function"===typeof e?"function "+(e.name||"unnamed")+"()":typeof e})).join(", ");throw new Error("createSelector expects all input-selectors to be functions, but received the following types: ["+t+"]")}return n}function te(e){for(var n=arguments.length,t=new Array(n>1?n-1:0),r=1;r<n;r++)t[r-1]=arguments[r];var s=function(){for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];var o,a=0,i={memoizeOptions:void 0},l=r.pop();if("object"===typeof l&&(i=l,l=r.pop()),"function"!==typeof l)throw new Error("createSelector expects an output function after the inputs, but received: ["+typeof l+"]");var u=i,c=u.memoizeOptions,d=void 0===c?t:c,f=Array.isArray(d)?d:[d],h=ne(r),g=e.apply(void 0,[function(){return a++,l.apply(null,arguments)}].concat(f)),p=e((function(){for(var e=[],n=h.length,t=0;t<n;t++)e.push(h[t].apply(null,arguments));return o=g.apply(null,e)}));return Object.assign(p,{resultFunc:l,memoizedResultFunc:g,dependencies:h,lastResult:function(){return o},recomputations:function(){return a},resetRecomputations:function(){return a=0}}),p};return s}var re=te(ee),se=function(e){return e.usersPage.pageSize},oe=function(e){return e.usersPage.totalUsersCount},ae=function(e){return e.usersPage.currentPage},ie=function(e){return e.usersPage.isFetching},le=function(e){return e.usersPage.followingInProgress},ue=function(e){return e.auth.isAuth},ce=function(e){return e.usersPage.onlyFriends},de=re((function(e){return e.usersPage.users}),(function(e){return e})),fe=function(e){(0,o.Z)(t,e);var n=(0,a.Z)(t);function t(e){var s;return(0,r.Z)(this,t),(s=n.call(this,e)).onChangeTermFunction=function(e){s.setState({onChangeTerm:e.currentTarget.value})},s.onChangeRangeLocal=function(e){s.setState({currentRangeLocal:s.state.currentRangeLocal+e})},s.SetTermFunction=function(){s.props.setTerm(s.state.onChangeTerm)},s.onPageChanged=function(e){var n=s.props,t=n.setCurrentPage,r=n.getUsersThunkCreator,o=n.pageSize,a=n.term,i=n.onlyFriends;t(e),r(e,o,a,i)},s.followAPI=function(e){s.props.followThunkCreator(e,s.props.currentPage,s.props.pageSize,s.props.term,s.props.onlyFriends)},s.unfollowAPI=function(e){s.props.unfollowThunkCreator(e,s.props.currentPage,s.props.pageSize,s.props.term,s.props.onlyFriends)},s.state={onChangeTerm:s.props.term,currentRangeLocal:1},s}return(0,s.Z)(t,[{key:"componentDidMount",value:function(){var e=this.props;(0,e.getUsersThunkCreator)(e.currentPage,e.pageSize,e.term,e.onlyFriends)}},{key:"componentDidUpdate",value:function(e,n,t){if(e.term!==this.props.term||e.onlyFriends!==this.props.onlyFriends){this.props.setCurrentPage(1),this.setState({currentRangeLocal:1});var r=this.props;(0,r.getUsersThunkCreator)(1,r.pageSize,r.term,r.onlyFriends)}}},{key:"render",value:function(){var e=this.props,n=e.isFetching,t=e.totalUsersCount,r=e.pageSize,s=e.currentPage,o=e.users,a=e.followingInProgress,i=e.isAuth;return(0,Z.jsxs)(Z.Fragment,{children:[" ",n&&(0,Z.jsx)(Q.Z,{}),(0,Z.jsx)(K,{onPageChanged:this.onPageChanged,totalUsersCount:t,pageSize:r,currentPage:s,users:o,unfollowAPI:this.unfollowAPI,followAPI:this.followAPI,followingInProgress:a,isAuth:i,SetTermFunction:this.SetTermFunction,onChangeTerm:this.state.onChangeTerm,onChangeTermFunction:this.onChangeTermFunction,currentRangeLocal:this.state.currentRangeLocal,onChangeRangeLocal:this.onChangeRangeLocal,myId:this.props.myId,setOnlyFriends:this.props.setOnlyFriends,onlyFriends:this.props.onlyFriends})]})}}]),t}(i.Component),he=(0,l.$j)((function(e){return{users:de(e),pageSize:se(e),totalUsersCount:oe(e),currentPage:ae(e),isFetching:ie(e),followingInProgress:le(e),isAuth:ue(e),term:e.usersPage.term,myId:e.auth.myId,onlyFriends:ce(e)}}),{setCurrentPage:u.D4,getUsersThunkCreator:u.Uk,followThunkCreator:u.AC,unfollowThunkCreator:u.Ow,setTerm:u.nS,setOnlyFriends:u.F3})(fe),ge=function(){return(0,Z.jsx)(he,{})}}}]);
//# sourceMappingURL=883.24b0059d.chunk.js.map