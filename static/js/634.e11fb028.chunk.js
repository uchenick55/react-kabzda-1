"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[634],{5634:function(e,t,r){r.r(t),r.d(t,{default:function(){return ee}});var s=r(7781),n=r(8687),i=r(81),o=r(1852),a=r(3990),l=r(2791),u={item:"Profile_item__G-3+o",posts:"Profile_posts__ne6BS"},c=r(9439),d="ButtonOverImage_profilePhotoIMG__vdjsa",f="ButtonOverImage_ImgHover__b9CzX",h="ButtonOverImage_container__6pZv8",m="ButtonOverImage_btn1__d1Jbl",p="ButtonOverImage_displayNone__2P3O5",x="ButtonOverImage_btn2__BaRhB",v=r(6159),j=r(1413),P=(r(7632),r(9410)),b=r(5313),_=r(184),Z=function(e){var t=e.status,r=e.userId,s=e.myId,n=e.putStatusThunkCreator,i="SET_MODIFY_STATUS_TRUE",o="SET_MODIFY_STATUS_FALSE",a=(0,l.useReducer)((function(e,r){switch(r.type){case i:return(0,j.Z)((0,j.Z)({},e),{},{modifyStatus2:!0,statusTmpInput2:t});case o:return(0,j.Z)((0,j.Z)({},e),{},{modifyStatus2:!1});case"SET_STATUS_TMP_INPUT":return(0,j.Z)((0,j.Z)({},e),{},{statusTmpInput2:r.text});default:throw new Error}}),{modifyStatus2:!1,statusTmpInput2:""}),u=(0,c.Z)(a,2),d=u[0],f=u[1],h=function(){f({type:o}),n(d.statusTmpInput2,s)},m=function(e){var t=e.isDisabled,r=e.onClickMethod,s=e.value;return s||(s=""),(0,_.jsxs)(P.Z,{className:"my-3",onClick:r,children:[" ",(0,_.jsx)(P.Z.Text,{id:"basic-addon1",children:"\u0421\u0442\u0430\u0442\u0443\u0441:"})," ",(0,_.jsx)(b.Z.Control,{title:s,onClick:r,value:s,onChange:function(e){return function(e){var t=e.target.value;f({type:"SET_STATUS_TMP_INPUT",text:t})}(e)},onBlur:h,autoFocus:!0,placeholder:"\u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441",onKeyPress:function(e){return function(e){13===e.charCode&&h()}(e)},disabled:t})]})};return(0,_.jsx)("div",{children:d.modifyStatus2?(0,_.jsx)(m,{isDisabled:!1,onClickMethod:h,value:d.statusTmpInput2}):(0,_.jsx)(m,{isDisabled:!0,onClickMethod:function(){r===s&&f({type:i})},value:t})})},g=r(6110),y=r(5705),k=r(1724),E={HeaderEditProfileForm:"EditProfile_HeaderEditProfileForm__+ggeL",EditProfile:"EditProfile_EditProfile__KCw4z",EditProfileContactsFields:"EditProfile_EditProfileContactsFields__9QV1r",errorText:"EditProfile_errorText__piK3h"},I=r(6670),S=r(3360),T=k.Ry({}),C=function(e){var t=e.putProfile,r=e.setEditMode,s=e.profile,n=e.editProfileStatus,i=e.setEditProfileStatus,o={FullName:s.fullName,AboutMe:s.aboutMe,LookingForAJob:s.lookingForAJob,LookingForAJobDescription:s.lookingForAJobDescription,contacts:s.contacts};return l.createElement(y.J9,{initialValues:o,validationSchema:T,onSubmit:function(e,r){var s=r.resetForm;t(e),s()}},(function(e){var t=e.handleReset;return l.createElement(y.l0,{className:E.MyPosts},l.createElement("div",{},l.createElement("div",{className:E.HeaderEditProfileForm},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0444\u0438\u043b\u044f"),l.createElement(I.rZ,{label:"\u0418\u043c\u044f",autoFocus:!1,name:"FullName",type:"text",placeholder:"\u0418\u043c\u044f",leftLabelLength:"5rem"}),l.createElement(I.rZ,{label:"\u041e\u0431\u043e \u043c\u043d\u0435",autoFocus:!1,name:"AboutMe",type:"text",placeholder:"\u041e\u0431\u043e \u043c\u043d\u0435",leftLabelLength:"5rem"}),l.createElement(I.$m,{name:"LookingForAJob"},"\u0432 \u043f\u043e\u0438\u0441\u043a\u0430\u0445 \u0440\u0430\u0431\u043e\u0442\u044b"),l.createElement(I.rZ,{label:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",autoFocus:!1,name:"LookingForAJobDescription",type:"textarea",placeholder:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",leftLabelLength:"5rem"}),l.createElement("h4",{},"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b:"),l.createElement("div",{className:E.EditProfileContactsFields},Object.keys(s.contacts).map((function(e){return l.createElement("div",{key:e},l.createElement(I.rZ,{label:e,autoFocus:!1,name:"contacts["+e+"]",type:"text",placeholder:e,leftLabelLength:"5rem"}),l.createElement("div",{},n.map((function(t){return t.toLowerCase().includes(e.toLowerCase())?l.createElement("div",{key:t,className:E.errorText},t):null}))))}))),l.createElement("br"),l.createElement(S.Z,{type:"button",variant:"warning",onClick:function(){t(),i([])}},"\u0421\u0431\u0440\u043e\u0441")," ",l.createElement(S.Z,{type:"submit"},"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c")," ",l.createElement(S.Z,{variant:"secondary",onClick:function(){r(!1),i([])}},"\u041e\u0442\u043c\u0435\u043d\u0430")))}))},N=r(9743),F=r(2677),M=r(7022),A=r(2592),L=r(9603),O=function(e){var t=e.key1,r=e.Value;return(0,_.jsxs)("div",{children:[(0,_.jsxs)("b",{children:[t,": "]})," ",(0,_.jsx)("span",{title:r,children:r})]})},w=function(e){var t=e.profile,r=e.setEditMode,s=e.userId;e.myId;return(0,_.jsxs)("div",{className:"".concat(L.Z.textMaxWidthCommon," ").concat(L.Z.textMaxWidth18rem),children:[(0,_.jsx)("h3",{title:t.fullName,children:t.fullName}),(0,_.jsxs)("div",{children:[(0,_.jsx)("b",{children:"\u041e\u0431\u043e \u043c\u043d\u0435"}),": ",(0,_.jsxs)("span",{title:t.aboutMe,children:[" ",t.aboutMe]})]}),(0,_.jsxs)("div",{children:[(0,_.jsx)("b",{children:"\u0412 \u043f\u043e\u0438\u0441\u043a\u0435 \u0440\u0430\u0431\u043e\u0442\u044b?"})," ",(0,_.jsx)("span",{title:t.lookingForAJob?"\u0414\u0430":"\u041d\u0435\u0442",children:t.lookingForAJob?"\u0414\u0430":"\u041d\u0435\u0442"})]}),(0,_.jsxs)("div",{children:[(0,_.jsx)("b",{children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435:"})," ",(0,_.jsx)("span",{title:t.lookingForAJobDescription,children:t.lookingForAJobDescription})]}),(0,_.jsxs)("div",{children:[(0,_.jsx)("b",{children:"userId:"})," ",(0,_.jsx)("span",{title:t.userId.toString(),children:t.userId})," "]}),(0,_.jsx)("ul",{children:t&&Object.keys(t.contacts).map((function(e,r){var s=Object.values(t.contacts)[r];return(0,_.jsxs)("li",{children:[(0,_.jsx)(O,{key1:e,Value:s})," "]},e)}))}),0===s&&(0,_.jsx)(S.Z,{onClick:function(){r(!0)},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c "})]})},J=function(e){var t=e.profile,r=e.myId,s=e.status,n=e.putStatusThunkCreator,i=e.uploadImage,o=e.userId,a=e.putProfile,u=e.editProfileStatus,j=e.setEditProfileStatus,P=(0,l.useState)(),b=(0,c.Z)(P,2),y=b[0],k=b[1],E=(0,l.useState)(!1),I=(0,c.Z)(E,2),S=I[0],T=I[1],O=(0,l.useState)(!1),J=(0,c.Z)(O,2),B=J[0],D=J[1],U=u.length>0&&"Edited successfully!"===u[0];if((0,l.useEffect)((function(){U&&(T(!1),setTimeout((function(){j([])}),2e3))}),[u,U,j]),!t)return(0,_.jsx)(v.Z,{});var R=B?"":p,$=(0,_.jsx)(Z,{myId:r,userId:t.userId,status:s,putStatusThunkCreator:n}),z=!S&&(0,_.jsx)(w,{profile:t,setEditMode:T,userId:o,myId:r}),H=S&&(0,_.jsx)("div",{children:(0,_.jsx)(C,{putProfile:a,setEditMode:T,profile:t,editProfileStatus:u,setEditProfileStatus:j})}),V=0===o&&(0,_.jsx)("div",{children:(0,_.jsxs)("form",{children:[" ",(0,_.jsx)("span",{children:(0,_.jsx)("button",{className:m+" "+R,onMouseOver:function(){D(!0)},onMouseOut:function(){D(!1)},onClick:function(){y&&i(y)},children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c"})})," ",(0,_.jsx)("span",{children:(0,_.jsx)("input",{className:x+" "+R,onMouseOver:function(){D(!0)},onMouseOut:function(){D(!1)},type:"file",onChange:function(e){k(e.currentTarget.files[0])}})})," "]})}),W=(0,_.jsx)(A.Z,{fluid:!0,alt:"userPhoto",onMouseOver:function(){D(!0)},onMouseOut:function(){D(!1)},className:"".concat(d," ").concat(0===o&&B?f:""),src:t.photos.large?t.photos.large:g});return(0,_.jsx)("div",{children:(0,_.jsxs)(M.Z,{fluid:"sm",children:[(0,_.jsx)("h2",{className:L.Z.pageHeader,children:"Profile"})," ",(0,_.jsxs)(N.Z,{children:[(0,_.jsxs)(F.Z,{xs:12,md:5,className:h,children:[W," ",V," "]}),(0,_.jsxs)(F.Z,{xs:12,md:7,children:[z," ",H," ",(0,_.jsx)("div",{children:U&&(0,_.jsxs)("div",{children:[u[0]," "]})}),(0,_.jsxs)("div",{children:[$," "]})]})]})]})})},B="MyPosts_posts__v8PmM",D="MyPosts_postsBlock__Vokae",U="MyPosts_legendStyle__kuSLI",R="Post_item__yvb5C",$=function(e){var t=e.message,r=e.like;return(0,_.jsxs)("div",{className:R,children:[(0,_.jsx)("img",{alt:"\u041c\u0438\u0441\u0442\u0435\u0440 \u0431\u0438\u043d \u043d\u0430 \u043f\u0440\u043e\u0433\u0443\u043b\u043a\u0435",src:"https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"}),t,(0,_.jsx)("div",{children:(0,_.jsxs)("span",{children:["Like ",r]})})]})},z="MyPosts_MyPosts__FZcZt",H=r(4266),V={newPost:""},W=k.Ry({}),Y=function(e){var t=e.addPost;return(0,_.jsx)(_.Fragment,{children:(0,_.jsx)(y.J9,{initialValues:V,validationSchema:W,onSubmit:function(e,r){var s=r.resetForm;t(e.newPost),s()},children:function(e){var t=e.handleReset;return(0,_.jsxs)(y.l0,{className:z,children:[(0,_.jsxs)("div",{children:[(0,_.jsx)(I.rZ,{label:"\u041f\u043e\u0441\u0442",autoFocus:!1,name:"newPost",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",leftLabelLength:""}),(0,_.jsxs)(H.Z,{direction:"vertical",gap:1,className:"mt-2",children:[(0,_.jsxs)(S.Z,{type:"submit",children:[" ","Submit"]}),(0,_.jsx)(S.Z,{variant:"warning",type:"button",onClick:t,children:"Reset"})]})]}),(0,_.jsx)("div",{})]})}})})},G=function(e){var t=e.userId,r=e.posts,s=e.addPost,n=r.map((function(e,t){return(0,_.jsx)($,{message:e.message,like:e.like},t)}));return(0,_.jsx)("div",{className:D,children:(0,_.jsx)(M.Z,{children:0===t&&(0,_.jsx)("div",{children:(0,_.jsxs)("fieldset",{children:[(0,_.jsx)("legend",{children:(0,_.jsx)("div",{className:U,children:"\u041c\u043e\u0438 \u043f\u043e\u0441\u0442\u044b"})}),(0,_.jsx)(Y,{addPost:s})," ",(0,_.jsxs)("div",{className:B,children:[n," "]})]})})})})},K=i.dQ.addPostActionCreator,Q=(0,n.$j)((function(e){return{posts:e.profilePage.posts}}),{addPostActionCreator:K})((function(e){var t=e.posts,r=e.addPostActionCreator,s=e.userId;return(0,_.jsx)(G,{userId:s,posts:t,addPost:function(e){r(e)}})})),q=function(e){var t=e.profile,r=e.status,s=e.myId,n=e.putStatusThunkCreator,i=e.uploadImage,o=e.userId,a=e.putProfile,l=e.editProfileStatus,c=e.setEditProfileStatus,d=(0,_.jsx)("div",{className:u.ProfileRender,children:(0,_.jsx)(J,{profile:t,status:r,myId:s,putStatusThunkCreator:n,uploadImage:i,userId:o,putProfile:a,editProfileStatus:l,setEditProfileStatus:c})});return(0,_.jsxs)("div",{children:[d," ",(0,_.jsx)(Q,{userId:o})]})},X=i.dQ.setEditProfileStatus,ee=(0,s.qC)((0,n.$j)((function(e){return{profile:e.profilePage.profile,myId:e.auth.myId,status:e.profilePage.status,editProfileStatus:e.profilePage.editProfileStatus}}),{setEditProfileStatus:X,getProfileThunkCreator:i.aI,putStatusThunkCreator:i.FY,setprofilePhotoThunkCreator:i.Yr,putMyProfileThunkCreator:i.hv}),o.Z,a.Z)((function(e){var t=e.profile,r=e.myId,s=e.status,n=e.editProfileStatus,i=e.userId,o=e.setEditProfileStatus,a=e.getProfileThunkCreator,u=e.putStatusThunkCreator,c=e.setprofilePhotoThunkCreator,d=e.putMyProfileThunkCreator;return(0,l.useEffect)((function(){a(i,!1,0)}),[a,i]),(0,_.jsx)(q,{profile:t,status:s,myId:r,putStatusThunkCreator:u,uploadImage:function(e){c(e,r)},userId:i,putProfile:function(e){var t=Object.assign({},{userId:r},e);d(t,r)},editProfileStatus:n,setEditProfileStatus:o})}))},6670:function(e,t,r){r.d(t,{$m:function(){return x},rZ:function(){return p}});var s=r(1413),n=r(9439),i=r(5987),o=r(5705),a={errorInputTextArea:"formik1_errorInputTextArea__vpmAv",errorText:"formik1_errorText__eDWui",labelWidth:"formik1_labelWidth__cwal9"},l=(r(7632),r(9410)),u=r(5313),c=r(184),d=["label","children"],f=["label","autoFocus","type","leftLabelLength"],h=["children"],m=function(e){e.label;var t=e.children,r=(0,i.Z)(e,d),s=(0,o.U$)(r.props),l=(0,n.Z)(s,1)[0];return(0,c.jsxs)(c.Fragment,{children:[t," ",l.touched&&l.error&&(0,c.jsx)("div",{className:a.errorText,children:l.error})," "]})},p=function(e){var t=e.label,r=e.autoFocus,d=e.type,h=e.leftLabelLength,p=(0,i.Z)(e,f),x=(0,o.U$)(p),v=(0,n.Z)(x,2),j=v[0],P=v[1];return(0,c.jsxs)(m,{label:t,props:p,children:[" ",(0,c.jsxs)(l.Z,{className:"my-1",size:"sm",children:[" ",h&&(0,c.jsxs)(l.Z.Text,{id:t,className:a.labelWidth,style:{width:h},children:[t,":"]}),(0,c.jsx)(u.Z.Control,(0,s.Z)((0,s.Z)((0,s.Z)({as:"textarea"===d?d:"input",type:"password"===d?d:void 0,className:P.touched&&P.error?a.errorInputTextArea:a.inputTextArea},j),p),{},{autoFocus:r}))]}),(0,c.jsx)("div",{className:a.errorText,children:P.touched&&P.error})]})},x=function(e){var t=e.children,r=(0,i.Z)(e,h),l=(0,o.U$)((0,s.Z)((0,s.Z)({},r),{},{type:"checkbox"})),u=(0,n.Z)(l,2),d=u[0],f=u[1];return(0,c.jsxs)("div",{children:[(0,c.jsxs)("label",{className:"checkbox-input",children:[(0,c.jsx)("input",(0,s.Z)((0,s.Z)({type:"checkbox"},d),r))," ",t]}),f.touched&&f.error&&(0,c.jsx)("div",{className:a.errorText,children:f.error})]})}},3990:function(e,t,r){var s=r(1413),n=(r(2791),r(8687)),i=r(7689),o=r(184),a=function(e){return{isAuth:e.auth.isAuth}};t.Z=function(e){return(0,n.$j)(a,null)((function(t){return t.isAuth?(0,o.jsx)(e,(0,s.Z)({},t)):(0,o.jsx)(i.Fg,{to:"../login"})}))}},1852:function(e,t,r){var s=r(1413),n=(r(2791),r(7689)),i=r(8687),o=r(184);t.Z=function(e){return(0,i.$j)(null,null)((function(t){var r={params:(0,n.UO)()},i=Number(r.params["*"]);return(0,o.jsx)(e,(0,s.Z)((0,s.Z)({},t),{},{userId:i}))}))}},4266:function(e,t,r){r.d(t,{Z:function(){return p}});var s=r(3433),n=r(1413),i=r(5987),o=r(1694),a=r.n(o),l=r(2791),u=r(162),c=r(9439);function d(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.Hz,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:u.cs,s=[];return Object.entries(e).forEach((function(e){var n=(0,c.Z)(e,2),i=n[0],o=n[1];null!=o&&("object"===typeof o?t.forEach((function(e){var t=o[e];if(null!=t){var n=e!==r?"-".concat(e):"";s.push("".concat(i).concat(n,"-").concat(t))}})):s.push("".concat(i,"-").concat(o)))})),s}var f=r(184),h=["as","bsPrefix","className","direction","gap"],m=l.forwardRef((function(e,t){var r=e.as,o=void 0===r?"div":r,l=e.bsPrefix,c=e.className,m=e.direction,p=e.gap,x=(0,i.Z)(e,h);l=(0,u.vE)(l,"horizontal"===m?"hstack":"vstack");var v=(0,u.pi)(),j=(0,u.zG)();return(0,f.jsx)(o,(0,n.Z)((0,n.Z)({},x),{},{ref:t,className:a().apply(void 0,[c,l].concat((0,s.Z)(d({gap:p},v,j))))}))}));m.displayName="Stack";var p=m}}]);
//# sourceMappingURL=634.e11fb028.chunk.js.map