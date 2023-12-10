import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class BlogService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
         .setEndpoint(config.appWriteUrl)
         .setProject(config.productId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({title,slug,content,featuredImageID,status,userID}){
    try {
        return await this.databases.createDocument(
            config.databaseId,
            config.collectionId,
            slug,
            {
                title,
                content,
                featuredImageID,
                status,
                userID,
            }
        )
    } catch (error) {
        console.log("Appwrite service :: createPost :: error",error) 
    }

  }

  async updatePost(slug,{title,content,featuredImageID,status}){
    try {
        return await this.databases.updateDocument(
            config.databaseId,
            config.collectionId,
            slug,
            {
                title,
                content,
                featuredImageID,
                status
            }
        )
    } catch (error) {
        console.log("Appwrite service :: updatePost :: error",error)
    }
  }

  async deletePost(slug){
      try {
         await this.databases.deleteDocument(
            config.databaseId,
            config.collectionId,
            slug
         )
         return true;
      } catch (error) {
        console.log("Appwrite service :: deletePost :: error",error)
        return false
      }
  }

  async getPost(slug){
    try {
        return await this.databases.getDocument(
            config.databaseId,
            config.collectionId,
            slug
        )
    } catch (error) {
        console.log("Appwrite service :: getPost :: error",error);
        return false
    }
  }

  async getAllActivePosts(queries = [Query.equal("status","active")]){
    try {
        return await this.databases.listDocuments(
            config.databaseId,
            config.collectionId,
            queries,
        
        )
    } catch (error) {
        console.log("Appwrite service :: geAllActivetPost :: error",error);
        return false
    }
  }

  //upload File
  async uploadFile(file){
    try {
        return await this.bucket.createFile(
            config.bucketId,
            ID.unique(),
            file
        )
    } catch (error) {
        console.log("Appwrite service :: uploadFile :: error",error);
        return false
    }
  }
  
  //delete File

  async deleteFile(fileID){
    try {
        await this.bucket.deleteFile(
            config.bucketId,
            fileID
        )
        return true
    } catch (error) {
        console.log("Appwrite service :: deleteFile :: error",error);
        return false
    }
  }
  
  getFilePreview(fileID){
    return this.bucket.getFilePreview(
        config.bucketId,
        fileID
    )
  }
}

const blogService = new BlogService();
export default blogService;
