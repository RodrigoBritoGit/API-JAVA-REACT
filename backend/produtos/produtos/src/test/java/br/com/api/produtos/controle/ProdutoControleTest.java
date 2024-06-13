package br.com.api.produtos.controle;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import br.com.api.produtos.ProdutoService.*;

public class ProdutoControleTest {

	/*
	 * @Mock: Cria um mock do serviço ProdutoService para simular seu comportamento.
	 * 
	 * @InjectMocks: Injeta os mocks criados na classe ProdutoControle.
	 */

	@Mock
	private ProdutoService produtoService;

	@InjectMocks
	private ProdutoControle produtoControle;

	/*
	 * O método setUp() é anotado com @BeforeEach, o que significa que será
	 * executado antes de cada método de teste. Ele inicializa os mocks definidos na
	 * classe.
	 */

	@BeforeEach
	public void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	/*
	 * Este é um exemplo de teste unitário para o método remover() da classe
	 * ProdutoControle. O comportamento do serviço é simulado usando
	 * when().thenReturn() para retornar uma resposta simulada. O método remover()
	 * do controle é então chamado e a resposta é armazenada. Por fim, é verificado
	 * se o método do serviço foi chamado corretamente e se a resposta foi a
	 * esperada.
	 */

	@Test
    public void testRemover() {
        // Mock da resposta do serviço
        when(produtoService.remover(anyLong())).thenReturn(new ResponseEntity<>(HttpStatus.OK));

        // Chamada do método no controle
        ResponseEntity<?> responseEntity = produtoControle.remover(1L);

        // Verificação se o serviço foi chamado e a resposta foi correta
        verify(produtoService, times(1)).remover(1L);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }

}
