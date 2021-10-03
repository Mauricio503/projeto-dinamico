import style from "../../style/temas";

const Button = ({as="",label="",paragraph="",value="",name="",onClick="",onChange="",...props})=>{
  return (
    <input style={{background:(style !== undefined ? style.primary.background:""),color:(style !== undefined ? style.primary.color:"")}} type="button" 
      onChange={onChange} value={label} name={name} onClick={onClick} {...props}></input>
  );
};

export default Button;