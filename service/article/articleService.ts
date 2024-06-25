import { getDocumentById, retrieveAllDocuments } from "service/firebase/firebaseService";
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

export const getArticle = async (articleId: string) => {
    const article = await getDocumentById(Collection.Article, articleId);
    if (article) {
        const arc = article as Article;
        console.log("this is fucking article", arc);
        return arc;
    }
    return null;
}