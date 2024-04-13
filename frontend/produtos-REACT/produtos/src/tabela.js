import React, { useState } from "react";
import Modal from "./modal";

function Tabela({ eventoTeclado,vetor, onNovoClick }) {
  // Estado para controlar a página atual
  const [paginaAtual, setPaginaAtual] = useState(1);
  // Número de itens por página
  const itensPorPagina = 4;

  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState("");
  const [marca, setMarca] = useState("");

  // Função para ir para uma página específica
  const irParaPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  // Função para abrir o modal
  const handleShowModal = () => {
    setShowModal(true);
    setNome("");
    setMarca("");
  };

  // Função para fechar o modal
  const handleHideModal = () => {
    setShowModal(false);
  };

  // Calcula o número total de páginas
  const totalPaginas = Math.ceil(vetor.length / itensPorPagina);

  // Calcula os índices inicial e final dos itens a serem exibidos
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = paginaAtual * itensPorPagina;

  // Gera os números das páginas
  const numerosPaginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    numerosPaginas.push(
      <button
        key={i}
        onClick={() => irParaPagina(i)}
        className={`btn btn-secondary ${i === paginaAtual ? "active" : ""}`}
      >
        {i}
      </button>
    );
  }

  // Função para lidar com o envio do formulário do modal
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para onde precisar, como cadastrar um novo item, por exemplo
    console.log("Nome:", nome);
    console.log("Marca:", marca);
    // Feche o modal após o envio
    handleHideModal();
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {vetor.slice(indiceInicial, indiceFinal).map((obj, indice) => (
            <tr key={indiceInicial + indice}>
              <td>{indiceInicial + indice + 1}</td>
              <td>{obj.nome}</td>
              <td>{obj.marca}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onNovoClick(obj.nome, obj.marca, obj.codigo)} 
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Botões para navegar entre as páginas */}
      <div id="paginacao">
        <button
          onClick={() => irParaPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className="btn btn-primary"
        >
          Anterior
        </button>{" "}
        {numerosPaginas}{" "}
        <button
          onClick={() => irParaPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className="btn btn-primary"
        >
          Próxima
        </button>
      </div>
      {/* Modal para adicionar novo item */}
      <Modal show={showModal} handleClose={handleHideModal}>
        <h2>Novo Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="marca">Marca:</label>
            <input
              type="text"
              id="marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Adicionar
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Tabela;
