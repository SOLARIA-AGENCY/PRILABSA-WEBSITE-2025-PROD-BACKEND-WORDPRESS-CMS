#!/bin/bash

# Script para copiar PDFs reales desde MODULO PRODUCTOS

SOURCE_PDF_DIR="/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/MODULO PRODUCTOS PRILABSA CATALOGO JULIO 2025/FICHAS TECNICAS PRODUCTOS PDF CODIGOS"
DEST_PDF_DIR="/Users/nazcamedia/Documents/GitHub/PRILABSA-WEBSITE-2025/public/assets/productos/pdfs"

echo "📄 Copiando PDFs reales desde MODULO PRODUCTOS..."

# Eliminar PDFs placeholder existentes
echo "🗑️  Eliminando PDFs placeholders..."
rm -f "$DEST_PDF_DIR"/*.pdf

# Función para normalizar nombres de archivo
normalize_pdf_filename() {
    local filename="$1"
    
    # Extraer código y resto del nombre
    local code=$(echo "$filename" | cut -d'_' -f1)
    local rest=$(echo "$filename" | cut -d'_' -f2- | sed 's/\.pdf$//')
    
    # Convertir a mayúsculas y reemplazar espacios/caracteres especiales
    rest=$(echo "$rest" | tr '[:lower:]' '[:upper:]' | sed 's/ /_/g' | sed 's/+/_/g')
    
    echo "${code}_${rest}.pdf"
}

# Copiar PDFs con normalización de nombres
echo "📄 Copiando y normalizando PDFs..."
for pdf in "$SOURCE_PDF_DIR"/*.pdf; do
    if [ -f "$pdf" ]; then
        filename=$(basename "$pdf")
        normalized=$(normalize_pdf_filename "$filename")
        
        # Casos especiales de mapeo (mismos que las imágenes)
        case "$filename" in
            "AL001_Larva_Z_Plus.pdf") normalized="AL015_LARVA_Z___PLUS_Microparticulados.pdf" ;;
            "AL002_Larva_AP_100.pdf") normalized="AL014_LARVA_AP_100_Microparticulados.pdf" ;;
            "AL003_Z_Pro.pdf") normalized="AL022_Z_PRO_Microparticulados.pdf" ;;
            "AL004_EZ_Artemia.pdf") normalized="AL007_EZ_ARTEMIA_Microencapsulados.pdf" ;;
            "AL005_EZ_Artemia_Ultra.pdf") normalized="AL008_EZ_ARTEMIA_ULTRA_Microencapsulados.pdf" ;;
            "AL006_EZ_Larva.pdf") normalized="AL009_EZ_LARVA_Microencapsulados.pdf" ;;
            "AL007_Brine_Shrimp_Flake.pdf") normalized="AL003_BRINE_SHRIMP_FLAKE.pdf" ;;
            "AL008_Shrimp_Meal_Starter_55_15.pdf") normalized="AL021_SHRIMP_MEAL_STARTER_55_15.pdf" ;;
            "AL009_Pre_Mix_PL_Raceway_40_9.pdf") normalized="AL019_PRE_MIX_PL_RACEWAY_40_9.pdf" ;;
            "AL011_Redi_Mate.pdf") normalized="AL020_REDI_MATE.pdf" ;;
            "AL012_Cistos_de_Artemia.pdf") normalized="AL005_CISTOS_DE_ARTEMIA.pdf" ;;
            "AL013_Krill_Congelado.pdf") normalized="AL013_KRILL_CONGELADO.pdf" ;;
            "AL014_Advance_Feed.pdf") normalized="AL001_ADVANCE_FEED.pdf" ;;
            "AL015_Gold_Feed.pdf") normalized="AL012_GOLD_FEED_Microparticulados.pdf" ;;
            "AL016_Flake_Negro_de_Artemia.pdf") normalized="AL011_FLAKE_NEGRO_DE_ARTEMIA.pdf" ;;
            "AL017_Espirulina.pdf") normalized="AL006_ESPIRULINA.pdf" ;;
            "AL019_ZM_Feed_para_Zoea_Mysis.pdf") normalized="AL023_ZM_Feed_para_Zoea___Mysis.pdf" ;;
            "AL020_Artemia_Adulta_Congelada.pdf") normalized="AL002_ARTEMIA_ADULTA_CONGELADA.pdf" ;;
            "AL021_Calamares.pdf") normalized="AL004_CALAMARES.pdf" ;;
            "AL022_Mejillones.pdf") normalized="AL016_MEJILLONES.pdf" ;;
            "AL023_Krill_Congelado.pdf") normalized="AL013_KRILL_CONGELADO.pdf" ;;
            "AD008_Protector_D3_Zinc_Activado.pdf") normalized="AD008_PROTECTOR_D3_+_ZINC_ACTIVADO.pdf" ;;
            "AD009_Protector_D3_Zinc_Activado.pdf") normalized="AD009_SAPONINA.pdf" ;;
            "AD010_Saponina.pdf") normalized="AD009_SAPONINA.pdf" ;;
            "AD011_Vevovitall.pdf") normalized="AD010_VEVOVITALL.pdf" ;;
            "AD012_Vitamina_C_Monofosfatada.pdf") normalized="AD011_VITAMINA_C.pdf" ;;
        esac
        
        # Para equipos, ajustar numeración
        if [[ "$filename" =~ ^EQ[0-9]{3} ]]; then
            case "$filename" in
                "EQ001_Camara_Neubauer.pdf") normalized="EQ006_CÁMARA_NEUBAUER.pdf" ;;
                "EQ002_Camara_Sedgewick.pdf") normalized="EQ007_CÁMARA_SEDGEWICK.pdf" ;;
                "EQ003_Microscopio.pdf") normalized="EQ036_MICROSCOPIO.pdf" ;;
                "EQ004_Balanza_Scout_Pro_400.pdf") normalized="EQ002_BALANZAS_OHAUS.pdf" ;;
                "EQ009_Chemetrics_Kit_de_Amonio.pdf") normalized="EQ009_CHEMETRICS_KIT_DE_AMONIO.pdf" ;;
                "EQ010_Bolso_Filtrantes_de_Polipropileno.pdf") normalized="EQ005_BOLSO_FILTRANTES_DE_POLIPROPILENO.pdf" ;;
                "EQ011_Cinta_Industrial_Prime.pdf") normalized="EQ018_CINTA_INDUSTRIAL_PRIME.pdf" ;;
                "EQ012_Malla_Marines_Roja.pdf") normalized="EQ027_MALLA_MARINES_ROJA.pdf" ;;
                "EQ013_Mallas_Nitex.pdf") normalized="EQ028_MALLAS_NITEX.pdf" ;;
                "EQ014_Mallas_para_Piscinas_Camaroneras.pdf") normalized="EQ029_MALLAS_PARA_PISCINAS_CAMARONERAS.pdf" ;;
                "EQ015_Manguera_de_Vinil_Transparente.pdf") normalized="EQ030_MANGUERA_DE_VINIL_TRANSPARENTE.pdf" ;;
                "EQ016_Manguera_Difusora.pdf") normalized="EQ031_MANGUERA_DIFUSORA.pdf" ;;
                "EQ017_Piedras_Difusoras.pdf") normalized="EQ041_PIEDRAS_DIFUSORAS.pdf" ;;
                "EQ018_Medidor_de_Calcio.pdf") normalized="EQ032_MEDIDOR_DE_CALCIO.pdf" ;;
                "EQ019_Medidor_de_Conductividad_EC_11.pdf") normalized="EQ033_MEDIDOR_DE_CONDUCTIVIDAD_EC_11.pdf" ;;
                "EQ020_Medidor_de_pH.pdf") normalized="EQ034_MEDIDOR_DE_PH.pdf" ;;
                "EQ021_Medidor_de_Potasio.pdf") normalized="EQ035_MEDIDOR_DE_POTASIO.pdf" ;;
                "EQ022_Salinometro_11.pdf") normalized="EQ042_SALINÓMETRO__11.pdf" ;;
                "EQ023_Salinometro_Vee_Gee_STX_3.pdf") normalized="EQ043_SALINÓMETRO_VEE_GEE_STX_3.pdf" ;;
                "EQ024_Oxigenometro_Disuelto_DO_120.pdf") normalized="EQ038_OXIGENÓMETRO___Disuelto_DO__120.pdf" ;;
                "EQ025_Oxigenometro_Oakton_260.pdf") normalized="EQ039_OXIGENÓMETRO___OAKTON_260.pdf" ;;
                "EQ026_Oxigenometro_OxyGuard_Polaris_C.pdf") normalized="EQ040_OXIGENÓMETRO_OxyGuard_Polaris_C.pdf" ;;
                "EQ027_Neon_OPTOD.pdf") normalized="EQ037_NEON_OPTOD.pdf" ;;
                "EQ028_Smart_Spectro.pdf") normalized="EQ044_SMART_SPECTRO.pdf" ;;
                "EQ029_Termometro.pdf") normalized="EQ045_TERMÓMETRO.pdf" ;;
                "EQ030_Tirillas_pH.pdf") normalized="EQ046_TIRILLAS_ph.pdf" ;;
                "EQ031_Tubos_API.pdf") normalized="EQ047_TUBOS_API.pdf" ;;
                "EQ032_Freshwater.pdf") normalized="EQ019_FRESHWATER.pdf" ;;
                "EQ033_Kits_API_Calcio.pdf") normalized="EQ020_KITS_API_CALCIO.pdf" ;;
                "EQ034_Kits_API_de_pH.pdf") normalized="EQ021_KITS_API_DE_PH.pdf" ;;
                "EQ035_Kits_API_Dureza_de_Carbono.pdf") normalized="EQ022_KITS_API_DUREZA_DE_CARBONO.pdf" ;;
                "EQ036_Kits_API_Fosfato.pdf") normalized="EQ023_KITS_API_FOSFATO.pdf" ;;
                "EQ037_Kits_API_Amonio.pdf") normalized="EQ024_KITS_API_AMONIO.pdf" ;;
                "EQ038_Kits_API_Nitrato.pdf") normalized="EQ025_KITS_API_NITRATO.pdf" ;;
                "EQ039_Kits_API_Nitrito.pdf") normalized="EQ026_KITS_API_NITRITO.pdf" ;;
                "EQ040_Chemetrics_Kit_de_Alcalinidad_Total.pdf") normalized="EQ008_CHEMETRICS_KIT_DE_ALCALINIDAD_TOTAL.pdf" ;;
                "EQ041_Chemetrics_Kit_de_Amonio.pdf") normalized="EQ009_CHEMETRICS_KIT_DE_AMONIO.pdf" ;;
                "EQ042_Chemetrics_Kit_de_Dioxido_de_Carbono.pdf") normalized="EQ010_CHEMETRICS_KIT_DE_DIÓXIDO_DE_CARBONO.pdf" ;;
                "EQ043_Chemetrics_Kit_de_Dureza.pdf") normalized="EQ011_CHEMETRICS_KIT_DE_DUREZA.pdf" ;;
                "EQ044_Chemetrics_Kit_de_Fosfato.pdf") normalized="EQ012_CHEMETRICS_KIT_DE_FOSFATO.pdf" ;;
                "EQ045_Chemetrics_Kit_de_Hierro.pdf") normalized="EQ013_CHEMETRICS_KIT_DE_HIERRO.pdf" ;;
                "EQ046_Chemetrics_Kit_de_Nitrato.pdf") normalized="EQ014_CHEMETRICS_KIT_DE_NITRATO.pdf" ;;
                "EQ047_Chemetrics_Kit_de_Nitrito.pdf") normalized="EQ015_CHEMETRICS_KIT_DE_NITRITO.pdf" ;;
                "EQ048_Chemetrics_Kit_de_Peroxido_de_Hidrogeno.pdf") normalized="EQ016_CHEMETRICS_KIT_DE_PERÓXIDO_DE_HIDRÓGENO.pdf" ;;
            esac
        fi
        
        # Para probióticos
        if [[ "$filename" =~ ^PB[0-9]{3} ]]; then
            case "$filename" in
                "PB001_Terminate.pdf") normalized="PB003_TERMINATE.pdf" ;;
                "PB003_Waste_Sludge_Reducer_WSR.pdf") normalized="PB004_WASTE___SLUDGE_REDUCER_WSR.pdf" ;;
                "PB004_Hatchery_Prime.pdf") normalized="PB001_HATCHERY_PRIME.pdf" ;;
            esac
        fi
        
        # Para químicos
        if [[ "$filename" =~ ^QU[0-9]{3} ]]; then
            case "$filename" in
                "QU001_Trilon_B_EDTA.pdf") normalized="QU018_TRILON_B___EDTA.pdf" ;;
                "QU002_EDTA_4Na.pdf") normalized="QU007_EDTA_4Na.pdf" ;;
                "QU003_Sulfato_de_Aluminio.pdf") normalized="QU016_SULFATO_DE_ALUMINIO_SO43_Al2.pdf" ;;
                "QU004_Peroxido_de_Hidrogeno.pdf") normalized="QU014_PERÓXIDO_DE_HIDRÓGENO.pdf" ;;
                "QU005_Thiosulfato_de_Sodio.pdf") normalized="QU017_THIOSULFATO_DE_SODIO.pdf" ;;
                "QU006_Acido_Humico.pdf") normalized="QU002_ÁCIDO_HÚMICO.pdf" ;;
                "QU007_Nitrato_de_Sodio.pdf") normalized="QU010_NITRATO_DE_SODIO.pdf" ;;
                "QU008_Acido_Nitrico.pdf") normalized="QU003_ÁCIDO_NÍTRICO.pdf" ;;
                "QU009_Acido_Formico.pdf") normalized="QU001_ÁCIDO_FÓRMICO.pdf" ;;
                "QU010_Orthotolidine_OTO.pdf") normalized="QU012_ORTHOTOLIDINE_OTO.pdf" ;;
                "QU011_Formaldehido_Formol.pdf") normalized="QU008_FORMALDEHÍDO_FORMOL.pdf" ;;
                "QU012_Metasilicato_de_Sodio.pdf") normalized="QU009_METASILICATO_DE_SODIO.pdf" ;;
                "QU014_Refrigerante_Ecologico_R507.pdf") normalized="QU015_REFRIGERANTE_ECOLÓGICO_R507.pdf" ;;
                "QU015_Cloro_Granulado.pdf") normalized="QU004_CLORO_GRANULADO.pdf" ;;
                "QU016_Cloruro_de_Magnesio.pdf") normalized="QU005_CLORURO_DE_MAGNESIO.pdf" ;;
                "QU017_Cloruro_de_Potasio.pdf") normalized="QU006_CLORURO_DE_POTASIO.pdf" ;;
                "QU018_Nitrato_Sodico_Potasico.pdf") normalized="QU011_NITRATO_SÓDICO_POTÁSICO.pdf" ;;
            esac
        fi
        
        cp "$pdf" "$DEST_PDF_DIR/$normalized"
        echo "✅ Copiado: $filename → $normalized"
    fi
done

# Crear PDFs placeholder para los productos que no tienen PDF
echo "📄 Creando PDFs faltantes..."
# Primero crear un PDF placeholder genérico
cat > "$DEST_PDF_DIR/placeholder-temp.pdf" << 'EOF'
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 180 >>
stream
BT
/F1 24 Tf
100 600 Td
(Ficha Tecnica del Producto) Tj
0 -40 Td
/F1 16 Tf
(Documento en proceso de actualizacion) Tj
0 -30 Td
/F1 12 Tf
(Por favor contacte a PRILABSA para mas detalles) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000259 00000 n 
0000000337 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
567
%%EOF
EOF

# Copiar placeholder para PDFs faltantes específicos
MISSING_PDFS="EQ001_AMMO_LOCK.pdf EQ003_BLOWERS_ALL_STAR.pdf EQ004_BLOWERS_GAST.pdf EQ017_CHEMETRICS_KIT_DE_SULFITO.pdf EQ048_WATERLINK_SPIN_TOUCH.pdf AL017_MPs_Microparticulados.pdf"
for pdf_name in $MISSING_PDFS; do
    if [ ! -f "$DEST_PDF_DIR/$pdf_name" ]; then
        cp "$DEST_PDF_DIR/placeholder-temp.pdf" "$DEST_PDF_DIR/$pdf_name"
        echo "✅ Creado placeholder: $pdf_name"
    fi
done

# Eliminar el placeholder temporal
rm -f "$DEST_PDF_DIR/placeholder-temp.pdf"

echo "✅ Proceso completado!"
echo "📊 Total de imágenes: $(ls -1 "$DEST_IMG_DIR"/*.png 2>/dev/null | wc -l)"
echo "📄 Total de PDFs: $(ls -1 "$DEST_PDF_DIR"/*.pdf 2>/dev/null | wc -l)"