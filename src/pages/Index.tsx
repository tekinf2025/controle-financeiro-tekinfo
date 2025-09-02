import { useState, useMemo } from "react";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ExpenseCard from "@/components/ExpenseCard";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionTable, { Transaction } from "@/components/TransactionTable";
import TransactionForm from "@/components/TransactionForm";
import DeleteConfirmation from "@/components/DeleteConfirmation";

const Index = () => {
  const { toast } = useToast();
  
  // Mock data with the provided transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      data_vencimento: "2025-09-19",
      descricao: "Loja",
      observacao: "inss Ricardo",
      categoria: "Custo Fixo",
      tipo: "Saida",
      valor: 334,
      status: "Aberto",
      codigo_barras: "858700000030339603852526620716252417348212035901"
    },
    {
      id: "2",
      data_vencimento: "2025-09-06",
      descricao: "Casa",
      observacao: "internet Caxias On-Line",
      categoria: "Custo Fixo",
      tipo: "Saida",
      valor: 90,
      status: "Fechado",
      codigo_barras: "74891125372870230728233756661089511950000009999"
    },
    {
      id: "3",
      data_vencimento: "2025-09-01",
      descricao: "Casa",
      observacao: "Ampla Saracuruna",
      categoria: "Custo Fixo",
      tipo: "Saida",
      valor: 97,
      status: "Fechado",
      codigo_barras: "23792373049037000309840014860007111920000009767"
    }
  ]);

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
      
      const transactionDate = new Date(transaction.data_vencimento);
      const matchesDateRange = 
        transactionDate >= new Date(startDate) && 
        transactionDate <= new Date(endDate);

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
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id 
          ? { ...transaction, status: "Fechado" }
          : transaction
      )
    );
    
    toast({
      title: "Status Atualizado",
      description: "Lançamento marcado como fechado",
    });
  };

  const handleNewTransaction = () => {
    setEditingTransaction(null);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: Omit<Transaction, 'id'>) => {
    if (editingTransaction) {
      // Edit existing transaction
      setTransactions(prev => 
        prev.map(transaction => 
          transaction.id === editingTransaction.id 
            ? { ...transaction, ...data }
            : transaction
        )
      );
      
      toast({
        title: "Lançamento Atualizado",
        description: "As alterações foram salvas com sucesso",
      });
    } else {
      // Add new transaction
      const newTransaction: Transaction = {
        ...data,
        id: Date.now().toString(), // Simple ID generation
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      
      toast({
        title: "Novo Lançamento",
        description: "Lançamento criado com sucesso",
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deletingTransaction) {
      setTransactions(prev => 
        prev.filter(transaction => transaction.id !== deletingTransaction.id)
      );
      
      toast({
        title: "Lançamento Excluído",
        description: "O lançamento foi removido permanentemente",
        variant: "destructive",
      });
      
      setDeletingTransaction(null);
      setIsDeleteDialogOpen(false);
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
    
    toast({
      title: "Exportar CSV",
      description: "Download iniciado com sucesso",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Lançamentos</h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className="text-muted-foreground text-sm sm:text-base">Gerencie suas receitas e despesas</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-success"></div>
                <span className="text-xs text-muted-foreground">Conectado</span>
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
