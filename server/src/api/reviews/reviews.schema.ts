// Admin routes_________________________________________________________________________________________________________________________________
export const getAllReviewsSchema = {
    tags: ["reviews"],
    summary: "Returns reviews from the database based on pagination settings. If empty, it returns first 50 reviews.",
    query: {
        type: "object",
        properties: {
            skip: {
                type: "number"
            },
            take: {
                type: "number"
            },
            usernamePart: {
                type: "string"
            },
            bookNamePart: {
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
                    user: {
                        type: "object",
                        properties: {
                            id: {
                                type: "number"
                            },
                            username: {
                                type: "string"
                            },
                            imagePath: {
                                type: "string"
                            },
                        }
                    },
                    book: {
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
                            img_paths: {
                                type: "string"
                            }
                        }
                    },
                    reviewDate: {
                        type: "number"
                    },
                    rating: {
                        type: "number"
                    },
                    comment: {
                        type: "string"
                    },
                }
            }
        },
    }
}

export const getReviewByIdSchema = {
    tags: ["reviews"],
    summary: "Returns specific review by ID from the database.",
    params: {
        type: "object",
        properties: {
            reviewId: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
                            type: "string"
                        },
                        imagePath: {
                            type: "string"
                        },
                    }
                },
                book: {
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
                        img_paths: {
                            type: "string"
                        }
                    }
                },
                reviewDate: {
                    type: "number"
                },
                rating: {
                    type: "number"
                },
                comment: {
                    type: "string"
                },
            }
        },
    }
}

export const addReviewSchema = {
    tags: ["reviews"],
    summary: "Adds new review with specified attributes to the database.",
    body: {
        type: "object",
        properties: {
            userId: {
                type: "number"
            },
            bookId: {
                type: "number"
            },
            rating: {
                type: "number"
            },
            comment: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
                            type: "string"
                        },
                        imagePath: {
                            type: "string"
                        },
                    }
                },
                book: {
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
                        img_paths: {
                            type: "string"
                        }
                    }
                },
                reviewDate: {
                    type: "number"
                },
                rating: {
                    type: "number"
                },
                comment: {
                    type: "string"
                },
            }
        },
    }
}

export const removeReviewSchema = {
    tags: ["reviews"],
    summary: "Removes specific review by ID from the database.",
    params: {
        type: "object",
        properties: {
            reviewId: {
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

export const updateReviewSchema = {
    tags: ["reviews"],
    summary: "Updates a review with specified sttributes in the database.",
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            },
            userId: {
                type: "number"
            },
            bookId: {
                type: "number"
            },
            rating: {
                type: "number"
            },
            comment: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
                            type: "string"
                        },
                        imagePath: {
                            type: "string"
                        },
                    }
                },
                book: {
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
                        img_paths: {
                            type: "string"
                        }
                    }
                },
                reviewDate: {
                    type: "number"
                },
                rating: {
                    type: "number"
                },
                comment: {
                    type: "string"
                },
            }
        },
    }
}

// User routes_________________________________________________________________________________________________________________________________
export const getUsersReviewsSchema = {
    tags: ["reviews"],
    summary: "Returns all reviews of logged in user.",
    response: {
        200: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    user: {
                        type: "object",
                        properties: {
                            id: {
                                type: "number"
                            },
                            username: {
                                type: "string"
                            },
                            imagePath: {
                                type: "string"
                            },
                        }
                    },
                    book: {
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
                            img_paths: {
                                type: "string"
                            }
                        }
                    },
                    reviewDate: {
                        type: "number"
                    },
                    rating: {
                        type: "number"
                    },
                    comment: {
                        type: "string"
                    },
                }
            }
        },
    }
}

export const getUsersReviewByIdSchema = {
    tags: ["reviews"],
    summary: "Returns a review of logged in user by given review ID.",
    params: {
        type: "object",
        properties: {
            reviewId: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
                            type: "string"
                        },
                        imagePath: {
                            type: "string"
                        },
                    }
                },
                book: {
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
                        img_paths: {
                            type: "string"
                        }
                    }
                },
                reviewDate: {
                    type: "number"
                },
                rating: {
                    type: "number"
                },
                comment: {
                    type: "string"
                },
            }
        },
    }
}

export const reviewBookSchema = {
    tags: ["reviews"],
    summary: "Adds new review for a logged in user with specified book ID.",
    body: {
        type: "object",
        properties: {
            bookId: {
                type: "number"
            },
            rating: {
                type: "number"
            },
            comment: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
                            type: "string"
                        },
                        imagePath: {
                            type: "string"
                        },
                    }
                },
                book: {
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
                        img_paths: {
                            type: "string"
                        }
                    }
                },
                reviewDate: {
                    type: "number"
                },
                rating: {
                    type: "number"
                },
                comment: {
                    type: "string"
                },
            }
        },
    }
}

export const editBookReviewSchema = {
    tags: ["reviews"],
    summary: "Updates a review for a logged in user with specified review ID.",
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            },
            reviewDate: {
                type: "number"
            },
            rating: {
                type: "number"
            },
            comment: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
                            type: "string"
                        },
                        imagePath: {
                            type: "string"
                        },
                    }
                },
                book: {
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
                        img_paths: {
                            type: "string"
                        }
                    }
                },
                reviewDate: {
                    type: "number"
                },
                rating: {
                    type: "number"
                },
                comment: {
                    type: "string"
                },
            }
        },
    }
}

export const removeBookReviewSchema = {
    tags: ["reviews"],
    summary: "Removes review for a logged in user with specified review ID.",
    params: {
        type: "object",
        properties: {
            reviewId: {
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

export const getReviewsOfBookSchema = {
    tags: ["reviews"],
    summary: "Returns all reviews based on given book ID.",
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
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    user: {
                        type: "object",
                        properties: {
                            id: {
                                type: "number"
                            },
                            username: {
                                type: "string"
                            },
                            imagePath: {
                                type: "string"
                            },
                        }
                    },
                    book: {
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
                            img_paths: {
                                type: "string"
                            }
                        }
                    },
                    reviewDate: {
                        type: "number"
                    },
                    rating: {
                        type: "number"
                    },
                    comment: {
                        type: "string"
                    },
                }
            }
        },
    }
}

export const canReviewBookSchema = {
    tags: ["reviews"],
    summary: "Returns true if user can review the book with given ID.",
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
                flag: {
                    type: "boolean"
                },
                message: {
                    type: "string"
                },
            }
        },
    }
}