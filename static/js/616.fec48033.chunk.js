"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[616],{1406:function(e,s,t){t.r(s),t.d(s,{default:function(){return V}});var r=t(8683),a=t(5671),o=t(3144),i=t(136),n=t(2882),l=t(2791),u="Dialogs_dialogs__dM24o",d="Dialogs_dialogList__DRCp9",g="Dialogs_knopka__xT3Jx",p="Dialogs_dialog__YZmRT",c="Dialogs_dialogCurrent__ICI5E",h="Dialogs_dialogImg__H5UvS",m="Dialogs_FieldLeft__5h4r2",D="Dialogs_buttonRight__XYfP1",f="Dialogs_FieldButtonGreed__pgs7l",I="Dialogs_dialogContainer__4-aI+",_="Dialogs_x__6nHnv",x=t(3504),v=t.p+"static/media/x.bef5ed280aeab3840a3e.png",j=t(184),M=function(e){var s=e.deleteDialog,t=e.dialogId,r=e.userPhoto,a=e.userName,o=e.userId,i=e.dialogUserID;return(0,j.jsx)("div",{className:o===i?c:p,children:(0,j.jsxs)(x.OL,{to:"/dialogs/"+o,children:[" ",(0,j.jsx)("div",{className:g,children:(0,j.jsxs)("div",{className:d,children:[(0,j.jsx)("div",{children:(0,j.jsx)("img",{src:r,alt:"userPhoto",className:h})}),(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{children:a}),(0,j.jsx)("img",{src:v,alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0434\u0438\u0430\u043b\u043e\u0433\u041b\u0438\u0441\u0442\u0430",className:_,onMouseOver:function(){},onClick:function(){s(t,o)},title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0438\u0437 \u0441\u0432\u043e\u0435\u0433\u043e \u0434\u0438\u0430\u043b\u043e\u0433\u041b\u0438\u0441\u0442\u0430"}),(0,j.jsx)("div",{children:o})]})]})})]})})},Z="Message_timeStyle__nW8fG",C="Message_x__9QsEg",T="Message_messageswrapper__KRV1p",k="Message_messageMyId__w6TOo",y="Message_messageNotMyId__wjpf9",U=function(e){var s=e.message,t=e.myID,r=e.userId,a=e.Date,o=e.MessageId,i=e.deleteMessage;return(0,j.jsxs)("div",{className:T,children:[" ",(0,j.jsxs)("div",{className:t===r?k:y,children:[" ",(0,j.jsx)("span",{children:s}),(0,j.jsx)("img",{src:v,className:C,onMouseOver:function(){},onClick:function(){i(o)},alt:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443 \u0432\u0441\u0435\u0445",title:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443 \u0432\u0441\u0435\u0445"}),(0,j.jsxs)("span",{className:Z,children:[a.Hour,":",a.Minutes]})]})]})},L=t(6139),N=t(704),P=t(2381),w=t(2853),E=t(8111),A=t(1083),F=t(6110),b=(0,N.Z)({form:"newMessageForm"})((function(e){var s=e.handleSubmit;return(0,j.jsx)("form",{onSubmit:s,children:(0,j.jsxs)("div",{className:f,children:[(0,j.jsx)("div",{className:m,children:(0,j.jsx)(L.Z,{name:"newMessageData",component:w.I,validate:[(0,E.DT)(100)],placeholder:"newMessage"})}),(0,j.jsx)("div",{className:D,children:(0,j.jsx)("button",{type:"submit",children:"Submit"})})]})})})),S=function(e){var s=e.deleteDialog,t=e.dialogUserID,r=e.getDialogList,a=e.dialogs2,o=e.messages2,i=e.dispatch,n=e.sendMessage,d=e.getDialogLastUpdateTime,g=e.myID,p=e.deleteMessage,c=a.map((function(e){var r=e.userPhoto?e.userPhoto:F;return(0,j.jsx)(M,{userName:e.userName,userId:e.userId,userPhoto:r,dialogUserID:t,deleteDialog:s,dialogId:e.dialogId})})),h=o.map((function(e){return(0,j.jsx)(U,{message:e.message,myID:g,userId:e.userId,Date:e.Date,MessageId:e.id,deleteMessage:p})}));return(0,l.useEffect)((function(){var e=setInterval((function(){d(),r()}),1e3);return function(){clearInterval(e)}}),[d,r]),(0,j.jsxs)("div",{className:u,children:[(0,j.jsxs)("div",{className:I,children:[(0,j.jsx)(A.Z,{child:c,height:window.screen.availHeight-280,firstInsideContainer:"DialogsUp",secondInsideContainer:"DialogsDown",containerElement:"DialogsContainer123"})," "]}),(0,j.jsxs)("div",{children:[(0,j.jsx)(A.Z,{child:h,height:window.screen.availHeight-280,firstInsideContainer:"MessagesUp",secondInsideContainer:"MessagesDown",containerElement:"MessagesContainer"})," ",(0,j.jsxs)("div",{children:[(0,j.jsx)(b,{onSubmit:function(e){i((0,P.mc)("newMessageForm")),n(e.newMessageData)}})," "]})]})]})},B=t(2807),H=t(8687),O=t(6512),R=t(7781),$=t(6871),q=t(8859),G=function(e){(0,i.Z)(t,e);var s=(0,n.Z)(t);function t(){var e;(0,a.Z)(this,t);for(var r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return(e=s.call.apply(s,[this].concat(o))).commonPartMountUpdate=function(){e.props.userID?e.props.dialogUserID!==e.props.userID&&(e.props.setdialogUserID(e.props.userID),e.props.getProfileThunkCreator(e.props.userID)):e.props.messages2.length>0&&(e.props.setMessages([]),e.props.setdialogUserID(null))},e.getDialogs=function(){""!==e.props.userID&&e.props.getDialogsThunkCreator(e.props.myID,e.props.userID)},e.getDialogLastUpdateTime=function(){""!==e.props.userID&&e.props.getDialogLastUpdateTimeTnkCrt(e.props.myID,e.props.userID)},e.getDialogList=function(){e.props.getMyDialogListThunkCreator(e.props.myID)},e.sendMessage=function(s){var t=0,r=0;null!==e.props.profilePage&&(t=e.props.profilePage.profile.fullName,r=e.props.profilePage.profile.photos.small),e.props.userID?(e.props.sendDialogsThunkCreator(s,e.props.auth.myID,e.props.auth.myLogin,e.props.auth.myProfile.photos.small,e.props.userID),e.props.updateDialogListThunkCreator(e.props.auth.myID,e.props.userID,t,r)):alert("\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0438\u0430\u043b\u043e\u0433")},e.deleteMessage=function(s){e.props.deleteMessageThunkCreator(s,e.props.myID,e.props.userID)},e.deleteDialog=function(s,t){e.props.deleteDialogThunkCreator(s,e.props.myID,t)},e}return(0,o.Z)(t,[{key:"componentDidMount",value:function(){this.getDialogList(),this.commonPartMountUpdate()}},{key:"componentDidUpdate",value:function(e,s,t){this.commonPartMountUpdate(),this.props.dialogLastUpdateTime!==e.dialogLastUpdateTime&&this.getDialogs()}},{key:"render",value:function(){return(0,j.jsx)("div",{children:(0,j.jsx)(S,(0,r.Z)((0,r.Z)({messages2:this.props.messages2,dialogs:this.props.dialogs,dialogs2:this.props.dialogs2},this.props),{},{sendMessage:this.sendMessage,getDialogs:this.getDialogs,getDialogLastUpdateTime:this.getDialogLastUpdateTime,myID:this.props.myID,deleteMessage:this.deleteMessage,getDialogList:this.getDialogList,dialogUserID:this.props.dialogUserID,deleteDialog:this.deleteDialog}))})}}]),t}(l.Component);var V=(0,R.qC)((0,H.$j)((function(e){return{isAuth:e.auth.isAuth,myID:e.auth.myID,dialogUserID:e.dialogsPage.dialogUserID,messages2:e.dialogsPage.messages2,dialogs:e.dialogsPage.dialogs,dialogLastUpdateTime:e.dialogsPage.dialogLastUpdateTime,dialogs2:e.dialogsPage.dialogs2,profilePage:e.profilePage,auth:e.auth}}),(function(e){return{sendDialogsThunkCreator:function(s,t,r,a,o){e((0,B.nB)(s,t,r,a,o))},getDialogsThunkCreator:function(s,t){e((0,B.kp)(s,t))},setdialogUserID:function(s){e((0,B.Pg)(s))},setMessages:function(s){e((0,B.Z)(s))},getDialogLastUpdateTimeTnkCrt:function(s,t){e((0,B.kB)(s,t))},deleteMessageThunkCreator:function(s,t,r){e((0,B.EF)(s,t,r))},getProfileThunkCreator:function(s){e((0,q.aI)(s))},getFollowThunkCreator:function(s){e((0,B.fB)(s))},getMyDialogListThunkCreator:function(s){e((0,B.l)(s))},updateDialogListThunkCreator:function(s,t,r,a){e((0,B.wB)(s,t,r,a))},deleteDialogThunkCreator:function(s,t,r){e((0,B.LZ)(s,t,r))},dispatch:e}})),(function(e){return function(s){var t={params:(0,$.UO)()},a=Number(t.params["*"]);return(0,j.jsx)(e,(0,r.Z)((0,r.Z)({},s),{},{match:t,userID:a}))}}),O.D)(G)},2853:function(e,s,t){t.d(s,{I:function(){return d},g:function(){return u}});var r=t(8683),a=t(5987),o=(t(2791),t(9006)),i=t(184),n=["input","meta"],l=["input","meta"],u=function(e){var s=e.input,t=e.meta,l=(0,a.Z)(e,n),u=t.touched&&t.error;return(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{children:(0,i.jsx)("textarea",(0,r.Z)((0,r.Z)({},s),{},{placeholder:l.placeholder,className:u?o.Z.textAreaError:o.Z.textArea}))}),(0,i.jsx)("div",{children:u?(0,i.jsx)("span",{className:o.Z.textError,children:t.error}):null})]})},d=function(e){var s=e.input,t=e.meta,n=(0,a.Z)(e,l),u=t.touched&&t.error;return(0,i.jsxs)("span",{children:[(0,i.jsx)("span",{children:(0,i.jsx)("input",(0,r.Z)((0,r.Z)({},s),{},{placeholder:n.placeholder,className:u?o.Z.InputError:o.Z.Input}))}),(0,i.jsx)("div",{children:u?(0,i.jsx)("span",{className:o.Z.textError,children:t.error}):null})]})}},8111:function(e,s,t){t.d(s,{DT:function(){return a},Do:function(){return o},aH:function(){return r}});var r=function(e){return e?void 0:"Field is required"},a=function(e){return function(s){return s&&s.length>e?"MaxLength is ".concat(e):void 0}},o=function(e){return e&&!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)?"Invalid email address":void 0}},6512:function(e,s,t){t.d(s,{D:function(){return c}});var r=t(8683),a=t(5671),o=t(3144),i=t(136),n=t(2882),l=t(2791),u=t(8687),d=t(6871),g=t(184),p=function(e){return{isAuth:e.auth.isAuth}},c=function(e){var s=function(s){(0,i.Z)(l,s);var t=(0,n.Z)(l);function l(){return(0,a.Z)(this,l),t.apply(this,arguments)}return(0,o.Z)(l,[{key:"render",value:function(){return this.props.isAuth?(0,g.jsx)(e,(0,r.Z)({},this.props)):(0,g.jsx)(d.Fg,{to:"../login"})}}]),l}(l.Component);return(0,u.$j)(p)(s)}},9006:function(e,s){s.Z={textAreaError:"customFields_textAreaError__R-r1L",textArea:"customFields_textArea__DhXBS",textError:"customFields_textError__koMT7",commonError:"customFields_commonError__Um+7V",Input:"customFields_Input__lhbLD",InputError:"customFields_InputError__9Zp9E"}}}]);
//# sourceMappingURL=616.fec48033.chunk.js.map