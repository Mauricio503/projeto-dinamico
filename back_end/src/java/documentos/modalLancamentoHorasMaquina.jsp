
  
	<script type="text/javascript">
	function adicionarLancamentoHorasMaquina() {
		var f = document.getElementById('form');
			f.setAttribute("method", "Post");
			f.setAttribute("action", "${linkTo[HorasMaquinaController].adicionarLancamentoHorasMaquina}");
			f.submit();
	}
</script>
<div class="modal fade" id="modalLancamentoHorasMaquina" tabindex="-1" role="dialog" aria-labelledby="modalLancamentoHorasMaquinaLabel" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
 		<div class="modal-content">
 			<div class="modal-header">
 				<h5 class="modal-title" id="exampleModalLongTitle">LancamentoHorasMaquina</h5>
 			</div>
			<div class="row">
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


			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
				<button type="button" class="btn btn-primary" name="method" onclick="adicionarLancamentoHorasMaquina()">Salvar</button>
			</div>
			</div>
 		</div>
 	</div>
</div>
	
