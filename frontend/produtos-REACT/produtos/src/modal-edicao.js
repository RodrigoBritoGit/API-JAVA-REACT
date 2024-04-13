import React from "react";
import { createPortal } from "react-dom";

const Edicao = ({
  botao,
  eventoTeclado,
  remover,
  alterar,
  obj, // Objeto do produto
  visible,
  onHide
}) => {
  if (!visible) return null;
  const { codigo, nome, marca } = obj; // Dados do produto
  
  const handleAlterar = () => {
    alterar(); // Chama a função de alterar
    onHide(); // Chama a função de fechar o modal
  };

  const handleRemover = () => {
    remover(); // Chama a função de cadastrar
    onHide(); // Chama a função de fechar o modal após o cadastro
  };
  return createPortal(
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Produto</h5>
          </div>
          <div className="modal-body">
            <form>
              <input
                type="text"
                value={obj.nome}
                onChange={eventoTeclado}
                name="nome"
                placeholder="Nome"
                className="form-control"
                id="input-modal-cadastrar"
              />
              <input
                type="text"
                value={obj.marca}
                onChange={eventoTeclado}
                name="marca"
                placeholder="Marca"
                className="form-control"
                id="input-modal-cadastrar"
              />

              {botao ? (
                <div>
                  <input
                    onClick={handleAlterar}
                    type="button"
                    value="Alterar"
                    className="btn btn-warning"
                  />
                  <input
                    onClick={handleRemover}
                    type="button"
                    value="Remover"
                    className="btn btn-danger"
                  />
                </div>
              ) : (
                <div></div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Edicao;
