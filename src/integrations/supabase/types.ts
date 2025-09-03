export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cartao_lancamentos: {
        Row: {
          bandeira: string | null
          created_at: string | null
          data_pagamento: string | null
          dias_para_receber: number | null
          estabelecimento: string | null
          id: string
          numero_parc: number | null
          status: string | null
          tipo_pagamer: string | null
          total_parcelas: number | null
          valor_liquido: number | null
        }
        Insert: {
          bandeira?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          dias_para_receber?: number | null
          estabelecimento?: string | null
          id: string
          numero_parc?: number | null
          status?: string | null
          tipo_pagamer?: string | null
          total_parcelas?: number | null
          valor_liquido?: number | null
        }
        Update: {
          bandeira?: string | null
          created_at?: string | null
          data_pagamento?: string | null
          dias_para_receber?: number | null
          estabelecimento?: string | null
          id?: string
          numero_parc?: number | null
          status?: string | null
          tipo_pagamer?: string | null
          total_parcelas?: number | null
          valor_liquido?: number | null
        }
        Relationships: []
      }
      clientes: {
        Row: {
          conta_criada: string
          created_at: string
          data_vencimento: string
          id: string
          id_client: string
          nome: string
          observacao: string | null
          plano_mensal: number
          plano_trimestral: number
          servidor: Database["public"]["Enums"]["tipo_servidor"]
          status: Database["public"]["Enums"]["status_cliente"]
          telefone: string | null
          updated_at: string
        }
        Insert: {
          conta_criada?: string
          created_at?: string
          data_vencimento: string
          id?: string
          id_client: string
          nome: string
          observacao?: string | null
          plano_mensal?: number
          plano_trimestral?: number
          servidor: Database["public"]["Enums"]["tipo_servidor"]
          status?: Database["public"]["Enums"]["status_cliente"]
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          conta_criada?: string
          created_at?: string
          data_vencimento?: string
          id?: string
          id_client?: string
          nome?: string
          observacao?: string | null
          plano_mensal?: number
          plano_trimestral?: number
          servidor?: Database["public"]["Enums"]["tipo_servidor"]
          status?: Database["public"]["Enums"]["status_cliente"]
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      controle_caixa: {
        Row: {
          banco_brasil: number | null
          btg_pactual: number | null
          cartoes_receber: number | null
          data_registro: string | null
          id: string
          nubank_pf: number | null
          nubank_pj: number | null
          total: number | null
          updated_at: string | null
        }
        Insert: {
          banco_brasil?: number | null
          btg_pactual?: number | null
          cartoes_receber?: number | null
          data_registro?: string | null
          id?: string
          nubank_pf?: number | null
          nubank_pj?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Update: {
          banco_brasil?: number | null
          btg_pactual?: number | null
          cartoes_receber?: number | null
          data_registro?: string | null
          id?: string
          nubank_pf?: number | null
          nubank_pj?: number | null
          total?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      financeiro_lancamentos: {
        Row: {
          categoria: string | null
          codigo_barras: string | null
          created_at: string | null
          data_vencimento: string | null
          descricao: string | null
          id: string
          observacao: string | null
          status: string | null
          tipo: string | null
          updated_at: string | null
          valor: number | null
        }
        Insert: {
          categoria?: string | null
          codigo_barras?: string | null
          created_at?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id: string
          observacao?: string | null
          status?: string | null
          tipo?: string | null
          updated_at?: string | null
          valor?: number | null
        }
        Update: {
          categoria?: string | null
          codigo_barras?: string | null
          created_at?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id?: string
          observacao?: string | null
          status?: string | null
          tipo?: string | null
          updated_at?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      financeiro_lancamentos_duplicate: {
        Row: {
          categoria: string | null
          created_at: string | null
          data_vencimento: string | null
          descricao: string | null
          id: string
          observacao: string | null
          status: string | null
          tipo: string | null
          updated_at: string | null
          valor: number | null
        }
        Insert: {
          categoria?: string | null
          created_at?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id: string
          observacao?: string | null
          status?: string | null
          tipo?: string | null
          updated_at?: string | null
          valor?: number | null
        }
        Update: {
          categoria?: string | null
          created_at?: string | null
          data_vencimento?: string | null
          descricao?: string | null
          id?: string
          observacao?: string | null
          status?: string | null
          tipo?: string | null
          updated_at?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      gerenciador_clientes: {
        Row: {
          created_at: string | null
          data_vencimento: string
          dias_ativo: number | null
          id: string
          nome: string
          observacoes: string | null
          plano_mensal: number
          plano_trimestral: number
          servidor: string
          status: string | null
          telefone: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          data_vencimento: string
          dias_ativo?: number | null
          id: string
          nome: string
          observacoes?: string | null
          plano_mensal: number
          plano_trimestral: number
          servidor: string
          status?: string | null
          telefone: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          data_vencimento?: string
          dias_ativo?: number | null
          id?: string
          nome?: string
          observacoes?: string | null
          plano_mensal?: number
          plano_trimestral?: number
          servidor?: string
          status?: string | null
          telefone?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      gerenciador_configuracoes_whatsapp: {
        Row: {
          id: number
          mensagem_padrao: string | null
          updated_at: string | null
        }
        Insert: {
          id?: number
          mensagem_padrao?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: number
          mensagem_padrao?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gerenciador_custos_servidores: {
        Row: {
          cplayer: number | null
          id: number
          p2_server: number | null
          p2x: number | null
          rtv: number | null
          rtv_vods: number | null
          updated_at: string | null
        }
        Insert: {
          cplayer?: number | null
          id?: number
          p2_server?: number | null
          p2x?: number | null
          rtv?: number | null
          rtv_vods?: number | null
          updated_at?: string | null
        }
        Update: {
          cplayer?: number | null
          id?: number
          p2_server?: number | null
          p2x?: number | null
          rtv?: number | null
          rtv_vods?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gerenciador_logs_recarga: {
        Row: {
          cliente_id: string | null
          cliente_nome: string | null
          data_antes: string | null
          data_depois: string | null
          data_recarga: string | null
          id: number
          meses_adicionados: number | null
          servidor: string | null
        }
        Insert: {
          cliente_id?: string | null
          cliente_nome?: string | null
          data_antes?: string | null
          data_depois?: string | null
          data_recarga?: string | null
          id?: number
          meses_adicionados?: number | null
          servidor?: string | null
        }
        Update: {
          cliente_id?: string | null
          cliente_nome?: string | null
          data_antes?: string | null
          data_depois?: string | null
          data_recarga?: string | null
          id?: number
          meses_adicionados?: number | null
          servidor?: string | null
        }
        Relationships: []
      }
      investimento_ativo: {
        Row: {
          ativo: string
          created_at: string | null
          data: string
          id: number
          preco: number
          tipo_ativo: string
          user_id: string | null
        }
        Insert: {
          ativo: string
          created_at?: string | null
          data: string
          id?: never
          preco: number
          tipo_ativo: string
          user_id?: string | null
        }
        Update: {
          ativo?: string
          created_at?: string | null
          data?: string
          id?: never
          preco?: number
          tipo_ativo?: string
          user_id?: string | null
        }
        Relationships: []
      }
      investimento_compras: {
        Row: {
          ativo: string
          corretagem: number | null
          data: string
          id: number
          observacoes: string | null
          preco: number
          quantidade: number
          tipo_ativo: string
          user_id: string | null
          valor_total: number
        }
        Insert: {
          ativo: string
          corretagem?: number | null
          data: string
          id?: number
          observacoes?: string | null
          preco: number
          quantidade: number
          tipo_ativo: string
          user_id?: string | null
          valor_total: number
        }
        Update: {
          ativo?: string
          corretagem?: number | null
          data?: string
          id?: number
          observacoes?: string | null
          preco?: number
          quantidade?: number
          tipo_ativo?: string
          user_id?: string | null
          valor_total?: number
        }
        Relationships: []
      }
      investimento_derivativos: {
        Row: {
          ativo_subjacente: string
          codigo_opcao: string | null
          data: string
          id: number
          observacoes: string | null
          premio: number
          quantidade: number
          status: string | null
          strike: number
          tipo_derivativo: string
          tipo_operacao: string
          user_id: string | null
          valor_total: number
          vencimento: string
        }
        Insert: {
          ativo_subjacente: string
          codigo_opcao?: string | null
          data: string
          id?: number
          observacoes?: string | null
          premio: number
          quantidade: number
          status?: string | null
          strike: number
          tipo_derivativo: string
          tipo_operacao: string
          user_id?: string | null
          valor_total: number
          vencimento: string
        }
        Update: {
          ativo_subjacente?: string
          codigo_opcao?: string | null
          data?: string
          id?: number
          observacoes?: string | null
          premio?: number
          quantidade?: number
          status?: string | null
          strike?: number
          tipo_derivativo?: string
          tipo_operacao?: string
          user_id?: string | null
          valor_total?: number
          vencimento?: string
        }
        Relationships: []
      }
      investimento_proventos: {
        Row: {
          a_receber: boolean | null
          ativo: string
          data: string
          id: number
          observacoes: string | null
          quantidade: number | null
          tipo_provento: string
          user_id: string | null
          valor: number
        }
        Insert: {
          a_receber?: boolean | null
          ativo: string
          data: string
          id?: number
          observacoes?: string | null
          quantidade?: number | null
          tipo_provento: string
          user_id?: string | null
          valor: number
        }
        Update: {
          a_receber?: boolean | null
          ativo?: string
          data?: string
          id?: number
          observacoes?: string | null
          quantidade?: number | null
          tipo_provento?: string
          user_id?: string | null
          valor?: number
        }
        Relationships: []
      }
      investimento_vendas: {
        Row: {
          ativo: string
          corretagem: number | null
          data: string
          id: number
          observacoes: string | null
          preco: number
          quantidade: number
          tipo_ativo: string
          user_id: string | null
          valor_total: number
        }
        Insert: {
          ativo: string
          corretagem?: number | null
          data: string
          id?: number
          observacoes?: string | null
          preco: number
          quantidade: number
          tipo_ativo: string
          user_id?: string | null
          valor_total: number
        }
        Update: {
          ativo?: string
          corretagem?: number | null
          data?: string
          id?: number
          observacoes?: string | null
          preco?: number
          quantidade?: number
          tipo_ativo?: string
          user_id?: string | null
          valor_total?: number
        }
        Relationships: []
      }
      lista_mercado: {
        Row: {
          id: string
          is_purchased: boolean | null
          nome: string
          quantidade: number | null
          valor: number
        }
        Insert: {
          id: string
          is_purchased?: boolean | null
          nome: string
          quantidade?: number | null
          valor: number
        }
        Update: {
          id?: string
          is_purchased?: boolean | null
          nome?: string
          quantidade?: number | null
          valor?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      prompts_categories: {
        Row: {
          bg_color: string | null
          border_color: string | null
          color: string | null
          created_at: string | null
          id: string
          name: string | null
          text_color: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bg_color?: string | null
          border_color?: string | null
          color?: string | null
          created_at?: string | null
          id: string
          name?: string | null
          text_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bg_color?: string | null
          border_color?: string | null
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string | null
          text_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      prompts_models: {
        Row: {
          bg_color: string | null
          border_color: string | null
          color: string | null
          created_at: string | null
          icon_name: string | null
          id: string
          name: string | null
          text_color: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bg_color?: string | null
          border_color?: string | null
          color?: string | null
          created_at?: string | null
          icon_name?: string | null
          id: string
          name?: string | null
          text_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bg_color?: string | null
          border_color?: string | null
          color?: string | null
          created_at?: string | null
          icon_name?: string | null
          id?: string
          name?: string | null
          text_color?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      prompts_prompts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          description: string | null
          id: string
          liked: boolean | null
          model: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          liked?: boolean | null
          model?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          liked?: boolean | null
          model?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      sistema_clientes: {
        Row: {
          codigo: string
          data_cadastro: string | null
          nome: string | null
          observacao: string | null
          telefone: string | null
        }
        Insert: {
          codigo: string
          data_cadastro?: string | null
          nome?: string | null
          observacao?: string | null
          telefone?: string | null
        }
        Update: {
          codigo?: string
          data_cadastro?: string | null
          nome?: string | null
          observacao?: string | null
          telefone?: string | null
        }
        Relationships: []
      }
      sistema_devedores: {
        Row: {
          codigo: string
          created_at: string | null
          data: string
          id: number
          nome: string
          observacao: string | null
          updated_at: string | null
          valor: number
        }
        Insert: {
          codigo: string
          created_at?: string | null
          data: string
          id?: number
          nome: string
          observacao?: string | null
          updated_at?: string | null
          valor?: number
        }
        Update: {
          codigo?: string
          created_at?: string | null
          data?: string
          id?: number
          nome?: string
          observacao?: string | null
          updated_at?: string | null
          valor?: number
        }
        Relationships: []
      }
      sistema_estoque: {
        Row: {
          codigo: string
          custo: number | null
          estoque: number | null
          nome: string | null
          valor: number | null
        }
        Insert: {
          codigo: string
          custo?: number | null
          estoque?: number | null
          nome?: string | null
          valor?: number | null
        }
        Update: {
          codigo?: string
          custo?: number | null
          estoque?: number | null
          nome?: string | null
          valor?: number | null
        }
        Relationships: []
      }
      sistema_servicos: {
        Row: {
          codigo: string
          nome: string | null
          preco_custo: number | null
          preco_hora: number | null
        }
        Insert: {
          codigo: string
          nome?: string | null
          preco_custo?: number | null
          preco_hora?: number | null
        }
        Update: {
          codigo?: string
          nome?: string | null
          preco_custo?: number | null
          preco_hora?: number | null
        }
        Relationships: []
      }
      sistema_vendas: {
        Row: {
          cliente_codigo: string | null
          codigo: string
          custo_fixo: number | null
          data: string | null
          lucro: number | null
          observacao: string | null
          produto_codigo: string | null
          quantidade: number | null
          servico_codigo: string | null
          valor_total: number | null
        }
        Insert: {
          cliente_codigo?: string | null
          codigo: string
          custo_fixo?: number | null
          data?: string | null
          lucro?: number | null
          observacao?: string | null
          produto_codigo?: string | null
          quantidade?: number | null
          servico_codigo?: string | null
          valor_total?: number | null
        }
        Update: {
          cliente_codigo?: string | null
          codigo?: string
          custo_fixo?: number | null
          data?: string | null
          lucro?: number | null
          observacao?: string | null
          produto_codigo?: string | null
          quantidade?: number | null
          servico_codigo?: string | null
          valor_total?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      dias_ate_vencimento: {
        Args: { data_venc: string }
        Returns: number
      }
      dias_conta_ativa: {
        Args: { data_criacao: string }
        Returns: number
      }
    }
    Enums: {
      status_cliente: "Ativo" | "Vencido"
      tipo_servidor: "P2X" | "P2_SERVER" | "CPLAYER" | "RTV" | "RTV-VODs"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      status_cliente: ["Ativo", "Vencido"],
      tipo_servidor: ["P2X", "P2_SERVER", "CPLAYER", "RTV", "RTV-VODs"],
    },
  },
} as const
