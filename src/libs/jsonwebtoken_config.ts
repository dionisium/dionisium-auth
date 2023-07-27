import jwt from 'jsonwebtoken';
export default class libs{
    sing(_id:string){
        try {
            const token = jwt.sign({_id:_id}, process.env.JWT_KEY, {
                expiresIn: (2*24*60*60)
            });
            return token;
        } catch (error) {
            console.error(error);
            return 'error unexpected';
        }
    }
    decoded(token:string){
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            return decoded;
        } catch (error) {
            return 'error unexpected';
        }
    }
}