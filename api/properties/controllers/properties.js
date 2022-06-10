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
      entity = await strapi.services.properties.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.properties.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.properties });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const [properties] = await strapi.services.properties.find({
      id,
      users_permissions_user: ctx.state.user.id,
    });

    if (!properties) return ctx.unauthorized("You can't update this entry.");

    const entity = await strapi.services.properties.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.properties });
  },
};
