package br.com.api.produtos.ProdutoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.api.produtos.Repository.ProdutoRepository;
import br.com.api.produtos.model.ProdutoModel;
import br.com.api.produtos.model.RespostaModel;

@Service
public class ProdutoService {
	
	@Autowired
	private ProdutoRepository pr;
	
	@Autowired
	private RespostaModel rm;
	
	//Método para listar produtos
	public Iterable<ProdutoModel> listar() {
		return pr.findAll();
	}
	
	//Método para cadastrar ou alterar produtos
	public ResponseEntity<?> cadastrarAlterar(ProdutoModel pm,String acao) {
		if(pm.getNome().equals("")){
			rm.setMensagem("O nome do produto é obrigatório");
			return new ResponseEntity<RespostaModel>(rm,HttpStatus.BAD_REQUEST);
		} else if (pm.getMarca().equals("")) {
			rm.setMensagem("O nome da marca é obrigatório");
			return new ResponseEntity<RespostaModel>(rm,HttpStatus.BAD_REQUEST);
		} else {
			if(acao.equals("cadastrar")) {
				return new ResponseEntity<ProdutoModel>(pr.save(pm),HttpStatus.CREATED);
			} else {
				return new ResponseEntity<ProdutoModel>(pr.save(pm),HttpStatus.OK);
			}
		}
	}
	
	//Método para remover produtos
	public ResponseEntity<RespostaModel> remover(Long codigo){
		if(pr.existsById(codigo)){
			pr.deleteById(codigo);
			rm.setMensagem("O produto foi removido com sucesso!");
		} else {
			rm.setMensagem("Produto não encontrado!!");
		}
		
		return new ResponseEntity<RespostaModel>(rm,HttpStatus.OK);
	}
	
	

}
