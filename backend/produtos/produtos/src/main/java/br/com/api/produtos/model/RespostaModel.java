package br.com.api.produtos.model;

import org.springframework.stereotype.Component;

@Component
public class RespostaModel {

	private String mensagem;

	public String getMensagem() {
		return mensagem;
	}

	public void setMensagem(String mensagem) {
		this.mensagem = mensagem;
	}
}
