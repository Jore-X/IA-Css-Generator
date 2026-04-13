//peguei o botão
const btnGenerate = document.getElementById("buttonGenerate");

const key = "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";
const address = "https://api.groq.com/openai/v1/chat/completions";

async function gerarCodigo() {
  //peguei a caixa de texto
  const textUser = document.getElementById("textArea").value;
  console.log(textUser);
  const codeBlock = document.getElementById("codeBlock");
  const codeResult = document.getElementById("codeResult");

  const response = await fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + key,
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
          content: textUser,
        },
      ],
    }),
  });
  const dados = await response.json();
  console.log(dados);
  const Result = dados.choices[0].message.content;

  codeBlock.textContent = Result;
  codeResult.srcdoc = Result;
}

btnGenerate.addEventListener("click", gerarCodigo);
