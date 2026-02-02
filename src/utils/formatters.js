export function formatDateTime(dateString) {
    const date = new Date(dateString)
    
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })
}

export function formatCurrency(amount) {
    if(amount == null) return "-"
    return `₹${Number(amount).toFixed(2)}`
}

