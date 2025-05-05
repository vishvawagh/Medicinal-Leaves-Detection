import { VscInfo } from "react-icons/vsc";

import  css from '../css/Auth.module.css'
function Alert({ show, type, message }) {
  return show ? (
    <div className = {css['alert']}>
      <div className={css["alert-inner"]}>
          {type && type === "error" && <VscInfo className= {css['alert-error']} />}
        <p className= {css['alert-icon']}>{message}</p> 
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Alert;
