import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import { OptimizedProduct } from '../data/products/types';

interface ItemCotizacion {
  producto: OptimizedProduct;
  cantidad: number;
}

interface CotizacionPDFProps {
  items: ItemCotizacion[];
  logoUrl: string;
  buyerInfo: {
    nombre: string;
    email: string;
    empresa: string;
    comentarios: string;
  };
  selectedAgency: string;
}

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 30,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: '2px solid #f6921d',
    paddingBottom: 10,
  },
  buyerInfo: {
    marginBottom: 20,
    padding: 10,
    border: '1px solid #eee',
    borderRadius: 5,
  },
  buyerInfoText: {
    fontSize: 10,
    marginBottom: 3,
  },
  buyerInfoLabel: {
    fontWeight: 'bold',
  },
  logo: {
    width: 150,
  },
  headerText: {
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#3759C1',
  },
  table: {
    width: '100%',
    border: '1px solid #eee',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #eee',
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  colHeader: {
    padding: 8,
    fontSize: 12,
  },
  col: {
    padding: 8,
  },
  productCol: { width: '60%' },
  quantityCol: { width: '20%', textAlign: 'center' },
  productName: { fontWeight: 'bold' },
  productCategory: { fontSize: 9, color: '#666' },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#888',
    borderTop: '1px solid #ccc',
    paddingTop: 5,
  },
});

const CotizacionPDF: React.FC<CotizacionPDFProps> = ({ items, logoUrl, buyerInfo, selectedAgency }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image style={styles.logo} src={logoUrl} />
        <View style={styles.headerText}>
          <Text>Solicitud de Cotización</Text>
          <Text>{new Date().toLocaleDateString('es-ES')}</Text>
        </View>
      </View>
      
      <View style={styles.buyerInfo}>
        <Text style={styles.title}>Datos del Solicitante</Text>
        <Text style={styles.buyerInfoText}><Text style={styles.buyerInfoLabel}>Nombre:</Text> {buyerInfo.nombre}</Text>
        <Text style={styles.buyerInfoText}><Text style={styles.buyerInfoLabel}>Empresa:</Text> {buyerInfo.empresa}</Text>
        <Text style={styles.buyerInfoText}><Text style={styles.buyerInfoLabel}>Email:</Text> {buyerInfo.email}</Text>
        <Text style={styles.buyerInfoText}><Text style={styles.buyerInfoLabel}>Agencia de Destino:</Text> {selectedAgency}</Text>
        {buyerInfo.comentarios && (
          <Text style={styles.buyerInfoText}><Text style={styles.buyerInfoLabel}>Comentarios:</Text> {buyerInfo.comentarios}</Text>
        )}
      </View>

      <Text style={styles.title}>Listado de Productos</Text>

      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.colHeader, styles.productCol]}>Producto</Text>
          <Text style={[styles.colHeader, styles.quantityCol]}>Cantidad</Text>
        </View>
        {items.map(({ producto, cantidad }) => (
          <View key={producto.id} style={styles.tableRow}>
            <View style={[styles.col, styles.productCol]}>
               <Text style={styles.productName}>{producto.name}</Text>
               <Text style={styles.productCategory}>{producto.category.charAt(0).toUpperCase() + producto.category.slice(1)}</Text>
            </View>
            <Text style={[styles.col, styles.quantityCol]}>{cantidad}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>Prilabsa S.A. - www.prilabsa.com - info@prilabsa.com</Text>
        <Text>Este documento es una solicitud de cotización y no representa un compromiso de compra.</Text>
      </View>
    </Page>
  </Document>
);

export default CotizacionPDF;
