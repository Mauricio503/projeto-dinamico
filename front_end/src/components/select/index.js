
const Select = ({...props})=>{
    return (
        <select style={{width: "100%",
    padding:"13px 20px 13px 12px",
    textIndent: "0.01px"}} {...props}>
            <option>Selecione</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
        </select>
    );
  };
  
  export default Select;