import React, {useState} from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";
import "./sign-up.style.scss";

const SignUp = () => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const {displayName, email, password, confirmPassword} = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, {displayName});

            setUserCredentials({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: '',
            });
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = e => {
        const {name, value} = e.target;

        setUserCredentials({ ...userCredentials, [name]: value});
    };

    return (
        <div className="sign-up">
            <h2 className="title">I do not have account</h2>
            <span>Sign up with email and password</span>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    name="displayName"
                    label="Display name"
                    value={displayName}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    value={email}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="password"
                    label="Password"
                    value={password}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>
        </div>
    );
}

export default SignUp;