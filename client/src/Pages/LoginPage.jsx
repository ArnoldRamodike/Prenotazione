import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
        <div className="-mt-32">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form action="" className="max-w-md mx-auto">
                <input type="email" placeholder="your@mail.com"/>
                <input type="password" placeholder="password" />
                <button className="primary">Login</button>
                <div className="text-center pt-2 text-gray-500">
                    Dont have account? <Link to={'/register'} className="underline text-black">Register</Link>
                </div>
            </form>
        </div>

    </div>
  )
}

export default LoginPage