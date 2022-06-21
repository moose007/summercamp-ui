import React, {useState} from "react";
import {
    ActionGroup,
    Alert,
    Button,
    Form,
    FormAlert,
    FormGroup,
    Modal,
    ModalVariant,
    TextInput
} from "@patternfly/react-core";
import {createAccount} from "@app/utils/utils";

export interface ICreateAccountComponentProps {
    isModalOpen: boolean;
    onModalClose: any;
    setEmailAddress: Function;
}

const CreateAccountComponent: React.FunctionComponent<ICreateAccountComponentProps> = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validated, setValidated] = useState('');


    const resetForm = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmailAddress('');
        setDisplayName('');
        setValidated('');
        setErrorMessage('');
    }


    const doCreateAccount = () => {

        // validate

        if (password != confirmPassword){
            setValidated("error")
            setErrorMessage("your passwords dont match!");
            return;
        }
        // create account
        const payload = {
            "displayName": username,
            "email": emailAddress,
            "password": password
        };


        createAccount(payload).then(
            response => {
                props.setEmailAddress(emailAddress);
                props.onModalClose();
            }
        )

    }

    const closeAndResetModal = () => {
        resetForm();
        props.onModalClose();
    }


    return (

        <React.Fragment>
            <Modal
                variant={ModalVariant.small}
                title="Create a New Account"
                isOpen={props.isModalOpen}
                onClose={closeAndResetModal}
            >

                <Form>

                    {validated === 'error' && (
                        <FormAlert>
                            <Alert
                                variant="danger"
                                title={errorMessage}
                                aria-live="polite"
                                isInline
                            />
                        </FormAlert>) }
                    <FormGroup label="Username" isRequired fieldId={"username-id"} helperText={"The name you would like to be referred to as"}>
                        <TextInput
                            isRequired
                            type="text"
                            id="username-id"
                            name="username-id"
                            aria-describedby="username-id-helper"
                            value={username}
                            onChange={setUsername}
                        />
                    </FormGroup>

                    <FormGroup label="Email" isRequired fieldId="email-id">
                        <TextInput
                            isRequired
                            type="email"
                            id="email-id"
                            name="email-id"
                            value={emailAddress}
                            onChange={setEmailAddress}
                        />
                    </FormGroup>


                    <FormGroup label="Password" isRequired fieldId={"password-id"} helperText={"Enter a secure password"}>
                        <TextInput
                            isRequired
                            type="password"
                            id="password-id"
                            name="password-id"
                            aria-describedby="password-id-helper"
                            value={password}
                            onChange={setPassword}
                        />
                    </FormGroup>


                    <FormGroup label="ConfirmPassword" isRequired fieldId={"confirm-password-id"} helperText={"Confirm your secure password"}>
                        <TextInput
                            isRequired
                            type="password"
                            id="confirm-password-id"
                            name="confirm-password-id"
                            aria-describedby="confirm-password-id-helper"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                        />
                    </FormGroup>

                    <ActionGroup>
                        <Button variant="primary" onClick={doCreateAccount}>Submit</Button>
                        <Button variant="link" onClick={e => {
                            resetForm()
                            props.onModalClose()
                        }}>Cancel</Button>
                    </ActionGroup>

                </Form>

            </Modal>
        </React.Fragment>
    );
}

export {CreateAccountComponent}