"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[888],{6888:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var o=n(7781),i=n(8687),r=n(81),l=n(1852),s=n(3990),a=n(2791),u=n(6159),c="photo_profilePhotoIMG__mxxH2",d="photo_FileUploadInt__yz31V",f=n(9603),v=n(2592),m=n(5313),h=n(184),p=function(e){var t=e.photo,n=e.isMyProfile,o=e.onChangeLocal;return(0,h.jsxs)("div",{children:[(0,h.jsx)("div",{className:f.Z.toCenter,children:(0,h.jsx)(v.Z,{fluid:!0,alt:"userPhoto",className:"".concat(c," "),src:t})}),n&&(0,h.jsx)("div",{children:(0,h.jsx)(m.Z.Control,{type:"file",onChange:o,className:d})})]})},x=n(6110),j=function(){var e;console.log("PhotoContainer");var t=(0,i.I0)(),n=(0,i.v9)((function(e){return e.profilePage.profile})),o=(0,i.v9)((function(e){var t;return null===(t=e.profilePage.profile)||void 0===t?void 0:t.userId})),l=(0,i.v9)((function(e){return e.auth.myId})),s=null!==n&&void 0!==n&&null!==(e=n.photos)&&void 0!==e&&e.large?n.photos.large:x,a=o===l;return(0,h.jsx)(p,{photo:s,isMyProfile:a,onChangeLocal:function(e){e.target.files&&t((0,r.Yr)(e.target.files[0]))}})},P=n(9439),g=n(5705),b=n(1724),E={HeaderEditProfileForm:"EditProfile_HeaderEditProfileForm__+ggeL",EditProfile:"EditProfile_EditProfile__KCw4z",EditProfileContactsFields:"EditProfile_EditProfileContactsFields__9QV1r",errorText:"EditProfile_errorText__piK3h"},y=n(6670),Z=n(3360),C=b.Ry({}),k=function(e){var t=e.putProfile,n=e.setEditMode,o=e.profile,i=e.editProfileStatus,r=e.setEditProfileStatus,l={FullName:null===o||void 0===o?void 0:o.fullName,AboutMe:null===o||void 0===o?void 0:o.aboutMe,LookingForAJob:null===o||void 0===o?void 0:o.lookingForAJob,LookingForAJobDescription:null===o||void 0===o?void 0:o.lookingForAJobDescription,contacts:null===o||void 0===o?void 0:o.contacts};return a.createElement(g.J9,{initialValues:l,validationSchema:C,onSubmit:function(e,n){var o=n.resetForm;t(e),o()}},(function(e){var t=e.handleReset;return a.createElement(g.l0,{className:E.MyPosts},a.createElement("div",{},a.createElement("div",{className:E.HeaderEditProfileForm},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u043e\u0444\u0438\u043b\u044f"),a.createElement(y.rZ,{label:"\u0418\u043c\u044f",autoFocus:!1,name:"FullName",type:"text",placeholder:"\u0418\u043c\u044f",leftLabelLength:"5rem"}),a.createElement(y.rZ,{label:"\u041e\u0431\u043e \u043c\u043d\u0435",autoFocus:!1,name:"AboutMe",type:"text",placeholder:"\u041e\u0431\u043e \u043c\u043d\u0435",leftLabelLength:"5rem"}),a.createElement(y.$m,{name:"LookingForAJob"},"\u0432 \u043f\u043e\u0438\u0441\u043a\u0430\u0445 \u0440\u0430\u0431\u043e\u0442\u044b"),a.createElement(y.rZ,{label:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",autoFocus:!1,name:"LookingForAJobDescription",type:"textarea",placeholder:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",leftLabelLength:"5rem"}),a.createElement("h4",{},"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b:"),a.createElement("div",{className:E.EditProfileContactsFields},(null===o||void 0===o?void 0:o.contacts)&&Object.keys(null===o||void 0===o?void 0:o.contacts).map((function(e){return a.createElement("div",{key:e},a.createElement(y.rZ,{label:e,autoFocus:!1,name:"contacts["+e+"]",type:"text",placeholder:e,leftLabelLength:"5rem"}),a.createElement("div",{},i.map((function(t){return t.toLowerCase().includes(e.toLowerCase())?a.createElement("div",{key:t,className:E.errorText},t):null}))))}))),a.createElement("br"),a.createElement(Z.Z,{type:"button",variant:"warning",onClick:function(){t(),r([])}},"\u0421\u0431\u0440\u043e\u0441")," ",a.createElement(Z.Z,{type:"submit"},"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c")," ",a.createElement(Z.Z,{variant:"secondary",onClick:function(){n(!1),r([])}},"\u041e\u0442\u043c\u0435\u043d\u0430")))}))},_=(n(7632),function(e){var t=e.key1,n=e.Value;return(0,h.jsxs)("div",{children:[(0,h.jsxs)("b",{children:[t,": "]})," ",(0,h.jsx)("span",{title:n,children:n})]})}),F=(0,a.memo)((function(e){var t=e.profile,n=e.setEditMode,o=e.isMyProfile;return(0,h.jsxs)("div",{className:"".concat(f.Z.textMaxWidthCommon," "),children:[" ",(0,h.jsx)("h3",{title:null===t||void 0===t?void 0:t.fullName,children:null===t||void 0===t?void 0:t.fullName}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"\u041e\u0431\u043e \u043c\u043d\u0435"}),": ",(0,h.jsxs)("span",{title:null===t||void 0===t?void 0:t.aboutMe,children:[" ",null===t||void 0===t?void 0:t.aboutMe]})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"\u0412 \u043f\u043e\u0438\u0441\u043a\u0435 \u0440\u0430\u0431\u043e\u0442\u044b?"})," ",(0,h.jsx)("span",{title:null!==t&&void 0!==t&&t.lookingForAJob?"\u0414\u0430":"\u041d\u0435\u0442",children:null!==t&&void 0!==t&&t.lookingForAJob?"\u0414\u0430":"\u041d\u0435\u0442"})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435:"})," ",(0,h.jsx)("span",{title:null===t||void 0===t?void 0:t.lookingForAJobDescription,children:null===t||void 0===t?void 0:t.lookingForAJobDescription})]}),(0,h.jsxs)("div",{children:[(0,h.jsx)("b",{children:"userId:"})," ",(0,h.jsx)("span",{title:null===t||void 0===t?void 0:t.userId.toString(),children:null===t||void 0===t?void 0:t.userId})," "]}),(0,h.jsx)("ul",{children:t&&Object.keys(t.contacts).map((function(e,n){var o=Object.values(t.contacts)[n];return(0,h.jsxs)("li",{children:[(0,h.jsx)(_,{key1:e,Value:o})," "]},e)}))}),o&&(0,h.jsx)(Z.Z,{onClick:function(){n(!0)},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c "})]})})),I=(0,a.memo)((function(e){var t=e.profile,n=e.isMyProfile,o=e.putProfile,i=e.editProfileStatus,r=e.setEditProfileStatus,l=e.isProfileEditedSuccesssfully;console.log("ProfileInfo");var s=(0,a.useState)(!1),u=(0,P.Z)(s,2),c=u[0],d=u[1];(0,a.useEffect)((function(){l&&(d(!1),setTimeout((function(){r([])}),2e3))}),[i,l,r]);var v=(0,h.jsx)(F,{profile:t,setEditMode:d,isMyProfile:n}),m=(0,h.jsx)(k,{putProfile:o,setEditMode:d,profile:t,editProfileStatus:i,setEditProfileStatus:r});return(0,h.jsxs)("div",{children:[(0,h.jsx)("h2",{className:f.Z.pageHeader,children:"Profile"})," ",!c&&v," ",c&&m," "]})})),M=function(){console.log("ProfileInfoContainer");var e=r.ef.setEditProfileStatus,t=(0,i.I0)(),n=(0,i.v9)((function(e){return e.profilePage.profile})),o=(0,i.v9)((function(e){return e.auth.myId})),l=(0,i.v9)((function(e){var t,n;return null===(t=e.profilePage)||void 0===t||null===(n=t.profile)||void 0===n?void 0:n.userId})),s=(0,i.v9)((function(e){return e.profilePage.editProfileStatus})),a=(0,i.v9)((function(e){return e.app.notify})),u=l===o,c=!1;return a.forEach((function(e){"Edited successfully!"===e.message&&(c=!0)})),(0,h.jsx)(I,{profile:n,isMyProfile:u,putProfile:function(e){var n=Object.assign({},{userId:o},e);t((0,r.hv)(n))},editProfileStatus:s,setEditProfileStatus:e,isProfileEditedSuccesssfully:c})},S=n(9410),N=function(e){var t=e.userId,n=e.myId,o=e.status,i=e.putStatusThunkCreator,r=(0,a.useState)(!1),l=(0,P.Z)(r,2),s=l[0],u=l[1],c=(0,a.useState)(""),d=(0,P.Z)(c,2),f=d[0],v=d[1],p=function(){u(!1),i(f)};return(0,h.jsxs)(S.Z,{className:"my-3",onClick:function(){t===n&&(u(!0),v(o))},children:[(0,h.jsx)(S.Z.Text,{id:"basic-addon1",children:"\u0421\u0442\u0430\u0442\u0443\u0441:"})," ",(0,h.jsx)(m.Z.Control,{value:s?f:o,title:s?"\u041a\u043b\u0438\u043a/\u0441\u043c\u0435\u043d\u0430 \u0444\u043e\u043a\u0443\u0441\u0430/enter - \u0434\u043b\u044f \u0441\u043e\u0445\u0440\u0430\u043d\u0435\u043d\u0438\u044f":"\u041a\u043b\u0438\u043a \u0434\u043b\u044f - \u043f\u0440\u0430\u0432\u043a\u0438",onChange:function(e){var t=e.currentTarget.value;v(t)},autoFocus:!0,onBlur:p,placeholder:s?"\u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441":"\u043d\u0435\u0442 \u0441\u0442\u0430\u0442\u0443\u0441\u0430",onKeyPress:function(e){13===e.charCode&&p()},disabled:!s})]})},L=function(){console.log("StatusContainer");var e=(0,i.I0)(),t=(0,i.v9)((function(e){return e.auth.myId})),n=(0,i.v9)((function(e){var t;return null===(t=e.profilePage.profile)||void 0===t?void 0:t.userId})),o=(0,i.v9)((function(e){return e.profilePage.status}));return(0,h.jsx)("div",{children:(0,h.jsx)(N,{myId:t,userId:n,status:o,putStatusThunkCreator:function(t){e((0,r.FY)(t))}})})},A="MyPosts_posts__v8PmM",J="MyPosts_legendStyle__kuSLI",T="MyPosts_item__No0HI",w=function(e){var t=e.message,n=e.like;return(0,h.jsxs)("div",{className:T,children:[(0,h.jsx)("img",{alt:"\u041c\u0438\u0441\u0442\u0435\u0440 \u0431\u0438\u043d \u043d\u0430 \u043f\u0440\u043e\u0433\u0443\u043b\u043a\u0435",src:"https://i.pinimg.com/originals/03/b6/fe/03b6fe528accfd011629f5271e90e9ac.jpg"}),t,(0,h.jsx)("div",{children:(0,h.jsxs)("span",{children:["Like ",n]})})]})},H=n(7022),D=function(e){var t=e.addPost,n=(0,a.useState)(""),o=(0,P.Z)(n,2),i=o[0],r=o[1];return(0,h.jsx)("div",{children:(0,h.jsxs)(S.Z,{children:[(0,h.jsx)(m.Z.Control,{value:i,onChange:function(e){return r(e.target.value)},placeholder:"\u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435...",onKeyPress:function(e){13===e.charCode&&(i&&t(i),r(""))}}),(0,h.jsxs)(Z.Z,{disabled:!i,onClick:function(){i&&t(i),r("")},children:[" ","Submit"]}),(0,h.jsx)(Z.Z,{disabled:!i,variant:"warning",type:"button",onClick:function(){return r("")},children:"Reset"})]})})},O=function(e){var t=e.posts,n=e.addPost;return(0,h.jsxs)(H.Z,{children:[(0,h.jsx)("div",{className:J,children:"\u041c\u043e\u0438 \u043f\u043e\u0441\u0442\u044b"}),(0,h.jsx)(D,{addPost:n}),(0,h.jsxs)("div",{className:A,children:[t.map((function(e,t){return(0,h.jsx)(w,{message:e.message,like:e.like},t)}))," "]})]})},V=r.ef.addPostActionCreator,K=function(){console.log("MyPostsContainer");var e=(0,i.I0)(),t=(0,i.v9)((function(e){return e.profilePage.posts}));return(0,h.jsx)(O,{posts:t,addPost:function(t){e(V(t))}})},R=n(9743),$=n(2677),z=(0,o.qC)(l.Z,s.Z)((function(e){var t=e.userId,n=(0,i.v9)((function(e){return e.app.isFetching})),o=(0,i.I0)();(0,a.useEffect)((function(){o((0,r.aI)(t))}),[t,o]);var l=0===t,s=(0,a.useMemo)((function(){return(0,h.jsx)(K,{})}),[]);return(0,h.jsxs)("div",{children:[n&&(0,h.jsx)(u.Z,{})," ",(0,h.jsxs)(R.Z,{children:[(0,h.jsxs)($.Z,{lg:6,md:6,sm:12,children:[(0,a.useMemo)((function(){return(0,h.jsx)(j,{})}),[])," "]}),(0,h.jsxs)($.Z,{lg:6,md:6,sm:12,children:[(0,a.useMemo)((function(){return(0,h.jsx)(M,{})}),[])," "]})]}),(0,a.useMemo)((function(){return(0,h.jsx)(L,{})}),[]),l&&s," "]})}))},3990:function(e,t,n){var o=n(1413),i=(n(2791),n(8687)),r=n(7689),l=n(184),s=function(e){return{isAuth:e.auth.isAuth}};t.Z=function(e){return(0,i.$j)(s,null)((function(t){return t.isAuth?(0,l.jsx)(e,(0,o.Z)({},t)):(0,l.jsx)(r.Fg,{to:"../login"})}))}},1852:function(e,t,n){var o=n(1413),i=(n(2791),n(7689)),r=n(8687),l=n(184);t.Z=function(e){return(0,r.$j)(null,null)((function(t){var n={params:(0,i.UO)()},r=Number(n.params["*"]);return(0,l.jsx)(e,(0,o.Z)((0,o.Z)({},t),{},{userId:r}))}))}}}]);
//# sourceMappingURL=888.17a90422.chunk.js.map