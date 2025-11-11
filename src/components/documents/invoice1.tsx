import { Document } from "../document";

export default function InvoiceF2500001() {
    return (
        <Document
            type="invoice"
            number="F2500001"
            date="November 2, 2025"
            dueDate="December 31, 2025"
            currency="€"
            client={{
                name: "Acme Solutions Ltd",
                address: "44 Market St",
                city: "London",
                postalCode: "SW1A 1AA",
                country: "United Kingdom",
                email: "john.doe@acmesolutions.uk",
                legalId: "UK-ACME-001",
                description: "Global Paper & Pixel Studio — John Doe",
            }}
            items={[
                {
                    description: "Website wireframes & mockups",
                    type: "Hours",
                    quantity: 10,
                    unitPrice: "60.00",
                    vatRate: 20,
                    totalPrice: "600.00",
                },
                {
                    description: "Visual design & revisions",
                    type: "Hours",
                    quantity: 12,
                    unitPrice: "60.00",
                    vatRate: 20,
                    totalPrice: "720.00",
                },
                {
                    description: "Development & CMS setup",
                    type: "Hours",
                    quantity: 8,
                    unitPrice: "60.00",
                    vatRate: 20,
                    totalPrice: "480.00",
                },
                {
                    description: "Stock images purchase",
                    type: "Product",
                    quantity: 1,
                    unitPrice: "100.00",
                    vatRate: 20,
                    totalPrice: "100.00",
                },
                {
                    description: "CMS training",
                    type: "Hours",
                    quantity: 1,
                    unitPrice: "60.00",
                    vatRate: 20,
                    totalPrice: "60.00",
                },
            ]}
            totalHT="1,960.00"
            totalVAT="392.00"
            totalTTC="2,352.00"
            paymentMethod="Bank transfer"
            notes="Payment terms: 45 days end of month"
        />
    );
}
