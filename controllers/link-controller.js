import LinkService from "../services/link-service.js";
import LinkDto from "../dtos/link-dto.js";
import ApiError from "../exceptions/api-error.js";
import { checkIsUrlValid } from "../helpers/helpers.js";

class LinkController {
  async getLink(req, res, next) {
    try {
      const { shortId } = req.params;
      const requestedLink = await LinkService.getLink(shortId);
      const { originalUrl } = requestedLink;

      return res.redirect(302, originalUrl);
    } catch (e) {
      next(e);
    }
  }

  async createShortLink(req, res, next) {
    try {
      const { url } = req.body;
      const isUrlValid = await checkIsUrlValid(url);

      if (!isUrlValid) {
        throw ApiError.InvalidOriginalUrl();
      }

      const createdLink = await LinkService.createLink(url);
      const linkDto = new LinkDto(createdLink);

      res.status(201).json(linkDto);
    } catch (e) {
      next(e);
    }
  }
}

export default new LinkController();
