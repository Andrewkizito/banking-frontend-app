// Auth types
export interface AuthResponse {
	authToken: string
	message: string
}

// Data Types
export type TransactionType = 'deposit' | 'withdraw' | 'transfer'

export interface Transaction {
	id: number
	amount: number
	message: string
	transaction_date: string
	transaction_type: 'withdraw' | 'deposit' | 'transfer'
	owner_id: number
	account_from?: string | null
	account_to?: string | null
	balance?: number
	new_balance: number
}

export interface AccountSummary {
	total_transactions: number
	transactions: Transaction[]
	balance: number
	lastTransaction: Partial<Transaction>
}
