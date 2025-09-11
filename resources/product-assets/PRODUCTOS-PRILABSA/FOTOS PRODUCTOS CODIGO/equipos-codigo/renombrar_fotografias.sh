#!/bin/bash

# Script para renombrado sistemático de fotografías PRILABSA - Categoría EQUIPOS
# Se ejecuta después de copiar_fotografias.sh

echo "🔄 SCRIPT DE RENOMBRADO SISTEMÁTICO - FOTOGRAFÍAS EQUIPOS PRILABSA"
echo "================================================================="
echo ""

# Directorio base
BASE_DIR="/Users/nazcamedia/Desktop/FOTOS PRODUCTOS"
CODIGO_DIR="$BASE_DIR/equipos-codigo"
LOG_FILE="$CODIGO_DIR/renombrado_log.txt"

# Inicializar log
echo "Inicio de renombrado: $(date)" > "$LOG_FILE"

# Función para renombrar archivos
renombrar_archivo() {
    local codigo="$1"
    local nombre_oficial="$2"
    local carpeta="$CODIGO_DIR/$codigo"_"$nombre_oficial"
    
    if [ -d "$carpeta" ]; then
        cd "$carpeta"
        
        # Buscar archivos de imagen
        for archivo in *.png *.jpg *.jpeg *.psd *.PNG *.JPG *.JPEG *.PSD; do
            if [ -f "$archivo" ]; then
                # Obtener extensión
                extension="${archivo##*.}"
                # Convertir a minúsculas
                extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
                
                # Renombrar al código del producto
                mv "$archivo" "$codigo.$extension"
                echo "✅ $codigo: $archivo → $codigo.$extension" | tee -a "$LOG_FILE"
                break
            fi
        done
        
        cd - > /dev/null
    else
        echo "❌ $codigo: Carpeta no encontrada" | tee -a "$LOG_FILE"
    fi
}

echo "📋 RENOMBRADO - OXIGENÓMETROS"
echo "============================="
renombrar_archivo "EQ001" "OXIGENOMETRO_OAKTON_260"
renombrar_archivo "EQ003" "NEON_OPTOD"
renombrar_archivo "EQ004" "OXIGENOMETRO_OxyGuard_Polaris_C"
renombrar_archivo "EQ005" "OXIGENOMETRO_Disuelto_DO_120"
renombrar_archivo "EQ006" "MEDIDOR_DE_PH"
renombrar_archivo "EQ007" "MEDIDOR_DE_POTASIO"
renombrar_archivo "EQ008" "MEDIDOR_DE_CONDUCTIVIDAD_EC-11"
renombrar_archivo "EQ009" "MEDIDOR_DE_CALCIO"

echo ""
echo "📋 RENOMBRADO - GENERAL"
echo "======================="
renombrar_archivo "EQ002" "WATERLINK_SPIN_TOUCH"
renombrar_archivo "EQ010" "SALINOMETRO_11"
renombrar_archivo "EQ011" "SALINOMETRO_VEE_GEE_STX-3"
renombrar_archivo "EQ012" "TERMOMETRO"
renombrar_archivo "EQ015" "AMMO_LOCK"

echo ""
echo "📋 RENOMBRADO - ACCESORIOS"
echo "=========================="
renombrar_archivo "EQ013" "MANGUERA_DE_VINIL_TRANSPARENTE"
renombrar_archivo "EQ038" "MANGUERA_DIFUSORA"

echo ""
echo "📋 RENOMBRADO - KITS DE ANÁLISIS"
echo "================================"
renombrar_archivo "EQ014" "FRESHWATER"
renombrar_archivo "EQ016" "CHEMETRICS_KIT_DE_PEROXIDO_DE_HIDROGENO"
renombrar_archivo "EQ017" "CHEMETRICS_KIT_DE_NITRITO"
renombrar_archivo "EQ018" "CHEMETRICS_KIT_DE_NITRATO"
renombrar_archivo "EQ019" "CHEMETRICS_KIT_DE_HIERRO"
renombrar_archivo "EQ020" "CHEMETRICS_KIT_DE_AMONIO"
renombrar_archivo "EQ021" "CHEMETRICS_KIT_DE_FOSFATO"
renombrar_archivo "EQ022" "CHEMETRICS_KIT_DE_SULFITO"
renombrar_archivo "EQ023" "CHEMETRICS_KIT_DE_DUREZA"
renombrar_archivo "EQ024" "CHEMETRICS_KIT_DE_ALCALINIDAD_TOTAL"
renombrar_archivo "EQ025" "CHEMETRICS_KIT_DE_DIOXIDO_DE_CARBONO"
renombrar_archivo "EQ026" "KITS_API_NITRATO"
renombrar_archivo "EQ027" "KITS_API_NITRITO"
renombrar_archivo "EQ028" "KITS_API_FOSFATO"
renombrar_archivo "EQ029" "KITS_API_AMONIO"
renombrar_archivo "EQ030" "KITS_API_CALCIO"

echo ""
echo "📋 RENOMBRADO - BALANZAS"
echo "========================"
renombrar_archivo "EQ031" "BALANZA_SCOUT_PRO_SP202"
renombrar_archivo "EQ032" "BALANZA_SCOUT_PRO_SP402"
renombrar_archivo "EQ033" "BALANZA_SCOUT_PRO_SP1202"

echo ""
echo "📋 RENOMBRADO - ÓPTICOS"
echo "======================="
renombrar_archivo "EQ034" "MICROSCOPIO_BINOCULAR_SWIFT_SW350B"
renombrar_archivo "EQ035" "MICROSCOPIO_MONOCULAR_SWIFT_SW100"

echo ""
echo "📋 RENOMBRADO - MEDIDORES"
echo "========================="
renombrar_archivo "EQ036" "MEDIDOR_DE_SALINIDAD"
renombrar_archivo "EQ037" "MEDIDOR_DE_TEMPERATURA"

echo ""
echo "📋 RENOMBRADO - AIREACIÓN"
echo "========================="
renombrar_archivo "EQ039" "AIREADOR_VENTURI"
renombrar_archivo "EQ040" "DIFUSOR_DE_AIRE"

echo ""
echo "📋 RENOMBRADO - FILTROS"
echo "======================="
renombrar_archivo "EQ041" "FILTRO_DE_CARTUCHO"

echo ""
echo "📋 RENOMBRADO - CINTAS"
echo "======================"
renombrar_archivo "EQ042" "CINTA_DE_PH"

echo ""
echo "📋 RENOMBRADO - MALLAS"
echo "======================"
renombrar_archivo "EQ043" "MALLA_PARA_CAMARONES"

echo ""
echo "📊 RESUMEN DE RENOMBRADO COMPLETADO"
echo "==================================="
echo "Fin de renombrado: $(date)" >> "$LOG_FILE"

# Contar archivos renombrados
TOTAL_RENOMBRADOS=$(find "$CODIGO_DIR" -name "EQ*.png" -o -name "EQ*.jpg" -o -name "EQ*.psd" | wc -l)
echo "Total de archivos renombrados: $TOTAL_RENOMBRADOS"
echo "Log guardado en: $LOG_FILE"

echo ""
echo "✅ SCRIPT DE RENOMBRADO COMPLETADO"
echo "Revisa el log para detalles: $LOG_FILE"