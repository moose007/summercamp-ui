import {FormGroup, FormHelperText, TextInput} from "@patternfly/react-core";
import React from "react";
import {ExclamationCircleIcon} from "@patternfly/react-icons";


export const createFieldInFormGroup = (label, type, helperText, helperTextInvalid, fieldId, bindingStateField, onChangeHandler, validated) => {
    return <FormGroup
        label={label}
        type={type}
        helperText={
            <FormHelperText icon={<ExclamationCircleIcon />} isHidden={validated !== 'noval'}>
                {helperText}
            </FormHelperText>
        }
        helperTextInvalid={helperTextInvalid}
        helperTextInvalidIcon={<ExclamationCircleIcon />}
        fieldId={fieldId}

    >
        <TextInput id={fieldId} value={bindingStateField} onChange={onChangeHandler}/>
    </FormGroup>
}