#!/bin/bash

# Script para copia sistemática de fotografías PRILABSA - Categoría EQUIPOS
# Basado en MAPEO_FOTOGRAFIAS_EQUIPOS.md

echo "🚀 SCRIPT DE COPIA SISTEMÁTICA - FOTOGRAFÍAS EQUIPOS PRILABSA"
echo "============================================================="
echo ""

# Directorio base
BASE_DIR="/Users/nazcamedia/Desktop/FOTOS PRODUCTOS"
EQUIPOS_DIR="$BASE_DIR/EQUIPOS"
CODIGO_DIR="$BASE_DIR/equipos-codigo"
LOG_FILE="$CODIGO_DIR/copia_log.txt"

# Inicializar log
echo "Inicio de copia: $(date)" > "$LOG_FILE"

# Función para copiar y registrar
copiar_archivo() {
    local codigo="$1"
    local nombre_oficial="$2"
    local archivo_foto="$3"
    local carpeta_destino="$CODIGO_DIR/$codigo"_"$nombre_oficial"
    
    if [ -f "$EQUIPOS_DIR/$archivo_foto" ]; then
        cp "$EQUIPOS_DIR/$archivo_foto" "$carpeta_destino/"
        echo "✅ $codigo: $archivo_foto copiado" | tee -a "$LOG_FILE"
        return 0
    else
        echo "❌ $codigo: $archivo_foto NO ENCONTRADO" | tee -a "$LOG_FILE"
        return 1
    fi
}

echo "📋 PRIMERA PASADA - OXIGENÓMETROS"
echo "================================="
copiar_archivo "EQ001" "OXIGENOMETRO_OAKTON_260" "Oxigenómetro Oakton.png"
copiar_archivo "EQ003" "NEON_OPTOD" "Oxigenómetro Aqualabo neon.png"
copiar_archivo "EQ006" "MEDIDOR_DE_PH" "medidor de ph.psd"
copiar_archivo "EQ007" "MEDIDOR_DE_POTASIO" "medidor de potasio.png"
copiar_archivo "EQ008" "MEDIDOR_DE_CONDUCTIVIDAD_EC-11" "medidor de conductividad.png"
copiar_archivo "EQ009" "MEDIDOR_DE_CALCIO" "medidor de calcio.png"

echo ""
echo "📋 SEGUNDA PASADA - GENERAL"
echo "==========================="
copiar_archivo "EQ002" "WATERLINK_SPIN_TOUCH" "Smart Spectro.png"
copiar_archivo "EQ011" "SALINOMETRO_VEE_GEE_STX-3" "Salinómetro Vegge.png"
copiar_archivo "EQ012" "TERMOMETRO" "Termómetro.png"
copiar_archivo "EQ015" "AMMO_LOCK" "AMMO LOCK.png"

echo ""
echo "📋 TERCERA PASADA - ACCESORIOS"
echo "=============================="
copiar_archivo "EQ013" "MANGUERA_DE_VINIL_TRANSPARENTE" "Manguera vinil.png"
copiar_archivo "EQ038" "MANGUERA_DIFUSORA" "MANGERA DIFUSORA.png"

