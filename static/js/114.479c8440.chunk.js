"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[114],{2114:function(e,r,s){s.r(r),s.d(r,{default:function(){return q}});var t=s(9439),a=s(5671),n=s(3144),i=s(136),u=s(9388),h=s(2791),l=s(9603),o=s(184),d=function(e){return(0,o.jsxs)("button",{className:"square",onClick:function(){e.handleSquare(e.i)},children:[e.value," "]})},c=function(e){(0,i.Z)(s,e);var r=(0,u.Z)(s);function s(){return(0,a.Z)(this,s),r.apply(this,arguments)}return(0,n.Z)(s,[{key:"renderSquare",value:function(e){return(0,o.jsx)(d,{value:this.props.squares[e],handleSquare:this.props.handleSquare,i:e})}},{key:"render",value:function(){var e,r=x(this.props.squares);return this.props.history.length<10&&(e=this.props.xIsNext?"\u0421\u0435\u0439\u0447\u0430\u0441 \u0445\u043e\u0434\u0438\u0442: X ":"\u0421\u0435\u0439\u0447\u0430\u0441 \u0445\u043e\u0434\u0438\u0442: O "),r&&(e="\u041f\u043e\u0431\u0435\u0434\u0438\u0442\u0435\u043b\u044c: "+r),this.props.history.length>=10&&!r&&(e="\u041d\u0438\u0447\u044c\u044f"),(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"status",children:e}),(0,o.jsxs)("div",{className:"board-row",children:[this.renderSquare(0)," ",this.renderSquare(1),this.renderSquare(2)]}),(0,o.jsxs)("div",{className:"board-row",children:[this.renderSquare(3),this.renderSquare(4),this.renderSquare(5)]}),(0,o.jsxs)("div",{className:"board-row",children:[this.renderSquare(6),this.renderSquare(7),this.renderSquare(8)]})]})}}]),s}(h.Component);function x(e){for(var r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],s=0;s<r.length;s+=1){var a=(0,t.Z)(r[s],3),n=a[0],i=a[1],u=a[2];if(e[n]&&e[n]===e[i]&&e[n]===e[u])return e[n]}return null}var q=function(e){(0,i.Z)(s,e);var r=(0,u.Z)(s);function s(e){var t;return(0,a.Z)(this,s),(t=r.call(this,e)).handleSquare=function(e){var r=t.state.history.length-1,s=t.state.history[r].squaresNew.slice(),a=x(s);if(!s[e]&&!a){s[e]=t.state.xIsNext?"X":"O",t.setState({xIsNext:!t.state.xIsNext});var n=t.state.history.concat({squaresNew:s});t.setState({history:n})}},t.newGame=function(){t.setState({xIsNext:!0,history:[{squaresNew:Array(9).fill(null)}]})},t.state={xIsNext:!0,history:[{squaresNew:Array(9).fill(null)}]},t}return(0,n.Z)(s,[{key:"render",value:function(){var e=this.state.history.length-1,r=this.state.history[e].squaresNew.slice();return(0,o.jsxs)("div",{children:[(0,o.jsx)("h2",{className:l.Z.pageHeader,children:"\u041a\u0440\u0435\u0441\u0442\u0438\u043a\u0438 \u043d\u043e\u043b\u0438\u043a\u0438"}),(0,o.jsx)("div",{children:(0,o.jsx)(c,{squares:r,xIsNext:this.state.xIsNext,handleSquare:this.handleSquare,history:this.state.history})}),(0,o.jsx)("div",{children:(0,o.jsx)("button",{className:"new-game-button",onClick:this.newGame,children:"\u041d\u0430\u0447\u0430\u0442\u044c \u0437\u0430\u043d\u043e\u0432\u043e"})})]})}}]),s}(h.Component)}}]);
//# sourceMappingURL=114.479c8440.chunk.js.map