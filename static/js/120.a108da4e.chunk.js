"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[120],{7562:function(t,e,n){n.r(e);var r=n(4165),a=n(5861),s=n(5671),i=n(3144),c=n(136),u=n(7277),h=n(4569),o=n.n(h),l=n(2791),d=n(1083),p=n(184),f=function(t){(0,c.Z)(n,t);var e=(0,u.Z)(n);function n(){var t;(0,s.Z)(this,n);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(t=e.call.apply(e,[this].concat(a))).state={data:{hits:[]},query:"react",onChangeQuery:"react"},t.inputOnChange=function(e){t.setState({onChangeQuery:e.currentTarget.value})},t.buttonOnClick=function(){t.setState({query:t.state.onChangeQuery})},t.callURL=function(t){return"https://hn.algolia.com/api/v1/search?query=".concat(t)},t}return(0,i.Z)(n,[{key:"AsyncF",value:function(){var t=(0,a.Z)((0,r.Z)().mark((function t(e){var n;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o()(this.callURL(e));case 2:n=t.sent,this.setState({data:n.data});case 4:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.AsyncF(this.state.query)}},{key:"componentDidUpdate",value:function(t,e){this.state.query!==e.query&&this.AsyncF(this.state.query)}},{key:"render",value:function(){var t=this,e=(0,p.jsxs)("div",{children:[(0,p.jsx)("h3",{children:"Search by HackerNews"}),(0,p.jsxs)("form",{children:[(0,p.jsx)("input",{value:this.state.onChangeQuery,onChange:function(e){t.inputOnChange(e)}}),(0,p.jsx)("button",{onClick:function(e){e.preventDefault(),t.buttonOnClick()},children:"Search"})]}),(0,p.jsx)("ul",{children:this.state.data.hits&&(0,p.jsx)("div",{children:this.state.data.hits.map((function(t){return(0,p.jsxs)("li",{children:[" ",(0,p.jsxs)("a",{href:t.url,children:[t.title,t.story_title]})]},t.objectID)}))})})]});return(0,p.jsxs)("div",{children:[(0,p.jsx)(d.Z,{child:e,height:window.screen.availHeight-218,firstInsideContainer:"UsersUp",secondInsideContainer:"UsersDown",containerElement:"UserContainer"})," "]})}}]),n}(l.Component);e.default=f}}]);
//# sourceMappingURL=120.a108da4e.chunk.js.map