echo ""
echo "📋 CUARTA PASADA - KITS DE ANÁLISIS"
echo "===================================="
copiar_archivo "EQ014" "FRESHWATER" "Freshwater.png"
copiar_archivo "EQ016" "CHEMETRICS_KIT_DE_PEROXIDO_DE_HIDROGENO" "CHEMETRICS/peroxido de hidrogeno.png"
copiar_archivo "EQ017" "CHEMETRICS_KIT_DE_NITRITO" "CHEMETRICS/nitrito.png"
copiar_archivo "EQ018" "CHEMETRICS_KIT_DE_NITRATO" "CHEMETRICS/nitrato.png"
copiar_archivo "EQ019" "CHEMETRICS_KIT_DE_HIERRO" "CHEMETRICS/hierro.png"
copiar_archivo "EQ020" "CHEMETRICS_KIT_DE_AMONIO" "CHEMETRICS/AMONIA.png"
copiar_archivo "EQ021" "CHEMETRICS_KIT_DE_FOSFATO" "CHEMETRICS/fosfato 1.png"
copiar_archivo "EQ022" "CHEMETRICS_KIT_DE_SULFITO" "CHEMETRICS/sulfito.png"
copiar_archivo "EQ023" "CHEMETRICS_KIT_DE_DUREZA" "CHEMETRICS/total hardness.png"
copiar_archivo "EQ024" "CHEMETRICS_KIT_DE_ALCALINIDAD_TOTAL" "CHEMETRICS/total alcalinidad baja.png"
copiar_archivo "EQ025" "CHEMETRICS_KIT_DE_DIOXIDO_DE_CARBONO" "CHEMETRICS/dioxido de carbono.png"
copiar_archivo "EQ026" "KITS_API_NITRATO" "API KIT DE NITRATO.png"
copiar_archivo "EQ027" "KITS_API_NITRITO" "API KIT DE NITRITO.png"
copiar_archivo "EQ028" "KITS_API_FOSFATO" "API KIT DE FOSFATO.png"
copiar_archivo "EQ029" "KITS_API_AMONIO" "API KIT DE AMONIO.png"
copiar_archivo "EQ030" "KITS_API_CALCIO" "API KIT DE CALCIO.png"

echo ""
echo "📋 QUINTA PASADA - BALANZAS"
echo "============================"
copiar_archivo "EQ031" "BALANZA_SCOUT_PRO_SP202" "BALANZA SCOUT PRO2000.png"
copiar_archivo "EQ032" "BALANZA_SCOUT_PRO_SP402" "BALANZA SCOUT PRO400.png"

echo ""
echo "📋 SEXTA PASADA - ÓPTICOS"
echo "=========================="
copiar_archivo "EQ034" "MICROSCOPIO_BINOCULAR_SWIFT_SW350B" "MICROSCOPIO SERIE CLINICAL 1320.png"
copiar_archivo "EQ035" "MICROSCOPIO_MONOCULAR_SWIFT_SW100" "CAMARA NEUBAUER.png"

echo ""
echo "📋 SÉPTIMA PASADA - MEDIDORES"
echo "============================="
copiar_archivo "EQ037" "MEDIDOR_DE_TEMPERATURA" "Termómetro.png"

echo ""
echo "📋 OCTAVA PASADA - AIREACIÓN"
echo "============================"
copiar_archivo "EQ039" "AIREADOR_VENTURI" "Piedras difusoras.png"
copiar_archivo "EQ040" "DIFUSOR_DE_AIRE" "Piedras difusoras.png"

echo ""
echo "📋 NOVENA PASADA - FILTROS"
echo "==========================="
copiar_archivo "EQ041" "FILTRO_DE_CARTUCHO" "BOLSOS FILTRANTES DE POLIPROPILENO.png"

echo ""
echo "📋 DÉCIMA PASADA - CINTAS"
echo "=========================="
copiar_archivo "EQ042" "CINTA_DE_PH" "Tirillas PH.png"

echo ""
echo "📋 UNDÉCIMA PASADA - MALLAS"
echo "============================"
copiar_archivo "EQ043" "MALLA_PARA_CAMARONES" "MALLA NITEX.png"

echo ""
echo "📊 RESUMEN DE COPIA COMPLETADO"
echo "=============================="
echo "Fin de copia: $(date)" >> "$LOG_FILE"

# Contar archivos copiados
TOTAL_COPIADOS=$(find "$CODIGO_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.psd" | wc -l)
echo "Total de archivos copiados: $TOTAL_COPIADOS"
echo "Log guardado en: $LOG_FILE"

echo ""
echo "✅ SCRIPT DE COPIA COMPLETADO"
echo "Revisa el log para detalles: $LOG_FILE"