import { useQuery } from '@tanstack/react-query';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  to?: string;
  from?: string;
  status: string;
}

export const useTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: ['transactions'],
    queryFn: async () => {
      // Simulación de API - datos de ejemplo
      return [
        { id: 1, type: 'send', amount: 50.00, to: 'Alberto', status: 'completed' },
        { id: 2, type: 'bonus', amount: 5.00, from: 'Referral', status: 'completed' },
        { id: 3, type: 'receive', amount: 30.00, from: 'Maria', status: 'completed' },
        { id: 4, type: 'send', amount: 25.00, to: 'Carlos', status: 'pending' }
      ];
    }
  });
};