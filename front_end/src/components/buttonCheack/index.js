import style from "../../style/temas";
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton'

const Button = ({as="",label="",select=false,name="",onClick="",onChange="",...props})=>{
  return (
    <input style={{background:(select === false ? "white" : (style !== undefined ? style.secondary.background:""))}} type="button" 
      onChange={onChange} value={label} name={name} onClick={onClick} {...props}></input>
  );
};

export default Button;