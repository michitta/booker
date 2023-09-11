export type books = {
    totalItems: number,
    items: book[]
}

export type book = {
    id: string,
    etag: string,
    volumeInfo: {
        title: string,
        previewLink: string,
        authors: string[],
        categories: string[],
        description: string,
        imageLinks: {
            thumbnail: string
        }
    }
}