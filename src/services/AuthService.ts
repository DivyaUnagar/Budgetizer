import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  token: string;
}

export class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        return false;
      }

      // Validate token with server (replace with your API)
      const isValid = await this.validateToken(token);
      if (isValid) {
        // Load user data
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          this.currentUser = JSON.parse(userData);
        }
        return true;
      }

      // Token is invalid, clear storage
      await this.clearAuthData();
      return false;
    } catch (error) {
      console.error('Auth check failed:', error);
      return false;
    }
  }

  /**
   * Login user
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Simulate API call (replace with your actual API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock validation
      if (email === 'test@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          email: email,
          name: 'Test User',
          token: 'mock-jwt-token-' + Date.now()
        };

        // Store auth data
        await this.storeAuthData(user);
        this.currentUser = user;

        return { success: true, user };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Login failed' };
    }
  }

  /**
   * Register user
   */
  async register(email: string, password: string, name: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Simulate API call (replace with your actual API)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock registration
      const user: User = {
        id: Date.now().toString(),
        email: email,
        name: name,
        token: 'mock-jwt-token-' + Date.now()
      };

      // Store auth data
      await this.storeAuthData(user);
      this.currentUser = user;

      return { success: true, user };
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: 'Registration failed' };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.clearAuthData();
      this.currentUser = null;
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Validate token with server
   */
  private async validateToken(token: string): Promise<boolean> {
    try {
      // Replace with your actual token validation API
      // const response = await fetch('/api/validate-token', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // return response.ok;

      // Mock validation - always return true for demo
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      return false;
    }
  }

  /**
   * Store authentication data
   */
  private async storeAuthData(user: User): Promise<void> {
    await AsyncStorage.setItem('userToken', user.token);
    await AsyncStorage.setItem('userData', JSON.stringify(user));
  }

  /**
   * Clear authentication data
   */
  private async clearAuthData(): Promise<void> {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
  }
}

// Export singleton instance
export const authService = AuthService.getInstance(); 