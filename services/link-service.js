import LinkModel from "../models/link-model.js";
import ApiError from "../exceptions/api-error.js";
import { nanoid } from "nanoid/async";

class LinkService {
  constructor() {
    this.nanoidLength = +process.env.NANOID_LENGTH;
  }

  async getLink(shortId) {
    const searchedLink = await LinkModel.findOne({ shortId: shortId });
    if (!searchedLink) {
      throw ApiError.InvalidUrl();
    }
    return searchedLink;
  }

  async createLink(originalUrl) {
    const shortId = await this._generateShortId();
    const createdLink = await LinkModel.create({
      originalUrl: originalUrl,
      shortId: shortId,
    });
    return createdLink;
  }

  async _generateShortId() {
    const shortId = await nanoid(this.nanoidLength);
    const isUnique = await LinkModel.findOne({ shortId: shortId }).then(
      (res) => !res
    );

    if (!isUnique) {
      return this._generateShortId();
    }

    return shortId;
  }
}

export default new LinkService();
