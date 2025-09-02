import { useState, useEffect } from 'react'
import { supabase, type FinanceiroLancamento } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

export type Transaction = FinanceiroLancamento

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  const fetchTransactions = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('financeiro_lancamentos')
        .select('*')
        .order('data_vencimento', { ascending: false })

      if (error) {
        throw error
      }

      setTransactions(data || [])
    } catch (error) {
      console.error('Error fetching transactions:', error)
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os lançamentos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addTransaction = async (transactionData: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('financeiro_lancamentos')
        .insert([{
          ...transactionData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        throw error
      }

      setTransactions(prev => [data, ...prev])
      
      toast({
        title: "Novo Lançamento",
        description: "Lançamento criado com sucesso",
      })

      return data
    } catch (error) {
      console.error('Error adding transaction:', error)
      toast({
        title: "Erro",
        description: "Não foi possível criar o lançamento",
        variant: "destructive",
      })
      throw error
    }
  }

  const updateTransaction = async (id: string, transactionData: Partial<Transaction>) => {
    try {
      const { data, error } = await supabase
        .from('financeiro_lancamentos')
        .update({
          ...transactionData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === id ? data : transaction
        )
      )

      toast({
        title: "Lançamento Atualizado",
        description: "As alterações foram salvas com sucesso",
      })

      return data
    } catch (error) {
      console.error('Error updating transaction:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o lançamento",
        variant: "destructive",
      })
      throw error
    }
  }

  const deleteTransaction = async (id: string) => {
    try {
      const { error } = await supabase
        .from('financeiro_lancamentos')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      setTransactions(prev => 
        prev.filter(transaction => transaction.id !== id)
      )

      toast({
        title: "Lançamento Excluído",
        description: "O lançamento foi removido permanentemente",
        variant: "destructive",
      })
    } catch (error) {
      console.error('Error deleting transaction:', error)
      toast({
        title: "Erro",
        description: "Não foi possível excluir o lançamento",
        variant: "destructive",
      })
      throw error
    }
  }

  const markAsPaid = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('financeiro_lancamentos')
        .update({ 
          status: 'Fechado',
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        throw error
      }

      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === id ? data : transaction
        )
      )

      toast({
        title: "Status Atualizado",
        description: "Lançamento marcado como fechado",
      })
    } catch (error) {
      console.error('Error marking as paid:', error)
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      })
      throw error
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    markAsPaid,
    refetch: fetchTransactions
  }
}