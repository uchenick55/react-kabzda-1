"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[695],{3695:function(n,e,t){t.r(e),t.d(e,{default:function(){return y}});var r=t(2791),s=t(9439),i=t(8687),a=t(3347),c=t(5705),u=t(1724),o=t(6670),l=t(3360),f=t(4266),d=t(184),h={newMessage:""},v=u.Ry({}),x=function(n){var e=n.sendMessage;n.isDisabled;return(0,d.jsx)(d.Fragment,{children:(0,d.jsx)(c.J9,{initialValues:h,validationSchema:v,onSubmit:function(n,t){var r=t.resetForm;e(n.newMessage),r()},children:function(){return(0,d.jsxs)(c.l0,{children:[(0,d.jsxs)("div",{children:[(0,d.jsx)(o.rZ,{label:"\u041d\u043e\u0432\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",autoFocus:!1,name:"newMessage",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",leftLabelLength:"",isDisabled:!1}),(0,d.jsx)(f.Z,{direction:"vertical",gap:1,className:"mt-2",children:(0,d.jsxs)(l.Z,{type:"submit",children:[" ","Submit"]})})]}),(0,d.jsx)("div",{})]})}})})},j=function(){var n=(0,i.v9)((function(n){return n.chat.messages})),e=(0,r.useRef)(null);return(0,r.useEffect)((function(){!function(){var n,t=e.current,r=t.scrollHeight,s=t.offsetHeight;r<=t.scrollTop+s+100&&(null===(n=e.current)||void 0===n||n.scrollTo(0,r))}()}),[n]),(0,d.jsx)("div",{ref:e,style:{height:"20rem",overflowY:"auto"},children:n.map((function(n,e){return(0,d.jsx)(p,{message:n},e)}))})},p=function(n){var e=n.message;return(0,d.jsx)("div",{children:(0,d.jsxs)("div",{children:[(0,d.jsx)("img",{src:e.photo,alt:"avatar",style:{height:"30px"}}),(0,d.jsx)("b",{children:e.userName})," ",e.message,(0,d.jsx)("hr",{})]})})},g=function(){var n=(0,i.v9)((function(n){return n.chat.channelStatus})),e=(0,r.useState)(""),t=(0,s.Z)(e,2),c=(t[0],t[1]),u=(0,i.I0)(),o=function(n){n&&u((0,a.rR)(n)),n&&c("")},l="ready"!==n;return(0,d.jsx)("div",{children:(0,d.jsx)(x,{sendMessage:o,isDisabled:l})})},m=function(){var n=(0,i.I0)();return(0,r.useEffect)((function(){return n((0,a.WE)()),function(){n((0,a.R7)()),n(a.ON.setChatInitialState())}}),[]),(0,d.jsxs)("div",{children:[(0,d.jsx)(j,{})," ",(0,d.jsx)(g,{})," "]})},b=t(7781),Z=t(3990),y=(0,b.qC)(Z.Z)((function(){return(0,d.jsx)("div",{children:(0,r.useMemo)((function(){return(0,d.jsx)(m,{})}),[])})}))},3990:function(n,e,t){var r=t(1413),s=(t(2791),t(8687)),i=t(7689),a=t(184),c=function(n){return{isAuth:n.auth.isAuth}};e.Z=function(n){return(0,s.$j)(c,null)((function(e){return e.isAuth?(0,a.jsx)(n,(0,r.Z)({},e)):(0,a.jsx)(i.Fg,{to:"../login"})}))}},4266:function(n,e,t){t.d(e,{Z:function(){return x}});var r=t(3433),s=t(1413),i=t(5987),a=t(1694),c=t.n(a),u=t(2791),o=t(162),l=t(9439);function f(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Hz,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.cs,r=[];return Object.entries(n).forEach((function(n){var s=(0,l.Z)(n,2),i=s[0],a=s[1];null!=a&&("object"===typeof a?e.forEach((function(n){var e=a[n];if(null!=e){var s=n!==t?"-".concat(n):"";r.push("".concat(i).concat(s,"-").concat(e))}})):r.push("".concat(i,"-").concat(a)))})),r}var d=t(184),h=["as","bsPrefix","className","direction","gap"],v=u.forwardRef((function(n,e){var t=n.as,a=void 0===t?"div":t,u=n.bsPrefix,l=n.className,v=n.direction,x=n.gap,j=(0,i.Z)(n,h);u=(0,o.vE)(u,"horizontal"===v?"hstack":"vstack");var p=(0,o.pi)(),g=(0,o.zG)();return(0,d.jsx)(a,(0,s.Z)((0,s.Z)({},j),{},{ref:e,className:c().apply(void 0,[l,u].concat((0,r.Z)(f({gap:x},p,g))))}))}));v.displayName="Stack";var x=v}}]);
//# sourceMappingURL=695.419ae4d0.chunk.js.map