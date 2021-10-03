
  
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="components" uri="http://faee.com.br/jsp/components"%>
<script type="text/javascript">

		function visualizaLancamentoHorasMaquina() {
			var _url = $(this).data('url');
			var _hides = $(this).data('hides');
			if (_url) {
				$.ajax({
					url : _url,
					success : function(data) {
						$('#verLancamentoHorasMaquina .modal-conteudo').html(data);
						if (_hides) {
							$.each(_hides.split(","), function(index, value) {
								$('#' + value).closest('.form-group').hide();
							});
						}
					}
				});
			}
		};
		$('#verLancamentoHorasMaquina').on('hide.bs.modal', function(e) {
			$('#verLancamentoHorasMaquina .modal-conteudo').html('<div class="modal-body">Aguarde...carregando dados...</div>');
		});
			

</script>
	<div class="table-reponsive">
		<table class="table table-bordered table-hover">
				<thead>
				<tr class="well">
					<th class="col-sm-2">Código</th>
					<th style="width: 41px;">
						<button type="button" class="btn btn-success btn-xs" 
							style="vertical-align: middle;height: 20px;" data-toggle="modal" data-target="#modalLancamentoHorasMaquina">
							<span class="glyphicon glyphicon-plus "></span>
						</button>
					</th>
				</tr>						
			</thead>
			<tbody>
				<c:forEach items="${lancamentoHorasMaquinaList}" var="e" varStatus="indice">
					<tr>
						<td></td>
						<td>
							<a class="btn  btn-primary btn-xs" data-toggle="modal" data-target="#verLancamentoHorasMaquina" 
								onclick="visualizaLancamentoHorasMaquina()" href="${linkTo[HorasMaquinaController].visualizaLancamentoHorasMaquina}" >
								<span class="glyphicon glyphicon-pencil"></span>
							</a>
						</td>
					</tr>	
				</c:forEach>				
			</tbody>
		</table>
	</div>	
	



	
				<c:import url="modalLancamentoHorasMaquina.jsp"></c:import>
				
