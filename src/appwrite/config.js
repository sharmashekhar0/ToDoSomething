import conf from "../conf/conf";
import { Client, Databases, ID } from "appwrite";

export class Service {
	client = new Client();
	database;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.database = new Databases(this.client);
	}

	async createTodo({ task }) {
		try {
			return await this.database.createDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{ task }
			);
		} catch (error) {
			console.log("Appwrite Service :: createTodo :: Error :: ", error);
		}
	}

	async updateTodo(id, { task }) {
		try {
			return await this.database.updateDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				ID.unique(),
				{ task }
			);
		} catch (error) {
			console.log("Appwrite Service :: updateTodo :: Error :: ", error);
		}
	}

	async deleteTodo(id) {
		try {
			await this.database.deleteDocument(
				conf.appwriteDatabaseId,
				conf.appwriteCollectionId,
				id
			);
			return true;
		} catch (error) {
			console.log("Appwrite Service :: deleteTodo :: Error :: ", error);
			return false;
		}
	}

	async getTodos() {
		try {
			return await this.database.listDocuments(
				appwriteDatabaseId,
				appwriteCollectionId
			);
		} catch (error) {
			console.log("Appwrite Service :: getTodos :: Error :: ", error);
		}
	}
}

const service = new Service();

export default service;
