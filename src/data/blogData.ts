import { BlogArticle } from '../types/blog';

export const blogData: BlogArticle[] = [
  {
    id: '1',
    title: {
      es: 'Nutrición Acuícola Avanzada: Claves para un Cultivo Rentable y Sostenible',
      en: 'Advanced Aquaculture Nutrition: Keys to Profitable and Sustainable Farming',
      pt: 'Nutrição Aquícola Avançada: Chaves para um Cultivo Rentável e Sustentável'
    },
    summary: {
      es: 'Descubre cómo la nutrición de precisión y las estrategias alimentarias avanzadas pueden transformar la eficiencia, rentabilidad y sostenibilidad de tu operación acuícola. Un análisis profundo para productores que buscan la excelencia.',
      en: 'Discover how precision nutrition and advanced feeding strategies can transform the efficiency, profitability and sustainability of your aquaculture operation. An in-depth analysis for producers seeking excellence.',
      pt: 'Descubra como a nutrição de precisão e as estratégias alimentares avançadas podem transformar a eficiência, rentabilidade e sustentabilidade de sua operação aquícola. Uma análise aprofundada para produtores que buscam a excelência.'
    },
    date: '2023-10-26',
    author: {
      es: 'Dr. Armando Castillo, Director de I+D en Prilabsa',
      en: 'Dr. Armando Castillo, R&D Director at Prilabsa',
      pt: 'Dr. Armando Castillo, Diretor de P&D na Prilabsa'
    },
    heroImage: 'https://images.pexels.com/photos/1699204/pexels-photo-1699204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: {
      es: ['Nutrición Acuícola', 'Alimento Balanceado', 'Acuicultura Sostenible', 'Salud Intestinal', 'FCR'],
      en: ['Aquaculture Nutrition', 'Balanced Feed', 'Sustainable Aquaculture', 'Intestinal Health', 'FCR'],
      pt: ['Nutrição Aquícola', 'Ração Balanceada', 'Aquicultura Sustentável', 'Saúde Intestinal', 'FCA']
    },
    content: {
      es: `
        <p>La acuicultura es una industria en constante evolución, donde la eficiencia y la sostenibilidad no son solo objetivos, sino necesidades para competir en un mercado global. En el corazón de una operación acuícola exitosa se encuentra un pilar fundamental: <strong>la nutrición avanzada</strong>. Lejos de ser un simple ejercicio de alimentar peces o camarones, una estrategia nutricional bien diseñada es la clave para desbloquear el máximo potencial genético de los animales, optimizar costos y minimizar el impacto ambiental.</p>

        <h2>Más Allá del Alimento: ¿Qué es la Nutrición de Precisión?</h2>
        <p>La nutrición de precisión es un enfoque científico que consiste en formular dietas que satisfagan las necesidades exactas de cada especie en sus diferentes etapas de vida. Esto implica un balance meticuloso de macronutrientes (proteínas, lípidos, carbohidratos) y micronutrientes (vitaminas, minerales, aminoácidos esenciales).</p>
        <p>Un error común es asumir que "más proteína es mejor". Sin embargo, el exceso de proteína no solo incrementa los costos del alimento, sino que también aumenta la excreción de nitrógeno (amonio), deteriorando la calidad del agua y generando estrés en los animales. La clave está en la <strong>proteína digestible y el perfil de aminoácidos</strong>, asegurando que cada gramo de nutriente sea aprovechado al máximo.</p>

        <h3>Los 3 Pilares de una Dieta de Alto Rendimiento</h3>
        <ul>
          <li><strong>1. Calidad de Ingredientes:</strong> No todos los ingredientes son iguales. Utilizamos fuentes de proteína altamente digestibles y evaluamos cada materia prima para evitar antinutrientes que puedan afectar la salud intestinal.</li>
          <li><strong>2. Salud Intestinal como Prioridad:</strong> Un intestino sano es sinónimo de un animal productivo. Incorporamos aditivos funcionales como <strong>probióticos, prebióticos y ácidos orgánicos</strong> para modular la microbiota intestinal, mejorar la absorción de nutrientes y fortalecer la barrera contra patógenos.</li>
          <li><strong>3. Optimización del Factor de Conversión Alimenticia (FCR):</strong> Un FCR bajo es el indicador definitivo de una nutrición eficiente. Nuestras fórmulas están diseñadas para reducir el FCR, lo que significa que se necesita menos alimento para producir un kilogramo de biomasa. Esto no solo reduce costos, sino que también disminuye la carga de residuos orgánicos en el sistema de cultivo.</li>
        </ul>

        <h2>El Impacto Económico y Ambiental de una Nutrición Superior</h2>
        <p>Invertir en un alimento de alta gama no es un gasto, es una inversión estratégica. Un alimento formulado con precisión conduce a:</p>
        <ul>
          <li><strong>Menores ciclos de producción:</strong> Animales que crecen más rápido y de manera más uniforme.</li>
          <li><strong>Tasas de supervivencia más altas:</strong> Un sistema inmune robusto gracias a inmunoestimulantes y aditivos funcionales.</li>
          <li><strong>Reducción de costos veterinarios:</strong> Menor incidencia de enfermedades oportunistas.</li>
          <li><strong>Sostenibilidad certificable:</strong> El uso responsable de ingredientes y la mínima huella ambiental son factores cada vez más valorados por los mercados internacionales.</li>
        </ul>

        <h2>Conclusión: Tu Socio en Nutrición</h2>
        <p>En Prilabsa, no solo fabricamos alimento; desarrollamos soluciones nutricionales a la medida. Nuestro equipo de I+D trabaja de la mano con los productores para entender sus desafíos y metas, creando programas alimenticios que garantizan resultados medibles. La nutrición avanzada es el motor del crecimiento, la rentabilidad y la sostenibilidad en la acuicultura moderna. <strong>¿Estás listo para llevar tu producción al siguiente nivel?</strong></p>
      `,
      en: `
        <p>Aquaculture is a constantly evolving industry, where efficiency and sustainability are not just goals, but necessities to compete in a global market. At the heart of a successful aquaculture operation lies a fundamental pillar: <strong>advanced nutrition</strong>. Far from being a simple exercise of feeding fish or shrimp, a well-designed nutritional strategy is the key to unlocking the maximum genetic potential of animals, optimizing costs and minimizing environmental impact.</p>

        <h2>Beyond Feed: What is Precision Nutrition?</h2>
        <p>Precision nutrition is a scientific approach that consists of formulating diets that meet the exact needs of each species at their different life stages. This involves a meticulous balance of macronutrients (proteins, lipids, carbohydrates) and micronutrients (vitamins, minerals, essential amino acids).</p>
        <p>A common mistake is assuming that "more protein is better". However, excess protein not only increases feed costs, but also increases nitrogen excretion (ammonia), deteriorating water quality and generating stress in animals. The key lies in <strong>digestible protein and amino acid profile</strong>, ensuring that every gram of nutrient is utilized to the maximum.</p>

        <h3>The 3 Pillars of a High-Performance Diet</h3>
        <ul>
          <li><strong>1. Ingredient Quality:</strong> Not all ingredients are equal. We use highly digestible protein sources and evaluate each raw material to avoid antinutrients that may affect intestinal health.</li>
          <li><strong>2. Intestinal Health as Priority:</strong> A healthy intestine is synonymous with a productive animal. We incorporate functional additives such as <strong>probiotics, prebiotics and organic acids</strong> to modulate intestinal microbiota, improve nutrient absorption and strengthen the barrier against pathogens.</li>
          <li><strong>3. Feed Conversion Ratio (FCR) Optimization:</strong> A low FCR is the definitive indicator of efficient nutrition. Our formulas are designed to reduce FCR, which means less feed is needed to produce one kilogram of biomass. This not only reduces costs, but also decreases the organic waste load in the culture system.</li>
        </ul>

        <h2>The Economic and Environmental Impact of Superior Nutrition</h2>
        <p>Investing in high-end feed is not an expense, it's a strategic investment. Precisely formulated feed leads to:</p>
        <ul>
          <li><strong>Shorter production cycles:</strong> Animals that grow faster and more uniformly.</li>
          <li><strong>Higher survival rates:</strong> A robust immune system thanks to immunostimulants and functional additives.</li>
          <li><strong>Reduced veterinary costs:</strong> Lower incidence of opportunistic diseases.</li>
          <li><strong>Certifiable sustainability:</strong> Responsible use of ingredients and minimal environmental footprint are factors increasingly valued by international markets.</li>
        </ul>

        <h2>Conclusion: Your Nutrition Partner</h2>
        <p>At Prilabsa, we don't just manufacture feed; we develop customized nutritional solutions. Our R&D team works hand in hand with producers to understand their challenges and goals, creating feeding programs that guarantee measurable results. Advanced nutrition is the engine of growth, profitability and sustainability in modern aquaculture. <strong>Are you ready to take your production to the next level?</strong></p>
      `,
      pt: `
        <p>A aquicultura é uma indústria em constante evolução, onde a eficiência e a sustentabilidade não são apenas objetivos, mas necessidades para competir em um mercado global. No coração de uma operação aquícola bem-sucedida encontra-se um pilar fundamental: <strong>a nutrição avançada</strong>. Longe de ser um simples exercício de alimentar peixes ou camarões, uma estratégia nutricional bem projetada é a chave para desbloquear o máximo potencial genético dos animais, otimizar custos e minimizar o impacto ambiental.</p>

        <h2>Além da Ração: O que é Nutrição de Precisão?</h2>
        <p>A nutrição de precisão é uma abordagem científica que consiste em formular dietas que atendam às necessidades exatas de cada espécie em suas diferentes fases de vida. Isso implica um equilíbrio meticuloso de macronutrientes (proteínas, lipídios, carboidratos) e micronutrientes (vitaminas, minerais, aminoácidos essenciais).</p>
        <p>Um erro comum é assumir que "mais proteína é melhor". No entanto, o excesso de proteína não apenas aumenta os custos da ração, mas também aumenta a excreção de nitrogênio (amônia), deteriorando a qualidade da água e gerando estresse nos animais. A chave está na <strong>proteína digestível e no perfil de aminoácidos</strong>, garantindo que cada grama de nutriente seja aproveitado ao máximo.</p>

        <h3>Os 3 Pilares de uma Dieta de Alto Desempenho</h3>
        <ul>
          <li><strong>1. Qualidade dos Ingredientes:</strong> Nem todos os ingredientes são iguais. Utilizamos fontes de proteína altamente digestíveis e avaliamos cada matéria-prima para evitar antinutrientes que possam afetar a saúde intestinal.</li>
          <li><strong>2. Saúde Intestinal como Prioridade:</strong> Um intestino saudável é sinônimo de um animal produtivo. Incorporamos aditivos funcionais como <strong>probióticos, prebióticos e ácidos orgânicos</strong> para modular a microbiota intestinal, melhorar a absorção de nutrientes e fortalecer a barreira contra patógenos.</li>
          <li><strong>3. Otimização do Fator de Conversão Alimentar (FCA):</strong> Um FCA baixo é o indicador definitivo de uma nutrição eficiente. Nossas fórmulas são projetadas para reduzir o FCA, o que significa que menos ração é necessária para produzir um quilograma de biomassa. Isso não apenas reduz custos, mas também diminui a carga de resíduos orgânicos no sistema de cultivo.</li>
        </ul>

        <h2>O Impacto Econômico e Ambiental de uma Nutrição Superior</h2>
        <p>Investir em uma ração de alta qualidade não é um gasto, é um investimento estratégico. Uma ração formulada com precisão leva a:</p>
        <ul>
          <li><strong>Ciclos de produção mais curtos:</strong> Animais que crescem mais rápido e de forma mais uniforme.</li>
          <li><strong>Taxas de sobrevivência mais altas:</strong> Um sistema imunológico robusto graças a imunoestimulantes e aditivos funcionais.</li>
          <li><strong>Redução de custos veterinários:</strong> Menor incidência de doenças oportunistas.</li>
          <li><strong>Sustentabilidade certificável:</strong> O uso responsável de ingredientes e a pegada ambiental mínima são fatores cada vez mais valorizados pelos mercados internacionais.</li>
        </ul>

        <h2>Conclusão: Seu Parceiro em Nutrição</h2>
        <p>Na Prilabsa, não apenas fabricamos ração; desenvolvemos soluções nutricionais sob medida. Nossa equipe de P&D trabalha lado a lado com os produtores para entender seus desafios e metas, criando programas alimentares que garantem resultados mensuráveis. A nutrição avançada é o motor do crescimento, rentabilidade e sustentabilidade na aquicultura moderna. <strong>Você está pronto para levar sua produção ao próximo nível?</strong></p>
      `
    }
  },
  {
    id: '2',
    title: {
      es: 'Manejo Sanitario y Bioseguridad: El Escudo Protector de tu Inversión Acuícola',
      en: 'Sanitary Management and Biosecurity: The Protective Shield of Your Aquaculture Investment',
      pt: 'Manejo Sanitário e Biossegurança: O Escudo Protetor do seu Investimento Aquícola'
    },
    summary: {
      es: 'Un brote de enfermedad puede devastar una producción en días. Aprende a implementar un programa de bioseguridad robusto y estrategias de manejo sanitario proactivo para proteger tu cultivo y asegurar la rentabilidad a largo plazo.',
      en: 'A disease outbreak can devastate production in days. Learn to implement a robust biosecurity program and proactive sanitary management strategies to protect your crop and ensure long-term profitability.',
      pt: 'Um surto de doença pode devastar uma produção em dias. Aprenda a implementar um programa de biossegurança robusto e estratégias de manejo sanitário proativo para proteger seu cultivo e garantir a rentabilidade a longo prazo.'
    },
    date: '2023-11-05',
    author: {
      es: 'Dra. Isabel Reyes, Gerente de Sanidad Acuícola',
      en: 'Dr. Isabel Reyes, Aquatic Health Manager',
      pt: 'Dra. Isabel Reyes, Gerente de Sanidade Aquícola'
    },
    heroImage: 'https://thumbs.dreamstime.com/b/laboratory-114782620.jpg',
    tags: {
      es: ['Bioseguridad', 'Sanidad Acuícola', 'Prevención de Enfermedades', 'Calidad de Agua'],
      en: ['Biosecurity', 'Aquatic Health', 'Disease Prevention', 'Water Quality'],
      pt: ['Biossegurança', 'Sanidade Aquícola', 'Prevenção de Doenças', 'Qualidade da Água']
    },
    content: {
      es: `
        <p>En la acuicultura, la frase "prevenir es mejor que curar" no es un cliché, es una regla de oro. Mientras que la genética y la nutrición potencian el crecimiento, el <strong>manejo sanitario y la bioseguridad</strong> son el escudo que protege esa inversión. Un solo descuido puede introducir patógenos capaces de comprometer la viabilidad de todo un ciclo de producción, generando pérdidas económicas masivas.</p>

        <h2>Bioseguridad: Más que un Protocolo, una Mentalidad</h2>
        <p>La bioseguridad es un conjunto integral de prácticas diseñadas para minimizar el riesgo de introducción y propagación de agentes infecciosos. No se trata de una lista de tareas, sino de una cultura organizacional que debe ser adoptada por todo el personal de la granja.</p>

        <h3>Los 4 Pilares de un Programa de Bioseguridad Efectivo</h3>
        <ul>
          <li><strong>1. Control de Vectores y Acceso (Aislamiento):</strong> El patógeno no puede entrar si no le das una vía de acceso. Esto incluye:
            <ul>
              <li><strong>Control estricto del personal y vehículos:</strong> Uso de vados sanitarios, desinfección de calzado y equipos.</li>
              <li><strong>Barreras físicas:</strong> Mallas antipájaros y control de fauna silvestre que pueden ser portadores de enfermedades.</li>
              <li><strong>Control de la fuente de agua:</strong> Sistemas de filtración y desinfección del agua de entrada.</li>
            </ul>
          </li>
          <li><strong>2. Calidad del Agua como Primera Línea de Defensa:</strong> Un ambiente acuático subóptimo genera estrés crónico, debilitando el sistema inmune de los animales y haciéndolos susceptibles a enfermedades. El monitoreo constante y la gestión de parámetros clave son cruciales:
            <ul>
              <li><strong>Oxígeno Disuelto:</strong> El factor limitante más común. Niveles bajos causan estrés inmediato.</li>
              <li><strong>Amonio y Nitritos:</strong> Compuestos tóxicos que deben mantenerse en niveles mínimos.</li>
              <li><strong>pH y Alcalinidad:</strong> Estabilidad para evitar fluctuaciones bruscas que afecten el metabolismo.</li>
            </ul>
          </li>
          <li><strong>3. Manejo de la Alimentación y la Población:</strong> La sobrealimentación no solo desperdicia dinero, sino que deteriora la calidad del agua. De igual forma, una densidad de siembra excesiva aumenta la competencia, el estrés y la transmisión de enfermedades. Es vital ajustar las tasas de alimentación y la densidad a la capacidad de carga real del sistema.</li>
          <li><strong>4. Cuarentena y Origen de los Animales:</strong> Nunca introduzcas un nuevo lote de postlarvas o juveniles directamente al sistema principal. Un período de cuarentena de al menos 15-30 días es esencial para observar posibles signos de enfermedad. Asegúrate de adquirir tus animales de proveedores certificados y con un historial sanitario impecable.</li>
        </ul>

        <h2>Manejo Sanitario Proactivo: De la Reacción a la Anticipación</h2>
        <p>El manejo sanitario moderno se enfoca en la anticipación. Esto implica realizar monitoreos de salud regulares (histopatología, microbiología) para detectar problemas antes de que se conviertan en brotes. El uso de <strong>probióticos y aditivos inmunoestimulantes</strong> en el alimento puede fortalecer las defensas naturales de los animales, creando una población más resiliente.</p>

        <h2>Conclusión: La Bioseguridad es Rentabilidad</h2>
        <p>Implementar un programa de bioseguridad y manejo sanitario no es un costo operativo, es la inversión más segura que un productor puede hacer. Protege tu biomasa, reduce la necesidad de tratamientos costosos y mejora la confianza del mercado en tu producto. En Prilabsa, ofrecemos asesoría integral para diseñar e implementar protocolos de bioseguridad a la medida de tu operación, porque tu éxito es nuestro compromiso.</p>
      `,
      en: `
        <p>In aquaculture, the phrase "prevention is better than cure" is not a cliché, it's a golden rule. While genetics and nutrition enhance growth, <strong>sanitary management and biosecurity</strong> are the shield that protects that investment. A single oversight can introduce pathogens capable of compromising the viability of an entire production cycle, generating massive economic losses.</p>

        <h2>Biosecurity: More than a Protocol, a Mindset</h2>
        <p>Biosecurity is a comprehensive set of practices designed to minimize the risk of introduction and spread of infectious agents. It's not about a task list, but an organizational culture that must be adopted by all farm personnel.</p>

        <h3>The 4 Pillars of an Effective Biosecurity Program</h3>
        <ul>
          <li><strong>1. Vector and Access Control (Isolation):</strong> The pathogen cannot enter if you don't give it an access route. This includes:
            <ul>
              <li><strong>Strict personnel and vehicle control:</strong> Use of sanitary fords, footwear and equipment disinfection.</li>
              <li><strong>Physical barriers:</strong> Bird nets and wildlife control that can be disease carriers.</li>
              <li><strong>Water source control:</strong> Filtration and disinfection systems for incoming water.</li>
            </ul>
          </li>
          <li><strong>2. Water Quality as First Line of Defense:</strong> A suboptimal aquatic environment generates chronic stress, weakening the animals' immune system and making them susceptible to diseases. Constant monitoring and management of key parameters are crucial:
            <ul>
              <li><strong>Dissolved Oxygen:</strong> The most common limiting factor. Low levels cause immediate stress.</li>
              <li><strong>Ammonia and Nitrites:</strong> Toxic compounds that must be kept at minimum levels.</li>
              <li><strong>pH and Alkalinity:</strong> Stability to avoid sudden fluctuations that affect metabolism.</li>
            </ul>
          </li>
          <li><strong>3. Feeding and Population Management:</strong> Overfeeding not only wastes money, but deteriorates water quality. Similarly, excessive stocking density increases competition, stress and disease transmission. It's vital to adjust feeding rates and density to the system's actual carrying capacity.</li>
          <li><strong>4. Quarantine and Animal Origin:</strong> Never introduce a new batch of post-larvae or juveniles directly into the main system. A quarantine period of at least 15-30 days is essential to observe possible signs of disease. Make sure to acquire your animals from certified suppliers with an impeccable health history.</li>
        </ul>

        <h2>Proactive Sanitary Management: From Reaction to Anticipation</h2>
        <p>Modern sanitary management focuses on anticipation. This involves conducting regular health monitoring (histopathology, microbiology) to detect problems before they become outbreaks. The use of <strong>probiotics and immunostimulant additives</strong> in feed can strengthen the animals' natural defenses, creating a more resilient population.</p>

        <h2>Conclusion: Biosecurity is Profitability</h2>
        <p>Implementing a biosecurity and sanitary management program is not an operational cost, it's the safest investment a producer can make. It protects your biomass, reduces the need for costly treatments and improves market confidence in your product. At Prilabsa, we offer comprehensive advisory services to design and implement customized biosecurity protocols for your operation, because your success is our commitment.</p>
      `,
      pt: `
        <p>Na aquicultura, a frase "prevenir é melhor que curar" não é um clichê, é uma regra de ouro. Enquanto a genética e a nutrição potencializam o crescimento, o <strong>manejo sanitário e a biossegurança</strong> são o escudo que protege esse investimento. Um único descuido pode introduzir patógenos capazes de comprometer a viabilidade de todo um ciclo de produção, gerando perdas econômicas massivas.</p>

        <h2>Biossegurança: Mais que um Protocolo, uma Mentalidade</h2>
        <p>A biossegurança é um conjunto integral de práticas projetadas para minimizar o risco de introdução e propagação de agentes infecciosos. Não se trata de uma lista de tarefas, mas de uma cultura organizacional que deve ser adotada por todo o pessoal da fazenda.</p>

        <h3>Os 4 Pilares de um Programa de Biossegurança Eficaz</h3>
        <ul>
          <li><strong>1. Controle de Vetores e Acesso (Isolamento):</strong> O patógeno não pode entrar se você não der uma via de acesso. Isso inclui:
            <ul>
              <li><strong>Controle rigoroso de pessoal e veículos:</strong> Uso de vaus sanitários, desinfecção de calçados e equipamentos.</li>
              <li><strong>Barreiras físicas:</strong> Redes antipássaros e controle de fauna silvestre que podem ser portadores de doenças.</li>
              <li><strong>Controle da fonte de água:</strong> Sistemas de filtração e desinfecção da água de entrada.</li>
            </ul>
          </li>
          <li><strong>2. Qualidade da Água como Primeira Linha de Defesa:</strong> Um ambiente aquático subótimo gera estresse crônico, enfraquecendo o sistema imunológico dos animais e tornando-os suscetíveis a doenças. O monitoramento constante e a gestão de parâmetros-chave são cruciais:
            <ul>
              <li><strong>Oxigênio Dissolvido:</strong> O fator limitante mais comum. Níveis baixos causam estresse imediato.</li>
              <li><strong>Amônia e Nitritos:</strong> Compostos tóxicos que devem ser mantidos em níveis mínimos.</li>
              <li><strong>pH e Alcalinidade:</strong> Estabilidade para evitar flutuações bruscas que afetem o metabolismo.</li>
            </ul>
          </li>
          <li><strong>3. Manejo da Alimentação e da População:</strong> A superalimentação não apenas desperdiça dinheiro, mas deteriora a qualidade da água. Da mesma forma, uma densidade de estocagem excessiva aumenta a competição, o estresse e a transmissão de doenças. É vital ajustar as taxas de alimentação e a densidade à capacidade de carga real do sistema.</li>
          <li><strong>4. Quarentena e Origem dos Animais:</strong> Nunca introduza um novo lote de pós-larvas ou juvenis diretamente no sistema principal. Um período de quarentena de pelo menos 15-30 dias é essencial para observar possíveis sinais de doença. Certifique-se de adquirir seus animais de fornecedores certificados e com um histórico sanitário impecável.</li>
        </ul>

        <h2>Manejo Sanitário Proativo: Da Reação à Antecipação</h2>
        <p>O manejo sanitário moderno foca na antecipação. Isso implica realizar monitoramentos de saúde regulares (histopatologia, microbiologia) para detectar problemas antes que se tornem surtos. O uso de <strong>probióticos e aditivos imunoestimulantes</strong> na ração pode fortalecer as defesas naturais dos animais, criando uma população mais resiliente.</p>

        <h2>Conclusão: A Biossegurança é Rentabilidade</h2>
        <p>Implementar um programa de biossegurança e manejo sanitário não é um custo operacional, é o investimento mais seguro que um produtor pode fazer. Protege sua biomassa, reduz a necessidade de tratamentos custosos e melhora a confiança do mercado em seu produto. Na Prilabsa, oferecemos assessoria integral para projetar e implementar protocolos de biossegurança sob medida para sua operação, porque seu sucesso é nosso compromisso.</p>
      `
    }
  }
];
