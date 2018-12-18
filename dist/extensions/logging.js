export const log=(o,e)=>{e=e||0;let l="";for(let o=0;o<e;o++)l+=" ";if("object"==typeof o)for(var t in++e,o)o.hasOwnProperty(t)&&("object"==typeof o[t]?(console.log(`${l} ${t}:`),log(o[t],e)):console.log(`${l} ${t}: ${o[t]}`));else console.log(`${l} ${o}`)};
//# sourceMappingURL=logging.js.map
