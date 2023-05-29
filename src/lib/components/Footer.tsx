import { APP_CONFIG } from "lib/config"
import { useTranslations } from "lib/hooks"
import styled from "styled-components"

export const Footer = () =>{
    const T = useTranslations()
    const year = new Date().getFullYear()
    return (
    <FooterContainer>
        <NicknameContainer>
            &copy; {year} {T.components.footer.nickname}
        </NicknameContainer>
        <LinkContainer>
            <Link
            href={APP_CONFIG.FLATICONS_URL}
            target="_blank"
            >
            {T.components.footer.flaticons}
            </Link>
            <Link
            href={APP_CONFIG.LIBRE_TRANSLATE_URL}
            target="_blank">
            {T.components.footer.libretranslations}
            </Link>
        </LinkContainer>
    </FooterContainer>
    )
}

const FooterContainer = styled.div`
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({theme})=> theme.colors.foreground};
    padding: 0 15px;
`
const NicknameContainer = styled.div`
    color: ${({theme})=> theme.colors.typography};
`

const LinkContainer = styled.div``

const Link = styled.a`
    color: ${({theme})=> theme.colors.typography};
    text-decoration: underline;
    cursor: pointer;
    padding: 0 10px;
`

