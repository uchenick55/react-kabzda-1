"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[231],{8979:function(e,s,a){a(2791);s.Z=a.p+"static/media/send-svg2.12d8e771d6d27bcd4485de69966afd04.svg"},3231:function(e,s,a){a.r(s),a.d(s,{default:function(){return We}});var t=a(1413),r=a(2791),n=a(8687),i=a(5870),d="dialog2Messages2COM_dialog2Messages2Common__yrugD",l="dialog2Render_Fixed__yAlTJ",o="dialog2Render_dialog2HeaderCommon__YO-4Y",c="dialog2Render_dialog2ListCommon__ZMqFo",g="dialog2Render_MobileDialogWidth__ahAt-",m="dialog2Render_DesktopDialogWidth__zSxVR",h="dialog2Render_Dialog2ItemCardExt__LODJo",u="dialog2Render_Dialog2ItemCardInt__HQqPI",M="dialog2Render_Dialog2ItemCardName__zSixE",_="dialog2Render_Dialog2ItemCardPhoto__jPmgw",x="dialog2Render_Dialog2ItemCardNewMsgCnt__TrWvv",p="dialog2Render_Dialog2ItemCardMsgTime__2bCd+",v=a(6110),D=a(1087),f=a(184),j=function(e){var s=e.userName,a=e.hasNewMessages,t=e.photos,r=e.lastDialogActivityDate,n=e.newMessagesCount,i=e.id;return(0,f.jsx)("div",{className:h,children:(0,f.jsx)(D.OL,{to:"/messages/"+i,children:(0,f.jsxs)("div",{className:u,children:[(0,f.jsx)("div",{className:M,children:s}),"   ",a&&(0,f.jsx)("div",{className:x,children:n})," ",(0,f.jsx)("img",{src:t.small?t.small:v,className:_,alt:"CardPhoto"})," ",(0,f.jsx)("div",{className:p,children:r.slice(0,16)})]})})})},I=r.memo(j),N=function(e){var s=e.PageWidth,a=e.MobileWidth,t=e.patch,r=e.Dialog2All,n=[];return(0,f.jsx)("div",{children:("messages"===t&&s>a||"dialog2"===t)&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{className:"".concat(l," ").concat(o," ").concat(s<a?g:m),children:" \u043f\u043e\u0438\u0441\u043a, \u0431\u0435\u0437 \u043a\u043d\u043e\u043f\u043a\u0438 \u043e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c, \u0441 \u0437\u0430\u0434\u0435\u0440\u0436\u043a\u043e\u0439 \u043f\u043e\u0441\u043b\u0435 \u0432\u0432\u043e\u0434\u0430."}),(0,f.jsx)("div",{className:"".concat(l," ").concat(c," ").concat(s<a?g:m),children:r.map((function(e){var s=e.id,a=e.userName,t=e.hasNewMessages,r=e.lastDialogActivityDate,i=e.newMessagesCount,d=e.photos;return n.includes(s)?(0,f.jsx)("div",{}):(n.push(s),(0,f.jsx)(I,{userName:a,hasNewMessages:t,photos:d,lastDialogActivityDate:r,newMessagesCount:i,id:s},s))}))})]})})},R=r.memo(N),T="messages2Render_Fixed__baHQ8",y="messages2Render_messages2NameAndProfileLink__gsVN6",C="messages2Render_messages2ChooseDialog__JKbif",b="messages2Render_messages2RenderMessages__Ebe0U",A="messages2Render_messages2PrintMessage__dhozP",Z="messages2Render_MobileMessagesLeft__6JOQ+",w="messages2Render_DesktopMessagesLeft__rsM5T",S="messages2Render_Msg2HeaderName__Mw++x",k="messages2Render_Msg2HeaderPhoto__XGI9W",W="messages2Render_Msg2HeaderActivityDate__ZWTOr",P="messages2Render_myIdNotMyIdMsg2ComExt__oPyxL",F="messages2Render_myIdMessageExt__41EAp",U="messages2Render_NOTmyIdMessageExt__5fs33",E="messages2Render_myIdNotMyIdMsg2ComInt__Estd7",L="messages2Render_myIdMessageInt__xSaFZ",O="messages2Render_NOTmyIdMessageInt__hPt2K",H="messages2Render_Msg2DropDownMenuExt__az4N7",B="messages2Render_Msg2DropDownMenuIntCommon__vMw3j",z="messages2Render_Msg2DropDownMenuIntMy__6FgWz",V="messages2Render_Msg2DropDownMenuIntNotMy__Yf+sf",q="messages2Render_Msg2DropDownItems__Qu0q7",$="messages2Render_positionRelative__ovQvp",J="messages2Render_DropdownItem__AtL0R",K="messages2Render_imgDelete__qGmmU",Q="messages2Render_imgSpam__tMesr",Y="messages2Render_imgRestore__YIG+H",G="messages2Render_Msg2ItemAdedAtCommon__JW5T8",X="messages2Render_ColorMy__HqHhB",ee="messages2Render_ColorNotMy__X-mAo",se="messages2Render_Msg2DeletedText__lBh9V",ae="messages2Render_Msg2DeletedPic__V5oiT",te="messages2Render_Msg2SpamPic__wTzWN",re="messages2Render_Msg2Body__dWvTp",ne=a(9439),ie=a(8789);var de=a.p+"static/media/dust-bin2.85ba7792a26715a7b4844146f0fe8516.svg";var le=a.p+"static/media/spam1.6b2e03613617d21268ffc89216b86ffe.svg";var oe=a.p+"static/media/restore1.e9dde41c96777233a2e7981f04df1cd9.svg",ce=function(e){var s=e.Msg2DeleteMessage,a=e.id,t=e.isMyMessage,r=e.Msg2MarkAsSpam,n=e.Msg2Restore,i=e.deletedBySender,d=e.isSpam;return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)("div",{children:(0,f.jsxs)(ie.Z,{children:[(0,f.jsx)(ie.Z.Toggle,{className:"".concat(t?z:V," \n                         ").concat(B)}),(0,f.jsxs)(ie.Z.Menu,{className:q,children:[!i&&(0,f.jsxs)(ie.Z.Item,{className:$,eventKey:"1",onClick:function(){s(a)},children:[(0,f.jsx)("div",{className:J,children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0443 \u043c\u0435\u043d\u044f"}),(0,f.jsx)("img",{src:de,className:K,alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0443 \u043c\u0435\u043d\u044f"})]}),!t&&!d&&(0,f.jsxs)(ie.Z.Item,{className:$,eventKey:"2",onClick:function(){r(a)},children:[(0,f.jsx)("div",{className:J,children:"\u0412 \u0441\u043f\u0430\u043c"}),(0,f.jsx)("img",{src:le,className:Q,alt:"\u0412 \u0441\u043f\u0430\u043c"})]}),(i||d)&&(0,f.jsxs)(ie.Z.Item,{className:$,eventKey:"3",onClick:function(){n(a)},children:[(0,f.jsx)("div",{className:J,children:"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,f.jsx)("img",{src:oe,className:Y,alt:"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"})]})]})]})})})},ge=function(e){var s=e.id,a=e.body,t=e.Msg2DeleteMessage,n=e.addedAt,i=e.senderId,d=e.myId,l=e.Msg2MarkAsSpam,o=e.Msg2Restore,c=e.deletedBySender,g=e.isSpam,m=d===i,h=(0,r.useState)(""),u=(0,ne.Z)(h,2),M=u[0],_=u[1];return(0,f.jsx)("div",{className:"".concat(P," ").concat(m?F:U),children:(0,f.jsxs)("div",{className:"".concat(E," ").concat(m?L:O),onMouseOver:function(){_(s)},onMouseLeave:function(){_("")},children:[c?(0,f.jsxs)("div",{children:[(0,f.jsx)("img",{className:ae,src:de,alt:""}),(0,f.jsx)("div",{className:se,children:" \u044d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u043e "})]}):(0,f.jsx)("div",{className:re,children:a}),(0,f.jsx)("div",{className:"".concat(G," ").concat(m?X:ee),children:n.slice(11,16)}),g&&(0,f.jsx)("img",{className:te,src:le,alt:""}),(0,f.jsx)("div",{className:H,children:M===s&&(0,f.jsx)(ce,{Msg2DeleteMessage:t,id:s,isMyMessage:m,Msg2MarkAsSpam:l,Msg2Restore:o,deletedBySender:c,isSpam:g})})]})})},me=r.memo(ge),he=a(5705),ue=a(1724),Me=a(6670),_e=a(3360),xe=a(2592),pe=a(8979),ve="MessagesFormik_sendSwg__TECWd",De={newMessage:""},fe=ue.Ry({}),je=function(e){var s=e.Msg2SendMessage;return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)(he.J9,{initialValues:De,validationSchema:fe,onSubmit:function(e,a){var t=a.resetForm;s(e.newMessage),t()},children:function(e){e.handleReset;var s=e.values;return(0,f.jsx)(he.l0,{children:(0,f.jsxs)("div",{className:"d-flex d-inline-block justify-content-center align-items-center",children:[(0,f.jsx)("div",{className:"col-9",children:(0,f.jsx)(Me.rZ,{label:"",autoFocus:!1,name:"newMessage",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",leftLabelLength:""})}),(0,f.jsx)("div",{children:(0,f.jsx)(_e.Z,{variant:"light",className:"mx-2",type:"submit",disabled:!s.newMessage,children:(0,f.jsx)(xe.Z,{src:pe.Z,className:ve,alt:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",title:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"})})})]})})}})})},Ie=r.memo(je),Ne=function(e){var s=e.userId,a=e.D2Item,t=a&&a.photos&&a.photos.small?a.photos.small:v;return(0,f.jsx)("div",{children:a&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{className:S,children:a&&a.userName}),(0,f.jsx)(D.OL,{to:"/profile/"+s,children:(0,f.jsx)("img",{className:k,src:t,alt:"photoSrc"})}),(0,f.jsxs)("div",{className:W,children:["\u0411\u044b\u043b(\u0430): "," ",a&&a.lastUserActivityDate&&a.lastUserActivityDate.slice(0,10)]})]})})},Re=r.memo(Ne),Te=function(e){var s=e.PageWidth,a=e.MobileWidth,t=e.patch,r=e.MessagesNewerThen,n=e.Msg2DeleteMessage,i=e.Msg2SendMessage,d=e.userId,l=e.D2Item,o=e.myId,c=e.Msg2MarkAsSpam,g=e.Msg2Restore;return(0,f.jsxs)("div",{children:["dialog2"===t&&s>a&&(0,f.jsx)("div",{className:"".concat(T," ").concat(C),children:" \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043b\u043e\u0433"}),"messages"===t&&(0,f.jsxs)("div",{children:[(0,f.jsx)("div",{className:"".concat(T," ").concat(y," ").concat(s<a?Z:w),children:(0,f.jsx)(Re,{userId:d,D2Item:l})}),(0,f.jsxs)("div",{className:"".concat(T," ").concat(b," ").concat(s<a?Z:w),children:[r.map((function(e){var s=e.id,a=e.body,t=e.addedAt,r=e.senderId,i=e.deletedBySender,d=e.isSpam;return(0,f.jsx)(me,{id:s,body:a,Msg2DeleteMessage:n,addedAt:t,senderId:r,myId:o,Msg2MarkAsSpam:c,Msg2Restore:g,deletedBySender:i,isSpam:d},s)})),(0,f.jsx)("div",{className:"second-block"})]}),(0,f.jsx)("div",{className:"".concat(T," ").concat(A," ").concat(s<a?Z:w),children:(0,f.jsx)(Ie,{Msg2SendMessage:i})})]})]})},ye=function(e){var s=e.patch,a=e.PageWidth,t=e.MobileWidth,r=e.Dialog2All,n=e.MessagesNewerThen,i=e.Msg2DeleteMessage,l=e.Msg2SendMessage,o=e.userId,c=e.D2Item,g=e.myId,m=e.Msg2MarkAsSpam,h=e.Msg2Restore;return(0,f.jsxs)("div",{className:d,children:[(0,f.jsx)(R,{PageWidth:a,MobileWidth:t,patch:s,Dialog2All:r}),(0,f.jsx)(Te,{PageWidth:a,MobileWidth:t,patch:s,MessagesNewerThen:n,Msg2DeleteMessage:i,Msg2SendMessage:l,userId:o,D2Item:c,myId:g,Msg2MarkAsSpam:m,Msg2Restore:h})]})},Ce=a(7781),be=a(1852),Ae=a(3990),Ze=i.rP.setD2UserId,we=i.rP.setMarkers,Se=i.rP.setD2Item,ke=i.rP.getDialog2AllAC,We=(0,Ce.qC)((0,n.$j)((function(e){return{patch:e.app.patch,PageWidth:e.app.PageWidth,MobileWidth:e.app.MobileWidth,Dialog2All:e.dialog2.Dialog2All,MessagesNewerThen:e.dialog2.MessagesNewerThen,D2Item:e.dialog2.D2Item,Markers:e.dialog2.Markers,myId:e.auth.myId}}),{putDialog2StartThCr:i.H3,getDialog2AllThCr:i.sz,postDialog2MessageThCr:i.D9,getDialog2MessageIdViewedThCr:i.xX,postDialog2MessageIdToSpamThCr:i.ho,deleteDialog2MessageIdThCr:i.fv,putDialog2MessageIdRestoreThCr:i.HY,getDialog2MessagesNewerThenThCr:i.vu,getDailog2UnreadMessagesThCr:i.mO,setD2UserId:Ze,setMarkers:we,setD2Item:Se,getDialog2AllAC:ke}),be.Z,Ae.Z)((function(e){var s=e.putDialog2StartThCr,a=e.getDialog2AllThCr,n=e.postDialog2MessageThCr,i=(e.getDialog2MessageIdViewedThCr,e.postDialog2MessageIdToSpamThCr),d=e.deleteDialog2MessageIdThCr,l=e.putDialog2MessageIdRestoreThCr,o=e.getDialog2MessagesNewerThenThCr,c=(e.getDailog2UnreadMessagesThCr,e.patch),g=e.PageWidth,m=e.MobileWidth,h=e.Dialog2All,u=e.userId,M=e.MessagesNewerThen,_=(e.setD2UserId,e.D2Item),x=e.Markers,p=e.setMarkers,v=e.setD2Item,D=e.getDialog2AllAC,j=e.myId,I=(0,r.useCallback)((function(e){d(e,u,"2022-04-30T19:10:31.843",M)}),[u,M,d]),N=document.querySelector(".second-block"),R=(0,r.useCallback)((function(){N&&N.scrollIntoView(!0)}),[N]);return(0,r.useEffect)((function(){_&&_.newMessagesCount>0&&setTimeout((function(){var e=[];h.forEach((function(s){s.id===u&&(s.hasNewMessages=!1,s.newMessagesCount=0),e.push(s)})),console.log("\u0442\u0430\u0439\u043c\u0435\u0440 \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u043b\u0441\u044f"),D(e)}),1e3)}),[_,h,D,u]),(0,r.useEffect)((function(){0===u||x.straightFirstUploaded||(console.log("\u043d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433 \u043f\u043e \u043d\u0435\u043f\u0443\u0441\u0442\u043e\u043c\u0443 userId "),s(u),p((0,t.Z)((0,t.Z)({},x),{},{straightFirstUploaded:!0})))}),[u,x,s,p]),(0,r.useEffect)((function(){if(0!==u){console.log("\u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043f\u0440\u0438 \u0441\u043c\u0435\u043d\u0435 userId"),o(u,"2022-04-30T19:10:31.843");var e=h.filter((function(e){return e.id===u}))[0];v(e)}}),[u,h,o,v]),(0,r.useEffect)((function(){"dialog2"!==c||x.Dialog2FirstUploaded||(console.log("\u0415\u0434\u0438\u043d\u0438\u0447\u043d\u043e\u0435 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0438\u0430\u043b\u043e\u0433\u043e\u0432 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 dialog2"),a(25528,1,10),p((0,t.Z)((0,t.Z)({},x),{},{Dialog2FirstUploaded:!0})))}),[u,c,x,a,p]),(0,r.useEffect)((function(){x.needToScrollBottom&&(R(),p((0,t.Z)((0,t.Z)({},x),{},{needToScrollBottom:!1})))}),[x,R,p]),(0,f.jsx)("div",{children:(0,f.jsx)(ye,{patch:c,PageWidth:g,MobileWidth:m,Dialog2All:h,MessagesNewerThen:M,Msg2DeleteMessage:I,Msg2SendMessage:function(e){n(u,e,"2022-04-30T19:10:31.843",x),x.dialogId!==u&&(s(u),p((0,t.Z)((0,t.Z)({},x),{},{dialogId:u})))},userId:u,D2Item:_,myId:j,Msg2MarkAsSpam:function(e){i(e,M)},Msg2Restore:function(e){l(e,M)}})})}))},6670:function(e,s,a){a.d(s,{$m:function(){return _},rZ:function(){return M}});var t=a(1413),r=a(9439),n=a(5987),i=a(5705),d={errorInputTextArea:"formik1_errorInputTextArea__vpmAv",errorText:"formik1_errorText__eDWui",labelWidth:"formik1_labelWidth__cwal9"},l=(a(7632),a(9410)),o=a(5313),c=a(184),g=["label","children"],m=["label","autoFocus","type","leftLabelLength"],h=["children"],u=function(e){e.label;var s=e.children,a=(0,n.Z)(e,g),t=(0,i.U$)(a.props),l=(0,r.Z)(t,1)[0];return(0,c.jsxs)(c.Fragment,{children:[s," ",l.touched&&l.error&&(0,c.jsx)("div",{className:d.errorText,children:l.error})," "]})},M=function(e){var s=e.label,a=e.autoFocus,g=e.type,h=e.leftLabelLength,M=(0,n.Z)(e,m),_=(0,i.U$)(M),x=(0,r.Z)(_,2),p=x[0],v=x[1];return(0,c.jsxs)(u,{label:s,props:M,children:[" ",(0,c.jsxs)(l.Z,{className:"my-1",size:"sm",children:[" ",h&&(0,c.jsxs)(l.Z.Text,{id:s,className:d.labelWidth,style:{width:h},children:[s,":"]}),(0,c.jsx)(o.Z.Control,(0,t.Z)((0,t.Z)((0,t.Z)({as:"textarea"===g?g:"input",type:"password"===g?g:void 0,className:v.touched&&v.error?d.errorInputTextArea:d.inputTextArea},p),M),{},{autoFocus:a}))]}),(0,c.jsx)("div",{className:d.errorText,children:v.touched&&v.error})]})},_=function(e){var s=e.children,a=(0,n.Z)(e,h),l=(0,i.U$)((0,t.Z)((0,t.Z)({},a),{},{type:"checkbox"})),o=(0,r.Z)(l,2),g=o[0],m=o[1];return(0,c.jsxs)("div",{children:[(0,c.jsxs)("label",{className:"checkbox-input",children:[(0,c.jsx)("input",(0,t.Z)((0,t.Z)({type:"checkbox"},g),a))," ",s]}),m.touched&&m.error&&(0,c.jsx)("div",{className:d.errorText,children:m.error})]})}},3990:function(e,s,a){var t=a(1413),r=(a(2791),a(8687)),n=a(7689),i=a(184),d=function(e){return{isAuth:e.auth.isAuth}};s.Z=function(e){return(0,r.$j)(d,null)((function(s){return s.isAuth?(0,i.jsx)(e,(0,t.Z)({},s)):(0,i.jsx)(n.Fg,{to:"../login"})}))}},1852:function(e,s,a){var t=a(1413),r=(a(2791),a(7689)),n=a(8687),i=a(184);s.Z=function(e){return(0,n.$j)(null,null)((function(s){var a={params:(0,r.UO)()},n=Number(a.params["*"]);return(0,i.jsx)(e,(0,t.Z)((0,t.Z)({},s),{},{userId:n}))}))}}}]);
//# sourceMappingURL=231.addd2ae0.chunk.js.map