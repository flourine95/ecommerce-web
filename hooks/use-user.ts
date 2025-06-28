import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';

export function useUser() {
  const { token, setUser, logout } = useAuthStore();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get('/user');
      setUser(res.data);
      return res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    onError: () => {
      logout();
    },
  });

  return query;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.put('/user', data);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data);
    },
  });
}
