"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[708],{2708:function(e,s,a){a.r(s),a.d(s,{default:function(){return Ye}});var t=a(1413),r=a(2791),n=a(8687),d=a(5870),i="dialog2Messages2COM_dialog2Messages2Common__yrugD",o=a(9439),l="dialog2Render_Fixed__yAlTJ",c="dialog2Render_dialog2ListCommon__ZMqFo",g="dialog2Render_MobileDialogWidth__ahAt-",m="dialog2Render_DesktopDialogWidth__zSxVR",u="dialog2Render_Dialog2ItemCardExt__LODJo",h="dialog2Render_Dialog2ItemCardInt__HQqPI",M="dialog2Render_Dialog2ItemCardName__zSixE",_="dialog2Render_Dialog2ItemCardPhoto__jPmgw",x="dialog2Render_Dialog2ItemCardNewMsgCnt__TrWvv",p="dialog2Render_Dialog2ItemCardMsgTime__2bCd+",v="dialog2Render_dialog2HeaderCommon__YO-4Y",D="dialog2Render_Dialog2SearchInput__uF7Sy",f="dialog2Render_MagnifyingGlass__VpERP",j=a(6110),N=a(1087),I=function(e){var s,a=new Date(e?new Date(e).getTime()+108e5:0),t=!!e&&(new Date).getFullYear()===a.getFullYear()&&(new Date).getMonth()===a.getMonth()&&(new Date).getDate()===a.getDate(),r=("0"+a.getFullYear()).substr(-4),n=a.getMonth(),d=("0"+a.getDate()).substr(-2),i=("0"+a.getHours()).substr(-2),o=("0"+a.getMinutes()).substr(-2),l=("0"+a.getSeconds()).substr(-2);switch(n){case 0:s="01";break;case 1:s="02";break;case 2:s="03";break;case 3:s="04";break;case 4:s="05";break;case 5:s="06";break;case 6:s="07";break;case 7:s="08";break;case 8:s="09";break;case 9:s="10";break;case 10:s="11";break;case 11:s="12";break;default:s=""}return{Year:r,Month:s,Day:d,Hour:i,Minutes:o,Seconds:l,isToday:t}},b=a(184),y=function(e){var s=e.userName,a=e.hasNewMessages,t=e.photos,r=e.lastDialogActivityDate,n=e.newMessagesCount,d=e.id,i=I(r);return(0,b.jsx)("div",{className:u,children:(0,b.jsx)(N.OL,{to:"/messages/"+d,children:(0,b.jsxs)("div",{className:h,children:[(0,b.jsx)("div",{className:M,children:s}),"   ",a&&(0,b.jsx)("div",{className:x,children:n})," ",(0,b.jsx)("img",{src:t.small?t.small:j,className:_,alt:"CardPhoto"})," ",(0,b.jsx)("div",{className:p,children:i.isToday?(0,b.jsxs)("span",{children:[" ",i.Hour,":",i.Minutes]}):(0,b.jsxs)("span",{children:[" ",i.Day," ",i.Month," ",i.Year]})})]})})})},R=r.memo(y);var T=a.p+"static/media/magnifying-glass.3e5e2c21301cb96ebac59d5c181f8886.svg",C=function(e){var s=e.SearchValue,a=e.setSearchValue;return(0,b.jsxs)("div",{children:[(0,b.jsx)("input",{placeholder:"\u041f\u043e\u0438\u0441\u043a",value:s,onChange:function(e){return a(e.target.value)},type:"text",className:D}),(0,b.jsx)("img",{src:T,className:f,alt:"\u041f\u043e\u0438\u0441\u043a"})]})},S=function(e){var s=e.PageWidth,a=e.MobileWidth,t=e.patch,n=e.Dialog2All,d=(0,r.useState)(""),i=(0,o.Z)(d,2),u=i[0],h=i[1],M=n&&n.filter((function(e){return e.userName.toLowerCase().includes(u.toLowerCase())}));return(0,b.jsx)("div",{children:("messages"===t&&s>a||"dialog2"===t)&&(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"".concat(l," ").concat(v," ").concat(s<a?g:m),children:(0,b.jsx)(C,{SearchValue:u,setSearchValue:h})}),(0,b.jsx)("div",{className:"".concat(l," ").concat(c," ").concat(s<a?g:m),children:M.map((function(e){var s=e.id,a=e.userName,t=e.hasNewMessages,r=e.lastDialogActivityDate,n=e.newMessagesCount,d=e.photos;return(0,b.jsx)(R,{userName:a,hasNewMessages:t,photos:d,lastDialogActivityDate:r,newMessagesCount:n,id:s},s)}))})]})})},w=r.memo(S),A="messages2Render_Fixed__baHQ8",k="messages2Render_messages2NameAndProfileLink__gsVN6",Z="messages2Render_messages2ChooseDialog__JKbif",W="messages2Render_messages2RenderMessages__Ebe0U",P="messages2Render_messages2PrintMessage__dhozP",F="messages2Render_MobileMessagesLeft__6JOQ+",L="messages2Render_DesktopMessagesLeft__rsM5T",E="messages2Render_Msg2HeaderName__Mw++x",H="messages2Render_Msg2HeaderPhoto__XGI9W",Y="messages2Render_Msg2HeaderActivityDate__ZWTOr",U="messages2Render_myIdNotMyIdMsg2ComExt__oPyxL",V="messages2Render_myIdMessageExt__41EAp",O="messages2Render_NOTmyIdMessageExt__5fs33",B="messages2Render_myIdNotMyIdMsg2ComInt__Estd7",z="messages2Render_myIdMessageInt__xSaFZ",q="messages2Render_NOTmyIdMessageInt__hPt2K",$="messages2Render_Msg2DropDownMenuExt__az4N7",J="messages2Render_Msg2DropDownMenuIntCommon__vMw3j",K="messages2Render_Msg2DropDownMenuIntMy__6FgWz",Q="messages2Render_Msg2DropDownMenuIntNotMy__Yf+sf",G="messages2Render_Msg2DropDownItems__Qu0q7",X="messages2Render_positionRelative__ovQvp",ee="messages2Render_DropdownItem__AtL0R",se="messages2Render_imgDelete__qGmmU",ae="messages2Render_imgSpam__tMesr",te="messages2Render_imgRestore__YIG+H",re="messages2Render_Msg2ItemAdedAtCommon__JW5T8",ne="messages2Render_ColorMy__HqHhB",de="messages2Render_ColorNotMy__X-mAo",ie="messages2Render_Msg2DeletedText__lBh9V",oe="messages2Render_Msg2DeletedPic__V5oiT",le="messages2Render_Msg2SpamPic__wTzWN",ce="messages2Render_Msg2Body__dWvTp",ge="messages2Render_Msg2DateExt__3e0xK",me="messages2Render_Msg2DateInt__G4Q4g",ue=a(8789);var he=a.p+"static/media/dust-bin2.9f266211d62f71a82d41f9c57beb3d28.svg";var Me=a.p+"static/media/spam1.c38e496626cdf8fb2aae68cddb1227de.svg";var _e=a.p+"static/media/restore1.1c96ab0dd3d42ca07131c5eb6a164a47.svg",xe=function(e){var s=e.Msg2DeleteMessage,a=e.id,t=e.isMyMessage,r=e.Msg2MarkAsSpam,n=e.Msg2Restore,d=e.deletedBySender,i=e.isSpam;return(0,b.jsx)(b.Fragment,{children:(0,b.jsx)("div",{children:(0,b.jsxs)(ue.Z,{children:[(0,b.jsx)(ue.Z.Toggle,{className:"".concat(t?K:Q," \n                         ").concat(J)}),(0,b.jsxs)(ue.Z.Menu,{className:G,children:[!d&&(0,b.jsxs)(ue.Z.Item,{className:X,eventKey:"1",onClick:function(){s(a)},children:[(0,b.jsx)("div",{className:ee,children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0443 \u043c\u0435\u043d\u044f"}),(0,b.jsx)("img",{src:he,className:se,alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0443 \u043c\u0435\u043d\u044f"})]}),!t&&!i&&(0,b.jsxs)(ue.Z.Item,{className:X,eventKey:"2",onClick:function(){r(a)},children:[(0,b.jsx)("div",{className:ee,children:"\u0412 \u0441\u043f\u0430\u043c"}),(0,b.jsx)("img",{src:Me,className:ae,alt:"\u0412 \u0441\u043f\u0430\u043c"})]}),(d||i)&&(0,b.jsxs)(ue.Z.Item,{className:X,eventKey:"3",onClick:function(){n(a)},children:[(0,b.jsx)("div",{className:ee,children:"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,b.jsx)("img",{src:_e,className:te,alt:"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"})]})]})]})})})},pe=function(e){var s=e.id,a=e.body,t=e.Msg2DeleteMessage,n=e.addedAt,d=e.senderId,i=e.myId,l=e.Msg2MarkAsSpam,c=e.Msg2Restore,g=e.deletedBySender,m=e.isSpam,u=e.addedAtPrev,h=I(n),M=I(u),_=i===d,x=(0,r.useState)(""),p=(0,o.Z)(x,2),v=p[0],D=p[1];return(0,b.jsxs)("div",{children:["".concat(h.Day,"-").concat(h.Month,"-").concat(h.Year)!=="".concat(M.Day,"-").concat(M.Month,"-").concat(M.Year)&&(0,b.jsx)("div",{className:ge,children:(0,b.jsxs)("div",{className:me,children:[h.Day,".",h.Month,".",h.Year]})}),(0,b.jsx)("div",{className:"".concat(U," ").concat(_?V:O),children:(0,b.jsxs)("div",{className:"".concat(B," ").concat(_?z:q),onMouseOver:function(){D(s)},onMouseLeave:function(){D("")},children:[g?(0,b.jsxs)("div",{children:[(0,b.jsx)("img",{className:oe,src:he,alt:""}),(0,b.jsx)("div",{className:ie,children:" \u044d\u0442\u043e \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u043e"})]}):(0,b.jsx)("div",{className:ce,children:a}),(0,b.jsxs)("div",{className:"".concat(re," ").concat(_?ne:de),children:[h.Hour,":",h.Minutes]}),m&&(0,b.jsx)("img",{className:le,src:Me,alt:""}),(0,b.jsx)("div",{className:$,children:v===s&&(0,b.jsx)(xe,{Msg2DeleteMessage:t,id:s,isMyMessage:_,Msg2MarkAsSpam:l,Msg2Restore:c,deletedBySender:g,isSpam:m})})]})})]})},ve=r.memo(pe),De=a(5705),fe=a(1724),je=a(6670),Ne=a(3360),Ie=a(2592);var be=a.p+"static/media/send-svg2.fca4a68a54e7d25372f7430fe55f0653.svg",ye="Msg2SendMessageRender_sendSwg__etLEs",Re={newMessage:""},Te=fe.Ry({}),Ce=function(e){var s=e.Msg2SendMessage;return(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(De.J9,{initialValues:Re,validationSchema:Te,onSubmit:function(e,a){var t=a.resetForm;s(e.newMessage),t()},children:function(e){e.handleReset;var s=e.values;return(0,b.jsx)(De.l0,{children:(0,b.jsxs)("div",{className:"d-flex d-inline-block justify-content-center align-items-center",children:[(0,b.jsx)("div",{className:"col-9",children:(0,b.jsx)(je.rZ,{label:"",autoFocus:!1,name:"newMessage",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",leftLabelLength:""})}),(0,b.jsx)("div",{children:(0,b.jsx)(Ne.Z,{variant:"light",className:"mx-2",type:"submit",disabled:!s.newMessage,children:(0,b.jsx)(Ie.Z,{src:be,className:ye,alt:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",title:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"})})})]})})}})})},Se=r.memo(Ce),we=function(e){var s=e.userId,a=e.D2Item,t=a&&a.photos&&a.photos.small?a.photos.small:j,r=I(a&&a.lastUserActivityDate);return(0,b.jsx)("div",{children:a&&(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:E,children:a&&a.userName}),(0,b.jsx)(N.OL,{to:"/profile/"+s,children:(0,b.jsx)("img",{className:H,src:t,alt:"photoSrc"})}),(0,b.jsxs)("div",{className:Y,children:["\u0411\u044b\u043b(\u0430): "," ",a&&r.isToday?(0,b.jsxs)("span",{children:[" \u0441\u0435\u0433\u043e\u0434\u043d\u044f \u0432 ",r.Hour,":",r.Minutes]}):(0,b.jsxs)("span",{children:[" ",r.Day,".",r.Month,".",r.Year]})]})]})})},Ae=r.memo(we),ke=function(e){var s=e.PageWidth,a=e.MobileWidth,t=e.patch,r=e.MessagesNewerThen,n=e.Msg2DeleteMessage,d=e.Msg2SendMessage,i=e.userId,o=e.D2Item,l=e.myId,c=e.Msg2MarkAsSpam,g=e.Msg2Restore;return(0,b.jsxs)("div",{children:["dialog2"===t&&s>a&&(0,b.jsx)("div",{className:"".concat(A," ").concat(Z),children:" \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043b\u043e\u0433"}),"messages"===t&&(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"".concat(A," ").concat(k," ").concat(s<a?F:L),children:(0,b.jsx)(Ae,{userId:i,D2Item:o})}),(0,b.jsxs)("div",{className:"".concat(A," ").concat(W," ").concat(s<a?F:L),children:[r.map((function(e,s,a){var t=e.id,r=e.body,d=e.addedAt,i=e.senderId,o=e.deletedBySender,m=e.isSpam,u=s>0?a[s-1].addedAt:"";return(0,b.jsx)(ve,{id:t,body:r,Msg2DeleteMessage:n,addedAt:d,senderId:i,myId:l,Msg2MarkAsSpam:c,Msg2Restore:g,deletedBySender:o,isSpam:m,addedAtPrev:u},t)})),(0,b.jsx)("div",{className:"second-block"})]}),(0,b.jsx)("div",{className:"".concat(A," ").concat(P," ").concat(s<a?F:L),children:(0,b.jsx)(Se,{Msg2SendMessage:d})})]})]})},Ze=function(e){var s=e.patch,a=e.PageWidth,t=e.MobileWidth,r=e.Dialog2All,n=e.MessagesNewerThen,d=e.Msg2DeleteMessage,o=e.Msg2SendMessage,l=e.userId,c=e.D2Item,g=e.myId,m=e.Msg2MarkAsSpam,u=e.Msg2Restore;return(0,b.jsxs)("div",{className:i,children:[(0,b.jsx)(w,{PageWidth:a,MobileWidth:t,patch:s,Dialog2All:r}),(0,b.jsx)(ke,{PageWidth:a,MobileWidth:t,patch:s,MessagesNewerThen:n,Msg2DeleteMessage:d,Msg2SendMessage:o,userId:l,D2Item:c,myId:g,Msg2MarkAsSpam:m,Msg2Restore:u})]})},We=a(7781),Pe=a(1852),Fe=a(3990),Le=d.rP.setMarkers,Ee=d.rP.setD2Item,He=d.rP.getDialog2AllAC,Ye=(0,We.qC)((0,n.$j)((function(e){return{patch:e.app.patch,PageWidth:e.app.PageWidth,MobileWidth:e.app.MobileWidth,Dialog2All:e.dialog2.Dialog2All,MessagesNewerThen:e.dialog2.MessagesNewerThen,D2Item:e.dialog2.D2Item,Markers:e.dialog2.Markers,myId:e.auth.myId}}),{putDialog2StartThCr:d.H3,getDialog2AllThCr:d.sz,postDialog2MessageThCr:d.D9,getDialog2MessageIdViewedThCr:d.xX,postDialog2MessageIdToSpamThCr:d.ho,deleteDialog2MessageIdThCr:d.fv,putDialog2MessageIdRestoreThCr:d.HY,getDialog2MessagesNewerThenThCr:d.vu,getDailog2UnreadMessagesThCr:d.mO,setMarkers:Le,getDialog2AllAC:He,setD2Item:Ee}),Pe.Z,Fe.Z)((function(e){var s=e.putDialog2StartThCr,a=e.getDialog2AllThCr,n=e.postDialog2MessageThCr,d=(e.getDialog2MessageIdViewedThCr,e.postDialog2MessageIdToSpamThCr),i=e.deleteDialog2MessageIdThCr,o=e.putDialog2MessageIdRestoreThCr,l=e.getDialog2MessagesNewerThenThCr,c=(e.getDailog2UnreadMessagesThCr,e.patch),g=e.PageWidth,m=e.MobileWidth,u=e.Dialog2All,h=e.userId,M=e.MessagesNewerThen,_=e.D2Item,x=e.Markers,p=e.setMarkers,v=e.getDialog2AllAC,D=e.myId,f=e.setD2Item,j=(0,r.useCallback)((function(e){i(e,h,"2022-04-30T19:10:31.843",M)}),[h,M,i]),N=document.querySelector(".second-block"),I=(0,r.useCallback)((function(){N&&N.scrollIntoView(!0)}),[N]);return(0,r.useEffect)((function(){_&&_.newMessagesCount>0&&setTimeout((function(){var e=[];u.forEach((function(s){s.id===h&&(s.hasNewMessages=!1,s.newMessagesCount=0),e.push(s)})),console.log("\u0442\u0430\u0439\u043c\u0435\u0440 \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u043b\u0441\u044f"),v(e)}),1e3)}),[_,u,v,h]),(0,r.useEffect)((function(){0===h||x.straightFirstUploaded||(console.log("\u043d\u0430\u0447\u0430\u0442\u044c \u0434\u0438\u0430\u043b\u043e\u0433 \u043f\u043e \u043d\u0435\u043f\u0443\u0441\u0442\u043e\u043c\u0443 userId "),s(h),p((0,t.Z)((0,t.Z)({},x),{},{straightFirstUploaded:!0})))}),[h,x,s,p]),(0,r.useEffect)((function(){if(0!==h&&(0===M.length||M.length>0&&M[0].senderId!==h&&M[0].recipientId!==h)){console.log("\u043f\u043e\u043b\u0443\u0447\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u043f\u0440\u0438 \u0441\u043c\u0435\u043d\u0435 userId",h),l(h,"2022-04-30T19:10:31.843");var e=u.filter((function(e){return e.id===h}))[0];f(e)}}),[h,u,l,f]),(0,r.useEffect)((function(){"dialog2"===c&&!x.Dialog2FirstUploaded&&D&&(console.log("\u0415\u0434\u0438\u043d\u0438\u0447\u043d\u043e\u0435 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u0435 \u0441\u043f\u0438\u0441\u043a\u0430 \u0434\u0438\u0430\u043b\u043e\u0433\u043e\u0432 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435 dialog2"),a(D,1,10),p((0,t.Z)((0,t.Z)({},x),{},{Dialog2FirstUploaded:!0})))}),[h,c,x,a,p,D]),(0,r.useEffect)((function(){x.needToScrollBottom&&(I(),p((0,t.Z)((0,t.Z)({},x),{},{needToScrollBottom:!1})))}),[x,I,p]),(0,b.jsx)("div",{children:(0,b.jsx)(Ze,{patch:c,PageWidth:g,MobileWidth:m,Dialog2All:u,MessagesNewerThen:M,Msg2DeleteMessage:j,Msg2SendMessage:function(e){n(h,e,"2022-04-30T19:10:31.843",x),x.dialogId!==h&&(s(h),p((0,t.Z)((0,t.Z)({},x),{},{dialogId:h})))},userId:h,D2Item:_,myId:D,Msg2MarkAsSpam:function(e){d(e,M)},Msg2Restore:function(e){o(e,M)}})})}))},6670:function(e,s,a){a.d(s,{$m:function(){return _},rZ:function(){return M}});var t=a(1413),r=a(9439),n=a(5987),d=a(5705),i={errorInputTextArea:"formik1_errorInputTextArea__vpmAv",errorText:"formik1_errorText__eDWui",labelWidth:"formik1_labelWidth__cwal9"},o=(a(7632),a(9410)),l=a(5313),c=a(184),g=["label","children"],m=["label","autoFocus","type","leftLabelLength"],u=["children"],h=function(e){e.label;var s=e.children,a=(0,n.Z)(e,g),t=(0,d.U$)(a.props),o=(0,r.Z)(t,1)[0];return(0,c.jsxs)(c.Fragment,{children:[s," ",o.touched&&o.error&&(0,c.jsx)("div",{className:i.errorText,children:o.error})," "]})},M=function(e){var s=e.label,a=e.autoFocus,g=e.type,u=e.leftLabelLength,M=(0,n.Z)(e,m),_=(0,d.U$)(M),x=(0,r.Z)(_,2),p=x[0],v=x[1];return(0,c.jsxs)(h,{label:s,props:M,children:[" ",(0,c.jsxs)(o.Z,{className:"my-1",size:"sm",children:[" ",u&&(0,c.jsxs)(o.Z.Text,{id:s,className:i.labelWidth,style:{width:u},children:[s,":"]}),(0,c.jsx)(l.Z.Control,(0,t.Z)((0,t.Z)((0,t.Z)({as:"textarea"===g?g:"input",type:"password"===g?g:void 0,className:v.touched&&v.error?i.errorInputTextArea:i.inputTextArea},p),M),{},{autoFocus:a}))]}),(0,c.jsx)("div",{className:i.errorText,children:v.touched&&v.error})]})},_=function(e){var s=e.children,a=(0,n.Z)(e,u),o=(0,d.U$)((0,t.Z)((0,t.Z)({},a),{},{type:"checkbox"})),l=(0,r.Z)(o,2),g=l[0],m=l[1];return(0,c.jsxs)("div",{children:[(0,c.jsxs)("label",{className:"checkbox-input",children:[(0,c.jsx)("input",(0,t.Z)((0,t.Z)({type:"checkbox"},g),a))," ",s]}),m.touched&&m.error&&(0,c.jsx)("div",{className:i.errorText,children:m.error})]})}},3990:function(e,s,a){var t=a(1413),r=(a(2791),a(8687)),n=a(7689),d=a(184),i=function(e){return{isAuth:e.auth.isAuth}};s.Z=function(e){return(0,r.$j)(i,null)((function(s){return s.isAuth?(0,d.jsx)(e,(0,t.Z)({},s)):(0,d.jsx)(n.Fg,{to:"../login"})}))}},1852:function(e,s,a){var t=a(1413),r=(a(2791),a(7689)),n=a(8687),d=a(184);s.Z=function(e){return(0,n.$j)(null,null)((function(s){var a={params:(0,r.UO)()},n=Number(a.params["*"]);return(0,d.jsx)(e,(0,t.Z)((0,t.Z)({},s),{},{userId:n}))}))}}}]);
//# sourceMappingURL=708.2656483a.chunk.js.map