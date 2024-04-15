import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form action="" className="max-w-md mx-auto">
                <input type="email" placeholder="your@mail.com"/>
                <input type="text" placeholder="John Doe"/>
                <input type="password" placeholder="password" />
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