const InputField = ({label,type,value,onChange})=>{
    return(
        <div>
            <label htmlFor={label} className="block">{label}:</label>
            <input type={type} name={label} id={label} value={value} onChange={onChange} className="w-full" />
        </div>
    )
}

export default InputField;