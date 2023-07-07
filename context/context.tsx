import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import crypto from 'crypto'
interface AppContext {
    user: UserModel | undefined
    isLogin: boolean,
    token: string | undefined
    initializing: boolean
    baseURL?: string
    frontURL?: string
    login: Function
    logout: Function
    fetchingData: boolean
    setFetchingData: Function,
    permission: string[],
    successToast: Function
    errorToast: Function
}
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext<AppContext | undefined>(undefined);


interface Props {
    children?: ReactNode
}
type UserModel = {
    account_type: string,
    customer_type: string,
    first_name: string,
    last_name: string,
    company_name: string | null,
    membership_code: string | null
    is_setup_complete: number,
    permission?: string[] | string
}
export const AuthProvider = ({ children }: Props) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState<UserModel | undefined>(undefined);
    const [permission, setPermission] = useState([]);
    const [token, setToken] = useState<string | undefined>();
    const [initializing, setInitializing] = useState(true)
    const [fetchingData, setFetchingData] = useState(false)
    // useEffect(() => {
    //     if (localStorage.getItem("user") !== undefined || localStorage.getItem("session_token") !== undefined) {
    //         setUser(JSON.parse(localStorage.getItem("user") || "{}"))
    //         setToken((localStorage.getItem("session_token") || "{}"))
    //         setInitializing(false)
    //     }
    // }, [])
    const successToast = (message: string) => {
        toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    const errorToast = (message: string) => {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    useEffect(() => {
        if (localStorage.getItem('user') && localStorage.getItem('session_token')) {
            const userObject = JSON.parse(localStorage.getItem('user') || '{}');
            const sessionToken = localStorage.getItem('session_token') || '';

            // if (process.env.NEXT_PUBLIC_ADMIN_SECERT_KEY && userObject.permission) {
            //     const permissionData = userObject.permission;
            //     const key = process.env.NEXT_PUBLIC_ADMIN_SECERT_KEY;
            //     const iv = Buffer.from(permissionData.iv, 'hex');
            //     const decrypted = decryptData(permissionData.data, key, iv);
            //     const permissionArray = JSON.parse(decrypted);
            //     setPermission(permissionArray);
            // }

            setUser(userObject);
            setToken(sessionToken);
            setInitializing(false);
        }
    }, []);

    function decryptData(data: string, key: string, iv: string) {
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        let decrypted = decipher.update(data, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
    const baseURL = process.env.NEXT_PUBLIC_API
    const frontURL = process.env.NEXT_PUBLIC_FRONT_URL
    // const frontURL = 'http://localhost:3000'
    // const baseURL = '${auth?.baseURL}'

    // Login user function
    const login = (user: UserModel, token: string) => {
        const userObject: UserModel = user;
        // const secretKey: string | undefined = process.env.NEXT_PUBLIC_ADMIN_SECERT_KEY;
        // console.log(secretKey)
        // if (secretKey) {
        //     const iv: Buffer = crypto.randomBytes(16);
        //     const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
        //     let encrypted: Buffer = cipher.update(JSON.stringify(permission));
        //     encrypted = Buffer.concat([encrypted, cipher.final()]);
        //     userObject.permission = {
        //         iv: iv.toString('hex'),
        //         data: encrypted.toString('hex')
        //     };
        // }
        localStorage.setItem('user', JSON.stringify(userObject));
        localStorage.setItem('session_token', token);
        setToken(token);
        // setPermission(permission)
        setUser(user);
        setIsLogin(true);
    };
    // Logout User function
    const logout = () => {
        setUser(undefined);
        localStorage.removeItem("user");
        localStorage.removeItem("session_token");
        setIsLogin(false)
    };

    // Getting already login user details
    useEffect(() => {
        if (user === undefined) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [initializing])
    return (
        // Returning UseContext value
        <AuthContext.Provider value={{ user, token, initializing, permission, isLogin, baseURL, frontURL, login, logout, setFetchingData, fetchingData, successToast, errorToast }}>
            <>
                <ToastContainer />
                {console.log(baseURL)}
            {children}
            </>
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    return useContext(AuthContext);
};
