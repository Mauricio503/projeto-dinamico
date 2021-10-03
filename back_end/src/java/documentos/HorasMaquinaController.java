
        @Resource
@Path("horasMaquina")
public class HorasMaquinaController {

	@Autowired
	private Result result;
  @Autowired
  private HorasMaquinaRepository horasMaquinaRepository;
  @Autowired
		private LancamentoHorasMaquinaRepository lancamentoHorasMaquinaRepository;

	@Get("/lista")
	public void lista() {
		List<HorasMaquina> lista = horasMaquinaRepository.findAll();
		result.include("lista",lista);
	}

	@Get("/novo")
	public void novo() {
	}

	@Post("/novo")
	public void salvar(HorasMaquina entidade) {
		horasMaquinaRepository.save(entidade);
    result.redirectTo(this).lista();
	}

	@Get("/visualizar/{entidade.codigo}")
	public void visualizar(HorasMaquina entidade) {
		result.include("entidade", horasMaquinaRepository.findOne(entidade.getCodigo()));
	}

	@Delete("/visualizar/{entidade.codigo}")
	public void remover(HorasMaquina entidade) {
		horasMaquinaRepository.delete(entidade);
		result.redirectTo(this).lista();
	}

	@Put("/visualizar/{entidade.codigo}")
	public void alterar(HorasMaquina entidade) {
		horasMaquinaRepository.save(entidade);
		result.redirectTo(this).lista();
	}

	@Get("/visualizaLancamentoHorasMaquina")
		public void visualizaLancamentoHorasMaquina(LancamentoHorasMaquina lancamentoHorasMaquina) {
			result.include("lancamentoHorasMaquina", lancamentoHorasMaquinaRepository.findOne(lancamentoHorasMaquina.getCodigo()));
		}
	  
		@Post("/salvarLancamentoHorasMaquina")
		public void salvarLancamentoHorasMaquina(HorasMaquina entidade,LancamentoHorasMaquina lancamentoHorasMaquina) {
		  lancamentoHorasMaquinaRepository.save(lancamentoHorasMaquina);
		  result.include("entidade",entidade);
		  if (entidade.getCodigo() != null) {
			  result.redirectTo(this).visualizar(entidade);
		  } else {
			  result.redirectTo(this).novo();
		  }
		}
		@Post("/adicionarLancamentoHorasMaquina")
		public void adicionarLancamentoHorasMaquina(HorasMaquina entidade,LancamentoHorasMaquina lancamentoHorasMaquina) {
		  lancamentoHorasMaquinaRepository.save(lancamentoHorasMaquina);
		  entidade.getLancamentoHorasMaquina().add(lancamentoHorasMaquina);
		  result.include("entidade",entidade);
		  if (entidade.getCodigo() != null) {
			  result.redirectTo(this).visualizar(entidade);
		  } else {
			  result.redirectTo(this).novo();
		  }
		}
} 