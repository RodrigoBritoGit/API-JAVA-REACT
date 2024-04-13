import { useEffect, useState } from "react";
import "./App.css";
import Tabela from "./tabela";
import Formulario from "./formulario";

function App() {
  //Objeto produto
  const produto = {
    codigo: 0,
    nome: "",
    marca: "",
  };

  //UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  //Recebendo um Array vazio
  const [produtos, setProdutos] = useState([]);
  // useState para manipular dados de produtos
  const [objProduto, setObjProduto] = useState(produto);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProdutos(retorno_convertido));
  }, []);

  //Obtendo dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  // Limpar formulário
  const limparFormulario = () => {
    setObjProduto(produto);
  };

  // Cadastrar Produtos
  const cadastrar = () => {
    fetch("http://localhost:8080/cadastrar", {
      method: "post",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          setProdutos([...produtos, retorno_convertido]);
          alert("Produto cadastrado com sucesso!");
          limparFormulario();
        }
      });
  };

  // Alterar Produtos
  const alterar = () => {
    fetch("http://localhost:8080/alterar", {
      method: "put",
      body: JSON.stringify(objProduto),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        if (retorno_convertido.mensagem !== undefined) {
          alert(retorno_convertido.mensagem);
        } else {
          alert("Produto alterado com sucesso!");
          //Cópia vetor de produtos
          let vetorTemp = [...produtos];

          //Indice
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objProduto.codigo;
          });

          //Alterar produto do vetor Temporário
          vetorTemp[indice] = objProduto

          // Atualizar vetor de produtos
          setProdutos(vetorTemp);
          limparFormulario();
        }
      });
  };

  // Remover Produtos
  const remover = () => {
    fetch("http://localhost:8080/remover/" + objProduto.codigo, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => {
        //Mensagem
        alert(retorno_convertido.mensagem);

        //Cópia vetor de produtos
        let vetorTemp = [...produtos];

        //Indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objProduto.codigo;
        });

        //Remover produto do vetor Temporário
        vetorTemp.splice(indice, 1);

        // Atualizar vetor de produtos
        setProdutos(vetorTemp);

        //Limpar Formulário
        limparFormulario();
        setBtnCadastrar(true);
      });
  };

  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  };

  const cancelarProdutos = () => {
    limparFormulario();
    setBtnCadastrar(true);
  };

  return (
    <div>
      <Formulario
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        obj={objProduto}
        cancelar={cancelarProdutos}
        remover={remover}
        alterar={alterar}
      />
      <Tabela vetor={produtos} selecionar={selecionarProduto} />
    </div>
  );
}

export default App;
