import { Document } from "../document";

export default function Invoice2() {
    return (
        <Document
            type="invoice"
            number="INV-UA-KYIV-3"
            date="October 25, 2025"
            dueDate="December 15, 2025"
            currency="₴"
            client={{
                name: "Kyiv Startup Hub",
                address: "12 Khreshchatyk St",
                city: "Kyiv",
                postalCode: "01001",
                country: "Ukraine",
                email: "john.doe@kyivhub.ua",
                legalId: "UA-FAKE-123",
                description: "Global Paper & Pixel Studio — John Doe",
            }}
            items={[
                {
                    description: "API development",
                    type: "Hours",
                    quantity: 12,
                    unitPrice: "2,200.00",
                    vatRate: 20,
                    totalPrice: "26,400.00",
                },
                {
                    description: "Testing & bugfix",
                    type: "Hours",
                    quantity: 3,
                    unitPrice: "2,200.00",
                    vatRate: 20,
                    totalPrice: "6,600.00",
                },
                {
                    description: "Documentation & deployment support",
                    type: "Product",
                    quantity: 2,
                    unitPrice: "2,200.00",
                    vatRate: 20,
                    totalPrice: "4,400.00",
                },
                {
                    description: "API license / placeholder fee",
                    type: "Product",
                    quantity: 1,
                    unitPrice: "500.00",
                    vatRate: 20,
                    totalPrice: "500.00",
                },
            ]}
            totalHT="37,900.00"
            totalVAT="7,580.00"
            totalTTC="45,480.00"
            paymentMethod="Bank transfer"
            notes="Payment terms: 45 days end of month"
        />
    );
}
