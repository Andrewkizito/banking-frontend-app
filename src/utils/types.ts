// Auth types
export interface AuthResponse {
	authToken: string
	message: string
}

// Account types
export interface Transaction {
	id: number
	amount: number
	message: string
	transaction_type: 'withdraw' | 'deposit' | 'sent' | 'received'
	owner_id: number
	new_balance: number
	account_from?: string
	account_to?: string
	transaction_date: string
}

export interface AccountSummary {
	total_transactions: number
	transactions: Transaction[]
	balance: number
	lastTransaction: Partial<Transaction>
}
