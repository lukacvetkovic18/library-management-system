import reviewsCtrl from "./reviews.ctrl";
import { addReviewSchema, canReviewBookSchema, editBookReviewSchema, getAllReviewsSchema, getReviewByIdSchema, getReviewsOfBookSchema, getUsersReviewByIdSchema, getUsersReviewsSchema, removeBookReviewSchema, removeReviewSchema, reviewBookSchema, updateReviewSchema } from "./reviews.schema";

export default async (fastify, opts) => {
    const reviewController = reviewsCtrl(fastify);

    // Admin routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/admin/reviews",
        preValidation: fastify.adminACL,
        handler: (await reviewController).getAllReviews,
        schema: getAllReviewsSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/admin/reviews/:reviewId",
        preValidation: fastify.adminACL,
        handler: (await reviewController).getReviewById,
        schema: getReviewByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/admin/reviews",
        preValidation: fastify.adminACL,
        handler: (await reviewController).addReview,
        schema: addReviewSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/admin/reviews/:reviewId",
        preValidation: fastify.adminACL,
        handler: (await reviewController).removeReview,
        schema: removeReviewSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/admin/reviews",
        preValidation: fastify.adminACL,
        handler: (await reviewController).updateReview,
        schema: updateReviewSchema
    });

    // User routes_________________________________________________________________________________________________________________________________
    fastify.route({
        method: "GET",
        url: "/api/reviews",
        preValidation: fastify.userACL,
        handler: (await reviewController).getUsersReviews,
        schema: getUsersReviewsSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/reviews/:reviewId",
        preValidation: fastify.userACL,
        handler: (await reviewController).getUsersReviewById,
        schema: getUsersReviewByIdSchema
    });

    fastify.route({
        method: "POST",
        url: "/api/reviews",
        preValidation: fastify.userACL,
        handler: (await reviewController).reviewBook,
        schema: reviewBookSchema
    });

    fastify.route({
        method: "PUT",
        url: "/api/reviews",
        preValidation: fastify.userACL,
        handler: (await reviewController).editBookReview,
        schema: editBookReviewSchema
    });

    fastify.route({
        method: "DELETE",
        url: "/api/reviews/:reviewId",
        preValidation: fastify.userACL,
        handler: (await reviewController).removeBookReview,
        schema: removeBookReviewSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/reviews/book/:bookId",
        preValidation: fastify.userACL,
        handler: (await reviewController).getReviewsOfBook,
        schema: getReviewsOfBookSchema
    });

    fastify.route({
        method: "GET",
        url: "/api/reviews/canReview/:bookId",
        preValidation: fastify.userACL,
        handler: (await reviewController).canReviewBook,
        schema: canReviewBookSchema
    });

}