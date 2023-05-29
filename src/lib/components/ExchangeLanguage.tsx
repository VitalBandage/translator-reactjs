import styled from "styled-components"
import {Images} from 'assets'


type ExchangeLanguageProps = {
    onClick(): void,
    hidden: boolean
}

export const ExchangeLanguage: React.FC<ExchangeLanguageProps> = ({
    onClick,
    hidden
}) => {
    return (
        <ExchangeContainer>
            {!hidden &&(
                <Exchange 
                src={Images.ExchangeIcon}
                onClick={onClick}
                >
            
                </Exchange>
            )}  
        </ExchangeContainer>
        
    )
}
const Exchange = styled.img`
    cursor: pointer;
    width: 35px;
    height: 35px;
`
const ExchangeContainer = styled.div`
    cursor: pointer;
    width: 35px;
    height: 35px;
`