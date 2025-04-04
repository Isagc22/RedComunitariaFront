import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

// Servicio para manejar la autenticación
const authService = {
    // Iniciar sesión
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password
            });
            
            if (response.data.token) {
                // Guardar usuario y token en localStorage
                localStorage.setItem('user', JSON.stringify({
                    ...response.data,
                    loginTime: new Date().getTime() // Añadir timestamp del momento de login
                }));
                // Configurar token en cabeceras para futuras peticiones
                setAuthToken(response.data.token);
            }
            
            return response.data;
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            throw error;
        }
    },
    
    // Registrar nuevo usuario
    register: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                password
            });
            
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify({
                    ...response.data,
                    loginTime: new Date().getTime() // Añadir timestamp del momento de registro
                }));
                setAuthToken(response.data.token);
            }
            
            return response.data;
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            throw error;
        }
    },
    
    // Cerrar sesión
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('datosPersonales');

        // Eliminar cualquier modal backdrop que pudiera quedar
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Limpiar token de las cabeceras
        delete axios.defaults.headers.common['Authorization'];
    },
    
    // Obtener usuario actual
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        
        try {
            const user = JSON.parse(userStr);
            
            // Verificar si el token ha expirado (24 horas = 86400000 ms)
            const TOKEN_EXPIRATION = 86400000; // 24 horas en milisegundos
            const now = new Date().getTime();
            
            if (user.loginTime && (now - user.loginTime > TOKEN_EXPIRATION)) {
                console.log('Sesión expirada. Por favor, inicie sesión nuevamente.');
                authService.logout();
                return null;
            }
            
            return user;
        } catch (error) {
            console.error('Error al parsear usuario:', error);
            return null;
        }
    },
    
    // Verificar si está autenticado
    isAuthenticated: () => {
        const user = authService.getCurrentUser();
        return !!user;
    },
    
    // Verificar token con el backend
    validateToken: async () => {
        const user = authService.getCurrentUser();
        if (!user || !user.token) return false;
        
        try {
            // Esta sería la forma ideal de validar un token con el backend,
            // pero necesitaríamos un endpoint específico para esto.
            // Por ahora, simplemente verificamos si existe y no ha expirado localmente.
            return true;
        } catch (error) {
            console.error('Error al validar token:', error);
            authService.logout();
            return false;
        }
    },
    
    // Obtener el token actual
    getToken: () => {
        const user = authService.getCurrentUser();
        return user ? user.token : null;
    }
};

// Función para configurar el token en las cabeceras
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// Configurar interceptor para manejar tokens expirados
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expirado o inválido, cerrar sesión
            authService.logout();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

// Verificar si hay un token almacenado al cargar la aplicación y configurarlo
const user = authService.getCurrentUser();
if (user && user.token) {
    setAuthToken(user.token);
}

export default authService; 