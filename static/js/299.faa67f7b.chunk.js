"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[299],{6118:function(e,s,a){a.r(s),a.d(s,{default:function(){return K}});var i=a(8683),o=a(5671),t=a(3144),r=a(136),l=a(7277),n=a(2791),d="Dialogs_dialogs__dM24o",g="Dialogs_dialogList__DRCp9",p="Dialogs_dialogListHeader__LoidE",u="Dialogs_messagesHeader__0aYgL",c="Dialogs_knopka__xT3Jx",h="Dialogs_dialogItemGreed__AaCdb",m="Dialogs_dialog__YZmRT",D="Dialogs_dialogCurrent__ICI5E",I="Dialogs_dialogImg__H5UvS",f="Dialogs_dialogContainer__4-aI+",_="Dialogs_x__6nHnv",x=a(1087),v=a.p+"static/media/x.bef5ed280aeab3840a3e.png",j=a(2056),M=a(184),C=function(e){var s=e.deleteDialog,a=e.dialogId,i=e.userPhoto,o=e.userName,t=e.userId,r=e.dialogUserID;return(0,M.jsx)("div",{className:t===r?D:m,children:(0,M.jsxs)("div",{className:h,children:["  ",(0,M.jsx)("div",{children:(0,M.jsxs)(x.OL,{to:"/dialogs/"+t,children:[" ",(0,M.jsx)("div",{className:c,children:(0,M.jsxs)("div",{className:g,children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("img",{src:i,alt:"userPhoto",className:I})," "]}),(0,M.jsxs)("div",{children:[(0,M.jsx)("div",{children:o})," "]})]})})]})}),(0,M.jsx)("div",{children:(0,M.jsx)(j.j,{children:(0,M.jsx)("img",{src:v,alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0434\u0438\u0430\u043b\u043e\u0433\u041b\u0438\u0441\u0442\u0430",className:_,onMouseOver:function(){},onClick:function(){s(a,t)},title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0434\u0438\u0430\u043b\u043e\u0433\u041b\u0438\u0441\u0442\u0430"})})})]})})},y="Message_timeStyle__nW8fG",k="Message_x__9QsEg",T="Message_messageswrapper__KRV1p",U="Message_messageMyId__w6TOo",L="Message_messageNotMyId__wjpf9",P=function(e){var s=e.message,a=e.myId,i=e.userId,o=e.Date,t=e.MessageId,r=e.deleteMessage;return(0,M.jsxs)("div",{className:T,children:[" ",(0,M.jsxs)("div",{className:a===i?U:L,children:[" ",(0,M.jsx)("span",{children:s}),(0,M.jsx)("img",{src:v,className:k,onMouseOver:function(){},onClick:function(){r(t)},alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443 \u0432\u0441\u0435\u0445",title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443 \u0432\u0441\u0435\u0445"}),(0,M.jsxs)("span",{className:y,children:[o.Hour,":",o.Minutes]})]})]})},N=a(1083),w=a(6110),Z=a(2506),b=a(2797),H="Dialogs_MyPosts__qPzH8",E="Dialogs_fieldButtonGrid__brdxv",S=a(3127),B={newMessage:""},F=b.Ry({}),R=function(e){var s=e.sendMessage;return(0,M.jsx)(M.Fragment,{children:(0,M.jsx)(Z.J9,{initialValues:B,validationSchema:F,onSubmit:function(e,a){var i=a.resetForm;s(e.newMessage),i()},children:function(e){e.handleReset;return(0,M.jsx)(Z.l0,{className:H,children:(0,M.jsxs)("div",{className:E,children:[(0,M.jsx)("div",{children:(0,M.jsx)(S.rZ,{label:"",name:"newMessage",type:"text",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",autoFocus:!0})}),(0,M.jsx)("div",{children:(0,M.jsxs)("button",{type:"submit",children:[" ","Submit"]})})]})})}})})},A=function(e){var s=e.deleteDialog,a=e.dialogUserID,i=e.getDialogList,o=e.dialogs2,t=e.messages2,r=e.sendMessage,l=e.getDialogLastUpdateTime,g=e.myId,c=e.deleteMessage,h=o.map((function(e){var i=e.userPhoto?e.userPhoto:w;return(0,M.jsx)(C,{userName:e.userName,userId:e.userId,userPhoto:i,dialogUserID:a,deleteDialog:s,dialogId:e.dialogId},e.userId)})),m=t.map((function(e){return(0,M.jsx)(P,{message:e.message,myId:g,userId:e.userId,Date:e.Date,MessageId:e.id,deleteMessage:c},e.id+e.message)}));return(0,n.useEffect)((function(){var e=setInterval((function(){l(),i()}),1e3);return function(){clearInterval(e)}}),[l,i]),(0,M.jsxs)("div",{className:d,children:[(0,M.jsxs)("div",{children:[(0,M.jsx)("h3",{className:p,children:"dialogList"}),(0,M.jsxs)("div",{className:f,children:[(0,M.jsx)(N.Z,{child:h,height:window.screen.availHeight-277,firstInsideContainer:"DialogsUp",secondInsideContainer:"DialogsDown",containerElement:"DialogsContainer123"})," "]})]}),(0,M.jsxs)("div",{children:[(0,M.jsx)("h3",{className:u,children:"Messages"}),(0,M.jsx)(N.Z,{child:m,height:window.screen.availHeight-300,firstInsideContainer:"MessagesUp",secondInsideContainer:"MessagesDown",containerElement:"MessagesContainer"})," ",(0,M.jsx)("div",{children:(0,M.jsx)(R,{sendMessage:r})})]})]})},O=a(2807),G=a(3531),q=a(7781),J=a(8859),V=a(3990),Y=a(1852),z=function(e){(0,r.Z)(a,e);var s=(0,l.Z)(a);function a(){var e;(0,o.Z)(this,a);for(var i=arguments.length,t=new Array(i),r=0;r<i;r++)t[r]=arguments[r];return(e=s.call.apply(s,[this].concat(t))).commonPartMountUpdate=function(){e.props.userId?e.props.dialogUserID!==e.props.userId&&(e.props.setdialogUserID(e.props.userId),e.props.getProfileThunkCreator(e.props.userId,!0,e.props.myId)):e.props.messages2.length>0&&(e.props.setMessages([]),e.props.setdialogUserID(null))},e.getDialogs=function(){""!==e.props.userId&&e.props.getDialogsThunkCreator(e.props.myId,e.props.userId)},e.getDialogLastUpdateTime=function(){""!==e.props.userId&&e.props.getDialogLastUpdateTimeTnkCrt(e.props.myId,e.props.userId)},e.getDialogList=function(){e.props.getMyDialogListThunkCreator(e.props.myId)},e.sendMessage=function(s){if(e.props.userId){if(s){var a=0,i=0;null!==e.props.profilePage&&(a=e.props.profilePage.profile.fullName,i=e.props.profilePage.profile.photos.small),e.props.sendDialogsThunkCreator(s,e.props.auth.myId,e.props.auth.myLogin,e.props.auth.myProfile.photos.small,e.props.userId),e.props.updateDialogListThunkCreator(e.props.auth.myId,e.props.userId,a,i)}}else alert("\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043b\u043e\u0433")},e.deleteMessage=function(s){e.props.deleteMessageThunkCreator(s,e.props.myId,e.props.userId)},e.deleteDialog=function(s,a){e.props.deleteDialogThunkCreator(s,e.props.myId,a)},e}return(0,t.Z)(a,[{key:"componentDidMount",value:function(){this.getDialogList(),this.commonPartMountUpdate()}},{key:"componentDidUpdate",value:function(e,s,a){this.commonPartMountUpdate(),this.props.dialogLastUpdateTime!==e.dialogLastUpdateTime&&this.getDialogs()}},{key:"render",value:function(){return(0,M.jsx)("div",{children:(0,M.jsx)(A,(0,i.Z)((0,i.Z)({messages2:this.props.messages2,dialogs:this.props.dialogs,dialogs2:this.props.dialogs2},this.props),{},{sendMessage:this.sendMessage,getDialogs:this.getDialogs,getDialogLastUpdateTime:this.getDialogLastUpdateTime,myId:this.props.myId,deleteMessage:this.deleteMessage,getDialogList:this.getDialogList,dialogUserID:this.props.dialogUserID,deleteDialog:this.deleteDialog}))})}}]),a}(n.Component),K=(0,q.qC)((0,G.$j)((function(e){return{isAuth:e.auth.isAuth,myId:e.auth.myId,dialogUserID:e.dialogsPage.dialogUserID,messages2:e.dialogsPage.messages2,dialogs:e.dialogsPage.dialogs,dialogLastUpdateTime:e.dialogsPage.dialogLastUpdateTime,dialogs2:e.dialogsPage.dialogs2,profilePage:e.profilePage,auth:e.auth,editProfileStatus:e.auth.editProfileStatus}}),{sendDialogsThunkCreator:O.nB,getDialogsThunkCreator:O.kp,setdialogUserID:O.Pg,setMessages:O.Z,getDialogLastUpdateTimeTnkCrt:O.kB,deleteMessageThunkCreator:O.EF,getProfileThunkCreator:J.aI,getFollowThunkCreator:O.fB,getMyDialogListThunkCreator:O.l,updateDialogListThunkCreator:O.wB,deleteDialogThunkCreator:O.LZ}),Y.Z,V.Z)(z)}}]);
//# sourceMappingURL=299.faa67f7b.chunk.js.map