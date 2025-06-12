import type { ApiIndex } from "./api_Index";

export default function tasksRoutes(api: ApiIndex) {

  api.addGetRoute("/tasks", controller.list);
}