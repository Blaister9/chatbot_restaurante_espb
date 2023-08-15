// utils/openAiHandler.js
const OpenAiClass = require("../Services/openai.class");

const openAiConfig = {
    model: "gpt-4-0613", // O el modelo que desees usar
    temperature: 0.5, // Puedes ajustar este valor según tus necesidades
    apiKey: process.env.OPENAI_API_KEY, // Aquí es donde se pasa la API key desde el archivo .env,
    max_tokens: 55
};

const openAiInstance = new OpenAiClass(openAiConfig);

const questionPrompt = `
Acabas de clasificar la petición del usuario como: {input}.
Ahora debes solicitarle los siguientes datos:
{
    nombre de la persona a la cual se le hará el pedido: ,
    que desea pedir: ,
    dirección donde se llevará: ,
    metodo de pago: ,
}
para poder crear el pedido, debe si o si tener todos los datos. Para confirmar que toda la información sea correcta, debes decirle que escriba "SI CONFIRMO". En Mayúscula.
`


const PromptPedido = async (message) => {
    const PromptFormateado = questionPrompt.replace('{input}', message)
    const response = await openAiInstance.sendChat([{ role: "user", content: PromptFormateado }]);
    return response.choices[0].message.content;
};

module.exports = { PromptPedido };