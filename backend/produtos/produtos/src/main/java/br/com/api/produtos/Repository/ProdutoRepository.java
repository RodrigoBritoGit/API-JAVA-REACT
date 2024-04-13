package br.com.api.produtos.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.api.produtos.model.ProdutoModel;

@Repository
public interface ProdutoRepository extends CrudRepository<ProdutoModel, Long> {
	
}
