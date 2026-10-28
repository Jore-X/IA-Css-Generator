//peguei o botão
const btnGenerate = document.getElementById("buttonGenerate");

async function gerarCodigo() {
  //peguei a caixa de texto
  const textUser = document.getElementById("textArea").value;

  const codeBlock = document.getElementById("codeBlock");
  const codeResult = document.getElementById("codeResult");

  const response = await fetch("/api/gerarCss", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ texto: textUser }),
  });
  console.log(response);
  if (!response.ok) {
    console.log("Resposta Inexperada: ", response.statusText);
    codeBlock.textContent = "Resposta Inexperada: " + response.statusText;
    return;
  }

  const dados = await response.json();
  console.log(dados);
  const Result = dados.choices[0].message.content;

  codeBlock.textContent = Result;
  codeResult.srcdoc = Result;
}

btnGenerate.addEventListener("click", gerarCodigo);
