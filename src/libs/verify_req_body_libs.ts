export function req_verify(body:object){
    try {
        if(Object.keys(body).length <= 0){
            return false;
        }
        for (let x = 0; x < Object.keys(body).length; x++) {
            if(Object.entries(body)[x][1] == '' || Object.entries(body)[x][1] == undefined || Object.entries(body)[x][1] == null){
                return false;
            }
        }
        return true;
    } catch (error) {
        console.error('error unexpected');
        return false;
    }
}
