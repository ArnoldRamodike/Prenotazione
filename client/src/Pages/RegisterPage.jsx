import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(ev) {
        ev.preventDefault();
        try {
                await axios.post('/register', {
                name,
                email,
                password,
        });

        alert('registation successful, you can login');
        } catch (error) {
            alert('Registration failed please try again later')
        }
  
    }

  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form action="" className="max-w-md mx-auto" onSubmit={registerUser}>
                <input type="text" placeholder="John Doe" value={name} onChange={ev =>setName(ev.target.value)}/>
                <input type="email" placeholder="your@mail.com" value={email} onChange={ev =>setEmail(ev.target.value)}/>
                <input type="password" placeholder="password"value={password} onChange={ev =>setPassword(ev.target.value)}/>
                <button className="primary">Register</button>
                <div className="text-center pt-2 text-gray-500">
                    Already have an Account? <Link to={'/login'} className="underline text-black">Login</Link>
                </div>
            </form>
        </div>

    </div>
  )
}

export default RegisterPage