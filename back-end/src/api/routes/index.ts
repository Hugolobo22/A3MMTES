import type { ApiIndex } from "./api_Index";
import tasksRoutes from "./task.routes";

export default function routes(api: ApiIndex) {
    tasksRoutes(api);
}