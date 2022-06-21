import * as React from 'react';
import {
    Button,
    EmptyState,
    EmptyStateBody,
    EmptyStateIcon,
    EmptyStateVariant, ExpandableSection, Gallery,
    PageSection,
    Title
} from '@patternfly/react-core';
import {useEffect, useState} from "react";
import { Brand, Card, CardActions, CardHeader, CardBody, CardFooter, Dropdown, DropdownToggle, DropdownItem, DropdownSeparator, DropdownPosition, DropdownDirection, KebabToggle, } from '@patternfly/react-core';
import {IconType} from "react-icons";

export interface IGenericNewItemComponentProps {
    setModalIsOpenToFalse: Function;
}
export interface IGenericListableComponentProps {
    emptyIcon: IconType;
    theData: any,
    newItemComponent: React.FunctionComponent<IGenericNewItemComponentProps>;
    createItemText: string;
    emptyListText: string;
    itemName: string;
    itemInFetchResponse: string;
    listLayoutStyle: ListViewType;
    modalOpenState: any,
    setModelIsOpenFunction: Function,
    cardFooterFieldNames: Object[];
}

export enum ListViewType {
    STACKED,
    SIDE_BY_SIDE
}

const GenericListableComponent: React.FunctionComponent<IGenericListableComponentProps> = (props) => {

    const setModalIsOpenToTrue = () => {
        props.setModelIsOpenFunction(true);
    };

    const setModalIsOpenToFalse = () => {
        props.setModelIsOpenFunction(false);
    };

    const cardFlip = (e) => {
        console.log(e.currentTarget)
    };

    const generateDynamicFooter = (f, data) => {
        const jp = require('jsonpath');
        const value = jp.query(data, f["value"]);
        const line = f["label"] + value;

        //if (f["type"] && f["type"] == "TIME"){}

        return (
            <CardFooter key={line}>{line}</CardFooter>
        );
    };


    const SimpleCard = (data) => (
        <span key={data.name}>

            <Card  key={data.name} isSelectableRaised isCompact={false} isHoverable={true} onClick={cardFlip}>
                <CardHeader>{data.name}</CardHeader>
                <CardBody>{data.organizationName}</CardBody>
                    {props.cardFooterFieldNames.map(f => {
                        return generateDynamicFooter(f, data)
                    })}
            </Card>
            <br />
        </span>

    );

    const emptyState = () => {

        return <EmptyState variant={EmptyStateVariant.full}>
            <EmptyStateIcon icon={props.emptyIcon} />
            <Title headingLevel="h5" size="lg">
                {props.itemName}
            </Title>
            <EmptyStateBody>
                {props.emptyListText}
            </EmptyStateBody>
        </EmptyState>
    }

    function getListOfSimpleCards() {
        if (props.itemInFetchResponse == ""){
            return props.theData.map(data => {
                return SimpleCard(data)
            });
        } else {
            return props.theData[props.itemInFetchResponse].map(data => {
                return SimpleCard(data)
            })
        }
    }

    const loadDisplay = () => {

        if (props.theData == undefined || props.theData == null || (props.itemInFetchResponse == "" ? props.theData.length == 0 : props.theData[props.itemInFetchResponse].length == 0)){
            return emptyState();
        } else {
            if (props.listLayoutStyle == ListViewType.STACKED){
                return getListOfSimpleCards();
            } else {
                return (
                    <React.Fragment>
                        <Gallery hasGutter>
                            {getListOfSimpleCards()}
                        </Gallery>
                    </React.Fragment>
                );
            }
        }
    }

    return (

        <PageSection>
            <br/>
            {!props.modalOpenState  && loadDisplay()}
        </PageSection>
    );
}

export { GenericListableComponent };
