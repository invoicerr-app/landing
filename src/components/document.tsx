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
        <div className="w-full bg-white text-black" id="document-content">
            {/* A4 Page Style */}
            <div className="mx-auto bg-white" style={{ width: "210mm", height: "297mm", padding: "40px" }}>
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wider">{typeLabel}</h1>
                        <p className="text-xs text-gray-600 mt-1">{client.description}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold mb-2">
                            {typeLabel} N° {number}
                        </p>
                        <p className="text-xs text-gray-600 mb-1">Créée le: {date}</p>
                        {type === "invoice" && <p className="text-xs text-gray-600">Échéance: {dueDate}</p>}
                    </div>
                </div>

                {/* Client Info */}
                <div className="mb-6">
                    <h2 className="text-xs font-bold uppercase border-b border-gray-300 pb-1 mb-3">Facturation</h2>
                    <div className="text-xs space-y-0.5 text-gray-800">
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
                <table className="w-full border border-gray-300 mb-6 text-xs">
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
                            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="p-2">
                                    {item.description}
                                    <span className="text-gray-500 text-xs ml-1">({item.type})</span>
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
                    <div className="w-64">
                        <div className="flex justify-between text-xs mb-2">
                            <span>Sous-total HT:</span>
                            <span>
                                {currency} {totalHT}
                            </span>
                        </div>
                        <div className="flex justify-between text-xs mb-3">
                            <span>TVA (20%):</span>
                            <span>
                                {currency} {totalVAT}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-sm border-t-2 border-black pt-2">
                            <span>TOTAL TTC:</span>
                            <span>
                                {currency} {totalTTC}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between text-xs border-t border-gray-300 pt-3 pb-4">
                    <div>
                        <p className="font-bold">Mode de paiement:</p>
                        <p>{paymentMethod}</p>
                    </div>
                </div>

                {/* Notes */}
                {notes && <div className="bg-gray-50 p-3 mt-4 text-xs italic text-gray-700 rounded">{notes}</div>}
            </div>
        </div>
    )
}
