import { buildApi } from "./app";

function main(){
    const api = buildApi();
    api.start(8000);
}

main();