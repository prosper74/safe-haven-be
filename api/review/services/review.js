"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async average(id) {
    const course = await strapi.services.courses.findOne({ id });

    const total = course.reviews.reduce(
      (total, review) => total + review.rating,
      0
    );

    let average = total / course.reviews.length;

    if (course.reviews.length === 0) {
      average = 0;
    }

    await strapi.services.courses.update(
      { id },
      { rating: Math.round(average * 2) / 2 }
    );
  },
};
