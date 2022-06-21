import React, { useState } from 'react';
import '@app/Login/login.css';
import Logo from '../../../assets/images/MCCSummerCamp.png'

import {
    LoginFooterItem,
    LoginForm,
    LoginMainFooterBandItem,
    LoginMainFooterLinksItem,
    LoginPage,
    //BackgroundImageSrc,
    ListItem, ModalVariant, Wizard, Modal
} from '@patternfly/react-core';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import {loginUser} from "@app/utils/utils";
import {BoltIcon} from "@patternfly/react-icons";
import {CreateAccountComponent} from "@app/Login/CreateAccountComponent";
import {FaMosque} from "react-icons/all";

export interface ILoginComponentProps {
    triggerRefresh: Function;
}

const LoginComponent: React.FunctionComponent<ILoginComponentProps> = (props) => {

    const [showHelperText, setShowHelperTest] = useState();
    const [userNameValue, setUserNameValue] = useState();
    const [isValidsername, setIsValidUserName] = useState();
    const [passwordValue, setPasswordValue] = useState();
    const [isValidPassword, setIsValidPassword] = useState();
    const [isRememberMeChecked, setIsRememberMeChecked] = useState();
    const [isCreateAccountModalOpen, setIsCreateAccountModalOpen] = useState(false);


    const helperText = (
        <React.Fragment>
            <ExclamationCircleIcon />
            &nbsp;Invalid login credentials.
        </React.Fragment>
    );


    const handleCreateAccountModalToggle = () => {
        setIsCreateAccountModalOpen(!isCreateAccountModalOpen);
    }

    const signUpForAccountMessage = (
        <LoginMainFooterBandItem>
            Need an account? <a href="#" onClick={handleCreateAccountModalToggle}>Sign up.</a>
        </LoginMainFooterBandItem>
    );
    const forgotCredentials = (
        <LoginMainFooterBandItem>
            <a href="#">Forgot username or password?</a>
        </LoginMainFooterBandItem>
    );

    const listItem = (
        <React.Fragment>
            <ListItem>
                <LoginFooterItem href="#">Terms of Use </LoginFooterItem>
            </ListItem>
            <ListItem>
                <LoginFooterItem href="#">Help</LoginFooterItem>
            </ListItem>
            <ListItem>
                <LoginFooterItem href="#">Privacy Policy</LoginFooterItem>
            </ListItem>
        </React.Fragment>
    );

    function handleUsernameChange (value){
        setUserNameValue(value);
    }

    function handlePasswordChange(passwordValue){
        setPasswordValue( passwordValue);
    }

    function onRememberMeClick(){
        setIsRememberMeChecked(!isRememberMeChecked);
    }

    const onLoginButtonClick = async event => {
        event.preventDefault();
        setIsValidUserName(!!userNameValue );
        setIsValidPassword(!!passwordValue );
        setShowHelperTest(!userNameValue || !passwordValue);
        const token = await loginUser({
            'email' : userNameValue,
            'password': passwordValue
        }).then( data => {
            if (data != undefined && data != null){
                props.triggerRefresh(data);
            }
        });
    };

    const loginForm = (
        <LoginForm
            showHelperText={showHelperText}
            helperText={helperText}
            helperTextIcon={<ExclamationCircleIcon />}
            usernameLabel="Username"
            usernameValue={userNameValue}
            onChangeUsername={handleUsernameChange}
            isValidUsername={isValidsername}
            passwordLabel="Password"
            passwordValue={passwordValue}
            isShowPasswordEnabled
            onChangePassword={handlePasswordChange}
            isValidPassword={isValidPassword}
            rememberMeLabel="Keep me logged in for 30 days."
            isRememberMeChecked={isRememberMeChecked}
            onChangeRememberMe={onRememberMeClick}
            onLoginButtonClick={onLoginButtonClick}
            loginButtonLabel="Log in"
        />
    );

    const images = {
        lg: '/assets/images/pfbg_1200.jpg',
        sm: '/assets/images/pfbg_768.jpg',
        sm2x: '/assets/images/pfbg_768@2x.jpg',
        xs: '/assets/images/pfbg_576.jpg',
        xs2x: '/assets/images/pfbg_576@2x.jpg'
    };

    return (
        <LoginPage
            //footerListVariants="inline"
            brandImgSrc={Logo}
            brandImgAlt="MCC Summer Camp"
            backgroundImgSrc={images}
            backgroundImgAlt="Images"
            footerListItems={listItem}
            textContent="Login to manage your MCC SummerCamp account"
            loginTitle="Log in to your account"
            loginSubtitle="Enter your credentials."
            signUpForAccountMessage={signUpForAccountMessage}
            forgotCredentials={forgotCredentials}
        >
            {loginForm}

            <CreateAccountComponent isModalOpen={isCreateAccountModalOpen} onModalClose={handleCreateAccountModalToggle} setEmailAddress={handleUsernameChange}/>
        </LoginPage>

    );

}

export {LoginComponent}