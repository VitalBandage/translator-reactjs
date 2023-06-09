import { Language, LanguageCode } from "lib/models"
import styled from "styled-components"
import { useMemo } from 'react';

type LanguageSelectorProps = {
    languages: Array<Language>,
    selectedLanguage : LanguageCode,
    exclude : Array<LanguageCode>,
    onChange(newLanguage: LanguageCode): void
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    languages,
    selectedLanguage,
    exclude,
    onChange
}) =>{
    const filteredLanguages = useMemo(() => languages
    .filter(languages => !exclude.includes(languages.code))
    .map(languages =>({
        key: languages.code,
        label: languages.name
    })),[languages,exclude])
    // useMemo - for memory optimzation (cache)
    return (
        <Select
        value={selectedLanguage}
        onChange={event =>onChange(event.target.value as LanguageCode)}
        >
            {filteredLanguages.map(language =>(
                <Option 
                key={language.key}
                value={language.key}
                >{language.label}</Option>
                )
            )}
        </Select>
    )
}

const Select = styled.select`
    max-width:140px;
    margin-bottom:10px ;
    //-webkit-appearance: none;
    border:0;
    font-size:14px;
    font-weight:bold;
    background-color: ${({theme})=> theme.colors.foreground};
    color: ${({theme})=> theme.colors.typography};
    height: 26px;
    padding: 0 10px;
`

const Option = styled.option`
    
`