export const getBooksSchema = {
    tags: ["books"],
    summary: "Returns books from the database based on pagination, filter and sort settings. If query is empty, it returns first 50 books.",
    query: {
        type: "object",
        properties: {
            skip: {
                type: "number"
            },
            take: {
                type: "number"
            },
            categories: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            formats: {
                type: "array",
                items: {
                    type: "string"
                }
            },
            namePart: {
                type: "string"
            },
            authorPart: {
                type: "string"
            },
            sort: {
                type: "string"
            },
        }
    },
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    name: {
                        type: "string"
                    },
                    author: {
                        type: "string"
                    },
                    format: {
                        type: "string"
                    },
                    book_depository_stars: {
                        type: "number"
                    },
                    price: {
                        type: "number"
                    },
                    isbn: {
                        type: "string"
                    },
                    category: {
                        type: "string"
                    },
                    img_paths: {
                        type: "string"
                    },
                    totalCopies: {
                        type: "number"
                    },
                    availableCopies: {
                        type: "number"
                    },
                },
            }
        }
    }
}

export const getBookSuggestionsSchema = {
    tags: ["books"],
    summary: "Returns book suggestions based on partial input.",
    query: {
        type: "object",
        properties: {
            namePart: {
                type: "string"
            }
        },
    },
    response: {
        200: {
            type: "array",
            items: {
                type: "string"
            }
        }
    }
}


export const getBookByIdSchema = {
    tags: ["books"],
    summary: "Returns specific book by ID from the database.",
    params: {
        type: "object",
        properties: {
            bookId: {
                type: "number"
            },
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: {
                    type: "number"
                },
                name: {
                    type: "string"
                },
                author: {
                    type: "string"
                },
                format: {
                    type: "string"
                },
                book_depository_stars: {
                    type: "number"
                },
                price: {
                    type: "number"
                },
                isbn: {
                    type: "string"
                },
                category: {
                    type: "string"
                },
                img_paths: {
                    type: "string"
                },
                totalCopies: {
                    type: "number"
                },
                availableCopies: {
                    type: "number"
                },
            },
        }
    }
}

export const addBookSchema = {
    tags: ["books"],
    summary: "Adds new book with specified attributes to the database.",
    body: {
        type: "object",
        properties: {
            name: {
                type: "string"
            },
            author: {
                type: "string"
            },
            format: {
                type: "string"
            },
            book_depository_stars: {
                type: "number"
            },
            price: {
                type: "number"
            },
            isbn: {
                type: "string"
            },
            category: {
                type: "string"
            },
            img_paths: {
                type: "string"
            },
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: {
                    type: "number"
                },
                name: {
                    type: "string"
                },
                author: {
                    type: "string"
                },
                format: {
                    type: "string"
                },
                book_depository_stars: {
                    type: "number"
                },
                price: {
                    type: "number"
                },
                isbn: {
                    type: "string"
                },
                category: {
                    type: "string"
                },
                img_paths: {
                    type: "string"
                },
                totalCopies: {
                    type: "number"
                },
                availableCopies: {
                    type: "number"
                },
            }
        },
    }
}

export const removeBookSchema = {
    tags: ["books"],
    summary: "Removes specific book by ID from the database.",
    params: {
        type: "object",
        properties: {
            bookId: {
                type: "number"
            },
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: {
                    type: "string"
                },
            }
        },
    }
}

export const updateBookSchema = {
    tags: ["books"],
    summary: "Updates a book with specified sttributes in the database.",
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            },
            name: {
                type: "string"
            },
            author: {
                type: "string"
            },
            format: {
                type: "string"
            },
            book_depository_stars: {
                type: "number"
            },
            price: {
                type: "number"
            },
            isbn: {
                type: "string"
            },
            category: {
                type: "string"
            },
            img_paths: {
                type: "string"
            },
            totalCopies: {
                type: "number"
            },
            availableCopies: {
                type: "number"
            },
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                id: {
                    type: "number"
                },
                name: {
                    type: "string"
                },
                author: {
                    type: "string"
                },
                format: {
                    type: "string"
                },
                book_depository_stars: {
                    type: "number"
                },
                price: {
                    type: "number"
                },
                isbn: {
                    type: "string"
                },
                category: {
                    type: "string"
                },
                img_paths: {
                    type: "string"
                },
                totalCopies: {
                    type: "number"
                },
                availableCopies: {
                    type: "number"
                },
            }
        },
    }
}

export const getBookAttributesSchema = {
    tags: ["books"],
    summary: "Returns all unique attributes of books from the database.",
    response: {
        200: {
            type: "array",
            items: {
                type: "string",
            }
        }
    }
}