
        @Resource
@Path("formaPagamento")
public class FormaPagamentoController {

	@Autowired
	private Result result;
  @Autowired
  private FormaPagamentoRepository formaPagamentoRepository;
  ,,

	@Get("/lista")
	public void lista() {
		List<FormaPagamento> lista = formaPagamentoRepository.findAll();
		result.include("lista",lista);
	}

	@Get("/novo")
	public void novo() {
	}

	@Post("/novo")
	public void salvar(FormaPagamento entidade) {
		formaPagamentoRepository.save(entidade);
    result.redirectTo(this).lista();
	}

	@Get("/visualizar/{entidade.codigo}")
	public void visualizar(FormaPagamento entidade) {
		result.include("entidade", formaPagamentoRepository.findOne(entidade.getCodigo()));
	}

	@Delete("/visualizar/{entidade.codigo}")
	public void remover(FormaPagamento entidade) {
		formaPagamentoRepository.delete(entidade);
		result.redirectTo(this).lista();
	}

	@Put("/visualizar/{entidade.codigo}")
	public void alterar(FormaPagamento entidade) {
		formaPagamentoRepository.save(entidade);
		result.redirectTo(this).lista();
	}

	,,
} 