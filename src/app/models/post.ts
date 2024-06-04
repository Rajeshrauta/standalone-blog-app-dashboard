export interface Post {
    title: string;
    permalink: string;
    except: string;
    category: {categoryId: string,
        category: string};
    postImgPath: string;
    content: string;
    isFeatured: boolean;
    views: number;
    status:string;
    createdAt: Date;
}
