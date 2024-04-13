import React from "react";

function Home() {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sistema de Gestão de Produtos</h2>
              <p className="card-text">
                Bem-vindo ao nosso sistema de gestão de produtos. Aqui você pode gerenciar todos os aspectos dos seus produtos de forma eficiente.
              </p>
              <p className="card-text">
                Para começar, clique no botão abaixo.
              </p>
              <div className="d-grid">
                <a href="/produtos" className="btn btn-primary">Gerenciar Produtos</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
