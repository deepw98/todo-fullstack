import { Link } from "react-router-dom";
import InputField from "./InputField";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
const LoginForm = ()=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errors,setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const resetForm = ()=>{
        setEmail('');
        setPassword('');
    }

    const validate = ()=>{
        let isValid = true;
        const newErrors={};
        if(!/\S+@\S+\.\S+/.test(email)){
            newErrors.email = 'Invalid email format';
            isValid = false;
        }
        if(password.length<8){
            newErrors.password = 'Password length cannot be less than 8 characters';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        setErrors({});
        if(!validate()){
            console.log('Error! info is incorrect...');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch('http://localhost:3000/api/v1/auth',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            })

            if(!response.ok){
                const errorData = await response.json();
                console.log(errorData.msg);
                throw new Error(errorData.msg||'Login failed');
                
            }
         
            const data = await response.json();
                resetForm();
                setErrors({});
                localStorage.setItem('token',data.token);
                localStorage.setItem('userFirstName',data.user.firstName);
                navigate('/homepage');
        }
        catch (error) {
            console.log('Form submission failed:',error);
            setErrors({general:error.message});
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="login-form max-w-md mx-auto p-1 m-7 bg-white shadow-2xl rounded-2xl">
            <h1 className="text-center">Login Form</h1>
            <form onSubmit={handleSubmit}>
                <InputField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                {errors.email && <div className="text-red-500">{errors.email}</div>}
                <InputField label="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                {errors.password && <div className="text-red-500">{errors.password}</div>}
                {loading?<button disabled>Loading...</button>:<button>Login</button>}
                {errors.general&& <div className="text-red-500">{errors.general}</div>}

                <p>Not registered? <Link to="/" className="text-blue-700">Click here</Link> for sign up form</p>
            </form>
        </div>
    )
}

export default LoginForm;