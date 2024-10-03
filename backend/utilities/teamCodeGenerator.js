import {randomBytes} from "node:crypto"




export const GenerateTeamCode = () => {

  const number=Math.floor(Math.random()*(3-5)+5);

  const code=randomBytes(number).toString("hex");
  // console.log(code);
  // console.log(typeof(code));
  
  return code;
};


