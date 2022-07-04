const purchaseOrdersModel = require("../models/purchaseOrdersModels");
const inputsModel = require("../models/inputsModels");
const eventsModel = require("../models/eventsModels");
const customersModel = require("../models/customersModel");

const PDFDocumentTable = require("pdfkit-table");
const PDFDocument = require("pdfkit");

const fs = require("fs");
const formatNumberToCurrency = require("../util/utils.js");

module.exports = {
  /* Ordenes */
  getOrdersBetweenDates: async function (req, res, next) {
    console.log(req.body);
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
      const foundOrder = await purchaseOrdersModel.find({
        code: req.params.code,
      });

      const customerByName = await customersModel.find({
        name: foundOrder[0].customer,
      });

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
        productPrice: `bold: Total: ${formatNumberToCurrency(sum)}`,
      });

      const lastIndex = productsArray.length - 1;

      const doc = new PDFDocumentTable({
        margins: {
          top: 50,
          bottom: 50,
          left: 70,
          right: 70,
        },
        font: "Helvetica",
        size: "A4",
      });
      let arr = [];

      for (let i = 0; i < foundOrder.length; i++) {
        data = {
          code: foundOrder[i].code,
          customer: foundOrder[i].customer,
          purchaseDate: foundOrder[i].purchaseDate.toLocaleDateString(),
          paymentDate:
            foundOrder[i].paymentDate !== null
              ? foundOrder[i].paymentDate.toLocaleDateString()
              : "Pendiente",
          paymentState: foundOrder[i].paymentState,
          payMethod: foundOrder[i].payMethod,
          saleMode: foundOrder[i].saleMode,
          shippingMode: foundOrder[i].shippingMode,
          shippingState: foundOrder[i].shippingState,
          shippingAddress: foundOrder[i].shippingAddress,
          shippingEnterprise: foundOrder[i].shippingEnterprise,
          isAnulled: foundOrder[i].isAnulled ? "Anulada" : "OK",
        };
        arr.push(data);
      }

      /* LOGO */
      doc.image("Exported/logo.jpg", 40, 40, {
        fit: [50, 50],
        align: "center",
        valign: "center",
      });

      /* TITULO */
      doc
        .moveDown(5)
        .fontSize(23)
        .font("Helvetica-Bold")
        .text("INFORMACIÓN DE ORDEN # " + foundOrder[0].code, {
          align: "center",
        })
        .moveDown();

      const generalTable = {
        title: "Fecha de emisión: " + new Date().toLocaleDateString(),
        subtitle: " ",
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
          {
            label: "Estado de Orden",
            property: "isAnulled",
            valign: "center",
            align: "center",
            width: 60,
          },
        ],
        datas: arr,
      };

      doc.table(generalTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        x: doc.x - 25,
        y: doc.y,
        width: 455,

        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(10),
            indexRow % 2 !== 0 &&
              indexRow !== lastIndex &&
              doc.addBackground(rectRow, "#753bbd", 0.02),
            indexRow === lastIndex &&
              doc.addBackground(rectCell, "#753bbd", 0.2);
        },
        columnSpacing: 8,
        divider: {
          horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
          header: { disabled: false, width: 2, opacity: 0.8 },
        },
      });

      /* CLIENTE */
      doc
        .moveDown()
        .fontSize(15)
        .font("Helvetica")
        .text("Datos del cliente:", doc.x + 70, doc.y);
      doc
        .moveDown(0.5)
        .fontSize(10)
        .text("Código # ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${customerByName[0].code}`);
      doc
        .moveDown()
        .fontSize(10)
        .font("Helvetica")
        .text("Nombre: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${customerByName[0].name}`);

      doc
        .moveDown()
        .fontSize(10)
        .font("Helvetica")
        .text("Dirección: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${customerByName[0].address}`);
      doc
        .moveDown()
        .fontSize(10)
        .font("Helvetica")
        .text("Contacto: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${customerByName[0].contact}`);

      /* ENTREGA */

      doc
        .moveUp(9)
        .fontSize(15)
        .font("Helvetica")
        .text("Datos de entrega: ", 325, doc.y);
      doc
        .moveDown(0.5)
        .fontSize(10)
        .font("Helvetica")
        .text("Estado: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${foundOrder[0].shippingState}`);
      doc
        .moveDown()
        .fontSize(10)
        .font("Helvetica")
        .text("Empresa: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${foundOrder[0].shippingEnterprise}`);

      doc
        .moveDown()
        .fontSize(10)
        .font("Helvetica")
        .text("Dirección de entrega: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${foundOrder[0].shippingAddress}`);
      doc
        .moveDown()
        .fontSize(10)
        .font("Helvetica")
        .text("Modalidad: ", { continued: true })
        .font("Helvetica-Bold")
        .text(`${foundOrder[0].shippingMode}`);

      /* PRODUCTOS */
      doc
        .fontSize(15)
        .font("Helvetica")
        .text("Productos incluídos:", doc.x - 255, doc.y + 35);

      const productsTable = {
        headers: [
          {
            label: "Producto",
            property: "productName",
            valign: "center",
            align: "center",
          },
          {
            label: "Descripción",
            property: "productDetails",
            valign: "center",
            align: "center",
          },
          {
            label: "Cantidad",
            property: "productQuantity",
            valign: "center",
            align: "center",
          },
          {
            label: "Precio U.",
            property: "productPrice",
            valign: "center",
            align: "right",
          },
        ],
        datas: productsArray,
      };

      doc.table(productsTable, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(10),
        x: doc.x,
        y: doc.y + 30,
        width: 455,
        padding: 5.7,

        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(10),
            indexRow % 2 !== 0 &&
              indexRow !== lastIndex &&
              doc.addBackground(rectRow, "#753bbd", 0.02),
            indexRow === lastIndex &&
              doc.addBackground(rectCell, "#753bbd", 0.2);
        },
        columnSpacing: 7,
        divider: {
          horizontal: { disabled: false, width: 0.5, opacity: 0.5 },
          header: { disabled: false, width: 2, opacity: 0.8 },
        },
      });

      /* Rect CLIENTES */
      doc
        .rect(70, 295, 439, 133)
        .lineWidth(1)
        .fillOpacity(0.05)
        .fillAndStroke("#753bbd", "#9d7bbe");

      /* Rect ENTREGA */
      /*   doc
        .rect(63, 623, 250, 108)
        .lineWidth(1)
        .fillOpacity(0.05)
        .fillAndStroke("#753bbd", "#9d7bbe"); */

      doc.pipe(fs.createWriteStream("Exported/ListadoOrdenes.pdf"));

      res.setHeader("Content-type", "application/pdf");
      doc.pipe(res);

      doc.end();
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  /* Salidas */
  getInputsBetweenDates: async function (req, res, next) {
    try {
      const { initDate, endDate } = req.body.dates;

      const findInputsBetweenDates = await inputsModel.find({
        purchaseDate: {
          $gte: new Date(initDate),
          $lte: new Date(endDate),
        },
      });

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
      const foundInput = await inputsModel.find({
        code: req.params.code,
      });

      console.log(foundInput[0]);

      const doc = new PDFDocument({
        margins: {
          top: 50,
          bottom: 50,
          left: 70,
          right: 70,
        },
        font: "Helvetica",
      });
      console.log("CODE:", foundInput[0].code);
      const stream = doc.pipe(fs.createWriteStream("exported/eventByCode.pdf"));

      doc.initForm();
      /* const orders =
      foundInput[0].orders !== []
          ? foundInput[0].orders.toString().split(",").join(" - ")
          : "Sin órdenes asociadas"; */
      /* doc.rect(doc.x, doc.y + 20, 100, 400).stroke(); */
      doc
        .image("Exported/logo.jpg", 70, 70, {
          fit: [50, 50],
          align: "center",
          valign: "center",
        })
        .fontSize(11)
        .font("Courier")
        .text("Sistema de gestión", 38, 128);
      doc
        .moveDown(3)
        .font("Helvetica-Bold")
        .fontSize(23)
        .lineGap(30)
        .text("INFORMACIÓN DE SALIDA # " + foundInput[0].code, {
          align: "center",
        });

      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .lineGap(15)
        .text("Código: #" + foundInput[0].code);

      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .lineGap(15)
        .text("Proveedor: ", { continued: true })
        .font("Helvetica")
        .text(foundInput[0].enterprise);
      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .lineGap(15)
        .text("Fecha de pago: ", { continued: true })
        .font("Helvetica")
        .text(foundInput[0].purchaseDate.toLocaleDateString());
      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .lineGap(15)
        .text("Importe: ", { continued: true })
        .font("Helvetica")
        .text(formatNumberToCurrency(foundInput[0].amount));

      doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .lineGap(15)
        .text("Concepto: ", { continued: true })
        .font("Helvetica")
        .text(foundInput[0].concept);

      /* doc
        .font("Helvetica-Bold")
        .fontSize(15)
        .lineGap(15)
        .text("Código de órdenes asociadas: ", { continued: true })
        .font("Helvetica")
        .text(orders); */

      doc
        .rect(32, 210, 545, 280)
        .lineWidth(1)
        .fillOpacity(0.07)
        .fillAndStroke("#753bbd", "#9d7bbe");

      doc
        .rect(20, 20, 570, 740)
        .lineWidth(2)
        .fillOpacity(0)
        .fillAndStroke("#753bbd", "#9d7bbe");

      doc.end();
      doc.pipe(res);
      /*const { code } = req.params.code;
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

    
      doc.table(table, {
        prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
        y: doc.y + 40,
        prepareRow: (row, indexColumn, indexRow, rectRow, rectCell) => {
          doc.font("Helvetica").fontSize(8);
          indexColumn === 0 && doc.addBackground(rectRow, "purple", 0.1);
        },
      });

      doc.end(); */
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  /* Eventos */
  getEventsBetweenDates: async function (req, res, next) {
    try {
      const { initDate, endDate } = req.body.dates;

      const findEventsBetweenDates = await eventsModel.find({
        date: {
          $gte: new Date(initDate),
          $lte: new Date(endDate),
        },
      });

      console.log(findEventsBetweenDates);

      const iDate = new Date(initDate).toLocaleDateString();
      const eDate = new Date(endDate).toLocaleDateString();
      let arr = [];
      for (let i = 0; i < findEventsBetweenDates.length; i++) {
        data = {
          code: findEventsBetweenDates[i].code,
          date: findEventsBetweenDates[i].date.toLocaleDateString(),
          name: findEventsBetweenDates[i].name,
          address: findEventsBetweenDates[i].address,
          orders: findEventsBetweenDates[i].orders
            .toString()
            .split(",")
            .join(" - "),
          cost: formatNumberToCurrency(findEventsBetweenDates[i].cost),
          notes: findEventsBetweenDates[i].notes,
        };
        arr.push(data);
      }
      console.log(arr);

      const doc = new PDFDocumentTable({
        margin: 30,
        size: "A4",
      });

      doc.pipe(fs.createWriteStream("Exported/ListadoEventos.pdf"));

      res.setHeader("Content-type", "application/pdf");
      doc.pipe(res);

      const table = {
        title: "Resumen de Eventos",
        subtitle: `Fechas: ${iDate} a ${eDate}`,
        headers: [
          {
            label: "#",
            property: "code",
            valign: "center",
            align: "center",
            width: 30,
          },
          {
            label: "Evento",
            property: "name",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Fecha",
            property: "date",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Ordenes",
            property: "orders",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Dirección",
            property: "address",
            valign: "center",
            align: "center",
            width: 75,
          },
          {
            label: "Costo",
            property: "cost",
            valign: "center",
            align: "center",
            width: 100,
          },
          {
            label: "Observaciones",
            property: "notes",
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
  getEventByCode: async function (req, res, next) {
    try {
      const foundOrder = await eventsModel.find({
        code: req.params.code,
      });

      if (Object.keys(foundOrder).length !== 0) {
        const doc = new PDFDocument({
          margins: {
            top: 50,
            bottom: 50,
            left: 70,
            right: 70,
          },
          font: "Helvetica",
        });

        const stream = doc.pipe(
          fs.createWriteStream("exported/eventByCode.pdf")
        );

        doc.initForm();

        const orders =
          foundOrder[0].orders !== []
            ? foundOrder[0].orders.toString().split(",").join(" - ")
            : "Sin órdenes asociadas";

        /* doc.rect(doc.x, doc.y + 20, 100, 400).stroke(); */
        doc
          .image("Exported/logo.jpg", 70, 70, {
            fit: [50, 50],
            align: "center",
            valign: "center",
          })
          .fontSize(11)
          .font("Courier")
          .text("Sistema de gestión", 38, 128);
        doc
          .moveDown(3)
          .font("Helvetica-Bold")
          .fontSize(23)
          .lineGap(30)
          .text("INFORMACIÓN DE EVENTO", {
            align: "center",
          });

        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .lineGap(15)
          .text("Código: #" + foundOrder[0].code);

        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .lineGap(15)
          .text("Designación: ", { continued: true })
          .font("Helvetica")
          .text(foundOrder[0].name);
        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .lineGap(15)
          .text("Fecha de realización: ", { continued: true })
          .font("Helvetica")
          .text(foundOrder[0].date.toLocaleDateString());
        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .lineGap(15)
          .text("Costo: ", { continued: true })
          .font("Helvetica")
          .text(formatNumberToCurrency(foundOrder[0].cost));

        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .lineGap(15)
          .text("Lugar / Dirección: ", { continued: true })
          .font("Helvetica")
          .text(foundOrder[0].address);

        doc
          .font("Helvetica-Bold")
          .fontSize(15)
          .lineGap(15)
          .text("Código de órdenes asociadas: ", { continued: true })
          .font("Helvetica")
          .text(orders);

        doc
          .rect(32, 210, 545, 280)
          .lineWidth(1)
          .fillOpacity(0.07)
          .fillAndStroke("#753bbd", "#9d7bbe");

        doc
          .rect(20, 20, 570, 740)
          .lineWidth(2)
          .fillOpacity(0)
          .fillAndStroke("#753bbd", "#9d7bbe");

        doc.end();
        doc.pipe(res);
      } else {
        res.sendStatus(404);
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
