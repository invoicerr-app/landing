import type React from "react"

export interface DocumentItem {
    description: string
    type: string
    quantity: number
    unitPrice: string
    vatRate: number
    totalPrice: string
}

export interface DocumentClient {
    name: string
    address: string
    city: string
    postalCode: string
    country: string
    email: string
    legalId: string
    description: string
}

export interface DocumentProps {
    type: "invoice" | "quote"
    number: string
    date: string
    dueDate: string
    currency: string
    client: DocumentClient
    items: DocumentItem[]
    totalHT: string
    totalVAT: string
    totalTTC: string
    paymentMethod: string
    notes: string
}

export const Document: React.FC<DocumentProps> = ({
    type,
    number,
    date,
    dueDate,
    currency,
    client,
    items,
    totalHT,
    totalVAT,
    totalTTC,
    paymentMethod,
    notes,
}) => {
    const typeLabel = type === "invoice" ? "FACTURE" : "DEVIS"

    return (
        <div className="flex justify-center bg-gray-100 p-4 overflow-auto w-full h-full">
            {/* Container responsive avec ratio A4 */}
            <div
                className="relative bg-white text-black shadow-lg origin-top-left"
                style={{
                    aspectRatio: "210 / 297", // ratio A4
                    width: "100%",
                    maxWidth: "210mm",
                    fontSize: "calc(0.9vw + 0.3rem)", // le texte s’adapte à la largeur
                    padding: "2.5vw",
                    lineHeight: 1.4,
                }}
                id="document-content"
            >
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-8">
                    <div>
                        <h1 className="font-bold uppercase tracking-wider text-[2.5em] leading-none">
                            {typeLabel}
                        </h1>
                        <p className="text-gray-600 mt-1 text-[0.7em]">{client.description}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold mb-2 text-[0.9em]">
                            {typeLabel} N° {number}
                        </p>
                        <p className="text-gray-600 mb-1 text-[0.7em]">Créée le: {date}</p>
                        {type === "invoice" && (
                            <p className="text-gray-600 text-[0.7em]">Échéance: {dueDate}</p>
                        )}
                    </div>
                </div>

                {/* Client Info */}
                <div className="mb-6">
                    <h2 className="font-bold uppercase border-b border-gray-300 pb-1 mb-3 text-[0.8em]">
                        Facturation
                    </h2>
                    <div className="space-y-0.5 text-gray-800 text-[0.75em]">
                        <p>{client.name}</p>
                        <p>{client.address}</p>
                        <p>
                            {client.postalCode} {client.city}
                        </p>
                        <p>{client.country}</p>
                        <p>{client.email}</p>
                        {client.legalId && <p>N° SIRET: {client.legalId}</p>}
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full border border-gray-300 mb-6 text-[0.75em]">
                    <thead>
                        <tr className="bg-gray-100 border-b-2 border-black">
                            <th className="text-left p-2 w-2/5">Description</th>
                            <th className="text-right p-2 w-1/12">Quantité</th>
                            <th className="text-right p-2 w-1/12">P.U. ({currency})</th>
                            <th className="text-right p-2">Total HT ({currency})</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="p-2">
                                    {item.description}
                                    <span className="text-gray-500 ml-1 text-[0.7em]">({item.type})</span>
                                </td>
                                <td className="text-right p-2">{item.quantity}</td>
                                <td className="text-right p-2">{item.unitPrice}</td>
                                <td className="text-right p-2">{item.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-8">
                    <div className="w-64 text-[0.8em]">
                        <div className="flex justify-between mb-2">
                            <span>Sous-total HT:</span>
                            <span>
                                {currency} {totalHT}
                            </span>
                        </div>
                        <div className="flex justify-between mb-3">
                            <span>TVA (20%):</span>
                            <span>
                                {currency} {totalVAT}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold border-t-2 border-black pt-2 text-[0.9em]">
                            <span>TOTAL TTC:</span>
                            <span>
                                {currency} {totalTTC}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between border-t border-gray-300 pt-3 pb-4 text-[0.75em]">
                    <div>
                        <p className="font-bold">Mode de paiement:</p>
                        <p>{paymentMethod}</p>
                    </div>
                </div>

                {/* Notes */}
                {notes && (
                    <div className="bg-gray-50 p-3 mt-4 italic text-gray-700 rounded text-[0.75em]">
                        {notes}
                    </div>
                )}
            </div>
        </div>
    )
}
