// Admin routes_________________________________________________________________________________________________________________________________
export const getAllUsersSchema = {
    tags: ["users"],
    summary: "Returns users from the database based on pagination settings. If empty, it returns first 50 users.",
    query: {
        type: "object",
        properties: {
            skip: {
                type: "number"
            },
            take: {
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
                    firstName: {
                        type: "string"
                    },
                    lastName: {
                        type: "string"
                    },
                    username: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    phone: {
                        type: "string"
                    },
                    address: {
                        type: "string"
                    },
                    registrationDate: {
                        type: "string"
                    },
                    imagePath: {
                        type: "string"
                    },
                    loansLeft: {
                        type: "number"
                    }
                }
            }
        },
    }
}

export const getUserByIdSchema = {
    tags: ["users"],
    summary: "Returns specific user by ID from the database.",
    params: {
        type: "object",
        properties: {
            userId: {
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
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                username: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                address: {
                    type: "string"
                },
                registrationDate: {
                    type: "string"
                },
                imagePath: {
                    type: "string"
                },
                loansLeft: {
                    type: "number"
                }
            }
        },
    }
}

export const addUserSchema = {
    tags: ["users"],
    summary: "Adds new user with specified attributes to the database.",
    body: {
        type: "object",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            username: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            phone: {
                type: "string"
            },
            address: {
                type: "string"
            },
            imagePath: {
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
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                username: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                address: {
                    type: "string"
                },
                registrationDate: {
                    type: "string"
                },
                imagePath: {
                    type: "string"
                },
                loansLeft: {
                    type: "number"
                }
            }
        },
    }
}

export const removeUserSchema = {
    tags: ["users"],
    summary: "Removes specific user by ID from the database.",
    params: {
        type: "object",
        properties: {
            userId: {
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

export const updateUserSchema = {
    tags: ["users"],
    summary: "Updates a user with specified sttributes in the database.",
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            },
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            username: {
                type: "string"
            },
            email: {
                type: "string"
            },
            phone: {
                type: "string"
            },
            address: {
                type: "string"
            },
            imagePath: {
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
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                username: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                address: {
                    type: "string"
                },
                imagePath: {
                    type: "string"
                },
                loansLeft: {
                    type: "number"
                }
            }
        },
    }
}

// User routes_________________________________________________________________________________________________________________________________
export const userRegisterSchema = {
    tags: ["users"],
    summary: "Creates a new user and returns user data with JWT token.",
    body: {
        type: "object",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            username: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            phone: {
                type: "string"
            },
            address: {
                type: "string"
            }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                user: {
                    type: "object",
                    properties: {
                        id: {
                            type: "number"
                        },
                        firstName: {
                            type: "string"
                        },
                        lastName: {
                            type: "string"
                        },
                        username: {
                            type: "string"
                        },
                        email: {
                            type: "string"
                        },
                        password: {
                            type: "string"
                        },
                        phone: {
                            type: "string"
                        },
                        address: {
                            type: "string"
                        },
                        registrationDate: {
                            type: "string"
                        },
                    }
                },
                token: {
                    type: "string"
                },
            }
        },
    }
}

export const userLoginSchema = {
    tags: ["users"],
    summary: "Returns JWT token if email address and password are correct.",
    body: {
        type: "object",
        properties: {
            email: {
                type: "string"
            },
            password: {
                type: "string"
            }
        }
    },
    response: {
        200: {
            type: "object",
            properties: {
                token: {
                    type: "string"
                },
                isAdmin: {
                    type: "boolean"
                }
            }
        },
    }
}

export const getUserInfoSchema = {
    tags: ["users"],
    summary: "Returns user information of logged in user",
    response: {
        200: {
            type: "object",
            properties: {
                id: {
                    type: "number"
                },
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                username: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                address: {
                    type: "string"
                },
                registrationDate: {
                    type: "string"
                },
                imagePath: {
                    type: "string"
                },
                loansLeft: {
                    type: "number"
                }
            }
        },
    }
}

export const selfDeleteUserSchema = {
    tags: ["users"],
    summary: "Deletes logged in user from the database.",
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

export const updateUserInfoSchema = {
    tags: ["users"],
    summary: "Updates information of logged in user",
    body: {
        type: "object",
        properties: {
            firstName: {
                type: "string"
            },
            lastName: {
                type: "string"
            },
            username: {
                type: "string"
            },
            email: {
                type: "string"
            },
            password: {
                type: "string"
            },
            phone: {
                type: "string"
            },
            address: {
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
                firstName: {
                    type: "string"
                },
                lastName: {
                    type: "string"
                },
                username: {
                    type: "string"
                },
                email: {
                    type: "string"
                },
                password: {
                    type: "string"
                },
                phone: {
                    type: "string"
                },
                address: {
                    type: "string"
                },
                loansLeft: {
                    type: "number"
                }
            }
        },
    }
}

export const updateProfilePictureSchema = {
    tags: ["users"],
    summary: "Adds a profile picture to logged in user.",
    body: {
        type: "object",
        properties: {
            imagePath: {
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
                imagePath: {
                    type: "string"
                }
            }
        },
    }
}
