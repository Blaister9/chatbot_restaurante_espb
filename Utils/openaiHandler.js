// utils/openAiHandler.js
const OpenAiClass = require("../Services/openai.class");

const openAiConfig = {
    model: "gpt-4-0613", // O el modelo que desees usar
    temperature: 0, // Puedes ajustar este valor según tus necesidades
    apiKey: process.env.OPENAI_API_KEY, // Aquí es donde se pasa la API key desde el archivo .env,
    max_tokens: 55
};

const openAiInstance = new OpenAiClass(openAiConfig);

const questionPrompt = `
Como bot asistente de restaurante para 'LOS ASOCIADOS', clasifica la siguiente petición del cliente: '{input}' en las categorías 'PEDIDO', 'PREGUNTAS' o 'RESERVA'. Si la petición contiene múltiples elementos, clasifica cada uno de ellos por separado. En caso de que no encaje en ninguna de las categorías mencionadas, proporciona una respuesta coherente.
Si consideras que si entra en una clasificación. SOLO DEVUELVE LA CATEGORIA y no más texto.
`


const queryOpenAI = async (message) => {
    const PromptFormateado = questionPrompt.replace('{input}', message)
    const response = await openAiInstance.sendChat([{ role: "user", content: PromptFormateado }]);
    return response.choices[0].message.content;
};

module.exports = { queryOpenAI };