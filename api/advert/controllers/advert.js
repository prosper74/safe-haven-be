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
      entity = await strapi.services.advert.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.advert.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.advert });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [advert] = await strapi.services.advert.find({
      id,
      users_permissions_user: ctx.state.user.id,
    });

    if (!advert) {
      return ctx.unauthorized(`You can't update this ad`);
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.advert.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.advert.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.advert });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const [advert] = await strapi.services.advert.find({
      id,
      users_permissions_user: ctx.state.user.id,
    });

    if (!advert) return ctx.unauthorized("You can't update this entry.");

    const entity = await strapi.services.advert.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.advert });
  },
};
