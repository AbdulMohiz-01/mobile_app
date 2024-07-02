import { getDocumentById, retrieveAllDocuments, retrieveAllDocumentsByQuery } from "service/firebase/firebaseService";
import { Article } from "model/article";
import { Collection } from "model/collection";

export const getAllArticles = async () => {
    const articles = await retrieveAllDocuments(Collection.Article);

    // dont include the article which has AI in the tags array
    const filteredArticles = articles.filter((article: any) => {
        const articleData = article.data;
        return !articleData.tags.includes("AI");
    });
    return filteredArticles.map((article: any) => {
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
        return arc;
    }
    return null;
}

export const getArticleByTag = async (tag: string) => {
    const articles = await retrieveAllDocuments(Collection.Article);
    // get the article which has AI in the tags array
    const filteredArticles = articles.filter((article: any) => {
        const articleData = article.data;
        return articleData.tags.includes(tag);
    });
    return filteredArticles.map((article: any) => {
        const articleData = article.data;
        const arc: Article = {
            ...articleData,
            id: article.id,
        }
        return arc;
    });
}

export const getArticleByClassNumber = async (classNumber: number) => {
    const articles = await retrieveAllDocuments(Collection.Article);
    // get the article which has AI in the tags array
    const filteredArticles = articles.filter((article: any) => {
        const articleData = article.data;
        return articleData.classNumber === classNumber;
    });
    return filteredArticles.map((article: any) => {
        const articleData = article.data;
        const arc: Article = {
            ...articleData,
            id: article.id,
        }
        return arc;
    });
}