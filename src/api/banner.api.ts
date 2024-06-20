import { Banner } from "@/models/banner.model";
import { requesthandler } from "./http";

export const fetchBanners = async () => {
    return await requesthandler<Banner[]>("get", "/banners");
};
