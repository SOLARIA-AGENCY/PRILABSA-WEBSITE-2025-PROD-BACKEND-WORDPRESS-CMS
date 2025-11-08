<?php
/**
 * PRILABSA Blog Import Script
 *
 * Importa artículos de blog desde datos estáticos a WordPress
 * Ejecutar: php prilabsa-import-blog.php
 *
 * @package PRILABSA
 * @author SOLARIA AGENCY
 * @version 1.0.0
 */

// Load WordPress
require_once dirname( __FILE__ ) . '/../../../wp-load.php';

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No se puede acceder directamente a este script.' );
}

// Load required WordPress admin files for media functions
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

/**
 * Blog Articles Data
 * Migrados desde src/data/blogData.ts
 */
$blog_articles = array(
	array(
		'post_title'   => 'Nutrición Acuícola Avanzada: Claves para un Cultivo Rentable y Sostenible',
		'post_status'  => 'publish',
		'post_type'    => 'blog',
		'post_excerpt' => 'Descubre cómo la nutrición de precisión y las estrategias alimentarias avanzadas pueden transformar la eficiencia, rentabilidad y sostenibilidad de tu operación acuícola.',
		'acf'          => array(
			'titulo_es'           => 'Nutrición Acuícola Avanzada: Claves para un Cultivo Rentable y Sostenible',
			'titulo_en'           => 'Advanced Aquaculture Nutrition: Keys to Profitable and Sustainable Farming',
			'titulo_pt'           => 'Nutrição Aquícola Avançada: Chaves para um Cultivo Rentável e Sustentável',
			'resumen_es'          => 'Descubre cómo la nutrición de precisión y las estrategias alimentarias avanzadas pueden transformar la eficiencia, rentabilidad y sostenibilidad de tu operación acuícola. Un análisis profundo para productores que buscan la excelencia.',
			'resumen_en'          => 'Discover how precision nutrition and advanced feeding strategies can transform the efficiency, profitability and sustainability of your aquaculture operation. An in-depth analysis for producers seeking excellence.',
			'resumen_pt'          => 'Descubra como a nutrição de precisão e as estratégias alimentares avançadas podem transformar a eficiência, rentabilidade e sustentabilidade de sua operação aquícola. Uma análise aprofundada para produtores que buscam a excelência.',
			'contenido_es'        => '
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
			',
			'contenido_en'        => '
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
				<p>Investing in high-end feed is not an expense, it\'s a strategic investment. Precisely formulated feed leads to:</p>
				<ul>
				  <li><strong>Shorter production cycles:</strong> Animals that grow faster and more uniformly.</li>
				  <li><strong>Higher survival rates:</strong> A robust immune system thanks to immunostimulants and functional additives.</li>
				  <li><strong>Reduced veterinary costs:</strong> Lower incidence of opportunistic diseases.</li>
				  <li><strong>Certifiable sustainability:</strong> Responsible use of ingredients and minimal environmental footprint are factors increasingly valued by international markets.</li>
				</ul>

				<h2>Conclusion: Your Nutrition Partner</h2>
				<p>At Prilabsa, we don\'t just manufacture feed; we develop customized nutritional solutions. Our R&D team works hand in hand with producers to understand their challenges and goals, creating feeding programs that guarantee measurable results. Advanced nutrition is the engine of growth, profitability and sustainability in modern aquaculture. <strong>Are you ready to take your production to the next level?</strong></p>
			',
			'contenido_pt'        => '
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
			',
			'autor_es'            => 'Dr. Armando Castillo, Director de I+D en Prilabsa',
			'autor_en'            => 'Dr. Armando Castillo, R&D Director at Prilabsa',
			'autor_pt'            => 'Dr. Armando Castillo, Diretor de P&D na Prilabsa',
			'fecha_publicacion'   => '20231026',
			'tags_es'             => 'Nutrición Acuícola,Alimento Balanceado,Acuicultura Sostenible,Salud Intestinal,FCR',
			'tags_en'             => 'Aquaculture Nutrition,Balanced Feed,Sustainable Aquaculture,Intestinal Health,FCR',
			'tags_pt'             => 'Nutrição Aquícola,Ração Balanceada,Aquicultura Sustentável,Saúde Intestinal,FCA',
		),
		'featured_image' => 'https://images.pexels.com/photos/1699204/pexels-photo-1699204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
	),
	array(
		'post_title'   => 'Manejo Sanitario y Bioseguridad: El Escudo Protector de tu Inversión Acuícola',
		'post_status'  => 'publish',
		'post_type'    => 'blog',
		'post_excerpt' => 'Un brote de enfermedad puede devastar una producción en días. Aprende a implementar un programa de bioseguridad robusto.',
		'acf'          => array(
			'titulo_es'           => 'Manejo Sanitario y Bioseguridad: El Escudo Protector de tu Inversión Acuícola',
			'titulo_en'           => 'Sanitary Management and Biosecurity: The Protective Shield of Your Aquaculture Investment',
			'titulo_pt'           => 'Manejo Sanitário e Biossegurança: O Escudo Protetor do seu Investimento Aquícola',
			'resumen_es'          => 'Un brote de enfermedad puede devastar una producción en días. Aprende a implementar un programa de bioseguridad robusto y estrategias de manejo sanitario proactivo para proteger tu cultivo y asegurar la rentabilidad a largo plazo.',
			'resumen_en'          => 'A disease outbreak can devastate production in days. Learn to implement a robust biosecurity program and proactive sanitary management strategies to protect your crop and ensure long-term profitability.',
			'resumen_pt'          => 'Um surto de doença pode devastar uma produção em dias. Aprenda a implementar um programa de biossegurança robusto e estratégias de manejo sanitário proativo para proteger seu cultivo e garantir a rentabilidade a longo prazo.',
			'contenido_es'        => '<p>En la acuicultura, la frase "prevenir es mejor que curar" no es un cliché, es una regla de oro...</p>',
			'contenido_en'        => '<p>In aquaculture, the phrase "prevention is better than cure" is not a cliché, it\'s a golden rule...</p>',
			'contenido_pt'        => '<p>Na aquicultura, a frase "prevenir é melhor que curar" não é um clichê, é uma regra de ouro...</p>',
			'autor_es'            => 'Dra. Isabel Reyes, Gerente de Sanidad Acuícola',
			'autor_en'            => 'Dr. Isabel Reyes, Aquatic Health Manager',
			'autor_pt'            => 'Dra. Isabel Reyes, Gerente de Sanidade Aquícola',
			'fecha_publicacion'   => '20231105',
			'tags_es'             => 'Bioseguridad,Sanidad Acuícola,Prevención de Enfermedades,Calidad de Agua',
			'tags_en'             => 'Biosecurity,Aquatic Health,Disease Prevention,Water Quality',
			'tags_pt'             => 'Biossegurança,Sanidade Aquícola,Prevenção de Doenças,Qualidade da Água',
		),
		'featured_image' => 'https://thumbs.dreamstime.com/b/laboratory-114782620.jpg',
	),
);

