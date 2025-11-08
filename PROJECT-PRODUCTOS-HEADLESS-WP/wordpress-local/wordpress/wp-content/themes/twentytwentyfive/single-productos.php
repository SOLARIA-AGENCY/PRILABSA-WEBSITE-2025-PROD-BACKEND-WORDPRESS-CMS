<?php
/**
 * Template Name: Single Product
 * Template Post Type: productos
 *
 * Plantilla para visualizar productos en WordPress backend
 * URL: http://localhost:8000/productos/{slug}/
 */

get_header();
?>

<style>
    .product-preview {
        max-width: 1200px;
        margin: 40px auto;
        padding: 0 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .product-header {
        background: linear-gradient(135deg, #3759C1 0%, #1e3a8a 100%);
        color: white;
        padding: 40px;
        border-radius: 12px;
        margin-bottom: 30px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .product-code {
        display: inline-block;
        background: rgba(255,255,255,0.2);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 15px;
    }
    .product-title {
        font-size: 32px;
        font-weight: 700;
        margin: 0 0 10px 0;
    }
    .product-category {
        font-size: 16px;
        opacity: 0.9;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .product-content {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        overflow: hidden;
    }
    .language-tabs {
        display: flex;
        border-bottom: 2px solid #e5e7eb;
        background: #f9fafb;
    }
    .language-tab {
        flex: 1;
        padding: 16px;
        text-align: center;
        cursor: pointer;
        border: none;
        background: none;
        font-size: 16px;
        font-weight: 600;
        color: #6b7280;
        transition: all 0.3s;
    }
    .language-tab.active {
        color: #3759C1;
        background: white;
        border-bottom: 3px solid #3759C1;
    }
    .language-tab:hover {
        background: #f3f4f6;
    }
    .tab-content {
        display: none;
        padding: 30px;
    }
    .tab-content.active {
        display: block;
    }
    .field-group {
        margin-bottom: 30px;
    }
    .field-label {
        font-size: 14px;
        font-weight: 600;
        color: #374151;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
        display: block;
    }
    .field-value {
        font-size: 16px;
        line-height: 1.6;
        color: #1f2937;
    }
    .benefits-list {
        list-style: none;
        padding: 0;
    }
    .benefits-list li {
        padding: 12px 0 12px 30px;
        position: relative;
        border-bottom: 1px solid #e5e7eb;
    }
    .benefits-list li:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #10b981;
        font-weight: bold;
        font-size: 18px;
    }
    .product-image {
        text-align: center;
        margin-bottom: 30px;
    }
    .product-image img {
        max-width: 300px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .specs-table {
        width: 100%;
        border-collapse: collapse;
    }
    .specs-table tr {
        border-bottom: 1px solid #e5e7eb;
    }
    .specs-table td {
        padding: 12px 8px;
    }
    .specs-table td:first-child {
        font-weight: 600;
        color: #374151;
        width: 40%;
    }
    .empty-field {
        color: #9ca3af;
        font-style: italic;
    }
    .pdf-download-button {
        display: inline-block;
        background: #d32f2f;
        color: white;
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s;
        box-shadow: 0 2px 4px rgba(211, 47, 47, 0.3);
    }
    .pdf-download-button:hover {
        background: #b71c1c;
        box-shadow: 0 4px 8px rgba(211, 47, 47, 0.4);
        transform: translateY(-2px);
        color: white;
    }
</style>

<div class="product-preview">
    <?php while (have_posts()) : the_post(); ?>

        <?php
        // Obtener campos ACF
        $codigo = get_field('codigo');
        $categoria = get_field('categoria');

        // Nombres multiidioma
        $nombre_es = get_field('nombre_producto_es') ?: get_the_title();
        $nombre_en = get_field('nombre_producto_en') ?: get_the_title();
        $nombre_pt = get_field('nombre_producto_pt') ?: get_the_title();

        // PDF Ficha Técnica
        $ficha_tecnica = get_field('ficha_tecnica_pdf');

        // Descripciones
        $desc_es = get_field('descripcion_es') ?: get_field('descripcion');
        $desc_en = get_field('descripcion_en') ?: get_field('descripcion');
        $desc_pt = get_field('descripcion_pt') ?: get_field('descripcion');

        // Beneficios (3 campos separados)
        $benef_1_es = get_field('beneficio_1_es');
        $benef_2_es = get_field('beneficio_2_es');
        $benef_3_es = get_field('beneficio_3_es');
        $benef_1_en = get_field('beneficio_1_en');
        $benef_2_en = get_field('beneficio_2_en');
        $benef_3_en = get_field('beneficio_3_en');
        $benef_1_pt = get_field('beneficio_1_pt');
        $benef_2_pt = get_field('beneficio_2_pt');
        $benef_3_pt = get_field('beneficio_3_pt');

        // Presentaciones
        $pres_es = get_field('presentacion_es');
        $pres_en = get_field('presentacion_en');
        $pres_pt = get_field('presentacion_pt');

        // Especificaciones
        $especificaciones = get_field('especificaciones');

        // Imagen del producto (prioridad: campo ACF imagen_producto, fallback: featured image)
        $imagen_producto = get_field('imagen_producto');
        if ($imagen_producto && is_array($imagen_producto)) {
            $image_url = $imagen_producto['url'];
        } else {
            $image_url = get_the_post_thumbnail_url(get_the_ID(), 'medium');
        }
        ?>

        <!-- Header del Producto -->
        <div class="product-header">
            <?php if ($codigo): ?>
                <span class="product-code">Código: <?php echo esc_html($codigo); ?></span>
            <?php endif; ?>
            <h1 class="product-title"><?php echo esc_html($nombre_es); ?></h1>
            <?php if ($categoria): ?>
                <p class="product-category">
                    <?php
                    $categorias_label = [
                        'aditivos' => 'Aditivos',
                        'alimentos' => 'Alimentos',
                        'equipos' => 'Equipos',
                        'probioticos' => 'Probióticos',
                        'quimicos' => 'Químicos'
                    ];
                    echo esc_html($categorias_label[$categoria] ?? $categoria);
                    ?>
                </p>
            <?php endif; ?>
        </div>

        <!-- Imagen del Producto -->
        <?php if ($image_url): ?>
            <div class="product-image">
                <img src="<?php echo esc_url($image_url); ?>" alt="<?php echo esc_attr($nombre_es); ?>">
            </div>
        <?php endif; ?>

        <!-- Ficha Técnica PDF -->
        <?php if ($ficha_tecnica && is_array($ficha_tecnica) && isset($ficha_tecnica['url'])): ?>
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="<?php echo esc_url($ficha_tecnica['url']); ?>"
                   target="_blank"
                   class="pdf-download-button"
                   download>
                    📄 Descargar Ficha Técnica (PDF)
                </a>
            </div>
        <?php endif; ?>

        <!-- Contenido Multiidioma -->
        <div class="product-content">
            <div class="language-tabs">
                <button class="language-tab active" onclick="switchTab('es')">🇪🇸 Español</button>
                <button class="language-tab" onclick="switchTab('en')">🇬🇧 English</button>
                <button class="language-tab" onclick="switchTab('pt')">🇵🇹 Português</button>
            </div>

            <!-- TAB ESPAÑOL -->
            <div id="tab-es" class="tab-content active">
                <div class="field-group">
                    <span class="field-label">Nombre del Producto</span>
                    <div class="field-value"><?php echo esc_html($nombre_es); ?></div>
                </div>

                <div class="field-group">
                    <span class="field-label">Descripción</span>
                    <div class="field-value"><?php echo $desc_es ? wp_kses_post($desc_es) : '<span class="empty-field">Sin descripción</span>'; ?></div>
                </div>

                <?php if ($benef_1_es || $benef_2_es || $benef_3_es): ?>
                <div class="field-group">
                    <span class="field-label">Beneficios</span>
                    <ul class="benefits-list">
                        <?php if ($benef_1_es): ?><li><?php echo esc_html($benef_1_es); ?></li><?php endif; ?>
                        <?php if ($benef_2_es): ?><li><?php echo esc_html($benef_2_es); ?></li><?php endif; ?>
                        <?php if ($benef_3_es): ?><li><?php echo esc_html($benef_3_es); ?></li><?php endif; ?>
                    </ul>
                </div>
                <?php endif; ?>

                <?php if ($pres_es): ?>
                <div class="field-group">
                    <span class="field-label">Presentación</span>
                    <div class="field-value"><?php echo esc_html($pres_es); ?></div>
                </div>
                <?php endif; ?>
            </div>

            <!-- TAB ENGLISH -->
            <div id="tab-en" class="tab-content">
                <div class="field-group">
                    <span class="field-label">Product Name</span>
                    <div class="field-value"><?php echo esc_html($nombre_en); ?></div>
                </div>

                <div class="field-group">
                    <span class="field-label">Description</span>
                    <div class="field-value"><?php echo $desc_en ? wp_kses_post($desc_en) : '<span class="empty-field">No description</span>'; ?></div>
                </div>

                <?php if ($benef_1_en || $benef_2_en || $benef_3_en): ?>
                <div class="field-group">
                    <span class="field-label">Benefits</span>
                    <ul class="benefits-list">
                        <?php if ($benef_1_en): ?><li><?php echo esc_html($benef_1_en); ?></li><?php endif; ?>
                        <?php if ($benef_2_en): ?><li><?php echo esc_html($benef_2_en); ?></li><?php endif; ?>
                        <?php if ($benef_3_en): ?><li><?php echo esc_html($benef_3_en); ?></li><?php endif; ?>
                    </ul>
                </div>
                <?php endif; ?>

                <?php if ($pres_en): ?>
                <div class="field-group">
                    <span class="field-label">Presentation</span>
                    <div class="field-value"><?php echo esc_html($pres_en); ?></div>
                </div>
                <?php endif; ?>
            </div>

            <!-- TAB PORTUGUÊS -->
            <div id="tab-pt" class="tab-content">
                <div class="field-group">
                    <span class="field-label">Nome do Produto</span>
                    <div class="field-value"><?php echo esc_html($nombre_pt); ?></div>
                </div>

                <div class="field-group">
                    <span class="field-label">Descrição</span>
                    <div class="field-value"><?php echo $desc_pt ? wp_kses_post($desc_pt) : '<span class="empty-field">Sem descrição</span>'; ?></div>
                </div>

                <?php if ($benef_1_pt || $benef_2_pt || $benef_3_pt): ?>
                <div class="field-group">
                    <span class="field-label">Benefícios</span>
                    <ul class="benefits-list">
                        <?php if ($benef_1_pt): ?><li><?php echo esc_html($benef_1_pt); ?></li><?php endif; ?>
                        <?php if ($benef_2_pt): ?><li><?php echo esc_html($benef_2_pt); ?></li><?php endif; ?>
                        <?php if ($benef_3_pt): ?><li><?php echo esc_html($benef_3_pt); ?></li><?php endif; ?>
                    </ul>
                </div>
                <?php endif; ?>

                <?php if ($pres_pt): ?>
                <div class="field-group">
                    <span class="field-label">Apresentação</span>
                    <div class="field-value"><?php echo esc_html($pres_pt); ?></div>
                </div>
                <?php endif; ?>
            </div>

            <!-- Especificaciones Técnicas (comunes a todos los idiomas) -->
            <?php if ($especificaciones && is_array($especificaciones)): ?>
            <div style="padding: 30px; border-top: 2px solid #e5e7eb;">
                <span class="field-label">Especificaciones Técnicas</span>
                <table class="specs-table">
                    <?php foreach ($especificaciones as $spec): ?>
                        <tr>
                            <td><?php echo esc_html($spec['clave']); ?></td>
                            <td><?php echo esc_html($spec['valor']); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </table>
            </div>
            <?php endif; ?>
        </div>

    <?php endwhile; ?>
</div>

<script>
function switchTab(lang) {
    // Ocultar todos los tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.language-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Mostrar tab seleccionado
    document.getElementById('tab-' + lang).classList.add('active');
    event.target.classList.add('active');
}
</script>

<?php get_footer(); ?>
