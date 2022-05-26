const purchaseOrdersModel = require("../models/purchaseOrdersModels");
const inputsModel = require("../models/inputsModels");

const PDFDocumentTable = require("pdfkit-table");
const fs = require("fs");
const formatNumberToCurrency = require("../util/utils.js");

module.exports = {
  getOrdersBetweenDates: async function (req, res, next) {
    try {
      const { initDate, endDate } = req.body.dates;

      const findOrdersBetweenDates = await purchaseOrdersModel.find({
        purchaseDate: {
          $gte: new Date(initDate),
          $lte: new Date(endDate),
        },
      });
      console.log(findOrdersBetweenDates, "Fin de ordenes encontradas");

      const iDate = new Date(initDate).toLocaleDateString();
      const eDate = new Date(endDate).toLocaleDateString();

      let arr = [];
      for (let i = 0; i < findOrdersBetweenDates.length; i++) {
        let productsArray = findOrdersBetweenDates[i].orderProducts;
        let sum = 0;

        for (let j = 0; j < productsArray.length; j++) {
          sum += parseFloat(productsArray[j].productPrice.substring(2));
        }

        data = {
          code: findOrdersBetweenDates[i].code,
          customer: findOrdersBetweenDates[i].customer,
          purchaseDate:
            findOrdersBetweenDates[i].purchaseDate.toLocaleDateString(),
          paymentState: findOrdersBetweenDates[i].paymentState,
          payMethod: findOrdersBetweenDates[i].payMethod,
          saleMode: findOrdersBetweenDates[i].saleMode,
          shippingEnterprise:
            findOrdersBetweenDates[i].shippingEnterprise === "-"
              ? "Retira"
              : findOrdersBetweenDates[i].shippingEnterprise,
          finalImport: formatNumberToCurrency(sum),
        };
        arr.push(data);
      }

      const doc = new PDFDocumentTable({
        margin: 30,
        size: "A4",
        layout: "landscape",
      });

      doc.pipe(fs.createWriteStream("Exported/ListadoOrdenes.pdf"));

      res.setHeader("Content-type", "application/pdf");
      doc.pipe(res);

      const table = {
        title: "Resumen de órdenes de compra",
        subtitle: `Fechas: ${iDate} a ${eDate}`,
        headers: [
          {
            label: "#",
            property: "code",
            valign: "center",
            align: "center",
            width: 40,
          },
          {
            label: "Cliente",
            property: "customer",
            valign: "center",
            width: 100,
          },
          {
            label: "Fecha de compra",
            property: "purchaseDate",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Fecha de pago",
            property: "paymentState",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Entrega",
            property: "shippingEnterprise",
            valign: "center",
            align: "center",
            width: 100,
          },

          {
            label: "Modalidad de venta",
            property: "saleMode",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Forma de pago",
            property: "payMethod",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Importe total",
            property: "finalImport",
            valign: "center",
            align: "center",
            width: 100,
          },
        ],
        datas: arr,
      };
      const options = {};
      const callback = () => {};
      doc.table(table, options, callback);

      doc.end();
    } catch (e) {
      next(e);
    }
  },
  getOrderByCode: async function (req, res, next) {
    try {
      const { code } = req.params.code;
      const foundOrder = await purchaseOrdersModel.find({
        code: req.params.code,
      });
      console.log(foundOrder);
      let arr = [];
      let productsArray = [];
      let sum = 0;

      for (let i = 0; i < foundOrder[0].orderProducts.length; i++) {
        sum += parseInt(
          foundOrder[0].orderProducts[i].productPrice.substring(2)
        );
        productsArray.push({
          productName: foundOrder[0].orderProducts[i].productName,
          productPrice: foundOrder[0].orderProducts[i].productPrice,
          productDetails: foundOrder[0].orderProducts[i].productDetails,
          productQuantity: foundOrder[0].orderProducts[i].productQuantity,
        });
      }

      productsArray.push({
        options: { fontFamily: "Helvetica-Bold" },
        productPrice: `bold: Total: ${formatNumberToCurrency(sum)}`,
      });

      for (let i = 0; i < foundOrder.length; i++) {
        data = {
          code: foundOrder[i].code,
          customer: foundOrder[i].customer,
          purchaseDate: foundOrder[i].purchaseDate.toLocaleDateString(),
          paymentDate: foundOrder[i].paymentDate.toLocaleDateString(),
          paymentState: foundOrder[i].paymentState,
          payMethod: foundOrder[i].payMethod,
          saleMode: foundOrder[i].saleMode,
          shippingMode: foundOrder[i].shippingMode,
          shippingState: foundOrder[i].shippingState,
          shippingAddress: foundOrder[i].shippingAddress,
          shippingEnterprise: foundOrder[i].shippingEnterprise,
        };

        arr.push(data);
      }

      const doc = new PDFDocumentTable({
        margin: 60,
        size: "A4",
      });

      doc
        .image("Exported/logo.png", 50, 27, {
          fit: [50, 50],
          align: "center",
          valign: "center",
        })
        .rect(50, 25, 50, 50)
        .stroke()
        .fontSize(10)
        .font("Times-Roman")
        .text("Sistema de gestión", 35, 83);

      doc.pipe(fs.createWriteStream("Exported/ListadoOrdenes.pdf"));

      res.setHeader("Content-type", "application/pdf");
      doc.pipe(res);

      const table = {
        title: "Orden de compra #" + foundOrder[0].code,
        subtitle:
          "Fecha de emisión: " +
          new Date().toLocaleDateString() /* "Cliente: " + foundOrder[0].customer.substring(4) */,

        headers: [
          {
            label: "Código",
            property: "code",
            valign: "center",
            align: "center",
            width: 50,
          },
          {
            label: "Cliente",
            property: "customer",
            valign: "center",
            width: 60,
          },
          {
            label: "Fecha de compra",
            property: "purchaseDate",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Fecha de pago",
            property: "paymentDate",
            valign: "center",
            align: "center",
            width: 75,
          },

          {
            label: "Modalidad de venta",
            property: "saleMode",
            valign: "center",
            align: "center",
            width: 90,
          },
          {
            label: "Forma de pago",
            property: "payMethod",
            valign: "center",
            align: "center",
            width: 90,
          },
        ],
        datas: arr,
      };

      const productsTable = {
        title: "Productos adquiridos",
        headers: [
          {
            label: "Producto",
            property: "productName",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Descripción",
            property: "productDetails",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Cantidad",
            property: "productQuantity",
            valign: "center",
            align: "center",
            width: 40,
          },
          {
            label: "Precio U.",
            property: "productPrice",
            valign: "center",
            align: "right",
            width: 70,
          },
        ],
        datas: productsArray,
      };

      const shippingTable = {
        title: "Datos de entrega",
        headers: [
          {
            label: "Modalidad",
            property: "shippingMode",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Direccion",
            property: "shippingAddress",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Empresa",
            property: "shippingEnterprise",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Estado",
            property: "shippingState",
            valign: "center",
            align: "center",
            width: 70,
          },
        ],
        datas: arr,
      };

      /* TABLA GENERAL */
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        y: doc.y + 40,
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "purple", 0.1);
        },
      });

      /* Tabla envios */
      doc.table(shippingTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        y: doc.y + 40,
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "purple", 0.1);
        },
      });
      /* TABLA PRODUCTOS */
      doc.table(productsTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        y: doc.y + 40,
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexRow % 2 !== 0 && doc.addBackground(rectRow, "purple", 0.01);
        },
      });

      doc.end();
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getInputsBetweenDates: async function (req, res, next) {
    try {
      const { initDate, endDate } = req.body.dates;

      const findInputsBetweenDates = await inputsModel.find({
        purchaseDate: {
          $gte: new Date(initDate),
          $lte: new Date(endDate),
        },
      });
      console.log(findInputsBetweenDates, "Fin de salidas encontradas");

      const iDate = new Date(initDate).toLocaleDateString();
      const eDate = new Date(endDate).toLocaleDateString();
      let arr = [];
      for (let i = 0; i < findInputsBetweenDates.length; i++) {
        data = {
          code: findInputsBetweenDates[i].code,
          enterprise: findInputsBetweenDates[i].enterprise,
          purchaseDate:
            findInputsBetweenDates[i].purchaseDate.toLocaleDateString(),

          payMethod: findInputsBetweenDates[i].payMethod,
          concept: findInputsBetweenDates[i].concept,
          notes: findInputsBetweenDates[i].notes,
          amount: findInputsBetweenDates[i].amount_currency,
        };
        arr.push(data);
      }
      console.log(arr);

      const doc = new PDFDocumentTable({
        margin: 30,
        size: "A4",
        layout: "landscape",
      });

      doc.pipe(fs.createWriteStream("Exported/ListadoSalidas.pdf"));

      res.setHeader("Content-type", "application/pdf");
      doc.pipe(res);

      const table = {
        title: "Resumen de salidas",
        subtitle: `Fechas: ${iDate} a ${eDate}`,
        headers: [
          {
            label: "#",
            property: "code",
            valign: "center",
            align: "center",
            width: 40,
          },
          {
            label: "Proveedor",
            property: "enterprise",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Fecha de compra",
            property: "purchaseDate",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Medio de Pago",
            property: "payMethod",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Concepto",
            property: "concept",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Importe",
            property: "amount",
            valign: "center",
            align: "right",
            width: 70,
          },
        ],
        datas: arr,
      };
      const options = {};
      const callback = () => {};
      doc.table(table, options, callback);

      doc.end();
    } catch (e) {
      next(e);
    }
  },
  getInputByCode: async function (req, res, next) {
    try {
      const { code } = req.params.code;
      const foundOrder = await inputsModel.find({
        code: req.params.code,
      });
      console.log(foundOrder);
      let arr = [];

      for (let i = 0; i < foundOrder.length; i++) {
        data = {
          code: foundOrder[i].code,
          purchaseDate: foundOrder[i].purchaseDate.toLocaleDateString(),
          payMethod: foundOrder[i].payMethod,
          enterprise: foundOrder[i].enterprise,
          concept: foundOrder[i].concept,
          amount: foundOrder[i].amount_currency,
        };

        arr.push(data);
      }

      const doc = new PDFDocumentTable({
        margin: 60,
        size: "A4",
      });

      doc
        .image("Exported/logo.png", 50, 27, {
          fit: [50, 50],
          align: "center",
          valign: "center",
        })
        .rect(50, 25, 50, 50)
        .stroke()
        .fontSize(10)
        .font("Times-Roman")
        .text("Sistema de gestión", 35, 83);

      doc.pipe(fs.createWriteStream("Exported/ListadoOrdenes.pdf"));

      res.setHeader("Content-type", "application/pdf");
      doc.pipe(res);

      const table = {
        title: "Salida #" + foundOrder[0].code,
        subtitle: "Fecha de emisión: " + new Date().toLocaleDateString(),

        headers: [
          {
            label: "Código",
            property: "code",
            valign: "center",
            align: "center",
            width: 50,
          },
          {
            label: "Proveedor",
            property: "enterprise",
            valign: "center",
            width: 60,
          },
          {
            label: "Fecha de compra",
            property: "purchaseDate",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Concepto",
            property: "concept",
            valign: "center",
            align: "center",
            width: 75,
          },

          {
            label: "Forma de pago",
            property: "payMethod",
            valign: "center",
            align: "center",
            width: 90,
          },

          {
            label: "Importe",
            property: "amount",
            valign: "center",
            align: "center",
            width: 90,
          },
        ],
        datas: arr,
      };

      /* TABLA GENERAL */
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        y: doc.y + 40,
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "purple", 0.1);
        },
      });

      doc.end();
    } catch (e) {
      console.log(e);
      next(e);
    }
  },

  delete: async function (req, res, next) {
    try {
      const deleted = await purchaseOrdersModel.deleteOne({
        _id: req.params.id,
      });
      await purchaseOrdersModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { isDeleted: true }
      );
      //  isDeleted: true

      res.json(deleted);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    console.log(req.body[0].searchField);

    try {
      const doc = await purchaseOrdersModel.findOne({ _id: req.params.id });
      const update = { [req.body[0].searchField]: req.body[0].update };
      await doc.updateOne(update);

      res.json(doc);
    } catch (e) {
      console.log(e);
    }
  },
  amount: async function (req, res, next) {
    try {
      const countDoc = await purchaseOrdersModel.countDocuments();
      if (countDoc === 0) {
        res.json(0);
      } else {
        const amount = await purchaseOrdersModel
          .find({})
          .sort({ _id: -1 })
          .limit(1);

        res.json(amount[0].code);
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
