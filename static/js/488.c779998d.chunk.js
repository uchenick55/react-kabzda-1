"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[488],{7488:function(e,r,t){t.r(r),t.d(r,{default:function(){return Z}});var s=t(5671),a=t(3144),n=t(136),i=t(7277),o=t(2791),c=t(2506),d=t(2797),l="Login_LoginForm__s2klG",p="Login_legendStyle__SOIpE",u="Login_errorText__kahI9",h=t(184),m=t(9167),f=t(2056),x=(t(6528),{email:"",password:"",captcha:""}),g=d.Ry({email:d.Z_().email("Invalid email address").required("Required"),password:d.Z_().required("Required")}),j=function(e){var r=e.postLogin,t=e.captchaURL,s=e.updateCaptcha,a=e.loginError;return(0,h.jsx)(h.Fragment,{children:(0,h.jsx)(c.J9,{initialValues:x,validationSchema:g,onSubmit:function(e,t){var s=t.resetForm;r(e),s()},children:function(e){e.values;var r=e.handleReset;e.errors,e.isValid;return(0,h.jsxs)(c.l0,{className:l,children:[(0,h.jsxs)("fieldset",{children:[(0,h.jsx)("legend",{children:(0,h.jsx)("div",{className:p,children:"\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0430\u043a\u043a\u0430\u0443\u043d\u0442"})}),(0,h.jsx)(m.rZ,{label:"Email Address",name:"email",type:"email",placeholder:"email"}),(0,h.jsx)(m.rZ,{label:"Password",name:"password",type:"password",placeholder:"password"}),(0,h.jsxs)(m.$m,{name:"rememberme",children:["  ","\u0437\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c \u043c\u0435\u043d\u044f"]}),t&&(0,h.jsxs)("div",{children:[(0,h.jsx)(f.j,{children:(0,h.jsx)("img",{src:t,onClick:s,alt:"captcha"})}),(0,h.jsx)(m.rZ,{label:"",name:"captcha",type:"text",placeholder:"captcha"})]}),(0,h.jsxs)("button",{type:"submit",children:[" ","Submit"]}),(0,h.jsx)("button",{type:"button",onClick:r,children:"Reset"}),(0,h.jsx)("div",{className:u,children:a&&a})]}),(0,h.jsx)("div",{})]})}})})},_=t(8687),v=t(5865),C=t(7689),k=t(7352),L=function(e){(0,n.Z)(t,e);var r=(0,i.Z)(t);function t(){var e;(0,s.Z)(this,t);for(var a=arguments.length,n=new Array(a),i=0;i<a;i++)n[i]=arguments[i];return(e=r.call.apply(r,[this].concat(n))).postLogin=function(r){var t=r.email,s=r.password,a=r.rememberme,n=r.captcha;e.props.postLoginThunkCreator(t,s,a,n)},e.updateCaptcha=function(){e.props.getCaptchaThunkCreator()},e}return(0,a.Z)(t,[{key:"render",value:function(){return this.props.isAuth?(this.props.getFriendsThunkCreator(this.props.friendsCurrentPage,this.props.friendsPageSize,this.props.friendsTerm,this.props.friend),(0,h.jsx)(C.Fg,{to:"../profile"})):(0,h.jsxs)("div",{children:[(0,h.jsx)(j,{postLogin:this.postLogin,captchaURL:this.props.captchaURL,updateCaptcha:this.updateCaptcha,dispatch:this.props.dispatch,loginError:this.props.loginError})," "]})}}]),t}(o.Component),Z=(0,_.$j)((function(e){return{isAuth:e.auth.isAuth,friendsCurrentPage:e.sideBar.friendsCurrentPage,friendsPageSize:e.sideBar.friendsPageSize,friendsTerm:e.sideBar.friendsTerm,friend:e.sideBar.friend,captchaURL:e.auth.captchaURL,loginError:e.auth.loginError}}),(function(e){return{postLoginThunkCreator:function(r,t,s,a){e((0,v.Gf)(r,t,s,a))},getFriendsThunkCreator:function(r,t,s,a){e((0,k.ku)(r,t,s,a))},getCaptchaThunkCreator:function(){e((0,v.VP)())},dispatch:e}}))(L)},6528:function(e,r,t){t.d(r,{II:function(){return m},gx:function(){return h}});var s=t(8683),a=t(5987),n=(t(2791),"customFields_textAreaError__R-r1L"),i="customFields_textArea__DhXBS",o="customFields_textError__koMT7",c="customFields_Input__lhbLD",d="customFields_InputError__9Zp9E",l=t(184),p=["input","meta"],u=["input","meta"],h=function(e){var r=e.input,t=e.meta,c=(0,a.Z)(e,p),d=t.touched&&t.error;return(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{children:(0,l.jsx)("textarea",(0,s.Z)((0,s.Z)({},r),{},{placeholder:c.placeholder,className:d?n:i}))}),(0,l.jsx)("div",{children:d&&(0,l.jsx)("span",{className:o,children:t.error})})]})},m=function(e){var r=e.input,t=e.meta,n=(0,a.Z)(e,u),i=t.touched&&t.error;return(0,l.jsxs)("span",{children:[(0,l.jsx)("span",{children:(0,l.jsx)("input",(0,s.Z)((0,s.Z)({},r),{},{placeholder:n.placeholder,className:i?d:c}))}),(0,l.jsx)("div",{children:i&&(0,l.jsx)("span",{className:o,children:t.error})})]})}}}]);
//# sourceMappingURL=488.c779998d.chunk.js.map