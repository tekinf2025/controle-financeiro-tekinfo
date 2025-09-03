import { useState, useMemo } from "react";
import { Plus, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExpenseCard from "@/components/ExpenseCard";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionTable from "@/components/TransactionTable";
import TransactionForm from "@/components/TransactionForm";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import Logo from "@/components/Logo";
import { useTransactions, type Transaction } from "@/hooks/useTransactions";

const Index = () => {
  const {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    markAsPaid
  } = useTransactions();

  // Get current month's first and last day
  const getCurrentMonthDates = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };
    
    return {
      first: formatDate(firstDay),
      last: formatDate(lastDay)
    };
  };

  const { first: currentMonthStart, last: currentMonthEnd } = getCurrentMonthDates();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState(currentMonthStart);
  const [endDate, setEndDate] = useState(currentMonthEnd);

  // Form and dialog states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesSearch = 
        transaction.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.observacao.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || transaction.categoria === categoryFilter;
      const matchesType = typeFilter === "all" || transaction.tipo === typeFilter;
      const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
      
      // Parse dates without timezone conversion
      const transactionDate = new Date(transaction.data_vencimento + 'T12:00:00');
      const startDateObj = new Date(startDate + 'T00:00:00');
      const endDateObj = new Date(endDate + 'T23:59:59');
      
      const matchesDateRange = 
        transactionDate >= startDateObj && 
        transactionDate <= endDateObj;

      return matchesSearch && matchesCategory && matchesType && matchesStatus && matchesDateRange;
    });
  }, [transactions, searchTerm, categoryFilter, typeFilter, statusFilter, startDate, endDate]);

  // Calculate totals
  const totals = useMemo(() => {
    const filtered = filteredTransactions;
    const receitas = filtered.filter(t => t.tipo === "Receita").reduce((sum, t) => sum + t.valor, 0);
    const saidas = filtered.filter(t => t.tipo === "Saida").reduce((sum, t) => sum + t.valor, 0);
    const saldo = receitas - saidas;
    
    return {
      receitas,
      saidas,
      saldo,
      totalTransactions: filtered.length
    };
  }, [filteredTransactions]);

  // CRUD operations
  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      setDeletingTransaction(transaction);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleMarkAsPaid = (id: string) => {
    markAsPaid(id);
  };

  const handleNewTransaction = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data: Omit<Transaction, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingTransaction) {
        await updateTransaction(editingTransaction.id, data);
      } else {
        await addTransaction(data);
      }
      setIsFormOpen(false);
      setEditingTransaction(null);
    } catch (error) {
      // Error handling is done in the hook
      console.error('Error submitting form:', error);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingTransaction) {
      try {
        await deleteTransaction(deletingTransaction.id);
        setDeletingTransaction(null);
        setIsDeleteDialogOpen(false);
      } catch (error) {
        // Error handling is done in the hook
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleExportCSV = () => {
    const csvHeaders = "Data Vencimento,Descrição,Observação,Categoria,Tipo,Valor,Status,Código de Barras\n";
    const csvData = filteredTransactions.map(t => 
      `${t.data_vencimento},"${t.descricao}","${t.observacao}","${t.categoria}","${t.tipo}",${t.valor},"${t.status}","${t.codigo_barras}"`
    ).join('\n');
    
    const blob = new Blob([csvHeaders + csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lancamentos_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Carregando lançamentos...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Logo Header */}
        <div className="pb-8">
          <Logo />
        </div>
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Lançamentos</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-muted-foreground text-sm sm:text-base">Gerencie suas receitas e despesas</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Conectado ao Supabase</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="success" onClick={handleNewTransaction} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Novo Lançamento
            </Button>
            <Button variant="outline" onClick={handleExportCSV} className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TransactionFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            typeFilter={typeFilter}
            onTypeChange={setTypeFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <ExpenseCard
            title="Total Receitas (Filtrado)"
            value={formatCurrency(totals.receitas)}
            description="1 receita(s)"
            variant="income"
          />
          <ExpenseCard
            title="Total Saídas (Filtrado)"
            value={formatCurrency(totals.saidas)}
            description={`${totals.totalTransactions} saída(s)`}
            variant="expense"
          />
          <ExpenseCard
            title="Saldo (Filtrado)"
            value={formatCurrency(totals.saldo)}
            description={`${totals.totalTransactions} total de lançamentos`}
            variant="balance"
          />
        </div>

        {/* Transactions Summary */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
          <p className="text-sm text-muted-foreground">
            {filteredTransactions.length} lançamento(s) encontrado(s)
          </p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success"></div>
            <span className="text-xs text-muted-foreground">Dados carregados do Supabase</span>
          </div>
        </div>

        {/* Transactions Table */}
        <TransactionTable
          transactions={filteredTransactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMarkAsPaid={handleMarkAsPaid}
        />

        {/* Transaction Form Modal */}
        <TransactionForm
          open={isFormOpen}
          onOpenChange={setIsFormOpen}
          transaction={editingTransaction}
          onSubmit={handleFormSubmit}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmation
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleConfirmDelete}
          transactionDescription={deletingTransaction?.descricao}
        />
      </div>
    </div>
  );
};

export default Index;
