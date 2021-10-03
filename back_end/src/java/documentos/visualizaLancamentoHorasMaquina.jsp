
  
	<script type="text/javascript">
	function salvarLancamentoHorasMaquina() {
		var f = document.getElementById('form');
			f.setAttribute("method", "Post");
			f.setAttribute("action", "${linkTo[HorasMaquinaController].salvarLancamentoHorasMaquina}");
			f.submit();
	}
</script>

<div class="modal-conteudo" style="width: 40%; margin-left: 30%;margin-top: 1.8%; text-align: left;">
	<div class="form-horizontal" style="background-color: #fff; border-radius: 10px;">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" style="margin-left: 5px; text-align: left;">Editar LancamentoHorasMaquina</h4>
		</div>
		<div class="modal-body" >
			<components:inputDataNovo name="lancamentoHorasMaquina.data" id="" 
		label="data" value="${lancamentoHorasMaquina.data}" divClass="col-sm-5"></components:inputDataNovo>

,<components:selectNovo label="servicoProducaoPrimaria" i18n="false" id="" value="${lancamentoHorasMaquina.servicoProducaoPrimaria}" 
			name="lancamentoHorasMaquina.servicoProducaoPrimaria" itens="${servicoProducaoPrimariaList}" divClass="col-sm-6"></components:selectNovo>

,<components:inputNovo type="number" name="lancamentoHorasMaquina.quantidade" id="" 
		label="quantidade" value="${lancamentoHorasMaquina.quantidade}" divClass="col-sm-3"></components:inputNovo>

,<components:inputMoneyNovo label="valor" id="" value="${lancamentoHorasMaquina.valor}" name="lancamentoHorasMaquina.valor"
		divClass="col-sm-6"></components:inputMoneyNovo>

,<components:inputMoneyNovo label="valorTotal" id="" value="${lancamentoHorasMaquina.valorTotal}" name="lancamentoHorasMaquina.valorTotal"
		divClass="col-sm-6"></components:inputMoneyNovo>


		</div>
		<div class="modal-footer">
			<a href="#" data-dismiss="modal" class="btn btn-default" type="button">Cancelar</a> 
			<a onclick="javascript:salvarLancamentoHorasMaquina()" class="btn btn-primary" type="button">Salvar</a>
		</div>
	</div>
</div>
	
