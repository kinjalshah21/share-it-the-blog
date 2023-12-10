import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appWriteUrl) 
      .setProject(config.productId);
    this.account = new Account(this.client);
  }

  async accountCreation({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        //called Login
        return this.logIn({email,password});
      } else return;
    } catch (error) {
        console.log("Appwrite service :: accountCreation :: error",error);
    }
  }

  async logIn({email,password}) {
    try {
       return await this.account.createEmailSession(email,password);
    } catch (error) {
        console.log("Appwrite service :: LogIn :: error",error);
    }
  }

  async getCurrentUserLoginStatus(){
    try {
        return await this.account.get();
    } catch (error) {
        console.log("Appwrite service :: getCurrentUserLoginStatus :: error",error);
    }
    return null;
  }

  async logOut(){
     try {
        await this.account.deleteSessions();
     } catch (error) {
        console.log("Appwrite service :: logOut :: error",error);
     }
  }
}

const authService = new AuthService();

export default authService;