echo "\n=== PRILABSA Blog Import Script ===\n\n";
echo "Importando " . count( $blog_articles ) . " artículos de blog...\n\n";

$imported = 0;
$errors   = 0;

foreach ( $blog_articles as $index => $article_data ) {
	echo "[" . ( $index + 1 ) . "/" . count( $blog_articles ) . "] Importando: " . $article_data['post_title'] . "\n";

	// Check if article already exists
	$existing = get_posts(
		array(
			'post_type'   => 'blog',
			'post_status' => 'any',
			'title'       => $article_data['post_title'],
			'numberposts' => 1,
		)
	);

	if ( ! empty( $existing ) ) {
		echo "  ⚠️  Ya existe, omitiendo...\n\n";
		continue;
	}

	// Create post
	$post_id = wp_insert_post(
		array(
			'post_title'   => $article_data['post_title'],
			'post_excerpt' => $article_data['post_excerpt'],
			'post_status'  => $article_data['post_status'],
			'post_type'    => $article_data['post_type'],
		),
		true
	);

	if ( is_wp_error( $post_id ) ) {
		echo "  ❌ Error: " . $post_id->get_error_message() . "\n\n";
		$errors++;
		continue;
	}

	// Add ACF fields
	if ( function_exists( 'update_field' ) ) {
		foreach ( $article_data['acf'] as $field_name => $field_value ) {
			update_field( $field_name, $field_value, $post_id );
		}
	}

	// Set featured image from URL
	if ( ! empty( $article_data['featured_image'] ) ) {
		$image_id = media_sideload_image( $article_data['featured_image'], $post_id, $article_data['post_title'], 'id' );
		if ( ! is_wp_error( $image_id ) ) {
			set_post_thumbnail( $post_id, $image_id );
		}
	}

	echo "  ✅ Importado correctamente (ID: $post_id)\n\n";
	$imported++;
}

echo "\n=== Resumen ===\n";
echo "✅ Importados: $imported\n";
echo "⚠️  Omitidos: " . ( count( $blog_articles ) - $imported - $errors ) . "\n";
echo "❌ Errores: $errors\n";
echo "\n¡Importación completada!\n\n";
