import { Document } from "../document";

export default function Quote1() {
    return (
        <Document
            type="quote"
            number="QT-FR-LYO-1"
            date="November 7, 2025"
            dueDate="December 7, 2025"
            currency="€"
            client={{
                name: "Maison du Café",
                address: "14 Rue de la Gare",
                city: "Lyon",
                postalCode: "69002",
                country: "France",
                email: "john.doe@maisonducafe.fr",
                legalId: "FR-CAFE-0987",
                description: "Global Paper & Pixel Studio — John Doe",
            }}
            items={[
                {
                    description: "60s promo video offline edit",
                    type: "Hours",
                    quantity: 1,
                    unitPrice: "75.00",
                    vatRate: 20,
                    totalPrice: "75.00",
                },
                {
                    description: "Social media edits x2",
                    type: "Hours",
                    quantity: 3,
                    unitPrice: "75.00",
                    vatRate: 20,
                    totalPrice: "225.00",
                },
                {
                    description: "Motion graphics & titles",
                    type: "Hours",
                    quantity: 4,
                    unitPrice: "75.00",
                    vatRate: 20,
                    totalPrice: "300.00",
                },
                {
                    description: "Final export & delivery",
                    type: "Product",
                    quantity: 1,
                    unitPrice: "145.00",
                    vatRate: 20,
                    totalPrice: "145.00",
                },
            ]}
            totalHT="745.00"
            totalVAT="149.00"
            totalTTC="894.00"
            paymentMethod="Virement bancaire"
            notes="Conditions de règlement : 45 jours fin de mois"
        />
    );
}
