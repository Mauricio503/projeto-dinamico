import TextField from '@material-ui/core/TextField';

const Input = ({onChange="",...props})=>{
  return (
    <TextField onChange={onChange} {...props}/>
  );
};

export default Input;