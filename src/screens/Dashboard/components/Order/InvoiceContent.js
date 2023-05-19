import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
Font.register({
  family: "Ubuntu",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "bold",
    },
    {
      src: "https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: "20px",
    fontFamily: "Ubuntu",
  },
  title: {
    fontSize: 20,
    marginBottom: "20px",
    textAlign: "center",
  },
  content: {
    fontSize: 14,
    marginBottom: "10px",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  total: {
    width: "100%",
    marginTop: 5,
    fontSize: 10,
    float: "tight",
  },
});

const InvoiceContent = ({ product, data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Chi tiết đơn hàng</Text>
        <View>
          <Text style={styles.content}>
            Họ tên người nhận: {data.firstName}&nbsp;
            {data.lastName}
          </Text>
          <Text style={styles.content}>Số điện thoại: {data.phone}</Text>
          <Text style={styles.content}>Địa chỉ: {data.address}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Sản phẩm</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Kích cỡ</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Màu sắc</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Số lượng</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Giá tiền</Text>
            </View>
          </View>
          {product.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {" "}
                  {item.productId.productName}{" "}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.size} </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.color}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{item.quantity}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {" "}
                  {item.price.toLocaleString("vi-VN")}đ
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Tổng giá trị hóa đơn: </Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>
                {product?.totalPrice &&
                  product?.totalPrice.toLocaleString("vi-VN")}
                đ
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceContent;
