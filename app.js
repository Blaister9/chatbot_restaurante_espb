require('dotenv').config();
const {
    createBot, 
    createProvider, 
    createFlow, 
    addKeyword,
    EVENTS
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const JsonFileAdapter = require('@bot-whatsapp/database/json')
const {queryOpenAI} = require("../base-baileys-json/Utils/openaiHandler")
const {handlerAI} = require("../base-baileys-json/Utils/handlerAI")
const {FlujoDePedidos} = require("./Flujos/FlujoDePedidos")

const FlujoPrincipal = addKeyword(EVENTS.WELCOME)
.addAction(async (ctx, { flowDynamic, gotoFlow })=>{
    const MensajeUsuario = ctx.body;
    if (MensajeUsuario!=""){
        
        const RespuestaAI = await queryOpenAI(MensajeUsuario);
        switch (RespuestaAI) {
            case "DEFAULT":
                break;
            case "PEDIDO":
                gotoFlow(FlujoDePedidos)
                break;
            case "PREGUNTAS":
                gotoFlow(FlujoDePedidos)
                break;
            case "RESERVA":
                gotoFlow(FlujoDePedidos)
                break;
        }
    }    
})

const FlujoConVoz = addKeyword(EVENTS.VOICE_NOTE)
.addAnswer(":O Veo que enviaste una nota de voz. Ya la procedo.")
.addAction(async (ctx, {flowDynamic})=>{
    const MensajeUsuario = await handlerAI(ctx); // Se convierte la nota de voz a texto(se descarga, se convierte  de ogg a mp3, se pasa de voz a texto)
    await flowDynamic(await queryOpenAI(MensajeUsuario))
})

const main = async () => {
    const adapterDB = new JsonFileAdapter()
    const adapterFlow = createFlow([FlujoPrincipal,FlujoConVoz])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },
    {
        blackList:['573003508511']
    }
    )

    QRPortalWeb()
}
main()