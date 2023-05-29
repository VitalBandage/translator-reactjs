import { Dictionary } from "lib/types";

export const en_GB: Dictionary = {
    common: {
        autoTranslate: 'Auto translate'
    },
    components:{
        app:{
            loading: "Fetching supported languages...",
            error:"Something went wrong...",
            empty:"No supported language"
        },
        header:{
            github:"Github",
            linkedin: "Linkedin",
            title: "Translator ReactJS",
        },
        footer:{
            nickname: "Vitalbandage",
            flaticons: "FlatIcons",
            libretranslations: "LibreTranslations"
        },
        message:{
            tryAgain: "Try again"
        },
        confidence:{
            error: "We couldn't detect the language"
        }
    },
    screens:{
        translator:{
            sourceInputPlacehorder: "Type text here...",
        }
    }
}