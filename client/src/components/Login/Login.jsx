import "./Login.css"
import Button from "@mui/material/Button"
import { signInWithGoogle } from "../../firebase.js"

import { actionTypes } from "./Context/reducer.js"
import { useStateValue } from "./Context/StateProvider"

const Login = () => {
	const [{}, dispatch] = useStateValue()

	const signIn = () => {
		signInWithGoogle()
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				})
			})
			.catch((error) => alert(error.message))
	}
	return (
		<div className="login">
			<div className="login__container">
				<img src="" alt="whatsapp" />
				<div className="login__text">
					<h1>Sign in to Messaging App</h1>
				</div>
				<Button onClick={signIn}>Sign In with Google</Button>
			</div>
		</div>
	)
}

export default Login
