"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[30],{9626:function(e,a,r){r(2791);var s=r(184);a.Z=function(){return(0,s.jsxs)("div",{children:["\u0414\u0430\u043d\u043d\u044b\u0435 \u0434\u043b\u044f \u0442\u0435\u0441\u0442\u043e\u0432\u043e\u0433\u043e \u0432\u0445\u043e\u0434\u0430:",(0,s.jsxs)("p",{children:["\u0410\u043a\u043a\u0430\u0443\u043d\u0442 1: Email: evgeniysazonov1983@gmail.com ",(0,s.jsx)("br",{}),"Password: 12qwaszx"]}),(0,s.jsxs)("p",{children:["\u0410\u043a\u043a\u0430\u0443\u043d\u0442 2 : Email: evgeniysazonov1983@googlemail.com ",(0,s.jsx)("br",{}),"Password: 12qwaszx"]}),(0,s.jsxs)("p",{children:["\u0410\u043a\u043a\u0430\u0443\u043d\u0442 3: Email: free@samuraijs.com ",(0,s.jsx)("br",{}),"Password: free"]}),(0,s.jsxs)("p",{children:["\u0412 \u0441\u043b\u0443\u0447\u0430\u0435 \u043f\u0440\u043e\u0431\u043b\u0435\u043c \u0441 \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u0435\u0439, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0441\u043d\u0430\u0447\u0430\u043b\u0430 \u0432\u043e\u0439\u0442\u0438 \u043f\u043e \u0443\u043a\u0430\u0437\u0430\u043d\u043d\u044b\u043c \u043f\u0430\u0440\u0430\u043c \u043b\u043e\u0433\u0438\u043d/\u043f\u0430\u0440\u043e\u043b\u044c \u043d\u0430 ",(0,s.jsx)("br",{}),(0,s.jsx)("a",{href:"https://social-network.samuraijs.com/",children:"https://social-network.samuraijs.com/"})]})]})}},4030:function(e,a,r){r.r(a),r.d(a,{default:function(){return A}});var s=r(5671),i=r(3144),n=r(136),t=r(7277),c=r(2791),o=r(5705),l=r(1724),p="Login_errorText__E5Dby",h=r(6670),d=r(3360),u=r(1413),m=r(5987),x=r(1694),j=r.n(x),f=r(162),v=r(184),g=["bsPrefix","size","vertical","className","as"],b=c.forwardRef((function(e,a){var r=e.bsPrefix,s=e.size,i=e.vertical,n=e.className,t=e.as,c=void 0===t?"div":t,o=(0,m.Z)(e,g),l=(0,f.vE)(r,"btn-group"),p=l;return i&&(p="".concat(l,"-vertical")),(0,v.jsx)(c,(0,u.Z)((0,u.Z)({},o),{},{ref:a,className:j()(n,p,s&&"".concat(l,"-").concat(s))}))}));b.displayName="ButtonGroup",b.defaultProps={vertical:!1,role:"group"};var Z=b,w=(r(7632),r(2677)),L=r(9626),y=r(7022),C=r(9743),k=r(9603),E={email:"",password:"",captcha:""},R=l.Ry({email:l.Z_().email("Invalid email address").required("Required"),password:l.Z_().required("Required")}),P=function(e){var a=e.postLogin,r=e.captchaURL,s=e.updateCaptcha,i=e.loginError,n=(0,v.jsx)(o.J9,{initialValues:E,validationSchema:R,onSubmit:function(e,r){var s=r.resetForm;a(e),s()},children:function(e){var a=e.handleReset;return(0,v.jsxs)(o.l0,{children:[" ",(0,v.jsxs)(w.Z,{children:[" ",(0,v.jsx)(h.rZ,{label:"Email Address",name:"email",type:"email",placeholder:"email",leftLabelLength:"7rem"}),(0,v.jsx)(h.rZ,{label:"Password",name:"password",type:"password",placeholder:"password",leftLabelLength:"7rem"}),(0,v.jsxs)(h.$m,{name:"rememberme",children:["  ","\u0437\u0430\u043f\u043e\u043c\u043d\u0438\u0442\u044c \u043c\u0435\u043d\u044f"]}),r&&(0,v.jsxs)("div",{children:[(0,v.jsx)("div",{children:(0,v.jsx)("img",{src:r,onClick:s,alt:"captcha"})}),(0,v.jsx)(h.rZ,{label:"",name:"captcha",type:"text",placeholder:"captcha"})]}),(0,v.jsxs)(Z,{"aria-label":"Basic example",children:[(0,v.jsx)(d.Z,{variant:"warning",type:"button",onClick:a,children:"Reset"}),(0,v.jsxs)(d.Z,{type:"submit",children:[" ","Submit"]})]}),(0,v.jsx)("div",{className:p,children:i&&i})]})]})}});return(0,v.jsx)(v.Fragment,{children:(0,v.jsxs)(y.Z,{className:"d-inline-block",children:[(0,v.jsx)("h2",{className:k.Z.pageHeader,children:"Login"}),(0,v.jsxs)(C.Z,{children:[(0,v.jsx)(w.Z,{children:n}),(0,v.jsx)(w.Z,{children:(0,v.jsx)(L.Z,{})})]})]})})},N=r(8687),_=r(6362),q=r(7689),z=function(e){(0,n.Z)(r,e);var a=(0,t.Z)(r);function r(){var e;(0,s.Z)(this,r);for(var i=arguments.length,n=new Array(i),t=0;t<i;t++)n[t]=arguments[t];return(e=a.call.apply(a,[this].concat(n))).postLogin=function(a){var r=a.email,s=a.password,i=a.rememberme,n=a.captcha;e.props.postLoginThunkCreator(r,s,i,n)},e.updateCaptcha=function(){e.props.getCaptchaThunkCreator()},e}return(0,i.Z)(r,[{key:"render",value:function(){return this.props.isAuth?(0,v.jsx)(q.Fg,{to:"../profile"}):(0,v.jsxs)("div",{children:[(0,v.jsx)(P,{postLogin:this.postLogin,captchaURL:this.props.captchaURL,updateCaptcha:this.updateCaptcha,loginError:this.props.loginError})," "]})}}]),r}(c.Component),A=(0,N.$j)((function(e){return{isAuth:e.auth.isAuth,captchaURL:e.auth.captchaURL,loginError:e.auth.loginError}}),{postLoginThunkCreator:_.Gf,getCaptchaThunkCreator:_.VP})(z)}}]);
//# sourceMappingURL=30.21fd89f3.chunk.js.map