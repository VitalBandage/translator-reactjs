import styled from "styled-components"
import { useEffect } from 'react';
import React from "react";

type InputProps = {
    hasError:boolean
}

type TextInputProps = {
    disabled?: boolean,
    autoFocus?: boolean,
    placehorder?: string,
    value?: string,
    hasError: boolean,
    onChangeText?(text:string): void
}

export const TextInput: React.FC<TextInputProps> = ({
    autoFocus,
    disabled,
    placehorder,
    value,
    hasError,
    onChangeText
}) =>{
    const inputRef = React.createRef<HTMLTextAreaElement>()
    useEffect(()=>{
        if(!disabled && autoFocus && inputRef.current){
            inputRef.current.focus()
        }
    },[])



    return (
        //input - uncontrolled component = no useState to control value prop
        <Input 
            ref={inputRef}
            value={value}
            onChange={event => {
                if(onChangeText)
                    onChangeText(event.target.value)}}
            disabled={disabled}
            placeholder={disabled ? undefined : placehorder}
            hasError= {hasError}
        />
    )
}

const Input = styled.textarea<InputProps>`
    background-color: ${({theme}) => theme.colors.input};
    color: ${({theme}) => theme.colors.typography};
    border: ${({theme,hasError}) => hasError ? `1px solid ${theme.colors.error}` : "none"};
    border-radius: 10px;
    height: 300px;
    width: 400px;
    resize: none;
    font-size: 18px;
    padding: 10px 15px;
`
