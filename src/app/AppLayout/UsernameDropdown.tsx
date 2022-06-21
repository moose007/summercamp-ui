import React, {useState} from 'react';
import {
    Avatar,
    Dropdown,
    DropdownGroup,
    DropdownToggle,
    DropdownItem
} from '@patternfly/react-core';
import ArrowAltCircleDownIcon from "@patternfly/react-icons";
import {logout} from "@app/utils/utils";
import { UserIcon } from '@patternfly/react-icons'

export interface IUsernameDropdownComponentProps {
    username: string
}

const UsernameDropdown : React.FunctionComponent<IUsernameDropdownComponentProps> = (props) => {

    const [isOpen, setIsOpen] = useState(false);


    const onToggle = isOpen => {
        setIsOpen(isOpen)
    };

    const onSelect = event => {
        setIsOpen(!isOpen);
        onFocus();
    }


    const onFocus = () => {
        const element = document.getElementById('toggle-id-9');
        // @ts-ignore
        element.focus();
    };


    const dropdownItems = [
        <DropdownGroup key="group 1">
            <DropdownItem key="group 1 profile">My profile</DropdownItem>
        <DropdownItem key="group 1 logout" onClick={logout}>Logout</DropdownItem>
        </DropdownGroup>
    ];

    const DropdownOne = () => (
        <Dropdown onSelect={onSelect} toggle=
        {
            // @ts-ignore
            <DropdownToggle isPlain={false} type='button' id="toggle-id-9" onToggle={onToggle} toggleIndicator={ArrowAltCircleDownIcon} icon={<Avatar size='md' border='dark' src={UserIcon} alt=""></Avatar>}>
            {props.username}
            </DropdownToggle>
        } isOpen={isOpen} dropdownItems={dropdownItems} />
    )

    return (
        DropdownOne()
    );
};
export {UsernameDropdown}