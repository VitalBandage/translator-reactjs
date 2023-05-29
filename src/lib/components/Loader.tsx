import styled from "styled-components"
import { PropsWithChildren } from 'react';


export const Loader: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
    return (
        <LoaderContainer>
            <ActivityIndicator/>
            {children&&(
                <ChildrenContainer>
                {children}
            </ChildrenContainer>
            )} 
        </LoaderContainer>
    )
}

const ActivityIndicator = styled.div`
    width:100%;
    height: 2px;
    background-color: ${({theme})=> theme.colors.primary};
    border-radius: 6px;
    //animation: loading 1s linear infinite alternate;

    @keyframes loading {
        0%{
            width:0;
        }
        100%{
            width: 100%;
        }
    }
`

const LoaderContainer = styled.div`
    width: 100%;
`

const ChildrenContainer = styled.div`
    text-align:center;
`