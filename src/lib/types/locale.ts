export type Dictionary = {
    common: {
        autoTranslate: string
    }
    components: {
        app:{
            loading: string,
            error:string,
            empty:string
        },
        header:{
            title:string,
            github:string,
            linkedin:string,
            
        },
        footer:{
            nickname:string,
            flaticons:string,
            libretranslations:string
        },
        message:{
            tryAgain:string
        },
        confidence:{
            error: string
        }
    },
    screens:{
        translator:{
            sourceInputPlacehorder: string
        }
    }
}