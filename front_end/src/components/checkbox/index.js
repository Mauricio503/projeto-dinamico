import style from "../../style/temas";

const CheckBox = ({as="",title="",paragraph="",onChange="",value="",name="",checked="",...props})=>{
  return (
    <>
    <input style={{background:(style !== undefined ? style.primary.background:""),color:(style !== undefined ? style.primary.color:"")}} type="checkbox" 
      onChange={onChange} value={value} name={name} checked={checked} /> <b>&nbsp;{title}&nbsp;</b>
    </>
  );
};

export default CheckBox;