import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import {
  authService,
  LoginRequest,
  RegisterRequest,
  ChangePasswordRequest,
} from '@/lib/auth-service';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const useAuth = () => {
  const router = useRouter();
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    setUser,
    setToken,
    setLoading,
    login: storeLogin,
    logout: storeLogout,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
  } = useAuthStore();

  // Initialize auth state from token
  useEffect(() => {
    const initializeAuth = async () => {
      if (token && !user) {
        try {
          setLoading(true);
          const userData = await authService.getUser();
          setUser(userData);
        } catch (error) {
          console.error('Failed to get user data:', error);
          storeLogout();
        } finally {
          setLoading(false);
        }
      }
    };

    initializeAuth();
  }, [token, user, setUser, setLoading, storeLogout]);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        setLoading(true);
        const response = await authService.login(credentials);

        storeLogin(response.user, response.access_token);

        console.log(response);
        // Redirect based on role
        if (response.user.roles.includes('admin')) {
          router.push('/dashboard');
        } else {
          router.push('/');
        }

        toast.success('Đăng nhập thành công!');
        return { success: true };
      } catch (error) {
        const message = isAxiosError(error)
          ? error.response?.data?.message || 'Đăng nhập thất bại'
          : 'Đã xảy ra lỗi không xác định';
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [storeLogin, router, setLoading],
  );

  const register = useCallback(
    async (userData: RegisterRequest) => {
      try {
        setLoading(true);
        const user = await authService.register(userData);
        setUser(user);
        router.push('/login');
        toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
        return { success: true };
      } catch (error) {
        const message = isAxiosError(error)
          ? error.response?.data?.message || 'Đăng ký thất bại'
          : 'Đã xảy ra lỗi không xác định';
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setUser, router, setLoading],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      toast.success('Đăng xuất thành công!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Đăng xuất thất bại!');
    } finally {
      storeLogout();
      router.push('/login');
    }
  }, [storeLogout, router]);

  const changePassword = useCallback(
    async (passwordData: ChangePasswordRequest) => {
      try {
        setLoading(true);
        await authService.changePassword(passwordData);
        toast.success('Đổi mật khẩu thành công!');
        return { success: true };
      } catch (error) {
        const message = isAxiosError(error)
          ? error.response?.data?.message || 'Đổi mật khẩu thất bại'
          : 'Đã xảy ra lỗi không xác định';
        toast.error(message);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [setLoading],
  );

  const refreshToken = useCallback(async () => {
    try {
      const response = await authService.refreshToken();
      setToken(response.access_token);
      return { success: true };
    } catch (error) {
      console.error('Token refresh failed:', error);
      storeLogout();
      router.push('/login');
      return { success: false };
    }
  }, [setToken, storeLogout, router]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    changePassword,
    refreshToken,
    hasRole,
    hasPermission,
    hasAnyRole,
    hasAnyPermission,
  };
};
