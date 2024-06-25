import { retrieveAllDocuments } from "service/firebase/firebaseService";
import { Article } from "model/article";
import { Collection } from "model/collection";

export const getAllArticles = async () => {
    const articles = await retrieveAllDocuments(Collection.Article);
    return articles.map((article: any) => {
        const articleData = article.data;
        // console.log(articleData);
        const arc: Article = {
            ...articleData,
            id: article.id,
        }
        return arc;
    });
}