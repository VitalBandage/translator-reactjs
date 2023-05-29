import styled from "styled-components"
import { useDebouncedCallback} from 'use-debounce'
import { Loader,LanguageSelector,TextInput, Confidence, ExchangeLanguage, TextCounter } from "lib/components"
import { AutoDetectedLanguage, Language } from "lib/models"
import { useState } from 'react';
import { SelectedLanguages } from "./types";
import { LanguageCode } from "lib/models/Language";
import { useTranslations } from "lib/hooks";
import { APP_CONFIG } from "lib/config";
import { useAutoDetectLanguage, useTranslateText } from "./actions";
type TranslatorScreenProps = {
    languages: Array<Language>
}


export const TranslatorScreen: React.FunctionComponent<TranslatorScreenProps> = ({
    languages
}) =>
{
    const T = useTranslations()
    const [translatedText,setTranslatedText] = useState<string>("")
    const [query,setQuery] = useState<string>("")
    const [autoDetectedLanguage,SetAutoDetectedLanguage] = useState<AutoDetectedLanguage>()
    const [selectedLanguages,setSelectedLanguages] = useState<SelectedLanguages>({
        source: LanguageCode.Auto,
        target: LanguageCode.English
    })
    const {
        isLoading: isDetectingLanguage,
        hasError: hasErrorDetectingLanguage,
        fetch: AutoDetectedLanguage} = useAutoDetectLanguage(SetAutoDetectedLanguage)
    const {
        isLoading: isTranslatingText,
        hasError: hasErrorTranslatingText,
        fetch: translateText
    } = useTranslateText(setTranslatedText)


    const debouncedAction = useDebouncedCallback(
        debouncedQuery =>{
            if(debouncedQuery.length < 5){
                {return}
            }
            if(selectedLanguages.source == LanguageCode.Auto)
            {
                AutoDetectedLanguage(debouncedQuery)
            }
            else{
                translateText(debouncedQuery,selectedLanguages)
            }
        },
        1000
    )
    return (
    <Container>
        <TranslatorContainer>
            <InputContainer>
                <LanguageSelector
                languages={languages}
                exclude={[selectedLanguages.target]}
                selectedLanguage={selectedLanguages.source}
                onChange={newCode =>setSelectedLanguages(prevState =>({
                    ...prevState,
                    source: newCode
                }))}
                />
                <TextInput autoFocus
                    value={query}
                    onChangeText = {newQuery =>{
                        if(newQuery.length > APP_CONFIG.TEXT_INPUT_LIMIT)
                        { 
                            return
                        }

                        setQuery(newQuery)
                        debouncedAction(newQuery)
                    }}
                    hasError={false}
                    placehorder={T.screens.translator.sourceInputPlacehorder}
                    
                />
                    <LoaderContainer>
                {isDetectingLanguage &&(
                        <Loader/>
                        )}
                    </LoaderContainer>
                <InputFooter>
                    <Confidence
                        hasError={hasErrorDetectingLanguage && selectedLanguages.source == LanguageCode.Auto}
                        autoDetectedLanguage={autoDetectedLanguage}
                        onClick={()=> {
                            setSelectedLanguages(prevState => ({
                                ...prevState,
                                source: autoDetectedLanguage?.language as LanguageCode
                            }))
                            SetAutoDetectedLanguage(undefined)
                        }}
                    />   
                    <TextCounter
                        counter={query.length}
                        limit={APP_CONFIG.TEXT_INPUT_LIMIT}
                    />
                </InputFooter>
                
            </InputContainer>
            <ExchangeLanguage
                hidden={selectedLanguages.source == LanguageCode.Auto}
                onClick={()=> setSelectedLanguages(prevState =>({
                    source: prevState.target,
                    target: prevState.source
                }))}
            />
            <InputContainer>
                <LanguageSelector
                languages={languages}
                exclude={[selectedLanguages.source, LanguageCode.Auto]}
                selectedLanguage={selectedLanguages.target}
                onChange={newCode =>setSelectedLanguages(prevState =>({
                    ...prevState,
                    target: newCode
                }))}
                />
                <TextInput 
                    disabled
                    value={translatedText}
                    hasError={hasErrorTranslatingText}
                />
                <LoaderContainer>
                {isTranslatingText &&(
                        <Loader/>
                        )}
                </LoaderContainer>
                <InputFooter>
                    {hasErrorTranslatingText && T.components.confidence.error}
                </InputFooter>
            </InputContainer>
        </TranslatorContainer>
    </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
    color: ${({theme}) => theme.colors.typography};
`

const TranslatorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 50px;
`
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: ${({theme})=>  theme.colors.error};
    
`
const LoaderContainer = styled.div`
    padding: 5px 10px;
    height: 2px;
`
const InputFooter = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`