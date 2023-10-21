import create from 'zustand';
import axios from 'axios';

interface UserState {
    Email: string;
    Role: string;
    Username?: string;
    isLogin : boolean
    UserID?: number;
}

interface Userinfo {
    userinfo : UserState
    user_login: (authtoken : string) => void;
}

export const useUserStore = create<Userinfo>((set) => ({
    userinfo : {
        Email : '',
        Role : '',
        isLogin : false
      },
      user_login: async (authtoken : string) =>  {
            axios.get(`${import.meta.env.VITE_API}/users/curent_user`, {
        headers: {
          authtoken,
        },
      }).then((response) => {
        if(response.status == 200) {
          const user = {
            ...response.data
          }
          set({ userinfo : {...user}})
        }
      }).catch((e : any) => {
        if (e.response.data == "JWT Expired" || e.response.status == 500) {
            localStorage.removeItem("userinfo");
        }
      })
          

      }
      
}));

