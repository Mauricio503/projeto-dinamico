
import {cep,currency,cpf,cnpj} from './mask';
import './styles.css';

const InputMask = ({ mask= "cep" || "currency" || "cpf" || "cnpj",onChange="",value="",...props}) =>{
    const maskInput = (event,mask) => {
      switch (mask) {
        case "cep":
          cep(event)
        break;
        case "currency":
          currency(event)
        break;
        case "cpf":
          cpf(event)
        break;
        case "cnpj":
          cnpj(event)
        break;
        default:
          break;
      }
    }

    return (
        <div className="input-group prefix">
          <input {...props} onKeyUp={(e) => maskInput(e,mask)} onChange={onChange}/>
        </div>
      );

}

export default InputMask;