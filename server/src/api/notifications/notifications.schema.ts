// Admin routes_________________________________________________________________________________________________________________________________
export const getAllNotificationsSchema = {
    tags: ["notifications"],
    summary: "Returns notifications from the database based on pagination settings. If empty, it returns first 50 notifications.",
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
                    notificationDate: {
                        type: "number"
                    },
                    title: {
                        type: "string"
                    },
                    content: {
                        type: "string"
                    },
                    isRead: {
                        type: "boolean"
                    },
                }
            }
        },
    }
}

export const getNotificationByIdSchema = {
    tags: ["notifications"],
    summary: "Returns specific notification by ID from the database.",
    params: {
        type: "object",
        properties: {
            notificationId: {
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
                notificationDate: {
                    type: "number"
                },
                title: {
                    type: "string"
                },
                content: {
                    type: "string"
                },
                isRead: {
                    type: "boolean"
                },
            }
        },
    }
}

export const addNotificationSchema = {
    tags: ["notifications"],
    summary: "Adds new notification with specified attributes to the database.",
    body: {
        type: "object",
        properties: {
            userId: {
                type: "number"
            },
            notificationDate: {
                type: "number"
            },
            title: {
                type: "string"
            },
            content: {
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
                notificationDate: {
                    type: "number"
                },
                title: {
                    type: "string"
                },
                content: {
                    type: "string"
                },
                isRead: {
                    type: "boolean"
                },
            }
        },
    }
}

export const removeNotificationSchema = {
    tags: ["notifications"],
    summary: "Removes specific notification by ID from the database.",
    params: {
        type: "object",
        properties: {
            notificationId: {
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

export const updateNotificationSchema = {
    tags: ["notifications"],
    summary: "Updates a notification with specified sttributes in the database.",
    body: {
        type: "object",
        properties: {
            id: {
                type: "number"
            },
            userId: {
                type: "number"
            },
            notificationDate: {
                type: "number"
            },
            title: {
                type: "string"
            },
            content: {
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
                notificationDate: {
                    type: "number"
                },
                title: {
                    type: "string"
                },
                content: {
                    type: "string"
                },
                isRead: {
                    type: "boolean"
                },
            }
        },
    }
}

// User routes_________________________________________________________________________________________________________________________________
export const getUsersNotificationsSchema = {
    tags: ["notifications"],
    summary: "Returns all notifications of logged in user.",
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
                    notificationDate: {
                        type: "number"
                    },
                    title: {
                        type: "string"
                    },
                    content: {
                        type: "string"
                    },
                    isRead: {
                        type: "boolean"
                    },
                }
            },
        },
    }
}

export const getUsersNotificationByIdSchema = {
    tags: ["notifications"],
    summary: "Returns a notification of logged in user by given notification ID.",
    params: {
        type: "object",
        properties: {
            notificationId: {
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
                notificationDate: {
                    type: "number"
                },
                title: {
                    type: "string"
                },
                content: {
                    type: "string"
                },
                isRead: {
                    type: "boolean"
                },
            }
        },
    }
}

export const readNotificationSchema = {
    tags: ["notifications"],
    summary: "Changes a notification's status with given ID to read.",
    body: {
        type: "object",
        properties: {
            notificationId: {
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
                notificationDate: {
                    type: "number"
                },
                title: {
                    type: "string"
                },
                content: {
                    type: "string"
                },
                isRead: {
                    type: "boolean"
                },
            }
        },
    }
}