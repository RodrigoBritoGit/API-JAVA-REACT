import { useEffect, useState } from "react";
import "./App.css";
import Tabela from "./tabela";
import Formulario from "./formulario";
import Sidebar from "./sidebar";
import Modal from "./modal";
import Edicao from "./modal-edicao";

function App() {
  // Objeto produto
  const produto = {
    codigo: 0,
    nome: "",
    marca: "",
  };

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  // Recebendo um Array vazio
  const [produtos, setProdutos] = useState([]);
  // UseState para manipular dados de produtos
  const [objProduto, setObjProduto] = useState(produto);
  // Estado para controlar a exibição do modal de cadastro
  const [showModalCadastro, setShowModalCadastro] = useState(false);
  // Estado para controlar a exibição do modal de edição
  const [showModalEdicao, setShowModalEdicao] = useState(false);
  // Novo estado para o termo de pesquisa
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // Função para abrir o modal de cadastro
  const handleShowModalCadastro = () => {
    setShowModalCadastro(true);
    limparFormulario();
  };

  // Função para fechar o modal de cadastro
  const handleHideModalCadastro = () => {
    setShowModalCadastro(false);
  };


  // useEffect para carregar os dados iniciais
  useEffect(() => {
    fetch("http://localhost:8080/listar")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProdutos(retorno_convertido));
  }, []);

  // Função para obter dados do formulário
  const aoDigitar = (e) => {
    setObjProduto({ ...objProduto, [e.target.name]: e.target.value });
  };

  const handleShowModalEdicao = (nome, marca, codigo) => {
    setObjProduto({
      ...objProduto,
      nome: nome,
      marca: marca,
      codigo: codigo
    });
    setShowModalEdicao(true); // Exibe o modal de edição
  };
  
  
  // Função para fechar o modal de edição
  const handleHideModalEdicao = () => {
    setShowModalEdicao(false);
  };

  // Função para limpar formulário
  const limparFormulario = () => {
    setObjProduto(produto);
  };

  // Função para pesquisar produtos por nome
  const pesquisaPorNome = (nome) => {
    setTermoPesquisa(nome);
  };

  // Filtrar produtos com base no termo de pesquisa
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  // Função para cadastrar produtos
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

  // Função para alterar produtos
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
          let vetorTemp = [...produtos];
          let indice = vetorTemp.findIndex((p) => p.codigo === objProduto.codigo);
          vetorTemp[indice] = objProduto;
          setProdutos(vetorTemp);
          limparFormulario();
        }
      });
  };

  // Função para remover produtos
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
        alert(retorno_convertido.mensagem);
        let vetorTemp = [...produtos];
        let indice = vetorTemp.findIndex((p) => p.codigo === objProduto.codigo);
        vetorTemp.splice(indice, 1);
        setProdutos(vetorTemp);
        limparFormulario();
        setBtnCadastrar(true);
      });
  };

  // Função para selecionar produto
  const selecionarProduto = (indice) => {
    setObjProduto(produtos[indice]);
    setBtnCadastrar(false);
  };
  
  // Função para cancelar ação de cadastro
  const cancelarProdutos = () => {
    limparFormulario();
    setBtnCadastrar(true);
  };

  return (
    <div>
      <Sidebar />
      <Modal
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cadastrar={cadastrar}
        obj={objProduto}
        visible={showModalCadastro}
        onHide={handleHideModalCadastro}
      />
      <Edicao
        botao={btnCadastrar}
        eventoTeclado={aoDigitar}
        cancelar={cancelarProdutos}
        remover={remover}
        alterar={alterar}
        obj={objProduto}
        visible={showModalEdicao}
        onHide={handleHideModalEdicao}
      />
      <Formulario
        obj={objProduto}
        pesquisaPorNome={pesquisaPorNome}
      />
      <div className="modal-cadastrar ">
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleShowModalCadastro}
        >
          Novo
        </button>
      </div>

      <Tabela
        eventoTeclado={aoDigitar}
        cancelar={cancelarProdutos}
        remover={remover}
        alterar={alterar}
        vetor={produtosFiltrados}
        onNovoClick={handleShowModalEdicao} // Alterado para abrir o modal de edição
      />
    </div>
  );
}

export default App;
