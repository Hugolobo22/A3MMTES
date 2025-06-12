import routes from "./api/routes";
import { ApiIndex } from "./api/routes/api_Index";

export function buildApi() {
    const api = ApiIndex.build();
    
    routes(api);

    return api;
}