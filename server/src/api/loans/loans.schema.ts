// Admin routes_________________________________________________________________________________________________________________________________
export const getAllLoansSchema = {
    tags: ["loans"],
    summary: "Returns loans from the database based on pagination settings. If empty, it returns first 50 loans.",
    query: {
        type: "object",
        properties: {
            skip: {
                type: "number"
            },
            take: {
                type: "number"
            },
            namePart: {
                type: "string"
            },
            loanStatus: {
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
                    issueDate: {
                        type: "number"
                    },
                    dueDate: {
                        type: "number"
                    },
                    returnDate: {
                        type: "number"
                    },
                    loanStatus: {
                        type: "string"
                    },
                }
            }
        },
    }
}

export const getLoanByIdSchema = {
    tags: ["loans"],
    summary: "Returns specific loan by ID from the database.",
    params: {
        type: "object",
        properties: {
            loanId: {
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
                issueDate: {
                    type: "number"
                },
                dueDate: {
                    type: "number"
                },
                returnDate: {
                    type: "number"
                },
                loanStatus: {
                    type: "string"
                },
            }
        },
    }
}

export const addLoanSchema = {
    tags: ["loans"],
    summary: "Adds new loan with specified attributes to the database.",
    body: {
        type: "object",
        properties: {
            userId: {
                type: "number"
            },
            bookId: {
                type: "number"
            },
            issueDate: {
                type: "number"
            },
            dueDate: {
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
                    }
                },
                issueDate: {
                    type: "number"
                },
                dueDate: {
                    type: "number"
                },
                loanStatus: {
                    type: "string"
                },
            }
        },
    }
}

export const removeLoanSchema = {
    tags: ["loans"],
    summary: "Removes specific loan by ID from the database.",
    params: {
        type: "object",
        properties: {
            loanId: {
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

export const updateLoanSchema = {
    tags: ["loans"],
    summary: "Updates a loan with specified sttributes in the database.",
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
            issueDate: {
                type: "number"
            },
            dueDate: {
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
                    }
                },
                issueDate: {
                    type: "number"
                },
                dueDate: {
                    type: "number"
                },
                loanStatus: {
                    type: "string"
                },
            }
        },
    }
}

export const changeLoanStatusSchema = {
    tags: ["loans"],
    summary: "Updates a status of loan based on given loan ID and loan status.",
    body: {
        type: "object",
        properties: {
            loanId: {
                type: "number"
            },
            loanStatus: {
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
                    }
                },
                issueDate: {
                    type: "number"
                },
                dueDate: {
                    type: "number"
                },
                returnDate: {
                    type: "number"
                },
                loanStatus: {
                    type: "string"
                },
            }
        },
    }
}

// User routes_________________________________________________________________________________________________________________________________
export const getUsersLoansSchema = {
    tags: ["loans"],
    summary: "Returns all loans of logged in user.",
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
                    issueDate: {
                        type: "number"
                    },
                    dueDate: {
                        type: "number"
                    },
                    returnDate: {
                        type: "number"
                    },
                    loanStatus: {
                        type: "string"
                    },
                }
            }
        },
    }
}

export const getUsersLoanByIdSchema = {
    tags: ["loans"],
    summary: "Returns a loan of logged in user by given loan ID.",
    params: {
        type: "object",
        properties: {
            loanId: {
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
                issueDate: {
                    type: "number"
                },
                dueDate: {
                    type: "number"
                },
                returnDate: {
                    type: "number"
                },
                loanStatus: {
                    type: "string"
                },
            }
        },
    }
}

export const loanBookSchema = {
    tags: ["loans"],
    summary: "Adds new loan for a logged in user with specified book ID.",
    body: {
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
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        username: {
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
                    }
                },
                issueDate: {
                    type: "number"
                },
                dueDate: {
                    type: "number"
                },
                loanStatus: {
                    type: "string"
                },
            }
        },
    }
}

export const canLoanBookSchema = {
    tags: ["loans"],
    summary: "Returns true if user can loan the book with given ID.",
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