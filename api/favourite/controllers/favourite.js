"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.favourite.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.favourite.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.favourite });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const [favourite] = await strapi.services.favourite.find({
      id,
      users_permissions_user: ctx.state.user.id,
    });

    if (!favourite) return ctx.unauthorized("You can't update this entry.");

    const entity = await strapi.services.favourite.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.favourite });
  },
};
