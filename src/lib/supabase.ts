import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ivumtyhdkjurerknjnpt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2dW10eWhka2p1cmVya25qbnB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjUyMjMsImV4cCI6MjA2NTk0MTIyM30.rbkqMbSYczGbJdGSjUvARGLIU3Gf-B9q0RWm0vW99Bs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type FinanceiroLancamento = {
  id: string
  data_vencimento: string
  descricao: string
  observacao: string
  categoria: string
  tipo: string
  valor: number
  status: string
  created_at?: string
  updated_at?: string
  codigo_barras: string
}