@Entity
@Executivo
@Legislativo
@Cadastros
public class HorasMaquina implements EntidadePersistente, LabelValue {
    
    @Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_horasMaquina")
	@SequenceGenerator(name = "seq_horasMaquina", sequenceName = "horasMaquina_seq",
		allocationSize = 1)
	private Long codigo;
    
    @OneToMany(fetch = FetchType.EAGER)
        private List<LancamentoHorasMaquina> lancamentoHorasMaquina;


}
    