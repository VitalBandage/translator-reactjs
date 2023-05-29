import { useTranslations } from "lib/hooks"
import { AutoDetectedLanguage, LanguageCode } from "lib/models"
import { useCallback } from "react"
import styled from "styled-components"

type LanguageProps ={
    disabled: boolean
}

type ConfidenceProps = {
    hasError:boolean,
    onClick():void
    autoDetectedLanguage?: AutoDetectedLanguage
}

export const Confidence: React.FC<ConfidenceProps> = ({
    autoDetectedLanguage = {},
    hasError,
    onClick
}) =>{
    const T = useTranslations()
    const{confidence, language} = autoDetectedLanguage
    const getDetectedLanguage = useCallback(()=>{
        if(!language)
        {
            return
        }
        const [detectedLanguage] = Object.entries(LanguageCode).find(([, languageCode]) => language === languageCode) || []
        


        if(detectedLanguage){
            return `(${detectedLanguage})`
        }
        else{
            return undefined
        }
    },[language]) 

    

    return (
        <Container>
            <Percentage>
                {confidence && `${confidence}%`}
            </Percentage>
            <Language
                onClick={()=>{
                    if(!hasError)
                        onClick
                }}
                disabled={hasError}
            >
                {hasError && T.components.confidence.error}
                {language && getDetectedLanguage()}
            </Language>
        </Container>
    )
}
const Container = styled.div`
`
const Percentage = styled.span`
     color: ${({theme})=> theme.colors.primary};
`
const Language = styled.a<LanguageProps>`
    cursor: ${({ disabled}) => disabled ? undefined : "pointer"};
    text-decoration: ${({ disabled}) => disabled ? undefined : "underline"};
    margin-left: 10px;
    color: ${({theme, disabled})=>  disabled ? theme.colors.error : theme.colors.primary};
`