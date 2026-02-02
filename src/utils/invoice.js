import jsPDF from "jspdf";
import "jspdf-autotable";

export function generateInvoice(order, items, retailer) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("QuickBazar - Invoice", 14, 15);

  // Order Info
  doc.setFontSize(11);
  doc.text(`Order ID: ${order.OrderID}`, 14, 25);
  doc.text(`Order Date: ${new Date(order.OrderDate).toLocaleString()}`, 14, 32);
  doc.text(`Payment Status: ${order.PaymentStatus}`, 14, 39);
  doc.text(`Delivery Status: ${order.DeliveryStatus}`, 14, 46);

  // Retailer Info
  doc.text("Retailer Details:", 120, 25);
  doc.text(`Shop: ${retailer.ShopName}`, 120, 32);
  doc.text(`Contact: ${retailer.ContactNumber}`, 120, 39);
  doc.text(`GST: ${retailer.GSTNumber}`, 120, 46);

  // Items Table
  const tableData = items.map((i, index) => [
    index + 1,
    i.ProductName,
    i.Quantity,
    `₹ ${i.PriceAtPurchase}`,
    `₹ ${i.PriceAtPurchase * i.Quantity}`,
  ]);

  doc.autoTable({
    startY: 55,
    head: [["#", "Product", "Qty", "Price", "Total"]],
    body: tableData,
  });

  // Totals
  const finalY = doc.lastAutoTable.finalY + 10;
  doc.text(`SubTotal: ₹ ${order.SubTotal}`, 140, finalY);
  doc.text(`GST (18%): ₹ ${order.GSTAmount}`, 140, finalY + 7);
  doc.setFontSize(13);
  doc.text(`Grand Total: ₹ ${order.TotalAmount}`, 140, finalY + 15);

  // Footer
  doc.setFontSize(10);
  doc.text("Thank you for shopping with QuickBazar!", 14, 285);

  // Save
  doc.save(`Invoice_Order_${order.OrderID}.pdf`);
}
