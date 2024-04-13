function Formulario({
  pesquisaPorNome,
}) {
  const handlePesquisa = (e) => {
    pesquisaPorNome(e.target.value); // Chamando a função de pesquisa por nome ao digitar no campo de pesquisa
  };
  return (
    <form>
       <input
        type="text"
        onChange={handlePesquisa} // Adicionando o evento para pesquisa
        placeholder="Pesquisar por nome"
        className="form-control"
      />
    </form>
  );
}

export default Formulario;
