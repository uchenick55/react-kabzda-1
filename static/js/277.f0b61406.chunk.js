"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[277],{3277:function(e,r,a){a.r(r),a.d(r,{default:function(){return _}});var t=a(5671),s=a(3144),n=a(136),c=a(7277),l=a(2791),i=a(8687),d=a(3154),o=a(9439),u=a(5705),h=a(1724),x=a(6670),p=a(3360),m=a(9743),f=a(184),j={name:"",email:"",message:""},v=h.Ry({email:h.Z_().email("Invalid email address"),message:h.Z_().required("Required")}),b=function(e){var r=e.sendFeedBack;return(0,f.jsx)("div",{children:(0,f.jsx)(u.J9,{initialValues:j,validationSchema:v,onSubmit:function(e,a){var t=a.resetForm;r(e),t()},children:function(e){e.handleReset;return(0,f.jsx)(u.l0,{children:(0,f.jsx)("div",{children:(0,f.jsxs)("div",{children:[(0,f.jsx)(x.rZ,{label:"\u0412\u0430\u0448\u0435 \u0438\u043c\u044f",autoFocus:!1,name:"name",type:"text",placeholder:"\u0438\u043c\u044f",leftLabelLength:"7rem"}),(0,f.jsx)(x.rZ,{label:"Email",autoFocus:!1,name:"email",type:"email",placeholder:"email",leftLabelLength:"7rem"}),(0,f.jsx)(x.rZ,{label:"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 * ",autoFocus:!1,name:"message",type:"textarea",placeholder:"\u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",leftLabelLength:"7rem"}),(0,f.jsx)(m.Z,{className:"mx-1",children:(0,f.jsxs)(p.Z,{type:"submit",children:[" ","Submit"]})})]})})})}})})},k=a(9603),Z=a(7022),y=a(7597),F=function(){return(0,f.jsx)("div",{children:(0,f.jsxs)("p",{children:["\u041f\u0440\u043e\u0432\u0435\u0440\u0438\u0442\u044c \u043e\u0442\u043f\u0440\u0430\u0432\u043a\u0443 \u043f\u043e\u0447\u0442\u044b \u043c\u043e\u0436\u043d\u043e \u043d\u0430 \u0442\u0435\u0441\u0442\u043e\u0432\u043e\u043c \u043f\u043e\u0447\u0442\u043e\u0432\u043e\u043c \u044f\u0449\u0438\u043a\u0435 "," ",(0,f.jsx)("a",{href:"https://passport.yandex.ru/auth/",children:"\u044f\u043d\u0434\u0435\u043a\u0441 \u043f\u043e\u0447\u0442\u044b"}),": ",(0,f.jsx)("br",{}),"testfeedback2023 ",(0,f.jsx)("br",{}),"testfeedback2023_password ",(0,f.jsx)("br",{})]})})},B=function(e){var r=e.sendFeedBack,a=e.feedBackStatus,t=e.setFeedBackStatus,s=(0,l.useState)(!0),n=(0,o.Z)(s,2),c=n[0],i=n[1];if(a){var d=(0,f.jsx)("div",{children:"\u0421\u043f\u0430\u0441\u0438\u0431\u043e!"}),u=(0,f.jsx)("div",{children:a});return(0,f.jsx)("div",{children:(0,f.jsx)(y.Z,{show:c,setShow:i,modalHeader:d,modalBody:u,buttonOnClick:function(){t("")},buttonName:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"})})}return(0,f.jsxs)("div",{children:[(0,f.jsx)("h2",{className:k.Z.pageHeader,children:"FeedBack"}),(0,f.jsxs)(Z.Z,{fluid:!0,children:[(0,f.jsx)(b,{sendFeedBack:r}),(0,f.jsx)("div",{className:"my-3",children:(0,f.jsx)(F,{})})]})]})},N=d.qH.setFeedBackStatus,S=function(e){(0,n.Z)(a,e);var r=(0,c.Z)(a);function a(){var e;(0,t.Z)(this,a);for(var s=arguments.length,n=new Array(s),c=0;c<s;c++)n[c]=arguments[c];return(e=r.call.apply(r,[this].concat(n))).sendFeedBack=function(r){e.props.postFeedBackThunkCreator2(r)},e}return(0,s.Z)(a,[{key:"render",value:function(){return(0,f.jsx)("div",{children:(0,f.jsx)(B,{sendFeedBack:this.sendFeedBack,feedBackStatus:this.props.feedBackStatus,setFeedBackStatus:this.props.setFeedBackStatus})})}}]),a}(l.Component),_=(0,i.$j)((function(e){return{feedBackStatus:e.feedback.feedBackStatus}}),{postFeedBackThunkCreator2:d.$u,setFeedBackStatus:N})(S)},6670:function(e,r,a){a.d(r,{$m:function(){return f},rZ:function(){return m}});var t=a(1413),s=a(9439),n=a(5987),c=a(5705),l={errorInputTextArea:"formik1_errorInputTextArea__vpmAv",errorText:"formik1_errorText__eDWui",labelWidth:"formik1_labelWidth__cwal9"},i=(a(7632),a(9410)),d=a(5313),o=a(184),u=["label","children"],h=["label","autoFocus","type","leftLabelLength"],x=["children"],p=function(e){e.label;var r=e.children,a=(0,n.Z)(e,u),t=(0,c.U$)(a.props),i=(0,s.Z)(t,1)[0];return(0,o.jsxs)(o.Fragment,{children:[r," ",i.touched&&i.error&&(0,o.jsx)("div",{className:l.errorText,children:i.error})," "]})},m=function(e){var r=e.label,a=e.autoFocus,u=e.type,x=e.leftLabelLength,m=(0,n.Z)(e,h),f=(0,c.U$)(m),j=(0,s.Z)(f,2),v=j[0],b=j[1];return(0,o.jsxs)(p,{label:r,props:m,children:[" ",(0,o.jsxs)(i.Z,{className:"my-1",size:"sm",children:[" ",x&&(0,o.jsxs)(i.Z.Text,{id:r,className:l.labelWidth,style:{width:x},children:[r,":"]}),(0,o.jsx)(d.Z.Control,(0,t.Z)((0,t.Z)((0,t.Z)({as:"textarea"===u?u:"input",type:"password"===u?u:void 0,className:b.touched&&b.error?l.errorInputTextArea:l.inputTextArea},v),m),{},{autoFocus:a}))]}),(0,o.jsx)("div",{className:l.errorText,children:b.touched&&b.error})]})},f=function(e){var r=e.children,a=(0,n.Z)(e,x),i=(0,c.U$)((0,t.Z)((0,t.Z)({},a),{},{type:"checkbox"})),d=(0,s.Z)(i,2),u=d[0],h=d[1];return(0,o.jsxs)("div",{children:[(0,o.jsxs)("label",{className:"checkbox-input",children:[(0,o.jsx)("input",(0,t.Z)((0,t.Z)({type:"checkbox"},u),a))," ",r]}),h.touched&&h.error&&(0,o.jsx)("div",{className:l.errorText,children:h.error})]})}},9743:function(e,r,a){var t=a(1413),s=a(5987),n=a(1694),c=a.n(n),l=a(2791),i=a(162),d=a(184),o=["bsPrefix","className","as"],u=l.forwardRef((function(e,r){var a=e.bsPrefix,n=e.className,l=e.as,u=void 0===l?"div":l,h=(0,s.Z)(e,o),x=(0,i.vE)(a,"row"),p=(0,i.pi)(),m=(0,i.zG)(),f="".concat(x,"-cols"),j=[];return p.forEach((function(e){var r,a=h[e];delete h[e],r=null!=a&&"object"===typeof a?a.cols:a;var t=e!==m?"-".concat(e):"";null!=r&&j.push("".concat(f).concat(t,"-").concat(r))})),(0,d.jsx)(u,(0,t.Z)((0,t.Z)({ref:r},h),{},{className:c().apply(void 0,[n,x].concat(j))}))}));u.displayName="Row",r.Z=u}}]);
//# sourceMappingURL=277.f0b61406.chunk.js.map