import { Edit, Trash2, CheckSquare, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Transaction {
  id: string;
  data_vencimento: string;
  descricao: string;
  observacao: string;
  categoria: string;
  tipo: string;
  valor: number;
  status: string;
  codigo_barras: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
}

const TransactionTable = ({ transactions, onEdit, onDelete, onMarkAsPaid }: TransactionTableProps) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const copyBarcode = async (codigo_barras: string) => {
    try {
      await navigator.clipboard.writeText(codigo_barras);
      toast({
        title: "Código de barras copiado!",
        description: "O código foi copiado para a área de transferência.",
      });
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código de barras.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'fechado':
        return <Badge variant="success">Fechado</Badge>;
      case 'aberto':
        return <Badge variant="warning">Aberto</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case 'saida':
        return <Badge variant="destructive">Saída</Badge>;
      case 'receita':
        return <Badge variant="success">Receita</Badge>;
      default:
        return <Badge variant="secondary">{tipo}</Badge>;
    }
  };

  const getCategoryBadge = (categoria: string) => {
    return <Badge variant="secondary">{categoria}</Badge>;
  };

  // Mobile Card View
  const renderMobileView = () => (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id} className="border-border bg-card">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="font-medium text-foreground mb-1">
                  {transaction.descricao}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {transaction.observacao}
                </div>
                <div className="text-sm text-muted-foreground">
                  Vencimento: {formatDate(transaction.data_vencimento)}
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium text-lg mb-1 ${
                  transaction.tipo.toLowerCase() === 'saida' ? 'text-destructive' : 'text-success'
                }`}>
                  {formatCurrency(transaction.valor)}
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {getCategoryBadge(transaction.categoria)}
              {getTypeBadge(transaction.tipo)}
              {getStatusBadge(transaction.status)}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {transaction.codigo_barras && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyBarcode(transaction.codigo_barras)}
                    className="h-8 text-muted-foreground hover:text-foreground"
                    title="Copiar código de barras"
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(transaction)}
                  className="h-8"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                {transaction.status.toLowerCase() === 'aberto' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkAsPaid(transaction.id)}
                    className="h-8 text-success hover:text-success"
                  >
                    <CheckSquare className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(transaction.id)}
                className="h-8 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Desktop Table View
  const renderDesktopView = () => (
    <div className="rounded-md border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border">
              <TableHead className="text-foreground whitespace-nowrap">Data Vencimento</TableHead>
              <TableHead className="text-foreground whitespace-nowrap">Descrição</TableHead>
              <TableHead className="text-foreground whitespace-nowrap">Categoria</TableHead>
              <TableHead className="text-foreground whitespace-nowrap">Tipo</TableHead>
              <TableHead className="text-foreground whitespace-nowrap">Valor</TableHead>
              <TableHead className="text-foreground whitespace-nowrap">Status</TableHead>
              <TableHead className="text-foreground text-right whitespace-nowrap">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-border">
                <TableCell className="text-foreground whitespace-nowrap">
                  {formatDate(transaction.data_vencimento)}
                </TableCell>
                <TableCell className="space-y-1 min-w-[200px]">
                  <div className="font-medium text-foreground">{transaction.descricao}</div>
                  <div className="text-xs text-muted-foreground">{transaction.observacao}</div>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {getCategoryBadge(transaction.categoria)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {getTypeBadge(transaction.tipo)}
                </TableCell>
                <TableCell className={`font-medium whitespace-nowrap ${
                  transaction.tipo.toLowerCase() === 'saida' ? 'text-destructive' : 'text-success'
                }`}>
                  {formatCurrency(transaction.valor)}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {getStatusBadge(transaction.status)}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {transaction.codigo_barras && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyBarcode(transaction.codigo_barras)}
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        title="Copiar código de barras"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(transaction)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {transaction.status.toLowerCase() === 'aberto' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMarkAsPaid(transaction.id)}
                        className="h-8 w-8 text-success hover:text-success"
                      >
                        <CheckSquare className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(transaction.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  return isMobile ? renderMobileView() : renderDesktopView();
};

export default TransactionTable;