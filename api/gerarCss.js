export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { texto } = req.body;

  const apiKey = process.env.my_key_groq;
  const address = "https://api.groq.com/openai/v1/chat/completions";

  try {
    const response = await fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "Você é um gerador de código HTML e CSS. Responda SOMENTE com código puro. NUNCA use crases, markdown ou explicações. Formato: primeiro <style> com o CSS, depois o HTML. Siga EXATAMENTE o que o usuário pedir. Se pedir algo quicando, use translateY no @keyframes. Se pedir algo girando, use rotate.",
          },
          {
            role: "user",
            content: texto,
          },
        ],
      }),
    });

    const dados = await response.json();
    
    res.status(200).json(dados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao consultar a API" });
  }
}
