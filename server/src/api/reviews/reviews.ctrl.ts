import { ReviewRepository } from "./reviews.repo";

export default async (server) => {
    const rR = ReviewRepository;

    // Admin routes_________________________________________________________________________________________________________________________________
    const getAllReviews = async (req, reply) => {
        try {
            return await rR.getAllReviews(req.query);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getReviewById = async (req, reply) => {
        try {
            return await rR.getReviewById(req.params.reviewId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const addReview = async (req, reply) => {
        try {
            return await rR.addReview(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const removeReview = async (req, reply) => {
        try {
            return await rR.removeReview(req.params.reviewId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const updateReview = async (req, reply) => {
        try {
            return await rR.updateReview(req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    // User routes_________________________________________________________________________________________________________________________________
    const getUsersReviews = async (req, reply) => {
        try {
            return await rR.getUsersReviews(req.user.id);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getUsersReviewById = async (req, reply) => {
        try {
            return await rR.getUsersReviewById(req.user.id, req.params.reviewId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const reviewBook = async (req, reply) => {
        try {
            return await rR.reviewBook(req.user.id, req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const editBookReview = async (req, reply) => {
        try {
            return await rR.editBookReview(req.user.id, req.body);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const removeBookReview = async (req, reply) => {
        try {
            return await rR.removeBookReview(req.user.id, req.params.reviewId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const getReviewsOfBook = async (req, reply) => {
        try {
            return await rR.getReviewsOfBook(req.params.bookId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    const canReviewBook = async (req, reply) => {
        try {
            return await rR.canReviewBook(req.user.id, req.params.bookId);
        }
        catch(e){
            return server.httpErrors.createError(500, e);
        }
    };

    return {
        getAllReviews,
        getReviewById,
        addReview,
        removeReview,
        updateReview,
        getUsersReviews,
        getUsersReviewById,
        reviewBook,
        editBookReview,
        removeBookReview,
        getReviewsOfBook,
        canReviewBook
    };
}