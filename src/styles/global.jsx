import { T, AF } from "../config/tokens";

export function GlobalStyles({ isRTL }) {
  return (
    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html,body,#root{height:100%}
      body{font-family:${isRTL ? AF : T.sans};background:${T.bg};color:${T.black};font-size:13px;line-height:1.55;overflow:hidden}
      input,select,textarea,button{font-family:${isRTL ? AF : T.sans}}
      ::-webkit-scrollbar{width:4px;height:4px}
      ::-webkit-scrollbar-thumb{background:${T.bdark};border-radius:2px}
      input[type=number]::-webkit-inner-spin-button{opacity:1}
      @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      @keyframes slideIn{from{opacity:0;transform:translateX(${isRTL ? "-" : ""}12px)}to{opacity:1;transform:translateX(0)}}
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
      @keyframes ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.2);opacity:0}}
      @keyframes tagBounce{0%{transform:scale(.7)rotate(-3deg);opacity:0}60%{transform:scale(1.06)rotate(1deg)}100%{transform:scale(1)rotate(0);opacity:1}}
      @keyframes checkPop{from{transform:scale(.7);opacity:0}to{transform:scale(1);opacity:1}}
      .fu{animation:fadeUp .28s ease both}
      .si{animation:slideIn .25s ease both}
      .tb{animation:tagBounce .4s cubic-bezier(.34,1.56,.64,1) both}
    `}</style>
  );
}
