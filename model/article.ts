export interface Article {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    tags?: string[];
    isPublished: boolean;
    views?: number;
    category?: string;
    totalReadTime: number;
    displayImage?: string;
}
