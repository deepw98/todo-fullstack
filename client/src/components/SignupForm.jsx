import { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = ()=>{

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [cpassword,setCpassword] = useState('');

    const [errors,setErrors] = useState({});
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState('');

    const resetForm = ()=>{
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setCpassword('');
    }

    const validate = ()=>{
        const newErrors={}
        let isValid=true;

        if(!/\S+@\S+\.\S+/.test(email)){
            newErrors.email='Email address format is invalid';
            isValid=false;
        }
        if(password.length<8){
            newErrors.password = 'Minimum length of password must be 8';
            isValid=false;
        }
        if(cpassword.length<8){
            newErrors.cpassword = 'Minimum length of password must be 8';
            isValid=false;
        }
        if(password!==cpassword){
            newErrors.cpassword2='passwords do not match';
            isValid=false;
        }
        setErrors(newErrors);
        return isValid;

    }

    const handleSubmit = async (e)=>{

        e.preventDefault();
        setErrors({});
        setSuccess('');

        if(!validate()){
            console.log('There is a client-side error');
            return;
        }
       
        const info = {firstName,lastName,email,password};
        try{
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/v1/users',{
                    method:'POST',
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(info)
                })
            if(!response.ok){
                throw new Error('Server error');
            }
            resetForm();
            console.log('Form successfully submitted');
            setErrors({});
            setSuccess('Signup successful!');
        }catch(err){
                console.log('Form submission failed:',err);
                setErrors({general:'Server Error! Check your connection or try again!'});

        }finally{
            setLoading(false);
        }
        
    }

    return(
        <div className="max-w-md mx-auto p-1 m-7 bg-white shadow-2xl rounded-2xl">
            <h1 className="text-center">Sign up</h1>
            <form onSubmit={handleSubmit}>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
                <label>Email Address:</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                {errors.email && <div className="text-red-500">{errors.email}</div>}
                <label>Password:</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                 {errors.password && <div className="text-red-500">{errors.password}</div>}
                <label>Confirm Password:</label>
                <input type="password" value={cpassword} onChange={(e)=>setCpassword(e.target.value)} required/>
                {errors.cpassword && <div className="text-red-500">{errors.cpassword}</div>}
                {errors.cpassword2 && <div className="text-red-500">{errors.cpassword2}</div>}

                {loading?<button className="!py-3" disabled>Loading...</button>:<button className="!py-3" >Sign up</button>}
                {errors.general && <div className="text-red-500">{errors.general}</div>}
                {success && <div className="text-green-500">{success}</div>}

                <p>Already registered? <Link to="/login" className="text-blue-700">Click here</Link> for login form</p>
            </form>
           
        </div>
    )
}

export default SignupForm;