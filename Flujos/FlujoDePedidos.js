const { addKeyword } = require("@bot-whatsapp/bot")
const {PromptPedido} = require("../Prompts/PromptPedido")

const FlujoDePedidos = addKeyword('###_IdentificadorPrueba_###')
.addAction( async (ctx, {flowDynamic,fallBack}) =>{
    const respuesta = await (PromptPedido("PEDIDO"))
    if (respuesta != ""){
        await flowDynamic(respuesta)
    }
    else {
        await fallBack()
    }
})
module.exports = {FlujoDePedidos}