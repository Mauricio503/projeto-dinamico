@Entity
@Executivo
@Legislativo
@Cadastros
public class LancamentoHorasMaquina implements EntidadePersistente, LabelValue {
    
    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_lancamentoHorasMaquina")
	@SequenceGenerator(name = "seq_lancamentoHorasMaquina", sequenceName = "lancamentoHorasMaquina_seq",
		allocationSize = 1)
	private Long codigo;
    
    @Temporal(TemporalType.DATE)
        @Type(type = "org.jadira.usertype.dateandtime.joda.PersistentLocalDate")
        private LocalDate data;

,    @ManyToOne(fetch = FetchType.EAGER)
        private ServicoProducaoPrimaria servicoProducaoPrimaria;

,    private Integer quantidade;

,    private BigDecimal valor;

,    private BigDecimal valorTotal;


}
    